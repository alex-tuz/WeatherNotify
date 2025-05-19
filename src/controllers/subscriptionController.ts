import { Request, Response } from 'express';
import { SubscriptionDTO } from '../interfaces/SubscriptionDTO';
import { SubscriptionService } from '../services/subscriptionService';
import { validateOrReject } from 'class-validator';
import { BadRequestError } from '../utils/errors';

const subscriptionService = new SubscriptionService();

export const subscribe = async (req: Request, res: Response): Promise<void> => {
    try {
        const subscriptionData = new SubscriptionDTO();
        Object.assign(subscriptionData, req.body);

        await validateOrReject(subscriptionData);

        const token = await subscriptionService.subscribe(subscriptionData);

        res.status(200).json({
            message: 'Subscription successful. Confirmation email sent.',
            token,
        });
    } catch (error) {
        if (error instanceof BadRequestError) {
            res.status(409).json({ error: error.message });
            return;
        }
        if (Array.isArray(error)) {
            res.status(400).json({ error: 'Invalid input data' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
