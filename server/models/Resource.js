class Resource {
  constructor(
    id,
    name,
    url,
    createdDateTimestamp,
    type,
    number_of_layers,
    architecture,
    source,
    lastPush,
    size
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.createdDateTimestamp = createdDateTimestamp;
    this.type = type;
    this.number_of_layers = number_of_layers;
    this.architecture = architecture;
    this.source = source;
    this.lastPush = lastPush;
    this.size = size;
    this.updatedDateTimestamp = null;
  }

  getOutput(exists, time, type) {
    if (type === "repo") {
      return exists
        ? {
            name: this.name,
            url: this.url,
            created_date_timestamp: this.createdDateTimestamp,
            source: this.source,
            last_push: this.lastPush,
            size: this.size
          }
        : {
            id: this.id,
            name: this.name,
            url: this.url,
            created_date_timestamp: this.createdDateTimestamp,
            source: this.source,
            last_push: this.lastPush,
            updated_date_timestamp: time,
            size: this.size
          };
    }

    return {
      name: this.name,
      url: this.url,
      created_date_timestamp: this.url,
      type: this.type,
      number_of_layers: this.number_of_layers,
      architecture: this.architecture,
      source: this.source
    };
  }
}

module.exports = Resource;
