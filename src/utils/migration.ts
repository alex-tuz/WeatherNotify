import knex from 'knex';
import config from '../db/config/knexfile';
import logger from './logger';

const waitForDatabase = async (db: knex.Knex, retries = 5, delay = 2000): Promise<void> => {
    for (let i = 0; i < retries; i++) {
        try {
            logger.info(`Attempting to connect to database (attempt ${i + 1}/${retries})...`);
            await db.raw('SELECT 1');
            logger.info('Successfully connected to database');
            return;
        } catch (error) {
            if (i === retries - 1) {
                throw new Error('Failed to connect to database after multiple attempts');
            }
            logger.warn(`Failed to connect to database, retrying in ${delay}ms...`, error);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};

const initMigrationTables = async (db: knex.Knex): Promise<void> => {
    try {
        const hasMigrationsTable = await db.schema.hasTable('knex_migrations');
        if (!hasMigrationsTable) {
            logger.info('Creating knex_migrations table...');
            await db.schema.createTable('knex_migrations', (table) => {
                table.increments();
                table.string('name');
                table.integer('batch');
                table.timestamp('migration_time');
            });
            logger.info('knex_migrations table created successfully');
        }

        const hasLockTable = await db.schema.hasTable('knex_migrations_lock');
        if (!hasLockTable) {
            logger.info('Creating knex_migrations_lock table...');
            await db.schema.createTable('knex_migrations_lock', (table) => {
                table.integer('index').primary();
                table.integer('is_locked');
            });
            await db('knex_migrations_lock').insert({ index: 1, is_locked: 0 });
            logger.info('knex_migrations_lock table created successfully');
        }
    } catch (error) {
        logger.error('Failed to initialize migration tables:', error);
        throw error;
    }
};

export const runMigrations = async (): Promise<void> => {
    const db = knex(config);

    try {
        await waitForDatabase(db);
        logger.info('Initializing migration tables...');
        await initMigrationTables(db);
        logger.info('Running database migrations...');
        const [batchNo, log] = await db.migrate.latest();
        logger.info(`Batch ${batchNo} run: ${log.length} migrations`);
        logger.info('Database migrations completed successfully');

        const migrations = await db.migrate.list();
        if (migrations[1].length === 0) {
            logger.warn('No pending migrations found');
        } else {
            logger.info(`Pending migrations: ${migrations[1].join(', ')}`);
        }
    } catch (error) {
        logger.error('Failed to run database migrations:', error);
        throw error;
    } finally {
        await db.destroy();
    }
};
