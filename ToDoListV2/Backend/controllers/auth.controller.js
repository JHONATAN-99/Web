const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({
      email,
    });

    if (existe) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const hash = await bcrypt.hash(
      password,
      10
    );

    const usuario = await Usuario.create({
      nombre,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "Usuario registrado",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario =
      await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const valido =
      await bcrypt.compare(
        password,
        usuario.password
      );

    if (!valido) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registro,
  login,
};