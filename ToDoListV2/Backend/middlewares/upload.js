const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const nombreUnico =
      Date.now() + path.extname(file.originalname);

    cb(null, nombreUnico);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Solo se permiten archivos PDF, PNG y JPG"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;