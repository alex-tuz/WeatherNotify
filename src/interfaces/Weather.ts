export interface Weather {
    id: number;
    city_id: number;
    forecast_for: Date;
    forecast_generated_at: Date;
    temperature_celsius: number;
    humidity_percent: number;
    description: string;
}

export interface WeatherDTO {
    city_id: number;
    forecast_for: Date;
    forecast_generated_at: Date;
    temperature_celsius: number;
    humidity_percent: number;
    description: string;
}

export interface WeatherResponse {
    temperature: number;
    humidity: number;
    description: string;
}
