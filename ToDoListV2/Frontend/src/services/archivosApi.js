import axios from "axios";

const API = "http://localhost:3000/api/archivos";

export const obtenerArchivos = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const subirArchivo = async (archivo) => {
  const formData = new FormData();

  formData.append("archivo", archivo);

  const res = await axios.post(API, formData);

  return res.data;
};

export const eliminarArchivo = async (id) => {
  await axios.delete(`${API}/${id}`);
};

export const descargarArchivo = (id) => {
  window.open(`${API}/${id}/download`);
};

export const editarArchivo = async (archivoId, nombreOriginal) => {
  const res = await axios.patch(`${API}/${archivoId}`, {
    nombreOriginal,
  });

  return res.data;
};
