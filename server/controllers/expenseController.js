const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const User = require("../models/Users");
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;
    if (!date || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const expense = new Expense({
      userId,
      icon,
      category,
      amount,
      date,
    });

    await expense.save();
    res.status(201).json({ expense });
  } catch (error) {
    console.error("Error adding Expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching Expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting Expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No Expense records found" });
    }

    const excelData = expenses.map((Expense) => ({
      Category: Expense.category,
      Amount: Expense.amount,
      Date: Expense.date.toISOString().split("T")[0],
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");
    xlsx.writeFile(wb, "Expenses.xlsx");
    res.download("Expenses.xlsx");
  } catch (error) {
    console.error("Error downloading Expense Excel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
