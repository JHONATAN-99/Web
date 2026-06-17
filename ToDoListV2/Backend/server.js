const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();

const tareasRoutes = require("./routes/tareas.routes");
const archivosRoutes = require("./routes/archivos.routes");
const authRoutes = require("./routes/auth.routes");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// ==========================================
// 🛠️ MIDDLEWARES (ACTUALIZADO PARA PRODUCCIÓN)
// ==========================================
const whitelist = [
  "http://localhost:5173", // URL típica si usas Vite localmente
  "http://localhost:3000", // URL típica si usas Create React App localmente
  // 👇 AQUÍ PEGURÁS LA URL QUE TE DE VERCEL CUANDO DESPLIEGUES EL FRONTEND:
  "https://tu-app-frontend.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o el propio servidor haciendo fetch)
    if (!origin) return callback(null, true);
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
// ==========================================

// Archivos estáticos
app.use("/uploads", express.static("uploads"));

// Base de datos (Usa tu variable MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado exitosamente"))
  .catch((err) => console.error("Error al conectar a Mongo:", err));

// Rutas
app.use("/api/tareas", tareasRoutes);
app.use("/api/archivos", archivosRoutes);
app.use("/api/auth", authRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Manejador de errores global
app.use((err, req, res, next) => {
  if (err.message === "Solo se permiten archivos PDF, PNG y JPG") {
    return res.status(415).json({
      message: err.message,
    });
  }

  // Si el error viene de CORS
  if (err.message === "No permitido por CORS") {
    return res.status(403).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});