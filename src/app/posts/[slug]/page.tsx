import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/posts/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.subtitle };
}

export default async function PostPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { Body } = post;

  return (
    <article className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="max-w-3xl py-14 sm:py-20">
        <p className="font-sans text-xs text-ink-3">
          <Link href="/posts" className="link">
            Posts
          </Link>{" "}
          &middot; {formatDate(post.date)} &middot; {post.readingMinutes} min
          read
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-2">
          {post.subtitle}
        </p>
        <p className="mt-6 font-sans text-sm text-ink-3">By {site.name}</p>
      </header>

      <div className="prose prose-site max-w-3xl border-t rule pt-10">
        <Body />
      </div>

      <footer className="mt-16 max-w-3xl border-t rule pt-8">
        <p className="text-lg text-ink-2">
          Working on shared agents inside a real team? I would like to hear how
          it is going.{" "}
          <a href={site.socials.x} className="link">
            Message me on X.
          </a>
        </p>
        <p className="mt-6 font-sans text-sm">
          <Link href="/posts" className="link">
            &larr; All posts
          </Link>
        </p>
      </footer>
    </article>
  );
}
