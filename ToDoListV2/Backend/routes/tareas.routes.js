const express = require("express");

const router = express.Router();

const {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  editarTarea,
  eliminarTarea,
} = require("../controllers/tareas.controller");

router.get("/", obtenerTareas);

router.get("/:id", obtenerTareaPorId);

router.post("/", crearTarea);

router.put("/:id", editarTarea);

router.patch("/:id", editarTarea);

router.delete("/:id", eliminarTarea);

module.exports = router;