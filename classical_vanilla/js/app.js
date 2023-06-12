// Je remplis artificiellement le localStorage.tasks
// localStorage.tasks = JSON.stringify([
//     {id: 1, content: "Tâche 1", completed: true},
//     {id: 2, content: "Tâche 2", completed: false}
// ]);

// {id:xxx, content: 'xx', completed:xxx}
function getTaskDomElement (task) {
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
    return li;
}

// 1. Initialiser le localstorage
// tasks -> []
    if (localStorage.tasks === undefined) {
        localStorage.tasks = JSON.stringify([]);
    }

// 2. Afficher les tasks dans le DOM
const ul = document.querySelector(".todo-list");
const tasks = JSON.parse(localStorage.tasks);
tasks.forEach(task => {
  ul.appendChild(getTaskDomElement(task));
});

// AJOUT D'UNE TÂCHE ------------------------------------------
// Keyup, enter et que le champ n'est pas vide
// Créer un li et l'ajouter dans le UL
// Il va falloir mettre à jour le tableau tasks et le localStorage
document.querySelector(".new-todo").addEventListener("keyup",function (e){
    if(e.key === "Enter" && this.value != ''){
        // 1. Créer un objet littéral
        const newTask = {
            id: new Date().valueOf(),
            content: this.value,
            completed: false,
        };

        // 2. Ajouter un li dans le ul (insertBefore)
        ul.insertBefore(getTaskDomElement(newTask), ul.firstChild);
        
        // 3. Ajouter la tâche dans tasks (push)
        tasks.unshift(newTask);

        // 4. Ecraser le localStorage.tasks avec les tasks
        //localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.tasks = JSON.stringify(tasks);

        // 5. Vider le champs
        this.value = '';
    }
});
