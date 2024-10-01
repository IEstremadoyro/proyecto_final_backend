import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CrearArticulo = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [marca, setMarca] = useState(''); // Estado para la marca seleccionada
  const [fuente, setFuente] = useState('');
  const [marcas, setMarcas] = useState([]); // Estado para almacenar todas las marcas
  const [filteredMarcas, setFilteredMarcas] = useState([]); // Marcas filtradas por coincidencia

  // Fetch para obtener las marcas de la base de datos
  useEffect(() => {
    const fetchMarcas = async () => {
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

    fetchMarcas();
  }, []);

  // Filtra las marcas según lo que el usuario escribe
  const handleMarcaInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setMarca(searchValue);
    const filtered = marcas.filter((marca) =>
      marca.nombre.toLowerCase().includes(searchValue)
    );
    setFilteredMarcas(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/articulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precioUnitario: parseFloat(precioUnitario), // Convertimos a número
          marca, // Enviamos la marca seleccionada
          fuente,
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
      <h1>Crear Artículo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del Artículo
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precioUnitario" className="form-label">
            Precio Unitario
          </label>
          <input
            type="number"
            className="form-control"
            id="precioUnitario"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">
            Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="marca"
            value={marca}
            onChange={handleMarcaInput} // Filtramos marcas al escribir
            list="marcas-list"
            required
          />
          <datalist id="marcas-list">
            {filteredMarcas.map((marca) => (
              <option key={marca.id} value={marca.nombre}>
                {marca.nombre}
              </option>
            ))}
          </datalist>
        </div>
        <div className="mb-3">
          <label htmlFor="fuente" className="form-label">
            Fuente
          </label>
          <input
            type="text"
            className="form-control"
            id="fuente"
            value={fuente}
            onChange={(e) => setFuente(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
      <Link to="/mostrarMarcas">Mostrar Artículos</Link>
    </div>
  );
};

export default CrearArticulo;
