import path from "node:path";
import fs from "node:fs";

import { envToNumber, envToStr } from "@config/helpers";
import { configSchema } from "@config/schema";
import { stage } from "@config/stage";
import dotenv from "dotenv";
import type { z } from "zod";

// Always run with `op run --env-file=secrets/dev.env`
// but allow local override via secrets/local.env
const localEnvPath = path.resolve(process.cwd(), "secrets", "local.env");

// First, read from local.env as raw key-value pairs
if (stage !== "production" && fs.existsSync(localEnvPath)) {
	const localOverrides = dotenv.parse(fs.readFileSync(localEnvPath));
	const overridden: Record<string, string> = {};

	for (const [key, value] of Object.entries(localOverrides)) {
		process.env[key] = value;
		overridden[key] = value;
	}

	if (stage === "development") {
		console.log("🔁 Overridden environment variables from secrets/local.env:");
		console.table(overridden);
	}
}

export type AppConfigInput = z.input<typeof configSchema>;
export type AppConfig = z.infer<typeof configSchema>;

const logLevelsByStage = {
	production: "info",
	staging: "debug",
	development: "debug",
	preview: "debug",
	ci: "warn",
	qa: "debug",
} as const;

const inputConfig: AppConfigInput = {
	api_version: envToStr(process.env.API_VERSION),
	stage,
	port: envToNumber(process.env.PORT),
	db_url: envToStr(process.env.DB_URL),
	db_path: envToStr(process.env.DB_PATH),
	db_schema_path: envToStr(process.env.DB_SCHEMA_PATH),
	log_level: logLevelsByStage[stage],
};

export const config: AppConfig = configSchema.parse(inputConfig);
