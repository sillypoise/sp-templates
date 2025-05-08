import db from '@db/index';
import { logger } from '@logger';

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export const getAllUsers = (): User[] => {
  const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC');
  const users = stmt.all() as User[];
  logger.info(`Fetched ${users.length} user(s)`);
  return users;
};

export const createUser = (data: { name: string; email: string }): User => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  const result = stmt.run(data.name, data.email);

  const getUser = db.prepare('SELECT * FROM users WHERE id = ?');
  return getUser.get(result.lastInsertRowid) as User;
};

