// Import necessary modules
const express = require("express");
const winston = require("winston");

// Create an Express application
const app = express();

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Define API endpoints
// Addition endpoint
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error("Invalid input. Please provide valid numbers.");
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide valid numbers." });
  }
  const result = num1 + num2;
  logger.info(`New addition operation requested: ${num1} + ${num2}`);
  res.json({ result });
});

// Subtraction endpoint
app.get("/subtract", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error("Invalid input. Please provide valid numbers.");
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide valid numbers." });
  }
  const result = num1 - num2;
  logger.info(`New subtraction operation requested: ${num1} - ${num2}`);
  res.json({ result });
});

// Multiplication endpoint
app.get("/multiply", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error("Invalid input. Please provide valid numbers.");
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide valid numbers." });
  }
  const result = num1 * num2;
  logger.info(`New multiplication operation requested: ${num1} * ${num2}`);
  res.json({ result });
});

// Division endpoint
app.get("/divide", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2) || num2 === 0) {
    logger.error(
      "Invalid input. Please provide valid numbers and ensure the divisor is not zero."
    );
    return res.status(400).json({
      error:
        "Invalid input. Please provide valid numbers and ensure the divisor is not zero.",
    });
  }
  const result = num1 / num2;
  logger.info(`New division operation requested: ${num1} / ${num2}`);
  res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
