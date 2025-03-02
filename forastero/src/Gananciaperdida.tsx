import React, { useState } from "react";
import "./Gananciaperdida.css";
import { PlusCircle, Edit, Trash } from "lucide-react";

const GananciaPerdida = () => {
  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    codigoVenta: "",
    marketing: "",
    manoObra: "",
    materiales: "",
    depreciacion: "",
    decimos: "",
    otrosGastos: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistros([...registros, formData]);
    setShowModal(false);
    setFormData({
      codigoVenta: "",
      marketing: "",
      manoObra: "",
      materiales: "",
      depreciacion: "",
      decimos: "",
      otrosGastos: "",
    });
  };

  const handleDelete = (index) => {
    setRegistros(registros.filter((_, i) => i !== index));
  };

  return (
    <div className="ganancia-container">
      <h2 className="titulo-container">
        📊 Ganancias y Pérdidas
      </h2>
      <button className="add-button" onClick={() => setShowModal(true)}>
        <PlusCircle size={18} /> Agregar Registro
      </button>

      <div className="ganancia-table-container">
        <table className="ganancia-table">
          <thead>
            <tr>
              <th>Código de Venta</th>
              <th>Gastos de Marketing</th>
              <th>Mano de Obra</th>
              <th>Movilización y Materiales</th>
              <th>Depreciación</th>
              <th>Décimos</th>
              <th>Otros Gastos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.codigoVenta}</td>
                <td>${registro.marketing}</td>
                <td>${registro.manoObra}</td>
                <td>${registro.materiales}</td>
                <td>${registro.depreciacion}</td>
                <td>${registro.decimos}</td>
                <td>${registro.otrosGastos}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => setShowModal(true)}>
                    <Edit size={16} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modalganancia">
          <div className="modalganancia-content">
            <h3>Agregar Registro de Ganancias y Pérdidas</h3>
            <form onSubmit={handleSubmit}>
              <label>Código de Venta</label>
              <input type="text" name="codigoVenta" value={formData.codigoVenta} onChange={handleChange} required />

              <label>Gastos de Marketing</label>
              <input type="number" name="marketing" value={formData.marketing} onChange={handleChange} required />

              <label>Mano de Obra</label>
              <input type="number" name="manoObra" value={formData.manoObra} onChange={handleChange} required />

              <label>Movilización y Materiales</label>
              <input type="number" name="materiales" value={formData.materiales} onChange={handleChange} required />

              <label>Depreciación</label>
              <input type="number" name="depreciacion" value={formData.depreciacion} onChange={handleChange} required />

              <label>Décimos</label>
              <input type="number" name="decimos" value={formData.decimos} onChange={handleChange} required />

              <label>Otros Gastos</label>
              <input type="number" name="otrosGastos" value={formData.otrosGastos} onChange={handleChange} required />

              <div className="modalganancia-buttons">
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GananciaPerdida;
