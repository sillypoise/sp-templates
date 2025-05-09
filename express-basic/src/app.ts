import express, { type Express } from "express";

import { errorHandler } from "@middlewares/error-handler";
import routes from "@routes/index";
import { applyMiddleware } from "@middlewares/loader";

const app: Express = express();

applyMiddleware(app);

app.use("/api", routes);

app.use(errorHandler);

export default app;
