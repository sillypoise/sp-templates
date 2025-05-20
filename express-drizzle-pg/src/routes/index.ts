import { Router } from "express";
import healthRouter from "./health.route";
import usersRouter from "./users.route";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", usersRouter);

export default router;
