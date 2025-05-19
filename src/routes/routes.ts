import { Application } from 'express';
import { router as weatherRoutes } from './weatherRoutes';
import { router as subscribeRoutes } from './subscribeRoutes';
import { router as confirmRoutes } from './confirmRoutes';
import { router as unsubscribeRoutes } from './unsubscribeRoutes';

const initRoutes = (app: Application): void => {
    app.use('/api/weather', weatherRoutes);
    app.use('/api/subscribe', subscribeRoutes);
    app.use('/api/confirm', confirmRoutes);
    app.use('/api/unsubscribe', unsubscribeRoutes);
};

export { initRoutes };
