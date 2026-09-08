import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Nothing here.</h1>
      <p className="mt-4 text-lg text-ink-2">
        The page you asked for does not exist, or has not been written yet.
      </p>
      <p className="mt-6 font-sans text-sm">
        <Link href="/" className="link">
          &larr; Back home
        </Link>
      </p>
    </div>
  );
}
