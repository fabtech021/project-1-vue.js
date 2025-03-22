const express = require("express");
const db = require("../db");

const router = express.Router();

// ✅ Get all transactions
router.get("/", (req, res) => {
  const sql = "SELECT * FROM transactions ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Add a new transaction
router.post("/", (req, res) => {
  const { user_id, category, amount, date } = req.body;
  if (!user_id || !category || !amount || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO transactions (user_id, category, amount, date) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, category, amount, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaction added successfully", transactionId: result.insertId });
  });
});

// ✅ Update a transaction
router.put("/:id", (req, res) => {
  const { category, amount, date } = req.body;
  const transactionId = req.params.id;

  const sql = "UPDATE transactions SET category=?, amount=?, date=? WHERE id=?";
  db.query(sql, [category, amount, date, transactionId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaction updated successfully" });
  });
});

// ✅ Delete a transaction
router.delete("/:id", (req, res) => {
  const transactionId = req.params.id;

  const sql = "DELETE FROM transactions WHERE id=?";
  db.query(sql, [transactionId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaction deleted successfully" });
  });
});

module.exports = router;
