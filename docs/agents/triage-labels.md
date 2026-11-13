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

Stage labels are state, not triage: a ticket carries exactly one at a time. The enforced copy of this vocabulary is `STAGE_LABELS` in the factory repo's `.agents/stages.ts`, and its target check fails when this table drifts from it. Editing this table changes the state machine — the factory's copy changes with it.

The in-flight stages — `spec-drafting`, `implementing`, `in-review` — are the **active stages**: a ticket carries one only while a factory run is live, and a ticket sitting in one stops the batch rather than being resumed on a guess.

The factory's batch runs only tickets labelled `ready-for-agent` with no stage label and no open blocker. A ticket carrying two stage labels, or sitting in an active stage with no live shift, is refused; the factory's `pnpm run factory:recover` clears stranded labels. That script lives in the factory repo, not here.

The pin label `needs-grill` is not a stage: it forces the spec soft gate to park in `needs-spec-approval` regardless of spec confidence, so a live grilling session can take over.

## Priority labels

The queue runs the highest tier first, and the oldest ticket first inside a tier. A ticket with no priority label is tier 3.

| Label        | Meaning                                            |
| ------------ | -------------------------------------------------- |
| `priority:1` | Next. The queue runs it before anything else.      |
| `priority:2` | Ahead of the default.                              |
| `priority:3` | Default, equivalent to carrying no priority label. |

A malformed or doubled priority label stops the batch, the same way a doubled stage label does.
