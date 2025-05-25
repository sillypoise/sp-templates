import http from "node:http";
import app from "@app";
import { config } from "@config/index.ts";
import { logger } from "@logger/index.ts";
import { registerShutdown, runShutdownTasks } from "@utils/shutdown.ts";

const server = http.createServer(app);

server.listen(config.port, () => {
	logger.info(
		`🚀 Server starting in ${config.stage} mode on port ${config.port}`,
	);
});

// ✅ Gracefully catch port conflict
server.on("error", (err: NodeJS.ErrnoException) => {
	if (err.code === "EADDRINUSE") {
		logger.error(`❌ Port ${config.port} is already in use.`);
	} else {
		logger.error("❌ Server error:", err);
	}

	process.exit(1); // always exit cleanly after logging
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
