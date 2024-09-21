
import { OservicioSerializer } from "../serializers/oservicioSerializer.js";
import { prisma } from "../cliente.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const crearOservicio = async (req, res) => {
    const { error, value } = OservicioSerializer.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Error al crear orden de servicio",
            content: error.details,
        });
    }

    try {
        const encontrarCotizacion = await prisma.cotizacion.findUniqueOrThrow({
            where: { numero_cotizacion: value.numero_cotizacion },
            select: {
                id: true,
                proyectos: {
                    select: {
                        empresas: {
                            select: {
                                correo_electronico: true,
                            },
                        },
                    },
                },
                detalle_cotizaciones: {
                    select: {
                        item: true,
                        cantidad: true,
                        precio_unitario: true,
                        articuloId: true,
                    },
                },
            },
        });
        console.log('Buscando cotización con número:', value.numero_cotizacion);

        const clienteCorreo = encontrarCotizacion.proyectos.empresas.correo_electronico;

        const oservicioCreado = await prisma.ordenServicio.create({
            data: {
                numero_orden: value.numero_orden,
                fecha_orden: new Date(value.fecha_orden),
                estaddo_orden: value.estaddo_orden,
                cotizaciones: {
                    connect: { id: encontrarCotizacion.id },
                },
                detalle_ordenes: {
                    create: encontrarCotizacion.detalle_cotizaciones.map((detalle) => ({
                        item: detalle.item,
                        cantidad: detalle.cantidad,
                        precio_unitario: detalle.precio_unitario,
                        articuloId: detalle.articuloId,
                    })),
                },
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: clienteCorreo,
            subject: `Orden de Servicio Creada ${oservicioCreado.numero_orden}`,
            text: `La orden de servicio con número ${oservicioCreado.numero_orden} ha sido creada exitosamente.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            message: "La orden de servicio fue creada",
            content: oservicioCreado,
        });
    } catch (err) {
        console.error("Error al crear la orden de servicio:", err);
        return res.status(500).json({
            message: "Error al crear la orden de servicio.",
            error: err.message,
        });
    }
};


export const getOservicio = async (req, res) => {
    try {
      const oservicioRes = await prisma.ordenServicio.findMany({
        include: {
          detalle_ordenes: {
            include: {
              articulos: {
                select: {
                  nombre: true,
                  descripcion: true,
                },
              },
            },
          },
        },
      });

      return res.json({
        message: "Listado de órdenes de servicio",
        content: oservicioRes,
      });
    } catch (error) {
      console.error("Error al obtener órdenes de servicio:", error);
      return res.status(500).json({
        message: "Error al obtener órdenes de servicio",
        content: error.message,
      });
    }
  };

