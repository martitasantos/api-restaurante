require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

// RUTAS

const mesasRoutes = require('./routes/mesa.routes');
const authRoutes = require('./routes/auth.routes');
const reservacionRoutes = require('./routes/reservacion.routes');

// SWAGGER

const swaggerDocs = require('./swagger/swagger');

// USO DE RUTAS

app.use('/api/v1/mesas', mesasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservaciones', reservacionRoutes);

// ACTIVAR SWAGGER

swaggerDocs(app);

// RUTA PRINCIPAL

app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenidos a la API de Restaurante',
        descripcion: 'API con JWT, roles, Prisma y reservaciones',
        version: '1.0.0'
    });
});

// SERVIDOR (IMPORTANTE PARA RAILWAY)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
