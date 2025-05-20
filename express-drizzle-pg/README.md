# 🧪 SPT Express Basic Template

A TypeScript-first, scalable Express API template designed for real-world production readiness without the bloat. Built with DX, extensibility, and security in mind.

---

## 🔧 Features

- 🚀 TypeScript-first with strict typing and type inference
- 🧩 Modular architecture (routes, controllers, services, models)
- 📦 Clean dependency setup with `tsx`, `tsup`, and `vitest`
- 🔐 Secure by default (helmet, trust proxy, error handling)
- 🪵 Structured logging with Winston + Morgan integration
- 🧪 Built-in testing with `vitest` and `supertest`
- 🛠 Environment-aware config system using `zod`
- 🔄 Graceful shutdown support (K8s/Docker-ready)
- 🔑 Optional 1Password secrets manager integration

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

## ⚙️ Environment Configuration

The app configuration is fully typed and validated using `zod`, via `config/index.ts`.

### 🧠 How it works:

1. Secrets are injected at runtime using `op run` (via `secrets/dev.env`)
2. Optional developer-specific overrides can be placed in `secrets/local.env`
3. All environment variables are loaded and validated at startup

You can extend this with:

- Runtime defaults per `stage`
- Derived values (e.g., `log_level` based on `NODE_ENV` or `APP_ENV`)

---

## 🔐 Secrets Management (Default: 1Password CLI)

This template defaults to using **1Password's `op run`** for secure secrets injection.

### ✅ Step 1: Create a versioned secret reference file

```env
# secrets/dev.env
PORT=op://development/sp-express-basic/secret_port
NODE_ENV=development
DB_PATH=op://development/sp-express-basic/database_path
```

> ℹ️ This file contains only `op://` references and is safe to commit.

---

### ✅ Step 2: Run the dev server using 1Password

```sh
op run --env-file=secrets/dev.env -- pnpm dev
```

This injects all referenced secrets into the environment before starting the app.

---

## 🛠 Optional: Local Overrides

To override specific variables (e.g., for local testing), create:

```env
# secrets/local.env
PORT=5050
DB_PATH=./dev.db
```

These values will **override** any variables injected via `op run`.

> ⚠️ `secrets/local.env` is ignored by `.gitignore` and should never be committed.

---

## 🧪 Debugging Overrides

When `secrets/local.env` is loaded, overridden values will be displayed in a structured table:

```
🔁 Overridden environment variables from secrets/local.env:
┌────────────┬────────────┐
│  (index)   │   Values   │
├────────────┼────────────┤
│   PORT     │  '5050'    │
│ DB_PATH    │ './dev.db' │
└────────────┴────────────┘
```

This makes it easy to confirm exactly which environment variables were overridden locally.

---

Let me know if you want to break this out into a standalone file and link to it!

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
  { name: "cors", handler: cors() },
  { name: "json-body", handler: express.json() },
  { name: "logger", handler: httpLogger },
];
```

Apply via `applyMiddleware(app)` — logged for visibility.

> TODO: Promote error handler into loader logic as well.

---

## 🗂 Route Loader

Supports versioned and standalone routes:

```ts
/api/1v / users / api / v2 / users / health(standalone);
```

Extensible and type-safe, with declarative mounting logic.

---

## 📤 Logging

- Winston logger with per-stage format (`debug`, `info`, etc.)
- Morgan piped into Winston under the `http` level
- Pretty-printed in `dev`, JSON in `prod`

---

## 🧼 Graceful Shutdown

App listens for `SIGINT` / `SIGTERM`:

- Stops HTTP server
- Closes DB connection
- Logs clean exit

Register any additional shutdown logic via `registerShutdown()`.

---

## 🧱 Suggestions for Extending

These features are not included by default, but are strongly encouraged:

- 🔁 Request ID middleware (for tracing)
- ⚠️ Linting for circular dependencies
- ✍️ Explicit return types for all handlers (enforced by Biome)
- 🔐 Input sanitization (e.g., xss-clean)
- 🔍 Metrics / tracing integration
- 🧩 Use of `helmet.contentSecurityPolicy` only in prod
- 🧪 Abstract DB layer for easier test mocking

---

## 📄 License

MIT. Use freely, modify heavily.

---

## 🤝 Acknowledgements

Inspired by:

- [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- Real-world usage needs from production teams
- 1Password CLI & modern secrets workflows
