# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

## Stage labels (factory pipeline)

The autonomous factory workflow advances tickets by swapping these labels. Each swap is paired with an issue comment at the gate.

| Stage label           | Meaning                                                 | Set by                          |
| --------------------- | ------------------------------------------------------- | ------------------------------- |
| `spec-drafting`       | Spec is being drafted by a headless harness run         | factory, after budget check     |
| `needs-spec-approval` | Parked at the soft gate — low confidence or pin label   | factory                         |
| `implementing`        | Spec approved, implementation run in progress           | factory                         |
| `in-review`           | Dual-axis review running on the implementation diff     | factory                         |
| `blocked`             | Terminal park: failure evidence in the issue comments   | factory, after one retry        |
| `over-budget`         | Terminal park: subscription window above stop threshold | factory, before any harness run |
| `hold`                | Supervisor hold: paused by hand, reported not run       | supervisor, any time            |
| `done`                | Draft PR ready for human merge                          | factory                         |

Stage labels are state, not triage: a ticket carries exactly one at a time. Editing this table changes the state machine — update the workflow vocabulary with it. The enforced copy is `STAGE_LABELS` in `.agents/stages.ts`; an edit here lands there too. `pnpm run stages:check` fails when an open ticket carries more than one stage label.

The in-flight stages — `spec-drafting`, `implementing`, `in-review` — are the **active stages** (`ACTIVE_STAGES` in `.agents/stages.ts`): a ticket carries one only while a factory run is live, and a ticket sitting in one stops the batch. When a shift is killed before its run clears the label (quota wall, crash), the ticket strands; `pnpm run factory:recover` finds those and clears each back to rest, dry-run by default (`--apply` writes), refusing while a factory shift process is live.

`pnpm run factory:batch` runs only tickets labelled `ready-for-agent` with no stage label and no open blocker (a native blocking edge with an open issue), then reports every parked ticket under its gate and every gated ticket under `Waiting on blockers:`. A ticket sitting in a stage is reported under `Problems:` and the rest of the queue still runs: that state only exists while a run is in flight, so resuming it on a guess would double-run the ticket. `hold` is the deliberate exception — a supervisor pauses a ticket with it and the batch reports it under `Parked at hold:` instead of stopping. Each `done` ticket's report row names its pull request link, that PR's state, and the drain action: merge or close an open PR, then close the ticket. The report also carries a `Done, unmerged:` count, and a `done` ticket whose only PR closed without merging returns to `ready-for-agent` with the PR named in a comment.

The pin label `needs-grill` is not a stage: it forces the spec soft gate to park in `needs-spec-approval` regardless of spec confidence, so a live grilling session can take over.

Edit the "Label in our tracker" column to match whatever vocabulary you actually use.

## Priority labels

The queue runs the highest tier first, and the oldest ticket first inside a tier. Every ticket carries a priority label from creation; `priority:3` is the default and is written out rather than left off.

| Label        | Meaning                                       |
| ------------ | --------------------------------------------- |
| `priority:1` | Next. The queue runs it before anything else. |
| `priority:2` | Ahead of the default.                         |
| `priority:3` | Default tier.                                 |

A malformed or doubled priority label stops the batch, the same way a doubled stage label does. So does a `ready-for-agent` ticket with no priority label: that means triage never picked a tier, and running it at the default would hide the miss. The batch report leads with the run order and each ticket's tier.
