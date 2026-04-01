const express = require("express");
const app = express();

require("dotenv").config();


const connectDB = require("./config/db");


const transactionRoutes = require("./routes/transaction.routes");
const errorHandler = require("./middlewares/error.middleware");


connectDB();


app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 Transaction System API is running...");
});


app.use("/api/transaction", transactionRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});