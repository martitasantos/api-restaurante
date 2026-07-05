const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Restaurante",
            version: "1.0.0",
            description: "API de reservaciones con JWT, roles y Prisma"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./controller/*.js", "./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
