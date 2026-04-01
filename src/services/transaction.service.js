const mongoose = require("mongoose");
const User = require("../models/user.model");
const Order = require("../models/order.model");
const Transaction = require("../models/transaction.model");

// 🚀 MAIN TRANSACTION FUNCTION
const runTransaction = async ({ name, amount }) => {
  const session = await mongoose.startSession();

  let transactionLog = {
    status: "FAILED",
    steps: [],
  };

  try {
    session.startTransaction();

    console.log("🚀 Transaction Started");

    // Step 1: Create User
    const user = await User.create(
      [{ name, balance: 1000 }],
      { session }
    );

    transactionLog.steps.push({
      name: `Create User (${name})`,
      status: "SUCCESS",
    });

    // Step 2: Deduct Balance
    await User.updateOne(
      { _id: user[0]._id },
      { $inc: { balance: -amount } },
      { session }
    );

    transactionLog.steps.push({
      name: `Deduct Balance (${amount})`,
      status: "SUCCESS",
    });

    // Step 3: Create Order
    await Order.create(
      [{ userId: user[0]._id, amount }],
      { session }
    );

    transactionLog.steps.push({
      name: `Create Order (${amount})`,
      status: "SUCCESS",
    });

    // ❌ Conditional failure
    if (amount > 500) {
      throw new Error("Payment Failed ❌");
    }

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    transactionLog.status = "SUCCESS";

    // ✅ Save success log
    try {
      await Transaction.create(transactionLog);
      console.log("📦 Success log saved");
    } catch (logError) {
      console.error("❌ Logging failed:", logError.message);
    }

  } catch (error) {
    console.error("❌ Transaction Failed:", error.message);

    transactionLog.steps.push({
      name: "Transaction Failed",
      status: "FAILED",
    });

    // 🔁 Rollback
    await session.abortTransaction();
    session.endSession();

    transactionLog.status = "ROLLED_BACK";

    // ❌ Save failure log
    try {
      await Transaction.create(transactionLog);
      console.log("📦 Failure log saved");
    } catch (logError) {
      console.error("❌ Logging failed:", logError.message);
    }

    throw error;
  }
};

// 📊 GET ALL TRANSACTIONS
const getTransactions = async () => {
  return await Transaction.find()
    .sort({ createdAt: -1 })
    .select("-__v"); // remove __v
};

// ✅ EXPORT (THIS FIXES YOUR ERROR)
module.exports = {
  runTransaction,
  getTransactions,
};