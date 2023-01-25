// eslint-disable-next-line max-classes-per-file
class Tasks {
  constructor(description, completed = false, index) {
    // eslint-disable-next-line no-unused-expressions
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

      // const deleteBtn = [];
      // deleteBtn[elem.index] = document.createElement('i');
      // deleteBtn[elem.index].setAttribute('id', elem.index);
      // deleteBtn[elem.index].classList.add('fa-regular fa-trash-can delete');
      li[elem.index].append(
        inputBox[elem.index],
        label[elem.index],
        // deleteBtn[elem.index],
        moveBtn[elem.index],
      );
      taskList.append(li[elem.index]);
      li[elem.index].addEventListener('click', () => {
        li[elem.index].style.backgroundColor = '#ff98008f';

        label[elem.index].addEventListener('click', (e) => {
          e.target.nextSibling.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
          e.target.nextSibling.style.cursor = 'pointer';

          // deleteBtn[elem.index].classList.add('active');
          e.target.nextSibling.addEventListener('click', () => {
            li[elem.index].remove();
            this.removetask(elem.index);
          });
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
      // eslint-disable-next-line no-unused-expressions
      window.location.reload()();
    }
  }
}

// Add New Task and Display it
let index = 0;
const completed = false;
const entryTask = new Todolist();

const newItemInput = document.querySelector('#new-item');
// const taskList = document.querySelector('.task-list');
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
// const createItem = (item) => {
//   tasksArr.push(item.value);
//   localStorage.setItem('tasks', JSON.stringify(tasksArr));
//   location.reload();
// };
// document.querySelector('.btn-add').addEventListener('click', Todolist.addtask(new Tasks()));

// const displayItem = () => {
//   let items = '';
//   for (let i = 0; i < tasksArr.length; i+ =1) {
//     const item = tasksArr[i];
//     items += `<li class="task flex">
//     <input type="checkbox" id="checked" name="checked" >
//     <label class="label" id="label" for="checked">${item}</label>
//     <i class="fa-solid fa-ellipsis-vertical ellipsis"></i>
//     <i class="fa-solid fa-ellipsis-vertical deleteBtn"></i>
//     </li>`;
//     taskList.innerHTML = items;
//   }
// };

// window.onload = displayItem();
// activateDeleteListeners();

// let activateDeleteListeners = () => {
//   const deleteBtn = document.querySelectorAll('.deleteBtn');
//   deleteBtn.forEach((db, i) => {

//   });
// };
// console.log(tasksArr);
// window.onload = Todolist.displayTask
// console.log('ggggggggggggg');