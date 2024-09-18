import Joi from "joi";

export const OservicioSerializer = Joi.object({
    numero_orden: Joi.string().required(),
    fecha_orden: Joi.string().required(),
    estaddo_orden: Joi.string().required(),
    cotizacion_id: Joi.number().required(),
});