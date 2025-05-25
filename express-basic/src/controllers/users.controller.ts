import { userCreateSchema } from "@schemas/users.schema.ts";
import { createUser, getUsers } from "@services/users.service.ts";
import type { Request, RequestHandler, Response } from "express";

export const handleGetUsers = (
	_req: Request,
	res: Response,
): void | Promise<void> => {
	const users = getUsers();
	res.status(200).json(users);
};

export const handleCreateUser: RequestHandler = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const parseResult = userCreateSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({
			error: "Invalid request body",
			details: parseResult.error.flatten(),
		});
		return;
	}

	const user = await createUser(parseResult.data); // ✅ Await the async service
	res.status(201).json(user);
};
