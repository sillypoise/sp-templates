import fs from "node:fs";
import path from "node:path";
import db from "@db";
import { logger } from "@logger";

const schemaPath = path.resolve(process.cwd(), "scripts", "setup.sql");

export const resetDb = (): void => {
	const schema = fs.readFileSync(schemaPath, "utf-8");
	db.exec("PRAGMA foreign_keys = OFF;"); // Optional: clear dependencies
	db.exec("DROP TABLE IF EXISTS users;"); // Extend if you add more
	db.exec(schema);
	logger.info("[test-utils] Database reset complete.");
};
