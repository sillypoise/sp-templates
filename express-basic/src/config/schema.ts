import { z } from "zod";
import path from "node:path";

export const configSchema = z.object({
	stage: z.enum(["production", "staging", "development", "test"]),
	port: z.coerce.number().default(8080),
	db_path: z.string().default(path.resolve(process.cwd(), "sqlite.db")),
	db_schema_path: z
		.string()
		.default(path.resolve(process.cwd(), "scripts", "setup.sql")),
});
