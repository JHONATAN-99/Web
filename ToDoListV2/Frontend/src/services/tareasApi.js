import axios from "axios";

const API =
  "http://localhost:3000/api/tareas";

export const obtenerTareas =
  async () => {
    const res = await axios.get(API);

    return res.data;
  };

export const crearTarea =
  async (texto) => {
    const res = await axios.post(API, {
      texto,
    });

    return res.data;
  };

export const eliminarTarea =
  async (id) => {
    await axios.delete(`${API}/${id}`);
  };

export const editarTarea =
  async (id, texto) => {
    const res = await axios.put(
      `${API}/${id}`,
      {
        texto,
      }
    );

    return res.data;
  };