const mongoose = require("mongoose");

const archivoSchema = new mongoose.Schema(
  {
    tarea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tarea",
      required: true,
    },

    nombreOriginal: {
      type: String,
      required: true,
    },

    nombreGuardado: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    tamano: {
      type: Number,
      required: true,
    },

    ruta: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Archivo", archivoSchema);