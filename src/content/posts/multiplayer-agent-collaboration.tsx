import type { PostMeta } from "@/lib/posts";
import { TeamVisualization } from "@/components/viz/TeamVisualization";

export const meta: PostMeta = {
  slug: "multiplayer-agent-collaboration",
  title: "Six arrangements of humans and agents",
  subtitle:
    "How a team gets from one laptop copilot to a shared pool it trusts, told in six stages, assembled from the people who mapped each step.",
  date: "2026-09-08",
  readingMinutes: 18,
  tags: ["agents", "harness", "team structure", "multiplayer", "governance"],
};

export default function Body() {
  return (
    <>
      <p>
        This is a story about a team. Call them ten engineers, one PM, one
        manager, the usual shape. Over about a year they will move through six
        distinct arrangements of humans and agents, and at every step someone
        has already written down why the step happens and what it costs. I want
        to tell the story in order, borrowing from each of those people as the
        team reaches them, and end with the arrangement none of them quite
        describe.
      </p>

      <h2>Prologue: Christmas 2025</h2>

      <p>
        Dan McAteer&rsquo;s{" "}
        <a href="https://www.latent.space/p/attention-interface">
          history of the agent harness
        </a>{" "}
        opens with a moment most of us remember: sometime around Christmas 2025,
        agents started to work. His explanation is that two curves crossed.
        What the harness asked of the model and what the model could deliver
        had been apart since ReAct wrote the loop down on paper in 2022;
        AutoGPT sprinted ahead of the weights and compounded 95% per-step
        reliability into a 36% chance of finishing a twenty-step task; Cursor
        and Copilot retreated and handed the loop back to the human. Then
        reasoning models arrived, the gap inverted, and Claude Code was the
        first product built for the overhang: a terminal, bash, file access,
        permission rules instead of an approval on every change.
      </p>

      <p>
        The harness, in his phrase, is &ldquo;everything besides the model
        weights that makes the agent work.&rdquo; The model is a brain in a
        vat; the harness gives it a body. And the body that shipped first lived
        in a terminal, which is to say on a laptop, which is to say with one
        person. Nobody chose that as a team arrangement. It was simply where
        the terminal was.
      </p>

      <p>
        That is where our team starts. Ava is running five agents in parallel.
        Cass has never opened one. Everyone else is somewhere in between. Every
        one of those agents has exactly the access Ava or Ben or Dev has, and
        every one of them is invisible to the other eleven people.{" "}
        <strong>Arrangement 1: the solo copilot on a laptop.</strong> When
        Stephen Brozovich describes the modern pod as &ldquo;three to five
        senior engineers, each full stack, <em>each with AI</em>,&rdquo; this is
        the arrangement he is picturing without saying so.
      </p>

      <h2>Act I: the reflex</h2>

      <p>
        The manager notices the spread. Ava&rsquo;s output looks nothing like
        Ben&rsquo;s, and Cass is quietly reviewing everyone&rsquo;s agent-written
        PRs by hand. The first instinct any team has is to standardize the
        thing it can see: the prompt. A shared AGENTS.md lands in the repo. A
        skills folder follows. The team plan gets upgraded so everyone has the
        same connectors.
      </p>

      <p>
        McAteer has the number that explains why this disappoints. Harness-Bench
        ran one model over 106 tasks in different harnesses and got scores from
        52.4 to 76.2, a 23.8-point spread with no change to the weights.
        &ldquo;Half the agent is the harness.&rdquo; Two people with identical
        prompts and different tools, permissions and context windows are
        running different agents. Sergey Karayev&rsquo;s{" "}
        <a href="https://multiplayer-ai.com/">Multiplayer AI Manifesto</a> is
        blunter about the enterprise plans: they &ldquo;only let you share a
        few settings: prompts, skills, and integrations.&rdquo;
      </p>

      <p>
        <strong>Arrangement 2: the solo copilot with shared prompts.</strong>{" "}
        Same owner, same laptop, same silos, now rhyming. In the model at the
        end of this post the bars for arrangement 2 are identical to
        arrangement 1, and that is not an artifact. Nothing about who owns the
        agent or where it runs has moved.
      </p>

      <h2>Act II: we went backwards</h2>

      <p>
        Karayev&rsquo;s manifesto is the piece that names what the team is
        feeling. Collaboration used to be the default. We went from email to
        Slack, from Word to Google Docs, and then, with AI, back into closed
        rooms: &ldquo;each of those chats is a closed room: whatever gets
        figured out in there stays with just one teammate by default.&rdquo;
        Every relay between rooms is a <em>context tax</em>. Priya works with
        Claude on a report, sends it to Marcus, who pastes it into ChatGPT and
        emails the answer back. On our team it is Ben telling his agent
        &ldquo;generate a design doc&rdquo; and Dev telling his agent
        &ldquo;summarize this design doc,&rdquo; while the context that mattered
        sat in Ben&rsquo;s harness the whole time.
      </p>

      <p>
        He also names what the laptop costs. An agent on an employee&rsquo;s
        machine has everything the employee has, stops working when the lid
        closes, and can move a private email into a public channel because a
        document told it to. And he has the evidence for the other side: a
        Harvard Business School field experiment with 776 professionals at
        P&amp;G, where teams working with AI produced top-decile solutions 15.1%
        of the time against 5.1% for individuals without it. Shopify&rsquo;s
        River, reachable only through public Slack channels, co-authored one in
        eight pull requests within a month.
      </p>

      <p>
        Here McAteer&rsquo;s essay hands over its ending. He argues that models
        keep absorbing the harness into their weights, so engineers keep
        deleting what got absorbed (Anthropic reportedly cut 80% of Claude
        Code&rsquo;s system prompt), and what remains is the part a model cannot
        absorb without dissolving: permissions, identity, trust, legibility.
        &ldquo;The harness becomes the agent&rsquo;s interface to the human that
        operates it.&rdquo; The scarce resource, quoting Ryan Lopopolo, is
        &ldquo;the synchronous human attention of <em>my team</em>.&rdquo;
      </p>

      <p>
        Read those two together and the next step writes itself. If the
        harness is becoming an interface to human attention, and the attention
        that is scarce belongs to a team, then the agent should be where the
        team&rsquo;s attention already is. The market&rsquo;s first answer was
        the channel.
      </p>

      <p>
        <a href="https://www.anthropic.com/news/introducing-claude-tag">
          Claude Tag
        </a>{" "}
        shipped in June: &ldquo;within a given Slack channel, there&rsquo;s one
        Claude that interacts with everyone,&rdquo; it remembers the channel, it
        can be ambient and chase threads that went quiet, and Anthropic says 65%
        of their product team&rsquo;s code now comes from the internal version.{" "}
        <a href="https://viktor.com">Viktor</a> lives in Slack and Teams, has
        &ldquo;his own computer in the cloud,&rdquo; and is sold as &ldquo;not a
        tool, a hire.&rdquo; River is the same shape.
      </p>

      <p>
        <strong>Arrangement 3: the channel agent.</strong> Team-owned,
        channel-hosted. Our team adds one to #eng and, for the first time, Cass
        can watch what Ava&rsquo;s prompt actually did and say no to it in
        public. Two of the manifesto&rsquo;s principles come almost for free:
        the door is open because the channel is the session, and nothing is
        copy-pasted because everyone is already talking to the same agent.
      </p>

      <p>
        The manifesto also supplies the caveat, under the heading
        &ldquo;can&rsquo;t I just add an agent to Slack?&rdquo; A lot of the work
        happens off Slack, and the channel agent reaches it only through
        connectors. And the moment a second person is in the session, the
        permission question arrives, which is where the two products quietly
        diverge. Claude Tag has administrators create separate identities per
        channel, with memory that does not cross between them, spend limits per
        channel, and a log of what the agent did with who requested it.
        Viktor, today, runs one instance per workspace, shares every connected
        integration with every teammate, draws context from public channels and
        DMs alike, and lists role-based access and per-user token scoping as
        roadmap. That is the manifesto&rsquo;s privacy pitfall as a product
        screenshot: when Marcus joins a session that has seen Dana&rsquo;s inbox,
        does the agent know to stop repeating it? Everyone on our team still
        has their laptop agents, too. The channel changed one agent&rsquo;s
        arrangement, not the other twenty.
      </p>

      <h2>Act III: the bill</h2>

      <p>
        Brozovich&rsquo;s{" "}
        <a href="https://www.youtube.com/watch?v=O7u6myBRsns">
          leader&rsquo;s guide to team structure
        </a>{" "}
        is where the cost lands. He describes four forces acting at once. The
        expert multiplier: a group of senior people with agents is an order of
        magnitude faster. The bottleneck shift: the question is no longer can we
        build it but can we decide fast enough. The verification tax:
        &ldquo;AI generates code ten times faster, but it&rsquo;s three times
        harder to validate. The reviewing bottleneck eats the velocity if
        you&rsquo;re not careful.&rdquo; And the deskilling trap: juniors using
        agents ship about 17% more and understand 17% less of what they shipped.
      </p>

      <p>
        The channel agent made the work visible. It did nothing to make it
        reviewable. Our team now has a channel full of diffs, and Cass is still
        the one reading them. This is the problem the shared-session workspaces
        are shaped around. <a href="https://www.superconductor.com/">Superconductor</a>{" "}
        makes every agent session accessible to everyone on the team: you can
        &ldquo;jump in on a teammate&rsquo;s run anytime, take the wheel, steer
        alongside them, or just review the output.&rdquo; A reviewer asks the
        agent about the PR instead of pinging the developer. Guided review
        orders the diff and annotates it; artifacts show screenshots and video
        of what the agent did; several agents can take one ticket and the
        platform recommends which implementation to read first.{" "}
        <a href="https://buzz.xyz">Buzz</a>, from the one line it has published,
        is the same idea: &ldquo;your people, your agents, your project, all in
        one place.&rdquo;
      </p>

      <p>
        It also happens to be where the manifesto&rsquo;s &ldquo;important
        considerations&rdquo; stop being considerations and become features.
        Agents run in cloud sandboxes, not on laptops. Egress is an explicit
        allow-list. Spend is tracked per agent and per person. Your personal
        agents move into the box too: you are still the one driving, but the
        session is in a place the team can see.
      </p>

      <p>
        <strong>Arrangement 4: the shared session workspace.</strong>{" "}
        Team-owned, cloud-hosted. In the model this is the single largest move
        on the permission bar of the whole journey, because it is the first
        arrangement where the personal agents stop carrying their owner&rsquo;s
        full access. The cost is that it is another surface, and it is
        coding-shaped. Principle one of the manifesto says the agent should be
        reachable from every place the work happens; Superconductor answers
        with entry points from Slack, GitHub comments and a phone, which is the
        right answer, but the session still lives in their workspace rather
        than in yours.
      </p>

      <h2>Act IV: scale, and the organization</h2>

      <p>
        By now the team is not the only team. Brozovich&rsquo;s talk is really
        about this altitude. Model A, engineering builds and throws it over the
        wall to operations, is &ldquo;dead, full stop&rdquo;: a quarter of
        incident time is spent assembling the humans who understand what
        happened, operators cannot see what their agents are doing, and 95% of
        pilots fail to reach meaningful impact. Model B is the embedded pod:
        three to five seniors who build and run their own agents, DORA-elite
        numbers, because &ldquo;the people who wrote the agent&rsquo;s system
        prompt are the same ones debugging it at 3 a.m.&rdquo; And Model B
        breaks at ten pods, when &ldquo;each pod builds a slightly different
        auth layer, a slightly different observability stack, differently,
        badly, repeatedly.&rdquo;
      </p>

      <p>
        So Model C: pods plus a platform that provides runtime, memory,
        identity and observability, and enforces policy at a gateway outside
        the LLM loop. &ldquo;You don&rsquo;t ask the agent nicely not to do
        something.&rdquo; Four questions get answered before the agent acts: who
        is it and who authorized it, what may it do, is it performing, can we
        audit it. He points out that Singapore&rsquo;s IMDA agentic framework
        and Amazon&rsquo;s AgentCore landed on the same four independently, and
        that the Singapore version is the first to mandate agent identity as a
        prerequisite rather than a nice-to-have. Around the org he draws the
        hourglass: pods at the top doing execution with agents, a deliberately
        protected base of juniors learning the craft, because &ldquo;if you stop
        training your juniors, where do your seniors come from?&rdquo;
      </p>

      <p>
        Our team becomes a pod: Ava, Cass, Dev, Ivan, each now an expert
        generalist, standing on the platform.{" "}
        <strong>Arrangement 5: pod plus platform.</strong> Person-owned agents on
        an organization-owned platform. It is the arrangement most large
        engineering organizations will actually build, and it is the
        prerequisite for what comes next.
      </p>

      <p>
        Notice what it does not change. &ldquo;Each full stack, each with
        AI.&rdquo; The platform is shared; the agents are not. Inside the pod
        every hand-off is lossy again, because Ava&rsquo;s agent and
        Dev&rsquo;s agent share a gateway and nothing else. And the
        platform&rsquo;s visibility is an audit log, which answers the
        auditor&rsquo;s four questions and does nothing for the teammate who
        wanted to watch. In the model the visibility bar drops from arrangement
        4 to arrangement 5. That is the cost of the shop floor becoming a
        compliance record.
      </p>

      <h2>Act V: the missing row</h2>

      <p>
        Lay the three essays side by side and each one is holding a piece.
        McAteer&rsquo;s harness is an interface to a human; the fix is a single
        letter, <em>human(s)</em>. Karayev&rsquo;s principles describe how the
        agent should behave with those humans: never copy-and-paste, work with
        the door open, people are not routers, nothing starts from scratch.
        Brozovich&rsquo;s platform is where it runs and who is allowed to stop
        it. None of them writes the row that combines them: agents the team
        owns, on the platform the organization owns, in the channel and the
        workspace and the cluster at once.
      </p>

      <p>
        <strong>Arrangement 6: pod, platform, and shared agents.</strong> A
        reviewer with its own GitHub identity. A triage agent that is a
        participant in the Jira conversation rather than a bot. A release agent
        that posts what it is about to do in the Slack code channel before it
        does it. An on-call agent with a scoped credential in the cluster.
        Each has a team identity, not a person&rsquo;s, so the gateway can
        answer &ldquo;who is the agent&rdquo; with a name the whole pod
        recognizes. Each lives where the team already talks, so the door is
        open by construction. And each has the thing McAteer predicts every
        agentic company will ship next, an attention policy, except that here
        it is a team document: whose attention this agent may spend, when it
        may interrupt, which decisions it may take alone. The manifesto&rsquo;s
        &ldquo;people are not routers&rdquo; is the same idea from the other
        side. The shared agent is the thing that stops a human being asked a
        question the team already answered.
      </p>

      <p>
        This arrangement is not free, and the bill is Brozovich&rsquo;s. A
        shared agent produces for everyone, so somebody has to read it; in the
        model the verification bar goes <em>up</em> from arrangement 5 to 6,
        and it only stays sane because arrangement 6 borrows the review tooling
        arrangement 4 invented. Trust is a team feeling that has to be earned
        in public, not configured in a settings page. And the visibility bar
        does not reach 100%, because the pod still has personal agents and the
        platform only audit-logs them. Which is why I list this arrangement
        last and describe it as made of the others: the platform from 5 scopes
        it, the workspace from 4 makes it reviewable, the channel from 3 is
        where the team reads it.
      </p>

      <h2>Walk the stages</h2>

      <p>
        The figure below is the team&rsquo;s journey as a stepper. Each stage
        shows who owns the agents, where their sessions live, the products that
        embody it, and four bars traced to the sources: context tax (Karayev),
        verification load (Brozovich), permission surface (Karayev and
        Brozovich), and the share of agent work the team can see and audit
        (McAteer and Karayev). The bars are an illustrative model, not a
        measurement. The constants are stated assumptions (a shared agent does
        about three personal agents&rsquo; worth of work; a laptop agent carries
        about three times the access of a sandboxed one; guided review cuts
        validation effort by about 40%), and the curve shapes come from the
        essays. Push it and watch which direction each step moves each bar.
      </p>

      <TeamVisualization initialStage={1} />

      <p>Three things the stepper makes plain that the essays leave as prose.</p>

      <p>
        <strong>Arrangement 2 is arrangement 1.</strong> Every bar is identical.
        Sharing prompts is the most common first move and it is not a move.
      </p>

      <p>
        <strong>The sandbox is the biggest single step.</strong> Going from the
        channel agent to the shared workspace cuts the permission surface by
        roughly three-quarters and takes visibility from a sixth of the work to
        all of it, because it is the first arrangement where the{" "}
        <em>personal</em> agents change where they run. The manifesto&rsquo;s
        &ldquo;agents don&rsquo;t belong on laptops&rdquo; and Brozovich&rsquo;s
        gateway are the same bar moving.
      </p>

      <p>
        <strong>Six pays for what five hides.</strong> Adding shared agents to
        the pod takes context tax to nearly nothing and visibility most of the
        way back, and charges for it in verification. That trade is the whole
        design problem of arrangement 6, and it is the one the products have
        not solved yet because none of them are shaped like it.
      </p>

      <h2>What the map leaves out</h2>

      <p>
        Every example in the manifesto and the products is an office: Gmail,
        Google Docs, Salesforce, ServiceNow, a pricing PR. That is the right
        shape for the market they are after. It is not the shape of the teams I
        work with, where the surfaces are Jira, GitHub Enterprise, Kubernetes
        and a pager. A reviewer agent needs a GitHub identity you can audit. A
        release agent needs a scoped credential in a cluster, not a Slack
        token. An on-call agent has to be a participant in the incident channel
        and have read access to the namespace. The channel agents do not reach
        that today, and the workspaces reach the repo but not the cluster.
        Arrangement 6 is, for now, something a platform team builds.
      </p>

      <p>
        There is a second reason to want it that the products do not
        advertise, and it closes Brozovich&rsquo;s loop. His hourglass keeps
        juniors so that there are seniors in 2034; his deskilling trap is
        juniors shipping code they do not understand. A shared agent whose
        sessions the whole team reads is Tobi L&uuml;tke&rsquo;s shop floor: the
        junior watches the senior correct the agent, in the channel, in the
        open. The laptop agent of arrangement 1 is the opposite. It is the
        closed office door Hamming warned about, with an assistant inside.
      </p>

      <h2>Zooming out</h2>

      <p>
        Step back past teams. Those of us energized by this technology have a
        known problem: public discontent, most visibly as data-center fear, and
        more quietly as the sense that AI is something done to people rather
        than with them. Arrangements 3, 4 and 6 have a property the first two
        do not: a skeptic can watch what the agent did and say no, in a place
        the rest of the team can see. Inside the industry that is how the
        swarm-runners and the syntax-loving skeptics end up in the same
        conversation. Outside it, it is a version of this technology that is
        legible, accountable and social, which is the version most people
        would actually accept.
      </p>

      <p>
        A consultant told me recently: &ldquo;We asked AI whether we should walk
        or drive to the car. The car was fifty feet away. It said walk.&rdquo;
        It will stay easy to make AI look silly this way, and some of it
        deserves to. But the people who have seen the light have mostly seen it
        alone, in a terminal, at night. Put the agent in the channel and it
        gets far easier for them to share that, and far harder for the rest of
        us to dismiss what we watched happen.
      </p>

      <p>
        The harness is becoming the agent&rsquo;s interface to the humans who
        operate it. The arrangement decides how many of them there are, and
        whether they can see each other. Choose it on purpose.
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
        (AWS Summit, Jun 2026; quotes from the auto-generated transcript,
        lightly cleaned). Sergey Karayev and the Superconductor team,{" "}
        <a href="https://multiplayer-ai.com/">The Multiplayer AI Manifesto</a>{" "}
        (Sep 2026), citing Dell&rsquo;Acqua et al.,{" "}
        <a href="https://www.oneusefulthing.org/p/the-cybernetic-teammate">
          The Cybernetic Teammate
        </a>{" "}
        (HBS working paper, 2025) and Tobi L&uuml;tke on River. Anthropic,{" "}
        <a href="https://www.anthropic.com/news/introducing-claude-tag">
          Introducing Claude Tag
        </a>{" "}
        (Jun 2026). Product claims for{" "}
        <a href="https://www.superconductor.com/">Superconductor</a>,{" "}
        <a href="https://viktor.com">Viktor</a> and{" "}
        <a href="https://buzz.xyz">Buzz</a> are taken from their public sites
        as of Sep 2026 and will drift. The stepper&rsquo;s model, its constants
        and the checks that pin its claims are in the site source.
      </p>
    </>
  );
}
