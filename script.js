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
        descripcion: descripcion
    });
    }

    else { 
       const tareaEditar = tareas.find(function(t) {
    return t.id === idEditar;
    });

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

function render() {

    listaTareas.innerHTML = "";

    tareas.forEach(function(tarea) {

        const li = document.createElement("li");

        const titulo = document.createElement("h3");
        titulo.textContent = tarea.titulo;

        const descripcion = document.createElement("p");
        descripcion.textContent = tarea.descripcion;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";

        li.appendChild(titulo);
        li.appendChild(descripcion);
        li.appendChild(botonEliminar);
        li.appendChild(botonEditar);

        listaTareas.appendChild(li);
        
        botonEliminar.addEventListener("click", function() {
        eliminarTarea(tarea.id);
        });

        botonEditar.addEventListener("click", function() {
        editarTarea(tarea.id);
        });

        

    });

}
