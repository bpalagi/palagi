import type { PostMeta } from "@/lib/posts";

export const meta: PostMeta = {
  slug: "what-ai-adoption-actually-looked-like",
  title: "[Draft] What AI adoption actually looked like across N teams",
  subtitle:
    "Placeholder for a second post: the enterprise rollout story, told honestly.",
  date: "2026-08-15",
  readingMinutes: 6,
  tags: ["enterprise", "adoption"],
  draft: true,
};

export default function Body() {
  return (
    <>
      <p>
        This is a placeholder post so the index has more than one entry. It is
        marked <code>draft</code> and will be hidden in production builds.
      </p>
      <h2>Outline</h2>
      <ul>
        <li>Where the teams started: tooling, skepticism, budget.</li>
        <li>What we tried first and why it did not stick.</li>
        <li>The first shared agent, and the argument that got it approved.</li>
        <li>What I would do differently.</li>
      </ul>
    </>
  );
}
