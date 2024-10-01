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
        const proyectoEncontrado = await prisma.proyecto.findUniqueOrThrow({
            where: { id: value.proyectoId },
            select: { id: true},
        });
        console.log(proyectoEncontrado);
        
        const articuloEncontrado = await prisma.articulo.findMany({
            where: {
              id: {
                in: value.detalle_cotizaciones.map((detalle) => detalle.articulo_id),
              },
            },
            select: { id: true },
          });
        //console.log(articuloEncontrado)
    
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
              precio_unitario: detalle.precio, 
              articuloId: detalle.articulo_id,
              cotizacionId: cotizacionCreada.id,
            })),
        });
        res.status(201).json({
            message: "La cotización fue creada exitosamente",
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

export const getCotizacion = async (req, res) => {
  try {
      const cotizacionRes = await prisma.cotizacion.findMany({
          include: {            
            proyectos: {
              select: {
                  nombre: true,  
              },
            },
              detalle_cotizaciones: true,  
              
          },
      });

      return res.json({
          message: "Listado de cotizaciones",
          content: cotizacionRes,
      });
  } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
      return res.status(500).json({
          message: "Error al obtener cotizaciones",
          content: error.message,
      });
  }
};