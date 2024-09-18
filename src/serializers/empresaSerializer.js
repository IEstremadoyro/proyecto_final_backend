import Joi from "joi";

export const EmpresaSerializer = Joi.object({
    nombre: Joi.string().required(),
    ruc: Joi.string().max(11).required(),
    direccion: Joi.string().required(),
    telefono: Joi.string().min(9).max(15).required(),
    correo_electronico: Joi.string().email().required()
 });
 
