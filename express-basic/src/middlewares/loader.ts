import express from "express";
import cors from "cors";
import type { RequestHandler, Express } from "express";

import { httpLogger } from "@logger/http-logger";
// import { attachRequestId } from "@middlewares/request-id";
import { errorHandler } from "@middlewares/error-handler";

// 1. List middleware names in the _required_ order
const middlewareOrder = ["cors", "logger", "json-body"] as const;

type MiddlewareName = (typeof middlewareOrder)[number];

// 2. Define your registry
const middlewareRegistry = {
  cors: cors(),
  logger: httpLogger,
  "json-body": express.json(),
} satisfies Record<MiddlewareName, RequestHandler>;

// 3. Build the ordered stack directly from the registry
const middlewareStack = middlewareOrder.map((name) => ({
  name,
  handler: middlewareRegistry[name],
}));

// 4. Build the ordered stack directly from the registry
export const applyMiddleware = (app: Express): void => {
  for (const mw of middlewareStack) {
    app.use(mw.handler);
  }

  app.use(errorHandler);
};
