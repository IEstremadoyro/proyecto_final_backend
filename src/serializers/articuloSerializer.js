import Joi from "joi";

export const ArticuloSerializer = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    precioUnitario: Joi.number().required(),
    marca: Joi.string().required(),
    fuente: Joi.string().required(),
 });


