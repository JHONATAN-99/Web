import { useEffect, useState } from "react";

import {
  obtenerArchivos,
  subirArchivo,
  eliminarArchivo,
  descargarArchivo,
  editarArchivo,
} from "../services/archivosApi";

import DriveUpload from "../components/files/DriveUpload";
import DriveList from "../components/files/DriveList";

import "../styles/drive.css";

function DrivePage() {
  const [archivos, setArchivos] =
    useState([]);

  useEffect(() => {
    cargarArchivos();
  }, []);

  const cargarArchivos = async () => {
    try {
      const response =
        await obtenerArchivos();

      setArchivos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (
    archivo
  ) => {
    try {
      await subirArchivo(
        archivo
      );

      cargarArchivos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    archivoId
  ) => {
    try {
      await eliminarArchivo(
        archivoId
      );

      setArchivos(
        archivos.filter(
          (archivo) =>
            archivo._id !==
            archivoId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (
    archivoId
  ) => {
    descargarArchivo(
      archivoId
    );
  };

  const handleEdit = async (
  archivo
) => {
  const nuevoNombre =
    prompt(
      "Nuevo nombre",
      archivo.nombreOriginal
    );

  if (!nuevoNombre)
    return;

  try {
    await editarArchivo(
      archivo._id,
      nuevoNombre
    );

    cargarArchivos();
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
        "Error al editar archivo"
    );
  }
};

  return (
    <div className="drive-container">
      <h1>Drive</h1>

      <DriveUpload
        onUpload={
          handleUpload
        }
      />

      <DriveList
        archivos={archivos}
        onDelete={
          handleDelete
        }
        onDownload={
          handleDownload
        }
        onEdit={handleEdit}
      />
    </div>
  );
}

export default DrivePage;