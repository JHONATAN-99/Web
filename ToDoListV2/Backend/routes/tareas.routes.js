const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");

const {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  editarTarea,
  eliminarTarea,
} = require("../controllers/tareas.controller");

// Todas las rutas requieren autenticación
router.use(auth);

router.get("/", obtenerTareas);

router.get("/:id", obtenerTareaPorId);

router.post("/", crearTarea);

router.put("/:id", editarTarea);

router.patch("/:id", editarTarea);

router.delete("/:id", eliminarTarea);

module.exports = router;