import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscriptionService';
import { BadRequestError, NotFoundError } from '../utils/errors';

const subscriptionService = new SubscriptionService();

export const confirm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.params;

        if (!token) {
            res.status(400).json({ error: 'Token is required' });
            return;
        }

        await subscriptionService.confirm(token);

        res.status(200).json({
            message: 'Subscription confirmed successfully',
        });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        if (error instanceof BadRequestError) {
            if (error.message === 'Subscription is already confirmed') {
                res.status(409).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
