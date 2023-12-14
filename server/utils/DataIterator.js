class DataIterator {
  static getOutput(connections, scans, resources) {
    const time = new Date().getTime();
    const repositories = new Map();
    const images = new Map();

    // Helper function to update or create entities
    const updateOrCreateEntity = (
      entityMap,
      entityId,
      entity,
      exists,
      time,
      type = "repo"
    ) => {
      const entityOutput = entity.getOutput(exists, time, type);
      if (exists) {
        const existingEntity = entityMap.get(entityId);
        entityMap.set(entityId, { ...existingEntity, ...entityOutput });
      } else {
        entityMap.set(entityId, entityOutput);
      }
    };

    // Iterate connections
    connections.forEach((connection) => {
      updateOrCreateEntity(
        repositories,
        connection.repositoryId,
        connection,
        false,
        time,
        "repo"
      );
      updateOrCreateEntity(
        images,
        connection.imageId,
        connection,
        false,
        time,
        "image"
      );
    });

    // Iterate scans
    scans.forEach((scan) => {
      const entityMap = scan.resourceType === "image" ? images : repositories;
      const entityId = scan.resourceId;
      const exists = entityMap.has(entityId);

      updateOrCreateEntity(entityMap, entityId, scan, exists, time);
    });

    // Iterate resources
    resources.forEach((resource) => {
      const type = resource.type === "image" ? "image" : "repo";
      const entityMap = type === "image" ? images : repositories;
      const entityId = resource.id;
      const exists = entityMap.has(entityId);

      updateOrCreateEntity(entityMap, entityId, resource, exists, time, type);
    });

    return {
      repositories: Array.from(repositories.values()),
      images: Array.from(images.values())
    };
  }
}

module.exports = DataIterator;
