import Joi from "joi";

export const ActaAceptacionSerializer = Joi.object({
    orden_servicio: Joi.string().required(),
    
});
