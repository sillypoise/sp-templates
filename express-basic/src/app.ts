import express, { type Express } from "express";

import { logger } from "@logger";
import { errorHandler } from "@middlewares/error-handler";
import { applyMiddleware } from "@middlewares/loader";
import routes from "@routes/index";

const app: Express = express();

app.set("trust proxy", true); // ✅ for accurate IPs & secure cookies
applyMiddleware(app);
logger.info("[middleware] Loaded stack.");
app.use("/api", routes);
app.use(errorHandler); // ✅ still manual and last  TODO: make this programmatic.

export default app;
