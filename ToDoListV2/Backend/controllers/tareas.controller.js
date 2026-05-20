const Tarea = require("../models/Tarea");

const obtenerTareas = async (req, res) => {
  const tareas = await Tarea.find();

  res.json(tareas);
};

const crearTarea = async (req, res) => {
  const nuevaTarea = new Tarea(req.body);

  await nuevaTarea.save();

  res.json(nuevaTarea);
};

const eliminarTarea = async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);

  res.json({
    mensaje: "Tarea eliminada",
  });
};

const editarTarea = async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(tarea);
};

module.exports = {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
  editarTarea,
};