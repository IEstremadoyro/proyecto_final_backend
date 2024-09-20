import { UsuarioSerializer } from "../serializers/usuarioSerializer.js";
import bcrypt from "bcrypt";
import { prisma } from "../cliente.js";

export const crearUsuario = async (req, res) => {
    const { error, value } = UsuarioSerializer.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Error al registrar el usuario",
            content: error.details,
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(value.password, salt);
        value.passwordHashed = passwordHashed;

        const usuarioRegistrado = await prisma.usuario.create({
            data: {
                nombres: value.nombres,
                apellidos: value.apellidos,
                email: value.email,
                password: value.passwordHashed,
                habilitado: value.habilitado,
            },
        });
        res.status(201).json({
            message: "Usuario registrado correctamente",
            content: usuarioRegistrado,
        })
    }catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Error al registrar el usuario",
            content: error.message,
        });
    }
};

export const getUsuarios = async (req, res) => {
    const usuariosRes =  await prisma.usuario.findMany();
    return res.json({
        message:"Lista de usuarios",
        content: usuariosRes,
    })
};

export const putUsuario = async (req, res) => {
    const body = req.body;

    const { id } = req.params;
    const { error, value} = UsuarioSerializer.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Error al actualizar el usuario",
            content: error.details,
        })
    };

    const usuarioEncontrado = await prisma.usuario.findUniqueOrThrow({
        where: { id: +id},
        select: { id: true},
    });

    const usuarioActualizado = await prisma.usuario.update({
        where: { id: usuarioEncontrado.id },
        data: {
            nombres: value.nombres,
            apellidos: value.apellidos,
            email: value.email,
            password: value.password? await bcrypt.hash(value.password, 10) : usuarioEncontrado.password,
            habilitado: value.habilitado,
        },
    });
    return res.json({
        message: "Usuario actualizado exitosamente",
        content: usuarioActualizado,
    })
};

export const getUsuarioPorApellidos = async (req, res) => {
    const { apellidos } = req.query;

    try {
        const usuariosPorApellidos = await prisma.usuario.findMany({
            where: {
                apellidos: {
                    contains: apellidos,
                    mode: "insensitive",
                },
            },
        });
        res.json(usuariosPorApellidos)
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al buscar el usuario"
        });
    }
};