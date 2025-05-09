import express, { type Express } from "express";

import { errorHandler } from "@middlewares/error-handler";
import routes from "@routes/index";
import { applyMiddleware } from "@middlewares/loader";
import { logger } from "@logger";

const app: Express = express();

app.set("trust proxy", true); // ✅ for accurate IPs & secure cookies
applyMiddleware(app);
logger.info("[middleware] Loaded stack.");
app.use("/api", routes);
app.use(errorHandler); // ✅ still manual and last  TODO: make this programmatic.

export default app;
