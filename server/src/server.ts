import 'dotenv/config';
import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    if (String(process.env.DB_SYNC || '').toLowerCase() === 'true') {
      console.log('Syncing DB schema (DB_SYNC=true)…');
      await sequelize.sync();
    }

    app.listen(PORT, () => {
      console.log(`Server running on :${PORT}`);
    });
  } catch (err) {
    console.error('DB bootstrap failed:', err);
    process.exit(1);
  }
}

void startServer();