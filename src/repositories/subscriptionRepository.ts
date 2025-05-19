import { ISubscriptionRepository } from './ISubscriptionRepository';
import { SubscriptionFrequency } from '../interfaces/SubscriptionDTO';
import { Subscription } from '../interfaces/Subscription';
import knex, { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import config from '../db/config/knexfile';

const db = knex(config);

export const subscriptionRepository: ISubscriptionRepository = {
    async createSubscription(
        email: string,
        cityId: number,
        frequency: SubscriptionFrequency,
        trx?: Knex.Transaction
    ): Promise<string> {
        const token = uuidv4();
        const dbInstance = trx || db;

        const [userId] = await dbInstance('users')
            .insert({ email })
            .onConflict('email')
            .merge()
            .returning('id');

        await dbInstance('subscriptions').insert({
            user_id: userId.id,
            city_id: cityId,
            frequency,
            token,
            confirmed: false,
        });

        return token;
    },

    async startTransaction(): Promise<Knex.Transaction> {
        return await db.transaction();
    },

    async findSubscriptionByEmail(email: string, cityId: number): Promise<boolean> {
        const subscription = await db('subscriptions')
            .join('users', 'users.id', 'subscriptions.user_id')
            .where('users.email', email)
            .andWhere('subscriptions.city_id', cityId)
            .first();

        return !!subscription;
    },

    async confirmSubscription(token: string): Promise<boolean> {
        const updated = await db('subscriptions').where({ token }).update({ confirmed: true });

        return updated > 0;
    },

    async findSubscriptionByToken(token: string): Promise<Subscription | null> {
        const subscription = await db('subscriptions')
            .join('users', 'users.id', 'subscriptions.user_id')
            .where('subscriptions.token', token)
            .select('users.email', 'subscriptions.city_id as cityId', 'subscriptions.confirmed')
            .first();

        return subscription || null;
    },

    async deleteSubscription(token: string): Promise<boolean> {
        const deleted = await db('subscriptions').where({ token }).delete();

        return deleted > 0;
    },

    async getConfirmedSubscriptions(frequency: 'hourly' | 'daily'): Promise<
        Array<{
            email: string;
            cityName: string;
            cityId: number;
            token: string;
        }>
    > {
        return db('subscriptions')
            .join('users', 'users.id', 'subscriptions.user_id')
            .join('cities', 'cities.id', 'subscriptions.city_id')
            .where({
                'subscriptions.frequency': frequency,
                'subscriptions.confirmed': true,
            })
            .select(
                'users.email',
                'cities.name as cityName',
                'cities.id as cityId',
                'subscriptions.token'
            );
    },
};
