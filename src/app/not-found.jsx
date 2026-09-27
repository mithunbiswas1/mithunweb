import Link from "next/link";

export const metadata = {
  title: "404 - Página Não Encontrada | Mithun Web",
  description: "A página que você está procurando não existe ou foi movida.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-md text-center">
        <div className="text-8xl font-normal text-neutral-600 mb-6 font-mono">404</div>
        <h1 className="text-3xl font-normal tracking-tight text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-sm font-light text-neutral-400 mb-8 leading-relaxed">
          A página que você tentou acessar não está disponível.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
