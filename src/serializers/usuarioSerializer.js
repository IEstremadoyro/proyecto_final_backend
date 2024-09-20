import Joi from "joi";

export const UsuarioSerializer = Joi.object({
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),    
    habilitado: Joi.boolean().required(),
})