# AGENTS.md

## What this repo is

The PocketPasta web frontend: a Nuxt 2 / Vue 2 app that reads recipes, products, the shopping list
and notes from the PocketPasta API (`pocketpasta-api`). `API_URL` (default
`https://api.pocketpasta.com`) names the API per environment.

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues, via the `gh` CLI. Read `docs/agents/issue-tracker.md` before any tracker write — sub-issues, dependencies, and label swaps all have gotchas it documents.

### Triage labels

Default five canonical roles, label strings as-is. See `docs/agents/triage-labels.md`. The factory's stage labels are the pipeline state machine — exactly one per open ticket, transition = remove old + add new.

### Factory

The ticket pipeline lives in the private repo https://github.com/shadow81627/factory. It drives this repo from outside a checkout: a clone in its workspace, a ticket branch, commits and a draft PR. This repo keeps the governance layer below and no pipeline code.

### Harness side

`opencode.json` holds harness model policy and the watcher read-exclusion list. After editing it, grep `~/.local/share/opencode/log/opencode.log` for `normalization diagnostic` — opencode reports deprecated config keys there and nowhere else.

### Domain docs

Single-context: root `GLOSSARY.md` + `docs/adr/`. See `docs/agents/domain.md`.

## Build commands

Yarn 3 (`packageManager`/`.yarnrc.yml`), Node 14+. Scripts live in `package.json`:

- `yarn install` — dependencies (Yarn 3 PnP is off; `node_modules` is real).
- `yarn dev` — dev server on `:3000`.
- `yarn lint` — ESLint over `.js` and `.vue`. The only static gate in this repo today.
- `yarn test` — the codecept E2E suite in `test/e2e`, which needs a running app and the API. There is no unit runner yet, so most changes land with no automated check; say that plainly in the PR body.
- `yarn build` / `yarn generate` — production build and static generate.

The app is Vue 2 (`vuetify` 2, `@nuxtjs/auth` 4). Do not introduce Vue 3 or Nuxt 3 APIs.

## Token optimization

The read-exclusion list lives in one place: `watcher.ignore` in `opencode.json`. The watcher drops
those from file-change events; read the list there rather than duplicating it here. Binary assets
(images, PDFs, fonts) are also never read into a session — they aren't a watcher glob, so they stay
noted here.

Package queries: `yarn npm info <pkg> --fields version` — never the full metadata dump.

Prefer `grep` over reading whole files when hunting for one symbol. Read only the line ranges you
need.

Remote HTML/XML (docs sites, sitemaps): `curl` to a file, then grep it — `webfetch` dumps the whole body into context.

## Coding standards

`CODING_STANDARDS.md` at the repo root is binding on all agent output. Read it before writing code or docs; `/code-review` enforces it.
