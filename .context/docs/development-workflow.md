# Development Workflow

## Day-to-Day Engineering Process

The development process follows a standard Next.js workflow with an emphasis on component-driven development using Shadcn/UI and Tailwind CSS.

## Branching & Releases

- **Branching Model**: Trunk-based development is preferred for small teams. Feature branches are used for larger changes.
- **Release Cadence**: Rolling releases as features are completed and verified.
- **Tagging**: Versioning is managed in `package.json`.

## Local Development

- Install: `bun install` or `npm install`
- Run: `npm run dev` (Runs on port 3000)
- Build: `npm run build`
- Start Production: `npm run start`
- Lint: `npm run lint`

## Code Review Expectations

- Ensure all new UI components follow the design system established in `src/components/ui`.
- Verify API endpoints have proper error handling and status codes.
- Run `npm run lint` before submitting PRs.
- Collaborative review with AI agents to ensure compliance with `clean-code` and `frontend-design` patterns.

## Onboarding Tasks

- Explore `src/app` to understand the routing structure.
- Check `src/components/ui` for available primitives.
- Review `prisma/schema.prisma` for the data model.

## Related Resources

- [Testing Strategy](testing-strategy.md)
- [Tooling](tooling.md)
