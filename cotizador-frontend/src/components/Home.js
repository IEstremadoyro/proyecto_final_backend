// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';  // Importa Link

function Home() {
    return (
        <div>
            <h1>Bienvenido a la Página Principal</h1>
            <Link to="/crearMarca" className="btn btn-primary">Ir a Crear Marca</Link>
        </div>
    );
}

export default Home;
