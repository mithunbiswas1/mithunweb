// src/app/not-found.jsx

import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Mithun Web",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-md text-center">
        <div className="text-8xl font-normal text-neutral-600 mb-6 font-mono">404</div>
        <h1 className="text-3xl font-normal tracking-tight text-white mb-4">
          Page not found
        </h1>
        <p className="text-sm font-light text-neutral-400 mb-8 leading-relaxed">
          The page you requested could not be found or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
