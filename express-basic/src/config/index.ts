import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce.number().default(8080),
	DB_PATH: z.string().default(path.resolve(process.cwd(), "sqlite.db")),
	SCHEMA_PATH: z
		.string()
		.default(path.resolve(process.cwd(), "scripts", "setup.sql")),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error("❌ Invalid environment variables:", env.error.format());
	process.exit(1);
}

export const config = env.data;
