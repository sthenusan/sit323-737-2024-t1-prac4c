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
    logger.error("Invalid input. Valid numbers Only.");
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
    logger.error("Invalid input. Valid numbers Only.");
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
    logger.error("Invalid input. Valid numbers Only.");
    return res
      .status(400)
      .json({ error: "Invalid input. Valid numbers Only." });
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
      "Invalid input. Valid numbers Only and ensure the divisor is not zero."
    );
    return res.status(400).json({
      error:
        "Invalid input. Valid numbers Only and ensure the divisor is not zero.",
    });
  }
  const result = num1 / num2;
  logger.info(`New division operation requested: ${num1} / ${num2}`);
  res.json({ result });
});

// Exponentiation endpoint
app.get("/exponentiate", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error("Invalid input. Valid numbers Only.");
    return res
      .status(400)
      .json({ error: "Invalid input. Valid numbers Only." });
  }
  const result = Math.pow(num1, num2);
  logger.info(`New exponentiation operation requested: ${num1} ^ ${num2}`);
  res.json({ result });
});

// Square root endpoint
app.get("/sqrt", (req, res) => {
  const num = parseFloat(req.query.num);
  if (isNaN(num) || num < 0) {
    logger.error("Invalid input. Valid  non-negative number Only.");
    return res.status(400).json({
      error: "Invalid input. Valid  non-negative number Only.",
    });
  }
  const result = Math.sqrt(num);
  logger.info(`New square root operation requested: √${num}`);
  res.json({ result });
});

// Modulo endpoint
app.get("/modulo", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2) || num2 === 0) {
    logger.error(
      "Invalid input. Valid numbers Only and ensure the divisor is not zero."
    );
    return res.status(400).json({
      error:
        "Invalid input. Valid numbers Only and ensure the divisor is not zero.",
    });
  }
  const result = num1 % num2;
  logger.info(`New modulo operation requested: ${num1} % ${num2}`);
  res.json({ result });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
