import { prisma } from "../cliente.js";
import { EmpresaSerializer } from "../serializers/empresaSerializer.js";

export async function crearEmpresa(req, res) {
    const body = req.body;
    if (body.ruc.length !== 11 && body.ruc.length !== 8){
        return res.status(400).json({ 
            message: "El documento debe tener 11 u 8 caracteres segun corresponda",
        });
    }
    const resultado = await prisma.empresa.create({
        data: {
            nombre: body.nombre,
            ruc: body.ruc,
            direccion: body.direccion,
            telefono: body.telefono,
            correo_electronico: body.correo_electronico,   
        },
    });

    return res.json({
        message: "Empresa creada exitosamente",
        content: resultado,
    });
}

export const getEmpresas = async (req, res) => {
    
    const empresasRes = await prisma.empresa.findMany();
    return res.json({
        message: "Listado de empresas",
        content: empresasRes,
    })
};

export const putEmpresa = async (req, res) => {
    const body = req.body;

    const { id }  = req.params;

    const { error, value} = EmpresaSerializer.validate(body);

    if (error) {
        return res.status(400).json({ 
            message: "Error al actualizar la empresa",
            content: error.details,
        });
    };

    const empresaEncontrada = await prisma.empresa.findUniqueOrThrow({
        //where:{ id: parseInt(id)}
        where: { id: +id }, 
        select: { id: true},
    });

    const empresaActualizado = await prisma.empresa.update({
        where: { id: empresaEncontrada.id },
        data: {
            nombre: value.nombre,
            ruc: value.ruc,
            direccion: value.direccion,
            telefono: value.telefono,
            correo_electronico: value.correo_electronico,
        },
    });
    
    return res.json({
        message: "Empresa actualizada exitosamente",
        content: empresaActualizado,
    });
};

