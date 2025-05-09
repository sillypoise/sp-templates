import fs from "node:fs";
import { config } from "@config/index";
import { logger } from "@logger";
import Database from "better-sqlite3";

const { db_path, db_schema_path } = config;

// Create or open the SQLite database
const db = new Database(db_path);

// Optionally run schema setup
export const initDb = (): void => {
  if (!fs.existsSync(db_path)) {
    logger.info("🆕 Creating new SQLite database...");
  }

  const schema = fs.readFileSync(db_schema_path, "utf-8");
  db.exec(schema);

  logger.info("✅ SQLite database initialized");
};

export default db;
