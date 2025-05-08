import fs from "node:fs";
import { config } from "@config";
import { logger } from "@logger";
import Database from "better-sqlite3";

const { DB_PATH, SCHEMA_PATH } = config;

// Create or open the SQLite database
const db = new Database(DB_PATH);

// Optionally run schema setup
export const initDb = (): void => {
	if (!fs.existsSync(DB_PATH)) {
		logger.info("🆕 Creating new SQLite database...");
	}

	const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
	db.exec(schema);

	logger.info("✅ SQLite database initialized");
};

export default db;
