module.exports = class TaskStatus {
  constructor() {
    this.completed = false;
  }

  checked = (task) => {
    task.completed = true;
  };

  unchecked = (task) => {
    task.completed = false;
  };
};
