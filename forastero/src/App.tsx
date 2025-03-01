import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header"; // Importa el header
import Proveedores from "./Proveedores";
import Caja from "./Caja";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Header />
        <div style={{ marginLeft: "0px", padding: "0px", flex: 1 }}>
          <Routes>
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/caja" element={<Caja />} />
            <Route path="/" element={<h1>Inicio</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
