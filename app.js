//selectors
const todoInput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners

todobutton.addEventListener('click', addTodo);
todolist.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos);

//functions

function addTodo() {
  event.preventDefault();
  console.log('hello');

  if (todoInput.value === '') {
    alert('Enter the text !!');
  } else {
    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');

    newTodo.innerText = todoInput.value;

    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    //complete check mark buttom

    const completedBtn = document.createElement('btn');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');

    todoDiv.appendChild(completedBtn);

    //Delete   buttom

    const trashBtn = document.createElement('btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');

    todoDiv.appendChild(trashBtn);

    //Appending the created list

    todolist.appendChild(todoDiv);

    //clear Todo Inputting value

    todoInput.value = '';
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Deleting the todo

  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;

    todo.classList.add('fall');
    removeLocalTodos(todo);

    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  //tick wala
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('Completed');
  }
}

function filterTodo(e) {
  const todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('Completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('Completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //For non repeating
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  console.log('Hello');
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');

    newTodo.innerText = todo;

    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    //complete check mark buttom

    const completedBtn = document.createElement('btn');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');

    todoDiv.appendChild(completedBtn);

    //Delete   buttom

    const trashBtn = document.createElement('btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');

    todoDiv.appendChild(trashBtn);

    //Appending the created list

    todolist.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
