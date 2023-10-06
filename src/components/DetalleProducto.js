import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalleProducto() {
  const params = useParams();
  const id = params.id;
  const url = "http://localhost:3000/api/test/";
  const [producto, setProducto] = useState(null);
  const [blobURLs, setBlobURLs] = useState([]); 

  useEffect(() => {
    if (id) {
      fetch(`${url}detalles/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
          }
          return response.json();
        })
        .then((data) => {
          setProducto(data);
          // Crear URLs para mostrar las imágenes
          const urls = data.imagenes.map((imagen) => {
            const blob = new Blob([new Uint8Array(imagen.data.data)], {
              type: imagen.contentType,
            });
            return URL.createObjectURL(blob);
          });
          setBlobURLs(urls);
        })
        .catch((error) => console.error("Error al obtener detalles:", error));
    }
  }, [id]);

  return (
    <div className="container-fluid p-4 bg-warning-subtle">
      <h2 className="card-title text-center mb-3">Detalles del Producto</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-7 col-12 mb-4">
          <div
            id="carouselExampleInterval"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              {blobURLs.map((blobURL, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={blobURL}
                    alt={`Imagen del Producto ${index + 1}`}
                    className="d-block w-100"
                  />
                </div>
              ))}
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-7 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <p className="card-text">ID: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto._id}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p className="card-text">Nombre: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto.nombre}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p className="card-text">Categoría: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto.categoria}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p className="card-text">Precio: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto.precio}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p className="card-text">Aviso: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto.aviso}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <p className="card-text">Título de la Imagen: </p>
                </div>
                <div className="col-9">
                  <p className="card-text">{producto.tituloImagen}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
