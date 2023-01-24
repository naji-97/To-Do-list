// import _ from 'lodash';
import './style.css';

const tasks = [
  {
    discription: 'Write a function to iterate over the tasks array',
    completed: false,
    index: 1,
  },
  {
    discription: 'On page load render the dynamically created list of tasks ',
    completed: false,
    index: 2,
  },
  {
    discription:
      'The list should appear in order of the index values for each task.',
    completed: false,
    index: 3,
  },
  {
    discription: 'Create a style.css and set rules for the To Do List',
    completed: false,
    index: 4,
  },
];
const taskList = document.querySelector('.task-list');
// const taskListLi = document.createElement('li');
const checkboxInput = document.createElement('input');
// const checkedInput = document.getElementById('checked');
// const labelTask = document.createElement('label');
// const plusIcon = document.createElement('i');

const generateTask = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    const tsk = tasks[i];
    taskList.innerHTML += `<li class="task flex">
 <input type="checkbox" id="checked" name="checked" >
 <label class="label" id="label" for="checked">${tsk.discription}</label>
 <i class="fa-solid fa-ellipsis-vertical"></i>
</li>`;
    checkboxInput.checked = true;
  }
};

window.onload = generateTask();

// function uncheckAllBoxes() {
//   var input = document.querySelectorAll(".checkbox");
//   for (var i = 0; i < input.length; i++) {
//     input[i].checked = false;
//   }
//   this.onclick = checkAllBoxes;
// }
