import Joi from "joi";

export const ArticuloSerializer = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    precio: Joi.number().required(),
 });


