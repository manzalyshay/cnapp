const DataIterator = require("../utils/DataIterator");
const Connection = require("../models/Connection");
const Scan = require("../models/Scan");
const Resource = require("../models/Resource");
const logger = require("../utils/logger");

class DataLoader {
  static instance;

  constructor(connections, resources, scans) {
    this._connections = connections.map(
      (connectionData) =>
        new Connection(connectionData.repository_id, connectionData.image_id)
    );

    this._resources = resources
      .filter(
        (item) =>
          item.type === "image" || (item.type === "repository" && item.size)
      )
      .map(
        (resourceData) =>
          new Resource(
            resourceData.id,
            resourceData.name,
            resourceData.url,
            resourceData.created_date_timestamp,
            resourceData.type,
            resourceData.number_of_layers,
            resourceData.architecture,
            resourceData.source,
            resourceData.last_push,
            resourceData.size
          )
      );

    this._scans = scans.map(
      (scanData) =>
        new Scan(
          scanData.scan_id,
          scanData.resource_id,
          scanData.resource_type,
          scanData.highest_severity,
          scanData.total_findings,
          scanData.scan_date_timestamp
        )
    );

    this._repositories = [];
    this._images = [];
  }

  get repositories() {
    return this._repositories;
  }

  get images() {
    return this._images;
  }

  static getInstance() {
    if (!DataLoader.instance) {
      throw new Error(
        "DataLoader is not initialized. Call initialize() first."
      );
    }
    return DataLoader.instance;
  }

  static initialize(connectionsJson, resourcesJson, scansJson) {
    DataLoader.instance = new DataLoader(
      connectionsJson,
      resourcesJson,
      scansJson
    );
  }

  // Method to prepare and set repositories and images
  prepareOutput() {
    try {
      const response = DataIterator.getOutput(
        this._connections,
        this._scans,
        this._resources
      );
      this._repositories = response.repositories;
      this._images = response.images;
      logger.info("Data prepared successfully");
      return true;
    } catch (err) {
      logger.error(`Unable to prepare data: ${err}`);
      return false;
    }
  }
}

// Export a singleton instance of DataLoader with default data
module.exports = DataLoader;
