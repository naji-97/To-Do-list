/**
 * @jest-environment jsdom
 */

// import the functions that you want to test
import Todolist from './tasks-function.js';
import TaskStatus from './taskStatus.js';

// mock the localStorage objecty
document.body.innerHTML = '<ul class=\'task-list\'></ul>';

describe('Add task', () => {
  test('array not to be null', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    expect(task.length).not.toBeNull();
  });
  test('Add task, description', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.addtask('Microverse1', false, 1);
    expect(task.taskData[1].description).toEqual('Microverse1');
  });
  test('Add task, status', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.addtask('Microverse1', true, 1);
    expect(task.taskData[1].completed).toEqual(true);
  });
  test('Add task, index', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.addtask('Microverse1', false, 1);
    task.addtask('Microverse3', false, 2);
    expect(task.taskData[1].index).toEqual(1);
  });
});
describe('Remove task', () => {
  test('undifined', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.removetask(0);
    expect(task.length).toBeUndefined();
  });
  test('Remove task, from a multiple added tasks, return length', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.addtask('Microverse1', false, 1);
    task.addtask('Microverse2', false, 2);
    task.removetask(1);
    expect(task.taskData).toHaveLength(2);
  });
});
describe('Editing', () => {
  test('Editing task', () => {
    const task = new Todolist();
    task.addtask('Microverse', false, 0);
    task.addtask('Microverse1', false, 1);
    task.addtask('Microverse2', false, 2);
    task.updateTask(2, 'Microverse2');
    task.taskData[2].description = 'Launch Break';
    expect(task.taskData[2].description).toEqual('Launch Break');
  });
});
describe('Updating task', () => {
  test('Check Status', () => {
    const task = new Todolist();
    const status = new TaskStatus();
    task.addtask('Morining', false, 0);
    task.addtask('Microverse1', false, 1);
    status.checked(task.taskData[1]);
    expect(task.taskData[1].completed).toEqual(true);
  });
  test('check Status', () => {
    const task = new Todolist();
    const status = new TaskStatus();
    task.addtask('Morining', true, 0);
    task.addtask('Microverse1', false, 1);
    status.unchecked(task.taskData[0]);
    expect(task.taskData[0].completed).toEqual(false);
  });
});

describe('Clear task', () => {
  test('Clear all completed', () => {
    const task = new Todolist();
    const status = new TaskStatus();
    task.addtask('Morining', true, 0);
    task.addtask('Microverse1', false, 1);
    status.checked(task.taskData[1]);
    task.clearAllCompletTask();
    expect(task.taskData.length).toEqual(0);
  });
});