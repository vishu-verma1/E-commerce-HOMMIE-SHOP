const swaggerAutogen = require("swagger-autogen")({autoClean:true})

const doc = {
  info: {
    title: "My API",
    description: "task",
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "Some description...",
    },
  },
  host: "localhost:3000",
  basePath: "/",

  tags: [
    // by default: empty Array
    {
      name: "Users", // Tag name
      description: "All the products related routes are here", // Tag description
    },

    {
      name: "Products", // Tag name
      description: "All the products related routes are here", // Tag description
    },

   
  ],

   
  
};



const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
// module.exports =
