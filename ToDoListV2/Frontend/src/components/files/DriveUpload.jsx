function DriveUpload({
  onUpload,
}) {
  const handleChange = (e) => {
    const archivo =
      e.target.files[0];

    if (!archivo) return;

    onUpload(archivo);
  };

  return (
    <input
      type="file"
      onChange={handleChange}
    />
  );
}

export default DriveUpload;