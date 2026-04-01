const express = require("express");
const router = express.Router();

const {
  executeTransaction,
  fetchTransactions,
} = require("../controllers/transaction.controller");

router.post("/run", executeTransaction);
router.get("/", fetchTransactions);

module.exports = router;