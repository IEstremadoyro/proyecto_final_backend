import { OServicioSerializer } from "../serializers/oservicioSerializer.js";
import { prisma } from "../cliente.js"; 

const crearOServicios = async (req, res) => {
    const { error, value } = OServicioSerializer.validate(re.body);

    if(error) {
        return res.status(400).json({
            message:"Error al crear la orden de servicio",
            content: error.details,
        });
    }

    try {
        //Buscamos en usuario responsable de la elaboracion de la OS
        

        //Buscamos la cotizacion
        const cotizacionEncontrada =await prisma.cotizacion.findUniqueOrThrow({
            where: { id: value.cotizacionId },
            select: { id: true},
        })

        //Buscamos los articulos
        const articuloEncontrado = await prisma.articulo.findMany({
            where: {
                id: {
                    in: value.detalle_ordenes.map((detalle)=> detalle.articuloId),
                 },
            },
            select: { id: true},
        });

        //Realizamos la orden de servicio
        const ordenServicioCreada = await prisma.ordenServicio.create({
            data: {
                numero_orden: value.numero_orden,
                fecha_orden: value.fecha_orden,
                estaddo_orden: value.estaddo_orden,
                cotizacionId: cotizacionEncontrada.id,            
            }
        });
        await prisma.detalleOrden.createMany({
            data: value.detalle_ordenes.map((detalle) => ({
                item: detalle.item,
                cantidad: detalle.cantidad,
                precio_unitario: detalle.precio_unitario,
                articuloId: detalle.articuloId,
                ordenServicioId: ordenServicioCreada.id,
            })),
        });
        res.status(201).json({
            message: "Orden de servicio creada con éxito",
            content:detalleOrden,
        });
    }catch (error){
        console.error(error);
        res.status(500).json({
            message: "Error al crear la orden de servicio",
            content: error.message,
        });
    }
};