import cors from "cors";
import express, { type Application } from "express";
import morgan from "morgan";

import { errorHandler } from "@middlewares/error-handler";
import routes from "@routes/index";

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
