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
                data-class='${user.id}'
                onclick='selectUser(${user.id})' >
                     ${user.firstName}
                     ${user.lastName}
                </div >
            `
    }
    usersList.innerHTML = singleUserInfo;
}

function selectUser(id) {
    getTodoByUserId(id)
    const singleUser = document.querySelector(`single-user-info[data-id='${id}']`);
    singleUser.classList.add('active'); // ამას წერს და რა ვუშველო? 
    // Uncaught TypeError: Cannot read properties of null (reading 'classList')
    console.log(singleUser)
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
                 <input type="checkbox" name="" id="">
                 <label class='todo-txt'>${todo.todo}</label>
                 <div class='icons'>
                     <span class="material-symbols-outlined icon delete">delete</span>
                     <span class="material-symbols-outlined icon edit">edit</span>
                 </div>
            </form>
            `
    }
    toDoList.innerHTML = toDos;
}
