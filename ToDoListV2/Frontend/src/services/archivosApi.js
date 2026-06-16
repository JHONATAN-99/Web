import api from "./api";

export const obtenerArchivos = async () => {
  const res = await api.get(
    "/archivos"
  );

  return res.data;
};

export const subirArchivo = async (
  archivo
) => {
  const formData = new FormData();

  formData.append(
    "archivo",
    archivo
  );

  const res = await api.post(
    "/archivos",
    formData
  );

  return res.data;
};

export const eliminarArchivo = async (
  id
) => {
  await api.delete(
    `/archivos/${id}`
  );
};

export const editarArchivo = async (
  archivoId,
  nombreOriginal
) => {
  const res = await api.patch(
    `/archivos/${archivoId}`,
    { nombreOriginal }
  );

  return res.data;
};

export const descargarArchivo = async (id) => {
  const response = await api.get(
    `/archivos/${id}/download`,
    {
      responseType: "blob",
    }
  );

  const url = URL.createObjectURL(
    response.data
  );

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "archivo";

  document.body.appendChild(a);

  a.click();

  a.remove();

  URL.revokeObjectURL(url);
};