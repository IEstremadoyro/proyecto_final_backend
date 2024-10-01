import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MostrarCotizacion = () => {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  
    // Obtener las cotizaciones al cargar el componente
    useEffect(() => {
      const fetchCotizaciones = async () => {
        try {
          const response = await fetch("http://localhost:3000/cotizacion");
          const data = await response.json();
          setCotizaciones(data.content);
        } catch (error) {
          console.error("Error al obtener las cotizaciones:", error);
        }
      };
  
      fetchCotizaciones();
    }, []);
  
    // Función para abrir el modal con los detalles de la cotización seleccionada
    const handleShowModal = (cotizacion) => {
      setSelectedCotizacion(cotizacion);
      setShowModal(true);
    };
  
    // Función para cerrar el modal
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedCotizacion(null);
    };
  
    return (
      <Container>
        <h1>Listado de Cotizaciones</h1>
        {cotizaciones.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Número de Cotización</th>
                <th>Fecha de Cotización</th>
                <th>Estado</th>
                <th>Proyecto</th>
                <th>Detalles de Cotización</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cotizacion, index) => (
                <tr key={cotizacion.id}>
                  <td>{index + 1}</td>
                  <td>{cotizacion.numero_cotizacion}</td>
                  <td>{new Date(cotizacion.fecha_cotizacion).toLocaleDateString()}</td>
                  <td>{cotizacion.estado_cotizacion}</td>
                  <td>{cotizacion.proyectos.nombre}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleShowModal(cotizacion)}
                    >
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay cotizaciones disponibles.</p>
        )}
  
        {/* Modal para mostrar los detalles de la cotización */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Cotización</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedCotizacion && (
              <>
                <p><strong>Número de Cotización:</strong> {selectedCotizacion.numero_cotizacion}</p>
                <p><strong>Fecha de Cotización:</strong> {new Date(selectedCotizacion.fecha_cotizacion).toLocaleDateString()}</p>
                <p><strong>Estado:</strong> {selectedCotizacion.estado_cotizacion}</p>
                <p><strong>Proyecto:</strong> {selectedCotizacion.proyectos.nombre}</p>
                <h5>Detalles de los Artículos:</h5>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCotizacion.detalle_cotizaciones.map((detalle, index) => (
                      <tr key={index}>
                        <td>{detalle.item}</td>
                        <td>{detalle.cantidad}</td>
                        <td>{detalle.precio_unitario}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };
  
  export default MostrarCotizacion;