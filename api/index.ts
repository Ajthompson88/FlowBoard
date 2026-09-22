import 'dotenv/config';
import 'pg';
import app from '../server/src/app.js';
import { sequelize } from '../server/src/models/index.js';

let databaseReady = false;

async function ensureDatabaseConnection() {
  if (!databaseReady) {
    await sequelize.authenticate();
    databaseReady = true;
  }
}

export default async function handler(req: any, res: any) {
  try {
    await ensureDatabaseConnection();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);

    return res.status(500).json({
      error: 'Database connection failed',
    });
  }
}
