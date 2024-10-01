import { MarcaSerializer } from "../serializers/marcaSerializer.js";
import { prisma } from "../cliente.js";

export async function crearMarca(req, res){
    const body = req.body;
    
    const { error, value } = MarcaSerializer.validate(req.body); //
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const validacion = await prisma.marca.findFirst({
        where: { nombre: value.nombre.toUpperCase() }
    })
    if(validacion) {
        return res.status(400).json({ error: "Marca ya existente" });
    }
    const resultado = await prisma.marca.create({
        data: {
            nombre: body.nombre.toUpperCase()
        }
    });
    return res.json({
        message: "marca creada exitosamente",
        content: resultado,
    })
};

export async function getMarcas(req, res){
    const body = await prisma.marca.findMany();
    res.header('Access-Control-Allow-Origin', '*'); // agregar cabecera CORS    
    return res.json({
        message: "Listado de marcas",
        content: body,
        })
    };
