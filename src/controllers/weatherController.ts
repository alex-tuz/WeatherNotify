import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/weatherService';
import { weatherRepository } from '../repositories/weatherRepository';

const weatherService = new WeatherService(weatherRepository);

export const getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cityName = req.query.city;

        if (!cityName || typeof cityName !== 'string') {
            res.status(400).json({ error: 'City parameter is required' });
            return;
        }

        const result = await weatherService.getWeatherForCity(cityName);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'CityNotFound') {
            res.status(404).json({ error: 'City not found' });
        } else if (error.message === 'WeatherNotFound') {
            res.status(404).json({ error: 'Weather data not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    } finally {
        next();
    }
};
