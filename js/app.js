// Je remplis artificiellement le localStorage.tasks
// localStorage.tasks = JSON.stringify([
//     {id: 1, content: "Tâche 1", completed: true},
//     {id: 2, content: "Tâche 2", completed: false}
// ]);



// 1. Initialiser le localstorage
// tasks -> []
    if (localStorage.tasks === undefined) {
        localStorage.tasks = JSON.stringify([]);
    }


// 2. Afficher les tasks dans le DOM
const ul = document.querySelector(".todo-list");

const tasks = JSON.parse(localStorage.tasks);

tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) {
        li.classList.add('completed');
    } 
    li.innerHTML = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ task.completed ? 'checked': '' } />
            <label>${ task.content }</label>
            <button class="destroy"></button>
        </div>`;
  ul.appendChild(li);
});
