const crypto = require("crypto");


const Tarea = require("../models/Tarea");
const mongoose = require("mongoose");

const obtenerTareas = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const tareas = await Tarea.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Tarea.countDocuments();

    // ETag
    const etag = crypto
      .createHash("md5")
      .update(JSON.stringify(tareas))
      .digest("hex");

    res.set("ETag", etag);
    res.set("Cache-Control", "private, must-revalidate");

    if (req.headers["if-none-match"] === etag) {
      return res.status(304).send();
    }

    const data = tareas.map((tarea) => ({
      ...tarea.toObject(),

      links: {
        self: `/api/tareas/${tarea._id}`,
        update: `/api/tareas/${tarea._id}`,
        delete: `/api/tareas/${tarea._id}`,
      },
    }));

    res.status(200).json({
      data,

      meta: {
        total,
        pagina: page,
        limite: limit,
        totalPaginas: Math.ceil(total / limit),
      },

      links: {
        self: `/api/tareas?page=${page}&limit=${limit}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message,
    });
  }
};

const obtenerTareaPorId = async (req, res) => {
  try {
    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.status(200).json({
      data: tarea,

      links: {
        self: `/api/tareas/${tarea._id}`,
        update: `/api/tareas/${tarea._id}`,
        delete: `/api/tareas/${tarea._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tarea",
      error: error.message,
    });
  }
};

const crearTarea = async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({
        message: "El texto es obligatorio",
      });
    }

    const nuevaTarea = await Tarea.create({
      texto,
    });

    res.status(201).json({
      data: nuevaTarea,

      links: {
        self: `/api/tareas/${nuevaTarea._id}`,
      },

      message: "Tarea creada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear tarea",
      error: error.message,
    });
  }
};

const editarTarea = async (req, res) => {
  try {
    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.status(200).json({
      data: tarea,
      message: "Tarea actualizada",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar tarea",
      error: error.message,
    });
  }
};

const eliminarTarea = async (req, res) => {
  try {
    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const tarea = await Tarea.findByIdAndDelete(req.params.id);

    if (!tarea) {
      return res.status(404).json({
        message: "Tarea no encontrada",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar tarea",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  editarTarea,
  eliminarTarea,
};
