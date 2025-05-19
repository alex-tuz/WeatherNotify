import knex from 'knex';
import { ICityRepository, CitySearchResult } from './ICityRepository';
import config from '../db/config/knexfile';

const db = knex(config);

export const cityRepository: ICityRepository = {
    async searchCities(query: string): Promise<CitySearchResult[]> {
        return db('cities')
            .select(['cities.name', 'countries.name as country'])
            .join('countries', 'cities.country_id', 'countries.id')
            .where('cities.name', 'ilike', `%${query}%`)
            .limit(10);
    },
};
