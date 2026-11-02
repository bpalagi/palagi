"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html, Line, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import {
  MAX_PEOPLE,
  MAX_PERSONAL,
  MAX_SHARED,
  ringPositions,
  type Scenario,
  type Structure,
} from "./teamData";

const KIT = "/models/kit.glb"; // prebuilt asset; its Blender source script is no longer in the repo
const MAX_TOOLS = 5;
const ORIGIN = new THREE.Vector3(0, 0, 0);

type Palette = {
  person: string;
  swarm: string;
  skeptic: string;
  agent: string;
  shared: string;
  rule: string;
  ink: string;
  paper: string;
};

const FALLBACK_PALETTE: Palette = {
  person: "#4a443c",
  swarm: "#b5532f",
  skeptic: "#857d72",
  agent: "#2f6fb5",
  shared: "#c98a1c",
  rule: "#ddd5c8",
  ink: "#1d1a16",
  paper: "#f7f3ec",
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
    paper: v("--paper"),
  };
}

function subscribeTheme(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}
const getThemeKey = () => document.documentElement.className;
const getThemeKeyServer = () => "";

function usePalette(): Palette {
  const themeKey = useSyncExternalStore(subscribeTheme, getThemeKey, getThemeKeyServer);
  return useMemo(
    () => (typeof window === "undefined" ? FALLBACK_PALETTE : readPalette()),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- themeKey drives re-read
    [themeKey],
  );
}

type Kit = Record<
  "Person" | "Agent" | "Shared" | "Laptop" | "Doc" | "Channel" | "Workspace" | "Platform" | "Gateway" | "Tile",
  THREE.Mesh
>;

function useKit(): Kit {
  const { nodes } = useGLTF(KIT);
  return nodes as unknown as Kit;
}

// ------------------------------------------------------------- layout ----

function layout(s: Scenario) {
  const n = s.people.length;
  const ringR = n > 8 ? 3.6 : n > 6 ? 3.0 : 2.1;
  const people = ringPositions(n, ringR).map((p) => new THREE.Vector3(p.x, 0, p.y));
  // Laptops sit just inside each person, facing the centre.
  const laptops = people.map((p) => p.clone().multiplyScalar((ringR - 0.55) / ringR));
  const centreR = s.id === "workspace" ? 0.6 : 0.7;
  const centreY = s.id === "workspace" ? 0.45 : s.id === "channel" ? 0.55 : 0.3;
  const shared = ringPositions(s.sharedAgents.length, centreR).map(
    (p) => new THREE.Vector3(p.x, centreY, p.y),
  );
  const tools = s.tools.map(
    (_, i) => new THREE.Vector3((i - (s.tools.length - 1) / 2) * 1.0, 0.14, 3.75),
  );
  return { ringR, people, laptops, shared, tools };
}

const hasCentre: Record<Structure, boolean> = {
  laptops: false,
  prompts: false,
  channel: true,
  workspace: true,
  platform: false,
  "platform-shared": true,
};

// ------------------------------------------------------------- scene ----

type SceneProps = { scenario: Scenario; palette: Palette };

