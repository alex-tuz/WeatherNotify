import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

console.log('DB_USER:', process.env.DB_USER);

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
    directory: path.join(__dirname, '../migrations'),
    extension: 'ts',
  },
  seeds: {
    directory: path.join(__dirname, '../seeds'),
    extension: 'ts',
  },
  debug: true,
};

export default config;
