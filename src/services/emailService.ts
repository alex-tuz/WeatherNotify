import nodemailer from 'nodemailer';
import { emailConfig } from '../config/email';

const transporter = nodemailer.createTransport(emailConfig);

export class EmailService {
    private getConfirmationEmailTemplate(token: string): { subject: string; html: string } {
        const confirmUrl = `${process.env.APP_URL}/api/confirm/${token}`;

        return {
            subject: 'Confirm your weather subscription',
            html: `
                <h2>Welcome to WeatherNotify!</h2>
                <p>Thank you for subscribing to weather updates. To start receiving weather forecasts, please confirm your subscription by clicking the link below:</p>
                <p><a href="${confirmUrl}">Confirm Subscription</a></p>
                <p>If you didn't request this subscription, you can ignore this email.</p>
                <p>Best regards,<br>WeatherNotify Team</p>
            `,
        };
    }

    private getWeatherUpdateTemplate(
        cityName: string,
        weatherInfo: { temperature: number; humidity: number; description: string },
        unsubscribeToken: string
    ): { subject: string; html: string } {
        const unsubscribeUrl = `${process.env.APP_URL}/api/unsubscribe/${unsubscribeToken}`;

        return {
            subject: `Weather Update for ${cityName}`,
            html: `
                <h2>Weather Update for ${cityName}</h2>
                <div style="margin: 20px 0;">
                    <p>Current weather conditions:</p>
                    <ul>
                        <li>Temperature: ${weatherInfo.temperature}°C</li>
                        <li>Humidity: ${weatherInfo.humidity}%</li>
                        <li>Conditions: ${weatherInfo.description}</li>
                    </ul>
                </div>
                <p>To unsubscribe from these updates, <a href="${unsubscribeUrl}">click here</a></p>
                <p>Best regards,<br>WeatherNotify Team</p>
            `,
        };
    }

    async sendConfirmationEmail(email: string, token: string): Promise<void> {
        const { subject, html } = this.getConfirmationEmailTemplate(token);

        await transporter.sendMail({
            from: emailConfig.from,
            to: email,
            subject,
            html,
        });
    }

    async sendWeatherUpdate(
        email: string,
        cityName: string,
        weatherInfo: { temperature: number; humidity: number; description: string },
        unsubscribeToken: string
    ): Promise<void> {
        const { subject, html } = this.getWeatherUpdateTemplate(
            cityName,
            weatherInfo,
            unsubscribeToken
        );

        await transporter.sendMail({
            from: emailConfig.from,
            to: email,
            subject,
            html,
        });
    }
}
