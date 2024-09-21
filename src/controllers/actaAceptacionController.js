// import { prisma } from "../cliente.js";
// import { ActaAceptacionSerializer } from "../serializers/actaAceptacionSerializer.js";

// export const crearActaAceptacion = async (req, res) => {
//   try {
//     const { error, value } = ActaAceptacionSerializer.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { orden_servicio, numero_cotizacion, empresaId, proyectoId, nombre_proyecto, fecha_inicio, fecha_final } = value;

//     // Verificar si la orden de servicio existe
//     const ordenServicio = await prisma.ordenServicio.findUnique({
//       where: { numero_orden: orden_servicio },
//     });

//     if (!ordenServicio) {
//       return res.status(404).json({ error: "Orden de servicio no encontrada" });
//     }

//     // Crear el acta de aceptación
//     const actaAceptacion = await prisma.actaAceptacion.create({
//       data: {
//         numero_cotizacion: numero_cotizacion,
//         orden_servicio: ordenServicio.numero_orden, // Asegurarse que ordenServicio.numero_orden no sea undefined
//         empresa: { connect: { id: empresaId } },
//         proyecto: { connect: { id: proyectoId } },
//         nombre_proyecto: nombre_proyecto,
//         fecha_inicio: fecha_inicio,
//         fecha_final: fecha_final,
//         oservicios: { connect: { numero_orden: ordenServicio.numero_orden } }, // Conectar correctamente la relación
//       },
//     });

//     return res.status(201).json(actaAceptacion);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Ocurrió un error al crear el acta de aceptación" });
//   }
// };


// export const getActasAceptacion = async (req, res) => {
//     try {
//         const actas = await prisma.actaAceptacion.findMany();
//         return res.json({
//             message: "Listado de actas de aceptación",
//             content: actas,
//         });
//     } catch (error) {
//         console.error("Error al obtener actas de aceptación:", error);
//         return res.status(500).json({
//             message: "Error al obtener actas de aceptación",
//             content: error.message,
//         });
//     }
// };
import { prisma } from "../cliente.js";
import { ActaAceptacionSerializer } from "../serializers/actaAceptacionSerializer.js";

export const crearActaAceptacion = async (req, res) => {
  try {
    const { error, value } = ActaAceptacionSerializer.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const ordenServicio = await prisma.ordenServicio.findUnique({
      where: { numero_orden: value.orden_servicio },
    });

    if (!ordenServicio) {
      return res.status(404).json({ error: "Orden de servicio no encontrada" });
    }

    const cotizacion = await prisma.cotizacion.findUnique({
      where: { numero_cotizacion: ordenServicio.numero_cotizacion },
    });

    const proyecto = await prisma.proyecto.findUnique({
      where: { id: cotizacion.proyectoId },
    });

    const empresa = await prisma.empresa.findUnique({
      where: { id: proyecto.empresaId },
    });

    const actaAceptacion = await prisma.actaAceptacion.create({
      data: {
        orden_servicio: ordenServicio.numero_orden,
        numero_cotizacion: cotizacion.numero_cotizacion,
        empresaId: empresa.id,
        proyectoId: proyecto.id,
        nombre_proyecto: proyecto.nombre,
        fecha_inicio: cotizacion.fecha_cotizacion,
        fecha_final: cotizacion.fecha_cotizacion,
      },
    });

    return res.status(201).json(actaAceptacion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al crear el acta de aceptación" });
  }
};
export const getActasAceptacion = async (req, res) => {
    try {
        const actas = await prisma.actaAceptacion.findMany();
        return res.json({
            message: "Listado de actas de aceptación",
            content: actas,
        });
    } catch (error) {
        console.error("Error al obtener actas de aceptación:", error);
        return res.status(500).json({
            message: "Error al obtener actas de aceptación",
            content: error.message,
        });
    }
};