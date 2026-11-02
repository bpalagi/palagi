import type { PostMeta } from "@/lib/posts";

export const meta: PostMeta = {
  slug: "agents-at-scale",
  title: "Running autonomous agents at scale",
  subtitle:
    "The harness is dissolving into the model, but somebody still has to run the agents. What Harness 3.0 looks like as a control plane: the open-source kagent project, mapped against the attention era.",
  date: "2026-11-01",
  readingMinutes: 4,
  tags: ["agents", "kagent", "kubernetes", "harness"],
  draft: true,
};

export default function Body() {
  return (
    <>
      <h2>One agent is a tool. A fleet is infrastructure.</h2>

      <p>
        Harness 3.0 concerns (permissions, identity, trust, legibility) feel
        abstract when one agent runs on your laptop. Run fifty autonomous
        agents for a team and they become infrastructure problems with on-call
        rotations: who is this agent, what may it touch, who approved that
        action, and what happens to its work when a node dies.
      </p>

      <p>
        This is exactly the class of problem Kubernetes was built for
        (declarative desired state, admission control, reconciliation), which
        is why the open-source <a href="https://kagent.dev">kagent</a> project
        builds the agent runtime as a Kubernetes control plane rather than
        another framework.
      </p>

      <h2>Templates, harnesses, and derived agents</h2>

      <p>
        kagent splits the agent the same way the essay splits it. An{" "}
        <code>AgentTemplate</code> is the behavior half: model, prompt, exact
        MCP tool grants, skills. A <code>Harness</code> is the runtime half:
        the adapter (kagent, Codex, Claude), a digest-pinned image, a worker
        pool, a snapshot policy, and an admission selector.
      </p>

      <p>
        An Agent is derived, never authored: a template admitted by a harness,
        compiled into an immutable, content-addressed revision. The same
        behavior admitted by two harnesses is two agents. At scale this is the
        difference between &ldquo;who changed the prompt?&rdquo; and a
        revision history you can diff, pin, and roll back.
      </p>

      <h2>Suspend the fleet, keep the state</h2>

      <p>
        Every conversation is an <code>AgentInstance</code> backed by
        PostgreSQL, executing as a sandboxed Substrate actor. A2A owns the task
        lifecycle: one non-quiescent task per conversation is a database
        constraint, not a convention. At every quiescent turn boundary, the
        runtime is suspended to an exact, verified snapshot.
      </p>

      <p>
        This is what makes autonomy affordable: an idle agent costs a database
        row, not a GPU. Resume is transparent, checkpoints are retained turn
        boundaries, and forking a conversation is creating a new actor from an
        immutable snapshot tag.
      </p>

      <h2>The scarce resource is you</h2>

      <p>
        The attention interface is the layer no model absorbs. In production it
        already exists as machinery: tasks pause in <code>input-required</code>{" "}
        until a human answers, tool calls can require explicit approval, and
        every agent action carries a verifiable identity for the audit trail.
      </p>

      <p>
        An attention policy at fleet scale is an admission and routing problem:
        which agents may interrupt which humans, which decisions auto-approve,
        which queue. That is a policy surface, and policy surfaces are what
        Kubernetes control planes are good at.
      </p>

      <blockquote>
        <p>
          [Your own operational take goes here: what broke first, what you
          deleted, and what you would never run without again.]
        </p>
      </blockquote>
    </>
  );
}
