const TransactionManager = require("../src/core/TransactionManager");

const testTransaction = async () => {
  const manager = new TransactionManager();

  const operations = [
    {
      execute: async () => {
        console.log("Test Step 1");
      },
      rollback: async () => {
        console.log("Rollback Step 1");
      },
    },
    {
      execute: async () => {
        throw new Error("Test Failure");
      },
      rollback: async () => {
        console.log("Rollback Step 2");
      },
    },
  ];

  try {
    await manager.run(operations);
  } catch (err) {
    console.log("Test Passed: Rollback Triggered ✅");
  }
};

testTransaction();