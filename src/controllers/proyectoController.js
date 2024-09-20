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
    //Buscamos el usuario registrado
    const usuarioEncontrado = await prisma.usuario.findUniqueOrThrow({
        where: { id: value.usuarioId },
        select: { id: true},
    })

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
            usuarioId: usuarioEncontrado.id,
        },
    });

    return res.status(201).json({
        message:"El proyecto fue creado existosamente",
        content: proyectoCreado,
    });    
};

export const getProyectoPorRucEmpresa = async (req, res) => {
    const { rucEmpresa } = req.query;
    try {
        const empresaEncontrada = await prisma.empresa.findFirst({
            where: { 
                ruc: rucEmpresa,
            },
            include: {
                proyectos: true,
            }            
        });
        console.log(empresaEncontrada);
        res.status(200).json({
            message:"Los proyectos asociados al ruc de empresa son:",    
            content: empresaEncontrada.proyectos,
        }); 
    }catch (error) {
        return res.status(404).json({
            message: "No se encontró proyecto asociado al ruc de la empresa",
            content: error,
        });
    }
};