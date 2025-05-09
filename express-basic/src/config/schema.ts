import path from "node:path";
import { z } from "zod";

export const apiVersions = ["v1", "v2"] as const;

export const configSchema = z.object({
	api_version: z.enum(apiVersions).default("v1"),
	stage: z.enum([
		"production",
		"staging",
		"development",
		"preview",
		"ci",
		"qa",
	]),
	port: z.coerce.number().default(8080),
	db_path: z.string().default(path.resolve(process.cwd(), "sqlite.db")),
	db_schema_path: z
		.string()
		.default(path.resolve(process.cwd(), "scripts", "setup.sql")),
	log_level: z.enum(["error", "warn", "info", "debug"]),
});
