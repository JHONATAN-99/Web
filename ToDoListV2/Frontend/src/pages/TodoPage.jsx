import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
  editarTarea,
} from "../services/tareasApi";

import "../styles/todo.css";

function TodoPage() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const data = await obtenerTareas();

    setTareas(data);
  };

  const agregar = async (texto) => {
    const nueva =
      await crearTarea(texto);

    setTareas([...tareas, nueva]);
  };

  const eliminar = async (id) => {
    await eliminarTarea(id);

    setTareas(
      tareas.filter((t) => t._id !== id)
    );
  };

  const editar = async (
    id,
    nuevoTexto
  ) => {
    const actualizada =
      await editarTarea(id, nuevoTexto);

    setTareas(
      tareas.map((t) =>
        t._id === id ? actualizada : t
      )
    );
  };

  return (
    <div className="todo-container">
      <h1>To Do List</h1>

      <TaskForm onAgregar={agregar} />

      <TaskList
        tareas={tareas}
        onEliminar={eliminar}
        onEditar={editar}
      />
    </div>
  );
}

export default TodoPage;