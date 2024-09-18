import express from 'express';
import { config } from 'dotenv';
import { enrutador } from './router/router.js';

config();

const servidor = express();

//Usamos el middleware express.json() para parsear los datos recibidos en formato JSON.
servidor.use(express.json());

const PUERTO = process.env.PORT

const errorHandler = (error, req, res, next) => {
    console.log(error);
    let mensajePersonalizado;
    let status;
    switch (error.message) {
        case "No Articulo found":
            mensajePersonalizado = "El artículo no existe en la base de datos";
            status = 404;
            break;
        
        case "No Empresa found":
            mensajePersonalizado = "La empresa no existe en la base de datos";
            status = 404;
            break;

        case "Invalid input":
        default:
            mensajePersonalizado = error.message;
            status = 400;            
    }

    res.status(500).json({ 
        message: 'Error al hacer la operación',
     });    
}


//Agregamos todas las rutas
servidor.use(enrutador);

//funcion middleware de manejador de errores
servidor.use(errorHandler);

try {
    servidor.listen(PUERTO, () => {
        console.log(`Servidor corriendo exitosamente en el puerto ${PUERTO}`);
    });
} catch {
    console.error(error)
}


