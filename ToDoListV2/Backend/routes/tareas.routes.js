const express = require("express");

const router = express.Router();

const {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
  editarTarea,
} = require("../controllers/tareas.controller");

router.get("/", obtenerTareas);

router.post("/", crearTarea);

router.put("/:id", editarTarea);

router.delete("/:id", eliminarTarea);

module.exports = router;