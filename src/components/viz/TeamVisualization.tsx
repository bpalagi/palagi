"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { buildScenario, stages } from "./teamData";
import { metrics } from "./teamModel";
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
  initialStage = 1,
  initialMode = "3d",
}: {
  initialStage?: number;
  initialMode?: Mode;
}) {
  const [n, setN] = useState(Math.min(Math.max(initialStage, 1), stages.length));
  const [modePref, setMode] = useState<Mode>(initialMode);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
  // Reduced motion always wins over the user's 2D/3D preference.
  const mode: Mode = reducedMotion ? "2d" : modePref;

  const stage = stages[n - 1];
  const prev = n > 1 ? stages[n - 2] : null;
  const scenario = buildScenario(stage);
  const bars = metrics(stage.config);
  const prevBars = prev ? metrics(prev.config) : null;

  return (
    <figure className="not-prose my-10 rounded-sm border rule bg-paper-2">
      {/* Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b rule px-4 py-3">
        <div role="tablist" aria-label="Arrangement" className="flex items-center gap-1">
          <StepButton label="‹" disabled={n === 1} onClick={() => setN(n - 1)} aria="Previous arrangement" />
          {stages.map((s) => (
            <button
              key={s.n}
              role="tab"
              type="button"
              aria-selected={s.n === n}
              aria-label={`${s.n}. ${s.title}`}
              title={s.title}
              onClick={() => setN(s.n)}
              className={`h-8 w-8 rounded-sm font-sans text-sm tabular-nums transition-colors ${
                s.n === n ? "bg-ink text-paper" : "text-ink-2 hover:bg-paper hover:text-ink"
              }`}
            >
              {s.n}
            </button>
          ))}
          <StepButton label="›" disabled={n === stages.length} onClick={() => setN(n + 1)} aria="Next arrangement" />
        </div>
        <div className="flex items-center gap-1 font-sans text-xs">
          <button
            type="button"
            onClick={() => setMode("2d")}
            aria-pressed={mode === "2d"}
            className={`rounded-sm px-2 py-1 ${mode === "2d" ? "text-ink underline decoration-accent underline-offset-4" : "text-ink-3 hover:text-ink"}`}
          >
            Diagram
          </button>
          <button
            type="button"
            onClick={() => setMode("3d")}
            aria-pressed={mode === "3d"}
            disabled={reducedMotion}
            title={reducedMotion ? "Disabled: reduced motion is on" : undefined}
            className={`rounded-sm px-2 py-1 disabled:opacity-40 ${mode === "3d" ? "text-ink underline decoration-accent underline-offset-4" : "text-ink-3 hover:text-ink"}`}
          >
            3D
          </button>
        </div>
      </div>

      {/* Stage header */}
      <div className="grid gap-x-8 gap-y-2 px-4 pt-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">Arrangement {stage.n} of {stages.length}</p>
          <p className="mt-1 font-serif text-2xl text-ink">{stage.title}</p>
          <p className="mt-1 font-sans text-sm text-ink-3">{scenario.headline}</p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-sans text-xs text-ink-2 sm:text-right">
          <dt className="text-ink-3">Owner</dt>
          <dd>{stage.owner}</dd>
          <dt className="text-ink-3">Sessions live</dt>
          <dd>{stage.host}</dd>
          <dt className="text-ink-3">Examples</dt>
          <dd>{stage.examples}</dd>
        </dl>
      </div>

      {/* Scene */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl sm:aspect-[16/10]">
        {mode === "3d" ? (
          <TeamScene3D scenario={scenario} />
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <TeamDiagramSVG scenario={scenario} className="max-h-full" />
          </div>
        )}
      </div>

      {/* Metrics, with the change from the previous arrangement */}
      <dl className="grid gap-x-8 gap-y-3 border-t rule px-4 py-4 font-sans text-xs sm:grid-cols-2">
        {bars.map((m, i) => {
          const before = prevBars?.[i];
          const delta = before ? m.value - before.value : 0;
          const improved = m.higherIsBetter ? delta > 0 : delta < 0;
          const fmt = (v: number) => v.toFixed(v !== 0 && Math.abs(v) < 10 ? 1 : 0);
          return (
            <div key={m.id} title={m.why}>
              <div className="flex items-baseline justify-between gap-3 text-ink-2">
                <dt>{m.label}</dt>
                <dd className="tabular-nums text-ink-3">
                  {fmt(m.value)} {m.unit}
                  {before && Math.abs(delta) > 0.05 && (
                    <span className={`ml-2 ${improved ? "text-shared" : "text-accent"}`}>
                      {delta > 0 ? "+" : "−"}
                      {fmt(Math.abs(delta))}
                    </span>
                  )}
                </dd>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-paper">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${m.higherIsBetter ? "bg-shared" : "bg-accent"}`}
                  style={{ width: `${Math.max(2, m.norm * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </dl>

      <figcaption className="border-t rule px-4 py-3 text-sm leading-relaxed text-ink-2">
        <p>
          <span className="font-sans text-xs uppercase tracking-wider text-ink-3">Why teams arrive here </span>
          {stage.push}
        </p>
        <p className="mt-1">
          <span className="font-sans text-xs uppercase tracking-wider text-ink-3">Why they move on </span>
          {stage.cost}
        </p>
        <Legend />
      </figcaption>
    </figure>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  aria,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      type="button"
      aria-label={aria}
      disabled={disabled}
      onClick={onClick}
      className="h-8 w-8 rounded-sm font-sans text-lg text-ink-2 hover:bg-paper hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {label}
    </button>
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
      <li>Bars: red, lower is better · gold, higher is better · bar model is illustrative</li>
    </ul>
  );
}
