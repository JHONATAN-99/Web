function FileItem({
  archivo,
  onDownload,
  onDelete,
}) {
  return (
    <div className="file-item">
      <span>
        {archivo.nombreOriginal}
      </span>

      <div className="file-buttons">
        <button
          onClick={() =>
            onDownload(
              archivo._id
            )
          }
        >
          Descargar
        </button>

        <button
          className="delete"
          onClick={() =>
            onDelete(
              archivo._id
            )
          }
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default FileItem;