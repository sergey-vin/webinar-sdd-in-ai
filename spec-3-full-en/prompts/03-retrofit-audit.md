# Prompt: Retrofit SDD onto Existing Project

## Instructions for AI Agent

You are extracting an SDD (Spec-Driven Development) framework from an existing codebase that has no specs. The goal is to document **what actually exists** — not what was planned or aspired to.

## Phase 1: Discover

Scan the codebase to build a feature inventory:

### Backend

- List all API routes (group by resource/domain)
- List all database models/tables
- List all background jobs, crons, webhooks
- List all external integrations (payment, auth, email, etc.)

### Frontend

- List all screens/pages (from router config)
- List all state management stores/blocs/cubits
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

## Phase 3: Create Constitution

### mission.md

- Extract personas from the code (user roles, admin roles)
- Infer business model from payment logic
- Describe what the product does based on the features found
- Ask user to fill in the "Why" — code doesn't explain motivation

### tech-stack.md

- Extract from package.json, pubspec.yaml, docker-compose, etc.
- List frameworks, databases, external services with versions
- Document key architectural decisions visible in code

### roadmap.md

- Everything found in code goes under "Completed" with `[x]`
- Ask user what's planned for "Upcoming" sections
- Group completed items into logical phases

## Phase 4: Create Journey Specs

For each journey, create `plan.md`, `requirements.md`, `validation.md`:

- **plan.md**: Mark everything found in code as `[x]`. Only mark `[ ]` for items the user explicitly says are planned.
- **requirements.md**: Document decisions visible in code (e.g., "payment charge created at checkout, not on confirmation" — inferred from the code flow). Ask user about decisions not visible in code.
- **validation.md**: Write acceptance criteria based on what the code does. Add QA scenarios for the most critical flows.

## Phase 5: Create Implementation Docs

For each technical domain with enough complexity, create a `docs/{domain}.md`:

- Start with a **plain-language overview**: what it does, who it's for, how money/data flows
- Then add technical details: API endpoints, data models, flow diagrams
- Docs describe what **exists**. Not-implemented items go in specs.

## Critical Rules

1. **Document reality, not aspiration.** If the code doesn't do it, don't mark it `[x]`.
2. **Verify claims against code.** Don't trust comments, variable names, or old docs. Read the actual logic.
3. **Flag contradictions.** If old docs say one thing and code does another, note it in Known Gaps.
4. **Ask the user.** Code explains "what" and "how", but rarely "why" or "what's next". Use `AskUserQuestion` frequently.
5. **Run parallel exploration agents** for large codebases. One per journey or domain. Merge findings.

## Output Structure

```
docs/
├── mission.md
├── tech-stack.md
├── roadmap.md
├── {domain-1}.md
├── {domain-2}.md
└── README.md          # Index of all docs

specs/
├── {journey-1}/
│   ├── plan.md
│   ├── requirements.md
│   └── validation.md
├── {journey-2}/
│   └── ...
└── ...
```
