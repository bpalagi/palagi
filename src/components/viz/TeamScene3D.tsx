"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import { ringPositions, type Scenario } from "./teamData";

const MAX_PEOPLE = 10;
const MAX_PERSONAL = 6;
const MAX_SHARED = 5;
const ORIGIN = new THREE.Vector3(0, 0, 0);

type Palette = {
  person: string;
  swarm: string;
  skeptic: string;
  agent: string;
  shared: string;
  rule: string;
  ink: string;
};

const FALLBACK_PALETTE: Palette = {
  person: "#4a443c",
  swarm: "#b5532f",
  skeptic: "#857d72",
  agent: "#2f6fb5",
  shared: "#c98a1c",
  rule: "#ddd5c8",
  ink: "#1d1a16",
};

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  return {
    person: v("--ink-2"),
    swarm: v("--accent"),
    skeptic: v("--ink-3"),
    agent: v("--agent"),
    shared: v("--shared"),
    rule: v("--rule"),
    ink: v("--ink"),
  };
}

function subscribeTheme(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => obs.disconnect();
}
// Snapshot must be referentially stable for a given theme, so key on the class.
const getThemeKey = () => document.documentElement.className;
const getThemeKeyServer = () => "";

/** Read theme colors from CSS variables so the scene matches light/dark. */
function usePalette(): Palette {
  const themeKey = useSyncExternalStore(
    subscribeTheme,
    getThemeKey,
    getThemeKeyServer,
  );
  return useMemo(
    () => (typeof window === "undefined" ? FALLBACK_PALETTE : readPalette()),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- themeKey drives re-read
    [themeKey],
  );
}

function layout(s: Scenario) {
  const ringR = s.people.length > 6 ? 3.2 : 2.2;
  const people = ringPositions(s.people.length, ringR).map((p) =>
    new THREE.Vector3(p.x, 0, p.y),
  );
  const shared = ringPositions(s.sharedAgents.length, 0.65).map(
    (p) => new THREE.Vector3(p.x, 0.15, p.y),
  );
  const tools = s.tools.map(
    (_, i) =>
      new THREE.Vector3((i - (s.tools.length - 1) / 2) * 1.15, -1.9, 1.4),
  );
  return { ringR, people, shared, tools };
}

type SceneProps = { scenario: Scenario; palette: Palette };

