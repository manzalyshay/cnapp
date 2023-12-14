const express = require("express");
const dataLoader = require("../../services/DataLoader");
const responseManager = require("../../utils/ResponseManager");
const logger = require("../../utils/Logger");
// Express router is instantiated
const router = express.Router();

// Route to render all images
router.get("/", (req, res) => {
  try {
    const items = dataLoader.getInstance().images;
    responseManager.getResponseHandler(res).onSuccess(items);
  } catch (err) {
    logger.error(`Error fetching images : ${err}`);
    responseManager.getResponseHandler(res).onError(err);
  }
});

// Export the router
module.exports = router;
