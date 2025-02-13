import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import { SERVER_PORT } from "./constants/app";

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "WebToPDF API",
        version: "1.0.0",
        description: "API que convierte cualquier sitio web en un PDF",
      },
      servers: [
        {
          url: `http://localhost:${SERVER_PORT}`,
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;