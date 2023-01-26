import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version,
      title: 'REST API Docs',
    },
  },
  apis: ['./src/app.ts', './src/api/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, apiPath: string) {
  // Swagger docs
  app.use(`${apiPath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // in JSON
  app.get(`${apiPath}/docs.json`, (_: Request, res: Response) => {
    res.setHeader('content-type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
