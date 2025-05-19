import { AppError } from '../middleware/error-handler';

const requiredEnvVars = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'APP_URL',
] as const;

export const validateConfig = (): void => {
    const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingVars.length > 0) {
        throw new AppError(
            500,
            `Missing required environment variables: ${missingVars.join(', ')}`
        );
    }

    const smtpPort = parseInt(process.env.SMTP_PORT || '', 10);
    if (isNaN(smtpPort)) {
        throw new AppError(500, 'SMTP_PORT must be a valid number');
    }
};
