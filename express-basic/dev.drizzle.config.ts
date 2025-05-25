import { config } from "./src/config/index";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: config.db_schema_path,
	dialect: "sqlite",
	dbCredentials: {
		url: config.db_url,
	},
});
