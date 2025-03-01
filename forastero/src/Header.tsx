import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  BarChart,
  Users,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Box,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVentasOpen, setIsVentasOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleVentas = () => {
    setIsVentasOpen(!isVentasOpen);
    setIsProductsOpen(false);
  };

  const toggleProductos = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsVentasOpen(false);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/logo.png" alt="El ForasteroTJ" className="logo-img" />
          {isOpen && <span className="logo-text">El ForasteroTJ</span>}
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className="nav-link">
              <Home size={30} /> {isOpen && "Dashboard"}
            </Link>
          </li>
          <li>
            <div className="nav-link" onClick={toggleVentas}>
              <DollarSign size={30} /> {isOpen && "Ventas"}{" "}
              {isOpen && (isVentasOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
            </div>
            {isVentasOpen && (
              <ul className="submenu" style={{ paddingLeft: "30px" }}>
                <li>
                  <Link to="/NewVenta" className="nav-link submenu-item">
                    {isOpen && "Nueva venta"}
                  </Link>
                </li>
                <li>
                  <Link to="/gananciaperdida" className="nav-link submenu-item">
                    {isOpen && "Ganancias/Perdidas"}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-link" onClick={toggleProductos}>
              <ShoppingCart size={30} /> {isOpen && "Productos"}{" "}
              {isOpen && (isProductsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
            </div>
            {isProductsOpen && (
              <ul className="submenu" style={{ paddingLeft: "30px" }}>
                <li>
                  <Link to="/registrar-producto" className="nav-link submenu-item">
                    {isOpen && "Registrar Producto"}
                  </Link>
                </li>
                <li>
                  <Link to="/gestion-inventario" className="nav-link submenu-item">
                    {isOpen && "Gestión Inventario"}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/caja" className="nav-link">
              <Box size={30} /> {isOpen && "Caja"}
            </Link>
          </li>
          <li>
            <Link to="/analisis" className="nav-link">
              <BarChart size={30} /> {isOpen && "Análisis BI"}
            </Link>
          </li>
          <li>
            <Link to="/proveedores" className="nav-link">
              <Users size={30} /> {isOpen && "Proveedores"}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />} {isOpen && "Ocultar"}
      </div>
    </div>
  );
};

export default Header;
