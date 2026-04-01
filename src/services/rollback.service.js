const executeRollback = async (rollbackStack) => {
  console.log("⚠️ Executing rollback service...");

  for (let i = rollbackStack.length - 1; i >= 0; i--) {
    try {
      await rollbackStack[i]();
    } catch (err) {
      console.error("Rollback error:", err.message);
    }
  }

  console.log("✅ Rollback service completed");
};

module.exports = { executeRollback };