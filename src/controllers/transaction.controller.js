const { runTransaction, getTransactions } = require("../services/transaction.service");

const executeTransaction = async (req, res) => {
  try {
    const { name, amount } = req.body;

    await runTransaction({ name, amount });

    res.status(200).json({
      success: true,
      message: "Transaction Successful",
    });
  } catch (err) {
    console.error("🔥 FULL ERROR:", err);

    res.status(400).json({
      success: false,
      message: "Transaction Failed & Rolled Back",
      error: err.message,
    });
  }
};

const fetchTransactions = async (req, res) => {
  try {
    const data = await getTransactions();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching transactions",
    });
  }
};

module.exports = {
  executeTransaction,
  fetchTransactions,
};