import FileItem from "./FileItem";

function FileList({
  archivos,
  onDownload,
  onDelete,
}) {
  return (
    <div className="files-list">
      {archivos.map((archivo) => (
        <FileItem
          key={archivo._id}
          archivo={archivo}
          onDownload={
            onDownload
          }
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default FileList;