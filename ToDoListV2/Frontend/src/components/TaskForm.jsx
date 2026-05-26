import { useState } from "react";

function TaskForm({ onAgregar }) {
  const [texto, setTexto] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!texto.trim()) return;

    onAgregar(texto);

    setTexto("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form"
    >
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={texto}
        onChange={(e) =>
          setTexto(e.target.value)
        }
      />

      <button type="submit">
        Agregar
      </button>
    </form>
  );
}

export default TaskForm;