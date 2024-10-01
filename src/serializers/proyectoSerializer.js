// import Joi from "joi";

// export const ProyectoSerializer = Joi.object({
//     nombre: Joi.string().required(),
//     descripcion: Joi.string().required(),
//     fecha_inicio: Joi.date().iso().required(),
//     fecha_fin: Joi.date().optional(),
//     empresaId: Joi.number().required(),
// });

import Joi from "joi";

export const ProyectoSerializer = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    ruc: Joi.string().required(),
});