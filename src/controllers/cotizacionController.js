import { CotizacionSerializer } from "../serializers/cotizacionSerializer.js";
import { prisma } from "../cliente.js";

export const crearCotizacion = async (req, res) => {
    const { error, value } =  CotizacionSerializer.validate(req.body);
   // console.log(detalle_cotizaciones);
    if (error) {
        return res.status(400).json({
            message: "Error al crear la cotización",
            content: error.details,
        });
    }

    //Buscamos el proyecto
    const proyectoEncontrado = await prisma.proyecto.findUniqueOrThrow({
        where: { id: value.proyectoId },
        select: { id: true},
    });
    console.log(proyectoEncontrado);
    //buscamos los articulos
    const articuloEncontrado = await prisma.articulo.findMany({
        //where: { id: { in: value.detalles.map((detalle) => detalle.idArticulo) } },
        
        where: { id: value.articuloId },
        //select: { id: true, nombre: true, precio: true },
        select : {id: true},
      });
      //console.log(articuloEncontrado)
    
    //Realizamos la cotizacion
    const cotizacionCreada = await prisma.cotizacion.create({
        data:{
            numero_cotizacion: value.numero_cotizacion,
            fecha_cotizacion:value.fecha_cotizacion,
            estado_cotizacion: value.estado_cotizacion,
            proyectoId: proyectoEncontrado.id,

            detalle_cotizaciones: {
                createMany: value.detalle_cotizaciones.map((detalle) => ({
                    item: detalle.item,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    articuloId: detalle.articuloEncontrado.id,
                  })),
                },
            },
            include: {
                detalle_cotizaciones: true,
            },        
    });
    res.status(201).json({
        message: "La cotización fue creada exitosamente",
        content: cotizacionCreada,
    })
};

