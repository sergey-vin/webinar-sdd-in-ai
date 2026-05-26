# Spec-Driven Development (SDD)

A lightweight framework for keeping product specs, convention docs, and code in sync — especially useful when working with AI coding agents.

## Why

Without specs, AI agents hallucinate features, misunderstand scope, and produce code that doesn't fit. Without code-verified specs, documentation drifts from reality. SDD solves both: specs drive development, code verifies specs.

## Two Directories

```
docs/                          # Conventions, architecture, "how to build here"
├── mission.md                 #   WHO are the users, WHY does this exist
├── tech-stack.md              #   WHAT technologies, HOW they connect
├── roadmap.md                 #   WHEN — shipped features + upcoming work
├── README.md                  #   Index + Table → Spec mapping
├── architecture/              #   Non-negotiable constraints
│   ├── multi-tenancy.md       #     (one per architectural domain)
│   └── ...
├── design-system.md           #   Tokens, typography, component patterns
├── components/README.md       #   Shared UI component index (domain-neutral)
├── trackers/                  #   Cross-cutting initiative trackers (see Core Principles)
│   ├── security-hardening.md  #     (one per cross-cutting initiative)
│   └── ...
└── {domain}/README.md         #   Data model conventions, query patterns

specs/                         # Journey specs, "what was/will be built"
├── {domain}-{feature}/
│   ├── plan.md                #   Checklist: what's done [x], what's not [ ]
│   ├── requirements.md        #   Scope, decisions, known gaps
│   └── validation.md          #   Acceptance criteria + QA test scenarios
├── {domain}-{feature-2}/
│   └── ...
└── ...
```

### docs/ — Conventions & Architecture

The project's identity and rules. Answers: what is this, who is it for, what tech do we use, and how do we build here.

**Constitution** (`mission.md`, `tech-stack.md`, `roadmap.md`): rarely changes, defines the project's identity.

**Architecture** (`architecture/*.md`): non-negotiable system constraints — multi-tenancy model, routing, security. "How it works."

**Conventions** (`design-system.md`, `{domain}/README.md`): data model conventions, component patterns, query patterns. "How to build here." These emerge from shipped features when patterns become reusable.

**Shared components** (`components/README.md`): index of reusable UI components used across multiple domains. Domain-neutral — don't bury shared component docs inside a single domain folder. Rule: check here before building new UI.

**Key rule:** docs/ describes **constraints and patterns**. It does NOT track what's shipped/planned — that's specs/.

### specs/ — Journey Specs

One directory per **user journey** — not per technical module. A "chat screen" is not a feature; it's a tool used across multiple journeys (negotiation, support, dispute resolution).

Each journey has up to 3 files:

- **plan.md** — Checklist of tasks grouped by high-level goals. `[x]` done, `[ ]` todo. The permanent record of what was built.
- **requirements.md** — Scope, decisions, known gaps. Links to convention docs.
- **validation.md** — Acceptance criteria + detailed QA test scenarios.

Shipped specs stay as specs — they don't "graduate" to docs/. A fully-shipped spec is still the record of what was built and why. Convention docs may be extracted from it, but the spec remains.

### Domain Prefixes

Prefix spec folders with their domain to group related features:

```
specs/
├── trainer-booking/           # Trainer domain
├── trainer-availability/
├── trainer-sessions/
├── trainer-homework/
├── user-onboarding/           # Platform-wide (no prefix needed)
├── billing-payments/
└── on-account/                # Separate product
```

### Table → Spec Index

Maintain a mapping in `docs/README.md` of every database table to its spec. This is the integrity check — every table must have at least one spec. Tables without specs are undocumented features. Update this index when adding tables or specs.

## Workflow

### New project (greenfield)

1. **Constitution** — Run `prompts/01-constitution.md` to create mission, tech-stack, roadmap
2. **Journey specs** — Run `prompts/02-journey-specs.md` for each journey in the roadmap
3. **Build** — Use specs to guide development
4. **Verify** — Run `prompts/04-verify-specs.md` after implementation to catch drift

### Existing project (brownfield)

1. **Audit** — Run `prompts/03-retrofit-audit.md` to extract SDD from existing code
2. **Review** — Fix any inaccuracies the audit missed
3. **Repair** — Run `prompts/05-retrofit-repair.md` to fix structural issues
4. **Continue** — Use `prompts/02-journey-specs.md` for new features going forward

## Core Principles

### Specs are sealed records

Once a spec is shipped (`[x]`), its content is frozen — it documents what was decided and built at that point in time. Don't rewrite, gut, or "clean up" shipped specs.

- **Never remove content from a spec** to move it elsewhere. The decisions in `requirements.md` were correct at shipping time.
- **Shipped specs stay forever.** They don't "graduate" to docs/. A fully-shipped spec is still the permanent record.
- Convention docs (docs/) may be extracted *from* a spec, but the spec itself remains unchanged.

### References flow from docs/ to specs/

Architecture docs (docs/) are living documents that evolve. Specs are frozen. Therefore:

