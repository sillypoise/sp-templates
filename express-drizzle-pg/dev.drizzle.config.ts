import { config } from "./src/config/index";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: config.db_schema_path,
	dialect: "postgresql",
	dbCredentials: {
		url: config.db_url,
	},
});
