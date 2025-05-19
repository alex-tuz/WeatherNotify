import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('weather', (table) => {
        table.increments('id').primary();
        table.integer('city_id').unsigned().notNullable();
        table.timestamp('forecast_for').notNullable();
        table.timestamp('forecast_generated_at').notNullable();
        table.decimal('temperature_celsius', 5, 2);
        table.decimal('humidity_percent', 5, 2);
        table.string('description', 255);
        table.foreign('city_id').references('cities.id').onDelete('CASCADE');
        table.unique(['city_id', 'forecast_for']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('weather');
}
