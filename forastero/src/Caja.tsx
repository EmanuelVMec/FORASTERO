import React, { useState, useEffect } from "react";
import "./Caja.css";
import { Pencil, Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Caja = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("es-ES");
  };

  const getCurrentDay = () => {
    const days = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
    return days[new Date().getDay()];
  };

  const calculateTotalDiario = (ingresos, transferencias, cajaChica) => {
    return (Number(ingresos) || 0) + (Number(transferencias) || 0) - (Number(cajaChica) || 0);
  };

  const calculateGanancia = (totalDiario, egresos, cajaChica) => {
    return (Number(totalDiario) || 0) - (Number(egresos) || 0) - (Number(cajaChica) || 0);
  };

  const [cajaData, setCajaData] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({ cajaChica: 0, ganancia: 0 });
  const [formData, setFormData] = useState({
    fecha: getCurrentDate(),
    dia: getCurrentDay(),
    caja: "",
    ingresos: "",
    transferencias: "",
    egresos: "",
    cajaChica: "",
    totalDiario: "",
    ganancia: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [hasEntryToday, setHasEntryToday] = useState(false);

  useEffect(() => {
    const today = getCurrentDate();
    setHasEntryToday(cajaData.some(entry => entry.fecha === today));

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const filteredWeekData = cajaData.filter(entry => new Date(entry.fecha.split('/').reverse().join('-')) >= weekStart);
    const totalCajaChica = filteredWeekData.reduce((acc, curr) => acc + Number(curr.cajaChica), 0);
    const totalGanancia = filteredWeekData.reduce((acc, curr) => acc + Number(curr.ganancia), 0);
    setWeeklySummary({ cajaChica: totalCajaChica, ganancia: totalGanancia });
  }, [cajaData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    updatedForm.totalDiario = calculateTotalDiario(updatedForm.ingresos, updatedForm.transferencias, updatedForm.cajaChica);
    updatedForm.ganancia = calculateGanancia(updatedForm.totalDiario, updatedForm.egresos, updatedForm.cajaChica);

    setFormData(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasEntryToday && editingIndex === null) {
      toast.warn("Solo puedes ingresar datos una vez al día.", {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (editingIndex !== null) {
      const updatedData = [...cajaData];
      updatedData[editingIndex] = formData;
      setCajaData(updatedData);
      setEditingIndex(null);
    } else {
      setCajaData([...cajaData, formData]);
    }
    setFormData({
      fecha: getCurrentDate(),
      dia: getCurrentDay(),
      caja: "",
      ingresos: "",
      transferencias: "",
      egresos: "",
      cajaChica: "",
      totalDiario: "",
      ganancia: "",
    });
  };

  const handleEdit = (index) => {
    setFormData({ ...cajaData[index] });
    setEditingIndex(index);
  };

  return (
    <div className="caja-container">
      <ToastContainer />
      <div className="caja-header">
        <h2>Gestión de Caja</h2>
        <h4>Resumen Semanal: Caja Chica: {weeklySummary.cajaChica} | Ganancia: {weeklySummary.ganancia}</h4>
      </div>
      <form onSubmit={handleSubmit} className="caja-form">
        <input type="text" name="fecha" value={formData.fecha} readOnly />
        <input type="text" name="dia" value={formData.dia} readOnly />
        <input type="number" name="caja" placeholder="Caja" value={formData.caja} onChange={handleChange} required />
        <input type="number" name="ingresos" placeholder="Ingresos" value={formData.ingresos} onChange={handleChange} required />
        <input type="number" name="transferencias" placeholder="Transferencias" value={formData.transferencias} onChange={handleChange} required />
        <input type="number" name="egresos" placeholder="Egresos" value={formData.egresos} onChange={handleChange} required />
        <input type="number" name="cajaChica" placeholder="Caja Chica" value={formData.cajaChica} onChange={handleChange} required />
        <input type="number" name="totalDiario" placeholder="Total Diario" value={formData.totalDiario} readOnly />
        <input type="number" name="ganancia" placeholder="Ganancia" value={formData.ganancia} readOnly />
        <button type="submit" className="submit-button">{editingIndex !== null ? "Actualizar" : "Agregar"}</button>
      </form>
      <table className="caja-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Día</th>
            <th>Caja</th>
            <th>Ingresos</th>
            <th>Transferencias</th>
            <th>Egresos</th>
            <th>Caja Chica</th>
            <th>Total Diario</th>
            <th>Ganancia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cajaData.map((row, index) => (
            <tr key={index}>
              <td>{row.fecha}</td>
              <td>{row.dia}</td>
              <td>{row.caja}</td>
              <td>{row.ingresos}</td>
              <td>{row.transferencias}</td>
              <td>{row.egresos}</td>
              <td>{row.cajaChica}</td>
              <td>{row.totalDiario}</td>
              <td>{row.ganancia}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(index)}>
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Caja;
