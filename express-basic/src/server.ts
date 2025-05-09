import http from "node:http";
import app from "@app";
import { config } from "@config";
import db from "@db";
import { logger } from "@logger";

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(
    `🚀 Server starting in ${config.stage} mode on port ${config.port}`,
  );
});

// 🔧 Graceful shutdown
const shutdown = (signal: string): void => {
  logger.info(`🧼 Received ${signal}. Initiating graceful shutdown...`);

  server.close(() => {
    logger.info("✅ HTTP server closed.");

    try {
      db.close(); // important for file-backed SQLite
      logger.info("✅ SQLite database connection closed.");
    } catch (err) {
      logger.error("❌ Error closing SQLite DB:", err);
    }

    // Add cleanup for background jobs, etc., if needed

    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
