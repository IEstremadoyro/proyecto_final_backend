// import React, { useState, useEffect } from "react";
// import { Table, Button, Container, Row, Col } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';


// const MostrarArticulo = () => {
//   const [articulos, setArticulos] = useState([]);
//   const getArticulos = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/articulos', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });
//       const data = await response.json();
//       console.log(data);
//       setArticulos(data.content);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getArticulos();
//   }, []);

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col className="text-center">
//           <h1 className="display-4">Listado de Artículos</h1>
//           <p className="lead">Aquí puedes ver todos los artículos disponibles en la base de datos.</p>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Table striped bordered hover responsive className="mt-4">
//             <thead className="thead-dark">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Nombre</th>
//                 <th scope="col">Descripción</th>
//                 <th scope="col">Precio</th>
//                 <th scope="col">Marca</th>
//                 <th scope="col">Fuente</th>
//                 <th scope="col">Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {articulos.map((articulo) => (
//                 <tr key={articulo.id}>
//                   <th scope="row">{articulo.id}</th>
//                   <td>{articulo.nombre}</td>
//                   <td>{articulo.descripcion}</td>
//                   <td>{articulo.precioUnitario}</td>
//                   <td>{articulo.idMarca}</td>
//                   <td>{articulo.fuente}</td>
//                   <td>
//                     <Button variant="warning" className="me-2">
//                       Editar
//                     </Button>
//                     <Button variant="danger">Eliminar</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MostrarArticulo;

import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MostrarArticulo = () => {
  const [articulos, setArticulos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Para manejar la entrada del buscador
  const [filteredArticulos, setFilteredArticulos] = useState([]); // Para manejar los artículos filtrados

  // Función para obtener los artículos de la API
  const getArticulos = async () => {
    try {
      const response = await fetch("http://localhost:3000/articulos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setArticulos(data.content || data); // Guarda todos los artículos
      setFilteredArticulos(data.content || data); // Inicializa los artículos filtrados
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticulos();
  }, []);

  // Función para manejar el cambio en la búsqueda y filtrar los artículos
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase(); // Convertimos el término de búsqueda a minúsculas
    setSearchTerm(searchValue);

    // Filtramos los artículos comparando el término de búsqueda con los valores de las columnas
    const filtered = articulos.filter((articulo) => 
      articulo.nombre.toLowerCase().includes(searchValue) ||
      articulo.descripcion.toLowerCase().includes(searchValue) ||
      articulo.precioUnitario.toString().includes(searchValue) ||
      articulo.marca.toString().includes(searchValue) ||
    //   articulo.idMarca.toString().includes(searchValue) ||
      articulo.fuente.toLowerCase().includes(searchValue)
    );

    setFilteredArticulos(filtered); // Actualiza los artículos filtrados
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Listado de Artículos</h1>
          <p className="lead">Aquí puedes ver todos los artículos disponibles en la base de datos.</p>
        </Col>
      </Row>

      {/* Campo de búsqueda */}
      <Row className="my-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form.Control 
            type="text" 
            placeholder="Buscar artículos por nombre, descripción, precio, marca o fuente..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      {/* Tabla de artículos */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Marca</th>
                <th scope="col">Fuente</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticulos.map((articulo) => (
                <tr key={articulo.id}>
                  <th scope="row">{articulo.id}</th>
                  <td>{articulo.nombre}</td>
                  <td>{articulo.descripcion}</td>
                  <td>{articulo.precioUnitario}</td>
                  <td>{articulo.marca}</td>
                  {/* <td>{articulo.idMarca}</td> */}
                  <td>{articulo.fuente}</td>
                  {/* <td>
                    <Button variant="warning" className="me-2">
                      Editar
                    </Button>
                    <Button variant="danger">Eliminar</Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MostrarArticulo;
