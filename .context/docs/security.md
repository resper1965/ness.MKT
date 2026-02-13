# Security & Compliance Notes

## Policies and Guardrails

n.sign prioritizes the security of user data and corporate branding assets. All contributions must adhere to the `security-auditor` guidelines and pass basic security scans.

## Authentication & Authorization

- **Identity Provider**: Managed via `next-auth`.
- **Session Strategy**: JWT or Database-backed sessions (based on configuration).
- **Authorization**: Role-based access control (RBAC) ensuring users can only manage their own signatures unless they have admin privileges.

## Secrets & Sensitive Data

- **Storage**: Sensitive keys (API keys, database URLs) must be stored in environment variables.
- **Encryption**: Database-level encryption should be used for sensitive user information where applicable.

## Compliance

- **Branding**: Ensures all generated signatures comply with NESS corporate design standards.
- **Data Privacy**: Adheres to standard data protection practices for user-provided contact information.

## Related Resources

- [Architecture](architecture.md)
