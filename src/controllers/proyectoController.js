import { ProyectoSerializer } from "../serializers/proyectoSerializer.js";
import { prisma } from "../cliente.js";

export const crearProyecto = async (req, res) => {
    const { error, value } = ProyectoSerializer.validate(req.body);

    if (error) {
        return res.status(400).json({ 
            message: "Error al crear proyecto",
            content: error.details,    
        });
    }

    //Buscamos la empresa
    const empresaEncontrada = await prisma.empresa.findUniqueOrThrow({
        where: { id: value.empresaId },
        select: { id: true},
    });

    //creamos el proyecto
    const proyectoCreado = await prisma.proyecto.create({
        data: {
            nombre: value.nombre,
            descripcion: value.descripcion,
            fecha_inicio: value.fecha_inicio,
            fecha_fin: value.fecha_fin,
            empresaId: empresaEncontrada.id,
        },
    });

    return res.status(201).json({
        message:"El proyecto fue creado existosamente",
        content: proyectoCreado,
    });    
};
export const getProyectos = async (req, res) => {
    const proyectoRes = await prisma.proyecto.findMany();
    return res.json({
        message: "Listado de proyectos",
        content: proyectoRes,
    })
};