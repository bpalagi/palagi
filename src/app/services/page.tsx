import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Personal consulting and team engagements: moving from individual copilots to shared, trustworthy agents.",
};

const offerings = [
  {
    n: "1",
    title: "Talks",
    lede:
      "Conference and company-wide talks on agents as first-class team members.",
    body: [
      "I speak from inside the enterprise, not from a vendor booth. The talks are built around the shift from a team of ten people each running their own agents to a team of four with a shared, trusted pool — and what breaks along the way. They land with both camps in the room: the people running agent swarms and the people who still think it is all hallucinating nonsense.",
      "Current topics include Multi-player Agent Collaboration, The Harness as the Interface to the Team, and What AI Adoption Actually Looked Like Across [N] Teams. Happy to build a talk around your event or company theme.",
    ],
    format: "45–60 min · in person or remote · Q&A included",
    image: "/images/talk-placeholder.svg",
    imageCaption: "[Conference name] · [City], [Year]",
  },
  {
    n: "2",
    title: "Personal consulting",
    lede: "Direct, hands-on time with a tech lead, staff engineer, or manager.",
    body: [
      "A few focused sessions to look at how you and your team actually work with agents today: which tools, which prompts, where the lossy hand-offs are between one person's “generate a doc” and the next person's “summarize this doc.” We leave with a concrete plan for your harness, your permissions model, and your first shared agent.",
      "This is the realistic starting point for most teams. It is inexpensive, low-ceremony, and it tells you quickly whether a larger engagement makes sense.",
    ],
    format: "3–5 sessions · 60–90 min each · async follow-up between sessions",
    image: null,
    imageCaption: null,
  },
  {
    n: "3",
    title: "Team engagements",
    lede:
      "Multi-week work with one team to stand up durable, shared agents in the tools you already use.",
    body: [
      "We pick one workflow — code review, incident triage, documentation, ticket grooming — and build a shared agent for it with the whole team in the room. It lives where the team already talks: Slack code channels, Jira conversations, GitHub, your docs, your cluster. Permissions, identity, and audit are treated as team concerns from day one.",
      "The goal is a common feeling about the agent's trustworthiness. Skeptics get a seat and a veto. Enthusiasts get guardrails they help design. Everyone leaves with a shared vocabulary and something that works on Monday.",
    ],
    format: "4–8 weeks · one team · embedded or hybrid",
    image: null,
    imageCaption: null,
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
          I work with a small number of teams at a time, and the work is
          practical: help a real team move from a pile of personal copilots to
          shared agents they trust. Talks to align the room, consulting to find
          the starting point, and team engagements to build the thing.
        </p>
      </header>

      <section className="border-t rule py-14">
        <p className="eyebrow">Why it works</p>
        <div className="mt-4 grid gap-10 sm:grid-cols-[1fr_1fr] sm:gap-14">
          <div className="space-y-5 text-lg text-ink-2">
            <h2 className="font-serif text-3xl text-ink">
              Depth teams can feel, at a scale you can afford.
            </h2>
            <p>
              I&rsquo;m not a forty-year veteran with a book deal. I am someone
              who has spent the last several years inside an enterprise,
              shipping software and pushing AI adoption across teams while the
              tools changed under us every quarter. That is the vantage point
              most teams actually need right now.
            </p>
            <p>
              The method is the same every time: study where the team is,
              which does not take long; find the workflow where a shared agent
              pays for itself first; then build it with the skeptics in the
              room, because their trust is what makes it durable.
            </p>
          </div>
          <figure>
            <Image
              src="/images/talk-placeholder.svg"
              alt="Working session with an engineering team"
              width={1600}
              height={900}
              className="w-full rounded-sm bg-paper-2"
            />
            <figcaption className="mt-3 text-sm text-ink-3">
              [Working session photo] &middot; [Company], [Year]
            </figcaption>
          </figure>
        </div>
      </section>

      {offerings.map((o) => (
        <section key={o.n} className="border-t rule py-14">
          <div className="grid gap-10 sm:grid-cols-[1fr_1fr] sm:gap-14">
            <div>
              <h2 className="font-serif text-3xl text-ink">
                <span className="mr-3 text-accent">{o.n}</span>
                {o.title}
              </h2>
              <p className="mt-3 text-xl leading-snug text-ink">{o.lede}</p>
              <div className="mt-5 space-y-4 text-lg text-ink-2">
                {o.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-6 font-sans text-sm text-ink-3">{o.format}</p>
            </div>
            <div>
              {o.image ? (
                <figure>
                  <Image
                    src={o.image}
                    alt=""
                    width={1600}
                    height={900}
                    className="w-full rounded-sm bg-paper-2"
                  />
                  <figcaption className="mt-3 text-sm text-ink-3">
                    {o.imageCaption}
                  </figcaption>
                </figure>
              ) : (
                <div className="rounded-sm border rule bg-paper-2 p-6">
                  <p className="eyebrow">Good fit if</p>
                  <ul className="mt-3 space-y-2 text-ink-2">
                    {o.n === "2" ? (
                      <>
                        <li>&bull; You lead a team of 5–15 engineers.</li>
                        <li>
                          &bull; Everyone has an AI tool; nobody shares a
                          workflow.
                        </li>
                        <li>
                          &bull; You want a plan before you ask for budget.
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          &bull; You have a workflow where hand-offs are lossy
                          and frequent.
                        </li>
                        <li>
                          &bull; Your team lives in Slack, Jira, GitHub, and
                          Kubernetes.
                        </li>
                        <li>
                          &bull; You have at least one loud skeptic. Good.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t rule py-14">
        <p className="eyebrow">Happy to provide references</p>
        <blockquote className="mt-4 max-w-3xl">
          <p className="font-serif text-2xl italic leading-snug text-ink">
            &ldquo;[Testimonial placeholder from a team lead about a shared
            agent engagement.]&rdquo;
          </p>
          <footer className="mt-3 font-sans text-sm text-ink-3">
            &mdash; [Name] &middot; [Title], [Company]
          </footer>
        </blockquote>
      </section>

      <section className="border-t rule py-14">
        <p className="eyebrow">Next step</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">
          Bring this to your team.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
          The best engagements start with a short, direct conversation rather
          than a service menu. Tell me where your team is &mdash; a pile of
          personal copilots, a stalled pilot, a skeptical lead &mdash; and what
          you are trying to accomplish.
        </p>
        <a
          href={`mailto:${site.email}?subject=Engagement`}
          className="mt-6 inline-block rounded-sm bg-ink px-5 py-2.5 font-sans text-sm text-paper transition-colors hover:bg-accent"
        >
          Book an engagement
        </a>
      </section>
    </div>
  );
}
