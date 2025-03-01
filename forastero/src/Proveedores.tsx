import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pencil, Trash, PlusCircle } from "lucide-react";
import "./Proveedores.css";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: "Vicente",
      apellido: "Lopez",
      empresa: "Forastero S.A.",
      celular: "0942242023",
      correo: "Vicente@gmail.com",
      direccion: "Av el naranjal",
      descripcion: "ninguna",
      fechaRegistro: "2025-02-17 16:43:12",
    },
  ]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    celular: "",
    correo: "",
    direccion: "",
    descripcion: "",
  });

  const handleShow = (proveedor = null) => {
    setEditing(proveedor);
    setFormData(proveedor || {
      nombre: "",
      apellido: "",
      empresa: "",
      celular: "",
      correo: "",
      direccion: "",
      descripcion: "",
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editing) {
      setProveedores(
        proveedores.map((prov) =>
          prov.id === editing.id ? { ...editing, ...formData } : prov
        )
      );
    } else {
      setProveedores([
        ...proveedores,
        { id: Date.now(), fechaRegistro: new Date().toISOString(), ...formData },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setProveedores(proveedores.filter((prov) => prov.id !== id));
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Empresa", selector: (row) => row.empresa, sortable: true },
    { name: "Celular", selector: (row) => row.celular },
    { name: "Correo", selector: (row) => row.correo },
    { name: "Dirección", selector: (row) => row.direccion },
    { name: "Descripción", selector: (row) => row.descripcion },
    { name: "Fecha de Registro", selector: (row) => row.fechaRegistro, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="action-buttons">
          <Button variant="outline-primary" size="sm" onClick={() => handleShow(row)}>
            <Pencil size={16} />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.id)}>
            <Trash size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="content-box text-center p-4 shadow-lg rounded bg-white w-100">
          <h2 className="text-center">Gestión de Proveedores</h2>
          <Button className="add-button mt-3" onClick={() => handleShow()}>
            <PlusCircle size={20} className="me-2" /> Agregar Proveedor
          </Button>
          <div className="mt-4">
            <DataTable columns={columns} data={proveedores} pagination className="data-table" />
          </div>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Editar Proveedor" : "Agregar Proveedor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(formData).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit}>{editing ? "Guardar Cambios" : "Agregar"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proveedores;
