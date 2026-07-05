const prisma = require('../prisma/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER

const register = async (req, res) => {
    try {

        const { nombre, correo, password } = req.body;

        const existeUsuario = await prisma.usuario.findUnique({
            where: { correo }
        });

        if (existeUsuario) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado."
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                correo,
                password: passwordEncriptada
            }
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al registrar usuario.",
            error: error.message
        });
    }
};

// ======================
// LOGIN
// ======================
const login = async (req, res) => {
    try {

        const { correo, password } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: { correo }
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            mensaje: "Login exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error en login",
            error: error.message
        });
    }
};

// PERFIL

const perfil = async (req, res) => {
    try {

        const usuario = await prisma.usuario.findUnique({
            where: { id: req.usuario.id },
            select: {
                id: true,
                nombre: true,
                correo: true,
                rol: true
            }
        });

        res.json(usuario);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener perfil",
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    perfil
};
