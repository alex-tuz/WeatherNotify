import { SubscriptionDTO } from '../interfaces/SubscriptionDTO';
import { subscriptionRepository } from '../repositories/subscriptionRepository';
import { weatherRepository } from '../repositories/weatherRepository';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { EmailService } from './emailService';

const emailService = new EmailService();

export class SubscriptionService {
    async subscribe(data: SubscriptionDTO): Promise<string> {
        const city = await weatherRepository.findCityByName(data.city);
        if (!city) {
            throw new BadRequestError('City not found');
        }

        const existingSubscription = await subscriptionRepository.findSubscriptionByEmail(
            data.email,
            city.id
        );
        if (existingSubscription) {
            throw new BadRequestError('Email already subscribed for this city');
        }

        const trx = await subscriptionRepository.startTransaction();

        try {
            const token = await subscriptionRepository.createSubscription(
                data.email,
                city.id,
                data.frequency,
                trx
            );

            await emailService.sendConfirmationEmail(data.email, token);

            await trx.commit();
            return token;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    async confirm(token: string): Promise<void> {
        const subscription = await subscriptionRepository.findSubscriptionByToken(token);
        if (!subscription) {
            throw new NotFoundError('Token not found');
        }

        if (subscription.confirmed) {
            throw new BadRequestError('Subscription is already confirmed');
        }

        const confirmed = await subscriptionRepository.confirmSubscription(token);
        if (!confirmed) {
            throw new BadRequestError('Invalid token');
        }
    }

    async unsubscribe(token: string): Promise<void> {
        const subscription = await subscriptionRepository.findSubscriptionByToken(token);
        if (!subscription) {
            throw new BadRequestError('Subscription is already unsubscribed or does not exist');
        }

        const deleted = await subscriptionRepository.deleteSubscription(token);
        if (!deleted) {
            throw new BadRequestError('Invalid token');
        }
    }
}
