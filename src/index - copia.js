import express from 'express';
import { config } from 'dotenv';
import { enrutador } from './router/router.js';
import cors from 'cors';

const app = express();

// Configuración CORS para permitir solicitudes desde localhost:3001
const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'], // permitir solicitudes desde ambos orígenes
    optionsSuccessStatus: 200, // código de estado para respuestas exitosas
  };
  
  app.use(cors(corsOptions)); // agregar CORS a la aplicación
  
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.get('/marca', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // agregar cabecera CORS
    res.json({ /* datos */ });
  });
  app.use(express.json());
  
  // Tu enrutador y otros middlewares aquí
  app.use("/marca", enrutador); 


config();

const servidor = express();

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


servidor.use(enrutador);

servidor.use(errorHandler);

try {
    servidor.listen(PUERTO, () => {
        console.log(`Servidor corriendo exitosamente en el puerto ${PUERTO}`);
    });
} catch {
    console.error(error)
}


