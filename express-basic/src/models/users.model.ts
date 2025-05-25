import { db } from "@db/index.ts";
import { users } from "@db/schema.ts";
import type { NewUser, User } from "@db/types.ts";
import { desc } from "drizzle-orm";

/**
 * Model
 * Responsibility: Directly interacts with the database.
 * Returns: Always asynchronous, since database operations are async.
 */

export const getAllUsers = async (): Promise<User[]> => {
	const result = await db.select().from(users).orderBy(desc(users.created_at));
	return result;
};

export const createUser = async (
	data: Pick<NewUser, "name" | "email">,
): Promise<User> => {
	const insertResult = await db.insert(users).values(data).returning();
	return insertResult[0];
};
