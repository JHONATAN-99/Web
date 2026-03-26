const btn = document.getElementById("botonAgregar");

window.onload = function () {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareas.forEach((t) => {
    crearTarea(t.texto, t.check ,t.fecha);
  });
};

btn.addEventListener("click", agregarTarea);

function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (texto === "") return;
  crearTarea(texto);
  guardar();

  input.value = "";
}

function crearTarea(texto, check = false, fecha = null) {
  const lista = document.getElementById("tareasAgregadas");

  const div = document.createElement("div");
  div.className = "tarea";

  if (!fecha) {
    fecha = new Date().toLocaleString();
  }

  div.innerHTML = `
    <span class="texto">${texto}</span></p>
    
    <input type="checkbox" class="checkbox" ${check ? "checked" : ""}>
    <button class="editar">Editar</button>
    <button class="eliminar">Eliminar</button>
    <small class="fecha">${fecha}</small>
  `;

  div.querySelector(".eliminar").addEventListener("click", (e) => {
    div.remove();
    guardar();
  });

  div.querySelector(".editar").addEventListener("click", (e) => {
    const span = div.querySelector(".texto");
    const nuevo = prompt("Editar:", span.textContent);

    if (nuevo) {
      span.textContent = nuevo;
      guardar();
    }
  });

  div.querySelector(".checkbox").addEventListener("change", guardar);

  lista.appendChild(div);
}

function eliminarTarea(event) {
  const tarea = event.target.parentElement;
  tarea.remove();
}

function editarTarea(event) {
  const tarea = event.target.parentElement;
  const span = tarea.querySelector(".texto");

  const nuevoTexto = prompt("Editar tarea:", span.textContent);

  if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
    span.textContent = nuevoTexto;
  }
}

function guardar() {
  const tareas = [];

  document.querySelectorAll(".tarea").forEach((t) => {
    tareas.push({
      texto: t.querySelector(".texto").textContent,
      check: t.querySelector(".checkbox").checked,
      fecha: t.querySelector(".fecha").textContent,
    });
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));
}
