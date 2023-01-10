const API_URL = 'https://dummyjson.com';
const wellcome = document.getElementById('wellcome-text')
const btnAll = document.getElementById('btn-all');
const btnActive = document.getElementById('btn-active');
const btnCompleted = document.getElementById('btn-completed');


//*calling functions
getUsersData();

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
function renderTodo() {
    const toDoList = document.getElementById('content');
    let toDos = '';
    for (let todo of todos) {
        toDos +=
            `
        <form class='todo-form' >
              <input type='checkbox' 
                     class = 'check-btn' 
                     data-id = '${todo.id}'
                     id=todo-'${todo.id}' ${todo.completed ? 'checked' : ''}>
              <label id = 'todo-txt'
                     onclick = 'markAsCompleted(${todo.id})' 
                     for='todo-${todo.id}'
                     class= '${todo.completed ? 'completed' : ''}'
                     data-done='${todo.completed}'
                     data-id = '${todo.id}' 
                     data-task='${todo.todo}'>
                                        ${todo.todo}
               </label>
               <div class='icons'>
                     <span class="material-symbols-outlined icon delete" onclick = 'deleteTask(event,${todo.id})'>delete</span>
                     <span class="material-symbols-outlined icon edit">edit</span>
                </div>
        </form>
    `
        // console.log(`${todo.completed}`)
    }
    toDoList.innerHTML = toDos;
}
function markAsCompleted(id) {
    let userTask = document.querySelector(`#todo-txt[data-id='${id}']`);
    userTask.classList.add('completed');

    document.querySelector(`.check-btn[data-id = '${id}']`).checked=true;
}
function deleteTask(event, id) {
    event.stopPropagation();

    fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            todos = todos.filter(todo => todo.id != data.id)
            renderTodo();
        });

}


//* add new todo
//ლოგიკურად ვითომ სწორია მაგრამ არ მუშაიბს :@
// let inputTodo = document.getElementById('input').innerText;
// const inputBtn = document.getElementsByClassName('input-btn');
// inputBtn.addEventListener('click', addNewTodo(inputTodo))

// function addNewTodo(todo) {
//     fetch(`${API_URL}/todos/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(todo)
//     })
//         .then(res => res.json())
//         .then(todo => {
//             todos.push(todo)
//             renderTodo()
//         });

// }
