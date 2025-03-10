import { Router } from "express";
import asyncHandler from "express-async-handler";
import { crearUsuario, getUsuarios, putUsuario } from "../controllers/usuarioController.js";
import { crearEmpresa, getEmpresas, putEmpresa } from "../controllers/empresaController.js";
import { crearProyecto, getProyectoPorRucEmpresa, getProyectoPorUsuario } from "../controllers/proyectoController.js";
import { crearArticulo, getArticuloPorNombre, getArticulos, putArticulo } from "../controllers/articuloController.js";
import { crearCotizacion, getCotizacionPorNumero, getCotizacionPorUsuario } from "../controllers/cotizacionController.js";
import { crearOservicio, getOservicio } from "../controllers/oservicioController.js";
import { crearActaAceptacion, getActasAceptacion } from "../controllers/actaAceptacionController.js";


export const enrutador = Router();

//API DE USUARIO
enrutador.route("/usuarios")
         .post(asyncHandler(crearUsuario))
         .get(asyncHandler(getUsuarios));
enrutador.route("/usuario/:id")
         .put(asyncHandler(putUsuario));

//APIS DE EMPRESA
enrutador
    .route("/empresas")
    .post(asyncHandler(crearEmpresa))
    .get(asyncHandler(getEmpresas));
enrutador
    .route("/empresa/:id")
    .put(asyncHandler(putEmpresa));

//API PROYECTO
enrutador.route("/proyectos")
    .post(asyncHandler(crearProyecto))
    .get(asyncHandler(getProyectoPorRucEmpresa));
    enrutador.route("/proyectos-user").get(asyncHandler(getProyectoPorUsuario));

//API DE ARTICULOS
enrutador.route("/articulos")
    .post(asyncHandler(crearArticulo))
    .get(asyncHandler(getArticulos));
enrutador.route("/articulo/:id")
    .put(asyncHandler(putArticulo));
enrutador.route("/articulo").get(asyncHandler(getArticuloPorNombre)); 

//API DE COTIZACIONES
enrutador.route("/cotizacion").post(asyncHandler(crearCotizacion))
enrutador.route("/cotizacion-num/:numero").get(asyncHandler(getCotizacionPorNumero)); 
enrutador.route("/cotizaciones-user").get(asyncHandler(getCotizacionPorUsuario)); 


//API DE ORDENES DE SERVICIO
enrutador
    .route("/oservicios")
    .post(asyncHandler(crearOservicio))
    .get(asyncHandler(getOservicio));

//API DE ACTAS DE ACEPTACIÓN
enrutador
    .route("/actas-aceptacion")
    .post(asyncHandler(crearActaAceptacion))
    .get(asyncHandler(getActasAceptacion));


