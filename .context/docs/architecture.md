# Architecture

## System Overview

n.sign is a professional email signature generator built with Next.js, using a modern tech stack centered around React, Tailwind CSS, and Prisma. The system is designed to be fast, responsive, and easy to deploy.

## Core Layers

### Utils

Location: `src/lib`
Contains shared utility functions like `cn` for Tailwind class merging and other helper functions used across the application.

### Controllers (API Routes)

Location: `src/app/api`
Handles backend logic and data persistence. Key endpoints include:

- `src/app/api/signatures`: CRUD operations for email signatures.
- `src/app/api/signatures/[slug]`: Specific signature management by identifier.

### Components

Location: `src/app` and `src/components/ui`

- `src/app`: Page-level components and layouts.
- `src/components/ui`: Reusable UI primitives (Shadcn/UI based).
- `src/app/s/[slug]`: Public view for signatures.

## Public API and Entry Points

- `GET /api/signatures`: Fetch all signatures.
- `POST /api/signatures`: Create a new signature.
- `GET /api/signatures/[slug]`: Fetch a specific signature.
- `DELETE /api/signatures/[slug]`: Remove a signature.

## Symbol Index Highlights

### Key Functions

- `cn`: `src/lib/utils.ts` - Class merging.
- `toast`: `src/hooks/use-toast.ts` - Notifications system.
- `useSidebar`: `src/components/ui/sidebar.tsx` - Layout state management.

### Key Interfaces

- `SignatureData`: `src/app/s/[slug]/page.tsx` - Structure for signature content.
- `State`: `src/hooks/use-toast.ts` - Toast notification state.

## Internal System Boundaries

The application maintains a clear separation between the presentation layer (`src/app`), the shared UI components (`src/components/ui`), and the data access/API layer (`src/app/api`). State management is handled primarily through React Hooks and specialized hooks like `use-toast`.

## External Service Dependencies

- **Database**: Prisma acts as the ORM, likely connecting to a PostgreSQL or similar database.
- **Authentication**: `next-auth` is used for user authentication.

## Top Directories Snapshot

- `src/app`: ~10 files (Core routing and pages)
- `src/components/ui`: ~40 files (UI primitives)
- `src/lib`: ~5 files (Utilities)
- `prisma`: ~2 files (Database schema and migrations)

## Related Resources

- [Project Overview](project-overview.md)
- [Development Workflow](development-workflow.md)
