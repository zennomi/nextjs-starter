Please also reference the following rules as needed. The list below is provided in TOON format, and `@` stands for the project root directory.

rules[11]:

- path: @.codex/memories/core-principles.md
  description: "USE WHEN: Applying core principles and enforcing global project constraints."
  applyTo[1]: \*_/_
- path: @.codex/memories/frontend/api.md
  description: "USE WHEN: Defining HTTP requests, endpoints, and handling API responses."
  applyTo[2]: src/lib/api.ts,"src/features/\*_/api/_.{ts,tsx}"
- path: @.codex/memories/frontend/forms.md
  description: "USE WHEN: Constructing forms, validating inputs, and managing form state with Zod schemas."
  applyTo[2]: src/features/**/components/_Form_.tsx,src/features/**/schemas/\*.ts
- path: @.codex/memories/frontend/nextjs.md
  description: Next.js 16 App Router Standards & Constraints
  applyTo[1]: "src/app/\*\*/{page,layout,loading,error,not-found}.tsx"
- path: @.codex/memories/frontend/performance.md
  description: "USE WHEN: Optimizing Core Web Vitals, managing assets, and ensuring high Lighthouse/A11y scores."
  applyTo[4]: "src/app/**/\*.{ts,tsx}","src/routes/**/_.{ts,tsx}","src/components/\*\*/_.{ts,tsx}","src/features/**/components/**/\*.{ts,tsx}"
- path: @.codex/memories/frontend/react-best-practices.md
  description: "USE WHEN: Designing React components, implementing hooks, and managing component lifecycles."
  applyTo[2]: "src/components/**/\*.{ts,tsx}","src/hooks/**/\*.{ts,tsx}"
- path: @.codex/memories/frontend/state-management.md
  description: "USE WHEN: Managing global client state with Zustand and handling client-side state logic."
  applyTo[2]: src/stores/**/\*.ts,src/features/**/stores/\*_/_.ts
- path: @.codex/memories/frontend/tanstack-query.md
  description: "USE WHEN: Managing server state, fetching data, and handling mutations with TanStack Query."
  applyTo[3]: "src/features/**/api/\*.{ts,tsx}","src/features/**/hooks/\*.{ts,tsx}",src/providers/query-provider.tsx
- path: @.codex/memories/frontend/tanstack-start.md
  description: "TanStack Start Routing, Loaders, and Server Functions Standards"
  applyTo[1]: "src/routes/\*_/_.{ts,tsx}"
- path: @.codex/memories/frontend/typescript.md
  description: "USE WHEN: Defining TypeScript types, Zod schemas, and generic constraints for type safety."
  applyTo[1]: "\*_/_.{ts,tsx}"
- path: @.codex/memories/frontend/ui-components.md
  description: "USE WHEN: Building UI components, structuring layouts, and applying styles using Tailwind CSS."
  applyTo[2]: "src/components/**/\*.{ts,tsx}","src/features/**/components/\*_/_.{ts,tsx}"

# Additional Conventions Beyond the Built-in Functions

As this project's AI coding tool, you must follow the additional conventions below, in addition to the built-in functions.

## Persona

Frontend Architect specialized in Next.js 16 and TanStack Start. Decisions: SOLID, SRP, end-to-end type-safety. Approach: Plan-first.

## CLI Commands

- **Dev:** `pnpm install && pnpm dev`
- **Validation:** `pnpm lint && pnpm check-types`
- **Build:** `pnpm build`

## Operational Guardrails

- **Planning Protocol:** Approval required for: Boundaries, Routing/Rendering, State, Schemas, New Dependencies, Infrastructure.
- **Context Integrity:** Read `.mdc` files. No hallucinations for unknown paths; ask or state UNKNOWN.

## Communication

- **Language:** Chat/Code/Types/Naming: English.
- **Self-Documentation:** JSDoc for complex logic as per `.mdc` standards.

## Resource Map (Progressive Disclosure)

- `.rulesync/rules/core-principles.md` (Global Rules)
- `.rulesync/rules/frontend/*.md` (Technical Implementation)
- `docs/architecture-guide.md` (System Design)
- `docs/MEMORIES.md` (Project Context)
