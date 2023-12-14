// Required modules and services are imported
const express = require("express");
const dataLoader = require("../../services/DataLoader");
const responseManager = require("../../utils/ResponseManager");
const logger = require("../../utils/Logger");

// Express router is instantiated
const router = express.Router();

// Route to retrieve all repositories
router.get("/", (req, res) => {
  try {
    const items = dataLoader.getInstance().repositories;
    responseManager.getResponseHandler(res).onSuccess(items);
  } catch (err) {
    logger.error(`Error fetching repositories: ${err}`);
    responseManager.getResponseHandler(res).onError(err);
  }
});

// Export the router
module.exports = router;
