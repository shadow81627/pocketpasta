# Coding Standards

Rules `/code-review` enforces on the Standards axis. Violations are review findings, not suggestions.

Only rules tooling cannot enforce are listed here. Formatting and lint are enforced by `yarn lint` — run it before every commit.

## Principles

- SHOULD prefer the boring solution. When you find yourself explaining an abstraction, the abstraction is suspect (KISS, grug brain).
- SHOULD ship the least code that does the job. Less code is less to break, and you ain't going to need it.
- SHOULD split modules at seams where one idea ends.
- SHOULD point dependencies inward: a component reads data through the API client, not by reaching for the network itself.
- SHOULD hold the line between WET and DRY: repeat a pattern until its interface is clear, then extract one helper that replaces every copy. Duplication that drifts apart is the failure either way.

## Maintainability smells

Each is checkable by reading the diff, not the runtime.

- MUST no shotgun surgery — a change scattered across many files belongs at a seam that holds it together; one conceptual change fanned out through unrelated files means the abstraction is missing, so land it behind one module or component instead.
- MUST no catch-all error handling — a broad `catch` that swallows, logs-and-continues, or re-wraps without added context carries nothing; handle the error at the boundary it crosses or let it propagate.

## Single Responsibility

- One module or component, one reason to change. A component that both fetches and formats splits at the seam before it grows.
- When a module needs a sentence with "and" in it to describe itself, it is doing too much.

## JavaScript and Vue

- This repo is JavaScript. No TypeScript migration inside a ticket; add a JSDoc `@param`/`@returns` where a shape is not obvious from the code.
- `yarn lint` is the floor. An inline `eslint-disable` carries a comment naming why the rule cannot hold here.
- Vue 2 SFCs: a value derived from other state is a `computed`, not a `watch` that copies it.
- State shared across pages lives in the Vuex store (`store/`); page-local state stays in the component.

## Explicit boundaries

- Every call to the PocketPasta API goes through the shared axios client (`plugins/`), not a bare `$axios` call scattered through a component or a hardcoded host.
- A component takes data as props and emits events; it does not read another component's internals.

## Runtime validation

- MUST validate input arriving from outside the app before acting on it: route query and params, form payloads, `localStorage` and cookie reads, anything from the API that the UI trusts structurally. This repo carries no schema library, so a hand-written guard function is the expected shape — parse, then use; never trust the shape because a comment says so.

## Errors

- SHOULD errors say what broke and what to do about it. "That page is already published. Unpublish it first."
- SHOULD a skip branch (`if (x === undefined) return`) carries a comment naming what the absence means — a silent early return on the critical path reads as a bug when it fires.
- MUST an API failure the user would notice surfaces to the user; a swallowed rejection that leaves a spinner running fails review.

## Commits and PRs

- MUST commits follow Conventional Commits (`feat(scope):`, `fix:`, `docs:`, `chore:`). Subject under 72 characters (50 the style target); body carries the why, only when it isn't obvious.
- SHOULD read the branch name before every commit: a commit on `factory/*` joins that ticket's PR, not the base branch.
- SHOULD `--amend` only a commit that has not been pushed yet; once the remote has it, land the correction as a follow-up commit.
- MUST a commit aborted by a hook is re-run as a fresh `git commit`; never `--amend` after an abort — HEAD never advanced, so the amend renames the previous commit.
- SHOULD PR bodies state what changed and why in plain sentences — no restating the diff.
- MUST no throat-clearing or signposting in agent prose: "Great question", "it's worth noting", "in summary", transitions that announce the next topic. Start at the point.
- MUST a sentence that carries no fact, step, reason, or decision gets cut (deletion test).
- MUST review comments quote the offending line before judging it, and the judgment names the fix.
- MUST no contrast formulas ("not X, it's Y", "not just X") and no self-answered questions. State it directly.
- SHOULD comments and prose be terse and technical, no adjectives.

## File size

- Components and modules stay under 250 lines. Hard stop at 300. `pages/shoppinglist.vue` (527 lines) and `pages/recipes/_id/index.vue` (352) already exceed it — split by responsibility when you next change them, not as a drive-by.
- Rationale: agents digest a whole file per read; longer files force partial reads and lose context.
- Data-only files are exempt (seed data, fixtures, i18n strings).

## Tests

- MUST every behaviour change lands with the strongest check this repo can run today: `yarn lint`, and the codecept E2E suite in `test/e2e` for a flow it already covers. There is no unit runner, so a change no suite can reach names that gap in the PR body rather than claiming it was verified.
- SHOULD tests cite the ticket or acceptance criteria they guard.
- Assert behaviour through the user-visible surface (a page, a rendered list), not component internals.
