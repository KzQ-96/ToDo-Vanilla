const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


function addTodo(e) {
    e.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    console.log(e.target);
    //DELETE
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    //CHECK MARK
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to List
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

