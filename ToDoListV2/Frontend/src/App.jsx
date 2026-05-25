import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000/api/tareas";

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  const obtenerTareas = async () => {
    try {
      const res = await axios.get(API);

      setTareas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  // =========================
  // AGREGAR
  // =========================
  const agregarTarea = async () => {
    if (texto.trim() === "") return;

    try {
      const nuevaTarea = {
        texto,
      };

      const res = await axios.post(API, nuevaTarea);

      setTareas([...tareas, res.data]);

      setTexto("");
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setTareas(
        tareas.filter((t) => t._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (id, textoActual) => {
    const nuevoTexto = prompt(
      "Editar tarea",
      textoActual
    );

    if (!nuevoTexto) return;

    try {
      const res = await axios.put(
        `${API}/${id}`,
        {
          texto: nuevoTexto,
        }
      );

      setTareas(
        tareas.map((t) =>
          t._id === id ? res.data : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>To Do List</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={texto}
          onChange={(e) =>
            setTexto(e.target.value)
          }
        />

        <button onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <div className="lista">
        {tareas.map((tarea) => (
          <div
            className="tarea"
            key={tarea._id}
          >
            <div>
              <h3>{tarea.texto}</h3>

              <small>{tarea.fecha}</small>
            </div>

            <div className="botones">
              <button
                className="editar"
                onClick={() =>
                  editarTarea(
                    tarea._id,
                    tarea.texto
                  )
                }
              >
                Editar
              </button>

              <button
                className="eliminar"
                onClick={() =>
                  eliminarTarea(tarea._id)
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;