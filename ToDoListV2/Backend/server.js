const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();

const archivosRoutes = require("./routes/archivos.routes");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.log(err));

app.use("/api/tareas", require("./routes/tareas.routes"));

app.use("/api/tareas", archivosRoutes);

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});