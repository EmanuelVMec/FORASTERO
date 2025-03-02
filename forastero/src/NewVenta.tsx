import React, { useState } from "react";
import "./NewVenta.css";
import { PlusCircle, Edit, Trash, Copy, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DollarSign } from "lucide-react";


const NewVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const [formData, setFormData] = useState({
    codigoInventario: "",
    precioUnitario: "",
    cantidad: "",
    totalVenta: "",
    cliente: "",
    fecha: new Date(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      totalVenta:
        e.target.name === "cantidad" || e.target.name === "precioUnitario"
          ? (Number(formData.precioUnitario) * Number(formData.cantidad)).toFixed(2)
          : formData.totalVenta,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedVentas = [...ventas];
      updatedVentas[editingIndex] = formData;
      setVentas(updatedVentas);
      setEditingIndex(null);
    } else {
      setVentas([...ventas, formData]);
    }
    setShowModal(false);
    resetForm(); // Resetear el formulario después de cerrar el modal
  };

  const resetForm = () => {
    setFormData({
      codigoInventario: "",
      precioUnitario: "",
      cantidad: "",
      totalVenta: "",
      cliente: "",
      fecha: new Date(),
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(ventas[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setVentas(ventas.filter((_, i) => i !== index));
  };

  const handleCopy = (codigo) => {
    navigator.clipboard.writeText(codigo);
    toast.success(`Código copiado: ${codigo}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })};

  const exportToExcel = (venta) => {
    const ws = XLSX.utils.json_to_sheet([venta]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Venta");
    XLSX.writeFile(wb, `${venta.codigoInventario}.xlsx`);
  };

  const filterVentas = () => {
    const now = new Date();
    return ventas.filter((venta) => {
      const ventaDate = new Date(venta.fecha);
      if (filter === "Todos") return true;
      if (filter === "10 días") return now - ventaDate <= 10 * 24 * 60 * 60 * 1000;
      if (filter === "20 días") return now - ventaDate <= 20 * 24 * 60 * 60 * 1000;
      if (filter === "30 días") return now - ventaDate <= 30 * 24 * 60 * 60 * 1000;
      return false;
    });
  };
  
  return (
    <div className="ventas-container">
<div className="titulo-container">
  <DollarSign size={30} />
  <h2>GESTION DE VENTAS</h2>
</div>
            <ToastContainer />
      <div className="filter-buttons">
        {["Todos", "10 días", "20 días", "30 días"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            Últimos {f}
          </button>
        ))}
      </div>
      <button className="add-button" onClick={() => { resetForm(); setShowModal(true); }}>
        <PlusCircle size={18} /> Agregar Venta
      </button>

      <div className="ventas-table-container">
        <table className="ventas-table">
          <thead>
            <tr>
              <th>Código Inventario</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Total Venta</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filterVentas().map((venta, index) => (
              <tr key={index}>
                <td>{venta.codigoInventario}</td>
                <td>${venta.precioUnitario}</td>
                <td>{venta.cantidad}</td>
                <td>${venta.totalVenta}</td>
                <td>{venta.cliente}</td>
                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <button className="copy-button" onClick={() => handleCopy(venta.codigoInventario)}>
                    <Copy size={16} />
                  </button>
                  <button className="edit-button" onClick={() => handleEdit(index)}>
                    <Edit size={16} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <Trash size={16} />
                  </button>
                  <button className="download-button" onClick={() => exportToExcel(venta)}>
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
  <div className="modalventa">
    <div className="modalventa-content">
      <div className="modalventa-header">
        <h3>{editingIndex !== null ? "Editar Venta" : "Agregar Venta"}</h3>
        <button className="close-btn" onClick={() => { resetForm(); setShowModal(false); }}>✖</button>
      </div>

      <form onSubmit={handleSubmit} className="modalventa-body">
        {/* Sección de Detalles del Inventario */}
        <div className="modal-section">
          <h4>📦 Detalles del Inventario</h4>
          <div className="input-container">
            <label>Código de Inventario</label>
            <input type="text" name="codigoInventario" value={formData.codigoInventario} onChange={handleChange} required />
          </div>
        </div>

        {/* Sección de Detalles de la Venta */}
        <div className="modal-section">
          <h4>💲 Detalles de la Venta</h4>
          <div className="modalventa-grid">
            <div className="input-container">
              <label>Precio por Unidad/Libra</label>
              <input type="number" name="precioUnitario" value={formData.precioUnitario} onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Cantidad Vendida</label>
              <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>Valor de la Venta</label>
              <input type="text" name="totalVenta" value={formData.totalVenta} readOnly />
            </div>
            <div className="input-container">
              <label>Cliente</label>
              <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} required />
            </div>
            <div className="input-container full-width">
              <label>Fecha de Venta</label>
              <DatePicker selected={formData.fecha} onChange={(date) => setFormData({ ...formData, fecha: date })} />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="modalventa-buttons">
          <button type="button" className="cancelar" onClick={() => { resetForm(); setShowModal(false); }}>Cancelar</button>
          <button type="submit" className="guardar">{editingIndex !== null ? "Actualizar" : "Guardar Venta"}</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default NewVenta;
