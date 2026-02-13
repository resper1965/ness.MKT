# Testing Strategy

## Quality Maintenance

Quality is maintained through a combination of manual verification, linting, and automated testing patterns.

## Test Types

- **Unit**: Testing utility functions and shared logic.
- **Integration**: Testing API endpoints and component interactions.
- **E2E**: (Planned/Optional) Playwright for critical user flows.

## Running Tests

- All tests: `npm test` (if configured)
- Linting: `npm run lint`
- Build Verification: `npm run build`

## Quality Gates

- Code must pass `eslint` checks.
- Build must succeed before deployment.
- Major UI changes must pass a UX audit using the `ux_audit.py` script.

## Related Resources

- [Development Workflow](development-workflow.md)
