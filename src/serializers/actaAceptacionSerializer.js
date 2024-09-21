import Joi from "joi";

export const ActaAceptacionSerializer = Joi.object({
    orden_servicio: Joi.string().required(),
    
});

// import Joi from "joi";

// export const ActaAceptacionSerializer = Joi.object({
//   orden_servicio: Joi.string().required(),
//   numero_cotizacion: Joi.string().required(),
//   empresaId: Joi.number().required(),
//   proyectoId: Joi.number().required(),
//   nombre_proyecto: Joi.string().required(),
//   fecha_inicio: Joi.date().required(),
//   fecha_final: Joi.date().required(),
// });