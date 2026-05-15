# Prompt: Create Journey Specs

## Instructions for AI Agent

You are creating spec files for a user journey. Each journey gets a directory under `specs/` with 3 files:

```
specs/YYYY-MM-feature-name/
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

## Critical rule: Journeys, not modules

A journey is what the **user** does, not how the **code** is structured.

- BAD: "Chat feature", "Payment module", "Auth system"
- GOOD: "Agree and book" (user negotiates via chat, then pays to lock the deal)

A single journey often touches multiple technical modules. That's fine — the spec describes the user's experience, and links to technical docs for implementation details.

## File structure

### plan.md

```markdown
# Journey Name — Plan

User goal: **One sentence describing what the user wants to achieve.**

## High-Level Goal 1

- [x] Completed task
- [x] Another completed task
- [ ] Planned but not implemented

## High-Level Goal 2

- [x] ...
```

Rules:

- `[x]` = implemented and verified in code
- `[ ]` = planned but not yet built
- Group tasks by high-level goals, not by technical layer
- First line after title: user goal in bold

### requirements.md

```markdown
# Journey Name — Requirements

## User Story

> As a [persona], I want to [action] so that [outcome].

## Scope

One paragraph defining the boundary of this journey.

## Non-Goals

- What this journey deliberately does NOT cover
- Features users might expect but are excluded from MVP

## Implementation Details

- Feature A: [docs/feature-a.md](../docs/feature-a.md)
- Feature B: [docs/feature-b.md](../docs/feature-b.md)

## Decisions

- **Decision name** — what was decided and why
- **Another decision** — context for the choice

## Known Gaps

- Gap description (what's missing or broken)

## Rejected Alternatives

- **Alternative** — why it was rejected
```

Rules:

- User stories use the persona names from `mission.md`
- Implementation Details links to existing docs — don't duplicate content
- Decisions capture the "why", not just the "what"
- Known Gaps are honest — don't hide problems
- NOT YET IMPLEMENTED items get explicit markers

### validation.md

```markdown
# Journey Name — Validation

## Acceptance Criteria

- [ ] High-level check 1
- [ ] High-level check 2

---

## Feature — QA Scenarios

### Prerequisites

What setup is needed before testing.

### 1. Scenario name

1. Step 1
2. Step 2

- [ ] Expected result
- [ ] Another check
```

Rules:

- Top section: acceptance criteria (what a PM would check)
- Bottom section: detailed QA scenarios (what a tester would follow)
- Include prerequisites (test accounts, data setup)
- Include edge cases and error scenarios
- Mark critical bugs explicitly

## After creating files

- Cross-check plan.md items against requirements.md decisions
- Ensure validation.md covers every item in plan.md
- Update `docs/roadmap.md` if the journey reveals new phases or gaps
- Update `docs/mission.md` or `docs/tech-stack.md` if new context emerged
