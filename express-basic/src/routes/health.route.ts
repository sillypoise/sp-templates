import { getHealth } from "@controllers/health.controller.ts";
import { Router } from "express";

const router = Router();

router.get("/", getHealth);

export default router;
