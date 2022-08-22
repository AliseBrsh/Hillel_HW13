const todoInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todo-list');


let todos = [];


function render() {
    const todosArray = todos.map(function (todo) {
      return `
        <li data-id="${todo.id}" class="${todo.checked ? "checked" : ""}">
          <input type="checkbox" ${todo.checked ? "checked" : ""} class="todo-check" />
          <p class="title">${todo.title}</p>
          <button data-edit class="edit-btn">Edit</button>
          <button data-remove>Delete</button>
        </li>
        `;
    });
    
    todoList.innerHTML = todosArray.join('');
}

function deleteTodo(id) {
    todos = todos.filter(function(todo) {
      return String(todo.id) !== String(id)
    })
    render()
}
  
function checkTodo(id) {
    todos = todos.map(function (todo) {
      if(String(todo.id) === String(id)) {
        return {
          title: todo.title,
          id: todo.id,
          checked: !todo.checked
        }
      } else {
        return todo
      }
    })
    render()
}
  
function addTodoListener() {
    const newTitle = todoInput.value.trim()
    if(!newTitle) return
    const id = Math.floor(Math.random() * 1000000)
    const newTodo = {
      id: id,
      title: newTitle,
      checked: false
    }
    todos.push(newTodo)
  
    render()
    todoInput.value = ''
}
  
function editTitle(id) {
    const foundTodo = todos.find(function(todo) {
      return String(todo.id) === String(id)
    })
    const newTodoName = prompt('Enter new todo title...', foundTodo.title)
    if(newTodoName !== null) {
      todos = todos.map(function (todo) {
        if(String(todo.id) === String(id)) {
          return {
            title: newTodoName,
            id: todo.checked,
            checked: todo.checked,
          }
        } else {
          return todo
        }
      })
    } 
    render()
}
  
function deleteTodoListener(event) {
    if("remove" in event.target.dataset) {
      const todoId = event.target.parentNode.dataset.id
      deleteTodo(todoId)
    }
}
  
function changeStatusListener(event) {
    if(event.target.type === 'checkbox') {
      const todoId = event.target.parentNode.dataset.id
      checkTodo(todoId)
    }
}
  
function editTitleListener(event) {
    if("edit" in event.target.dataset) {
      const todoId = event.target.parentNode.dataset.id
      editTitle(todoId)
    }
}
  
  
addBtn.addEventListener('click', addTodoListener)
todoList.addEventListener('click', deleteTodoListener)
todoList.addEventListener('click', changeStatusListener)
todoList.addEventListener('click', editTitleListener)
  
  
render()