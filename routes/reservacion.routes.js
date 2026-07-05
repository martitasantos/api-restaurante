const express = require('express');
const router = express.Router();

const {
    crearReservacion,
    misReservaciones,
    todasReservaciones,
    cambiarEstado,
    cancelarReservacion
} = require('../controller/reservacion.controller');

const verificarToken = require('../middleware/auth.middleware');
const verificarAdmin = require('../middleware/admin.middleware');

// CREAR RESERVACIÓN

router.post('/', verificarToken, crearReservacion);

// MIS RESERVACIONES

router.get('/mis', verificarToken, misReservaciones);

// TODAS LAS RESERVACIONES (ADMIN)

router.get('/', verificarToken, verificarAdmin, todasReservaciones);

// CAMBIAR ESTADO (ADMIN)
router.put('/:id/estado', verificarToken, verificarAdmin, cambiarEstado);

// CANCELAR RESERVACIÓN (CLIENTE)

router.delete('/:id', verificarToken, cancelarReservacion);

module.exports = router;
