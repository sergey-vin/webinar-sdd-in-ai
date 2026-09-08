---
name: connect-service
description: Onboard a new external service as a connector for the agents (Salesforce, GitHub, Zenefits, Notion, Stripe, or any other) — research whether a Microsoft/vendor/community MCP server exists and whether our licence permits using it, pick the safest client, wire its secret through the keychain (never .env), and generate a connection record plus a working skill. Also re-authenticates or rotates an already-connected service's credentials. Use this WHENEVER the user says "connect <service>", "add a connector for <service>", "can the agents read <service>", "hook up <service>", "onboard <service>", "re-auth <service>", "refresh the <service> token", or "the <service> connector stopped working / needs re-login". Operator-run, interactive: it makes network/spend decisions and stores secrets, so it asks before each irreversible step. Read-only toward the service by default.
---

## What this is

The repeatable procedure for giving the agents a new service, the safe way. It
turns "connect Salesforce" into: find out if a trustworthy MCP server exists,
confirm our licence allows it, choose the best client on security and fit, wire
the secret through the dedicated keychain (never a plaintext `.env`), write down
what was decided, and hand back a skill the agents can actually use. If no server
or client exists, it scopes the build honestly — with an environment and
token-cost estimate — and asks before spending.

It is the executable form of `adding-secret-mcps.md`
(the keychain + launch-wrapper pattern) and inherits the SOW's non-negotiables:

- **No secret in `.env`, `~/.claude.json`, a skill file, a tool result, or a
  transcript** (`sow.md` D2). Secrets live only in
  `~/Library/Keychains/agents.keychain-db`, read at launch by a wrapper.
