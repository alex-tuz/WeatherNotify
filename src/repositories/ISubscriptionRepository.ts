import { SubscriptionFrequency } from '../interfaces/SubscriptionDTO';
import { Subscription } from '../interfaces/Subscription';
import { Knex } from 'knex';

export interface ISubscriptionRepository {
    createSubscription(
        email: string,
        cityId: number,
        frequency: SubscriptionFrequency,
        trx?: Knex.Transaction
    ): Promise<string>;
    findSubscriptionByEmail(email: string, cityId: number): Promise<boolean>;
    confirmSubscription(token: string): Promise<boolean>;
    findSubscriptionByToken(token: string): Promise<Subscription | null>;
    deleteSubscription(token: string): Promise<boolean>;
    getConfirmedSubscriptions(frequency: 'hourly' | 'daily'): Promise<
        Array<{
            email: string;
            cityName: string;
            cityId: number;
            token: string;
        }>
    >;
    startTransaction(): Promise<Knex.Transaction>;
}
