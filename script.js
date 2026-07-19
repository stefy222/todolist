const listaTareas = document.getElementById("listaTareas");
const name = document.querySelector('input[type="text"]');
const description = document.querySelector("textarea");
const btnAdd = document.querySelector(".btnAdd");

let tareas = [];
let idEditar = null;
let siguienteId = 1;

btnAdd.addEventListener("click", agregarTarea);


function agregarTarea() {
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
    render();
}

function eliminarTarea(id) {
    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    render(); 
}

function editarTarea(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    name.value = tarea.titulo;
    description.value = tarea.descripcion;

    idEditar = id;
}

function verTarea(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    if (tarea === undefined) return;
    alert("Tarea: " + tarea.titulo + "\n\nDescripción: " + tarea.descripcion);
}

function cambiarEstadoTarea(id) {
    const tarea = tareas.find(function(t) {
        return t.id === id;
    });

    if (tarea === undefined) return;

    tarea.completada = !tarea.completada;
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
            eliminarTarea(tarea.id);
        });

        botonEditar.addEventListener("click", function() {
            editarTarea(tarea.id);
        });

        botonVer.addEventListener("click", function() {
            verTarea(tarea.id);
        });

        check.addEventListener("change", function() {
            cambiarEstadoTarea(tarea.id);
        });
    });

}
