import { OservicioSerializer } from "../serializers/oservicioSerializer.js";
import { prisma } from "../cliente.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña o token de acceso
    },
});
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
    // const encontrarCotizacion = await prisma.cotizacion.findUniqueOrThrow({
    //     where: { id: value.cotizacion_id },
    //     select: { id: true },
    // });
    // console.log('Found Cotizacion:', encontrarCotizacion);
    // Buscamos el id de la cotización y el correo del cliente asociado
    const encontrarCotizacion = await prisma.cotizacion.findUniqueOrThrow({
        where: { id: value.cotizacion_id },
        select: {
            id: true,
            proyectos: {
                select: {
                    empresas: {
                        select: {
                            correo_electronico: true, // Obtenemos el correo del cliente
                        },
                    },
                },
            },
        },
    });

    const clienteCorreo = encontrarCotizacion.proyectos.empresas.correo_electronico;
    console.log(clienteCorreo)
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
    // Enviamos el correo electrónico al cliente
    const mailOptions = {
        from: process.env.EMAIL_USER,
        // to: clienteCorreo,
        to: "ignacio.estremadoyro@gmail.com",
        subject: "Orden de Servicio Creada",
        text: `La orden de servicio con número ${oservicioCreado.numero_orden} ha sido creada exitosamente.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
            return res.status(500).json({
                message: "La orden de servicio fue creada, pero ocurrió un error al enviar el correo.",
            });
        } else {
            console.log("Correo enviado:", info.response);
        }
    });

    console.log('Orden de Servicio Creada:', oservicioCreado);

    return res.status(201).json({
        message:"la orden de servicio fue creada",
        content: oservicioCreado,
    })
}
export const getOservicio = async (req, res) => {
    const oservicioRes = await prisma.ordenServicio.findMany();
    return res.json({
        message: "Listado de proyectos",
        content: oservicioRes,
    })
};