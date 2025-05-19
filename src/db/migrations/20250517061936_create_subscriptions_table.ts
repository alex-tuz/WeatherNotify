import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('subscriptions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('city_id').unsigned().notNullable();
        table.string('frequency', 10).checkIn(['hourly', 'daily']).notNullable();
        table.boolean('confirmed').defaultTo(false).notNullable();
        table.string('token', 255).unique().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.foreign('city_id').references('cities.id').onDelete('CASCADE');
        table.unique(['user_id', 'city_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('subscriptions');
}
