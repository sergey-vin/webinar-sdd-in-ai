---
name: figma-changes
description: "NOT BUILDABLE on the current tool set — this skill declines and explains. Figma change-tracking ('what changed since I looked', 'diff against last week', 'did they address my feedback') needs REST-only version history that this MCP-only setup has no tool for. When triggered, it declines cleanly and points to figma-review for current-state review. Documents the spec for a future REST-capable version."
allowed-tools: mcp__figma__get_metadata, mcp__figma__get_screenshot
---

Load **[`ms365-fundamentals`](../ms365-fundamentals/SKILL.md)** and **[`figma-fundamentals`](../figma-fundamentals/SKILL.md)** first.

## Status: not buildable on the current tool set — read this before invoking

**Gap owner:** [unassigned] · **Review by:** [set a date — this is a tracked gap, not a permanent excuse; if it's still a stub past the date, either build the REST version or delete it and route "what changed" asks to figma-review directly].

Change-tracking ("what changed since last look") needs Figma's **version history**, which is a **REST-API-only** capability (`GET /v1/files/:key/versions`). The Figma MCP exposes **no version or diff tool**, and this skill set has **no REST mechanism** (no HTTP/curl tool in any allow-list — see figma-fundamentals). So the core capability this skill is named for **cannot be delivered here.**

Per the project's dangling-capability rule (a skill's claims must map to a granted tool, or be declared out of scope): **this skill declares itself out of scope and does not fake it.** When invoked, it says so plainly:

> "I can't track version-to-version changes yet — that needs Figma's version history over the REST API, which this setup doesn't have wired. I can review the design *as it is now* (use figma-review), or this needs a REST-capable change-tracking skill built first."

Do **not** attempt a raw HTTP call to the Figma REST API to work around this — an ungoverned request outside the keychain/proxy path is exactly what the security design forbids. A clean decline is correct.

## Why even Figma's own API makes this hard (context for whoever builds it)

Two facts shape the future skill, both from the 2026-08-31 research:

1. **There is no diff endpoint anywhere** — not in the MCP, not in the REST API. `/versions` returns only version *metadata* (`id`, `created_at`, `label`, `description`, `user`) — **no before/after content.** "What changed" must be **computed agent-side**: snapshot the file/node tree at T1, snapshot again at T2, and diff them structurally. That's real work, not a tool call.
2. **`FILE_UPDATE` webhooks are content-free pings** ("something changed, go look") — only `LIBRARY_PUBLISH` carries actual detail. So even event-driven tracking still needs the snapshot-and-diff.

## What a real figma-changes skill would require (the spec)

For whoever builds it — this is the shape, not an instruction to act now:

- **A REST-capable, read-scoped tool** (`file_versions:read`, `file_content:read`), credentialed from the keychain and gated through iron-proxy exactly like the MCP path — added to a *new* skill's allow-list, not smuggled in here.
- **Snapshot storage** — a place to persist the T1 node-tree/screenshot to diff against at T2. This is the harder-than-it-looks part, and it does not ship until these are answered: **who else can read the store; how long design content is retained (TTL); and what happens to a snapshot when the source file's access is revoked but the snapshot survives it.** Persisted design content is new data-at-rest to protect, and standing it up plus a new REST credential path is a real attack-surface expansion for a feature that has a working fallback (manual review). "Not built" is the defensible default until there is a concrete retention/access design, not just a diff-quality design.
- **A structural diff** — added/removed/moved frames, changed text, changed variables. This is the actual project, not an afterthought: real Figma files are hundreds of nested nodes, so this is closer to tree-edit-distance than a shallow compare, and "summarized not dumped" needs defined summarization rules plus a re-fetch cost model (a full node-tree pull per "what changed"). Scope it as the main work, not "add a REST tool".
- **The same untrusted-content and hidden-text rules** — a *diff* is doubly exposed: newly-added invisible text is exactly what an attacker introduces between snapshots, so the change-set is a prime injection surface, and "what's new" must flag new hidden/invisible content specifically.
- **"Did they address my feedback"** additionally needs the comment thread (also REST-only) to know what the feedback *was* — compounding the REST dependency.

## Output (when it declines)

```
Change-tracking isn't available in this setup.
Why: it needs Figma version history (REST-only); this configuration has no REST tool wired.
Instead: I can review the design as it stands now — want that? (figma-review)
Or: a REST-capable change-tracking skill needs to be built — see figma-changes for the spec.
```

Honest, specific, and points somewhere useful. Never imply a diff you can't produce.

## If someone wires REST later

This file becomes the spec for the real skill: add the REST tool + snapshot store, implement the T1/T2 structural diff, carry the hidden-text-in-the-changeset rule, and move this file from "not buildable" to a working skill with its own pending-verification gate. Until then it is a documented gap, deliberately — which is better than a skill that pretends to diff.
