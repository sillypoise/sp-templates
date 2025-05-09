# 🧪 SPT Express Basic Template

A TypeScript-first, scalable Express API template designed for real-world production readiness without the bloat. Built with DX, extensibility, and security in mind.

---

## 🔧 Features

* 🚀 TypeScript-first with strict typing and type inference
* 🧩 Modular architecture (routes, controllers, services, models)
* 📦 Clean dependency setup with `tsx`, `tsup`, and `vitest`
* 🔐 Secure by default (helmet, trust proxy, error handling)
* 🪵 Structured logging with Winston + Morgan integration
* 🧪 Built-in testing with `vitest` and `supertest`
* 🛠 Environment-aware config system using `zod`
* 🔄 Graceful shutdown support (K8s/Docker-ready)
* 🔑 Optional 1Password secrets manager integration

---

## 📁 Folder Structure

```
src/
├── app.ts              # Applies middleware and mounts routes
├── config/             # Zod-validated app config
├── controllers/        # Route handler logic
├── db/                 # SQLite setup (via better-sqlite3)
├── logger/             # Winston logger + morgan stream
├── middlewares/        # Custom middlewares
├── models/             # DB access logic
├── routes/             # Route definitions and loader
├── schemas/            # Zod validation schemas
├── services/           # Business logic (e.g. DB delegation)
├── utils/              # Generic utilities (e.g. graceful shutdown)
├── index.ts            # Entrypoint
└── server.ts           # HTTP server + shutdown logic
```

---

## 🛠 Setup

```sh
pnpm install
pnpm dev
```

Create a `.env` or use secrets injection (see below).

---

## ⚙️ Environment Config

App config is fully typed and validated using `zod`, via `config/index.ts`.

You can extend this with:

* Runtime defaults per `stage`
* Derived config (e.g., `log_level` by `stage`)

Supports `.env`, `.env.{stage}` fallback.

---

## 🔐 Secrets Management (1Password optional)

If you prefer not to use `.env` files, you can use 1Password:

1. Create a `secrets/dev.env` with `op://` references:

```env
PORT=op://development/sp-express-basic/secret_port
NODE_ENV=development
```

2. Load secrets using:

```sh
op run --env-file=secrets/dev.env -- pnpm dev
```

Alternatively, use JSON templates with `op inject`:

```sh
eval $(op inject -i secrets/dev.env.json -f dotenv)
pnpm dev
```

> ℹ️ The template detects stage from `NODE_ENV` or `APP_ENV`.

---

## 🧪 Testing

Test with:

```sh
pnpm test
```

Tests live alongside controllers as `*.test.ts`, and use `supertest` + `vitest`.

Database resets before each test via a shared utility.

---

## 🔌 Middleware Loader

Middleware is declared with explicit order and type enforcement:

```ts
const middlewareStack = [
  { name: 'cors', handler: cors() },
  { name: 'json-body', handler: express.json() },
  { name: 'logger', handler: httpLogger },
];
```

Apply via `applyMiddleware(app)` — logged for visibility.

> TODO: Promote error handler into loader logic as well.

---

## 🗂 Route Loader

Supports versioned and standalone routes:

```ts
/api/v1/users
/api/v2/users
/health (standalone)
```

Extensible and type-safe, with declarative mounting logic.

---

## 📤 Logging

* Winston logger with per-stage format (`debug`, `info`, etc.)
* Morgan piped into Winston under the `http` level
* Pretty-printed in `dev`, JSON in `prod`

---

## 🧼 Graceful Shutdown

App listens for `SIGINT` / `SIGTERM`:

* Stops HTTP server
* Closes DB connection
* Logs clean exit

Register any additional shutdown logic via `registerShutdown()`.

---

## 🧱 Suggestions for Extending

These features are not included by default, but are strongly encouraged:

* 🔁 Request ID middleware (for tracing)
* ⚠️ Linting for circular dependencies
* ✍️ Explicit return types for all handlers (enforced by Biome)
* 🔐 Input sanitization (e.g., xss-clean)
* 🔍 Metrics / tracing integration
* 🧩 Use of `helmet.contentSecurityPolicy` only in prod
* 🧪 Abstract DB layer for easier test mocking

---

## 📄 License

MIT. Use freely, modify heavily.

---

## 🤝 Acknowledgements

Inspired by:

* [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices)
* Real-world usage needs from production teams
* 1Password CLI & modern secrets workflows
