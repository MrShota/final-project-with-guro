const API_URL = 'https://dummyjson.com';
const wellcome = document.getElementById('wellcome-text')

//*calling functions
getUsersData();
renderUser();
getTodoByUserId();


//*get all user from server
function getUsersData() {
    fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(allUser => allUser.users)
        .then(_users => {
            users = _users;
            renderUser(users)
        })
}
//*render user by name and last name
function renderUser(allUser) {
    const usersList = document.getElementById('employees-list');
    let singleUserInfo = '';
    for (let user of allUser) {
        singleUserInfo +=
            `
                <div class='single-user-info' 
                data-id='${user.id}'
                onclick='selectUser(${user.id})' >
                     ${user.firstName}
                     ${user.lastName}
                </div >
            `
    }
    usersList.innerHTML = singleUserInfo;
}
//*select user and assign todos
function selectUser(id) {
    getTodoByUserId(id)
    assignActiveClass(id)
    // markFinishedTasks()

}
function assignActiveClass(id) {
    const usersList = document.getElementsByClassName('single-user-info');
    for (let customer of usersList) {
        customer.classList.remove('active')
    }
    let user = document.querySelector(`.single-user-info[data-id='${id}']`);
    user.classList.add('active')
}

//* get all todo's
function getTodoByUserId(id) {
    fetch(`${API_URL}/todos/user/${id}`)
        .then(response => response.json())
        .then((allTodo) => allTodo.todos)
        .then(_todos => {
            todos = _todos;
            renderTodo(todos);
        });
}
function renderTodo(allTodo) {
    const toDoList = document.getElementById('content');
    let toDos = '';
    for (let todo of allTodo) {
        toDos +=
            `
            <form class='todo-form'>
                 <input type="checkbox">
                 <label class='todo-txt '
                        data-done='${todo.completed}' 
                        data-id = 'tasks' >${todo.todo}</label>
                 <div class='icons'>
                     <span class="material-symbols-outlined icon delete">delete</span>
                     <span class="material-symbols-outlined icon edit">edit</span>
                 </div>
            </form>
            `
    }

    toDoList.innerHTML = toDos;
    let task = document.querySelector('.todo-txt')
    // let done = document.querySelector(`.todo-txt[data-done='${todo.completed}']`)
    markTasks(task)
    console.log(done)

}
function markTasks(task) {
    // task.style.textDecoration='line-through'
    task.classList.add('completed')
}

//* add new todo 
//ლოგიკურად ვითომ სწორია მაგრამ არ მუშაიბს :@
let inputTodo = document.getElementById('input').innerText;
const inputBtn = document.getElementsByClassName('input-btn');
inputBtn.addEventListener('click', addNewTodo(inputTodo))

function addNewTodo(todo) {
    fetch(`${API_URL}/todos/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
        .then(todo => {
            todos.push(todo)
            renderTodo()
        });

}
