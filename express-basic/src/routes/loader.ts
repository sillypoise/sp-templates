import type { Express, Router } from "express";
import healthRoutes from "./health.route";
import userRoutes from "./users.route";
import { config } from "@config";
import { logger } from "@logger";

const routeOrder = ["health", "users"] as const;

type RouteKey = (typeof routeOrder)[number];

type RouteEntry = {
  key: RouteKey;
  path: string;
  handler: Router;
};

// Registry of all known routes
const routeRegistry: Record<RouteKey, RouteEntry> = {
  health: { key: "health", path: "/health", handler: healthRoutes },
  users: { key: "users", path: "/users", handler: userRoutes },
} satisfies Record<RouteKey, RouteEntry>;

// Loader applies the routes in defined order
export const mountRoutes = (app: Express): void => {
  const versionPrefix = `/api/${config.api_version}`;

  for (const key of routeOrder) {
    const { path, handler } = routeRegistry[key];
    app.use(`${versionPrefix}${path}`, handler);
  }
};
