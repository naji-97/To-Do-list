// import _ from 'lodash';
import './style.css';
import './js/tasks-function.js';
import Todolist from './js/tasks-function.js';

// Add New Task and Display it
const completed = false;
const entryTask = new Todolist();
let index = 1;

const newItemInput = document.querySelector('#new-item');
const btnAddNewTask = document.querySelector('.btn-add');
btnAddNewTask.addEventListener('click', () => {
  if (newItemInput.value === '') {
    btnAddNewTask.setCustomValidity('This is required field!');
  } else {
    entryTask.addtask(newItemInput.value, completed, index);
    index += 1;
    entryTask.displayTask();
    newItemInput.value = '';
  }
});

window.onload = () => {
  entryTask.taskData = JSON.parse(localStorage.getItem('TodoListDB' || []));
  if (entryTask.taskData === null) {
    entryTask.taskData = [];
    return;
  }
  entryTask.displayTask();
};

const clearAllTaskBtn = document.querySelector('.clear-all');
clearAllTaskBtn.addEventListener('click', (e) => {
  entryTask.clearAllCompletTask();
  e.preventDefault();
  window.location.reload();
});

const clearAllBtn = document.querySelector('.delete-all');
clearAllBtn.addEventListener('click', () => {
  window.localStorage.clear();
  window.location.reload();
});