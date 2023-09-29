//Capturamos elementos
const newTaskInput = document.querySelector("#newTask");
const addTaskBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");
let taskListStorage = [];

//Función que agrega tarea

function addTask(e) {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if(taskText) {
        const taskItem = `<li class="itemList">${taskText}<button class="trashBtn">Delete</button></li>`;
        taskList.innerHTML += taskItem;
        newTaskInput.value = "";
        taskListStorage.push(taskText);
        //Guarda en el localStorage la lista de tareas (taskListStorage) convirtiéndola en un json
        localStorage.setItem("taskListJson", JSON.stringify(taskListStorage));
    }
}
//Creamos eventos
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", (e) => {
    //Evalúa si el botón tiene una clase trashBtn
    if(e.target.classList.contains("trashBtn")) {
        e.target.parentElement.remove();
        
    }
});
