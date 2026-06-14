const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const {
  subirArchivo,
  obtenerArchivos,
  descargarArchivo,
  eliminarArchivo,
  editarArchivo,
  reemplazarArchivo,
} = require("../controllers/archivos.controller");

// Todas las rutas requieren autenticación
router.use(auth);

router.post("/", upload.single("archivo"), subirArchivo);

router.get("/", obtenerArchivos);

router.get("/:archivoId/download", descargarArchivo);

router.delete("/:archivoId", eliminarArchivo);

router.patch("/:archivoId", editarArchivo);

router.put("/:archivoId", upload.single("archivo"), reemplazarArchivo);

module.exports = router;