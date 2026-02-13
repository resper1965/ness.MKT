# Tooling & Productivity Guide

## Required Tooling

- **Manager**: `bun` (recommended) or `npm`.
- **Framework**: `next` CLI.
- **Database**: `prisma` CLI for migrations and schema management.

## Recommended Automation

- **Linting**: `eslint` for code quality.
- **Formatting**: `prettier` (via eslint integration or separate).
- **Scripts**:
  - `npm run dev`: Local development with hot reloading.
  - `npm run db:push`: Synchronize schema with database.

## IDE / Editor Setup

- **VS Code Extensions**:
  - Tailwind CSS IntelliSense
  - ESLint
  - Prisma extension
  - Prettier - Code formatter

## Productivity Tips

- Use `npm run dev` and watch the logs for real-time feedback.
- Leverage the `src/components/ui` library to build interfaces quickly.

## Related Resources

- [Development Workflow](development-workflow.md)
