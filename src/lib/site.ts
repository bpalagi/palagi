// Single source of truth for site-wide strings. Replace placeholders here.
export const site = {
  name: "Brad Palagi",
  firstName: "Brad",
  domain: "palagi.vercel.app",
  url: "https://palagi.vercel.app",
  tagline: "\"Post-Syntax\" Engineer",
  description:
    "Classically trained engineer building durable, team- and organization-level AI agents. Talks, enterprise experience, and writing on collaborative AI.",
  mission: "Collaborative AI experiences",
  socials: {
    x: "https://x.com/UncappedTokens",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/posts", label: "Posts" },
] as const;