- **docs/ cites specs/**: A living doc may reference a spec as "origin of this pattern" or "see also". Correct — the doc evolves, the spec stays.
- **specs/ links to docs/**: A spec may link to convention docs for shared patterns at writing time. Fine, but the spec is never updated to chase doc changes.
- **Never rewrite a spec** to replace its content with a link to docs/. That destroys the sealed record.

### Roadmap lives in docs/

The roadmap (`docs/roadmap.md`) is a **navigation document**, not a spec. It uses checklists (`[x]`/`[ ]`) but links to specs for detail. This is the one place checklists are allowed in docs/ — because it's a table of contents, not a feature tracker. Don't move it to specs/.

### Don't reorganize for category purity

Only move files when the move improves discoverability. Moving `docs/roadmap.md` → `specs/roadmap.md` because "it has checklists" inflates the git diff with no added value. The test: does the move help someone find the file? If not, skip it.

### Parallel trackers

Some initiatives are **cross-cutting**: they touch multiple feature specs (e.g. "code quality", "accuracy improvements", "security hardening", "UX consistency"). A stakeholder asking "is the security milestone done?" doesn't want to read seven `specs/*/plan.md` files and mentally union the relevant `[ ]` items — they want one page.

A **parallel tracker** is a `docs/` file (conventionally under `docs/trackers/`) that indexes a cross-cutting initiative. It is not a spec, and it is not the same as the meta-tracker anti-pattern (see Anti-Patterns below). Rules:

- Lives in `docs/`, never `specs/`. Conventionally `docs/trackers/{initiative}.md`, kebab-case.
- Each row points to **the spec where the work lands**, or to the parking-lot entry that tracks it. The work itself stays in the spec — the tracker only indexes it.
- A row has a status (`[x]` shipped / `[~]` partial / `[ ]` planned) and a link to the canonical location.
- Closed (shipped) rows stay forever — historical evidence of what changed and why. Never delete entries.
- Each spec's own `plan.md` may include a `tracked in [trackers/X.md]` annotation on the relevant `[ ]` items so the cross-reference is visible from both ends.

**Trackers vs anti-pattern meta-trackers:** the meta-tracker anti-pattern lives in `specs/` and bundles other specs to pretend it's a feature. A parallel tracker lives in `docs/`, never claims to be a feature, and is honest about being an index.

**When to create one:** only when an initiative spans 2+ specs *and* needs to be reportable as a milestone on its own. Don't create a tracker for work that lives entirely inside one spec — the spec is already the right home.

**Initiative trackers vs menu trackers:** some trackers are *closed-scope* (a defined initiative like "Q3 2026 security push") and others are *open-scope* (a living menu like "accuracy improvements grouped by cost tier"). Both shapes are fine; the rules above apply to both.

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

## Anti-Patterns

### Meta-trackers

A spec that just links to other specs is not a spec. If "Platform MVP" is just a checklist of "profile done, sessions done, booking done" pointing to their own specs — delete it. Each feature should have exactly one spec.

If the bundle is genuinely useful — stakeholders want a cross-cutting milestone view — promote it to a [parallel tracker](#parallel-trackers) in `docs/trackers/` instead of a meta-spec in `specs/`. The distinction is location and intent: trackers in `docs/` are honest indices; trackers in `specs/` pretend to be features.

### Roadmap format

The roadmap is a navigation document, not a feature tracker. Two sections:

- **Shipped**: chronological timeline grouped by time period. Each item is a 1-line user-facing summary linking to its spec. No table names, RPCs, or schema details. Use `[x]` for complete milestones, `[~]` for partially shipped specs.
- **Planned**: flat priority-ordered list. Each item is one line linking to its spec. No phases, no timelines, no sub-checklists.

Don't duplicate spec content in the roadmap — the spec has the details, the roadmap has the summary.

### Mixing docs/ and specs/

- **Orphaned checklists** (`[x]`/`[ ]`) with no corresponding spec belong in specs/. Exception: `docs/roadmap.md` uses checklists as navigation — see [Core Principles](#roadmap-lives-in-docs).
- Architecture constraints belong in docs/, not specs/. But if a spec also documents them (as decisions made at build time), **leave the spec alone** — add the convention to docs/ as well. See [Core Principles](#specs-are-sealed-records).
- "What was shipped when" is a spec. "How to build here" is a doc.

### Gutting specs to "fix" separation

Replacing a spec's "Decisions Visible in Code" with a link to docs/ destroys the sealed record. The correct fix: ensure docs/ also has the convention. The spec keeps its original content unchanged.

### Aspirational schemas

A database table with zero application code is not a shipped feature. Don't mark it `[x]`. Document it as planned (`[ ]`) with a note: "schema exists, zero code."

### Orphan dismissal

Don't call a table "orphaned" without checking git history. It may have been created alongside other features, with clear intent. Check the commit that added it, what else was in that commit, and whether it evolved.

## Prompts

| Prompt | When to use |
|--------|-------------|
| [01-constitution.md](prompts/01-constitution.md) | Starting a new project or formalizing an existing one |
| [02-journey-specs.md](prompts/02-journey-specs.md) | Adding a new feature/journey |
| [03-retrofit-audit.md](prompts/03-retrofit-audit.md) | Existing codebase with no specs — extract from code |
| [04-verify-specs.md](prompts/04-verify-specs.md) | After implementation — verify specs match reality |
| [05-retrofit-repair.md](prompts/05-retrofit-repair.md) | Fix broken SDD structure (mixed docs/specs, wrong scoping) |

## Templates

Skeleton files with guidance comments: [templates/](templates/)
