const prisma = require('../prisma/cliente');

// CREAR RESERVACIÓN

const crearReservacion = async (req, res) => {

    try {

        const usuarioId = req.usuario.id;
        const { fecha, hora, personas, mesaId } = req.body;

        const fechaHora = new Date(`${fecha}T${hora}`);

        const existe = await prisma.reservacion.findFirst({
            where: {
                mesaId: Number(mesaId),
                fecha: new Date(fecha),
                hora: fechaHora
            }
        });

        if (existe) {
            return res.status(400).json({
                mensaje: "La mesa ya está reservada en ese horario"
            });
        }

        const nueva = await prisma.reservacion.create({
            data: {
                fecha: new Date(fecha),
                hora: fechaHora,
                personas: Number(personas),
                usuarioId,
                mesaId: Number(mesaId)
            }
        });

        res.status(201).json({
            mensaje: "Reservación creada correctamente",
            reservacion: nueva
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear reservación",
            error: error.message
        });
    }
};

// MIS RESERVACIONES

const misReservaciones = async (req, res) => {

    try {

        const usuarioId = req.usuario.id;

        const reservaciones = await prisma.reservacion.findMany({
            where: { usuarioId },
            include: {
                mesa: true
            }
        });

        res.json(reservaciones);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener reservaciones",
            error: error.message
        });
    }
};

// TODAS LAS RESERVACIONES (ADMIN)

const todasReservaciones = async (req, res) => {

    try {

        const reservaciones = await prisma.reservacion.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        correo: true
                    }
                },
                mesa: true
            }
        });

        res.json(reservaciones);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener reservaciones",
            error: error.message
        });
    }
};

// CAMBIAR ESTADO (ADMIN)

const cambiarEstado = async (req, res) => {

    try {

        const id = Number(req.params.id);
        const { estado } = req.body;

        const reservacion = await prisma.reservacion.findUnique({
            where: { id }
        });

        if (!reservacion) {
            return res.status(404).json({
                mensaje: "Reservación no encontrada"
            });
        }

        const actualizada = await prisma.reservacion.update({
            where: { id },
            data: { estado }
        });

        res.json({
            mensaje: "Estado actualizado correctamente",
            reservacion: actualizada
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar estado",
            error: error.message
        });
    }
};

// CANCELAR RESERVACIÓN (CLIENTE)

const cancelarReservacion = async (req, res) => {

    try {

        const id = Number(req.params.id);
        const usuarioId = req.usuario.id;

        const reservacion = await prisma.reservacion.findUnique({
            where: { id }
        });

        if (!reservacion) {
            return res.status(404).json({
                mensaje: "Reservación no encontrada"
            });
        }

        if (reservacion.usuarioId !== usuarioId) {
            return res.status(403).json({
                mensaje: "No puedes cancelar esta reservación"
            });
        }

        await prisma.reservacion.delete({
            where: { id }
        });

        res.json({
            mensaje: "Reservación cancelada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al cancelar reservación",
            error: error.message
        });
    }
};

module.exports = {
    crearReservacion,
    misReservaciones,
    todasReservaciones,
    cambiarEstado,
    cancelarReservacion
};
