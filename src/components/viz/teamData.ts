import { type Config } from "./teamModel";

export type Stance = "swarm" | "curious" | "skeptic";

export type Person = {
  id: string;
  name: string;
  role: string;
  /** Number of personal agents this person runs. */
  agents: number;
  stance: Stance;
};

export type SharedAgent = {
  id: string;
  name: string;
  /** Which tool surfaces this agent lives in. */
  tools: string[];
};

/** What sits at the centre of the team. Drives both the 2D and 3D scenes. */
export type Structure =
  | "laptops" // 1: nothing shared
  | "prompts" // 2: a shared AGENTS.md, agents still on laptops
  | "channel" // 3: one channel agent everyone can tag
  | "workspace" // 4: cloud sandbox, every session visible
  | "platform" // 5: pod on a governed platform, personal agents
  | "platform-shared"; // 6: platform + team-owned shared agents + tool surfaces

export type Stage = {
  n: number;
  id: Structure;
  title: string;
  owner: string;
  host: string;
  examples: string;
  /** One sentence: what pushes a team here. */
  push: string;
  /** One sentence: what pushes a team on. */
  cost: string;
  config: Config;
};

export type Scenario = Stage & {
  headline: string;
  people: Person[];
  sharedAgents: SharedAgent[];
  tools: string[];
};

export const MAX_PEOPLE = 12;
export const MAX_PERSONAL = 6;
export const MAX_SHARED = 6;

export const stages: Stage[] = [
  {
    n: 1,
    id: "laptops",
    title: "Solo copilot on a laptop",
    owner: "Person",
    host: "Laptop",
    examples: "Claude Code, Cursor, Copilot",
    push: "Agents started working around Christmas 2025 and needed nobody's permission.",
    cost: "Every hand-off is a lossy relay; every agent carries its owner's full access; nobody can see any of it.",
    config: { people: 10, personal: 2, shared: 0, host: "laptop" },
  },
  {
    n: 2,
    id: "prompts",
    title: "Solo copilot with shared prompts",
    owner: "Person",
    host: "Laptop",
    examples: "Team plans, a shared AGENTS.md, a skills folder",
    push: "The first team reflex: if we share the prompts we will share the agent.",
    cost: "A 23.8-point spread from the harness alone says the prompt is not the agent. Nothing moves.",
    config: { people: 10, personal: 2, shared: 0, host: "laptop" },
  },
  {
    n: 3,
    id: "channel",
    title: "The channel agent",
    owner: "Team",
    host: "Channel",
    examples: "Claude Tag, Viktor, Shopify's River",
    push: "Put one agent where the team already talks, and let anyone tag it.",
    cost: "Work happens off the channel, and a second person in the session raises the permission question.",
    config: { people: 10, personal: 1.5, shared: 1, host: "channel" },
  },
  {
    n: 4,
    id: "workspace",
    title: "The shared session workspace",
    owner: "Team",
    host: "Cloud sandbox",
    examples: "Superconductor, Buzz",
    push: "Move every session to the cloud so anyone can take the wheel and reviewers can read it.",
    cost: "Another surface, and coding-shaped. The session lives in their workspace, not yours.",
    config: { people: 8, personal: 1, shared: 3, host: "cloud", reviewTooling: true },
  },
  {
    n: 5,
    id: "platform",
    title: "Pod plus platform",
    owner: "Person, on an org platform",
    host: "Platform",
    examples: "Brozovich's Model C",
    push: "At ten pods, ten auth systems. Shared runtime, identity, observability; policy at the gateway.",
    cost: "The agents are still personal. The platform is an audit trail, not a shop floor.",
    config: { people: 4, personal: 2, shared: 0, host: "platform" },
  },
  {
    n: 6,
    id: "platform-shared",
    title: "Pod, platform, and shared agents",
    owner: "Team, on an org platform",
    host: "Platform, channel, workspace, cluster",
    examples: "Built by a platform team, today",
    push: "Agents the team builds, scopes and trusts together, with a team identity and a team attention policy.",
    cost: "Verification concentrates and trust has to be earned; this stage borrows its answers from 3 and 4.",
    config: { people: 4, personal: 1.5, shared: 5, host: "platform", reviewTooling: true },
  },
];

