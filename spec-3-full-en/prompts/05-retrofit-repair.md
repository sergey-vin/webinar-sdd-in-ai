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

- **Orphaned checklists** (`[x]`/`[ ]`) that have **no corresponding spec** — these need a spec created for them
- **Phase trackers** ("Phase 1 done, Phase 2 in progress") that **don't link to specs** — these need spec links added
- **Feature changelogs** ("Added X in commit Y") — these are spec history, not conventions
- **Planned items** ("TODO: implement Z") that have **no spec tracking them** — these need a spec

**Exception:** A roadmap file in docs/ that uses checklists but links to specs is fine — it's a navigation document, not a spec. Don't move it.

For each violation found: create or extend the appropriate `specs/*/plan.md` to cover the orphaned content, then replace the docs/ checklist with a link to that spec.

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
4. Delete the meta-tracker
5. Update docs/README.md index

## Step 3: Fix roadmap phase numbers

Replace arbitrary phase numbers with spec links:

**Before:**
```markdown
### Phase 4: Trainer SaaS MVP (Mar 2026) [x]
- [x] Trainer profile
- [x] Availability editor
```

**After:**
```markdown
### [Trainer Profile & Directory](../specs/trainer-profile/plan.md) (Mar 2026) [x]
- [x] Trainer profile editor
- [x] Public directory with search

### [Trainer Availability](../specs/trainer-availability/plan.md) (Mar 2026) [x]
- [x] Weekly grid editor
- [x] Specific-date overrides
```

If a roadmap section covers multiple specs, split it. Each section should link to exactly one spec.

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

### Gutting specs to "fix" separation
Replacing a spec's "Decisions Visible in Code" section with a link to docs/ destroys the sealed record. The correct fix is to ensure docs/ also has the convention — the spec keeps its original content unchanged.

### Moving files for category purity
Moving `docs/roadmap.md` → `specs/roadmap.md` just because it has checklists creates churn with no value if the roadmap already links to specs. Only move files when the content is genuinely misplaced and the move improves discoverability.

## Output

After repair, the structure should satisfy:

- [ ] Every `docs/` file contains only conventions, architecture, or constitution — no **orphaned** checklists (roadmap checklists that link to specs are fine)
- [ ] Every convention visible in specs/ is **also** captured in the appropriate docs/ file (specs stay untouched)
- [ ] No meta-trackers exist
- [ ] Roadmap sections link to specs, not phase numbers
- [ ] Spec folders have domain prefixes where applicable
- [ ] Every database table maps to at least one spec (Table → Spec Index)
- [ ] All cross-references are valid (no broken links)
- [ ] CLAUDE.md / project instructions updated with new paths
