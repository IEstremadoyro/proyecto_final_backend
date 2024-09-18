import { Router } from "express";
import asyncHandler from "express-async-handler";
import { crearEmpresa, getEmpresas, putEmpresa } from "../controllers/empresaController.js";
import { crearProyecto } from "../controllers/proyectoController.js";
import { crearArticulo, getArticuloPorNombre, getArticulos, putArticulo } from "../controllers/articuloController.js";
import { crearCotizacion } from "../controllers/cotizacionController.js";

export const enrutador = Router();

//APIS DE EMPRESA
enrutador
    .route("/empresas")
    .post(asyncHandler(crearEmpresa))
    .get(asyncHandler(getEmpresas));
enrutador
    .route("/empresa/:id")
    .put(asyncHandler(putEmpresa));

//API PROYECTO
enrutador.route("/proyectos").post(asyncHandler(crearProyecto));

//API DE ARTICULOS
enrutador.route("/articulos")
    .post(asyncHandler(crearArticulo))
    .get(asyncHandler(getArticulos));
enrutador.route("/articulo/:id")
    .put(asyncHandler(putArticulo));
enrutador.route("/articulo").get(asyncHandler(getArticuloPorNombre)); 

enrutador.route("/cotizacion").post(asyncHandler(crearCotizacion));


