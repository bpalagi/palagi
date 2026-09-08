import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Writing on multi-player agent collaboration, harnesses, and team structure.",
};

export default async function PostsPage() {
  const posts = await getAllPosts();
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="max-w-3xl py-14 sm:py-20">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Posts
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-ink-2">
          Essays on agents as first-class members of teams and organizations
          &mdash; the harness, the team shape, and the culture around both.
        </p>
      </header>

      <ul className="divide-y rule border-t rule">
        {posts.map((p) => (
          <li key={p.slug} className="py-8">
            <Link href={`/posts/${p.slug}`} className="group block max-w-3xl">
              <p className="font-sans text-xs text-ink-3">
                {formatDate(p.date)} &middot; {p.readingMinutes} min read
                {p.draft && (
                  <span className="ml-2 rounded-sm bg-paper-2 px-1.5 py-0.5 uppercase tracking-wider">
                    draft
                  </span>
                )}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-2 text-lg text-ink-2">{p.subtitle}</p>
              <p className="mt-3 flex flex-wrap gap-2 font-sans text-xs text-ink-3">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-sm border rule px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
