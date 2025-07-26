const express = require("express");
const User = require("../models/Users");
const Income = require("../models/Income");
const { protect } = require("../middlewares/authMiddleware.js");

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/download", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
