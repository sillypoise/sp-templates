import dotenv from "dotenv";
import { configSchema } from "@config/schema";
import { envToStr, envToNumber } from "@config/helpers";
import { stage } from "@config/stage";

dotenv.config();

export const config = configSchema.parse({
	stage,
	port: envToNumber(process.env.PORT),
	db_path: envToStr(process.env.DB_PATH),
	db_schema_path: envToStr(process.env.DB_PATH),
});
