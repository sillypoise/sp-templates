import dotenv from "dotenv";
import { configSchema } from "@config/schema";
import { envToStr, envToNumber } from "@config/helpers";
import { stage } from "@config/stage";
import path from "node:path";

dotenv.config();

export const config = configSchema.parse({
	stage,
	port: envToNumber(process.env.PORT, 8080),
	db_path: envToStr(
		process.env.DB_PATH,
		path.resolve(process.cwd(), "sqlite.db"),
	),
	db_schema_path: envToStr(
		process.env.DB_PATH,
		path.resolve(process.cwd(), "scripts", "setup.sql"),
	),
});
