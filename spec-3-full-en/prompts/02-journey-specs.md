# Prompt: Create Journey Specs

## Instructions for AI Agent

You are creating spec files for a user journey. Read the [Core Principles](../README.md#core-principles) first — especially "Specs are sealed records". Each journey gets a directory under `specs/` with up to 3 files:

```
specs/{domain}-{feature}/
├── plan.md            # What's done, what's not
├── requirements.md    # Scope, decisions, gaps
└── validation.md      # How to verify it works
```

## Before writing anything

1. Read `docs/mission.md` and `docs/roadmap.md` to understand context
2. Identify the next unspecified journey from the roadmap
3. Use `AskUserQuestion` to clarify:
   - What is the user trying to accomplish? (The "job to be done")
   - What are the key steps in this journey?
   - What decisions have already been made? What was rejected and why?
   - Are there edge cases or known issues?
   - What's explicitly excluded from this journey? (Non-goals for the MVP)
   - What should the QA team check to verify this works?

## Critical rules

### Journeys, not modules

A journey is what the **user** does, not how the **code** is structured.

- BAD: "Chat feature", "Payment module", "Auth system"
- GOOD: "Agree and book" (user negotiates via chat, then pays to lock the deal)

A single journey often touches multiple technical modules. That's fine — the spec describes the user's experience, and links to convention docs for patterns.

### Domain prefixes

Prefix spec folders with their domain to group related features:

```
specs/trainer-booking/         # not specs/booking/
specs/trainer-availability/    # not specs/availability/
specs/user-onboarding/         # platform-wide, prefixed by concern
```

### One spec per feature

Every feature has exactly one spec. Don't create meta-trackers that just link to other specs. If "Platform MVP" is a checklist of "profile done, sessions done, booking done" — that's not a spec, it's the roadmap.

### Table-driven completeness

After creating a spec, check all database tables the feature touches. Every table should map to at least one spec. If you find a table with no spec, either add it to an existing spec or flag it as a gap.

### Aspirational schemas

A database table with zero application code is not a shipped feature. Don't mark it `[x]`. Document it as planned: `- [ ] Reviews — biz_reviews table exists (schema only, zero UI)`.

## File structure

### plan.md

```markdown
# Journey Name — Plan

## Journey Overview

One paragraph: what this journey is about.

## {High-Level Goal 1} [x]

- [x] Completed task with enough detail to understand scope
- [x] Another completed task

## {High-Level Goal 2} [ ]

- [ ] Planned but not yet implemented
- [ ] Another planned item
```

Rules:

- `[x]` = implemented and verified in code
- `[ ]` = planned but not yet built
- Group tasks by user goals, not technical layers
- Section headers get `[x]` if all items are done, `[ ]` if any remain

### requirements.md

```markdown
# Journey Name — Requirements

## Decisions Visible in Code

- **Decision name** — what was decided, why, what the alternative was

## Known Gaps

- Gap description (what's missing or broken)
```

Rules:

- Decisions capture the "why", not just the "what"
- Known Gaps are honest — don't hide problems
- Link to convention docs in `docs/` for patterns — don't duplicate content

### validation.md

```markdown
# Journey Name — Validation

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## {Feature} — QA Scenarios

### Prerequisites

What setup is needed before testing.

### 1. {Happy path scenario}

1. Step 1
2. Step 2

- [ ] Expected result
```

## After creating files

- Cross-check plan.md items against requirements.md decisions
- Ensure validation.md covers every item in plan.md
- Update `docs/roadmap.md` — add a link from the roadmap section to this spec
- Check: does every database table this feature touches have a spec? Update the Table → Spec Index in `docs/README.md`
- If this feature contributes to a cross-cutting initiative already tracked under `docs/trackers/` (e.g., security hardening, accuracy improvements), add the relevant `plan.md` items there with a link back to your spec — and annotate the items in your `plan.md` with `tracked in [trackers/X.md]`. See [Core Principles → Parallel trackers](../README.md#parallel-trackers).
