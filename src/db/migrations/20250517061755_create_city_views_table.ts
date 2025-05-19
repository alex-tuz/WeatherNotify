import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('city_views', (table) => {
        table.increments('id').primary();
        table
            .integer('city_id')
            .notNullable()
            .references('id')
            .inTable('cities')
            .onDelete('CASCADE');
        table.string('view_name', 100).notNullable();
        table.unique(['city_id', 'view_name']);
    });

    await knex.raw(`
    CREATE OR REPLACE FUNCTION generate_city_views()
    RETURNS TRIGGER AS $$
    BEGIN
      -- Удаляем старые views для города если это UPDATE
      IF TG_OP = 'UPDATE' THEN
        DELETE FROM city_views WHERE city_id = NEW.id;
      END IF;

      -- Добавляем view с форматом "Город, Код_страны"
      INSERT INTO city_views (city_id, view_name)
      SELECT 
        NEW.id,
        NEW.name || ', ' || countries.iso_code
      FROM cities
      JOIN countries ON cities.country_id = countries.id
      WHERE cities.id = NEW.id;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

    await knex.raw(`
    CREATE TRIGGER city_views_trigger
    AFTER INSERT OR UPDATE ON cities
    FOR EACH ROW
    EXECUTE FUNCTION generate_city_views();
  `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TRIGGER IF EXISTS city_views_trigger ON cities');
    await knex.raw('DROP FUNCTION IF EXISTS generate_city_views');
    await knex.schema.dropTable('city_views');
}
