import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t rule">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-lg text-ink">{site.domain}</p>
            <p className="mt-1 max-w-sm text-sm text-ink-3">
              The mission: {site.mission.toLowerCase()}. Durable, team- and
              organization-level agents.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-ink-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.socials.x}
              className="font-sans text-sm text-ink-2 hover:text-ink"
            >
              X
            </a>
          </nav>
        </div>
        <p className="mt-8 font-sans text-xs text-ink-3">
          © {new Date().getFullYear()} {site.name}. Built with Next.js, deployed
          on Vercel.
        </p>
      </div>
    </footer>
  );
}
