import type { ComponentType } from "react";

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  draft?: boolean;
};

export type Post = PostMeta & {
  Body: ComponentType;
};

// Posts are authored as React components in src/content/posts so that
// interactive visualizations can be embedded directly.
const registry: Array<() => Promise<Post>> = [
  async () => {
    const mod = await import("@/content/posts/multiplayer-agent-collaboration");
    return { ...mod.meta, Body: mod.default };
  },
  async () => {
    const mod = await import("@/content/posts/placeholder-second-post");
    return { ...mod.meta, Body: mod.default };
  },
];

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(registry.map((load) => load()));
  return posts
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
