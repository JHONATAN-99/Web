function DriveUpload({ onUpload }) {
  const handleChange = (e) => {
    const archivo = e.target.files[0];

    if (!archivo) return;

    const tiposPermitidos = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (
      !tiposPermitidos.includes(
        archivo.type
      )
    ) {
      alert(
        "Solo se permiten archivos PDF, PNG y JPG"
      );

      e.target.value = "";

      return;
    }

    onUpload(archivo);
  };

  return (
    <div className="drive-upload">
      <input
        type="file"
        onChange={handleChange}
      />
    </div>
  );
}

export default DriveUpload;