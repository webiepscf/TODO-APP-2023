// Je remplis artificiellement le localStorage.tasks
// localStorage.tasks = JSON.stringify([
//     {id: 1, content: "Tâche 1", completed: true},
//     {id: 2, content: "Tâche 2", completed: false}
// ]);

// {id:xxx, content: 'xx', completed:xxx}
function getTaskDomElement (task) {
    const li = document.createElement("li");
    // J'ajoute le data-id avec l'ide de la task
    li.dataset.id = task.id;
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
let tasks = JSON.parse(localStorage.tasks);
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

        // 6. J'actualise le nombre de tasks restantes
        renderNotCompletedCount();
    }
});
    
// TERMINER UNE TÂCHE ------------------------------------------
// Quand on change le checkbox
// 1. On ajoute ou on supprime la classe 'completed' sur le li correspondant (toggle)
// 2. On Modifie la task dans le tasks (true/false)
// 3. on écrase le localStorage.tasks

// Capture par sélection
// document.querySelectorAll(".toggle").forEach(trigger => {
//     trigger.addEventListener('change', function() {
//         this.closest('li').classList.toggle("completed");
//     })
// });

// Capture par délégation
document.addEventListener('change', (e) => {
    if (e.target.matches('.toggle')) {
        e.target.closest('li').classList.toggle("completed");
        // On récupère l'id dans le li
        const id = e.target.closest('li').dataset.id;

        // On récupère dans le tableau tasks la task qui correspond à l'id
        const task = tasks.find(task => task.id == id);
        task.completed = !task.completed;

        // J'écrase le localStorage.tasks
        localStorage.tasks = JSON.stringify(tasks);

        // J'actualise le nombre de tasks restantes
        renderNotCompletedCount();

    }
});


// SUPPRIMER UNE TASK
// 1. Quand on click sur un .destroy
// 2. On va chercher l'ID
// 3. On vire la task du tableau tasks
// 4. On vire le li du DOM (remove)
// 5. On écrase le localstorage.tasks

document.querySelector('.todo-list').addEventListener('click', (e) => {
    if (e.target.matches('.destroy')) {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);

        // Je vire la task du tableau tasks
        tasks = tasks.filter(task => task.id !== id);

        // Je vire le li du DOM
        li.remove();

        // J'actualise le localStorage
        localStorage.tasks = JSON.stringify(tasks);

        // J'actualise le nombre de tasks restantes
        renderNotCompletedCount();
    }
});

// Affichage du nombre de tasks restantes
function renderNotCompletedCount() {
    document.querySelector('.todo-count span').innerText = tasks.filter(task => !task.completed).length;
}
renderNotCompletedCount();

// MODIFICATION D'UNE TASK
// ETAPE 1: l'input
    document.querySelector('.todo-list').addEventListener('dblclick', (e) => {
        if (e.target.matches('.view label')) {
            e.target.innerHTML = `<input type="text" value="${e.target.innerText}" class="editInput" />`;
        }
    });

    // ETAPE 2: Le change
    document.querySelector('.todo-list').addEventListener('change', (e) => {
        if (e.target.matches('.view .editInput')) {
            const id = e.target.closest('li').dataset.id;
            const value = e.target.value;
            e.target.closest('label').innerHTML = value;

            // On récupère dans le tableau tasks la task qui correspond à l'id
            const task = tasks.find(task => task.id == id);
            task.content = value;

            // J'écrase le localStorage.tasks
            localStorage.tasks = JSON.stringify(tasks);
        }
    });