import express, { type Express } from "express";

import { logger } from "@logger";
import { errorHandler } from "@middlewares/error-handler";
import { applyMiddleware } from "@middlewares/loader";
import { mountRoutes } from "@routes/loader";

const app: Express = express();

app.set("trust proxy", true); // ✅ for accurate IPs & secure cookies
applyMiddleware(app);
logger.info("[middleware] loaded stack.");
mountRoutes(app);
logger.info("[routes] mounted routes.");
app.use(errorHandler); // ✅ still manual and last  TODO: make this programmatic.

export default app;
