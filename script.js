const listaTareas = document.getElementById("listaTareas");
const name = document.querySelector('input[type="text"]');
const description = document.querySelector("textarea");
const btnAdd = document.querySelector(".btnAdd");

let tareas = [];
let idEditar = null;
let siguienteId = 1;
const localTasks = "tareas";

btnAdd.addEventListener("click", addTasks);
    storageTasks();

function saveTasks() {
    localStorage.setItem(localTasks, JSON.stringify(tareas));
}

function storageTasks() {
    let tareasLocal = localStorage.getItem(localTasks);

    if (tareasLocal !== null) {
        tareas = JSON.parse(tareasLocal);
    }

    if (tareas.length > 0) {
        siguienteId = Math.max(...tareas.map(function(tarea) {
            return tarea.id;
        })) + 1;
    }

    render();
}


function addTasks() {
    let tarea = name.value.trim();
    let descripcion = description.value.trim();

    if (tarea === "") {
        return;
    }

    if (idEditar === null) {
        tareas.push({
            id: siguienteId++,
            titulo: tarea,
            descripcion: descripcion,
            completada: false
        });
    } else {
        const tareaEditar = tareas.find(function(t) {
            return t.id === idEditar;
        });
        if (tareaEditar === undefined) {
            idEditar = null;
            return;
        }
        tareaEditar.titulo = tarea;
        tareaEditar.descripcion = descripcion;
        idEditar = null;
    }
    name.value = "";
    description.value = "";
    saveTasks();
    render();
}

function removeTasks(id) {
    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    saveTasks();
    render(); 
}

function editeTasks(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    name.value = tarea.titulo;
    description.value = tarea.descripcion;

    idEditar = id;
}

function viewTasks(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    if (tarea === undefined) return;
    alert("Tarea: " + tarea.titulo + "\n\nDescripción: " + tarea.descripcion);
}

function changeTasks(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    if (tarea === undefined) return;

    tarea.completada = !tarea.completada;
    saveTasks();
    render();
}

function render() {

    listaTareas.innerHTML = "";

    tareas.forEach(function(tarea) {

        const li = document.createElement("li");
        li.className = tarea.completada ? "completada" : "";

        const check = document.createElement("input");
        check.className = "complete";
        check.type = "checkbox";
        check.checked = tarea.completada;

        const titulo = document.createElement("h3");
        titulo.textContent = tarea.titulo;

        const descripcion = document.createElement("p");
        descripcion.textContent = tarea.descripcion;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        const botonEditar = document.createElement("button");
        botonEditar.className = "btnEditar";
        botonEditar.textContent = "Editar";

        const botonVer = document.createElement("button");
        botonVer.className = "btnVer";
        botonVer.textContent = "Ver";

        botonEliminar.className = "btnEliminar";

        li.appendChild(check);
        li.appendChild(titulo);
        li.appendChild(descripcion);
        li.appendChild(botonVer);
        li.appendChild(botonEliminar);
        li.appendChild(botonEditar);

        listaTareas.appendChild(li);
        
        botonEliminar.addEventListener("click", function() {
            removeTasks(tarea.id);
        });

        botonEditar.addEventListener("click", function() {
            editeTasks(tarea.id);
        });

        botonVer.addEventListener("click", function() {
            viewTasks(tarea.id);
        });

        check.addEventListener("change", function() {
            changeTasks(tarea.id);
        });
    });

}
