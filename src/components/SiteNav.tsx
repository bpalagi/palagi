"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="border-b rule">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink hover:text-accent transition-colors"
        >
          {site.domain}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-sans text-sm transition-colors ${
                  active
                    ? "text-ink underline underline-offset-[6px] decoration-accent"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`mailto:${site.email}`}
            className="hidden font-sans text-sm text-ink-2 hover:text-ink sm:inline"
          >
            Get in touch
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
