import api from "./api";

export const obtenerTareas = async () => {
  const res = await api.get("/tareas");
  return res.data;
};

export const crearTarea = async (texto) => {
  const res = await api.post(
    "/tareas",
    { texto }
  );

  return res.data;
};

export const eliminarTarea = async (id) => {
  await api.delete(`/tareas/${id}`);
};

export const editarTarea = async (
  id,
  texto
) => {
  const res = await api.patch(
    `/tareas/${id}`,
    { texto }
  );

  return res.data;
};