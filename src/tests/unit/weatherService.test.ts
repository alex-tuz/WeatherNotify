import { WeatherService } from '../../services/weatherService';
import { weatherRepository } from '../../repositories/weatherRepository';

jest.mock('../../repositories/weatherRepository');

describe('WeatherService', () => {
    let weatherService: WeatherService;
    let mockWeatherRepository: jest.Mocked<typeof weatherRepository>;

    beforeEach(() => {
        mockWeatherRepository = weatherRepository as jest.Mocked<typeof weatherRepository>;
        weatherService = new WeatherService(mockWeatherRepository);
    });

    describe('getWeatherForCity', () => {
        it('should return weather data for a valid city', async () => {
            const mockCity = {
                id: 1,
                name: 'Kyiv',
            };

            const mockWeather = {
                temperature: 20,
                humidity: 60,
                description: 'Sunny',
            };

            mockWeatherRepository.findCityByName.mockResolvedValue(mockCity);
            mockWeatherRepository.getLatestWeatherForCity.mockResolvedValue(mockWeather);

            const result = await weatherService.getWeatherForCity('Kyiv');
            expect(result).toEqual(mockWeather);
            expect(mockWeatherRepository.findCityByName).toHaveBeenCalledWith('Kyiv');
            expect(mockWeatherRepository.getLatestWeatherForCity).toHaveBeenCalledWith(1);
        });

        it('should throw error when city not found', async () => {
            mockWeatherRepository.findCityByName.mockResolvedValue(null);

            await expect(weatherService.getWeatherForCity('Unknown')).rejects.toThrow(
                'CityNotFound'
            );
        });

        it('should throw error when weather data not found', async () => {
            const mockCity = {
                id: 1,
                name: 'Kyiv',
            };

            mockWeatherRepository.findCityByName.mockResolvedValue(mockCity);
            mockWeatherRepository.getLatestWeatherForCity.mockResolvedValue(null);

            await expect(weatherService.getWeatherForCity('Kyiv')).rejects.toThrow(
                'WeatherNotFound'
            );
        });
    });
});
