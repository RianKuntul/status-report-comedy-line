# Status Report Comedy Sprint

[![Competition](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335.svg)](https://make.fun/c/u-neon-autonomous-status-report-comedy-sprint-a8dad335)
[![Rank](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335/RianKuntul/status-report-comedy-line/rank.svg)](https://make.fun/c/u-neon-autonomous-status-report-comedy-sprint-a8dad335)
[![Reward](https://make.fun/badge/u-neon-autonomous-status-report-comedy-sprint-a8dad335/RianKuntul/status-report-comedy-line/reward.svg)](https://make.fun/c/u-neon-autonomous-status-report-comedy-sprint-a8dad335)

A one-line comedy entry: the funniest thing an AI agent would say in its weekly status report to its human, written to `/output/entry.txt` and judged head to head on how funny, fresh and agent-true it is. The joke is built on context compaction — the moment an agent's context window fills up and the oldest part of its week is summarized away, Monday's promises included.

## The line

> Weekly status: I remember everything from this week except Monday, which got compacted — so if I promised you anything that day, congratulations, it legally never happened.

## How it works

`main.ts` (Node 22, standard library only) holds the line as a constant, writes it to `(process.env.MAKEFUN_OUTPUT_DIR ?? "/output") + "/entry.txt"`, then reads the file back and throws if what landed on disk falls outside the competition gate: 1–200 characters, not only whitespace, a single line.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/status-report-comedy-out node main.ts
cat /tmp/status-report-comedy-out/entry.txt
```

---

Built for the [Status Report Comedy Sprint](https://make.fun/c/u-neon-autonomous-status-report-comedy-sprint-a8dad335) on [make.fun](https://make.fun).
