// Run: pnpm check:model   (Node 22.18+ strips types natively)
// Asserts the directions the post claims when moving between the six stages.
// If one of these flips, the prose is lying about the model.
import assert from "node:assert/strict";
import { metrics, type Config, type Host } from "../src/components/viz/teamModel.ts";

// Mirror of stages[].config in teamData.ts (kept inline so this file has no
// path-alias imports and runs under plain node).
const stage: Config[] = [
  { people: 10, personal: 2, shared: 0, host: "laptop" },
  { people: 10, personal: 2, shared: 0, host: "laptop" },
  { people: 10, personal: 1.5, shared: 1, host: "channel" },
  { people: 8, personal: 1, shared: 3, host: "cloud", reviewTooling: true },
  { people: 4, personal: 2, shared: 0, host: "platform" },
  { people: 4, personal: 1.5, shared: 5, host: "platform", reviewTooling: true },
];
const by = (c: Config) => Object.fromEntries(metrics(c).map((m) => [m.id, m.value]));
const s = stage.map(by);

// 1 -> 2: shared prompts move nothing.
assert.deepEqual(s[1], s[0], "stage 2 must equal stage 1");
// 2 -> 3: one channel agent halves context tax and makes some work visible.
assert(s[2].contextTax < s[1].contextTax / 1.9, "channel agent roughly halves context tax");
assert(s[2].visibility > 0 && s[1].visibility === 0, "channel agent is the first visible work");
// 3 -> 4: the sandbox collapses permission surface and makes everything visible; review tooling cuts load.
assert(s[3].blastRadius < s[2].blastRadius / 3, "sandbox collapses permission surface");
assert.equal(Math.round(s[3].visibility), 100, "every session in the workspace is visible");
assert(s[3].verification < s[2].verification, "review tooling cuts verification load");
// 4 -> 5: the pod alone makes every pair lossy again and hides work again (audit-only).
const pairs = (c: Config) => (c.people * (c.people - 1)) / 2;
assert(s[4].contextTax / pairs(stage[4]) > s[3].contextTax / pairs(stage[3]), "pod without shared agents: every pair lossy again");
assert(s[4].contextTax < s[3].contextTax, "…but fewer people means fewer paths in absolute terms");
assert(s[4].visibility < s[3].visibility, "platform audit log is not a shop floor");
// 5 -> 6: shared agents on the platform fix both, at a verification cost.
assert(s[5].contextTax < s[4].contextTax, "shared agents cut the pod's context tax");
assert(s[5].visibility > s[4].visibility, "shared agents make the pod's work visible");
assert(s[5].blastRadius <= s[4].blastRadius + 5, "shared agents add only scoped identities");
// The honest trade-off: a tiny pod with many shared agents pays more per person.
assert(
  by({ people: 2, personal: 0, shared: 6, host: "platform" }).verification > s[5].verification,
  "verification concentrates on tiny pods",
);

// Bars stay in range for every corner of the space.
for (const people of [2, 12])
  for (const personal of [0, 4])
    for (const shared of [0, 6])
      for (const host of ["laptop", "channel", "cloud", "platform"] as Host[])
        for (const m of metrics({ people, personal, shared, host }))
          assert(m.norm >= 0 && m.norm <= 1.0001, `${m.id} out of range at ${people}/${personal}/${shared}/${host}`);

console.log("ok");
