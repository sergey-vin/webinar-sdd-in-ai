# Prompt: Repair Broken SDD Structure

## Instructions for AI Agent

You are fixing a codebase that has SDD files (docs/ and specs/) but they were created with structural problems. This prompt guides you through identifying and fixing common issues that arise during initial SDD retrofit.

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

- **Checklists** (`[x]`/`[ ]`) — these belong in specs/, not docs/
- **Phase trackers** ("Phase 1 done, Phase 2 in progress") — these are roadmap/spec items
- **Feature changelogs** ("Added X in commit Y") — these are spec history, not conventions
- **Planned items** ("TODO: implement Z") — these go in specs/

For each violation found: extract the spec content into the appropriate `specs/*/plan.md`, keep only the convention/architecture content in docs/.

### Check specs/ for docs content

Scan every file in `specs/` for these red flags:

- **Architecture constraints** ("all tables must have tenant_id") — these belong in docs/
- **Component usage rules** ("use STATUS_COLORS from sessionColors.ts") — these belong in docs/
- **Data model conventions** ("field is `is_done`, not `completed`") — these belong in docs/

For each violation: extract the convention content into `docs/`, keep only the feature journey in specs/.

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

## Output

After repair, the structure should satisfy:

- [ ] Every `docs/` file contains only conventions, architecture, or constitution — no checklists
- [ ] Every `specs/` file contains only feature journeys — no architecture constraints
- [ ] No meta-trackers exist
- [ ] Roadmap sections link to specs, not phase numbers
- [ ] Spec folders have domain prefixes where applicable
- [ ] Every database table maps to at least one spec (Table → Spec Index)
- [ ] All cross-references are valid (no broken links)
- [ ] CLAUDE.md / project instructions updated with new paths
