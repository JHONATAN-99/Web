const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const {
  subirArchivo,
  obtenerArchivos,
  descargarArchivo,
  eliminarArchivo,
  editarArchivo,
} = require("../controllers/archivos.controller");

router.post(
  "/",
  upload.single("archivo"),
  subirArchivo
);

router.get("/", obtenerArchivos);

router.get(
  "/:archivoId/download",
  descargarArchivo
);

router.delete(
  "/:archivoId",
  eliminarArchivo
);

router.patch("/:archivoId", editarArchivo);

module.exports = router;