function Scene({ scenario, palette }: SceneProps) {
  const L = useMemo(() => layout(scenario), [scenario]);
  const peopleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const agentRefs = useRef<(THREE.Mesh | null)[][]>(
    Array.from({ length: MAX_PEOPLE }, () => []),
  );
  const sharedRefs = useRef<(THREE.Mesh | null)[]>([]);
  const hubRef = useRef<THREE.Mesh>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent lerp

    for (let i = 0; i < MAX_PEOPLE; i++) {
      const m = peopleRefs.current[i];
      if (!m) continue;
      const present = i < scenario.people.length;
      const target = present ? L.people[i] : ORIGIN;
      m.position.lerp(target, k);
      const sc = present ? 1 : 0;
      m.scale.lerp(tmp.set(sc, sc, sc), k);

      const count = present ? scenario.people[i].agents : 0;
      for (let j = 0; j < MAX_PERSONAL; j++) {
        const a = agentRefs.current[i][j];
        if (!a) continue;
        const on = j < count;
        const ang = (j / Math.max(count, 1)) * Math.PI * 2 + t * (0.9 + i * 0.07);
        const r = 0.55;
        const ax = m.position.x + Math.cos(ang) * r;
        const az = m.position.z + Math.sin(ang) * r;
        const ay = m.position.y + Math.sin(t * 1.6 + j) * 0.08;
        a.position.lerp(tmp.set(ax, ay, az), on ? Math.min(1, k * 3) : k);
        const s = on ? 1 : 0;
        a.scale.lerp(tmp.set(s, s, s), k);
      }
    }

    for (let j = 0; j < MAX_SHARED; j++) {
      const m = sharedRefs.current[j];
      if (!m) continue;
      const present = j < scenario.sharedAgents.length;
      if (present) {
        const base = L.shared[j];
        const ang = t * 0.35 + (j / scenario.sharedAgents.length) * Math.PI * 2;
        tmp.set(Math.cos(ang) * 0.65, base.y + Math.sin(t * 1.2 + j) * 0.06, Math.sin(ang) * 0.65);
        m.position.lerp(tmp, k);
      } else {
        m.position.lerp(ORIGIN, k);
      }
      const s = present ? 1 : 0;
      m.scale.lerp(tmp.set(s, s, s), k);
      m.rotation.y += dt * 0.8;
    }

    if (hubRef.current) {
      const s = scenario.sharedAgents.length ? 1 : 0;
      hubRef.current.scale.lerp(tmp.set(s, s, s), k);
      hubRef.current.rotation.z = t * 0.1;
    }
  });

  const hasHub = scenario.sharedAgents.length > 0;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} />

      {/* Ground ring for the team */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.32, 0]}>
        <ringGeometry args={[L.ringR - 0.02, L.ringR + 0.02, 96]} />
        <meshBasicMaterial color={palette.rule} transparent opacity={0.8} />
      </mesh>

      {/* Lossy hand-offs between people (today) */}
      {!hasHub &&
        L.people.map((a, i) =>
          L.people.slice(i + 1).map((b, j) => (
            <Line
              key={`${i}-${j}`}
              points={[a, b]}
              color={palette.rule}
              lineWidth={0.8}
              dashed
              dashSize={0.12}
              gapSize={0.16}
              transparent
              opacity={0.6}
            />
          )),
        )}

      {/* Spokes from hub to people and tools (tomorrow) */}
      {hasHub &&
        L.people.map((p, i) => (
          <Line
            key={`spoke-${i}`}
            points={[new THREE.Vector3(0, 0.1, 0), p]}
            color={palette.shared}
            lineWidth={1.2}
            transparent
            opacity={0.55}
          />
        ))}
      {hasHub &&
        L.tools.map((p, i) => (
          <Line
            key={`tool-${i}`}
            points={[new THREE.Vector3(0, -0.1, 0), p]}
            color={palette.shared}
            lineWidth={0.8}
            transparent
            opacity={0.35}
          />
        ))}

      {/* Shared-agent hub disc */}
      <mesh ref={hubRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshBasicMaterial
          color={palette.shared}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Shared agents */}
      {Array.from({ length: MAX_SHARED }, (_, j) => {
        const a = scenario.sharedAgents[j];
        return (
          <mesh
            key={`s-${j}`}
            ref={(el) => {
              sharedRefs.current[j] = el;
            }}
            scale={0}
          >
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={palette.shared}
              emissive={palette.shared}
              emissiveIntensity={0.35}
              roughness={0.35}
            />
            {a && (
              <Html center distanceFactor={9} position={[0, -0.42, 0]}>
                <span className="pointer-events-none whitespace-nowrap font-sans text-[11px] text-ink-2">
                  {a.name}
                </span>
              </Html>
            )}
          </mesh>
        );
      })}

      {/* People + personal agents */}
      {Array.from({ length: MAX_PEOPLE }, (_, i) => {
        const p = scenario.people[i];
        const color = p
          ? p.stance === "swarm"
            ? palette.swarm
            : p.stance === "skeptic"
              ? palette.skeptic
              : palette.person
          : palette.person;
        return (
          <group key={`p-${i}`}>
            <mesh
              ref={(el) => {
                peopleRefs.current[i] = el;
              }}
              scale={0}
            >
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshStandardMaterial color={color} roughness={0.6} />
              {p && (
                <Html center distanceFactor={9} position={[0, 0.55, 0]}>
                  <span className="pointer-events-none whitespace-nowrap font-sans text-[11px] text-ink">
                    {p.name}
                    <span className="text-ink-3"> · {p.role}</span>
                  </span>
                </Html>
              )}
            </mesh>
            {Array.from({ length: MAX_PERSONAL }, (_, j) => (
              <mesh
                key={`a-${i}-${j}`}
                ref={(el) => {
                  agentRefs.current[i][j] = el;
                }}
                scale={0}
              >
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial
                  color={palette.agent}
                  emissive={palette.agent}
                  emissiveIntensity={0.25}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Tool surfaces */}
      {L.tools.map((pos, i) => (
        <group key={`t-${i}`} position={pos}>
          <mesh>
            <boxGeometry args={[0.7, 0.26, 0.16]} />
            <meshStandardMaterial color={palette.rule} roughness={0.9} />
          </mesh>
          <Html center distanceFactor={9}>
            <span className="pointer-events-none whitespace-nowrap font-sans text-[10px] text-ink-2">
              {scenario.tools[i]}
            </span>
          </Html>
        </group>
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={0.6}
        maxPolarAngle={1.35}
        enableDamping
      />
    </>
  );
}

export default function TeamScene3D({ scenario }: { scenario: Scenario }) {
  const palette = usePalette();
  return (
    <Canvas
      camera={{ position: [0, 5.4, 8.2], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene scenario={scenario} palette={palette} />
    </Canvas>
  );
}
