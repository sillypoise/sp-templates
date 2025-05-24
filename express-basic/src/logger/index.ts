import { config } from "@config/index.js";
import type morgan from "morgan";
import winston from "winston";

const { combine, timestamp, errors, json, printf } = winston.format;

// Envs where we want pretty-printed JSON (not flat)
const isPretty = ["development", "staging", "preview"].includes(config.stage);

// Custom formatter to pretty-print JSON in dev-like envs
const prettyJson = printf((info) => {
	// Merge stack into message if it's an error
	if (info instanceof Error) {
		info.message = info.stack || info.message;
	}

	return JSON.stringify(info, null, 2); // indent 2 spaces
});

const logger = winston.createLogger({
	level: config.log_level,
	levels: winston.config.npm.levels, // includes 'http' by default
	format: isPretty
		? combine(timestamp(), errors({ stack: true }), prettyJson)
		: combine(timestamp(), errors({ stack: true }), json()),
	transports: [new winston.transports.Console()],
});

// Stream interface for morgan to pipe logs into winston
export const morganStream: morgan.StreamOptions = {
	write: (message: string) => {
		// Remove trailing newline, since morgan adds it
		logger.http?.(message.trim());
	},
};

export { logger };
