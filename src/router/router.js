import { Router } from "express";
import asyncHandler from "express-async-handler";
import { crearEmpresa, getEmpresas, putEmpresa } from "../controllers/empresaController.js";
import { crearProyecto } from "../controllers/proyectoController.js";

export const enrutador = Router();

//enrutador.post("/empresas", crearEmpresa);
//enrutador.get("/empresas", getEmpresas);

enrutador
    .route("/empresas")
    .post(asyncHandler(crearEmpresa))
    .get(asyncHandler(getEmpresas));
enrutador
    .route("/empresa/:id")
    .put(asyncHandler(putEmpresa));
enrutador.route("/proyectos").post(asyncHandler(crearProyecto));



