# Prompt: Retrofit SDD onto Existing Project

## Instructions for AI Agent

You are extracting an SDD (Spec-Driven Development) framework from an existing codebase that has no specs. The goal is to document **what actually exists** — not what was planned or aspired to.

## Phase 1: Discover

Scan the codebase to build a feature inventory:

### Backend

- List all API routes (group by resource/domain)
- List all database tables and views
- List all background jobs, crons, webhooks
- List all external integrations (payment, auth, email, etc.)

### Frontend

- List all screens/pages (from router config)
- List all state management stores/contexts
- List all API calls (from service/repository layer)

### Admin (if exists)

- List all admin pages
- List CRUD operations available

## Phase 2: Map to Journeys

Group discovered features into **user journeys**, not technical modules.

Ask the user: "Based on what I found, here are the user journeys I see: [list]. Does this match how you think about the product?"

Common journey patterns:

- Onboarding (register, verify, setup profile)
- Core action (create content, find matches)
- Transaction (negotiate, agree, pay)
- Fulfillment (deliver, confirm, track)
- Post-transaction (review, dispute, support)

### Domain prefixes

Group specs by domain. If the product has a "trainer" domain with booking, availability, and sessions — prefix them all: `trainer-booking/`, `trainer-availability/`, `trainer-sessions/`. Platform-wide features (onboarding, billing) use their own descriptive names.

## Phase 3: Create Constitution

### docs/mission.md

- Extract personas from the code (user roles, admin roles)
- Infer business model from payment logic
- Describe what the product does based on the features found
- Ask user to fill in the "Why" — code doesn't explain motivation

### docs/tech-stack.md

- Extract from package.json, pubspec.yaml, docker-compose, etc.
- List frameworks, databases, external services with versions
- Document key architectural decisions visible in code

### docs/roadmap.md

- Everything found in code goes under shipped sections with `[x]`
- Ask user what's planned for upcoming sections
- **Link each section to its spec** — don't use arbitrary phase numbers
- Group by feature/journey, not by chronological order

## Phase 4: Create Journey Specs

For each journey, create `plan.md`, `requirements.md`, `validation.md`:

- **plan.md**: Mark everything found in code as `[x]`. Only mark `[ ]` for items the user explicitly says are planned.
- **requirements.md**: Document decisions visible in code (e.g., "payment charge created at checkout, not on confirmation" — inferred from the code flow). Ask user about decisions not visible in code.
- **validation.md**: Write acceptance criteria based on what the code does. Add QA scenarios for the most critical flows.

### Aspirational schemas

Database tables with zero application code are NOT shipped features. Check for each table:
1. Does code reference this table? (grep in `src/`)
2. What commit created it? What else was in that commit?
3. Has it evolved since creation?

Mark schema-only tables as `[ ]` with a note: "schema exists, zero code."

## Phase 5: Create Convention Docs

For patterns that apply across multiple features, create convention docs in `docs/`:

- `docs/architecture/{domain}.md` — non-negotiable system constraints (multi-tenancy, routing, security)
- `docs/design-system.md` — design tokens, typography, component patterns
- `docs/{domain}/README.md` — data model conventions, query patterns

**Key distinction:**
- Convention docs describe **how to build here** — patterns, constraints, rules
- Specs describe **what was/will be built** — feature checklists, decisions, gaps
- Checklists (`[x]`/`[ ]`) NEVER go in docs/ — they belong in specs/

## Phase 6: Build Table → Spec Index

Create a mapping in `docs/README.md` of every database table to its spec(s). This is the integrity check:

```markdown
## Table → Spec Index

| Table | Spec | Code? | Notes |
|-------|------|-------|-------|
| users | [user-onboarding](../specs/user-onboarding/) | ✅ | |
| payments | [billing](../specs/billing/) | ✅ | Spec gap: refund flow |
| reviews | [booking](../specs/booking/) | ❌ | Schema only, zero UI |
```

Rules:
- Every table must map to at least one spec
- "Code?" column: ✅ if application code references this table, ❌ if schema-only
- Note spec gaps (areas the spec doesn't fully cover)
- This index is a living document — update it when adding tables or specs

## Critical Rules

1. **Document reality, not aspiration.** If the code doesn't do it, don't mark it `[x]`.
2. **Verify claims against code.** Don't trust comments, variable names, or old docs. Read the actual logic.
3. **Flag contradictions.** If old docs say one thing and code does another, note it in Known Gaps.
4. **Ask the user.** Code explains "what" and "how", but rarely "why" or "what's next". Use `AskUserQuestion` frequently.
5. **Run parallel exploration agents** for large codebases. One per journey or domain. Merge findings.
6. **Don't create meta-trackers.** Each feature gets one spec. Don't create "Platform MVP" specs that just link to other specs.
7. **Investigate before dismissing.** Don't call a table "orphaned" without checking git history — commits, intent, evolution.
8. **Separate docs/ and specs/.** Checklists go in specs/. Architecture constraints go in docs/. Don't mix them.

## Output Structure

```
docs/
├── mission.md
├── tech-stack.md
├── roadmap.md
├── README.md              # Index + Table → Spec mapping
├── architecture/
│   └── {domain}.md
├── design-system.md       # If design tokens/patterns exist
└── {domain}/README.md     # Data model conventions

specs/
├── {domain}-{feature-1}/
│   ├── plan.md
│   ├── requirements.md
│   └── validation.md
├── {domain}-{feature-2}/
│   └── ...
└── ...
```
