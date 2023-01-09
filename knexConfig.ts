import 'dotenv/config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  // debug: process.env.KNEX_DEBUG === 'true',
  // pool: {
  //   afterCreate: (conn, cb) => {
  //     conn.run('PRAGMA foreign_keys = ON', cb);
  //   },
  // },
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migrations/migration.stub',
  },
  seeds: {
    directory: './src/database/seeds',
    stub: './src/database/seeds/seed.stub',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
