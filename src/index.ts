import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/routes';
import dotenv from 'dotenv';
import path from 'path';
import { WeatherNotificationService } from './services/weatherNotificationService';
import { validateConfig } from './config/validate';
import { errorHandler } from './middleware/error-handler';
import logger from './utils/logger';
import { setupSwagger } from './middleware/swagger';

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

dotenv.config();

validateConfig();

const startServer = async (): Promise<void> => {
    try {
        logger.info('Starting server initialization...');

        const app = express();

        app.use(cors());
        app.use(express.json());

        logger.info('Setting up Swagger...');
        setupSwagger(app);
        logger.info('Swagger setup completed');

        logger.info('Initializing routes...');
        initRoutes(app);
        logger.info('Routes initialized');

        logger.info('Starting weather notification scheduler...');
        const weatherNotificationService = new WeatherNotificationService();
        await weatherNotificationService.startScheduler();
        logger.info('Weather notification scheduler started');

        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;

        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.listen(PORT, () => {
            logger.info(`Server started successfully on port ${PORT}`);
            logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().catch((error) => {
    logger.error('Fatal error during server startup:', error);
    process.exit(1);
});
