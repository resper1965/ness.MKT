# Glossary & Domain Concepts

## Project Terminology

- **n.sign**: The name of the professional email signature generator.
- **Signature**: A collection of user details (name, role, logo, etc.) formatted for email clients.
- **Slug**: A unique identifier used in URLs to access specific signatures (e.g., `n.sign/s/john-doe`).
- **Template**: A predefined layout for email signatures.

## Type Definitions

- `SignatureData`: Defines the schema for a signature's content (name, title, contact info).
- `User`: Backend representation of an authenticated user.
- `Message`: WebSocket message structure for real-time interactions (if applicable).

## Enumerations

- Toast Actions: `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST`.

## Core Terms

| Term      | Relevance          | Location                        |
| --------- | ------------------ | ------------------------------- |
| `cn`      | Class name utility | `src/lib/utils.ts`              |
| `toast`   | User notification  | `src/hooks/use-toast.ts`        |
| `Sidebar` | Navigation layout  | `src/components/ui/sidebar.tsx` |

## Personas / Actors

- **End User**: Creates and manages their own email signatures.
- **Admin**: Manages system settings and potentially user accounts.

## Domain Rules & Invariants

- Signatures must have a unique slug.
- User data must be validated before creation/update.
- Professional branding guidelines (NESS) should be followed in templates.

## Related Resources

- [Project Overview](project-overview.md)
