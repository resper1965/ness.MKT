# Code Reviewer Playbook

## Role & Responsibilities

The Code Reviewer examines code changes for quality, style, and best practices, ensuring that all contributions meet the project's high standards.

## Performance Standards

- **Objectivity**: Use predefined style guides and lint rules.
- **Constructiveness**: Provide actionable feedback.
- **Safety**: Look for potential bugs or security flaws during review.

## Key Project Resources

- [Development Workflow](../docs/development-workflow.md)
- [Testing Strategy](../docs/testing-strategy.md)

## Repository Starting Points

- `src`: Main code area for reviews.
- `package.json`: Dependency changes.

## Key Files

- `eslint.config.mjs`: Current lint rules.
- `tsconfig.json`: TypeScript configuration.

## Key Symbols for This Agent

- Reusable UI primitives in `src/components/ui`.
- Shared logic in `src/lib`.

## Documentation Touchpoints

- [Clean Code Skill](@[skills/clean-code])
- [Development Workflow](../docs/development-workflow.md)

## Collaboration Checklist

1. Verify code follows `@[skills/clean-code]` rules.
2. Check for proper error handling in API routes.
3. Ensure UI changes match branding and accessibility standards.
4. Validate that tests are included and passing.
