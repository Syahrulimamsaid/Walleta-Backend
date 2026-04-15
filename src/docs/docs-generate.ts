import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Walleta API",
    version: "1.0.0",
    description: "Walleta API Documentation",
  },
  host: "localhost:3333",
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/routes.ts"];

swaggerAutogen(outputFile, routes, doc);
