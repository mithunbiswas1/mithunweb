"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-md text-center">
        <div className="text-8xl font-normal text-neutral-600 mb-6 font-mono">500</div>
        <h2 className="text-2xl font-normal text-white mb-4">
          Ocorreu um erro inesperado
        </h2>
        <p className="text-sm font-light text-neutral-400 mb-8">
          Por favor, tente novamente ou retorne à página inicial.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
