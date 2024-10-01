import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const CrearProyecto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ruc, setRuc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/proyectos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    descripcion,
                    ruc,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>
                Crear Proyecto                
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='nombre' className='form-laber'>
                        Nombre del Proyecto
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}   
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='descripcion' className='form-label'>
                        Descripción del Proyecto
                    </label>
                    <textarea
                        className='form-control'
                        id='descripcion'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />                
                </div>
                <div className='mb-3'>
                    <label htmlFor='ruc' className='form-label'>
                        RUC de la Empresa
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='ruc'
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                    />
                </div>
                <Button variant='primary' type='submit'>Crear Proyecto</Button>
            </form>
            <br/>
            <Link to="/mostrarProyectos" className='btn btn-primary'>Mostrar Proyectos</Link>
        </div>
    );
};

export default CrearProyecto;