import cron from 'node-cron';
import { EmailService } from './emailService';
import { subscriptionRepository } from '../repositories/subscriptionRepository';
import { weatherRepository } from '../repositories/weatherRepository';
import logger from '../utils/logger';

const emailService = new EmailService();

export class WeatherNotificationService {
    private async sendNotifications(frequency: 'hourly' | 'daily'): Promise<void> {
        logger.info(`Starting ${frequency} notifications sending...`);

        try {
            const subscriptions = await subscriptionRepository.getConfirmedSubscriptions(frequency);
            logger.info(`Found ${subscriptions.length} ${frequency} subscriptions`);

            for (const subscription of subscriptions) {
                try {
                    const weather = await weatherRepository.getLatestWeatherForCity(
                        subscription.cityId
                    );
                    if (weather) {
                        await emailService.sendWeatherUpdate(
                            subscription.email,
                            subscription.cityName,
                            weather,
                            subscription.token
                        );
                        logger.info(
                            `Weather update sent to ${subscription.email} for ${subscription.cityName}`
                        );
                    }
                } catch (error) {
                    logger.error(`Failed to send weather update to ${subscription.email}:`, error);
                }
            }
        } catch (error) {
            logger.error(`Failed to process ${frequency} notifications:`, error);
        }
    }

    startScheduler(): void {
        try {
            // Every hour at minute 0
            const hourlyJob = cron.schedule(
                '0 * * * *',
                () => {
                    logger.info('Running hourly weather notifications...');
                    this.sendNotifications('hourly').catch((error) => {
                        logger.error('Failed to run hourly notifications:', error);
                    });
                },
                {
                    timezone: 'Europe/Kiev',
                }
            );

            // Every day at 8:00
            const dailyJob = cron.schedule(
                '0 8 * * *',
                () => {
                    logger.info('Running daily weather notifications...');
                    this.sendNotifications('daily').catch((error) => {
                        logger.error('Failed to run daily notifications:', error);
                    });
                },
                {
                    timezone: 'Europe/Kiev',
                }
            );

            logger.info('Weather notification scheduler started successfully');

            process.on('SIGTERM', () => {
                logger.info('Stopping weather notification scheduler...');
                hourlyJob.stop();
                dailyJob.stop();
            });
        } catch (error) {
            logger.error('Failed to start weather notification scheduler:', error);
            throw error;
        }
    }
}
