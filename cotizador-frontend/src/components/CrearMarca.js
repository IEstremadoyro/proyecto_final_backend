import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const CrearMarca = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/marca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h1>Crear Marca</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre de la Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
      <Link to="/mostrarMarcas">Mostrar Marcas</Link>
    </div>
  );
};

export default CrearMarca;