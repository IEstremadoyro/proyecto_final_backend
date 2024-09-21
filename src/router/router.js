import { Router } from "express";
import asyncHandler from "express-async-handler";
import { crearEmpresa, getEmpresas, putEmpresa } from "../controllers/empresaController.js";
import { crearProyecto, getProyectos } from "../controllers/proyectoController.js";
import { crearArticulo, getArticuloPorNombre, getArticulos, putArticulo } from "../controllers/articuloController.js";
import { crearCotizacion, getCotizacion } from "../controllers/cotizacionController.js";
import { crearOservicio, getOservicio } from "../controllers/oservicioController.js";
import { crearActaAceptacion, getActasAceptacion } from "../controllers/actaAceptacionController.js";

export const enrutador = Router();

enrutador
    .route("/empresas")
    .post(asyncHandler(crearEmpresa))
    .get(asyncHandler(getEmpresas));
enrutador
    .route("/empresa/:id")
    .put(asyncHandler(putEmpresa));

enrutador
    .route("/proyectos")
    .post(asyncHandler(crearProyecto))
    .get(asyncHandler(getProyectos));

enrutador.route("/articulos")
    .post(asyncHandler(crearArticulo))
    .get(asyncHandler(getArticulos));
enrutador.route("/articulo/:id")
    .put(asyncHandler(putArticulo));
enrutador
    .route("/articulo")
    .get(asyncHandler(getArticuloPorNombre)); 

enrutador
    .route("/cotizacion")
    .post(asyncHandler(crearCotizacion))
    .get(asyncHandler(getCotizacion));

enrutador
    .route("/oservicios")
    .post(asyncHandler(crearOservicio))
    .get(asyncHandler(getOservicio));

enrutador
    .route("/actas-aceptacion")
    .post(asyncHandler(crearActaAceptacion))
    .get(asyncHandler(getActasAceptacion));
