# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for file-backed bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments,blockedBy`. The last comment is often the close comment — hunt a resolution in `.comments[].body`, not `[-1].body`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters. The default page is 30 issues and this tracker holds far more — pass `--limit`.
- **Make an issue a sub-issue of a parent**: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>` afterwards (`gh` 2.94+). Older `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>` (database id, as in **Blocking** below). Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Comment on an issue**: `gh issue comment <number> --body "..."`.
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`. Labels **accumulate**: `--add-label` never removes. A stage transition passes both in one call: `gh issue edit <n> --remove-label "<old-stage>" --add-label "<new-stage>"` — two separate calls expose a double-labelled ticket in between.
- **Close**: `gh issue close <number> --comment "..."`.
- **Body edits**: read the section back after `gh issue edit <number> --body-file <file>` — an identical body exits 0, so an edit that changed nothing looks like success.

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Legacy labels

The tracker predates the triage vocabulary in `docs/agents/triage-labels.md`: issues filed 2019–2022 carry `bug`, `enhancement`, `dependencies`, `released` and friends. Those are descriptive, not state. A legacy issue becomes factory-ready only once it carries a triage label from the table and a body stating acceptance criteria.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents: `gh pr view <n> --comments`, `gh pr diff <n>` to read; `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close` to act.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above. Take the ticket, its parent, and its blockers; sibling issues cost a fetch each and rarely bear on the ticket in hand.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's native issue dependencies. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric database id (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, not the `#number`). A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children, drop any with an open blocker or an assignee; first in map order wins. Verify each row against `gh api repos/<owner>/<repo>/issues/<n> --jq .issue_dependencies_summary.blocked_by`, which counts open blockers only.
- **Claim**: `gh issue edit <n> --add-assignee @me`, the session's first write.
- **Research dispatch**: hand the child this contract (the agent calls the Skill tool with "research" first): findings as one file `docs/research/<slug>.md`; throwaway branch `research/<slug>` off the base branch, commit only that file, push, **no PR, never merged**, check the checkout back before finishing; resolve with a comment carrying the one-line gist plus branch link, then `gh issue close <n>`; the map's Decisions-so-far is the main session's to edit.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer to the map's Decisions-so-far.
