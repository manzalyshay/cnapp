const winston = require("winston");
require("colors"); // Ensure 'colors' module is required

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  const coloredLevel =
    level === "info"
      ? message.green
      : level === "warn"
      ? message.yellow
      : message.red;
  return `[${timestamp}] ${coloredLevel}`;
});

// Create a Winston logger with colorized output
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add a timestamp
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "error.log", level: "error" }) // Log errors to a file
  ]
});

module.exports = logger;
