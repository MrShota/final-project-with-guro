const list = document.getElementById('employees-list');
const userInfo = document.querySelector('.user-info');

//*calling functions
getUsersData();
getId();
getTodo(1); //* რომელ აიდისაც გადაცემ მოაქვს მისი ტასკები
//*get all user from server
function getUsersData() {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(allUser => {
            renderUser(allUser.users);
        })
}
//*render user by name and last name
function renderUser(allUser) {
    for (let user of allUser) {
        list.innerHTML += `
             <div class='user-info' > 
                  ${user.firstName}
                  ${user.lastName}
             </div >
        `
    }
}
//*get id
function getId() {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(allId => {
            // for (let id of allId.users){
            //     getTodo(id)

            // }
        })
}
//* get all todo's
function getTodo(id) {
    fetch(`https://dummyjson.com/todos/user/${id}`) 
        .then(response => response.json())
        .then(allTodo => {
            renderTodo(allTodo.todos)
        });
}
function renderTodo(allTodo) {
    for (let todo of allTodo) {

        content.innerHTML += `
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
}
