# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## Code Style Guidelines
- **TypeScript**: Strict mode enabled; use explicit types for function parameters and returns
- **Components**: Use functional components with TypeScript types
- **Formatting**: Follow existing indentation (2 spaces) and brackets style
- **Imports**: Group and order imports: 1) React/Next.js, 2) third-party libraries, 3) local components/types
- **CSS**: Uses Tailwind CSS with custom theme variables defined in globals.css
- **Naming**: Use PascalCase for components, camelCase for variables/functions, and kebab-case for CSS classes
- **Error Handling**: Use try/catch for async operations and proper error messaging
- **File Structure**: Follow the Next.js App Router conventions with page.tsx and layout.tsx files
- **Path Aliases**: Use @/* import alias to reference files from project root

## Project Structure
- Next.js 15+ project using App Router
- React 19
- TypeScript
- Tailwind CSS