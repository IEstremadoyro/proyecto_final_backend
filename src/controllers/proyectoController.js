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

    const empresaEncontrada = await prisma.empresa.findFirst({
        where: { ruc: value.ruc },
    });

    const proyectoCreado = await prisma.proyecto.create({
        data: {
            nombre: value.nombre,
            descripcion: value.descripcion,
            fecha_inicio: new Date(),
            fecha_fin: new Date(),
            empresaId: empresaEncontrada.id,
        },
    });

    return res.status(201).json({
        message:"El proyecto fue creado existosamente",
        content: proyectoCreado,
    });    
};
export const getProyectos = async (req, res) => {
    try {
        // Obtener todos los proyectos, incluyendo la relación con la empresa
        const proyectoRes = await prisma.proyecto.findMany({
            include: {  // Cambia "includes" por "include", ya que es el correcto en Prisma
                empresas: {  // Relación con el modelo Empresa, debe ser "empresas" según tu schema.prisma
                    select: {
                        nombre: true,
                        ruc: true,  // Solo seleccionamos el nombre de la empresa
                    },
                },
            },
        });

        // Mapear los resultados para devolver el formato deseado
        const proyectosConNombreEmpresa = proyectoRes.map(proyecto => ({
            id: proyecto.id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            fecha_inicio: proyecto.fecha_inicio,
            fecha_fin: proyecto.fecha_fin,
            nombreEmpresa: proyecto.empresas.nombre,  // Accedemos al nombre de la empresa
            ruc: proyecto.empresas.ruc,
        }));

        // Responder con la lista de proyectos y los nombres de las empresas
        return res.json({
            message: "Listado de proyectos",
            content: proyectosConNombreEmpresa,
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error al obtener proyectos" });
    }
};


// export const getProyectos = async (req, res) => {
// const proyectoRes = await prisma.proyecto.findMany();
    // return res.json({
    //     message: "Listado de proyectos",
    //     content: proyectoRes,
    // })
// };