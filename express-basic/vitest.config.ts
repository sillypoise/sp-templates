import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
	},
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "./src/app.ts"),
			"@config": path.resolve(__dirname, "./src/config/index.ts"),
			"@config/*": path.resolve(__dirname, "./src/config"),
			"@db/*": path.resolve(__dirname, "./src/db"),
			"@server": path.resolve(__dirname, "./src/server.ts"),
			"@index": path.resolve(__dirname, "./src/index.ts"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@controllers": path.resolve(__dirname, "./src/controllers"),
			"@middlewares": path.resolve(__dirname, "./src/middlewares"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@models": path.resolve(__dirname, "./src/models"),
			"@logger": path.resolve(__dirname, "./src/logger/index.ts"),
			"@schemas": path.resolve(__dirname, "./src/schemas"),
		},
	},
});
