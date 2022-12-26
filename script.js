const API_URL = 'https://dummyjson.com';
const wellcome = document.getElementById('wellcome-text')
//*calling functions
getUsersData();
getTodoByUserId();
selectUser();




//*get all user from server
function getUsersData() {
    fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then((allUser) => allUser.users)
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
                <div class='user-info' onclick='selectUser(userId)' > 
                     ${user.firstName}
                     ${user.lastName}
                </div >
            `
    }
    usersList.innerHTML = singleUserInfo
}

function selectUser() {
    // list.i.style.backgroundColor = 'rgb(20, 125, 170)';
    header.style.display = 'none';
    getTodoByUserId(userId)
}

//* get all todo's
function getTodoByUserId(userId) {
    fetch(`${API_URL}/todos/user/${userId}`)
        .then(response => response.json())
        .then((allTodo) => allTodo.todos)
        .then(_todos => {
            todos = _todos;
            renderTodo(todos)
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
