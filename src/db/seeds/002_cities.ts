import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { CityDTO } from '../../interfaces/City';

export async function seed(knex: Knex): Promise<CityDTO[]> {
    await knex('cities').del();

    const countries = await knex('countries').select(['id', 'name']);

    const cities: CityDTO[] = [];
    for (const country of countries) {
        for (let i = 0; i < 2; i++) {
            cities.push({
                name: faker.location.city(),
                country_id: country.id,
            });
        }
    }

    const insertedCities = await knex('cities')
        .insert(cities)
        .onConflict(['name', 'country_id'])
        .merge()
        .returning('*');

    return insertedCities;
}
