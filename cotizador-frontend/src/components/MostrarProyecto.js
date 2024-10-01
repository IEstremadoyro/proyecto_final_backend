// import React, { useState, useEffect } from "react";
// import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const MostrarProyecto = () => {
//     const [proyectos, setProyectos] = useState([]);
//     const [filteredProyectos, setFilteredProyectos] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const getProyectos = async () =>{
//         try {
//             const response = await fetch('http://localhost:3000/proyectos',{ 
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });
//             const data = await response.json();
//             setProyectos(data.content || data);
//             setFilteredProyectos(data.content || data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         getProyectos();
//     }, []);

//     const handleSearch = (event) => {
//         const searchValue = event.target.value.toLowerCase();
//         setSearchTerm(searchValue);

//         const filtered = proyectos.filter((proyecto) =>
//             proyecto.nombre.toLowerCase().includes(searchValue) ||
//         proyecto.descripcion.toLowerCase().includes(searchValue) ||
//         proyecto.fecha_inicio.toString().includes(searchValue) ||
//         proyecto.fecha_fin.toString().includes(searchValue) ||
//         proyecto.empresa.ruc.includes(searchValue)
//         );
//         setFilteredProyectos(filtered);
//     };
//     return (
//         <Container className="mt-5">
//             <Row>
//                 <Col className="text-center">
//                     <h1 className="display-4">Proyectos</h1>
//                 </Col>
//             </Row>
//             <Row className="my-4">
//                 <Col md={{ span: 6, offset: 3}}>
//                     <Form.Control
//                         type="text"
//                         placeholder="Buscar..."
//                         value={setSearchTerm}
//                         onChange={handleSearch}
//                     />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <Table striped bordered hover responsive className="mt-4">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">ID</th>
//                                 <th scope="col">Nombre</th>
//                                 <th scope="col">Descripcion</th>
//                                 <th scope="col">Fecha de Inicio</th>
//                                 <th scope="col">Fecha Fin</th>
//                                 <th scope="col">Empresa</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {proyectos.map((proyecto, index) => (
//                                 <tr key={index}>
//                                     <td>{proyecto.id}</td>
//                                     <td>{proyecto.nombre}</td>
//                                     <td>{proyecto.descripcion}</td>
//                                     <td>{proyecto.fecha_iniio}</td>
//                                     <td>{proyecto.fecha_fin}</td>
//                                     <td>{proyecto.nombreEmpresa}</td>

//                                     {/* <td>
//                                         <Button variant="info">Ver Detalles</Button>
//                                         <Button variant="danger">Eliminar</Button>
//                                     </td> */}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>                   
//     );
// };

// export default MostrarProyecto;

import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MostrarProyecto = () => {
    const [proyectos, setProyectos] = useState([]);
    const [filteredProyectos, setFilteredProyectos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getProyectos = async () => {
        try {
            const response = await fetch('http://localhost:3000/proyectos', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setProyectos(data.content || data);
            setFilteredProyectos(data.content || data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProyectos();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
    
        const filtered = proyectos.filter((proyecto) => {
            const nombreEmpresa = proyecto.empresa?.nombre?.toLowerCase() || ""; // Verifica que empresa y nombre existan
            const rucEmpresa = proyecto.empresa?.ruc || "";  // Verifica que ruc exista
    
            return (
                proyecto.nombre.toLowerCase().includes(searchValue) ||
                proyecto.descripcion.toLowerCase().includes(searchValue) ||
                proyecto.fecha_inicio.toString().includes(searchValue) ||
                (proyecto.fecha_fin && proyecto.fecha_fin.toString().includes(searchValue)) || // Verifica que fecha_fin exista
                rucEmpresa.includes(searchValue) ||
                nombreEmpresa.includes(searchValue)
            );
        });
        
        setFilteredProyectos(filtered);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1 className="display-4">Proyectos</h1>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}  // Cambiado a searchTerm
                        onChange={handleSearch}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive className="mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Fecha de Inicio</th>
                                <th scope="col">Fecha Fin</th>
                                <th scope="col">Empresa</th>
                                <th scope="col">RUC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProyectos.map((proyecto, index) => (
                                <tr key={index}>
                                    <td>{proyecto.id}</td>
                                    <td>{proyecto.nombre}</td>
                                    <td>{proyecto.descripcion}</td>
                                    <td>{proyecto.fecha_inicio}</td>
                                    <td>{proyecto.fecha_fin}</td>
                                    <td>{proyecto.nombreEmpresa}</td>
                                    <td>{proyecto.ruc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>                   
    );
};

export default MostrarProyecto;
