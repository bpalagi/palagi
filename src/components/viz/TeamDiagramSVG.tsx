import {
  ringPositions,
  stanceLabel,
  type Scenario,
  type Stance,
} from "./teamData";

const stanceFill: Record<Stance, string> = {
  swarm: "var(--accent)",
  curious: "var(--ink-2)",
  skeptic: "var(--ink-3)",
};

type Props = { scenario: Scenario; className?: string };

/**
 * Deterministic 2D diagram of a team. People sit on a ring; personal agents
 * orbit each person; shared agents form a hub in the center with spokes to
 * every person and to the tool surfaces below.
 */
export function TeamDiagramSVG({ scenario, className = "" }: Props) {
  const W = 520;
  const H = scenario.tools.length ? 560 : 500;
  const cx = W / 2;
  const cy = 250;
  const ringR = scenario.people.length > 6 ? 175 : 150;
  const people = ringPositions(scenario.people.length, ringR);
  const shared = ringPositions(scenario.sharedAgents.length, 42);
  const hasHub = scenario.sharedAgents.length > 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${scenario.label}: ${scenario.headline}`}
      className={`h-auto w-full ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <title>{scenario.label}</title>

      {/* Lossy person-to-person hand-offs (only when there is no hub) */}
      {!hasHub &&
        people.map((a, i) =>
          people.slice(i + 1).map((b, j) => (
            <line
              key={`${i}-${j}`}
              x1={cx + a.x}
              y1={cy + a.y}
              x2={cx + b.x}
              y2={cy + b.y}
              stroke="var(--rule)"
              strokeWidth={1}
              strokeDasharray="3 5"
              opacity={0.7}
            />
          )),
        )}

      {/* Spokes from hub to each person */}
      {hasHub &&
        people.map((p, i) => (
          <line
            key={`spoke-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + p.x}
            y2={cy + p.y}
            stroke="var(--shared)"
            strokeWidth={1.5}
            opacity={0.55}
          />
        ))}

      {/* Shared agent hub */}
      {hasHub && (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={70}
            fill="var(--shared)"
            opacity={0.1}
          />
          <circle
            cx={cx}
            cy={cy}
            r={70}
            fill="none"
            stroke="var(--shared)"
            strokeWidth={1}
            opacity={0.5}
          />
          {shared.map((s, i) => {
            const a = scenario.sharedAgents[i];
            return (
              <g key={a.id}>
                <polygon
                  points={diamond(cx + s.x, cy + s.y, 9)}
                  fill="var(--shared)"
                />
                <text
                  x={cx + s.x}
                  y={cy + s.y + 19}
                  textAnchor="middle"
                  fontSize={8}
                  fill="var(--ink-2)"
                >
                  {a.name}
                </text>
              </g>
            );
          })}
          <text
            x={cx}
            y={cy + 92}
            textAnchor="middle"
            fontSize={9}
            letterSpacing={1.5}
            fill="var(--shared)"
          >
            SHARED AGENTS
          </text>
        </g>
      )}

      {/* People + personal agents */}
      {people.map((pos, i) => {
        const person = scenario.people[i];
        const px = cx + pos.x;
        const py = cy + pos.y;
        const orbit = ringPositions(person.agents, 22);
        return (
          <g key={person.id}>
            {person.agents > 0 && (
              <circle
                cx={px}
                cy={py}
                r={22}
                fill="none"
                stroke="var(--agent)"
                strokeWidth={0.75}
                opacity={0.35}
              />
            )}
            <g
              style={{
                transformOrigin: `${px}px ${py}px`,
                animation: `spin ${14 + (i % 4) * 3}s linear infinite`,
                animationDirection: i % 2 ? "reverse" : "normal",
              }}
            >
              {orbit.map((o, k) => (
                <circle
                  key={k}
                  cx={px + o.x}
                  cy={py + o.y}
                  r={3.2}
                  fill="var(--agent)"
                />
              ))}
            </g>
            <circle
              cx={px}
              cy={py}
              r={11}
              fill={stanceFill[person.stance]}
              stroke="var(--paper)"
              strokeWidth={2}
            >
              <title>
                {person.name} · {person.role} · {stanceLabel[person.stance]} ·{" "}
                {person.agents} personal agent{person.agents === 1 ? "" : "s"}
              </title>
            </circle>
            <text
              x={px + Math.cos(pos.angle) * 34}
              y={py + Math.sin(pos.angle) * 34 + 3}
              textAnchor="middle"
              fontSize={9}
              fill="var(--ink-2)"
            >
              {person.name}
            </text>
          </g>
        );
      })}

      {/* Tool surfaces */}
      {scenario.tools.length > 0 && (
        <g>
          {scenario.tools.map((t, i) => {
            const n = scenario.tools.length;
            const tx = cx + (i - (n - 1) / 2) * 90;
            const ty = H - 40;
            return (
              <g key={t}>
                <line
                  x1={cx}
                  y1={cy + 70}
                  x2={tx}
                  y2={ty - 14}
                  stroke="var(--shared)"
                  strokeWidth={1}
                  opacity={0.35}
                />
                <rect
                  x={tx - 36}
                  y={ty - 14}
                  width={72}
                  height={26}
                  rx={4}
                  fill="var(--paper-2)"
                  stroke="var(--rule)"
                />
                <text
                  x={tx}
                  y={ty + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fill="var(--ink-2)"
                >
                  {t}
                </text>
              </g>
            );
          })}
        </g>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function diamond(x: number, y: number, r: number) {
  return `${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`;
}
