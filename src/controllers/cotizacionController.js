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

    try{
        //Buscamos el proyecto
        const proyectoEncontrado = await prisma.proyecto.findUniqueOrThrow({
            where: { id: value.proyectoId },
            select: { id: true},
        });
        console.log(proyectoEncontrado);
        
        //buscamos los articulos
        const articuloEncontrado = await prisma.articulo.findMany({
            where: {
              id: {
                in: value.detalle_cotizaciones.map((detalle) => detalle.articuloId),
              },
            },
            select: { id: true },
          });
        //console.log(articuloEncontrado)
    
        //Realizamos la cotizacion
        const cotizacionCreada = await prisma.cotizacion.create({
        data:{
            numero_cotizacion: value.numero_cotizacion,
            fecha_cotizacion:value.fecha_cotizacion,
            estado_cotizacion: value.estado_cotizacion,
            proyectoId: proyectoEncontrado.id,
            },
        });

        const detallesCotizacion = await prisma.detalleCotizacion.createMany({
            data: value.detalle_cotizaciones.map((detalle) => ({
              item: detalle.item,
              cantidad: detalle.cantidad,
              precio_unitario: detalle.precio, // Asegúrate de que el nombre del campo sea correcto
              articuloId: detalle.articuloId,
              cotizacionId: cotizacionCreada.id,
            })),
        });
        res.status(201).json({
            message: "La cotización fue creada exitosamente",
            //content: cotizacionCreada,
            content: detallesCotizacion
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error al crear la cotización", 
            error: error.message 
    });
  }
}

export const getCotizacionPorNumero = async (req, res) => {
    const { numero_cotizacion } = req.query

    try {
        const cotizacion = prisma.cotizacion.findUniqueOrThrow({
            where: {
                contains: numero_cotizacion,                
            }
        })
        res.json(cotizacion)
    }catch (err) {
        console.error(err)
        return;
    }
};