import Joi from "joi";

export const OservicioSerializer = Joi.object({
    numero_orden: Joi.string().required(),
    fecha_orden: Joi.string().isoDate().required(),
    estaddo_orden: Joi.string().required(),
    numero_cotizacion: Joi.string().required(),
    detalle_oservicio: Joi.array().items(
        Joi.object({
            item: Joi.number().required(),
            cantidad: Joi.number().required(),
            precio: Joi.number().required(),
            articuloId: Joi.number().required(),
        }).required()
    ).default([]), 
});
