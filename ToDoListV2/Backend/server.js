const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.log(err));

app.use("/api/tareas", require("./routes/tareas.routes"));

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});