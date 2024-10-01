import React, {useState, useEffect} from "react";
import { Table, Container, Button, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const MostrarMarca =  () => {
    const  [marcas, setMarcas] = useState([]);

    const getMarcas = async () => {
        try {
            const response = await fetch('http://localhost:3000/marca',{ 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
            const data  = await response.json();
            setMarcas(data.content);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMarcas();
    }, []);

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1 className="display-4">Listado de Marcas</h1>
                    <Table striped bordered hover responsive className="mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Fecha creacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marcas.map((marca) => (
                            <tr  key={marca.id}>
                                <th scope="row">{marca.id}</th>
                                <td>{marca.nombre}</td>
                                <td>{marca.createdAt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>            
        </Container>
    );
};

export default MostrarMarca;
