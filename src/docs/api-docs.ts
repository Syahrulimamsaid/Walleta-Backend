import swaggerJsDoc from "swagger-jsdoc";
import { env } from "prisma/config";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Walleta API",
      version: "1.0.0",
      description: "Walleta API Documentation",
    },
    servers: [
      {
        url: env("APP_URL"),
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"]
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
