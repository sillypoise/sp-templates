import { logger } from "@logger/index.js";
import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	logger.error(`Unhandled error: ${err.message}`);
	res.status(500).json({
		error: "Internal Server Error",
		message: err.message,
	});
};
