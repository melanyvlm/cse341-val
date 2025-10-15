const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Contacts API",
            version: "1.0.0",
            description: "API documentation for the Contacts project",
        },
        servers: [
            {
                url: process.env.RENDER_URL || "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js"], // buscará los comentarios Swagger en tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    // Interfaz Swagger UI
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Archivo swagger.json (si lo necesitas descargar)
    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = { setupSwagger };
