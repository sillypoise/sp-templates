import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '@logger';

const DB_PATH = path.resolve(process.cwd(), 'sqlite.db');
const SCHEMA_PATH = path.resolve(process.cwd(), 'scripts', 'setup.sql');

// Create or open the SQLite database
const db = new Database(DB_PATH);

// Optionally run schema setup
export const initDb = () => {
  if (!fs.existsSync(DB_PATH)) {
    logger.info('🆕 Creating new SQLite database...');
  }

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  db.exec(schema);

  logger.info('✅ SQLite database initialized');
};

export default db;
