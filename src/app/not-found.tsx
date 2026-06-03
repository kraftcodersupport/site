import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-24 text-center">
      <div>
        <SearchX className="mx-auto h-16 w-16 text-accent" />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-soft sm:text-base">
          The page you were looking for is missing or moved. The main site is
          still here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </section>
  );
}
