import fs from "node:fs";
import { config } from "@config/index.js";
import { logger } from "@logger/index.js";
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const { db_path, db_schema_path } = config;

console.log("Running index.js from:", fileURLToPath(import.meta.url));

const require = createRequire(import.meta.url);
console.log("better-sqlite3 resolve path:", require.resolve("better-sqlite3"));
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

export { db };
