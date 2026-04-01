class RollbackStack {
  constructor() {
    this.stack = [];
  }

  push(rollbackFn) {
    this.stack.push(rollbackFn);
  }

  async execute() {
    console.log("⚠️ Starting rollback...");

    for (let i = this.stack.length - 1; i >= 0; i--) {
      try {
        await this.stack[i]();
      } catch (err) {
        console.error("Rollback step failed:", err.message);
      }
    }

    console.log("✅ Rollback completed");
  }
}

module.exports = RollbackStack;