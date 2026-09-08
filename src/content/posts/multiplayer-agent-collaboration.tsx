import type { PostMeta } from "@/lib/posts";
import { TeamVisualization } from "@/components/viz/TeamVisualization";

export const meta: PostMeta = {
  slug: "multiplayer-agent-collaboration",
  title: "Multi-player Agent Collaboration — let's start from the top",
  subtitle:
    "Two of the best pieces on agents this year both leave out the same thing: agents that belong to a team, not a person.",
  date: "2026-09-07",
  readingMinutes: 11,
  tags: ["agents", "harness", "team structure", "collaboration"],
};

export default function Body() {
  return (
    <>
      <p>
        Two pieces from this year resonated deeply with me. One is a history of
        the agent harness. The other is a leader&rsquo;s guide to team structure
        in an agentic world. They are both excellent, and they both stop one
        step short of the same idea. I want to walk through each, point at the
        gap, and then try to fill it.
      </p>

      <h2>Part one: the harness becomes the interface</h2>

      <p>
        Dan McAteer&rsquo;s{" "}
        <a href="https://www.latent.space/p/attention-interface">
          The Evolution of the Agent Harness
        </a>{" "}
        on Latent Space is the best account I have read of why agents suddenly
        started working around Christmas 2025. His argument: it was not the
        model alone, and not the wrapper alone, but the two improving together
        until their curves crossed.
      </p>

      <p>He splits the story into three eras.</p>

      <h3>Harness 1.0 — the bolt-on era</h3>
      <p>
        The harness is &ldquo;everything besides the model weights that makes
        the agent work.&rdquo; The model is a brain in a vat; the harness gives
        it a body. In this era the harness kept asking more of the model than
        the model could deliver. ReAct wrote the agent loop down on paper.
        AutoGPT and BabyAGI handed a brittle next-token predictor full autonomy
        and watched 95% per-step reliability compound into a 36% chance of
        finishing a twenty-step task. Cursor and Copilot retreated and gave the
        loop back to the human. Then reasoning models arrived, the gap
        inverted, and Claude Code was the first product built to seize the
        overhang: terminal, bash, file access, permission rules instead of
        approvals on every change.
      </p>

      <h3>Harness 2.0 — the co-training era</h3>
      <p>
        Today the harness is measurably half the agent. Harness-Bench ran one
        model across 106 tasks in different harnesses and got a 23.8-point
        spread with zero change to the weights. But reinforcement learning has
        moved inside the harness, so models are absorbing it: compaction,
        tool use, context management. Anthropic reportedly deleted 80% of
        Claude Code&rsquo;s system prompt. The loop is{" "}
        <em>train &rarr; absorb &rarr; shed &rarr; repeat</em>, and the measure
        of progress is how much harness you get to delete.
      </p>

      <h3>Harness 3.0 — the attention era</h3>
      <p>
        So what is left when everything absorbable has been absorbed? McAteer
        answers: the human-centric parts. Permissions, identity, trust,
        legibility. The things a model cannot absorb without dissolving them.
      </p>

      <blockquote>
        <p>
          The harness becomes the agent&rsquo;s interface to the human that
          operates it.
        </p>
      </blockquote>

      <p>
        He predicts that within a year every agentic company will ship a
        &ldquo;human attention policy surface&rdquo; the way they all shipped
        AGENTS.md: a document that tells the agent when it may interrupt you,
        which decisions it can make alone, which need your approval.
      </p>

      <p>
        I agree with nearly all of it. The one piece I thought was left out is
        a single letter. Read that sentence again with it:
      </p>

      <blockquote>
        <p>
          The harness becomes the agent&rsquo;s interface to the human
          <strong>(s)</strong> that operate it.
        </p>
      </blockquote>

      <p>
        Every example in the piece is singular. My attention, my approval
        queue, my AGENTS.md. But the scarce resource Ryan Lopopolo named in the
        quote McAteer leans on is &ldquo;the synchronous human attention of{" "}
        <em>my team</em>.&rdquo; Once the harness is an attention interface, the
        interesting question is not how an agent negotiates for one
        person&rsquo;s attention. It is how an agent negotiates for a
        team&rsquo;s. That has become a strong conviction of mine: agentic
        systems need to be treated first class <em>amongst teams</em>, not
        handed out one per developer.
      </p>

      <h2>Part two: advanced team structures, minus one row</h2>

      <p>
        The second piece is a talk I keep recommending: Stephen Brozovich, an
        AWS Enterprise Strategist, at AWS Summit Sydney 2026,{" "}
        <a href="https://www.youtube.com/watch?v=O7u6myBRsns">
          A leader&rsquo;s guide to advanced team structures in an agentic
          world
        </a>
        . It is a leadership talk built on four sections: Economics, Talent,
        Structure, Governance.
      </p>

      <p>
        <strong>Economics.</strong> A well-funded team of thirty engineers with
        a frontier model can replicate your product line at a tenth of the
        cost. Buildable moats (workflow embeddedness, lock-in, complexity)
        erode; hard-to-get moats (proprietary data, network effects,
        regulatory permission) appreciate. Training costs rise 2.4&times; a
        year while inference falls 10&times;, so decide per workflow whether
        to use, compose, or build.
      </p>

      <p>
        <strong>Talent.</strong> The craft shifts from building to
        orchestrating: &ldquo;point an agent at a problem, evaluate the output,
        steer the next iteration, and know when to overrule.&rdquo; He borrows
        Fowler&rsquo;s expert generalist and Vogels&rsquo; Renaissance
        developer, and describes <em>hyperconvergence</em>: the old team of
        eight specialists each owning a lane becomes &ldquo;two or three
        expert generalists plus agents to fill the gaps.&rdquo; Along the way
        he is honest about the costs: a verification tax (ten times faster to
        write, three times harder to validate) and a deskilling trap (juniors
        ship 17% more and understand 17% less). His org shapes go pyramid
        &rarr; diamond (the trap) &rarr; inverted pyramid (the pod) &rarr;
        hourglass (an org that houses pods while still growing juniors).
      </p>

      <p>
        <strong>Structure.</strong> &ldquo;Non-determinism is a feature, not a
        bug. A deterministic agent is a runbook.&rdquo; Be tolerant of variance
        in execution and strict about variance in outcome; define the
        riverbank, not the route. Model A, build-and-throw-over-the-wall, is
        &ldquo;dead, full stop.&rdquo; Model B is embedded pods of three to
        five seniors who build and run their own agents. Model C is B plus a
        shared platform &mdash; runtime, memory, identity, observability
        &mdash; so that ten pods do not build ten auth systems.
      </p>

      <p>
        <strong>Governance.</strong> Who is the agent, who authorized it, what
        may it do, can we audit it. Enforce policy at the gateway, outside the
        LLM loop. &ldquo;You don&rsquo;t ask the agent nicely not to do
        something.&rdquo;
      </p>

      <p>
        It is a great talk. And the same row is missing from the table. Listen
        to how the pod is described: &ldquo;three to five senior engineers,
        each full stack, <em>each with AI</em> doing execution.&rdquo; The only
        thing that is shared in Model C is the platform underneath. The agents
        themselves are still individual. The talk covers two kinds of agent
        &mdash; the productivity agent a developer points at a problem, and the
        production agent the org ships as a product &mdash; and never names
        the third kind: the agent a team shares.
      </p>

      <h2>So let&rsquo;s give agents a first-class seat</h2>

      <p>
        If we take both pieces seriously, agents are members of the team in
        every sense that matters: they hold context, they take actions, they
        compete for attention, and they need identity and permissions. So what
        does a team look like today when you actually draw the agents in, and
        where do I think it is moving?
      </p>

      <TeamVisualization initialScenario="today" />

      <h3>Today&rsquo;s team</h3>
      <p>
        Ten-plus people, each with their own agent or agents. The distribution
        is wild: one staff engineer is running a swarm, three people have never
        opened a coding agent, everyone else is somewhere in between. Every
        hand-off between two humans is a lossy translation. One person tells
        their agent &ldquo;generate a doc.&rdquo; The next person tells their
        agent &ldquo;summarize this doc.&rdquo; The context that mattered was in
        the first person&rsquo;s harness the whole time and never made the
        trip.
      </p>

      <h3>The knee-jerk instincts</h3>
      <p>
        <strong>Share prompts, so everyone gets a similar harness.</strong>{" "}
        This helps less than you would hope. Two people with the same
        AGENTS.md and different tools, permissions, and context windows get
        different agents. Tooling matters more than prompts; McAteer&rsquo;s
        23.8-point spread is the number to remember.
      </p>
      <p>
        <strong>Ban reading or writing AI-generated docs.</strong> We are all
        already doing it. The cat is out of the bag. A ban just pushes the
        agents back into individual harnesses where nobody can see them,
        which makes the lossy translation worse, not better.
      </p>

      <h3>Tomorrow&rsquo;s team</h3>
      <p>
        Four people. Each still has a personal agent or two, but the leverage
        comes from a pool of robust shared agents the whole team trusts. Trust
        is the key word: not &ldquo;Ava trusts her reviewer agent&rdquo; but
        &ldquo;the team has a common feeling about the reviewer agent&rsquo;s
        trustworthiness,&rdquo; because the team built it, scoped its
        permissions, and reads its output every day.
      </p>
      <p>
        These agents live where the team already talks, not in someone&rsquo;s
        terminal: a Slack code channel where the release agent posts what it
        is about to do, a Jira conversation where the triage agent is a
        participant rather than a bot, GitHub where the reviewer has an
        identity you can audit, the cluster where on-call has a scoped
        credential. The collaboration is multi-player and agent-native from
        the start. Toggle the visualization above to see the shape change.
      </p>

      <p>
        Notice this is exactly Brozovich&rsquo;s Model C plus one row. The
        shared platform he describes &mdash; identity, memory, observability
        &mdash; is the prerequisite. The shared agents are what you build on
        it. And McAteer&rsquo;s attention interface is what makes it work at
        all: a shared agent needs a policy for whose attention to spend, and
        when, and that policy is a team document.
      </p>

      <h2>Zooming out</h2>

      <p>
        Step back past individuals, teams, even organizations. Those of us
        energized by this technology have a known problem: public discontent,
        most visibly as data-center fear, and more quietly as the sense that
        AI is a thing done to people rather than with them.
      </p>

      <p>
        I think collaborative experiences are how we work on that. Building
        systems that connect people <em>and</em> agents, in the open, in
        shared spaces, does two things. Inside the industry it bridges the gap
        between the Gas Town explorers and the syntax-loving skeptics, because
        the skeptic can finally see what the agent did and say no. Outside the
        industry it models a version of this technology that is legible,
        accountable, and social, which is the version most people would
        actually accept.
      </p>

      <p>
        A long road remains. A consultant told me recently: &ldquo;We asked AI
        whether we should walk or drive to the car. The car was fifty feet
        away. It said walk.&rdquo; It will stay easy to make AI look silly this
        way, and some of it deserves to. But the people who have seen the
        light have mostly seen it alone, in a terminal, at night. Collaborative
        experiences make it far easier for them to share that, and far harder
        for the rest of us to dismiss what we watched happen in the channel.
      </p>

      <p>
        The harness is becoming the agent&rsquo;s interface to the humans who
        operate it. Let&rsquo;s make sure it is plural.
      </p>

      <hr />

      <p className="text-base text-ink-3">
        <em>Sources:</em> Dan McAteer,{" "}
        <a href="https://www.latent.space/p/attention-interface">
          The Evolution of the Agent Harness
        </a>{" "}
        (Latent Space, Aug 2026). Stephen Brozovich,{" "}
        <a href="https://www.youtube.com/watch?v=O7u6myBRsns">
          A leader&rsquo;s guide to advanced team structures in an agentic
          world
        </a>{" "}
        (AWS Summit Sydney, Jun 2026). Quotes from the talk are taken from the
        auto-generated transcript and lightly cleaned.
      </p>
    </>
  );
}
