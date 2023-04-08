import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openai: "3.0.0",
    info: {
      title: "Locums documentation",
      version: "1.0.0",
      description: "Locum APIs",
    },
    servers: [{ api: "http://localhost:5000/" }],
  },
  // apis: ["./Router/*.js"],
  basePath: "/api",
  apis: ["../docs/**/*.yaml"],
};

export default swaggerJSDoc(options);
