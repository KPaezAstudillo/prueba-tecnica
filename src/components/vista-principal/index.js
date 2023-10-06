import React from "react";

import Formulario from "./Formulario";
import ListaProductos from "./ListaProductos";

function VistaPrincipal() {
  return (
    <div className="container-fluid p-3 bg-warning-subtle ">
      <Formulario />
      <ListaProductos />
    </div>
  );
}

export default VistaPrincipal;
