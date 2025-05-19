import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum SubscriptionFrequency {
    HOURLY = 'hourly',
    DAILY = 'daily',
}

export class SubscriptionDTO {
    @IsEmail()
    email: string;

    @IsString()
    city: string;

    @IsEnum(SubscriptionFrequency)
    frequency: SubscriptionFrequency;
}
