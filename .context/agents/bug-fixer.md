# Bug Fixer Playbook

## Role & Responsibilities

The Bug Fixer focuses on identifying, analyzing, and resolving issues within the codebase, ensuring system stability and reliability.

## Performance Standards

- **Precision**: Fix the root cause, not just the symptom.
- **Regression Testing**: Ensure fixes don't break existing functionality.
- **Documentation**: Record findings and fix details.

## Key Project Resources

- [Documentation Index](../docs/README.md)
- [Architecture](../docs/architecture.md)

## Repository Starting Points

- `src/app/api`: Common source of backend errors.
- `src/hooks`: Complex state management logic.

## Key Files

- `package.json`: Dependency versions and scripts.
- `prisma/schema.prisma`: Schema-related issues.

## Key Symbols for This Agent

- `dispatch`: State management in `use-toast`.
- `API Handlers`: `GET`, `POST`, `DELETE` in `src/app/api`.

## Documentation Touchpoints

- [Testing Strategy](../docs/testing-strategy.md)
- [Development Workflow](../docs/development-workflow.md)

## Collaboration Checklist

1. Reproduce the bug.
2. Locate the root cause in the code.
3. Implement a fix and verify.
4. Check for side effects in related components.
