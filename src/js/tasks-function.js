/* eslint-disable max-classes-per-file */

class Tasks {
  constructor(description, completed = false, index) {
    (this.description = description);
    (this.completed = completed);
    (this.index = index);
  }
}

class TaskStatus {
  constructor() {
    this.completed = false;
  }

  checked = (task) => {
    task.completed = true;
  };

  unchecked = (task) => {
    task.completed = false;
  };
}

class Todolist {
  constructor() {
    this.taskData = [];
  }

  displayTask = () => {
    const taskList = document.querySelector('.task-list');
    if (taskList) {
      taskList.innerHTML = '';
    }
    this.taskData.forEach((elem) => {
      const li = [];
      li[elem.index] = document.createElement('li');
      li[elem.index].setAttribute('id', elem.index);
      li[elem.index].classList.add('flex');
      const label = [];
      label[elem.index] = document.createElement('label');
      label[elem.index].textContent = elem.description;
      label[elem.index].classList.add('label');
      label[elem.index].setAttribute('id', elem.index);
      label[elem.index].contentEditable = true;
      const inputBox = [];
      inputBox[elem.index] = document.createElement('input');
      inputBox[elem.index].setAttribute('type', 'checkbox');
      inputBox[elem.index].setAttribute('id', elem.index);
      inputBox[elem.index].classList.add('checkbox');
      const moveBtn = [];
      moveBtn[elem.index] = document.createElement('button');
      moveBtn[elem.index].setAttribute('id', elem.index);
      moveBtn[elem.index].innerHTML = '<i class="fa-solid fa-ellipsis-vertical ellipsis"></i>';

      li[elem.index].append(
        inputBox[elem.index],
        label[elem.index],
        moveBtn[elem.index],
      );
      taskList.append(li[elem.index]);
      li[elem.index].addEventListener('click', () => {
        li[elem.index].style.backgroundColor = '#ff98008f';
      });
      label[elem.index].addEventListener('click', (e) => {
        e.target.nextSibling.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        e.target.nextSibling.style.cursor = 'pointer';

        e.target.nextSibling.addEventListener('click', () => {
          li[elem.index].remove();
          this.removetask(elem.index);
        });
      });
      li[elem.index].addEventListener('mouseleave', (e) => {
        this.updateTask(e.target.id, e.target.innerText);
      });
      inputBox[elem.index].addEventListener('change', (e) => {
        const status = new TaskStatus();
        if (e.target.checked === true) {
          status.checked(this.taskData[elem.index]);
        } else {
          status.unchecked(this.taskData[elem.index]);
        }
        this.updateTask(
          e.target.nextSibling.id,
          e.target.nextSibling.innerText,
        );
      });
      if (this.taskData[elem.index].completed === true) {
        inputBox[elem.index].setAttribute('checked', 'checked');
        li[elem.index].classList.add('checked');
        label[elem.index].style.textDecoration = 'line-through';
      } else if (this.taskData[elem.index].completed === false) {
        inputBox[elem.index].removeAttribute('checked');
        label[elem.index].style.textDecoration = 'none';
      }
    });
  };

  addtask = (description, completed, index) => {
    const newtask = new Tasks(description, completed, index);
    this.taskData.push(newtask);
    if (typeof window !== 'undefined') {
      localStorage.setItem('TodoListDB', JSON.stringify(this.taskData));
    }
  }

  removetask = (item) => {
    const key = item;
    if (this.taskData.length === 1) {
      this.taskData = [];
    } else {
      this.taskData.splice(key, 1);
    }
    this.taskData.forEach((elem, index) => {
      elem.index = index;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('TodoListDB', JSON.stringify(this.taskData));
      this.displayTask();
    }
  }

  updateTask(item, description) {
    if (this.taskData[item]) {
      this.taskData[item].description = description;
    }
    this.taskData.forEach((elem, index) => {
      elem.index = index;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('TodoListDB', JSON.stringify(this.taskData));
      this.displayTask();
    }
  }

  clearAllCompletTask = () => {
    this.taskData = this.taskData.filter((elem) => elem.completed === false);
    this.taskData.forEach((e, index) => {
      e.index = index;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('TodoListDB', JSON.stringify(this.taskData));
      window.location.reload()();
    }
  }
}

// Add New Task and Display it
let index = 0;
const completed = false;
const entryTask = new Todolist();

const newItemInput = document.querySelector('#new-item');
const btnAddNewTask = document.querySelector('.btn-add');
btnAddNewTask.addEventListener('click', () => {
  if (newItemInput.value === '') {
    btnAddNewTask.setCustomValidity('This is required field!');
  } else {
    entryTask.addtask(newItemInput.value, completed, index);
    entryTask.displayTask();
    newItemInput.value = '';
    index += 1;
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