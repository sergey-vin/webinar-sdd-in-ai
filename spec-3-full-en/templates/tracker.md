# Tracker — {Initiative Name}

**Parallel tracker** (see [README.md → Parallel trackers](../README.md#parallel-trackers)). Cross-cutting {initiative type} initiative spanning multiple features. Each item links to the spec where the work landed (`[x]`) or is queued (`[ ]`), or to the roadmap parking lot for ideas not yet committed.

<!-- One-sentence statement of why this tracker exists. Examples:
- "This doc lets a stakeholder report 'security milestone X achieved' without waiting for every Planned item in every feature spec to close."
- "This doc indexes the per-cost-tier cut of accuracy work so prioritisation is reviewable in one place."
- "This doc tracks the Q3 2026 modernization push — what shipped, what slipped — independently of each feature spec's Planned list."
-->

Convention:
- `[x]` — shipped (link points at the spec's Shipped section, the file where it lives, or the commit)
- `[~]` — partial (link points at the spec; gap is documented in the spec's Planned section)
- `[ ]` — planned (link points at the spec's Planned section or the roadmap parking lot)

<!-- Optional: if items group naturally (e.g., by phase, cost tier, OWASP category, severity), use H2 sections.
Otherwise a single flat list under "## Initiative items" is fine. -->

---

## {Group 1 — e.g., "Authentication" or "Zero-cost ideas" or "Phase 1"}

<!-- Optional group description: 1-2 sentences on what this slice covers. -->

- [x] **Item name** — short description — [specs/{feature}/plan.md](../../specs/{feature}/plan.md) "{matching item from plan.md}"
- [ ] **Item name** — short description — [specs/{feature}/plan.md](../../specs/{feature}/plan.md) "{matching item}"
- [ ] **Item name** — short description — [roadmap.md Parking lot](../roadmap.md#parking-lot) "{matching parking-lot entry}"

## {Group 2}

- [x] ...
- [ ] ...

---

## How to update this tracker

- When a `[ ]` item ships, flip to `[x]` and repoint the link at the spec's Shipped section (or the commit / file).
- When a new item surfaces, add a `[ ]` line, route it to the matching spec's Planned section (or roadmap parking lot if not yet committed), and link it here. Annotate the spec's item with `tracked in [trackers/{this-file}.md]` so the cross-reference is visible from both ends.
- Never delete items — closed ones stay as historical evidence of what changed and why.

<!-- Rules:
- Each item links to where the actual work is recorded — the tracker is an index, not the source of truth
- Specs stay the source of truth for the work; this file stays the source of truth for the *initiative* roll-up
- Group items only when grouping helps stakeholders read the state (don't invent groups for purity)
- Closed-scope initiatives (defined deliverables) and open-scope menus (growing idea lists) both fit this shape
-->
