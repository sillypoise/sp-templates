import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	outDir: "dist",
	dts: false, // 👈 disables declaration file output
	sourcemap: true,
	clean: true,
	splitting: false,
	tsconfig: "./tsconfig.json",
	external: ["better-sqlite3"], // 👈 exclude native module from bundling
});
