import Image from "next/image";
import Link from "next/link";
import { PopoutFigure } from "@/components/PopoutFigure";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

const talks = [
  {
    title: "[Talk title: Durable agents at the team level]",
    venue: "[Conference name] · [City], [Year]",
    href: "#",
  },
  {
    title: "[Talk title: Spearheading AI adoption across an enterprise]",
    venue: "[Conference name] · [City], [Year]",
    href: "#",
  },
  {
    title: "[Internal tech talk or meetup]",
    venue: "[Company / meetup] · [Year]",
    href: "#",
  },
];

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts[0];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero */}
      <section className="grid gap-10 py-14 sm:grid-cols-[1fr_220px] sm:gap-14 sm:py-20">
        <div>
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">
            I&rsquo;m {site.firstName}.
            <br />
            Let&rsquo;s talk durable,{" "}
            <em className="text-accent">team- and organization-level</em>{" "}
            agents.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-2">
            Classically trained engineer. Enterprise experience shipping
            software in high-level languages, and spearheading AI adoption
            across teams. I give tech conference talks about what happens when
            agents get a first-class seat on the team.
          </p>
          <p className="mt-5 eyebrow">
            The mission &middot;{" "}
            <span className="text-ink">{site.mission}</span>
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

        <figure className="sm:pt-2">
          <Image
            src="/images/headshot.svg"
            alt={`${site.name}, current headshot`}
            width={800}
            height={1000}
            priority
            className="w-full rounded-sm bg-paper-2"
          />
          <figcaption className="mt-3 text-sm leading-relaxed text-ink-3">
            Photographed {new Date().getFullYear()}. Enterprise work in
            high-level languages, and the process of using technology to
            produce business value.
          </figcaption>
        </figure>
      </section>

      {/* Bio + diploma popout */}
      <section className="grid gap-10 border-t rule py-14 sm:grid-cols-[260px_1fr] sm:gap-14">
        <PopoutFigure
          src="/images/diploma.svg"
          alt="University of Illinois Urbana-Champaign, B.S. Computer Engineering diploma"
          width={1200}
          height={900}
          caption={
            <>
              <span className="text-ink">UIUC, Computer Engineering.</span>{" "}
              From the fundamentals of chemistry, physics, and electronics; to
              soldering PCBs and writing machine code; then high-level data
              structures and algorithms. Click to enlarge.
            </>
          }
        />
        <div className="max-w-2xl">
          <p className="eyebrow">Bio</p>
          <div className="prose-site mt-4 space-y-5 text-lg text-ink-2">
            <p>
              I&rsquo;ve been building software from the bottom of the stack
              up: first electrons, then machine code, then the high-level
              languages that run most of the enterprise, and now AI. That
              path shaped a bias I still carry: understand the layer below
              you before you trust the layer above it.
            </p>
            <p>
              Most of my career has been inside{" "}
              <span className="text-ink">[large enterprise / industry]</span>,
              turning technology into business value across{" "}
              <span className="text-ink">[N]</span> teams. Over the last few
              years I spearheaded AI adoption across those teams &mdash; not
              just tooling, but the harder cultural work of getting swarm
              enthusiasts and syntax-loving skeptics to trust the same agents.
            </p>
            <p>
              That work led to a conviction I keep coming back to: agentic
              systems need to be treated first class{" "}
              <em>amongst teams</em>, not just handed to individuals. That is
              what I write and speak about.
            </p>
          </div>
          <p className="mt-6 font-sans text-sm">
            <a
              href={`mailto:${site.email}`}
              className="link"
            >
              {site.email}
            </a>
            <span className="mx-2 text-ink-3">&middot;</span>
            <a href={site.socials.linkedin} className="link">
              LinkedIn
            </a>
            <span className="mx-2 text-ink-3">&middot;</span>
            <a href={site.socials.github} className="link">
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-t rule py-14">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
            &ldquo;[Testimonial placeholder &mdash; a line from a team lead or
            CTO about a workshop or engagement.]&rdquo;
          </p>
          <footer className="mt-4 font-sans text-sm text-ink-3">
            &mdash; [Name] &middot; [Title], [Company]
          </footer>
        </blockquote>
      </section>

      {/* Showcase */}
      <section className="border-t rule py-14">
        <p className="eyebrow">Showcase</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <ShowcaseCard
            href="/posts"
            title="Writing"
            body="Essays on multi-player agent collaboration, harnesses, and what teams look like when agents are first class."
            cta="Open the posts"
          />
          <ShowcaseCard
            href="#talks"
            title="Talks"
            body="Tech conference talks on AI adoption inside real enterprises — the tooling and the culture."
            cta="See the talks"
          />
          <ShowcaseCard
            href="/services"
            title="Services"
            body="Personal consulting and team engagements for organizations moving from individual copilots to shared agents."
            cta="Start here"
          />
        </div>
      </section>

      {/* Talks */}
      <section id="talks" className="border-t rule py-14">
        <div className="grid gap-10 sm:grid-cols-[1fr_1fr] sm:gap-14">
          <div>
            <p className="eyebrow">Tech conference talks</p>
            <ul className="mt-6 divide-y rule">
              {talks.map((t) => (
                <li key={t.title} className="py-4">
                  <a href={t.href} className="link text-lg text-ink">
                    {t.title}
                  </a>
                  <p className="mt-1 font-sans text-sm text-ink-3">{t.venue}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm text-ink-3">
              Recordings and slides will be linked here as they are published.
            </p>
          </div>
          <figure>
            <Image
              src="/images/talk-placeholder.svg"
              alt="On stage at a tech conference"
              width={1600}
              height={900}
              className="w-full rounded-sm bg-paper-2"
            />
            <figcaption className="mt-3 text-sm text-ink-3">
              [Conference name] &middot; [City], [Year]
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Enterprise experience */}
      <section className="border-t rule py-14">
        <p className="eyebrow">Enterprise experience</p>
        <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {["Company one", "Company two", "Company three", "Company four"].map(
            (c) => (
              <li
                key={c}
                className="flex items-center justify-center rounded-sm border rule bg-paper-2 p-4"
              >
                <Image
                  src="/images/logo-placeholder.svg"
                  alt={`[${c} logo]`}
                  width={600}
                  height={200}
                  className="h-10 w-auto opacity-70"
                />
              </li>
            ),
          )}
        </ul>
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
          <a href={`mailto:${site.email}`} className="link">
            Write a short note.
          </a>
        </p>
      </section>
    </div>
  );
}

function ShowcaseCard({
  href,
  title,
  body,
  cta,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-sm border rule bg-paper-2 p-6 transition-colors hover:border-accent"
    >
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-ink-2">{body}</p>
      <p className="mt-5 font-sans text-sm text-ink-3 group-hover:text-accent">
        {cta} &rarr;
      </p>
    </Link>
  );
}
