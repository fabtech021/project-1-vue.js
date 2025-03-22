const db = require("../db"); // Make sure this line is at the top
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router = express.Router();

// Register User
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User registered successfully" });
  });
});

// Login User
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
