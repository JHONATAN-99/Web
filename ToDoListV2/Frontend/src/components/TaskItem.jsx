function TaskItem({ tarea, onEliminar, onEditar }) {
  const editar = () => {
    const nuevo = prompt("Editar tarea", tarea.texto);

    if (!nuevo) return;

    onEditar(tarea._id, nuevo);
  };

  return (
    <>
      <div className="task-item">
        <div>
          <h3>{tarea.texto}</h3>
        </div>

        <div className="buttons">
          <button className="edit" onClick={editar}>
            Editar
          </button>

          <button className="delete" onClick={() => onEliminar(tarea._id)}>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
}

export default TaskItem;
