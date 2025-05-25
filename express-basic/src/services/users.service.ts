import type { User } from "@db/types.ts";
import { logger } from "@logger/index.ts";
import {
	createUser as createUserInDb,
	getAllUsers,
} from "@models/users.model.ts";

/**
 * Service
 * Responsibility: Business logic, orchestration, validation, conditional branching, error mapping, etc.
 * Responsibility: Orchestrates model layer, validation layer, logging, metrics,
 * queueing, caching, etc.
 * Returns: Always async. E.g. calls model(s) which is async.
 * external reqs.
 */

export const getUsers = (): Promise<User[]> => {
	return getAllUsers();
};

export const createUser = async (data: {
	name: string;
	email: string;
}): Promise<User> => {
	logger.info("Creating user");
	const user = await createUserInDb(data);
	// await jobQueue.enqueue('sendWelcomeEmail', { userId: user.id });
	// await auditLog("User created", { userId: user.id });
	return user;
};
