const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const template = document.querySelector("#list-item-template")
const list = document.querySelector("#list")


const LOCAL_STORAGE_PREFIX = "TODO-LIST"
const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`


let todos = loadTodos()

todos.forEach(renderTodo)




form.addEventListener("submit", e=>{
    e.preventDefault()
    

    const todoName = todoInput.value


    const todo = {
        todoName,
        completed: false,
        id: Date.now().valueOf().toString()
    }

    renderTodo(todo)

    todos.push(todo)

    saveTodos()

    todoInput.value= ""

})


list.addEventListener("change", e=>{
    if(!e.target.matches("[data-list-item-checkbox]")) return

    const todoId = e.target.closest(".list-item").dataset.todoId
    const todo = todos.find(t => t.id === todoId)
    todo.completed = e.target.checked
    saveTodos()
})
list.addEventListener("click", e=>{
    if(!e.target.matches("[data-button-delete]")) return

    const parent = e.target.closest(".list-item")
    const todoId = parent.dataset.todoId

    parent.remove()
    todos = todos.filter(t => t.id != todoId)
    saveTodos()
})


function renderTodo(todo){
    const li = template.content.cloneNode(true)
    li.querySelector(".list-item").dataset.todoId = todo.id
    li.querySelector("[data-list-item-text]").innerText = todo.todoName
    li.querySelector("[data-list-item-checkbox]").checked = todo.completed

    list.appendChild(li)
}

function saveTodos(){
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
}

function loadTodos(){
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY)
    return JSON.parse(todos) || []
}