- **Read-only toward the service by default** (`mailbox-access.md`):
  constrain capability, not just credential handling. A write-capable connector
  is a separate, explicit decision — see [When the connector can write](#when-the-connector-can-write).
- **You are the operator, not an autonomous agent.** This skill spends money
  (custom builds), reaches the network (registry/GitHub research), and stores
  live credentials. It stops and asks before each of those — it never assumes.

Two flows. Pick by what the user asked:

- **[Connect](#flow-a--connect-a-new-service)** — a service not yet wired up.
- **[Re-auth](#flow-b--re-authenticate-or-rotate)** — an existing connector whose
  login expired or whose credential needs rotating.

> **Note on `~/paperclip/`.** This skill writes its records and generated skills
> under `~/paperclip/` (the *deliverables* tree the operator owns), which is
> **not** `~/.paperclip/` (the Paperclip app's config/instances). If `~/paperclip/`
> does not exist, create it. Generated skills land in `~/paperclip/skills/<slug>/`
> and are picked up the same way the shipped skills are.

---

## Flow A — connect a new service

Work top to bottom. Each numbered step gates the next; do not skip the licence
or security check to "just get it connected."

### A1. Does a trustworthy MCP server exist? And may we use it?

Research first — do not assume. For the named service, find:

1. **Is there an MCP server?** Look, in this order of trust: an **official
   vendor** server (e.g. GitHub's own), a **Microsoft/Anthropic-maintained** one,
   then **community** servers. Search the service's docs, the MCP registry, npm,
   and GitHub.
2. **Does our licence / the vendor's terms permit programmatic access this way?**
   This is a real gate, not a formality — it is what sank the LinkedIn connector
   (`stack-decisions.md`: ToS forbids automated
   access; only the Partner API is allowed). Check the vendor's API terms and our
   own plan tier. If access is prohibited or needs an entitlement we don't have,
   **stop and report that** — do not wire up a server that breaches terms.
3. If **more than one** server exists, you are choosing — go to
   [A2](#a2-pick-the-safest-client). If **exactly one**, still run the security
   check in A2 on it. If **none**, go to [A4](#a4-no-server--build-from-the-rest-api).

Do the research with sub-agents where available (one per candidate server) so it
is parallel and each verdict is evidence-backed. Read
[`references/onboarding-detail.md`](references/onboarding-detail.md#researching-a-candidate)
for exactly what to gather per candidate.

### A2. Pick the safest client

When there is a choice, rank candidates on these axes — **security first**, not
popularity first (a 10k-star server that ships write tools in its read-only
preset is worse than a quiet one that doesn't):

| Axis | What to check | Why it matters |
|---|---|---|
| **Security** | Any supply-chain red flags (install hooks, non-registry deps, obfuscation), what its auth model is (delegated vs application/secret), whether "read-only" is real | This is the SOW. A connector is trusted with live creds (`sow.md` A.3) |
| **Auth & keychain fit** | Delegated/OAuth (no stored secret, best) vs a static `API_KEY`/`CLIENT_SECRET` (fine, goes in keychain) vs app-permissions (avoid — see the `mcp-microsoft365` review) | Determines the re-auth flow and whether a secret exists at all |
| **Client fit** | Does it run as a local **stdio** subprocess (so a keychain wrapper works and Paperclip agents inherit it), and is it registerable in Claude Code (`claude mcp add`)? | Paperclip agents run the real Claude Code CLI and inherit `~/.claude` (`plan.md`) — a stdio server registered `--scope user` reaches all of them |
| **Popularity / maintenance** | GitHub stars, release recency, open-issue health, marketplace listing | A tiebreaker among *safe* options, and a signal of whether it will still work in six months — never the primary reason |

Do a real security pass on the leading candidate, at the depth of the
`ms-365-mcp-server-review.md` — clone it, read
the auth path and the tool surface, check the dependency tree. Write the verdict
into the connection record (A5). If the safest option is still unacceptable, say
so and fall back to [A3](#a3-no-usable-client--consider-a-custom-one).

### A3. No usable client → consider a custom one

If a server *exists* but no client is safe/compatible (only an HTTP-remote one
when you need stdio, only a write-heavy one, only an abandoned one), a thin custom
client is an option — but it is a **build**, so scope it and get a yes first.
Present, before writing any code:

- **What it needs** — the language/runtime (usually a small Node or Python stdio
  shim), any SDK, whether it needs the egress proxy.
- **A token-cost estimate** — rough tokens to research the protocol, write, and
  test it (a thin stdio client is typically small; say the number).
- **The alternative** — often the REST fallback (A4) is simpler than a custom MCP
  client. Say which you recommend.

Then **stop and ask** to proceed. Detail and a skeleton in
[`references/onboarding-detail.md`](references/onboarding-detail.md#custom-mcp-client).

### A4. No server → build from the REST API

If there is no MCP server at all, but the service has a documented REST API we're
licensed to use, a minimal **read-only MCP server wrapping that REST API** is the
path — again a build, again gated:

- **What it needs** — runtime, the REST client, auth handling (the token still
  goes in the keychain via the wrapper), which read endpoints to expose.
- **Token-cost estimate** — larger than a client shim; wrapping a REST API means
  a tool per endpoint. Give a range and say it scales with how many endpoints.
- **Scope discipline** — expose **reads only** to start; every write endpoint is
  a separate decision ([When the connector can write](#when-the-connector-can-write)).

**Stop and ask** with the estimate before building. Skeleton and the endpoint→tool
mapping in [`references/onboarding-detail.md`](references/onboarding-detail.md#custom-rest-server).

### A5. Wire the secret and register

Once a client is chosen (or built), connect it via the keychain pattern — the
full, copy-pasteable recipe is `adding-secret-mcps.md`,
summarised:

1. **Store the secret** in `agents.keychain-db` with `security add-generic-password`
   + the partition-list line (or, for a browser-OAuth server, just run its
   `--login` once — no static secret to store).
2. **Wrapper script** on a PATH dir that `security find-generic-password -w`s the
   secret and `exec`s the server. Never `--env SECRET=…`.
3. **Register** `claude mcp add <service> --scope user -- <wrapper>`.
4. **Verify** no secret leaked: `grep -ri 'SECRET\|API_KEY\|TOKEN' ~/.claude.json
   ~/.claude/settings.json` returns nothing, and `claude mcp get <service>` shows
   the wrapper path with no secret in `env`.

Run the acceptance check
before calling it done.

### A6. Write the outputs

Two artefacts, both required:

**1. A connection record** at `~/paperclip/connectors/<service>.md` — what was
decided and why, so the next person (or an audit) doesn't re-derive it. Use the
template in [`references/onboarding-detail.md`](references/onboarding-detail.md#connection-record-template):
service, date, licence verdict, the client chosen and the rejected alternatives,
the security-review summary, the auth model, where the secret lives (service name
in the keychain, **never the value**), and the re-auth method (which decides
Flow B's branch).

**2. A working skill** at `~/paperclip/skills/<slug>/SKILL.md` so the agents can
actually use the connector — read-only `allowed-tools` (only the read tools;
exclude every write/delete/upload tool, as [`onedrive-research`](../onedrive-research/SKILL.md)
does), the untrusted-content and output rules every M365/Atlassian skill carries
(load [`ms365-fundamentals`](../ms365-fundamentals/SKILL.md) as the model, or
reference it), and a short tool map. Generate it, then tell the operator to review
it before assigning — a generated skill is a draft, pending the same live gate as
the rest.

---

## Flow B — re-authenticate or rotate

Use when a connector already exists and its credential expired, was rotated, or
the server reports auth failure. The record at
`~/paperclip/connectors/<service>.md` (A6) says which auth model it uses; that
decides the branch. If the record is missing, infer from how the secret is stored
(`security find-generic-password -s <service>…` present = static secret;
absent = browser/device OAuth).

### B1. Static secret (API key / client secret)

Re-prompt and overwrite in place — the wrapper reads whatever is current, so no
other change is needed:

```bash
KC="$HOME/Library/Keychains/agents.keychain-db"
security unlock-keychain -p "" "$KC"
# -U updates the existing item; prompts for the new value WITHOUT echoing it.
security add-generic-password -U -s "<service>-secret" -a agent -w -T /usr/bin/security "$KC"
# re-assert the partition list so unattended reads don't prompt (see adding-secret-mcps.md)
security set-generic-password-partition-list -S "apple-tool:,apple:" -k "" -s "<service>-secret" -a agent "$KC"
```

Prompt the operator for the value interactively (the `-w` with no argument makes
`security` read it without echo) — **never** take a secret as a chat argument, or
it lands in the transcript. Then verify with a live read tool call.

### B2. Browser / device OAuth (no static secret)

There is no password to re-enter — re-run the server's own login so it refreshes
and re-saves its token silently into its cache/keychain:

```bash
# example shape — the exact flag is per-server, recorded in the connection record
<wrapper-or-server> --login        # opens a browser or prints a device code
```

The operator completes the browser/device step; the server persists the refreshed
token itself (encrypted cache or keychain — e.g. `kb login`, or softeria's
`--login`). Confirm with `claude mcp get <service>` → Connected, then one read
call. Nothing is typed into the chat.

### B3. Confirm and record

Either branch: end with a live read to prove it works, and note the rotation date
in the connection record. Rotation must be **one step with no code or config
change** — if it isn't, the connector was wired wrong (secret baked into config
somewhere); fix that, don't paper over it.

---

## When the connector can write

Storing a secret safely does not make a write-capable connector acceptable — that
is a separate axis. Default every generated skill's `allowed-tools` to **reads
only**, and keep the server's write/delete/upload tools out of it, exactly as the
`ms-365-mcp-server` review and
[`onedrive-research`](../onedrive-research/SKILL.md) do. If the operator explicitly
wants write access, that is a deliberate decision to record in the connection
record with its risk — not a default this skill reaches for. A prompt-injected
agent with a write tool on a live service is the failure this posture exists to
prevent.

## Stop-and-ask checkpoints (the whole point)

This skill is interactive because each of these is irreversible or costs
something. Never blow past one:

- **Licence/ToS fails** (A1) → stop, report, do not connect.
- **Building a custom client or server** (A3/A4) → present env + token-cost
  estimate, get an explicit yes.
- **Storing or rotating a secret** (A5/B) → confirm the service/account names;
  never accept the secret value in chat.
- **Granting write access** → explicit operator decision, recorded.

If a step needs network research or spend and you cannot confirm it is wanted,
name what you'd do and its rough cost, then wait — the same "ask before spending"
rule every SOW-3 skill carries.
