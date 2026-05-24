# Prompt: Create SDD Constitution

## Instructions for AI Agent

You are creating the SDD (Spec-Driven Development) constitution for a project. Read the [Core Principles](../README.md#core-principles) first. This consists of 3 files in the `docs/` directory:

1. **`mission.md`** — What this project is, who it's for, and why it exists
2. **`tech-stack.md`** — What technologies are used and how they connect
3. **`roadmap.md`** — What's been built and what's planned

Constitution lives in `docs/` — it's about the project's identity, not feature tracking.

## Before writing anything

Use `AskUserQuestion` to clarify:

### For mission.md

- What does this product do in one sentence?
- Who are the primary users/personas? (2-4 roles)
- What problem does it solve? Why can't users just use existing solutions?
- What's the business model? (Who pays, for what?)
- Any core principles or constraints? (e.g., "mobile-first", "offline-capable", "only service provider pays, using rev-share, client pays nothing")
- What does this product deliberately NOT do? What's excluded from the MVP? (e.g., "no web version", "no real-time tracking", "no multi-language support")

### For tech-stack.md

- What's the frontend? (Framework, state management, key libraries)
- What's the backend? (Framework, database, ORM, auth)
- What's the infrastructure? (Hosting, CI/CD, monitoring)
- Any important architectural decisions? (Why X over Y?)

### For roadmap.md

- What features are already shipped? (Group chronologically — by month/quarter)
- What's planned next? (Upcoming features, in priority order — no phase numbers)
- Are there known gaps in existing features?
- What features have been explicitly ruled out? (Not "not yet" but "not ever" or "not for MVP")

## File structure

Use the templates in `templates/` as starting points. Key rules:

- **mission.md** opens with What/Why in plain language. No jargon. A non-technical stakeholder should understand it.
- **tech-stack.md** lists technologies with one-line descriptions. Links to detailed docs where they exist. Includes key architectural decisions at the bottom.
- **roadmap.md** has two sections: **Shipped** (chronological timeline by time period, each item a 1-line user-facing summary linking to its spec, `[x]` for complete milestones, `[~]` for partial) and **Planned** (flat priority-ordered list, one line per item linking to its spec). No phase numbers, no implementation details (RPCs, tables, schema), no duplication of spec content.

## After creating files

- Re-read all 3 files and check for internal consistency
- Ensure mission.md personas match the roadmap features
- Ensure tech-stack.md covers everything mentioned in roadmap
- Ask the user to review before moving to journey specs
