const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const Router = express.Router();

const taskRouter = require('./taskRouter');
const metricsRouter = require('./metricsRouter');
const BACKEND_API_PORT = process.env.BACKEND_API_PORT;

Router.use('/task/service', taskRouter);
Router.use('/metrics/service', metricsRouter);

// docs
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Data Extraction API',
      description: 'DataStoreExtractor Service',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${BACKEND_API_PORT}`,
        description: 'localhost server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          description: 'Bearer to authorize API',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
Router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = Router;
