import express, { type Express } from "express";

import { logger } from "@logger/index.ts";
import { errorHandler } from "@middlewares/error-handler.ts";
import { applyMiddleware } from "@middlewares/loader.ts";
import { mountRoutes } from "@routes/loader.ts";

const app: Express = express();

app.set("trust proxy", true); // ✅ for accurate IPs & secure cookies
applyMiddleware(app);
logger.info("[middleware] loaded stack.");
mountRoutes(app);
logger.info("[routes] mounted routes.");
app.use(errorHandler); // ✅ still manual and last  TODO: make this programmatic.

export default app;
