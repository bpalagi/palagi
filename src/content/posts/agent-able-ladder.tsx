import type { PostMeta } from "@/lib/posts";

export const meta: PostMeta = {
  slug: "agent-able-ladder",
  title: "The Agent-able Ladder",
  subtitle:
    "Agents made individuals faster. Teams haven't caught up. Five principles and five stages for growing the work a team trusts to agents.",
  date: "2026-11-01",
  readingMinutes: 12,
  tags: ["agents", "teams", "sdlc", "framework"],
  draft: true,
};

export default function Body() {
  return (
    <>
      <p>
        Every engineer on your team has a coding agent. Almost none of them
        have a team practice for working with one. Adoption happened one
        engineer at a time, and the result is a team where everyone has a
        different harness, a different level of trust, and a different opinion
        about whether the whole thing is a next-token predictor or AGI. Reviews
        turn into debates about the tool. The one power user outruns the review
        queue. Adoption dashboards are green and throughput hasn&rsquo;t moved.
      </p>

      <p>
        This isn&rsquo;t cloud vs. on-prem. Previous transformations came with
        a clean binary and an architecture review to settle it. Agent adoption
        is a spectrum, of autonomy, of trust, of how much you review, and every
        person on the team is standing at a different point on it. That&rsquo;s
        what makes it the most polarizing shift the industry has been through.
      </p>

      <p>
        The fix is a team practice, not a tool. Agree on what agents are. Share
        one harness. Label the work agents can own. Move human attention
        upstream. None of it requires a new vendor; it requires the team
        deciding, together, how to work.
      </p>

      <h2>Five principles</h2>

      <p>
        These hold up regardless of which model, harness, or vendor your team
        uses. They&rsquo;re about people working together, not tools.
      </p>

      <h3>1. Build a shared understanding of agents</h3>

      <p>
        Before a team can collaborate with agents, it needs a shared mental
        model of what an agent even is. The most useful framing splits the
        agent into two parts. <strong>The model</strong> is the weights. On its
        own it is a brain in a vat: it can reason about an action, but it
        can&rsquo;t touch anything. <strong>The harness</strong> is everything
        besides the model weights that makes the agent work: the environment,
        tools, context, memory, and guardrails. The harness gives the mind a
        body: perceive (context), act (tools), persist (memory), and enforce
        boundaries (permissions).
      </p>

      <p>
        The framing comes from Dan McAteer&rsquo;s{" "}
        <a href="https://www.latent.space/p/attention-interface">
          history of the agent harness
        </a>
        . Notably, running the same model in different harnesses produced a
        23.8-point score spread on Harness-Bench. Half the agent is the
        harness.
      </p>

      <p>
        Every team has people at both poles: &ldquo;it&rsquo;s just a
        next-token predictor&rdquo; and &ldquo;we basically have AGI.&rdquo;
        Both extremes stall collaboration; one under-delegates, the other
        under-reviews. The model/harness framing gives the team a shared,
        mechanical vocabulary that pulls both camps toward the pragmatic
        middle: a capable reasoning engine whose real-world effectiveness
        depends heavily on the system built around it.
      </p>

      <h3>2. Shared agent systems beat personal setups</h3>

      <p>
        Personal, locally-run agents with individual harness configurations
        produce wildly different output quality across a team. Same model,
        different harness, different results, and nobody can tell whose output
        to trust. That trust gap is the real cost. Collaboration breaks down
        when some engineers operate on &ldquo;trust but question&rdquo; while
        others default to doubting anything agent-written.
      </p>

      <p>
        The fix is to standardize the harness: shared agent configurations,
        shared context files, shared permission rules. The team calibrates
        trust once, together, instead of each person calibrating alone.
      </p>

      <h3>3. Shift AI usage right</h3>

      <p>
        A common anti-pattern: one agent writes a design doc, a human skims
        it, another agent summarizes it for a ticket, a third agent implements
        from the summary. Each hop loses signal, a lossy game of telephone
        played entirely between machines. The remedy is to move human attention
        up the stack, not spread it thin across every layer.
      </p>

      <ul>
        <li>
          <strong>More human attention at the Jira level:</strong> intent,
          requirements, acceptance criteria. This is where a misunderstanding
          costs the most.
        </li>
        <li>
          <strong>Less human attention at the code level:</strong> where agents
          are strongest and verification (tests, CI, review agents) is
          cheapest.
        </li>
      </ul>

      <p>
        Human attention is the scarce resource in an agentic SDLC. Spend it
        where errors compound: upstream.
      </p>

      <h3>4. Copy-pasting should trigger alarm bells</h3>

      <p>
        If you&rsquo;re repeatedly copy-pasting between your agent and another
        system (logs, tickets, dashboards, docs), that&rsquo;s not a workflow,
        that&rsquo;s a missing integration. Add the tool. There is very likely
        an existing MCP server for the system you&rsquo;re pasting from. Wiring
        it in compounds with principle 2: one person adds the tool, everyone&rsquo;s
        shared harness gets better.
      </p>

      <h3>5. Less ego in the code</h3>

      <p>
        Engineers care about their code, deeply and personally. That care built
        great software, but it also makes us defend past decisions, resist
        rewrites, and take review feedback as personal critique. Agent-written
        code is less personal. Removing the emotional attachment makes it
        dramatically easier to delete code that isn&rsquo;t working, try three
        approaches and keep one, and review harshly without bruising anyone.
        Treat code as an increasingly cheap, disposable artifact, and reserve
        pride for the outcomes it produces.
      </p>

      <h2>The new SDLC mapping</h2>

      <p>
        <strong>Async-forward posture.</strong> Default to async. Meetings
        occur after substantial back-and-forth between people and agents, not
        before. By the time humans get in a room, the options have been
        explored, the drafts written, and the open questions sharpened.
        Synchronous time is spent deciding, not discovering.
      </p>

      <p>
        <strong>Marking work as &ldquo;Agent-able.&rdquo;</strong> Explicitly
        label work that agents can own end-to-end, with clear guidelines like
        &ldquo;this is purely for DevEx, not bearing customer traffic.&rdquo;
        At first that means simple one-line changes to pre-commit hooks. Then
        internal tooling, test scaffolding, docs, migrations. Eventually it
        expands naturally as the team gains confidence, calibrated by real
        results, not vibes.
      </p>

      <p>
        <strong>Collaborating with agents, as a team.</strong> Individual agent
        usage is a solved problem; team-level collaboration is not. Whether the
        venue is off the shelf, like{" "}
        <a href="https://slack.com/features/code-channels">
          Slack code channels
        </a>
        , or a home-grown shared agent gateway, the requirement is the same:
        agent work should be legible to the whole team by default. Shared
        visibility is what turns &ldquo;my agent&rdquo; into &ldquo;our
        agents.&rdquo;
      </p>

      <h2>The ladder</h2>

      <p>
        A team-level framework for growing the surface of work you&rsquo;re
        willing to hand to agents, one rung at a time. Most frameworks measure
        how individuals use AI; this one measures how teams do. Each stage has
        an entry signal, a change in practice, and an exit criterion. You
        don&rsquo;t skip stages: each one builds the trust the next one spends.
      </p>

      <h3>Stage 0: Solo</h3>

      <p>
        <em>Everyone has an agent. Nobody has a team practice.</em> Engineers
        use coding agents individually, with personal configs on personal
        machines. Output quality varies wildly. Agent-written code lands in PRs
        unmarked, and reviewers can&rsquo;t tell, so every review carries a low
        hum of suspicion.
      </p>
      <ul>
        <li>
          <strong>Entry signal:</strong> &ldquo;Which tool are you
          using?&rdquo; is a common question; one or two power users are
          visibly faster; review debates are about the tool, not the change.
        </li>
        <li>
          <strong>Exit criterion:</strong> the team agrees on the model/harness
          framing and agrees a shared setup is worth trying.
        </li>
      </ul>

      <h3>Stage 1: Shared harness</h3>

      <p>
        <em>One configuration. One set of tools. One calibration of trust.</em>{" "}
        A checked-in <code>AGENTS.md</code>, shared permission rules, a common
        set of MCP tools wired to the systems you actually use. Copy-pasting
        between agent and system becomes a bug report.
      </p>
      <ul>
        <li>
          <strong>What changes:</strong> harness config lives in the repo, not
          dotfiles; shared MCP servers replace copy-paste relays; agent-authored
          changes are labeled as such.
        </li>
        <li>
          <strong>Exit criterion:</strong> two engineers get comparable output
          on the same task; review comments stop arguing about the tool.
        </li>
      </ul>

      <h3>Stage 2: Labeled work</h3>

      <p>
        <em>Some tickets say &ldquo;Agent-able.&rdquo; The team knows what
        that means.</em>{" "}
        Work is explicitly marked as safe for an agent to own end-to-end,
        starting narrow. Humans still review everything, but agent ownership is
        the default for a named category of work.
      </p>
      <ul>
        <li>
          <strong>What changes:</strong> an &ldquo;Agent-able&rdquo; label
          exists in the tracker, with written criteria; ticket quality goes up
          because agents need clear intent.
        </li>
        <li>
          <strong>Exit criterion:</strong> a quarter of labeled work ships
          without rework; the team proposes expanding the criteria on its own.
        </li>
      </ul>

      <h3>Stage 3: Async-forward</h3>

      <p>
        <em>Agents are participants in team spaces. Meetings come last.</em>{" "}
        Agents work in shared, visible venues (code channels, ticket threads,
        PRs) rather than one engineer&rsquo;s terminal. More scrutiny on intent
        and acceptance criteria, less on line-by-line diffs.
      </p>
      <ul>
        <li>
          <strong>What changes:</strong> agent output lands where the team
          already looks; meetings are scheduled after async exploration;
          verification leans on tests, CI, and review agents.
        </li>
        <li>
          <strong>Exit criterion:</strong> meeting load drops while throughput
          holds or rises; anyone can inspect any agent&rsquo;s work without
          asking.
        </li>
      </ul>

      <h3>Stage 4: Expanding surface</h3>

      <p>
        <em>The &ldquo;Agent-able&rdquo; definition grows on evidence, not
        enthusiasm.</em>{" "}
        The criteria expand deliberately into lower-risk customer-facing paths:
        feature flags, well-tested modules, migrations with rollback. Each
        expansion is proposed with data from the previous stage. The team is
        self-calibrating: it knows how to grow trust and how to pull it back
        when something breaks.
      </p>
      <ul>
        <li>
          <strong>What changes:</strong> Agent-able scope is reviewed on a
          cadence, with metrics; scope shrinks when defects rise; new hires
          onboard into the practice, not around it.
        </li>
      </ul>

      <p>
        Beyond stage 4 lies the &ldquo;software factory&rdquo; frontier:
        dozens of autonomous agents, orchestration layers, dark factories.
        Fascinating, real, and not where most teams are. The ladder stops at
        stage 4 on purpose.
      </p>

      <h2>Four places teams get stuck</h2>

      <p>
        The teams I talk to are almost never blocked by the model. They&rsquo;re
        blocked by one of these.
      </p>

      <ul>
        <li>
          <strong>Fragmented.</strong> &ldquo;Everyone&rsquo;s got their own
          setup.&rdquo; Six engineers, six harness configs, six quality levels.
          Every good prompt or tool integration stays in one person&rsquo;s
          dotfiles. <em>Stage 0 → 1, principle 2.</em>
        </li>
        <li>
          <strong>One power user.</strong> &ldquo;Sam ships 5x. Nobody reviews
          Sam&rsquo;s PRs anymore.&rdquo; Either their work gets rubber-stamped
          (risk) or it piles up (resentment). The team&rsquo;s opinion of agents
          is really an opinion of Sam. <em>Stage 0 → 1, principles 1 and 2.</em>
        </li>
        <li>
          <strong>Blocked on review.</strong> &ldquo;Every PR turns into a
          debate about the tool.&rdquo; Half the team is trust-but-question,
          the other half default-doubt. Cycle time balloons.{" "}
          <em>Stage 1 → 2, principles 1 and 5.</em>
        </li>
        <li>
          <strong>Copy-paste ops.</strong> &ldquo;Adoption is high. Nothing
          actually changed.&rdquo; Everyone uses the agent as a very fast
          autocomplete, pasting logs and tickets by hand, so the agent never
          touches anything that matters. <em>Stage 1 → 2, principles 3 and 4.</em>
        </li>
      </ul>

      <p>
        Adoption is not transformation. None of the part that matters shows up
        on a seat-license dashboard. The fix in every case is the same set of
        moves: agree on what agents are, share the harness, label the work,
        move human attention upstream.
      </p>
    </>
  );
}
