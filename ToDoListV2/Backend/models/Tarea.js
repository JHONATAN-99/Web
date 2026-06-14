const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true,
      trim: true,
    },

    check: {
      type: Boolean,
      default: false,
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tarea", tareaSchema);