import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts[0];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero */}
      <section className="grid gap-10 py-14 sm:grid-cols-[220px_1fr] sm:gap-14 sm:py-20">
        {/* tabIndex lets touch and keyboard users open the popout via focus-within */}
        <figure
          tabIndex={0}
          className="group relative mx-auto w-full max-w-[220px] self-start outline-none sm:pt-2"
        >
          <Image
            src="/images/talk-portrait.jpg"
            alt={`${site.name} presenting Durable Agents at a tech conference`}
            width={640}
            height={640}
            priority
            className="aspect-square w-full rounded-full border-[6px] border-paper-2 object-cover ring-1 ring-ink-3/40 transition-shadow group-hover:ring-accent group-focus-within:ring-accent"
          />
          <figcaption className="mt-4 text-xs leading-relaxed text-ink-3">
            <p className="text-sm text-ink">Durable Agents</p>
            <p>GTG Tech Conference 2026 &middot; Sheraton Grand Chicago Riverwalk</p>
            <div className="pointer-events-none absolute left-0 top-full z-10 w-[min(22rem,calc(100vw-2.5rem))] pt-2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <p className="translate-y-1 rounded-sm border border-l-4 border-accent/50 border-l-accent bg-paper-2 p-4 text-sm leading-relaxed text-ink shadow-2xl shadow-black/50 transition duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                Shared team agents are applications, so they should be built like
                them: version-controlled, code-reviewed, tested, observable, and
                shipped through the same pipeline as everything else. The talk walked
                through deploying them that way on Kubernetes with Solo.io&rsquo;s{" "}
                <a href="https://www.solo.io/products/kagent"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-[3px] transition-colors hover:text-accent">
                  kagent
                </a>{" "}
                for declarative agent deployments,{" "}
                <a href="https://www.solo.io/products/agentgateway"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-[3px] transition-colors hover:text-accent">
                  agentgateway
                </a>{" "}
                for auth, policy, and egress on every MCP and agent-to-agent call, and{" "}
                <a href="https://www.solo.io/products/agentregistry"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-[3px] transition-colors hover:text-accent">
                  agentregistry
                </a>{" "}
                as the catalog of approved agents, MCP servers, and skills.
              </p>
            </div>
          </figcaption>
        </figure>

        <div>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">
            I&rsquo;m {site.firstName}.
            <br />
            Let&rsquo;s talk <em className="text-accent">collaborative</em>{" "}
            agentic systems.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-2">
            Classically trained engineer shipping enterprise distributed
            systems and spearheading agentic workflows across teams. I give
            tech conference talks about what happens when agents get a
            first-class seat on the team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 font-sans text-sm">
            <Link
              href="/services"
              className="rounded-sm bg-ink px-4 py-2 text-paper transition-colors hover:bg-accent"
            >
              Work with me
            </Link>
            {featured && (
              <Link
                href={`/posts/${featured.slug}`}
                className="rounded-sm border rule px-4 py-2 text-ink transition-colors hover:border-accent"
              >
                Read the latest post &rarr;
              </Link>
            )}
          </div>
        </div>

      </section>

      {/* Latest writing */}
      <section className="border-t rule py-14">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Latest writing</p>
          <Link href="/posts" className="font-sans text-sm link">
            All posts &rarr;
          </Link>
        </div>
        <ul className="mt-6 divide-y rule">
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} className="py-5">
              <Link href={`/posts/${p.slug}`} className="group block">
                <h3 className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1 text-ink-2">{p.subtitle}</p>
                <p className="mt-2 font-sans text-xs text-ink-3">
                  {formatDate(p.date)} &middot; {p.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t rule py-14">
        <p className="max-w-2xl text-lg text-ink-2">
          Considering an engagement? I work with a small number of teams
          making the move from individual copilots to shared, trustworthy
          agents: talks, working sessions, and hands-on team engagements.{" "}
          <a href={site.socials.x} className="link">
            Send me a message on X.
          </a>
        </p>
      </section>
    </div>
  );
}
