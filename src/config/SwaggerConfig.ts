import express = require("express");

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

const options = {
 definition: {
  openapi: "3.0.0",
  info: {
   title: "",
   version: "1.0.0",

  },
  components: {
   securitySchemes: {
    bearerAuth: {
     type: "http",
     scheme: "bearer",
     bearerFormat: "JWT",
    },
   },
  },
  servers: [
   {
    url: "http://localhost:5000",
   },
   {
    url: "",
   },
  ],
 },
 apis: ["./src/docs/*.yaml"],
};
const swaggerSpec = swaggerJSDoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
