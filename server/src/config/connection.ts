import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or DB_URL environment variable is required');
}

const isProduction =
  process.env.NODE_ENV === 'production' ||
  process.env.RENDER === 'true';

const useSSL =
  isProduction ||
  String(process.env.DB_SSL || '').toLowerCase() === 'true';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined,
});

export default sequelize;