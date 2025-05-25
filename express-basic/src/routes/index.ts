import { Router } from "express";
import healthRouter from "./health.route.ts";
import usersRouter from "./users.route.ts";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", usersRouter);

export default router;
