import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fileRenameRoutes from './routes/fileRenameRoutes';

const app = express();
const port = 3000;

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'File Rename API',
      version: '1.0.0',
      description: 'API for triggering file rename operations in a directory.',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    paths: {
      '/api/rename-files': {
        post: {
          summary: 'Trigger file rename operation',
          tags: ['File Rename'],
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    directoryPath: {
                      type: 'string',
                      example: 'D:\\Media\\MyFolder',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Rename completed successfully',
            },
            '500': {
              description: 'Rename failed',
            },
          },
        },
      },
    },
  },
  apis: [],
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', fileRenameRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
