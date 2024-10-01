
import { OservicioSerializer } from "../serializers/oservicioSerializer.js";
import { prisma } from "../cliente.js";
import nodemailer from "nodemailer";
///////para generar pdf
import PdfPrinter from "pdfmake";
import fs from "fs";
import {fonts} from "../pdf_fonts/fonts.js";
import styles from "../pdf_styles/style.js";
/////////////////////////////////////

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
        const cotizacion = await prisma.cotizacion.findUnique({
            where: { numero_cotizacion: value.numero_cotizacion },
          });
      
        const proyecto = await prisma.proyecto.findUnique({
        where: { id: cotizacion.proyectoId },
        });
    
        const empresa = await prisma.empresa.findUnique({
        where: { id: proyecto.empresaId },
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
        
        // Calculamos el total general de la cotización
        const totalGeneral = encontrarCotizacion.detalle_cotizaciones.reduce((sum, detalle) => {
            return sum + (detalle.cantidad * detalle.precio_unitario);
        }, 0);

        let docDefinition = {
            content: [
                // Encabezado principal
                { text: 'Acta de Inicio de Servicio', style: 'title', alignment: 'center' },
                { text: `Nro. de Acta: ${value.numero_orden}`, style: 'header' },
                { text: 'TEC-NOVA INDUSTRIAL E.I.R.L.', style: 'header' },
                { text: `RUC: 20603331452`, style: 'subheader' },
                { text: `Fecha Documento: ${new Date().toLocaleDateString()}`, style: 'subheader' },
                // { text: `Fecha de Entrega: ${new Date(value.fecha_entrega).toLocaleDateString()}`, style: 'subheader' },
                { text: `Tipo de Cotización: ${value.numero_cotizacion || 'Sin Cotización'}`, style: 'subheader' },
                { text: `Empresa: ${empresa.nombre || 'Sin Cotización'}`, style: 'subheader' },
                { text: `Proyecto: ${proyecto.nombre || 'Sin Cotización'}`, style: 'subheader' },
                { text: `Forma de Pago: Crédito 15 Días`, style: 'subheader' },
        
                // Espacio antes de la tabla
                { text: '\nDetalles de Cotización', style: 'subheader' },
        
                // Tabla para los detalles de la cotización
                {
                    style: 'tableExample',
                    table: {
                        widths: [50, '*', 100, 100], // Definir tamaños de columnas
                        body: [
                            // Encabezados de la tabla
                            [
                                { text: 'Item', style: 'tableHeader' },
                                { text: 'Descripción', style: 'tableHeader' },
                                { text: 'Cantidad', style: 'tableHeader' },
                                { text: 'Total', style: 'tableHeader' }
                            ],
                            // Filas dinámicas con los detalles de los artículos
                            ...encontrarCotizacion.detalle_cotizaciones.map((detalle, index) => [
                                { text: `${index + 1}`, style: 'tableBody' }, // Item número
                                { text: detalle.item, style: 'tableBody' },   // Descripción del servicio o artículo
                                { text: detalle.cantidad, style: 'tableBody' }, // Cantidad
                                { text: `S/ ${detalle.cantidad * detalle.precio_unitario}`, style: 'tableBody' } // Total calculado
                            ]),
                            // Fila para el total general
                            [
                                { text: 'Total General', colSpan: 3, alignment: 'right', style: 'tableHeader' }, {}, {},
                                { text: `S/ ${totalGeneral}`, style: 'tableBody' } // Mostramos el total general aquí
                            ]
                        ]
                    }
                },
        
                // Espacio para comentarios y firmas
                { text: '\nComentarios:', style: 'subheader' },
                { text: ' ', margin: [0, 20] },  // Espacio para los comentarios
        
                { text: 'Revisado por: ___________________', margin: [0, 40] },
                { text: 'Aprobado por: ___________________', margin: [0, 40] }
            ],            
        };

        const printer = new PdfPrinter(fonts);
        let pdfDoc = printer.createPdfKitDocument(docDefinition);
        const pdfPath = `src/pdfs/${value.numero_orden}.pdf`;
        const writeStream = fs.createWriteStream(pdfPath);

        pdfDoc.pipe(writeStream);

        const pdfCreationPromise = new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(); // El PDF se ha escrito correctamente
            });
            writeStream.on('error', (err) => {
                reject(err); // Manejar el error en el proceso de escritura
            });
        });

        pdfDoc.end();

        await pdfCreationPromise; // Esperar hasta que el PDF esté listo



        /////////////////////////////////////////////////////////       



        //envio de correo con pdf adjunto
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: clienteCorreo,
            to: "ignacio.estremadoyro@gmail.com",
            subject: `Orden de Servicio Creada ${oservicioCreado.numero_orden}`,
            text: `La orden de servicio con número ${oservicioCreado.numero_orden} ha sido creada exitosamente.`,
            attachments: [{
                filename: `${value.numero_orden}.pdf`,
                path: `src/pdfs/${value.numero_orden}.pdf`,
                contentType: 'application/pdf',
            }]
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

