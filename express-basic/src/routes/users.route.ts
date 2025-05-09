import {
	handleCreateUser,
	handleGetUsers,
} from "@controllers/users.controller";
import { Router } from "express";

const router = Router();

router.get("/", handleGetUsers);
router.post("/", handleCreateUser);

export default router;
