// src/scripts/patch-ticket-table.ts
import sequelize from '../config/connection.js';

async function run() {
  await sequelize.authenticate();
  console.log('Database connection verified.');
}

run().catch((err: unknown) => {
  console.error('Database check failed:', err);
  process.exit(1);
});