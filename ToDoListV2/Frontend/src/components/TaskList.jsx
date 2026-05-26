import TaskItem from "./TaskItem";

function TaskList({
  tareas,
  onEliminar,
  onEditar,
}) {
  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <TaskItem
          key={tarea._id}
          tarea={tarea}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      ))}
    </div>
  );
}

export default TaskList;