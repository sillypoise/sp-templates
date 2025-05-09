import cors from "cors";
import express, { type Application } from "express";

import { errorHandler } from "@middlewares/error-handler";
import routes from "@routes/index";
import { httpLogger } from "@logger/https-logger";

const app: Application = express();

app.use(cors());
app.use(httpLogger);
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
