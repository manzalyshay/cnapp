#!/usr/bin/env node

const http = require("http");
const app = require("../app");
const DataLoader = require("../services/DataLoader");
const logger = require("../utils/Logger");
// Function to resolve data sources based on the environment
const resolveDataSource = (fileName) => {
  const environment = process.env.NODE_ENV || "development";
  const basePath = "../resources/json";

  // Define the base source URL from the environment variable
  const baseSourceUrl = process.env.SOURCE_URL || "https://localhost/";

  // Concatenate the base source URL with the file name
  const sourceUrl = `${baseSourceUrl}${fileName}`;

  // Resolve the data source based on the environment
  if (environment !== "development") {
    return sourceUrl;
  }

  return require("path").resolve(__dirname, basePath, fileName);
};

(async () => {
  const port = process.env.PORT || "3000";
  const server = http.createServer(app);

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Cnapp:1.00 listening on ${bind}`);
  });

  server.on("error", (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case "EACCES":
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  try {
    // Define data sources based on the environment
    const connectionsSource = resolveDataSource("connections.json");
    const resourcesSource = resolveDataSource("resources.json");
    const scansSource = resolveDataSource("scans.json");

    // Load data based on the data sources
    const connectionsJson = require(connectionsSource);
    const resourcesJson = require(resourcesSource);
    const scansJson = require(scansSource);

    // initialize DataLoader instance with dynamic data sources
    DataLoader.initialize(connectionsJson, resourcesJson, scansJson);

    // Ensure data is loaded before starting the server
    const dataLoadSuccess = DataLoader.getInstance().prepareOutput();
    if (dataLoadSuccess) {
      server.listen(port);
    } else {
      logger.error(`Data loading failed, server is not listening`);
      process.exit(1);
    }
  } catch (error) {
    logger.error(`An unexpected error occurred: ${error}`);
    process.exit(1);
  }
})();
