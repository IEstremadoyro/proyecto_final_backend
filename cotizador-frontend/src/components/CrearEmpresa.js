import React, {useState, useEffect} from "react";
import  { Link } from "react-router-dom";

const CrearEmpresa = () => {
    const [nombre, setNombre] = useState('');
    const [ruc, setRuc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [habilitado, setHabilitado] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/empresas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    ruc,
                    direccion,
                    telefono,
                    correo_electronico,
                    habilitado
                }),
            });
            const data = await response.json();
            console.log(data);            
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h1>Crear Empresa</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre de la Empresa
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ruc" className="form-label">
                        RUC
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="ruc"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">
                        Dirección
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="correo_electronico" className="form-label">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="correo_electronico"
                        value={correo_electronico}
                        onChange={(e) => setCorreo_electronico(e.target.value)}
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary">
                    Crear
                </button>
                <br/>
            </form>
            <br/>
            <Link to="/mostrarEmpresa" className="btn btn-secondary">Mostrar Empresas</Link>
        </div>
    );
};

export default CrearEmpresa;