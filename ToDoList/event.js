const btn = document.getElementById("botonAgregar");

btn.addEventListener("click", agregarTarea);

function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (texto === "") return;

  const lista = document.getElementById("tareasAgregadas");

  const div = document.createElement("div");
  div.className = "tarea";

  div.innerHTML = `
    <span class="texto">${texto}</span>
    <input type="checkbox" class="checkbox">
    <button class="editar">Editar</button>
    <button class="eliminar">Eliminar</button>
  `;

  div.querySelector(".eliminar").addEventListener("click", eliminarTarea);
  div.querySelector(".editar").addEventListener("click", editarTarea);

  lista.appendChild(div);

  input.value = "";
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