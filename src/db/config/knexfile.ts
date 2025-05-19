import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

const isTs = path.extname(__filename) === '.ts';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config: Knex.Config = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
    },
    migrations: {
        directory: path.resolve(__dirname, '../../db/migrations'),
        extension: isTs ? 'ts' : 'js',
        loadExtensions: [isTs ? '.ts' : '.js'],
    },
    seeds: {
        directory: path.resolve(__dirname, '../../db/seeds'),
        extension: isTs ? 'ts' : 'js',
        loadExtensions: [isTs ? '.ts' : '.js'],
    },
    debug: true,
};

export default config;
