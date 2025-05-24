import { userCreateSchema } from "@schemas/users.schema.js";
import { createUser, getUsers } from "@services/users.service.js";
import type { Request, RequestHandler, Response } from "express";

export const handleGetUsers = (
	_req: Request,
	res: Response,
): void | Promise<void> => {
	const users = getUsers();
	res.status(200).json(users);
};

export const handleCreateUser: RequestHandler = (
	req: Request,
	res: Response,
): void | Promise<void> => {
	const parseResult = userCreateSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({
			error: "Invalid request body",
			details: parseResult.error.flatten(),
		});
		return; // early return helps ts infer that data is defined after this branch
	}

	const user = createUser(parseResult.data);
	res.status(201).json(user);
	return; // always remember to return
};
