import { OservicioSerializer } from "../serializers/oservicioSerializer.js";
import { prisma } from "../cliente.js"

export const crearOservicio = async (req, res) => {
    const { error, value } = OservicioSerializer.validate(req.body);
    console.log(1)
    if (error) {
        return res.status(400).json({
            message: "error al crear orden de servicio",
            content: error.details,
        });
    }
    console.log('Searching for Cotizacion with ID:', value.cotizacion_id);
    //buscarmos el id de la cotizacion
    const encontrarCotizacion = await prisma.cotizacion.findUniqueOrThrow({
        where: { id: value.cotizacion_id },
        select: { id: true },
    });
    console.log('Found Cotizacion:', encontrarCotizacion);

    //creamos la orden de servicio
    const oservicioCreado = await prisma.ordenServicio.create({
        data: {
            numero_orden: value.numero_orden,
            fecha_orden: new Date(value.fecha_orden),
            estaddo_orden: value.estaddo_orden,
            // cotizacion_id: value.cotizacion_id,
            cotizaciones: { // Aquí usamos `connect` para vincular la cotización
                connect: { id: value.cotizacion_id },
            },
        },
    });

    console.log('Orden de Servicio Creada:', oservicioCreado);

    return res.status(201).json({
        message:"la orden de servicio fue creada",
        content: oservicioCreado,
    })
}