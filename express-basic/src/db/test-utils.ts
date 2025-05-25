import fs from "node:fs";
import path from "node:path";
import { db } from "@db/index.ts";
import { logger } from "@logger/index.ts";

const schemaPath = path.resolve(process.cwd(), "scripts", "setup.sql");

export const resetDb = async (): Promise<void> => {
	const schema = fs.readFileSync(schemaPath, "utf-8");
	await db.run("PRAGMA foreign_keys = OFF;"); // Optional: clear dependencies
	await db.run("DROP TABLE IF EXISTS users;"); // Extend if you add more
	await db.run(schema);
	logger.info("[test-utils] Database reset complete.");
};
