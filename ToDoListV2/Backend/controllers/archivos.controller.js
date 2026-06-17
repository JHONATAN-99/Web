const mongoose = require("mongoose");
const fs = require("fs");

const Archivo = require("../models/Archivo");

const subirArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No se envió archivo",
      });
    }

    const archivo = await Archivo.create({
      nombreOriginal: req.file.originalname,
      nombreGuardado: req.file.filename,
      tipo: req.file.mimetype,
      tamano: req.file.size,
      ruta: req.file.path,
      usuario: req.usuario.id,
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
    const archivos = await Archivo.find({
      usuario: req.usuario.id,
    }).sort({
      createdAt: -1,
    });

    const data = archivos.map((archivo) => ({
      ...archivo.toObject(),

      links: {
        download: `/api/archivos/${archivo._id}/download`,
        delete: `/api/archivos/${archivo._id}`,
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

const descargarArchivo = async (req, res) => {
  try {
    const { archivoId } = req.params;

    // validar id
    if (!mongoose.Types.ObjectId.isValid(archivoId)) {
      return res.status(400).json({
        message: "ID de archivo inválido",
      });
    }

    const archivo = await Archivo.findOne({
      _id: archivoId,
      usuario: req.usuario.id,
    });

    if (!archivo) {
      return res.status(404).json({
        message: "Archivo no encontrado",
      });
    }

    res.download(
      archivo.ruta,
      archivo.nombreOriginal
    );
  } catch (error) {
    res.status(500).json({
      message: "Error al descargar archivo",
      error: error.message,
    });
  }
};

const eliminarArchivo = async (req, res) => {
  try {
    const { archivoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(archivoId)) {
      return res.status(400).json({
        message: "ID de archivo invalido",
      });
    }

    const archivo = await Archivo.findOneAndDelete({
      _id: archivoId,
      usuario: req.usuario.id,
    });

    if (!archivo) {
      return res.status(404).json({
        message: "Archivo no encontrado",
      });
    }

    fs.unlink(archivo.ruta, (error) => {
      if (error && error.code !== "ENOENT") {
        console.log(error);
      }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar archivo",
      error: error.message,
    });
  }
};

const editarArchivo = async (req, res) => {
  try {
    const { archivoId } = req.params;
    const { nombreOriginal } = req.body;

    if (!mongoose.Types.ObjectId.isValid(archivoId)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const archivo = await Archivo.findOneAndUpdate(
      {
        _id: archivoId,
        usuario: req.usuario.id,
      },
      {
        nombreOriginal,
      },
      {
        new: true,
      }
    );

    if (!archivo) {
      return res.status(404).json({
        message: "Archivo no encontrado",
      });
    }

    res.status(200).json({
      data: archivo,
      message: "Archivo renombrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar archivo",
      error: error.message,
    });
  }
};

const reemplazarArchivo = async (req, res) => {
  try {
    const { archivoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(archivoId)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const archivo = await Archivo.findOne({
      _id: archivoId,
      usuario: req.usuario.id,
    });

    if (!archivo) {
      return res.status(404).json({
        message: "Archivo no encontrado",
      });
    }

    // borrar archivo viejo
    if (fs.existsSync(archivo.ruta)) {
      fs.unlinkSync(archivo.ruta);
    }

    // actualizar datos
    archivo.nombreOriginal = req.file.originalname;
    archivo.nombreGuardado = req.file.filename;
    archivo.tipo = req.file.mimetype;
    archivo.tamano = req.file.size;
    archivo.ruta = req.file.path;

    await archivo.save();

    res.status(200).json({
      data: archivo,
      message: "Archivo reemplazado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al reemplazar archivo",
      error: error.message,
    });
  }
};

module.exports = {
  subirArchivo,
  obtenerArchivos,
  descargarArchivo,
  eliminarArchivo,
  editarArchivo,
  reemplazarArchivo,
};
