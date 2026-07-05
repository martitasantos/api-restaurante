/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     description: Inicia sesión y devuelve un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */

const express = require('express');
const router = express.Router();

const { register, login, perfil } = require('../controller/auth.controller');

const verificarToken = require('../middleware/auth.middleware');

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// PERFIL (PROTEGIDO)
router.get('/perfil', verificarToken, perfil);

module.exports = router;

