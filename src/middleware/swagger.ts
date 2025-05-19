import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { Express } from 'express';

export const setupSwagger = (app: Express): void => {
    const swaggerDocument = YAML.load(path.join(__dirname, '../swagger/swagger.yaml'));

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const url = new URL(appUrl);
    swaggerDocument.host = url.host;
    swaggerDocument.schemes = [url.protocol.replace(':', '')];

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
        })
    );
};
