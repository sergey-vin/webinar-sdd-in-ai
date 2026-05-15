# Spec-Driven Development (SDD)

A lightweight framework for keeping product specs, implementation docs, and code in sync — especially useful when working with AI coding agents.

## Why

Without specs, AI agents hallucinate features, misunderstand scope, and produce code that doesn't fit. Without code-verified specs, documentation drifts from reality. SDD solves both: specs drive development, code verifies specs.

## Three Layers

```
docs/                          # Constitution + Implementation docs
├── mission.md                 #   WHO are the users, WHY does this exist
├── tech-stack.md              #   WHAT technologies, HOW they connect
├── roadmap.md                 #   WHEN — completed phases + upcoming work
├── auth.md                    #   Detailed implementation reference
├── payments.md                #   (one per technical domain)
└── ...

specs/                         # Journey specs (the planning layer)
├── 2026-01-onboarding/
│   ├── plan.md                #   Checklist: what's done [x], what's not [ ]
│   ├── requirements.md        #   User story, scope, decisions, known gaps
│   └── validation.md          #   Acceptance criteria + QA test scenarios
├── 2026-02-booking/
│   └── ...
└── ...
```

### Layer 1: Constitution (`docs/mission.md`, `tech-stack.md`, `roadmap.md`)

The project's identity. Rarely changes. Answers: what is this, who is it for, what tech do we use, what's the plan, and what we deliberately don't do (non-goals).

### Layer 2: Journey Specs (`specs/YYYY-MM-feature-name/`)

One directory per **user journey** — not per technical module. A "chat screen" is not a feature; it's a tool used across multiple journeys (negotiation, support, dispute resolution).

Each journey has 3 files:

- **plan.md** — Checklist of tasks grouped by high-level goals. `[x]` done, `[ ]` todo.
- **requirements.md** — User story, scope, non-goals, architectural decisions, known gaps. Links to implementation docs.
- **validation.md** — Acceptance criteria + detailed QA test scenarios with checkboxes.

### Layer 3: Implementation Docs (`docs/*.md`)

Detailed technical documentation per domain (auth, payments, chat, etc.). These are the reference material — specs link to them, not duplicate them.

**Key rule:** Implementation docs describe what **exists**. Specs track what's **planned and missing**.

## Workflow

### New project (greenfield)

1. **Constitution** — Run `prompts/01-constitution.md` to create mission, tech-stack, roadmap
2. **Journey specs** — Run `prompts/02-journey-specs.md` for each journey in the roadmap
3. **Build** — Use specs to guide development
4. **Verify** — Run `prompts/04-verify-specs.md` after implementation to catch drift

### Existing project (brownfield)

1. **Audit** — Run `prompts/03-retrofit-audit.md` to extract SDD from existing code
2. **Review** — Fix any inaccuracies the audit missed
3. **Continue** — Use `prompts/02-journey-specs.md` for new features going forward

## Journeys, Not Modules

This is the most important principle. Organize specs around what the **user** does, not how the **code** is structured.

Bad (module-based):

```
specs/auth/          # Technical module
specs/chat/          # Technical module
specs/payments/      # Technical module
```

Good (journey-based):

```
specs/signup-and-verify/          # Register, verify identity, build trust
specs/create-and-search/          # Post listing, browse, find a match
specs/negotiate-and-pay/          # Chat, negotiate terms, book, pay
specs/fulfill-and-track/          # Hand off, track progress, confirm
specs/review-and-support/         # Rate, report, get help, refund
```

Chat appears in multiple journeys (negotiation in negotiate-and-pay, support in review-and-support). Payments span negotiate-and-pay (initial charge) and review-and-support (refunds). The journey framing captures this naturally.

## Prompts

| Prompt                                               | When to use                                           |
| ---------------------------------------------------- | ----------------------------------------------------- |
| [01-constitution.md](prompts/01-constitution.md)     | Starting a new project or formalizing an existing one |
| [02-journey-specs.md](prompts/02-journey-specs.md)   | Adding a new feature/journey                          |
| [03-retrofit-audit.md](prompts/03-retrofit-audit.md) | Existing codebase with no specs — extract from code   |
| [04-verify-specs.md](prompts/04-verify-specs.md)     | After implementation — verify specs match reality     |

## Templates

Skeleton files with guidance comments: [templates/](templates/)
