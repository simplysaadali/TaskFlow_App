const button = document.getElementById("add-btn");

button.addEventListener("click", addTask)


function displayOneTask(task){
    const taskList = document.getElementById("task-list");

    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
        <div class="left">
            <span class="circle"></span>
            <span>${task.name}</span>
        </div>

        <div class="right">
            <button class="edit">Edit</button>
            <button class="update">Upd</button>
            <button class="delete">Del</button>
        </div>
    `;

    taskList.appendChild(div);
}

async function loadTasks() {
    console.log("Loading tasks...");

    const taskList = document.getElementById("task-list");

    try {
        const response = await fetch("http://localhost:3000/tasks");
        const result = await response.json();

        console.log(result);

        taskList.innerHTML = "";

        result.tasks.forEach(task => {
            displayOneTask(task);
        });
    } catch (error) {
        console.log(error);
    }
}

async function addTask(){
    const input = document.getElementById("addTask");
    const name = input.value;
    try {
        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
            })
        });

        if(!response.ok){
            throw new Error ("Failed to add data");
        }

         input.value = ""

        loadTasks();

    } catch (error) {
        console.error("Error Posting data");
    }
}

loadTasks();