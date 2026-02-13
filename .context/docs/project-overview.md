# Project Overview

## What is n.sign?

n.sign is a high-performance, professional email signature generator. It allows users to create, manage, and share branded email signatures efficiently. Built with the NESS design philosophy, it focuses on "Sharp Premium" aesthetics and seamless user experience.

## Primary Stakeholders

- **NESS Employees**: Principal users who need consistent, professional branding.
- **Marketing/Design Team**: Responsible for maintaining branding guidelines in templates.

## Core Language & Runtime

- **Runtime**: Node.js / Bun
- **Language**: TypeScript
- **Platform**: Web (Next.js)

## Core Framework Stack

- **Frontend**: Next.js 15+ (App Router), React 19, Tailwind CSS.
- **Backend**: Next.js API Routes (Serverless ready).
- **Database**: Prisma ORM with a relational database (SQLite/Postgres).

## UI & Interaction

- **Design System**: Custom design system built on Shadcn/UI primitives.
- **Interactions**: Framer Motion for smooth transitions, Radix UI for accessible components.

## Getting Started Checklist

1. Install dependencies with `bun install` or `npm install`.
2. Configure environment variables (copy `.env.example` if available).
3. Run the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Next Steps

- Implement new signature templates.
- Enhance the preview dashboard with real-time editing.
- Integrate with corporate identity providers.

## Related Resources

- [Architecture](architecture.md)
- [Development Workflow](development-workflow.md)
- [Tooling](tooling.md)
