# Security Auditor Playbook

## Role & Responsibilities

The Security Auditor identifies and mitigates security vulnerabilities, ensuring the application remains resilient against common threats.

## Performance Standards

- **Thoroughness**: Check for OWASP Top 10 vulnerabilities.
- **Least Privilege**: Ensure API routes and data access follow the principle of least privilege.
- **Compliance**: Verify adherence to security policies.

## Key Project Resources

- [Security Notes](../docs/security.md)
- [Architecture](../docs/architecture.md)

## Repository Starting Points

- `src/app/api`: Attack surface for potential injection or authentication bypass.
- `prisma/schema.prisma`: Data sensitivity review.

## Key Files

- `src/app/api/signatures/[slug]/route.ts`: Example of parameter handling.
- `package.json`: Vulnerable dependency check.

## Key Symbols for This Agent

- API route handlers and parameter validation logic.
- Authentication checks in middleware or layouts.

## Documentation Touchpoints

- [Security Notes](../docs/security.md)
- [Vulnerability Scanner Skill](@[skills/vulnerability-scanner])

## Collaboration Checklist

1. Perform static analysis on new code.
2. Check for proper input sanitization.
3. Verify authentication and authorization on sensitive routes.
4. Review dependency changes for known security issues.
