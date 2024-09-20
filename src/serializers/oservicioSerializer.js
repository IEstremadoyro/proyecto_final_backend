import Joi, { required } from "joi";

export const OServicioSerializer = Joi.object({
   numero_orden: Joi.string().required(),
   fecha_orden: Joi.date().required(),
   estado_orden: Joi.string().required(),
   cotizacionId: Joi.number().required(),

   detalle_ordenes: Joi.array().items(
    Joi.object({
        item: Joi.number().required(),
        cantidad: Joi.number().required(),
        precio_unitario: Joi.number().required(),
        articuloId: Joi.number().required(),
        ordenServicioId: Joi.number().required(),
    })
   ),
})