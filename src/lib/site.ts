// Single source of truth for site-wide strings. Replace placeholders here.
export const site = {
  name: "Brad [Lastname]",
  firstName: "Brad",
  domain: "brad.example",
  url: "https://brad.example",
  tagline: "Engineer",
  description:
    "Classically trained engineer building durable, team- and organization-level AI agents. Talks, enterprise experience, and writing on collaborative AI.",
  email: "hello@brad.example",
  mission: "Collaborative AI experiences",
  socials: {
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
    github: "https://github.com/PLACEHOLDER",
    x: "https://x.com/PLACEHOLDER",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
] as const;
