import { config } from "@config/index.ts";
import { drizzle } from "drizzle-orm/libsql";

const { db_url } = config;

const db = drizzle({
	connection: {
		url: db_url,
		// authToken: process.env.DATABASE_AUTH_TOKEN,
	},
});

export { db };
