import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header"; // Importa el header
import Proveedores from "./Proveedores";
import Caja from "./Caja";
import NewVenta from "./NewVenta";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Header />
          <Routes>
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/caja" element={<Caja />} />
            <Route path="/newventa" element={<NewVenta />} />
            <Route path="/" element={<h1>Inicio</h1>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
