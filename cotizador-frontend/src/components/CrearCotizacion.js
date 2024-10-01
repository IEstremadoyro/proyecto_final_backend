import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const CrearCotizacion = () => {
  const [numeroCotizacion, setNumeroCotizacion] = useState("");
  const [fechaCotizacion, setFechaCotizacion] = useState("");
  const [estadoCotizacion, setEstadoCotizacion] = useState("PENDIENTE");
  const [proyectoId, setProyectoId] = useState("");
  const [detalleCotizaciones, setDetalleCotizaciones] = useState([{ item: 1, cantidad: 1, precio: 0, porcentaje: 0, precioConRecargo: 0, total: 0, articulo_id: "" }]);
  const [proyectos, setProyectos] = useState([]);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      const response = await fetch("http://localhost:3000/proyectos");
      const data = await response.json();
      setProyectos(data.content);
    };

    const fetchArticulos = async () => {
      const response = await fetch("http://localhost:3000/articulos");
      const data = await response.json();
      setArticulos(data.content);
    };

    fetchProyectos();
    fetchArticulos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCotizacion = {
      numero_cotizacion: numeroCotizacion,
      fecha_cotizacion: fechaCotizacion,
      estado_cotizacion: estadoCotizacion,
      proyectoId: parseInt(proyectoId),
      detalle_cotizaciones: detalleCotizaciones.map(detalle => ({
        item: detalle.item,
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        porcentaje: detalle.porcentaje,
        articulo_id: detalle.articulo_id,
        total: detalle.total
      }))
    };

    try {
      const response = await fetch("http://localhost:3000/cotizacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCotizacion),
      });

      const result = await response.json();
      console.log(result);
      alert("Cotización creada exitosamente.");
    } catch (error) {
      console.error("Error al crear cotización:", error);
      alert("Hubo un error al crear la cotización.");
    }
  };

  const handleDetalleChange = (index, field, value) => {
    const newDetalles = [...detalleCotizaciones];
    newDetalles[index][field] = value;

    // Si se cambia el artículo, obtener el precio del artículo seleccionado
    if (field === "articulo_id") {
      const articuloSeleccionado = articulos.find(articulo => articulo.id === parseInt(value));
      if (articuloSeleccionado) {
        newDetalles[index].precio = articuloSeleccionado.precioUnitario;
      }
    }

    // Calcular el precio con el recargo
    if (field === "porcentaje" || field === "precio") {
      const precioConRecargo = newDetalles[index].precio * (1 + newDetalles[index].porcentaje / 100);
      newDetalles[index].precioConRecargo = precioConRecargo;
    }

    // Calcular el total (cantidad * precio con recargo)
    newDetalles[index].total = newDetalles[index].cantidad * newDetalles[index].precioConRecargo;

    setDetalleCotizaciones(newDetalles);
  };

  const addDetalle = () => {
    setDetalleCotizaciones([...detalleCotizaciones, { item: detalleCotizaciones.length + 1, cantidad: 1, precio: 0, porcentaje: 0, precioConRecargo: 0, total: 0, articulo_id: "" }]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Crear Cotización</h1>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNumeroCotizacion">
          <Form.Label>Número de Cotización</Form.Label>
          <Form.Control
            type="text"
            value={numeroCotizacion}
            onChange={(e) => setNumeroCotizacion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFechaCotizacion">
          <Form.Label>Fecha de Cotización</Form.Label>
          <Form.Control
            type="date"
            value={fechaCotizacion}
            onChange={(e) => setFechaCotizacion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEstadoCotizacion">
          <Form.Label>Estado de Cotización</Form.Label>
          <Form.Control
            as="select"
            value={estadoCotizacion}
            onChange={(e) => setEstadoCotizacion(e.target.value)}
            required
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="APROBADA">APROBADA</option>
            <option value="RECHAZADA">RECHAZADA</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formProyectoId">
          <Form.Label>Proyecto</Form.Label>
          <Form.Control
            as="select"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
            required
          >
            <option value="">Seleccione un Proyecto</option>
            {proyectos.map((proyecto) => (
              <option key={proyecto.id} value={proyecto.id}>
                {proyecto.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <h3>Detalles de la Cotización</h3>

        <Row>
          <Col><Form.Label>Item</Form.Label></Col>
          <Col><Form.Label>Artículo</Form.Label></Col>
          <Col><Form.Label>Cantidad</Form.Label></Col>
          <Col><Form.Label>Precio Unitario</Form.Label></Col>
          <Col><Form.Label>Porcentaje</Form.Label></Col>
          <Col><Form.Label>Precio con Recargo</Form.Label></Col>
          <Col><Form.Label>Total</Form.Label></Col>
        </Row>

        {detalleCotizaciones.map((detalle, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`detalleItem${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.item}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detalleArticulo${index}`}>
                <Form.Control
                  as="select"
                  value={detalle.articulo_id}
                  onChange={(e) => handleDetalleChange(index, "articulo_id", e.target.value)}
                  required
                >
                  <option value="">Seleccione un Artículo</option>
                  {articulos.map((articulo) => (
                    <option key={articulo.id} value={articulo.id}>
                      {articulo.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detalleCantidad${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.cantidad}
                  onChange={(e) => handleDetalleChange(index, "cantidad", e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detallePrecio${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.precio}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detallePorcentaje${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.porcentaje}
                  onChange={(e) => handleDetalleChange(index, "porcentaje", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detallePrecioConRecargo${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.precioConRecargo}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`detalleTotal${index}`}>
                <Form.Control
                  type="number"
                  value={detalle.total}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        <br/>
        <Button variant="primary" onClick={addDetalle}>
          Agregar Detalle
        </Button>
        <br /><br />
        <Button variant="success" type="submit" className="ml-2">
          Crear Cotización
        </Button>
      </Form>
    </Container>
  );
};

export default CrearCotizacion;
