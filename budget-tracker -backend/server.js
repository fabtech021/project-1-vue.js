const axios = require('axios');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import database connection


axios.defaults.baseURL = 'http://localhost:5001/api';



// Initialize Express app
const app = express();

// Middleware (should be before routes)
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

// Use Routes (AFTER middleware)
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
