class Operation {
  constructor(name, execute, rollback) {
    this.name = name;
    this.execute = execute;
    this.rollback = rollback;
  }
}

module.exports = Operation;