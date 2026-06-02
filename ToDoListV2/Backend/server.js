const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();

const tareasRoutes = require("./routes/tareas.routes");
const archivosRoutes = require("./routes/archivos.routes");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use("/uploads", express.static("uploads"));

// Base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.error(err));

// Rutas
app.use("/api/tareas", tareasRoutes);
app.use("/api/archivos", archivosRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});