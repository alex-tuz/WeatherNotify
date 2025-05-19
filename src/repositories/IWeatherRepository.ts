import { City } from '../interfaces/City';
import { WeatherResponse } from '../interfaces/Weather';

export interface IWeatherRepository {
    findCityByName(name: string): Promise<City | null>;
    getLatestWeatherForCity(cityId: number): Promise<WeatherResponse | null>;
}
