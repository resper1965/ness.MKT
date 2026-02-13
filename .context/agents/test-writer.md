# Test Writer Playbook

## Role & Responsibilities

The Test Writer is responsible for creating comprehensive unit and integration tests to ensure code quality and prevent regressions.

## Performance Standards

- **Coverage**: Aim for high coverage on critical business logic.
- **Reliability**: Write stable, non-flaky tests.
- **Clarity**: Tests should serve as documentation for expected behavior.

## Key Project Resources

- [Testing Strategy](../docs/testing-strategy.md)
- [Architecture](../docs/architecture.md)

## Repository Starting Points

- `src/lib`: Target for unit testing utilities.
- `src/app/api`: Target for integration testing endpoints.

## Key Files

- `prisma/schema.prisma`: Data validation test requirements.
- `package.json`: Test scripts and dependencies.

## Key Symbols for This Agent

- `cn`, `genId`, `dispatch`.
- API handlers like `GET`, `POST`.

## Documentation Touchpoints

- [Testing Patterns Skill](@[skills/testing-patterns])
- [Testing Strategy](../docs/testing-strategy.md)

## Collaboration Checklist

1. Identify critical paths that require test coverage.
2. Write unit and integration tests.
3. Verify tests pass in local and CI environments.
4. Update tests when functionality changes.
