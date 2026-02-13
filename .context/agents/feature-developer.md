# Feature Developer Playbook

## Role & Responsibilities

The Feature Developer is responsible for implementing new features according to specifications, ensuring they integrate seamlessly with existing architecture and follow established design patterns.

## Performance Standards

- **Clean Code**: Adhere to `@[skills/clean-code]` principles.
- **Testability**: Ensure new features are easily testable.
- **Consistency**: Use existing UI primitives and utility functions.

## Key Project Resources

- [Documentation Index](../docs/README.md)
- [Architecture](../docs/architecture.md)
- [Development Workflow](../docs/development-workflow.md)

## Repository Starting Points

- `src/app`: Page-level logic and routing.
- `src/app/api`: Backend endpoints and data handling.
- `src/lib`: Shared utilities.

## Key Files

- `src/app/layout.tsx`: Root layout and global providers.
- `src/lib/utils.ts`: Core utilities like `cn`.
- `prisma/schema.prisma`: Data models.

## Key Symbols for This Agent

- `SignatureData`: Core data structure for signatures.
- `GET`, `POST`: API route handlers in `src/app/api`.

## Documentation Touchpoints

- [Project Overview](../docs/project-overview.md)
- [Architecture](../docs/architecture.md)

## Collaboration Checklist

1. Confirm feature assumptions with the user.
2. Draft implementation plan in `task.md`.
3. Implement logic and UI.
4. Verify with manual/automated tests.
5. Update documentation if necessary.
