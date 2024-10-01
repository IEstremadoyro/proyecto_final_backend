import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
import { enrutador } from './router/router.js';
import cors from 'cors';

const servidor = express();
servidor.use(cors({ origin: '*'}))
// Configuración CORS para permitir solicitudes desde localhost:3001
config();
servidor.use(express.json());

const errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status(400).json({ 
        message: 'Error al hacer la operación',
        content: error.message,
     });    
}
servidor.use(enrutador);
servidor.use(errorHandler);
// Agregamos logger de los request de nuestro servidor
servidor.use(morgan("common"));
const PORT = process.env.PORT;
servidor.use(express.json());
servidor.use(enrutador);
servidor.use(errorHandler);
servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});

