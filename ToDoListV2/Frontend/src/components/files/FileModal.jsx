import {
  useEffect,
  useState,
} from "react";

import {
  obtenerArchivos,
  subirArchivo,
  eliminarArchivo,
  descargarArchivo,
} from "../../services/archivosApi";

import FileUpload from "./FileUpload";
import FileList from "./FileList";

function FileModal({
  tareaId,
  onClose,
}) {
  const [archivos, setArchivos] =
    useState([]);

  const cargarArchivos =
    async () => {
      const res =
        await obtenerArchivos(
          tareaId
        );

      setArchivos(res.data);
    };

  useEffect(() => {
    cargarArchivos();
  }, []);

  const handleUpload =
    async (archivo) => {
      await subirArchivo(
        tareaId,
        archivo
      );

      cargarArchivos();
    };

  const handleDelete =
    async (archivoId) => {
      await eliminarArchivo(
        tareaId,
        archivoId
      );

      cargarArchivos();
    };

  const handleDownload =
    (archivoId) => {
      descargarArchivo(
        tareaId,
        archivoId
      );
    };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          Archivos de la tarea
        </h2>

        <FileUpload
          onUpload={
            handleUpload
          }
        />

        <FileList
          archivos={archivos}
          onDelete={
            handleDelete
          }
          onDownload={
            handleDownload
          }
        />

        <button
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default FileModal;