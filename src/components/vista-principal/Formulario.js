import { React, useState } from "react";

function Formulario() {
  const [records, setRecords] = useState([]);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [aviso, setAviso] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [imagenURLs, setImagenURLs] = useState([]);
  const [tituloImagen, setTituloImagen] = useState("");

  const url = "http://localhost:3000/api/test/";

  const handleDeleteImage = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
    const nuevasImagenURLs = [...imagenURLs];
    nuevasImagenURLs.splice(index, 1);
    setImagenURLs(nuevasImagenURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("precio", precio);
    formData.append("aviso", aviso);
    formData.append("tituloImagen", tituloImagen);

    for (let i = 0; i < imagenes.length; i++) {
      formData.append("imagen", imagenes[i]);
    }

    fetch(`${url}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setRecords([...records, data]);
        setNombre("");
        setCategoria("");
        setPrecio("");
        setAviso("");
        setTituloImagen("");
        setImagenes([]);
        setImagenURLs([]);
      })
      .catch((error) => {
        console.error("Error al enviar la imagen:", error);
      });
  };

  // Crear URLs para mostrar miniatura de las imagenes
  const handleFileChange = (e) => {
    const archivos = e.target.files;
    const listaArchivos = Array.from(archivos);
    setImagenes(listaArchivos);
    const urls = listaArchivos.map((archivo) => URL.createObjectURL(archivo));
    setImagenURLs(urls);
  };

  return (
    <div id="formulario" className="container">
      <h2 className="mb-5 text-center">Formulario de registro de producto:</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-2">
            <label htmlFor="nombre" className="text-start">
              Nombre:
            </label>
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              id="nombre"
              className="form-control"
              placeholder="Ingrese el nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-2">
            <label htmlFor="categoria" className="col-2 text-start">
              Categoría:
            </label>
          </div>
          <div className="col-12 col-md-4">
            <select
              id="categoria"
              className="form-control"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione la categoría</option>
              <option value="Entretención">Entretención</option>
              <option value="Videojuegos">Videojuegos</option>
              <option value="Smart home">Smart home</option>
            </select>
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-2">
            <label htmlFor="precio" className="col-2 text-start">
              Precio:
            </label>
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              id="precio"
              className="form-control"
              placeholder="Ingrese el precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-2">
            <label className="text-start">Aviso:</label>
          </div>
          <div className="col-12 col-md-4 d-flex ">
            <label className="">
              <input
                type="radio"
                value="Destacado"
                checked={aviso === "Destacado"}
                onChange={(e) => setAviso(e.target.value)}
              />
              Destacado
            </label>
            <label className="">
              <input
                type="radio"
                value="Normal"
                checked={aviso === "Normal"}
                onChange={(e) => setAviso(e.target.value)}
              />
              Normal
            </label>
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-12 col-md-2">
            <label htmlFor="imagen" className="">
              Imágenes:
            </label>
          </div>
          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="titulo"
                  placeholder="Ingrese el título de la imagen"
                  className="form-control mb-2"
                  value={tituloImagen}
                  onChange={(e) => setTituloImagen(e.target.value)}
                />
              </div>
              {imagenURLs.length > 0 ? (
                imagenURLs.map((url, index) => (
                  <div key={index} className="col-6 col-md-4">
                    <img
                      src={url}
                      alt="Vista previa"
                      width="100"
                      height="100"
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-12 col-md-3">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input d-none"
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                    />
                    <label
                      className="custom-file-label btn btn-primary"
                      htmlFor="imagen"
                    >
                      Seleccionar
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4 mx-auto">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
