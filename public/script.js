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
            <button class="delete">Del</button>
        </div>
    `;

    const editBtn = div.querySelector(".edit");

    editBtn.addEventListener("click", () => {
        const newName = prompt("Enter new task name:", task.name);

        if (!newName) return;

        updateTask(task._id, newName);
    });

    const deleteBtn = div.querySelector(".delete");

    deleteBtn.addEventListener("click", () => {
        deleteTask(task._id);
        loadTasks();
    })

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

async function updateTask(id, name) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        loadTasks();
    } catch (error) {
        console.error(error);
    }
}

async function deleteTask(id){
    const deleted = document.getElementsByClassName("delete").value;

    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if(response.ok){
            alert("Note deleted successfully!");
        }
        else{
            alert(result.message);
        }
    } catch (error) {
        console.error("Error deleting note:", error);
    }
}

loadTasks();