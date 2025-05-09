import http from "node:http";
import app from "@app";
import { config } from "@config";
import db from "@db";
import { logger } from "@logger";
import { registerShutdown, runShutdownTasks } from "@utils/shutdown";

const server = http.createServer(app);

server.listen(config.port, () => {
	logger.info(
		`🚀 Server starting in ${config.stage} mode on port ${config.port}`,
	);
});

// ✅ Register shutdown steps
registerShutdown(() => {
	logger.info("🧼 Closing HTTP server...");
	return new Promise<void>((resolve) => {
		server.close(() => {
			logger.info("✅ HTTP server closed.");
			resolve();
		});
	});
});

// Easily extend and shutdown more internal modules
// registerShutdown(() => queue.stop());

registerShutdown(() => {
	logger.info("🧼 Closing SQLite DB...");
	db.close();
	logger.info("✅ SQLite DB closed.");
});

// ✅ Signal handler
const shutdown = async (signal: string): Promise<never> => {
	logger.info(`📴 Received ${signal}. Shutting down...`);
	await runShutdownTasks();
	process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
