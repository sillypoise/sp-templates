import app from './app';
import { logger } from '@logger';
import http from 'http';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  logger.info('🧼 Shutting down server...');
  server.close(() => {
    logger.info('✅ Server closed cleanly.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // e.g. Docker stop

