"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: React.ReactNode;
  className?: string;
};

/**
 * A "popout" figure: subtle lift/tilt on hover, full-size lightbox on click.
 * Uses the native <dialog> element so Escape/backdrop close come for free.
 */
export function PopoutFigure({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="popout block w-full cursor-zoom-in overflow-hidden rounded-sm bg-paper-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Enlarge: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          priority
        />
      </button>
      <figcaption className="mt-3 text-sm leading-relaxed text-ink-3">
        {caption}
      </figcaption>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto max-h-[92vh] max-w-[92vw] rounded-md bg-paper p-2 shadow-2xl backdrop:bg-black/70"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="max-h-[80vh] w-auto"
        />
        <div className="flex items-start justify-between gap-6 px-2 pb-1 pt-3">
          <p className="text-sm text-ink-2">{caption}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="font-sans text-xs uppercase tracking-widest text-ink-3 hover:text-ink"
          >
            Close
          </button>
        </div>
      </dialog>
    </figure>
  );
}
