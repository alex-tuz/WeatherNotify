import express from 'express';
import cors from 'cors';
import { initRoutes } from './routes/routes';
import dotenv from 'dotenv';
import path from 'path';
import { setupSwagger } from './middleware/swagger';
import { WeatherNotificationService } from './services/weatherNotificationService';
import logger from './utils/logger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

initRoutes(app);

logger.info('Starting weather notification scheduler...');
const weatherNotificationService = new WeatherNotificationService();
weatherNotificationService.startScheduler();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
});
