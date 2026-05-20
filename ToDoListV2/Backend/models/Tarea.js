const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
  },

  check: {
    type: Boolean,
    default: false,
  },

  fecha: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("Tarea", tareaSchema);