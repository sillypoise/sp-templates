import { envToNumber, envToStr } from "@config/helpers";
import { configSchema } from "@config/schema";
import { stage } from "@config/stage";
import dotenv from "dotenv";
import type { z } from "zod";

dotenv.config();

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
	db_path: envToStr(process.env.DB_PATH),
	db_schema_path: envToStr(process.env.DB_SCHEMA_PATH),
	log_level: logLevelsByStage[stage],
};

export const config: AppConfig = configSchema.parse(inputConfig);
