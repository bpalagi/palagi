/**
 * Illustrative model of how a team's human/agent arrangement moves four
 * metrics. Not a measurement. Every constant is a stated assumption; the
 * point is the *direction* each stage pushes each bar, and the sources the
 * directions come from (see the post for citations).
 *
 * ponytail: linear toy model. Replace constants with measured data from a
 * real team (hand-off counts, review minutes, credential inventory) before
 * quoting any number.
 */

/** Where agent sessions run. Decides scoping and who can see the work. */
export type Host = "laptop" | "channel" | "cloud" | "platform";

export type Config = {
  /** Humans on the team. */
  people: number;
  /** Average personal agents per person. */
  personal: number;
  /** Team-owned shared agents (team identity, team-visible sessions). */
  shared: number;
  host: Host;
  /** Guided review, artifacts, previews: reading agent output is tooled. */
  reviewTooling?: boolean;
};

export type Metric = {
  id: "contextTax" | "verification" | "blastRadius" | "visibility";
  label: string;
  value: number;
  unit: string;
  /** 0..1 for bar width. */
  norm: number;
  higherIsBetter: boolean;
  why: string;
};

// Assumptions (all illustrative):
const SHARED_OUTPUT = 3; // a shared agent works for the whole team, ~3x one personal agent's output
const UNSCOPED_WEIGHT = 3; // a laptop agent carries its owner's full access; a sandboxed/gatewayed one is scoped
const TOOLED_REVIEW = 0.6; // guided review + artifacts cut validation effort

const MAX = { people: 12, personal: 4, shared: 6 };

// How visible a *personal* agent's session is to the rest of the team, by host.
const PERSONAL_VISIBILITY: Record<Host, number> = {
  laptop: 0,
  channel: 0, // personal agents are still on laptops; only the channel agent is visible
  cloud: 1, // every session is in the shared workspace
  platform: 0.5, // audit-logged, not read
};

export function metrics(c: Config): Metric[] {
  const P = c.people;
  const A = c.personal;
  const S = c.shared;
  const scoped = c.host === "cloud" || c.host === "platform";

  // Karayev's "context tax": every human pair is a potential lossy hand-off.
  // A shared agent everyone can talk to removes the relay for the work it owns.
  const pairs = (P * (P - 1)) / 2;
  const contextTax = pairs / (1 + S);
  const contextTaxMax = (MAX.people * (MAX.people - 1)) / 2;

  // Brozovich's verification tax: 10x faster to write, 3x harder to validate.
  // Personal output lands on its owner; shared output is spread across the team.
  const verification = (A + (SHARED_OUTPUT * S) / P) * (c.reviewTooling ? TOOLED_REVIEW : 1);
  const verificationMax = MAX.personal + (SHARED_OUTPUT * MAX.shared) / 2;

  // Karayev's "agents don't belong on laptops" + Brozovich's gateway.
  const blastRadius = P * A * (scoped ? 1 : UNSCOPED_WEIGHT) + S;
  const blastRadiusMax = MAX.people * MAX.personal * UNSCOPED_WEIGHT + MAX.shared;

  // "Work with the door open" + the four governance questions.
  const total = P * A + SHARED_OUTPUT * S;
  const visible = P * A * PERSONAL_VISIBILITY[c.host] + SHARED_OUTPUT * S;
  const visibility = total === 0 ? 0 : visible / total;

  return [
    {
      id: "contextTax",
      label: "Context tax",
      value: contextTax,
      unit: "lossy hand-off paths",
      norm: contextTax / contextTaxMax,
      higherIsBetter: false,
      why: "Human pairs that relay agent output by hand, divided by shared agents that remove the relay.",
    },
    {
      id: "verification",
      label: "Verification load",
      value: verification,
      unit: "agent outputs / person",
      norm: verification / verificationMax,
      higherIsBetter: false,
      why: "Personal output lands on its owner; shared output is spread across the team; review tooling discounts both.",
    },
    {
      id: "blastRadius",
      label: "Permission surface",
      value: blastRadius,
      unit: "weighted credentials",
      norm: blastRadius / blastRadiusMax,
      higherIsBetter: false,
      why: "A laptop agent carries its owner's full access (×3); sandboxed or gatewayed agents count once.",
    },
    {
      id: "visibility",
      label: "Visible & auditable",
      value: visibility * 100,
      unit: "% of agent work",
      norm: visibility,
      higherIsBetter: true,
      why: "Share of agent work the team can read: shared agents always, personal agents only when sessions live in a shared workspace (or half, when only audit-logged).",
    },
  ];
}
