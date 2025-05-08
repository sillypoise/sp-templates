import http from "node:http";
import app from "@app";
import { config } from "@config";
import { logger } from "@logger";

const { port } = config;

const server = http.createServer(app);

server.listen(port, () => {
	logger.info(
		`🚀 Server starting in ${config.stage} mode on port ${config.port}`,
	);
});

// Graceful shutdown
const shutdown = (): void => {
	logger.info("🧼 Shutting down server...");
	server.close(() => {
		logger.info("✅ Server closed cleanly.");
		process.exit(0);
	});
};

process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // e.g. Docker stop
