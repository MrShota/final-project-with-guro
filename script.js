const list = document.getElementById('employees-list');
const userInfo = document.querySelector('.user-info');

//*calling functions
getUsersData();
// getId();
//1) კარგია ეს თუდუესბი წამოღება მუშაობს, ფქუნციას სახელი გადაარქვი უფრო გასგები რომ იყოს getTodoByUserId დაარქვი,
// 2) დეფოლტად არაფერს არ უნდა დაუძახო, როცა პირველად ჩაიტვრითება როგორც დემო აპლიკაციაშია ეგრე დაწერე: დავალების სიის წამოსაღებად დააჭირე იუზერს.
// ანუ ჯერ იუზერს ირჩევ და მერე ეძახი getTodoByUserId

getTodo(1); //* რომელ აიდისაც გადაცემ მოაქვს მისი ტასკები
//*get all user from server
function getUsersData() {
    //API მისმართი ცალკე const ცვლადში შეინახე. https://dummyjson.com
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(allUser => {
            renderUser(allUser.users);
        })
}
//*render user by name and last name
// როცა იუზერებს დაარენდერებ, თან ქლიქ ივენთი მიაბი onclick="selectUser(user.id)" ცალკე ფუნქცია აღწერე selectUser რომელიც 
// მონიშნულ იუზერს ლურჯ ბექგრაუნდს დაადებს ლისტში და getTodo-ს დაუძახებს შესაბამისი ID ით.
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
// ეს ფუქნცია არ გჭრიდება.
// function getId() {
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(allId => {
//             // for (let id of allId.users){
//             //     getTodo(id)

//             // }
//         })
// }
//* get all todo's
function getTodo(id) {
    fetch(`https://dummyjson.com/todos/user/${id}`)
        .then(response => response.json())
        .then(allTodo => {
            renderTodo(allTodo.todos)
        });
}
function renderTodo(allTodo) {
    let todos = '';
    // innerHtml-ი ციკლში რომ გიწერია ყოველ ციკლის შესვლაზე მთლიანი cotnent ის რე რენდერს იწვევს, 
    // მაგიტომაც ჯერ სტრინგი შევაკვრევინე მთლიანად თუდუესბი და ციკლედან რომ გამოვა მერე მივანიჭე ერთხელ.
    // renderUser  - ის შემთხვევაშიც ეგრე გაქვს და ასე გადააკეთე.
    for (let todo of allTodo) {
        todos += `
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
    // content გაგიმართლა რომ ქრომს შეუძლია html თეგში აიდი რაც გაქვს მაგას პირდაპირ მიწვდეს getElementById -ის გარეშე.
    // სხვა ბრაუზერებში გაგისხავს, მაგიტომაც ელემენტი მოასელექთე და შეინახე ცვლადში.
    content.innerHTML = todos;
}
