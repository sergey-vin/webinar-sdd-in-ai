# Prompt: Repair Broken SDD Structure

## Instructions for AI Agent

You are fixing a codebase that has SDD files (docs/ and specs/) but they were created with structural problems. This prompt guides you through identifying and fixing common issues that arise during initial SDD retrofit.

Before making any changes, read the [Core Principles](../README.md#core-principles) — especially "Specs are sealed records", "References flow from docs/ to specs/", and "Don't reorganize for category purity".

## When to use this

After `03-retrofit-audit.md` has been run and the user has reviewed the output. Common triggers:

- "docs/ and specs/ feel mixed up"
- "some specs are just trackers pointing to other specs"
- "phase numbers don't make sense"
- "I can't find where feature X is documented"
- "some tables have no documentation"

## Step 1: Audit the separation

### Check docs/ for spec content

Scan every file in `docs/` for these red flags:

- **Orphaned checklists** (`[x]`/`[ ]`) that have **no corresponding spec** — these need a spec created for them, OR (if cross-cutting) a parallel tracker
- **Phase trackers** ("Phase 1 done, Phase 2 in progress") that **don't link to specs** — these need spec links added
- **Feature changelogs** ("Added X in commit Y") — these are spec history, not conventions
- **Planned items** ("TODO: implement Z") that have **no spec tracking them** — these need a spec

**Exceptions:**
- A roadmap file in docs/ that uses checklists but links to specs is fine — it's a navigation document, not a spec. Don't move it.
- A [parallel tracker](../README.md#parallel-trackers) under `docs/trackers/` that uses checklists where each row links to a spec is also fine — it's an index of a cross-cutting initiative.

For each violation found, decide:
- **Single-feature work** → create or extend the appropriate `specs/*/plan.md` to cover the orphaned content, then replace the docs/ checklist with a link to that spec
- **Cross-cutting initiative** (touches 2+ specs, stakeholder-reportable as a milestone) → promote to a parallel tracker at `docs/trackers/{initiative}.md`, distribute the actual items into matching spec `plan.md`s, and link from both ends

### Check docs/ for misplaced shared content

Look for shared component docs, reuse rules, or cross-domain conventions buried inside a domain-specific folder (e.g., `docs/trainer/components/` for components used by trainer + subscriber + generic views). These should live in a domain-neutral location like `docs/components/` so all module developers can find them.

For each misplaced shared doc:
1. `git mv` it to the domain-neutral location
2. Create an index (e.g., `docs/components/README.md`) with a reuse-first rule
3. Update cross-references in docs/README.md, CLAUDE.md, and any linking files
4. If code duplication exists because the docs were hidden, create a spec to track the migration (don't fix code during a docs pass)

### Check specs/ for docs content that docs/ is missing

Scan every file in `specs/` and note any architecture constraints, component usage rules, or data model conventions that **also need to exist in docs/** as living rules. But:

- **Do NOT remove the content from specs/** — specs are sealed.
- **Do add** the convention to the appropriate docs/ file if it's not already there.
- **Optionally** add a "See also" link in docs/ pointing to the spec where the decision was originally made.

## Step 2: Eliminate meta-trackers

A meta-tracker is a spec that:
- Has no unique content (just links to other specs)
- Groups features that already have their own specs
- Uses generic names like "Platform MVP" or "Core Features"

For each meta-tracker found:
1. Check if it has any unique content not covered by other specs
2. Move unique content to the appropriate spec
3. Move planned items to the roadmap or appropriate spec's "Planned" section
4. **Decide:** is the bundle a genuine cross-cutting initiative (security push, accuracy improvements, code-quality sweep) that stakeholders need to report on as a milestone? If yes, **don't just delete** — promote it to a [parallel tracker](../README.md#parallel-trackers) at `docs/trackers/{initiative}.md`. The tracker is the legitimate home for a cross-cutting bundle; it's in `docs/`, not `specs/`, and it's honest about being an index rather than pretending to be a feature.
5. If the bundle has no genuine cross-cutting purpose (it really was just a wrapper around existing specs), delete the meta-tracker
6. Update docs/README.md index — add the new tracker to its "Parallel trackers" section if you promoted one

## Step 3: Fix roadmap structure

The roadmap is a **navigation document** — it tells you what shipped and what's planned, linking to specs for details. It should NOT duplicate spec content.

### Shipped section: chronological timeline

Organize shipped work by **time period** (month/quarter), not by spec. Multiple specs developed in the same period appear together. Each item is a **1-line user-facing summary** linking to its spec.

**Before (wrong — per-spec sections with implementation details):**
```markdown
### Phase 4: Trainer SaaS MVP (Mar 2026) [x]
- [x] Trainer profile editor with slug-based URLs
- [x] biz_trainer_profiles table with RLS
- [x] Public directory with JSON-LD, OG tags
- [x] get_trainer_stats RPC
```

**After (right — chronological, high-level, linked):**
```markdown
### Mar–Apr 2026

- [x] [Trainer Profile](../specs/trainer-profile/plan.md): profile editor, public directory with search, SEO, verification badge
- [x] [Availability](../specs/trainer-availability/plan.md): drag-to-paint weekly grid, date overrides, multi-city
- [x] [Sessions](../specs/trainer-sessions/plan.md): trainer calendar, session lifecycle, client sessions view
```

Rules for shipped items:
- **User-facing value only** — no table names, RPCs, RLS policies, migration files
- **One line per spec** — the spec has the details, the roadmap has the summary
- **Milestone markers** on the time period heading when all specs in that period are complete

### Partially shipped specs

Use `[~]` when a spec has shipped items AND planned items remaining:

```markdown
### Client Tracking (Apr 2026) [~]

Schema and trainee-facing UI shipped for all four; trainer-side views not yet built:

- [x] [Homework](../specs/trainer-homework/plan.md): trainee checklist with done/not-done, due dates
- [x] [Weight](../specs/trainer-weight/plan.md): weight logging with trend chart
```

### Planned section: flat priority order

Planned items go in a **single flat section** ordered by priority. No phases, no timelines, no sub-checklists. Each item is one line linking to its spec.

**Before (wrong — phases with nested details):**
```markdown
### Phase 7: Payments (Q3 2026)
- [ ] Stripe checkout integration
- [ ] Webhook handling for payment confirmation
- [ ] Email receipt templates
- [ ] Refund logic with partial amounts
```

**After (right — flat, priority-ordered, linked):**
```markdown
## Planned

Priority order. Details in linked specs.

- [ ] [Client pays trainer](../specs/billing-payments/plan.md) — Stripe checkout during booking, refunds, email receipts
- [ ] [SEO Phase 2-5](../specs/seo/plan.md) — feature landing pages, local SEO, content marketing
- [ ] [Rentier enhancements](../specs/rentier-property/plan.md) — CSV export, projected vs actual charts
```

### What NOT to put in the roadmap

- **Schema details**: table names, column definitions, RLS policies
- **Implementation details**: RPCs, cron jobs, migration steps
- **Duplicated spec content**: if the spec has a detailed plan, don't repeat it — link to it
- **Time estimates for planned work**: planned items have priority order, not dates

## Step 4: Add domain prefixes

Check spec folder names. If multiple specs belong to the same domain but have no prefix:

```
specs/booking/           →  specs/trainer-booking/
specs/availability/      →  specs/trainer-availability/
specs/sessions/          →  specs/trainer-sessions/
```

Use `git mv` to rename. Update all cross-references in:
- docs/README.md
- docs/roadmap.md
- Other specs that link to renamed specs
- CLAUDE.md / project instructions

## Step 5: Table-driven gap analysis

### Build the complete table list

Query the database (or scan migrations) for all application tables.

### Map each table to its spec

For each table, determine:
1. **Which spec covers it?** (grep in `specs/`)
2. **Does application code reference it?** (grep in `src/`)
3. **What commit created it?** (git log on the migration file)
4. **What else was in that commit?** (git show --stat)

### Classify findings

| Status | Action |
|--------|--------|
| Table has spec + code | ✅ Nothing to do |
| Table has spec, no code | Mark as `[ ]` in spec with note "schema exists, zero code" |
| Table has code, no spec | **Create or extend a spec** |
| Table has no spec, no code | Note as aspirational in an existing spec's "Planned" section |

### Create the Table → Spec Index

Add to `docs/README.md`:

```markdown
## Table → Spec Index

| Table | Spec | Code? | Notes |
|-------|------|-------|-------|
| users | user-onboarding | ✅ | |
| reviews | trainer-booking | ❌ | Schema only |
```

## Step 6: Verify cross-references

After all moves/renames, check for broken links:

```bash
# Find all markdown links and verify targets exist
grep -r '\[.*\](.*\.md)' docs/ specs/ | # extract links
# Check each target file exists
```

Also check:
- CLAUDE.md / project instruction files for stale paths
- README.md for stale paths
- Roadmap links to deleted/renamed specs

## Step 7: Check spec completeness

For each spec, verify:

1. **Does plan.md cover the full journey?** Both sides (e.g., trainer creates + trainee views), not just one
2. **Are all DB tables mentioned?** Cross-check with table index
3. **Are shipped items really shipped?** Verify `[x]` items against code
4. **Are planned items honest?** Don't mark schema-only features as shipped
5. **Does the spec name match the journey?** "billing-payments" should cover the full billing journey, not just the internal invoice tool

## Common mistakes to fix

### "Billing" spec that only covers internal invoicing
Split into the actual payment journeys: internal invoicing (shipped), client checkout (planned), platform monetization (planned).

### Removing shipped spec because "it's done"
Shipped specs stay. They're the permanent record. Convention docs may be extracted, but the spec remains.

### Feature spec that's actually a screen spec
"Dashboard" is not a journey. "Track my progress" is. Reorganize around what the user is trying to accomplish.

### Mixing multiple features in one spec
If a spec covers profile + booking + sessions + calendar, it's too broad. Split into separate specs, one per feature journey.

### Shared components buried in a domain folder

If shared UI components (used across multiple domains) are documented inside a domain-specific folder like `docs/trainer/components/`, they're invisible to anyone working on other modules — and people will duplicate them instead of reusing them.

Fix: move shared component docs to a domain-neutral location like `docs/components/`. Create an index (`docs/components/README.md`) with the rule: "check here before building new UI." If duplicated implementations already exist (e.g., status colors copy-pasted across 4 files), don't fix the code during a docs pass — create a spec (e.g., `specs/design-consistency/plan.md`) tracking the migration as planned work.

### Gutting specs to "fix" separation
Replacing a spec's "Decisions Visible in Code" section with a link to docs/ destroys the sealed record. The correct fix is to ensure docs/ also has the convention — the spec keeps its original content unchanged.

### Moving files for category purity
Moving `docs/roadmap.md` → `specs/roadmap.md` just because it has checklists creates churn with no value if the roadmap already links to specs. Only move files when the content is genuinely misplaced and the move improves discoverability.

## Output

After repair, the structure should satisfy:

- [ ] Every `docs/` file contains only conventions, architecture, constitution, or parallel trackers — no **orphaned** checklists (roadmap and `docs/trackers/` checklists that link to specs are fine)
- [ ] Every convention visible in specs/ is **also** captured in the appropriate docs/ file (specs stay untouched)
- [ ] No meta-trackers exist in `specs/`; cross-cutting bundles that earn their keep live as parallel trackers in `docs/trackers/`
- [ ] Roadmap shipped section is chronological with high-level user-facing summaries (no RPCs/tables/schema)
- [ ] Roadmap planned section is a flat priority-ordered list linking to specs
- [ ] Shared component docs live in a domain-neutral location, not buried under a single domain
- [ ] Spec folders have domain prefixes where applicable
- [ ] Every database table maps to at least one spec (Table → Spec Index)
- [ ] Parallel trackers (if any) are listed in `docs/README.md`, and their items link to the spec where the work lives
- [ ] All cross-references are valid (no broken links)
- [ ] CLAUDE.md / project instructions updated with new paths
