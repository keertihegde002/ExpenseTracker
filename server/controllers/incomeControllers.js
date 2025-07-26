const Income = require("../models/Income");
const xlsx = require("xlsx");
const User = require("../models/Users");
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;
    if (!date || !source || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const income = new Income({
      userId,
      icon,
      source,
      amount,
      date,
    });

    await income.save();
    res.status(201).json({ income });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(404).json({ message: "No income records found" });
    }

    const excelData = incomes.map((income) => ({
      Date: income.date.toISOString().split("T")[0],
      Source: income.source,
      Amount: income.amount,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(excelData);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "incomes.xlsx");
    res.download("incomes.xlsx");
  } catch (error) {
    console.error("Error downloading income Excel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
