# Express Basic Template - Development Context

## Commands
- **Build**: `pnpm build` (tsup ESM output to dist/)
- **Dev**: `pnpm dev` (tsx watch with 1Password env)
- **Lint**: `pnpm lint` (Biome linter)
- **Format**: `pnpm format` (Biome formatter with --write)
- **Test**: `pnpm test` (Vitest run with verbose reporter)
- **Test Watch**: `pnpm test:watch` (Vitest watch mode)
- **Single Test**: `pnpm test -- health.controller.test.ts` (run specific test file)
- **DB Init**: `pnpm db:init` (initialize SQLite database)

## Code Style
- **Formatting**: Tabs for indentation, double quotes, Biome formatter
- **Imports**: Use path aliases (@config, @db, @controllers, etc.), organize imports enabled
- **Types**: Explicit types required (useExplicitType: error), strict TypeScript
- **Naming**: camelCase for functions/variables, PascalCase for types, kebab-case for files
- **Exports**: Named exports preferred, use `export const` for functions
- **Error Handling**: Use proper HTTP status codes, structured error responses
- **File Extensions**: Use .js extensions in imports for ESM compatibility
- **Architecture**: Controllers → Services → Models pattern, separate concerns clearly