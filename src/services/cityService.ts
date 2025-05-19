import { ICityRepository } from '../repositories/ICityRepository';

export class CityService {
    constructor(private readonly cityRepository: ICityRepository) {}

    async searchCities(query: string): Promise<string[]> {
        if (!query || typeof query !== 'string') {
            throw new Error('Search query is required');
        }

        const cities = await this.cityRepository.searchCities(query);
        return cities.map((city) => `${city.name}`);
    }
}
