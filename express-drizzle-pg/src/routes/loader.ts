import { type AppConfig, config } from "@config";
import type { apiVersions } from "@config/schema";
import healthRoutes from "@routes/health.route";
import userRoutes from "@routes/users.route";
import type { Express, Router } from "express";
// import userV2Routes from "@routes/v2/users.route"; // hypothetical

const routeOrder = ["health", "users"] as const;
const standaloneRouteKeys = ["admin", "health", "internal"] as const;

export type ApiVersion = (typeof apiVersions)[number];
export type RouteKey = (typeof routeOrder)[number];
export type StandaloneKey = (typeof standaloneRouteKeys)[number];

export type StandalonePrefix = `/${StandaloneKey}`;
export type ApiVersionPrefix = `/api/${ApiVersion}`;
export type RoutePrefix = ApiVersionPrefix | StandalonePrefix;

type RouteEntry = {
	path: string;
	handler: Router;
};

type RouteMount = {
	prefix: RoutePrefix;
	entries: RouteEntry[];
};

type RouteMountWithKey<K extends StandaloneKey> = {
	prefix: `/${K}`;
	entries: RouteEntry[];
};

const versionedRegistry: Record<"v1" | "v2", Record<RouteKey, RouteEntry>> = {
	v1: {
		health: { path: "/health", handler: healthRoutes },
		users: { path: "/users", handler: userRoutes },
	},
	v2: {
		health: { path: "/health", handler: healthRoutes },
		users: { path: "/users", handler: userRoutes }, // or userRoutesV2
	},
} satisfies Record<"v1" | "v2", Record<RouteKey, RouteEntry>>;

const standaloneRegistry = {
	admin: {
		prefix: "/admin",
		entries: [],
	},
	internal: {
		prefix: "/internal",
		entries: [],
	},
	health: {
		prefix: "/health",
		entries: [{ path: "/", handler: healthRoutes }],
	},
} satisfies {
	[K in StandaloneKey]: RouteMountWithKey<K>;
};

export const getAllMounts = (config: AppConfig): RouteMount[] => {
	const version = config.api_version;
	const versionRoutes = versionedRegistry[version];

	const versionedMount: RouteMount = {
		prefix: `/api/${version}`,
		entries: routeOrder.map((key) => versionRoutes[key]),
	};

	const standaloneMounts: RouteMount[] = Object.values(standaloneRegistry);

	return [versionedMount, ...standaloneMounts];
};

export const mountRoutes = (app: Express): void => {
	const mounts = getAllMounts(config);

	for (const { prefix, entries } of mounts) {
		for (const { path, handler } of entries) {
			app.use(`${prefix}${path}`, handler);
		}
	}
};
