import axios from "axios";

const API = "http://localhost:3000/api/tareas";

export const obtenerArchivos = async (tareaId) => {
  const res = await axios.get(
    `${API}/${tareaId}/archivos`
  );

  return res.data;
};

export const subirArchivo = async (
  tareaId,
  archivo
) => {
  const formData = new FormData();

  formData.append("archivo", archivo);

  const res = await axios.post(
    `${API}/${tareaId}/archivos`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const eliminarArchivo = async (
  tareaId,
  archivoId
) => {
  await axios.delete(
    `${API}/${tareaId}/archivos/${archivoId}`
  );
};

export const descargarArchivo = (
  tareaId,
  archivoId
) => {
  window.open(
    `${API}/${tareaId}/archivos/${archivoId}/download`
  );
};