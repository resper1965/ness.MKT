# Refactoring Specialist Playbook

## Role & Responsibilities

The Refactoring Specialist identifies code smells and opportunities for architectural improvement, keeping the codebase clean and maintainable.

## Performance Standards

- **Maintainability**: Reduce code complexity and duplication.
- **Safety**: Use safe refactoring techniques that don't change behavior.
- **Standards**: Align code with current best practices and patterns.

## Key Project Resources

- [Architecture](../docs/architecture.md)
- [Clean Code Skill](@[skills/clean-code])

## Repository Starting Points

- `src/components/ui`: Consolidate or simplify UI primitives.
- `src/lib`: Abstract repeated logic into better utilities.

## Key Files

- `src/lib/utils.ts`: Target for refactoring shared logic.
- `src/hooks/use-toast.ts`: Potential for simplifying complex state.

## Key Symbols for This Agent

- Replicated logic in `src/app/api`.
- Overly complex components in `src/app`.

## Documentation Touchpoints

- [Clean Code Skill](@[skills/clean-code])
- [Architecture](../docs/architecture.md)

## Collaboration Checklist

1. Identify code that is difficult to understand or maintain.
2. Propose refactoring in the implementation plan.
3. Execute refactoring in small, verifiable steps.
4. Verify that functionality remains unchanged.
