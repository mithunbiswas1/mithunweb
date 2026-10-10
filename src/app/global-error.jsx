// src/app/global-error.jsx

"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <head>
        <title>Error | Mithun Web</title>
        <meta name="robots" content="noindex, follow" />
      </head>
      <body className="bg-[#050505] text-[#EDEDED] font-sans antialiased min-h-screen flex items-center justify-center p-6">
        <main className="max-w-md w-full text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Something went wrong</h1>
          <p className="text-[#888888] text-sm mb-8">
            An unexpected error occurred. Please try reloading the page or return to the homepage.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
