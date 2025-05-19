import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('cities', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('country_id').notNullable().references('id').inTable('countries');
        table.unique(['name', 'country_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('cities');
}
