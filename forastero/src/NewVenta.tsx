import React, { useState } from "react";
import "./NewVenta.css";
import { PlusCircle, Edit, Trash, Eye } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    setFormData({
      codigoInventario: "",
      precioUnitario: "",
      cantidad: "",
      totalVenta: "",
      cliente: "",
      fecha: new Date(),
    });
  };

  const handleEdit = (index) => {
    setFormData(ventas[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setVentas(ventas.filter((_, i) => i !== index));
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
      <h2>Gestión de Ventas</h2>
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
      <button className="add-button" onClick={() => setShowModal(true)}>
        <PlusCircle size={18} /> Agregar Venta
      </button>

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
                <button className="edit-button" onClick={() => handleEdit(index)}>
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => handleDelete(index)}>
                  <Trash size={16} />
                </button>
                <button className="view-button">
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modalventa">
          <div className="modalventa-content">
            <h3>{editingIndex !== null ? "Editar Venta" : "Agregar Venta"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Código Inventario</label>
              <input type="text" name="codigoInventario" value={formData.codigoInventario} onChange={handleChange} required />

              <label>Precio Unitario</label>
              <input type="number" name="precioUnitario" value={formData.precioUnitario} onChange={handleChange} required />

              <label>Cantidad</label>
              <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

              <label>Total Venta</label>
              <input type="text" name="totalVenta" value={formData.totalVenta} readOnly />

              <label>Cliente</label>
              <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} required />

              <label>Fecha</label>
              <DatePicker selected={formData.fecha} onChange={(date) => setFormData({ ...formData, fecha: date })} />

              <div className="modalventa-buttons">
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit">{editingIndex !== null ? "Actualizar" : "Guardar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewVenta;
