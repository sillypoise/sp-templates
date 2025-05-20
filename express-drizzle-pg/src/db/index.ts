import fs from "node:fs";
import { config } from "@config/index";
import { logger } from "@logger";
import { drizzle } from "drizzle-orm/node-postgres";

// const { db_path, db_schema_path } = config;

// Create or open the postgresql database
// You can specify any property from the node-postgres connection options
const db = drizzle({
	connection: {
		connectionString: config.db_url,
		ssl: true,
	},
});

// Optionally run schema setup
// export const initDb = (): void => {
// 	if (!fs.existsSync(db_path)) {
// 		logger.info("🆕 Creating new SQLite database...");
// 	}
//
// 	const schema = fs.readFileSync(db_schema_path, "utf-8");
// 	db.exec(schema);
//
// 	logger.info("✅ SQLite database initialized");
// };

export default db;
