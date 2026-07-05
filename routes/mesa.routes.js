/// rutas de mesas con seguridad
const express = require('express');
const router = express.Router();

// controladores
const {
    obtenerMesas,
    obtenerMesaById,
    crearMesa,
    actualizarMesa,
    eliminarMesa
} = require('../controller/mesa.controller');

// middlewares
const verificarToken = require('../middleware/auth.middleware');
const adminOnly = require('../middleware/admin.middleware');

// RUTAS PÚBLICAS
router.get('/', obtenerMesas);
router.get('/:id', obtenerMesaById);

// RUTAS PROTEGIDAS (SOLO ADMIN)
router.post('/', verificarToken, adminOnly, crearMesa);
router.put('/:id', verificarToken, adminOnly, actualizarMesa);
router.delete('/:id', verificarToken, adminOnly, eliminarMesa);

module.exports = router;


