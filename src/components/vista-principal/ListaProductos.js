import { React, useEffect, useState } from "react";
//import { useDownloadExcel } from "react-export-table-to-excel";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

function ListaProductos() {
  const [records, setRecords] = useState([]);
  const url = "http://localhost:3000/api/test/";

  //Obtener información de todos los registros
  useEffect(() => {
    fetch(`${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => setRecords(data))
      .catch((error) => console.error("Error:", error));
  }, [records]);

  const handleDelete = (id) => {
    fetch(`${url}${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedRecords = records.filter((record) => record._id !== id);
      setRecords(updatedRecords);
    });
  };

  //   const { onDownload } = useDownloadExcel({
  //     currentTableRef: tableRef.current,
  //     filename: "Lista de productos",
  //     sheet: "Productos",
  //   });

  const onDownload = () => {
    //primero defino las columnas que necesito en el archivo excel
    const excelRows = records.map((item) => ({
      id: item._id,
      nombre: item.nombre,
      categoria: item.categoria,
      precio: item.precio,
      aviso: item.aviso,
    }));

    const ws = XLSX.utils.json_to_sheet(excelRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Listado");
    XLSX.writeFile(wb, "ListaDeProductos.xlsx");
  };

  return (
    <div id="listado-productos" className="mt-5 text-center">
      <div className="row p-5 d-flex justify-content-center">
        <div className="col-12 col-md-7">
          <h2>Lista de todos los productos en la base de datos:</h2>
        </div>
        <div className="col-6 col-md-2 mt-3 mt-md-0">
          <button className="btn btn-success w-100" onClick={onDownload}>
            Exportar a Excel
          </button>
        </div>
      </div>

      <table className="table w-75 mx-auto mt-3 table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Aviso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.nombre}</td>
              <td>{record.categoria}</td>
              <td>{record.precio}</td>
              <td>{record.aviso}</td>
              <td>
                <Link
                  to={`/producto/${record._id}`}
                  className="btn btn-primary me-2"
                >
                  Ver
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProductos;
