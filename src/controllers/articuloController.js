import { ArticuloSerializer } from "../serializers/articuloSerializer.js";
import { prisma } from "../cliente.js";


export async function crearArticulo(req, res) {
    const body = req.body;
    const marca = await prisma.marca.findFirst({
        where: { nombre: body.marca.toUpperCase() },
    })
    if (!marca) {
        return res.status(404).json({
            message: "Marca no encontrada",
        });
    }
    const resultado = await prisma.articulo.create({
        data: {
            nombre: body.nombre.toUpperCase(),
            descripcion: body.descripcion.toUpperCase(),
            precioUnitario: body.precioUnitario,
            idMarca: marca.id,
            fuente: body.fuente,
        },
    });

    return res.json({
        message: "Artículo creado exitosamente",
        articulo: resultado,
    })
};


// export const getArticulos = async (req, res) => {
//     const articulosRes = await prisma.articulo.findMany();
//     return res.json({
//         message: "Listado de artículos",
//         content: articulosRes,
//     })
// };
export const getArticulos = async (req, res) => {
    try {
      const articulosRes = await prisma.articulo.findMany({
        include: {
          marcas: { // Asegúrate de usar 'marcas' como se define en tu modelo
            select: {
              nombre: true, // Solo seleccionamos el campo 'nombre' de la marca
            },
          },
        },
      });
  
      // Mapeamos los artículos para incluir el nombre de la marca
    const articulosConNombreMarca = articulosRes.map(articulo => ({
        id: articulo.id,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        precioUnitario: articulo.precioUnitario,
        fuente: articulo.fuente,
        marca: articulo.marcas.nombre, // Aquí es donde obtenemos el nombre de la marca
        createdAt: articulo.createdAt,
      }));
  
      return res.json({
        message: "Listado de artículos",
        content: articulosConNombreMarca,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al obtener los artículos",
        error: error.message,
      });
    }
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
    