// Fixed roster so the same person keeps the same name/stance across stages.
const ROSTER: Array<Omit<Person, "agents">> = [
  { id: "p1", name: "Ava", role: "Staff eng", stance: "swarm" },
  { id: "p2", name: "Ben", role: "Backend", stance: "curious" },
  { id: "p3", name: "Cass", role: "Frontend", stance: "skeptic" },
  { id: "p4", name: "Dev", role: "SRE", stance: "curious" },
  { id: "p5", name: "Eli", role: "Backend", stance: "swarm" },
  { id: "p6", name: "Fay", role: "QA", stance: "curious" },
  { id: "p7", name: "Gus", role: "Data", stance: "skeptic" },
  { id: "p8", name: "Hana", role: "PM", stance: "curious" },
  { id: "p9", name: "Ivan", role: "Security", stance: "skeptic" },
  { id: "p10", name: "Jo", role: "Manager", stance: "curious" },
  { id: "p11", name: "Kai", role: "Mobile", stance: "curious" },
  { id: "p12", name: "Lena", role: "Platform", stance: "swarm" },
];

// Shared agents in the order a team tends to adopt them.
const SHARED_POOL: SharedAgent[] = [
  { id: "s1", name: "Reviewer", tools: ["GitHub"] },
  { id: "s2", name: "Triage", tools: ["Slack", "Jira"] },
  { id: "s3", name: "Docs", tools: ["Docs", "Slack"] },
  { id: "s4", name: "Release", tools: ["GitHub", "Kubernetes"] },
  { id: "s5", name: "On-call", tools: ["Kubernetes", "Slack"] },
  { id: "s6", name: "Chief of staff", tools: ["Slack", "Jira"] },
];

// Stage-specific naming for the centre agents.
const CENTRE_NAMES: Partial<Record<Structure, string[]>> = {
  channel: ["@channel"],
  workspace: ["Session A", "Session B", "Session C"],
};

// The four who make up the pod in stages 5 and 6: two former swarm-runners, two former skeptics.
const POD = ["p1", "p3", "p4", "p9"];

const STANCE_MULT: Record<Stance, number> = { swarm: 2.2, curious: 0.8, skeptic: 0 };

export function buildScenario(stage: Stage): Scenario {
  const c = stage.config;
  const pod = c.host === "platform";
  const roster = pod ? ROSTER.filter((p) => POD.includes(p.id)) : ROSTER;
  const people = roster.slice(0, c.people).map((p) => ({
    ...p,
    role: pod ? "Expert generalist" : p.role,
    agents: Math.min(MAX_PERSONAL, Math.round(c.personal * STANCE_MULT[p.stance])),
  }));
  const names = CENTRE_NAMES[stage.id];
  const sharedAgents = SHARED_POOL.slice(0, c.shared).map((a, i) =>
    names ? { ...a, name: names[i] ?? a.name, tools: [] } : a,
  );
  const tools = [...new Set(sharedAgents.flatMap((a) => a.tools))];
  const s = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
  return {
    ...stage,
    headline: `${s(c.people, "person").replace("persons", "people")} · ${s(c.shared, "shared agent")}`,
    people,
    sharedAgents,
    tools,
  };
}

export const stanceLabel: Record<Stance, string> = {
  swarm: "Runs an agent swarm",
  curious: "Uses agents sometimes",
  skeptic: "AI skeptic",
};

/** Positions on a ring, starting from the top, clockwise. */
export function ringPositions(n: number, radius: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: Math.cos(a) * radius, y: Math.sin(a) * radius, angle: a };
  });
}
