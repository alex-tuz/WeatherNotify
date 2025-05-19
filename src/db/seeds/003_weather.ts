import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { WeatherDTO } from '../../interfaces/Weather';

export async function seed(knex: Knex): Promise<WeatherDTO[]> {
    await knex('weather').del();

    const cities = await knex('cities').select('id');

    const weatherData: WeatherDTO[] = [];

    const forecastDays = 30;
    const today = new Date();

    for (const city of cities) {
        for (let i = 0; i < forecastDays; i++) {
            const forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + i);

            weatherData.push({
                city_id: city.id,
                forecast_for: forecastDate,
                forecast_generated_at: today,
                temperature_celsius: Number(
                    faker.number.float({ min: -30, max: 40, fractionDigits: 2 })
                ),
                humidity_percent: faker.number.int({ min: 0, max: 100 }),
                description: faker.helpers.arrayElement([
                    'Clear sky',
                    'Few clouds',
                    'Scattered clouds',
                    'Broken clouds',
                    'Shower rain',
                    'Rain',
                    'Thunderstorm',
                    'Snow',
                    'Mist',
                ]),
            });
        }
    }

    const insertedWeather = await knex('weather').insert(weatherData).returning('*');

    return insertedWeather;
}
