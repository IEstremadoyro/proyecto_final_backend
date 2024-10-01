import React, {useState, useEffect } from "react";
import {Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const MostrarEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    
    const getEmpresas = async () => {
        try {
            const response = await fetch('http://localhost:3000/empresas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setEmpresas(data.content || data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        getEmpresas();
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1 className="display-4">Listado de Empresas</h1>
                    <Table striped bordered hover responsive className="mt-4">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">RUC</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Correo Electronico</th>
                                <th scope="col">Habilitado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map((empresa) => (
                                <tr key={empresa.id}>
                                    <th key="row">{empresa.id}</th>
                                    <td>{empresa.nombre}</td>
                                    <td>{empresa.ruc}</td>
                                    <td>{empresa.direccion}</td>
                                    <td>{empresa.telefono}</td>
                                    <td>{empresa.correo_electronico}</td>
                                    <td>{empresa.habilitado}</td>
                                    {/* <td>
                                        <Button variant="info" href={`/editar-empresa/${empresa.id}`}>Editar</Button>
                                        <Button variant="danger" onClick={() => eliminarEmpresa(empresa.id)}>Eliminar</Button>
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

export default MostrarEmpresas;