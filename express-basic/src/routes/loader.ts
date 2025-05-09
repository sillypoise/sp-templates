import { config } from "@config";
import healthRoutes from "@routes/health.route";
import userRoutes from "@routes/users.route";
import type { Express, Router } from "express";
// import userV2Routes from "@routes/v2/users.route"; // hypothetical

const routeOrder = ["health", "users"] as const;

type RouteKey = (typeof routeOrder)[number];

type RouteEntry = {
  key: RouteKey;
  path: string;
  handler: Router;
};

// Registry for all versions
const routeRegistry: Record<"v1" | "v2", Record<RouteKey, RouteEntry>> = {
  v1: {
    health: { key: "health", path: "/health", handler: healthRoutes },
    users: { key: "users", path: "/users", handler: userRoutes },
  },
  v2: {
    health: { key: "health", path: "/health", handler: healthRoutes }, // same or new V2
    users: { key: "users", path: "/users", handler: userRoutes }, // same or new e.g. userRoutesV2
  },
} as const;

export const mountRoutes = (app: Express): void => {
  const version = config.api_version as keyof typeof routeRegistry;
  const routes = routeRegistry[version];
  const prefix = `/api/${version}`;

  if (!routes) {
    throw new Error(`Unsupported API version: ${version}`);
  }

  for (const key of routeOrder) {
    const { path, handler } = routes[key];
    app.use(`${prefix}${path}`, handler);
  }
};
