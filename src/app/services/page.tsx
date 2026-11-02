import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Consulting scope for teams moving from personal copilots to shared, governed agents: hosting, firewalls, permission scoping, provider independence, audit, and build-vs-buy.",
};

// The hard parts of multiplayer AI. Each one is a place teams get stuck and
// a place I do the work. Ordered the way a team usually hits them.
const scope = [
  {
    n: "1",
    title: "Get agents off laptops",
    problem:
      "Every personal agent carries its owner's full access, stops when the lid closes, and is invisible to the rest of the team. Most orgs have dozens and no list.",
    work:
      "Inventory the agents and credentials actually in use, then pick the target arrangement: channel agent, shared workspace, or a pod on your platform. Move the first workflow.",
    leave: "A credential inventory and a named target arrangement per team.",
  },
  {
    n: "2",
    title: "Firewall every agent",
    problem:
      "An agent tricked by a document or an email will send data where it should not. You cannot fix that with a system prompt.",
    work:
      "Put policy at the gateway, outside the model loop: network allow-lists per agent, scoped credentials in the cluster, egress the security team owns and engineering does not have to ask about.",
    leave: "A gateway policy and an allow-list for each shared agent.",
  },
  {
    n: "3",
    title: "Scope permissions for shared sessions",
    problem:
      "The moment a second person joins a session, the agent knows things the newcomer is not allowed to know. Per-channel identity, memory boundaries, and the intersection of member permissions are where products differ most and teams get burned.",
    work:
      "Design the identity model: which agent exists in which channel, what it remembers, what it may repeat, and what happens when membership changes.",
    leave: "An identity and scoping model your admins can actually configure.",
  },
  {
    n: "4",
    title: "Stay provider-agnostic",
    problem:
      "The best model changes monthly, and a single vendor's incentive is your token bill. Most tasks do not need the frontier model anyway.",
    work:
      "Build the harness so the model is a setting. Stand up a benchmark from pull requests your team is proud of, so swapping is a measured decision. Track spend per agent and per person.",
    leave: "A benchmark on your codebase and a swap plan with numbers.",
  },
  {
    n: "5",
    title: "Governance as infrastructure",
    problem:
      "A year from now someone will ask: which agent ran, who asked it to, what data did it touch, what did it change. Regulated teams cannot answer that from a Slack scrollback.",
    work:
      "Give every agent a verifiable identity before it acts. Define the audit record. Split who writes policy from who writes agents. Map to the IMDA agentic framework if you sell into regulated sectors.",
    leave: "An audit record schema and an agent identity model in running code.",
  },
  {
    n: "6",
    title: "Build, buy, or open source",
    problem:
      "A basic multiplayer setup takes a week. A complete one is a product. Deciding wrong either burns a platform team or hands your learnings to a vendor.",
    work:
      "Decide per workflow, not per company: use, compose, or build. Whatever you choose, the skills, evals and transcripts your team produces stay yours.",
    leave: "A use / compose / build decision for each workflow and the data-ownership terms to insist on.",
  },
  {
    n: "7",
    title: "Protect the pipeline",
    problem:
      "Juniors using agents ship more and understand less. Cutting them is the fastest way to hit this year's ROI target and the surest way to have no seniors in 2034.",
    work:
      "Make shared agent sessions the shop floor: juniors read the senior correcting the agent, in the open. Design the review rotation so verification is where the learning happens.",
    leave: "A team shape and a review practice that grows people while the agents do the execution.",
  },
];

const formats = [
  {
    title: "Talks",
    body:
      "Conference and company-wide talks on agents as first-class team members. Built for rooms that contain both the swarm-runners and the people who think it is all hallucinating nonsense.",
    meta: "45–60 min · in person or remote · Q&A",
  },
  {
    title: "Consulting",
    body:
      "A few focused sessions with a tech lead, staff engineer or manager. We work the first two or three items above against your actual team and leave with a plan you can take to budget.",
    meta: "3–5 sessions · 60–90 min · async between",
  },
  {
    title: "Team engagements",
    body:
      "Multi-week work with one team to stand up its first shared agent in the tools it already uses, with the skeptics in the room and items one through five done properly rather than deferred.",
    meta: "4–8 weeks · one team · embedded or hybrid",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="max-w-3xl py-14 sm:py-20">
        <p className="eyebrow">What {site.firstName} offers</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Services
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-2">
          Everyone agrees AI at work should be multiplayer. The hard part is
          not the agreement, it is the seven places a real team gets stuck on
          the way there. That list is my scope. I work with a small number of
          engineering teams at a time, inside the tools they already use:
          Slack, Jira, GitHub, Kubernetes.
        </p>
        <p className="mt-4 text-base text-ink-3">
          Background on the arrangements this scope refers to:{" "}
          <Link
            href="/posts/multiplayer-agent-collaboration"
            className="link"
          >
            Six arrangements of humans and agents
          </Link>
          .
        </p>
      </header>

      <section className="border-t rule py-14">
        <p className="eyebrow">Scope</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">
          The hard parts, in the order teams hit them.
        </h2>
        <ol className="mt-10 divide-y rule">
          {scope.map((s) => (
            <li key={s.n} className="grid gap-6 py-10 sm:grid-cols-[3rem_1fr_1fr]">
              <span className="font-serif text-3xl text-accent">{s.n}</span>
              <div>
                <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-lg text-ink-2">{s.problem}</p>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-ink-2">{s.work}</p>
                <p className="font-sans text-sm text-ink-3">
                  <span className="eyebrow">You leave with</span>
                  <br />
                  {s.leave}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t rule py-14">
        <p className="eyebrow">How we work together</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {formats.map((f) => (
            <div key={f.title} className="rounded-sm border rule bg-paper-2 p-6">
              <h3 className="font-serif text-2xl text-ink">{f.title}</h3>
              <p className="mt-3 text-ink-2">{f.body}</p>
              <p className="mt-5 font-sans text-sm text-ink-3">{f.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t rule py-14">
        <p className="eyebrow">Why me</p>
        <div className="mt-4 max-w-3xl space-y-5 text-lg text-ink-2">
          <p>
            I am not a forty-year veteran with a book deal. I have spent the
            last several years inside an enterprise, shipping software and
            pushing agent adoption across teams while the tools changed under
            us every quarter. The scope above is not a framework I read about;
            it is the list of things that went wrong, in order.
          </p>
          <p>
            The method is the same every time: find the workflow where a
            shared agent pays for itself first, then build it with the skeptics
            in the room, because their trust is what makes it durable.
          </p>
        </div>
      </section>

      <section className="border-t rule py-14">
        <p className="eyebrow">Next step</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">
          Tell me which number you are stuck on.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
          The best engagements start with a short, direct conversation. Say
          where your team is, a pile of laptop agents, a stalled pilot, an
          auditor with questions, and which of the seven you want to work on
          first.
        </p>
        <a
          href={site.socials.x}
          className="mt-6 inline-block rounded-sm bg-ink px-5 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent"
        >
          Book an engagement
        </a>
      </section>
    </div>
  );
}