function Scene({ scenario, palette }: SceneProps) {
  const kit = useKit();
  const L = useMemo(() => layout(scenario), [scenario]);
  const host = scenario.config.host;
  const structure = scenario.id;

  const mats = useMemo(() => {
    const std = (color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.55, ...extra });
    return {
      person: std(palette.person),
      swarm: std(palette.swarm),
      skeptic: std(palette.skeptic),
      agent: std(palette.agent, { emissive: palette.agent, emissiveIntensity: 0.3, flatShading: true }),
      shared: std(palette.shared, { emissive: palette.shared, emissiveIntensity: 0.35, flatShading: true }),
      laptop: std(palette.ink, { roughness: 0.4, metalness: 0.3 }),
      doc: std(palette.skeptic, { roughness: 0.9, emissive: palette.agent, emissiveIntensity: 0.15 }),
      channel: std(palette.rule, { roughness: 0.8 }),
      workspace: new THREE.MeshPhysicalMaterial({
        color: palette.agent,
        transparent: true,
        opacity: 0.16,
        roughness: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      platform: std(palette.rule, { roughness: 0.95 }),
      gateway: std(palette.swarm, { emissive: palette.swarm, emissiveIntensity: 0.4 }),
      tile: std(palette.rule, { roughness: 0.9 }),
    };
  }, [palette]);

  const peopleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const laptopRefs = useRef<(THREE.Mesh | null)[]>([]);
  const agentRefs = useRef<(THREE.Mesh | null)[][]>(Array.from({ length: MAX_PEOPLE }, () => []));
  const sharedRefs = useRef<(THREE.Mesh | null)[]>([]);
  const tileRefs = useRef<(THREE.Group | null)[]>([]);
  const centre = useRef<Record<"Doc" | "Channel" | "Workspace" | "Platform" | "Gateway", THREE.Mesh | null>>({
    Doc: null,
    Channel: null,
    Workspace: null,
    Platform: null,
    Gateway: null,
  });
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent lerp
    const lerpScale = (m: THREE.Object3D, on: boolean) => {
      const s = on ? 1 : 0;
      m.scale.lerp(tmp.set(s, s, s), k);
    };

    for (let i = 0; i < MAX_PEOPLE; i++) {
      const present = i < scenario.people.length;
      const m = peopleRefs.current[i];
      if (m) {
        m.position.lerp(present ? L.people[i] : ORIGIN, k);
        lerpScale(m, present);
      }
      const lap = laptopRefs.current[i];
      const laptopOn = present && (host === "laptop" || host === "channel");
      if (lap) {
        lap.position.lerp(present ? L.laptops[i] : ORIGIN, k);
        lerpScale(lap, laptopOn);
        // Lid is on the model's -Z side; point +Z away from centre so the lid faces in.
        if (present) lap.lookAt(lap.position.x * 2, 0, lap.position.z * 2);
      }

      const count = present ? scenario.people[i].agents : 0;
      for (let j = 0; j < MAX_PERSONAL; j++) {
        const a = agentRefs.current[i][j];
        if (!a) continue;
        const on = j < count;
        const ang = (j / Math.max(count, 1)) * Math.PI * 2 + t * (0.9 + i * 0.07);
        if (host === "cloud") {
          // Personal agents run in the shared workspace, not at the desk.
          const slot = i * MAX_PERSONAL + j;
          const r = 0.8;
          const a2 = (slot / (MAX_PEOPLE * MAX_PERSONAL)) * Math.PI * 2 * 3 + t * 0.4;
          tmp.set(Math.cos(a2) * r, 0.35 + Math.sin(t * 1.3 + slot) * 0.1, Math.sin(a2) * r);
        } else {
          const anchor = laptopOn && lap ? lap.position : m ? m.position : ORIGIN;
          const r = laptopOn ? 0.32 : 0.5;
          const y = laptopOn ? 0.42 : 0.55;
          tmp.set(anchor.x + Math.cos(ang) * r, y + Math.sin(t * 1.6 + j) * 0.06, anchor.z + Math.sin(ang) * r);
        }
        a.position.lerp(tmp, on ? Math.min(1, k * 3) : k);
        lerpScale(a, on);
        a.rotation.y += dt;
      }
    }

    for (let j = 0; j < MAX_SHARED; j++) {
      const m = sharedRefs.current[j];
      if (!m) continue;
      const present = j < scenario.sharedAgents.length;
      if (present) {
        const base = L.shared[j];
        const spin = structure === "workspace" ? 0 : 0.35;
        const ang = t * spin + (j / scenario.sharedAgents.length) * Math.PI * 2 - Math.PI / 2;
        const r = Math.hypot(base.x, base.z);
        tmp.set(Math.cos(ang) * r, base.y + Math.sin(t * 1.2 + j) * 0.06, Math.sin(ang) * r);
        m.position.lerp(tmp, k);
      } else {
        m.position.lerp(ORIGIN, k);
      }
      lerpScale(m, present);
      m.rotation.y += dt * 0.8;
    }

    for (let i = 0; i < MAX_TOOLS; i++) {
      const g = tileRefs.current[i];
      if (!g) continue;
      const present = i < scenario.tools.length;
      g.position.lerp(present ? L.tools[i] : tmp.set(0, 0.14, 3.75), k);
      lerpScale(g, present);
    }

    const c = centre.current;
    if (c.Doc) {
      lerpScale(c.Doc, structure === "prompts");
      c.Doc.rotation.y = t * 0.15;
    }
    if (c.Channel) lerpScale(c.Channel, structure === "channel");
    if (c.Workspace) lerpScale(c.Workspace, structure === "workspace");
    const onPlatform = host === "platform";
    if (c.Platform) lerpScale(c.Platform, onPlatform);
    if (c.Gateway) {
      lerpScale(c.Gateway, onPlatform);
      c.Gateway.rotation.y = t * 0.08;
    }
  });

  const centreOn = hasCentre[structure];
  const lossy = scenario.sharedAgents.length === 0;

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 3]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 3, -4]} intensity={0.45} />

      {/* Ground ring for the team when there is no platform */}
      {host !== "platform" && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <ringGeometry args={[L.ringR - 0.02, L.ringR + 0.02, 96]} />
          <meshBasicMaterial color={palette.rule} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Lossy hand-offs between people whenever nothing shared sits between them */}
      {lossy &&
        L.people.map((a, i) =>
          L.people.slice(i + 1).map((b, j) => (
            <Line
              key={`${i}-${j}`}
              points={[a.clone().setY(0.3), b.clone().setY(0.3)]}
              color={palette.skeptic}
              lineWidth={0.8}
              dashed
              dashSize={0.12}
              gapSize={0.16}
              transparent
              opacity={0.6}
            />
          )),
        )}

      {/* Shared prompts: a thin dotted thread from the doc to each laptop */}
      {structure === "prompts" &&
        L.laptops.map((p, i) => (
          <Line
            key={`doc-${i}`}
            points={[new THREE.Vector3(0, 0.05, 0), p.clone().setY(0.05)]}
            color={palette.agent}
            lineWidth={0.6}
            dashed
            dashSize={0.05}
            gapSize={0.12}
            transparent
            opacity={0.45}
          />
        ))}

      {/* Spokes from the centre to each person */}
      {centreOn &&
        L.people.map((p, i) => (
          <Line
            key={`spoke-${i}`}
            points={[new THREE.Vector3(0, 0.2, 0), p.clone().setY(0.3)]}
            color={palette.shared}
            lineWidth={1.2}
            transparent
            opacity={0.5}
          />
        ))}
      {structure === "platform-shared" &&
        L.tools.map((p, i) => (
          <Line
            key={`tool-${i}`}
            points={[new THREE.Vector3(0, 0.1, 0), p]}
            color={palette.shared}
            lineWidth={0.8}
            transparent
            opacity={0.35}
          />
        ))}

      {/* Centrepieces (scale-animated in useFrame) */}
      <group scale={1.7}>
        <mesh ref={(el) => void (centre.current.Doc = el)} geometry={kit.Doc.geometry} material={mats.doc} scale={0} />
      </group>
      <mesh ref={(el) => void (centre.current.Channel = el)} geometry={kit.Channel.geometry} material={mats.channel} scale={0} />
      <mesh ref={(el) => void (centre.current.Workspace = el)} geometry={kit.Workspace.geometry} material={mats.workspace} scale={0} />
      <mesh ref={(el) => void (centre.current.Platform = el)} geometry={kit.Platform.geometry} material={mats.platform} scale={0} receiveShadow />
      <mesh ref={(el) => void (centre.current.Gateway = el)} geometry={kit.Gateway.geometry} material={mats.gateway} scale={0} />

      {structure === "channel" && (
        <Html center position={[0, 0.05, 0.85]}>
          <span className="pointer-events-none whitespace-nowrap font-sans text-[10px] tracking-wide text-ink-3">
            #eng
          </span>
        </Html>
      )}
      {structure === "workspace" && (
        <Html center position={[0, 1.25, 0]}>
          <span className="pointer-events-none whitespace-nowrap font-sans text-[10px] tracking-wide text-ink-3">
            cloud sandbox · allow-listed egress
          </span>
        </Html>
      )}
      {host === "platform" && (
        <Html center position={[0, 0.1, 3.35]}>
          <span className="pointer-events-none whitespace-nowrap font-sans text-[10px] tracking-wide text-accent">
            gateway · policy as code
          </span>
        </Html>
      )}

      {/* Shared agents */}
      {Array.from({ length: MAX_SHARED }, (_, j) => {
        const a = scenario.sharedAgents[j];
        return (
          <mesh
            key={`s-${j}`}
            ref={(el) => void (sharedRefs.current[j] = el)}
            geometry={kit.Shared.geometry}
            material={mats.shared}
            scale={0}
            castShadow
          >
            {a && (
              <Html center position={[0, -0.42, 0]}>
                <span className="pointer-events-none whitespace-nowrap font-sans text-[11px] text-ink-2">{a.name}</span>
              </Html>
            )}
          </mesh>
        );
      })}

      {/* People, laptops, personal agents */}
      {Array.from({ length: MAX_PEOPLE }, (_, i) => {
        const p = scenario.people[i];
        const material = p
          ? p.stance === "swarm"
            ? mats.swarm
            : p.stance === "skeptic"
              ? mats.skeptic
              : mats.person
          : mats.person;
        return (
          <group key={`p-${i}`}>
            <mesh
              ref={(el) => void (peopleRefs.current[i] = el)}
              geometry={kit.Person.geometry}
              material={material}
              scale={0}
              castShadow
            >
              {p && (
                <Html center position={[0, 0.8, 0]}>
                  <span className="pointer-events-none whitespace-nowrap font-sans text-[11px] text-ink">
                    {p.name}
                    <span className="text-ink-3"> · {p.role}</span>
                  </span>
                </Html>
              )}
            </mesh>
            <mesh
              ref={(el) => void (laptopRefs.current[i] = el)}
              geometry={kit.Laptop.geometry}
              material={mats.laptop}
              scale={0}
              castShadow
            />
            {Array.from({ length: MAX_PERSONAL }, (_, j) => (
              <mesh
                key={`a-${i}-${j}`}
                ref={(el) => void (agentRefs.current[i][j] = el)}
                geometry={kit.Agent.geometry}
                material={mats.agent}
                scale={0}
              />
            ))}
          </group>
        );
      })}

      {/* Tool surfaces */}
      {Array.from({ length: MAX_TOOLS }, (_, i) => (
        <group key={`t-${i}`} ref={(el) => void (tileRefs.current[i] = el)} scale={0}>
          <mesh geometry={kit.Tile.geometry} material={mats.tile} />
          {scenario.tools[i] && (
            <Html center>
              <span className="pointer-events-none whitespace-nowrap font-sans text-[10px] text-ink-2">
                {scenario.tools[i]}
              </span>
            </Html>
          )}
        </group>
      ))}

      <ContactShadows position={[0, -0.02, 0]} opacity={0.35} scale={12} blur={2.2} far={2} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={0.55}
        maxPolarAngle={1.3}
        enableDamping
      />
    </>
  );
}

useGLTF.preload(KIT);

export default function TeamScene3D({ scenario }: { scenario: Scenario }) {
  const palette = usePalette();
  return (
    <Canvas
      camera={{ position: [0, 5.6, 8.4], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene scenario={scenario} palette={palette} />
      </Suspense>
    </Canvas>
  );
}
