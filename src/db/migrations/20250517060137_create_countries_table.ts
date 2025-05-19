import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('countries', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('iso_code', 2).unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('countries');
}
