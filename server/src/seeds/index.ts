import { sequelize } from '../models/index.js';
import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';

async function seedAll() {
  try {
    await seedUsers();
    await seedTickets();

    console.log('✅ Database seeding complete.');
  } catch (err) {
    console.error('❌ Database seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

await seedAll();