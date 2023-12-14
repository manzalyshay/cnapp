// Import necessary dependencies
const express = require("express");
const morgan = require("morgan"); // Request logging middleware
const helmet = require("helmet"); // Security middleware
const compression = require("compression"); // Response compression middleware
const cors = require("cors"); // Cross-Origin Resource Sharing middleware
const path = require("path"); // Path module
const bodyParser = require("body-parser"); // Parse incoming request bodies
const routeHandler = require("./routes"); // Import your application routes

// Initialize express application
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny")); // Log HTTP requests
app.use(express.static(path.join(__dirname, "./client"))); // Serve static files

// Middleware to enhance security (helmet)
app.use(helmet());

// Middleware to compress responses (compression)
app.use(compression());

// Middleware to enable CORS (cors)
app.use(cors());

// Ignore requests for favicon and robots.txt
app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/robots.txt", (req, res) => res.status(204));

// Set up API routes
app.use("/api", routeHandler);

// Error handlers
app.use((req, res, next) => {
  const err = new Error(`Not Found (${req.url})`);
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Export the express application
module.exports = app;
