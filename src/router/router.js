import { Router } from "express";
import asyncHandler from "express-async-handler";
import { crearUsuario, getUsuarios, putUsuario } from "../controllers/usuarioController.js";
import { crearEmpresa, getEmpresas, putEmpresa } from "../controllers/empresaController.js";
import { crearProyecto, getProyectoPorRucEmpresa } from "../controllers/proyectoController.js";
import { crearArticulo, getArticuloPorNombre, getArticulos, putArticulo } from "../controllers/articuloController.js";
import { crearCotizacion, getCotizacionPorNumero } from "../controllers/cotizacionController.js";

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

//API DE ORDENES DE SERVICIO
//enrutador.route("/

