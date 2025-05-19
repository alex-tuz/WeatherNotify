import { Knex } from 'knex';
import { CountryDTO } from '../../interfaces/Country';

export async function seed(knex: Knex): Promise<{ id: number; name: string }[]> {
    await knex('weather').del();
    await knex('cities').del();
    await knex('countries').del();

    const countries: CountryDTO[] = [
        { name: 'Canada', iso_code: 'CA' },
        { name: 'United Kingdom', iso_code: 'GB' },
        { name: 'United States', iso_code: 'US' },
        { name: 'Australia', iso_code: 'AU' },
        { name: 'Germany', iso_code: 'DE' },
    ];

    const insertedCountries = await knex('countries')
        .insert(countries)
        .onConflict('iso_code')
        .merge()
        .returning(['id', 'name']);

    return insertedCountries;
}
