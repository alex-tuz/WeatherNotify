import knex from 'knex';
import { IWeatherRepository } from '../repositories/IWeatherRepository';
import { City } from '../interfaces/City';
import { WeatherResponse } from '../interfaces/Weather';

import config from '../db/config/knexfile';
const db = knex(config);

export const weatherRepository: IWeatherRepository = {
    async findCityByName(name: string): Promise<City | null> {
        const cityData = await db('cities')
            .select(['cities.id', 'cities.name', 'countries.iso_code'])
            .join('countries', 'cities.country_id', 'countries.id')
            .where('cities.name', '=', name)
            .first();

        if (!cityData) {
            return null;
        }

        return {
            id: cityData.id,
            name: cityData.name,
        };
    },

    async getLatestWeatherForCity(cityId: number): Promise<WeatherResponse | null> {
        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const weatherData = await db('weather')
            .where('city_id', cityId)
            .andWhere('forecast_for', '>=', startOfDay)
            .andWhere('forecast_for', '<=', endOfDay)
            .orderBy('forecast_for', 'desc')
            .first();

        if (!weatherData) {
            return null;
        }

        return {
            temperature: weatherData.temperature_celsius,
            humidity: weatherData.humidity_percent,
            description: weatherData.description,
        };
    },
};
