import React from "react";
import { Route, Routes } from "react-router-dom";
import VistaPrincipal from "./components/vista-principal";
import DetalleProducto from "./components/DetalleProducto";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VistaPrincipal />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
    </Routes>
  );
}

export default App;
