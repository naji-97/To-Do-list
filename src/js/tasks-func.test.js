/**
 * @jest-environment jsdom
 */

// import the functions that you want to test
import Todolist from './tasks-function.js';

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
});
