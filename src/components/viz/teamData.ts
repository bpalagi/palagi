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

export type Scenario = {
  id: "today" | "tomorrow";
  label: string;
  headline: string;
  caption: string;
  people: Person[];
  sharedAgents: SharedAgent[];
  tools: string[];
};

export const today: Scenario = {
  id: "today",
  label: "Today's team",
  headline: "10 people, each with their own agent(s)",
  caption:
    "Some run swarms, some are skeptics. Every hand-off between people is a lossy translation: one person's “generate a doc” becomes the next person's “summarize this doc.”",
  people: [
    { id: "p1", name: "Ava", role: "Staff eng", agents: 5, stance: "swarm" },
    { id: "p2", name: "Ben", role: "Backend", agents: 2, stance: "curious" },
    { id: "p3", name: "Cass", role: "Frontend", agents: 0, stance: "skeptic" },
    { id: "p4", name: "Dev", role: "SRE", agents: 3, stance: "curious" },
    { id: "p5", name: "Eli", role: "Backend", agents: 6, stance: "swarm" },
    { id: "p6", name: "Fay", role: "QA", agents: 1, stance: "curious" },
    { id: "p7", name: "Gus", role: "Data", agents: 0, stance: "skeptic" },
    { id: "p8", name: "Hana", role: "PM", agents: 2, stance: "curious" },
    { id: "p9", name: "Ivan", role: "Security", agents: 0, stance: "skeptic" },
    { id: "p10", name: "Jo", role: "Manager", agents: 1, stance: "curious" },
  ],
  sharedAgents: [],
  tools: [],
};

export const tomorrow: Scenario = {
  id: "tomorrow",
  label: "Tomorrow's team",
  headline: "4 people, a pool of robust shared agents",
  caption:
    "Personal agents still exist, but the team's real leverage is a shared pool everyone trusts, living in the tools the team already uses: Slack code channels, Jira conversations, GitHub, Kubernetes, docs.",
  people: [
    { id: "p1", name: "Ava", role: "Expert generalist", agents: 2, stance: "swarm" },
    { id: "p2", name: "Cass", role: "Expert generalist", agents: 1, stance: "curious" },
    { id: "p3", name: "Dev", role: "Expert generalist", agents: 2, stance: "curious" },
    { id: "p4", name: "Ivan", role: "Expert generalist", agents: 1, stance: "curious" },
  ],
  sharedAgents: [
    { id: "s1", name: "Reviewer", tools: ["GitHub"] },
    { id: "s2", name: "Triage", tools: ["Slack", "Jira"] },
    { id: "s3", name: "Docs", tools: ["Docs", "Slack"] },
    { id: "s4", name: "Release", tools: ["GitHub", "Kubernetes"] },
    { id: "s5", name: "On-call", tools: ["Kubernetes", "Slack"] },
  ],
  tools: ["Slack", "Jira", "GitHub", "Kubernetes", "Docs"],
};

export const scenarios = { today, tomorrow } as const;

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
