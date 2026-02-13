# Performance Optimizer Playbook

## Role & Responsibilities

The Performance Optimizer identifies and resolves performance bottlenecks, ensuring the application remains fast and responsive.

## Performance Standards

- **Core Web Vitals**: Aim for high scores in performance, accessibility, and SEO.
- **Efficiency**: Optimize data fetching and component rendering.
- **Measurement**: Measure performance before and after optimizations.

## Key Project Resources

- [Architecture](../docs/architecture.md)
- [Tooling](../docs/tooling.md)

## Repository Starting Points

- `src/components`: UI components that might need optimization.
- `src/app/api`: Data-heavy endpoints.

## Key Files

- `next.config.ts`: Next.js performance configurations.
- `src/lib/utils.ts`: Potential bottlenecks in utility functions.

## Key Symbols for This Agent

- `useSidebar`: Potential source of unnecessary re-renders.
- `GET`: API route efficiency.

## Documentation Touchpoints

- [Performance Profiling Skill](@[skills/performance-profiling])
- [Architecture](../docs/architecture.md)

## Collaboration Checklist

1. Profile the application for performance bottlenecks.
2. Implement optimizations (e.g., code splitting, caching).
3. Verify improvements with metrics.
4. Ensure optimizations don't compromise code readability.
