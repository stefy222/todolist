const taskList = document.getElementById("listaTareas");
const titleInput = document.querySelector('input[type="text"]');
const descriptionInput = document.querySelector("textarea");
const addButton = document.querySelector(".btnAdd");

let tasks = [];
let editingTaskId = null;
let nextTaskId = 1;
const localStorageKey = "tasks";

addButton.addEventListener("click", addTask);
loadTasks();

function saveTasks() {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem(localStorageKey);

    if (storedTasks !== null) {
        tasks = JSON.parse(storedTasks);
    }

    if (tasks.length > 0) {
        nextTaskId =
            Math.max(
                ...tasks.map(function (task) {
                    return task.id;
                })
            ) + 1;
    }

    renderTasks();
}

function addTask() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "") {
        return;
    }

    if (editingTaskId === null) {
        tasks.push({
            id: nextTaskId++,
            title: title,
            description: description,
            completed: false
        });
    } else {
        const editingTask = tasks.find(function (task) {
            return task.id === editingTaskId;
        });

        if (editingTask === undefined) {
            editingTaskId = null;
            return;
        }

        editingTask.title = title;
        editingTask.description = description;
        editingTaskId = null;
    }

    titleInput.value = "";
    descriptionInput.value = "";

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (task === undefined) {
        return;
    }

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    editingTaskId = id;
}

function viewTask(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (task === undefined) {
        return;
    }

    alert("Task: " + task.title + "\n\nDescription: " + task.description);
}

function toggleTaskStatus(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (task === undefined) {
        return;
    }

    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";

        const completedCheckbox = document.createElement("input");
        completedCheckbox.className = "complete";
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = task.completed;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const viewButton = document.createElement("button");
        viewButton.className = "btnVer";
        viewButton.textContent = "View";

        const deleteButton = document.createElement("button");
        deleteButton.className = "btnEliminar";
        deleteButton.textContent = "Delete";

        const editButton = document.createElement("button");
        editButton.className = "btnEditar";
        editButton.textContent = "Edit";

        taskItem.appendChild(completedCheckbox);
        taskItem.appendChild(title);
        taskItem.appendChild(description);
        taskItem.appendChild(viewButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        editButton.addEventListener("click", function () {
            editTask(task.id);
        });

        viewButton.addEventListener("click", function () {
            viewTask(task.id);
        });

        completedCheckbox.addEventListener("change", function () {
            toggleTaskStatus(task.id);
        });
    });
}