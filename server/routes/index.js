// Import the required Express module
const express = require("express");

// Import the different routes modules
const repositoriesRoute = require("./repositories");
const imagesRoute = require("./images");

// Instantiate a new Express Router
const router = express.Router();

// Define a GET route for the root path ("/") of the application
router.get("/", (req, res) => {
  // Render the 'index' view when this route is accessed
  res.render("index");
});

// Mount the images and repositories routes to their respective paths
router.use("/repositories", repositoriesRoute);
router.use("/images", imagesRoute);

// Export the router to be used in the main application
module.exports = router;
