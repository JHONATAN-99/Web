import DriveItem from "./DriveItem";

function DriveList({
  archivos,
  onDelete,
  onDownload,
  onEdit,
}) {
  return (
    <div className="files-list">
      {archivos.map(
        (archivo) => (
          <DriveItem
            key={archivo._id}
            archivo={archivo}
            onDelete={
              onDelete
            }
            onDownload={
              onDownload
            }
            onEdit={onEdit}
          />
        )
      )}
    </div>
  );
}

export default DriveList;