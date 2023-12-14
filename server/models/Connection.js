class Connection {
  constructor(repositoryId, imageId) {
    this.repositoryId = repositoryId;
    this.imageId = imageId;
    this.updatedDateTimestamp = null;
  }

  getOutput(exists, time, type) {
    return type === "repo"
      ? {
          id: this.repositoryId,
          updated_date_timestamp: time,
          connected_image_id: this.imageId
        }
      : {
          id: this.imageId,
          updated_date_timestamp: time,
          connected_repository_id: this.repositoryId
        };
  }
}

module.exports = Connection;
