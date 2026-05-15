# Prompt: Verify Specs Against Code

## Instructions for AI Agent

You are verifying that SDD specs match the actual codebase. Specs drift from reality — features get marked as done when they're not, enum values change, timing logic differs from what's documented.

## Process

### 1. Launch parallel exploration agents

For each journey in `specs/`, launch an exploration agent that:

- Reads the journey's `plan.md`, `requirements.md`, `validation.md`
- Finds the corresponding code (backend routes, frontend screens, database models)
- Verifies **every claim** in the specs against actual code

### 2. What to check

For each `[x]` item in `plan.md`:

- Does the feature actually exist in code?
- Does it work as described?

For each decision in `requirements.md`:

- Is it reflected in the code? (e.g., "charge at checkout" — check the route handler)
- Are enum values correct? (e.g., category types, status values)

For each claim in `validation.md`:

- Are the expected behaviors testable from the code?

For implementation docs (`docs/*.md`):

- Do API endpoints match route definitions?
- Do data models match migration files?
- Do flow descriptions match actual code flow?

### 3. Common inaccuracies to watch for

- **Features marked as implemented that aren't** (social login, 2FA, etc.)
- **Wrong enum values** (e.g., `premium` in docs but `pro` in code)
- **Wrong timing** (e.g., "24h after completion" but code uses "next cron run after status change")
- **Wrong flow** (e.g., "charge on confirmation" but code charges at checkout)
- **Missing security context** (e.g., "2-step email change" but only 1 step exists)
- **Admin capabilities overstated** (e.g., "admin can reopen ticket" but only close exists)

### 4. Fix inaccuracies

For each inaccuracy found:

1. Fix the spec file to match code reality
2. If it's a legitimate gap (feature should exist but doesn't), mark it as `[ ]` in plan.md and add to Known Gaps in requirements.md
3. Fix implementation docs if they contain the same error
4. Update docs/roadmap.md if the gap affects phase completion

### 5. Report format

For each journey, produce:

```
## Journey Name — Verification Report

### Verified (correct)
- Claim 1 — confirmed in file:line
- Claim 2 — confirmed in file:line

### Inaccuracies found and fixed
- Claim → What spec said → What code does → Fix applied

### Not verifiable
- Claims that couldn't be checked (e.g., timing-dependent behavior)
```

## Tips

- **Read the code, not the comments.** Comments lie. Code doesn't.
- **Check both backend and frontend.** A backend endpoint existing doesn't mean the UI calls it.
- **Check admin panel too.** Admin capabilities are often overstated in specs.
- **Run agents in parallel.** One per journey. Merge results at the end.
- **Be specific.** "Wrong enum value" is useless. "Category type `premium` in docs but `pro` in code (migration file X, line Y)" is actionable.
