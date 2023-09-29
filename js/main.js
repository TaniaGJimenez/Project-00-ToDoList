//Capturamos elementos
const newTaskInput = document.querySelector("#newTask");
const addTaskBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");
let taskListStorage = [];

//Función para cargar datos desde el localStorage
function loadTasksFromLocalStorage(){
    const taskListJson = localStorage.getItem("taskListJson");
    if(taskListJson){
        taskListStorage = JSON.parse(taskListJson);
        taskListStorage.forEach(taskText =>{
            const taskItem = `<li class="itemList">${taskText}<i class="trashBtn fa-regular fa-trash-can"></i></li>`;
            taskList.innerHTML += taskItem;
        });
    }
}

//Invocamos la función al cargar la página
loadTasksFromLocalStorage();

//Función que agrega tarea

function addTask(e) {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if(taskText) {
        const taskItem = `<li class="itemList">${taskText}<i class="trashBtn fa-regular fa-trash-can"></i></li>`;
        taskList.innerHTML += taskItem;
        newTaskInput.value = "";
        taskListStorage.push(taskText);
        //Guarda en el localStorage la lista de tareas (taskListStorage) convirtiéndola en un json
        localStorage.setItem("taskListJson", JSON.stringify(taskListStorage));
    }
}
//Creamos eventos
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);

//Agrega tarea con tecla Enter
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask(e);
    }
});

// Función para eliminar una tarea y eliminarla del localStorage
function deleteTask(e) {
    if (e.target.classList.contains("trashBtn")) {
        const taskText = e.target.parentElement.textContent;
        const index = taskListStorage.indexOf(taskText);
        if (index !== -1) {
            taskListStorage.splice(index, 1);
            localStorage.setItem("taskListJson", JSON.stringify(taskListStorage));
        }
        e.target.parentElement.remove();
    }
}