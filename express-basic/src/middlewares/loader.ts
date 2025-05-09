import express from "express";
import helmet from "helmet";
import cors from "cors";
import type { RequestHandler, Express } from "express";

import { httpLogger } from "@logger/http-logger";
import { config } from "@config";

// 1. List middleware names in the _required_ order
const middlewareOrder = [
  // "request-id", // TODO: add request-id middleware
  "cors",
  "helmet",
  "logger",
  "json-body",
] as const;
type MiddlewareName = (typeof middlewareOrder)[number];

// 2. Define your registry
const middlewareRegistry = {
  cors: cors(),
  helmet: helmet({
    contentSecurityPolicy:
      config.stage === "production"
        ? undefined // use default CSP
        : false, // disable CSP in dev-like envs
  }),

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
  return;
};
