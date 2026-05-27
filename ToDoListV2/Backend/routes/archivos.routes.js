const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const {
  subirArchivo,
  obtenerArchivos,
} = require("../controllers/archivos.controller");

router.post(
  "/:id/archivos",
  upload.single("archivo"),
  subirArchivo
);

router.get("/:id/archivos", obtenerArchivos);

router.get(
  "/:id/archivos/:archivoId/download",
  descargarArchivo
);

module.exports = router;