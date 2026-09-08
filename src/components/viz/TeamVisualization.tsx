"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { scenarios, type Scenario } from "./teamData";
import { TeamDiagramSVG } from "./TeamDiagramSVG";

const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(RM_QUERY).matches;
const getReducedMotionServer = () => false;

// three.js is client-only and heavy; load it lazily and never on the server.
const TeamScene3D = dynamic(() => import("./TeamScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-sans text-xs text-ink-3">
      Loading 3D scene…
    </div>
  ),
});

type Mode = "2d" | "3d";

export function TeamVisualization({
  initialScenario = "today",
  initialMode = "3d",
}: {
  initialScenario?: Scenario["id"];
  initialMode?: Mode;
}) {
  const [which, setWhich] = useState<Scenario["id"]>(initialScenario);
  const [modePref, setMode] = useState<Mode>(initialMode);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );
  // Reduced motion always wins over the user's 2D/3D preference.
  const mode: Mode = reducedMotion ? "2d" : modePref;

  const scenario = scenarios[which];

  return (
    <figure className="not-prose my-10 rounded-sm border rule bg-paper-2">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b rule px-4 py-3">
        <div role="tablist" aria-label="Scenario" className="flex gap-1">
          {(["today", "tomorrow"] as const).map((id) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={which === id}
              onClick={() => setWhich(id)}
              className={`rounded-sm px-3 py-1.5 font-sans text-sm transition-colors ${
                which === id
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:bg-paper hover:text-ink"
              }`}
            >
              {scenarios[id].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 font-sans text-xs">
          <button
            type="button"
            onClick={() => setMode("2d")}
            aria-pressed={mode === "2d"}
            className={`rounded-sm px-2 py-1 ${mode === "2d" ? "text-ink underline underline-offset-4 decoration-accent" : "text-ink-3 hover:text-ink"}`}
          >
            Diagram
          </button>
          <button
            type="button"
            onClick={() => setMode("3d")}
            aria-pressed={mode === "3d"}
            disabled={reducedMotion}
            title={reducedMotion ? "Disabled: reduced motion is on" : undefined}
            className={`rounded-sm px-2 py-1 disabled:opacity-40 ${mode === "3d" ? "text-ink underline underline-offset-4 decoration-accent" : "text-ink-3 hover:text-ink"}`}
          >
            3D
          </button>
        </div>
      </div>

      <div className="px-4 pt-4">
        <p className="font-serif text-xl text-ink">{scenario.headline}</p>
      </div>

      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl sm:aspect-[16/10]">
        {mode === "3d" ? (
          <TeamScene3D scenario={scenario} />
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <TeamDiagramSVG scenario={scenario} className="max-h-full" />
          </div>
        )}
      </div>

      <figcaption className="border-t rule px-4 py-3 text-sm leading-relaxed text-ink-2">
        {scenario.caption}
        <Legend />
      </figcaption>
    </figure>
  );
}

function Legend() {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-xs text-ink-3">
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
        Agent swarm
      </li>
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink-2" />
        Uses agents sometimes
      </li>
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink-3" />
        Skeptic
      </li>
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-agent" />
        Personal agent
      </li>
      <li className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rotate-45 bg-shared" />
        Shared agent
      </li>
    </ul>
  );
}
