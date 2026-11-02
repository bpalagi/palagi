import { ringPositions, stanceLabel, type Scenario, type Stance } from "./teamData";

const stanceFill: Record<Stance, string> = {
  swarm: "var(--accent)",
  curious: "var(--ink-2)",
  skeptic: "var(--ink-3)",
};

type Props = { scenario: Scenario; className?: string };

/**
 * Deterministic 2D diagram of an arrangement. People sit on a ring; the
 * centrepiece changes with the stage: nothing, a shared doc, a channel, a
 * sandbox, a platform, or a platform with a shared-agent hub and tool tiles.
 */
export function TeamDiagramSVG({ scenario, className = "" }: Props) {
  const W = 520;
  const H = scenario.tools.length ? 560 : 500;
  const cx = W / 2;
  const cy = 250;
  const n = scenario.people.length;
  const ringR = n > 8 ? 190 : n > 6 ? 175 : 140;
  const people = ringPositions(n, ringR);
  const host = scenario.config.host;
  const structure = scenario.id;
  const onLaptops = host === "laptop" || host === "channel";
  const inCloud = host === "cloud";
  const onPlatform = host === "platform";
  const lossy = scenario.sharedAgents.length === 0;
  const hubR = structure === "workspace" ? 40 : 42;
  const shared = ringPositions(scenario.sharedAgents.length, scenario.sharedAgents.length === 1 ? 0 : hubR);

  // Personal agents in the cloud workspace sit inside the box, not by their owner.
  const cloudSlots = inCloud
    ? ringPositions(scenario.people.reduce((s, p) => s + p.agents, 0), 62)
    : [];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${scenario.title}: ${scenario.headline}`}
      className={`h-auto w-full ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <title>{scenario.title}</title>

      {/* Platform + gateway */}
      {onPlatform && (
        <g>
          <polygon
            points={hexagon(cx, cy, ringR + 40)}
            fill="var(--rule)"
            opacity={0.35}
            stroke="var(--rule)"
          />
          <circle
            cx={cx}
            cy={cy}
            r={ringR + 58}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.2}
            strokeDasharray="6 6"
            opacity={0.7}
          />
          <text x={cx} y={cy + ringR + 78} textAnchor="middle" fontSize={8} letterSpacing={1.5} fill="var(--accent)">
            GATEWAY · POLICY AS CODE
          </text>
        </g>
      )}

      {/* Lossy person-to-person hand-offs whenever nothing shared sits between them */}
      {lossy &&
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

      {/* Shared prompts: dotted thread from the doc to each person */}
      {structure === "prompts" &&
        people.map((p, i) => (
          <line
            key={`doc-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + p.x * 0.85}
            y2={cy + p.y * 0.85}
            stroke="var(--agent)"
            strokeWidth={0.8}
            strokeDasharray="1.5 4"
            opacity={0.5}
          />
        ))}

      {/* Spokes from the centre to each person */}
      {!lossy &&
        people.map((p, i) => (
          <line
            key={`spoke-${i}`}
            x1={cx}
            y1={cy}
            x2={cx + p.x}
            y2={cy + p.y}
            stroke="var(--shared)"
            strokeWidth={1.5}
            opacity={0.5}
          />
        ))}

      {/* Centrepieces */}
      {structure === "prompts" && (
        <g>
          <rect x={cx - 26} y={cy - 34} width={52} height={68} rx={3} fill="var(--paper)" stroke="var(--rule)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={cx - 17} y={cy - 22 + i * 14} width={[34, 26, 30][i]} height={4} rx={1} fill="var(--agent)" opacity={0.6} />
          ))}
          <text x={cx} y={cy + 50} textAnchor="middle" fontSize={8} letterSpacing={1.5} fill="var(--agent)">
            AGENTS.MD
          </text>
        </g>
      )}
      {structure === "channel" && (
        <g>
          <rect x={cx - 80} y={cy - 40} width={160} height={80} rx={12} fill="var(--paper)" stroke="var(--rule)" />
          <text x={cx - 68} y={cy - 24} fontSize={9} fill="var(--ink-3)">
            #team-channel
          </text>
        </g>
      )}
      {structure === "workspace" && (
        <g>
          <rect x={cx - 92} y={cy - 92} width={184} height={184} rx={6} fill="var(--agent)" opacity={0.08} />
          <rect x={cx - 92} y={cy - 92} width={184} height={184} rx={6} fill="none" stroke="var(--agent)" strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
          <text x={cx} y={cy - 100} textAnchor="middle" fontSize={8} letterSpacing={1.5} fill="var(--agent)">
            CLOUD SANDBOX · ALLOW-LISTED EGRESS
          </text>
        </g>
      )}
      {structure === "platform-shared" && (
        <g>
          <circle cx={cx} cy={cy} r={70} fill="var(--shared)" opacity={0.1} />
          <circle cx={cx} cy={cy} r={70} fill="none" stroke="var(--shared)" strokeWidth={1} opacity={0.5} />
          <text x={cx} y={cy + 92} textAnchor="middle" fontSize={9} letterSpacing={1.5} fill="var(--shared)">
            SHARED AGENTS
          </text>
        </g>
      )}

      {/* Shared / centre agents */}
      {shared.map((s, i) => {
        const a = scenario.sharedAgents[i];
        return (
          <g key={a.id}>
            <polygon points={diamond(cx + s.x, cy + s.y, 9)} fill="var(--shared)" />
            <text x={cx + s.x} y={cy + s.y + 19} textAnchor="middle" fontSize={8} fill="var(--ink-2)">
              {a.name}
            </text>
          </g>
        );
      })}

      {/* Personal agents inside the sandbox */}
      {inCloud &&
        cloudSlots.map((o, k) => (
          <circle key={`c-${k}`} cx={cx + o.x} cy={cy + o.y} r={3.2} fill="var(--agent)" />
        ))}

      {/* People, laptops, personal agents */}
      {people.map((pos, i) => {
        const person = scenario.people[i];
        const px = cx + pos.x;
        const py = cy + pos.y;
        // laptop sits inside the ring, toward the centre
        const lx = cx + pos.x * ((ringR - 30) / ringR);
        const ly = cy + pos.y * ((ringR - 30) / ringR);
        const anchorX = onLaptops ? lx : px;
        const anchorY = onLaptops ? ly : py;
        const orbitR = onLaptops ? 14 : 22;
        const orbit = inCloud ? [] : ringPositions(person.agents, orbitR);
        return (
          <g key={person.id}>
            {onLaptops && (
              <rect x={lx - 7} y={ly - 5} width={14} height={10} rx={1.5} fill="var(--ink)" opacity={0.8} />
            )}
            {orbit.length > 0 && (
              <circle cx={anchorX} cy={anchorY} r={orbitR} fill="none" stroke="var(--agent)" strokeWidth={0.75} opacity={0.35} />
            )}
            <g
              style={{
                transformOrigin: `${anchorX}px ${anchorY}px`,
                animation: `spin ${14 + (i % 4) * 3}s linear infinite`,
                animationDirection: i % 2 ? "reverse" : "normal",
              }}
            >
              {orbit.map((o, k) => (
                <circle key={k} cx={anchorX + o.x} cy={anchorY + o.y} r={3.2} fill="var(--agent)" />
              ))}
            </g>
            <circle cx={px} cy={py} r={11} fill={stanceFill[person.stance]} stroke="var(--paper)" strokeWidth={2}>
              <title>
                {person.name} · {person.role} · {stanceLabel[person.stance]} · {person.agents} personal agent
                {person.agents === 1 ? "" : "s"}
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
            const m = scenario.tools.length;
            const tx = cx + (i - (m - 1) / 2) * 90;
            const ty = H - 40;
            return (
              <g key={t}>
                <line x1={cx} y1={cy + 70} x2={tx} y2={ty - 14} stroke="var(--shared)" strokeWidth={1} opacity={0.35} />
                <rect x={tx - 36} y={ty - 14} width={72} height={26} rx={4} fill="var(--paper-2)" stroke="var(--rule)" />
                <text x={tx} y={ty + 4} textAnchor="middle" fontSize={9} fill="var(--ink-2)">
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

function hexagon(x: number, y: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${x + Math.cos(a) * r},${y + Math.sin(a) * r}`;
  }).join(" ");
}
