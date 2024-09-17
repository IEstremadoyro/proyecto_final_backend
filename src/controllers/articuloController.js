import { ArticuloSerializer } from "../serializers/articuloSerializer.js";
import { prisma } from "../cliente.js";


export async function crearArticulo(req, res) {
    const body = req.body;
    const resultado = await prisma.articulo.create({
        data: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,            
        },
    });

    return res.json({
        message: "Artículo creado exitosamente",
        articulo: resultado,
    })
};


export const getArticulos = async (req, res) => {
    const articulosRes = await prisma.articulo.findMany();
    return res.json({
        message: "Listado de artículos",
        content: articulosRes,
    })
};

export const putArticulo = async (req, res) => {
    const body = req.body;

    const { id } = req.params;
    const { error, value } = ArticuloSerializer.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Error al actualizar el artículo",
            content: error.details,
        });
    };

    const articuloEncontrado = await prisma.articulo.findUniqueOrThrow({
        where: {id: +id},
        select: { id: true},
    });

    const articuloActualizado = await prisma.articulo.update({
        where: {id: articuloEncontrado.id},
        data: {
            nombre: value.nombre,
            descripcion: value.descripcion,
            precio: value.precio,
        },
    });

    return res.json({
        message: "Artículo actualizado exitosamente",
        content: articuloActualizado,
    });
};

export const getArticuloPorNombre = async (req, res) => {
    const { nombre } = req.query

    try {
        const getArticuloPorNombre = await prisma.articulo.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: "insensitive",
                },
            },            
        })
        res.json(getArticuloPorNombre)
    } catch (err) {
      console.error(err);
      return;
    }
};
    


