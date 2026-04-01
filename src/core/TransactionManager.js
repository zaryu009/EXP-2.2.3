const RollbackStack = require("./RollbackStack");

class TransactionManager {
  constructor() {
    this.rollbackStack = new RollbackStack();
  }

  async run(operations = []) {
    try {
      for (const op of operations) {
        await op.execute();

        if (op.rollback) {
          this.rollbackStack.push(op.rollback);
        }
      }

      console.log("✅ Transaction committed successfully");
    } catch (err) {
      console.error("❌ Transaction failed:", err.message);

      await this.rollbackStack.execute();

      throw new Error("Transaction Rolled Back");
    }
  }
}

module.exports = TransactionManager;