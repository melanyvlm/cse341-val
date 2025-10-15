const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongodb = require("./db/connect");
const contactRoutes = require("./routes/contacts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app
  .use(bodyParser.json())
  .use(express.static("public"));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas principales
app.use("/contacts", contactRoutes);

// Conexión a la base de datos y servidor
mongodb.initDb((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Connected to DB and listening on port ${port}`);
    });
  }
});
