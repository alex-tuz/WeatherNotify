import { Application } from 'express';
import { router as weatherRoutes } from './weatherRoutes';
import { router as subscribeRoutes } from './subscribeRoutes';
import { router as confirmRoutes } from './confirmRoutes';
import { router as unsubscribeRoutes } from './unsubscribeRoutes';
import { router as cityRoutes } from './cityRoutes';

const initRoutes = (app: Application): void => {
    app.use('/api/weather', weatherRoutes);
    app.use('/api/subscribe', subscribeRoutes);
    app.use('/api/confirm', confirmRoutes);
    app.use('/api/unsubscribe', unsubscribeRoutes);
    app.use('/api/cities', cityRoutes);
};

export { initRoutes };
