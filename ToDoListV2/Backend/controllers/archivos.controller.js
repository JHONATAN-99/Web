const mongoose = require("mongoose");

const Archivo = require("../models/Archivo");

const Tarea = require("../models/Tarea");

const subirArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // validar id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    // verificar tarea
    const tarea = await Tarea.findById(id);

    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    // verificar archivo
    if (!req.file) {
      return res.status(400).json({
        message: "No se envió archivo",
      });
    }

    const archivo = await Archivo.create({
      tarea: tarea._id,

      nombreOriginal: req.file.originalname,

      nombreGuardado: req.file.filename,

      tipo: req.file.mimetype,

      tamano: req.file.size,

      ruta: req.file.path,
    });

    res.status(201).json({
      data: archivo,

      message: "Archivo subido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al subir archivo",
      error: error.message,
    });
  }
};

const obtenerArchivos = async (req, res) => {
  try {
    const { id } = req.params;

    // validar id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    // verificar tarea
    const tarea = await Tarea.findById(id);

    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    const archivos = await Archivo.find({
      tarea: id,
    });

    const data = archivos.map((archivo) => ({
      ...archivo.toObject(),

      links: {
        download: `/api/tareas/${id}/archivos/${archivo._id}/download`,
        delete: `/api/tareas/${id}/archivos/${archivo._id}`,
      },
    }));

    res.status(200).json({
      data,

      meta: {
        total: archivos.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener archivos",
      error: error.message,
    });
  }
};

module.exports = {
  subirArchivo,
  obtenerArchivos,
};