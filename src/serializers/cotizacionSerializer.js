import Joi from "joi";

export const CotizacionSerializer = Joi.object({
    numero_cotizacion: Joi.string().required(),
    fecha_cotizacion: Joi.date().required(),
    estado_cotizacion: Joi.string().required(),
    proyectoId: Joi.number().required(),
    usuarioId: Joi.number().required(),
    detalle_cotizaciones: Joi.array().items(
        Joi.object({
            item: Joi.number().required(),
            cantidad: Joi.number().required(),
            precio_unitario: Joi.number().required(),
            articuloId: Joi.number().required(),
        }).required())
})


