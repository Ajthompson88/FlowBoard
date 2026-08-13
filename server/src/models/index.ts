import createUserModel from './user.js';
import createTicketModel from './ticket.js';
import sequelize from '../config/connection.js';

export const User = createUserModel(sequelize);
export const Ticket = createTicketModel(sequelize);

User.hasMany(Ticket, {
  foreignKey: 'userId',
  as: 'tickets',
});

Ticket.belongsTo(User, {
  foreignKey: 'userId',
  as: 'owner',
});

export { sequelize };

export type { TicketStatus } from './ticket.js';