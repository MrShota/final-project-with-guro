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

}
function assignActiveClass(id) {
    let usersList = document.getElementById('employees-list');
    let user = document.querySelector(`.single-user-info[data-id='${id}']`);
    user.classList.add('active')
    console.log(user)
}

//!აგდებს ერორს usersList is not iterable
// function handleUserClick(id) {
//     let usersList = document.getElementById('employees-list');
//     for (let user of usersList) {
//         user.classList.remove('active')
//     }

//     let user = document.querySelector(`.single-user-info[data-id='${id}']`);
//     user.classList.add('active');
// }
// function registerEventListeners() {
//     let usersList = document.getElementById('employees-list');
//     usersList.addEventListener('click', (event) => {
//         handleUserClick(event.target.dataset.id)
//     })

// }


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
                 <input type="checkbox" name="" id="">
                 <label class='todo-txt' 
                        data-id = 'tasks' >${todo.todo}</label>
                 <div class='icons'>
                     <span class="material-symbols-outlined icon delete">delete</span>
                     <span class="material-symbols-outlined icon edit">edit</span>
                 </div>
            </form>
            `
        // console.log(todo.completed)
        // if (todo.completed === true) {
        // }
        // let dlt = document.getElementsByClassName('delete')
        // dlt.addEventListener('click', deleteTask(`${todo.todo}`))
    }
    toDoList.innerHTML = toDos;
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
