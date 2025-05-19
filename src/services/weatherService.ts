import { IWeatherRepository } from '../repositories/IWeatherRepository';

export class WeatherService {
    constructor(private repo: IWeatherRepository) {}

    async getWeatherForCity(name: string) {
        const city = await this.repo.findCityByName(name);
        if (!city) throw new Error('CityNotFound');

        const weather = await this.repo.getLatestWeatherForCity(city.id);
        if (!weather) throw new Error('WeatherNotFound');

        return weather;
    }
}
