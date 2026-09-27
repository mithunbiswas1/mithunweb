"use client";

import Link from "next/link";
import WamaLogo from "./WamaLogo";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white pt-20 pb-16 px-4 sm:px-6 border-t border-neutral-900 select-none">
      <div className="max-w-[1400px] mx-auto w-[92%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
          {/* Brand & Address Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8" aria-label="Wama Home">
                <WamaLogo className="h-6 w-auto text-white" />
              </Link>
              <div className="space-y-1 text-sm font-light text-neutral-400">
                <p>Campinas - SP</p>
                <p>Av. Imperatriz D. Teresa Cristina.</p>
                <p className="pt-2 text-xs font-mono text-neutral-500">CNPJ 39.355.398/0001-14</p>
              </div>
            </div>

            <div className="pt-10 text-xs font-mono text-neutral-600">
              © wama 2026. Todos os direitos reservados.
            </div>
          </div>

          {/* Column 1: Serviços */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              SERVIÇOS
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="#servicos" className="hover:text-white transition-colors">
                  Sites em Framer
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-white transition-colors">
                  Desenvolvimento de SaaS
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-white transition-colors">
                  Aplicativos
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-white transition-colors">
                  Design de Interfaces
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="hover:text-white transition-colors">
                  Consultoria de Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Cases */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              CASES
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  Camila Farani
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  KFC Brasil
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  Tera
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  Vibra
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  Wiz Benefícios
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="hover:text-white transition-colors">
                  Pepper
                </Link>
              </li>
              <li className="pt-2">
                <Link href="#projetos" className="text-white hover:underline text-xs font-mono">
                  Ver todos os cases →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Blog */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              BLOG
            </h4>
            <ul className="space-y-3.5 text-xs font-light text-neutral-400">
              <li>
                <Link href="#blog" className="hover:text-white transition-colors line-clamp-1">
                  Agência de desenvolvimento de SaaS: o que exigir
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition-colors line-clamp-1">
                  Modelo de cobrança de SaaS: o que cada um exige
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition-colors line-clamp-1">
                  Licença de fonte para site: o que a empresa assume
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition-colors line-clamp-1">
                  Software sob medida: quem é o dono do código
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition-colors line-clamp-1">
                  Criar SaaS com IA: o que falta para cobrar cliente
                </Link>
              </li>
              <li className="pt-2">
                <Link href="#blog" className="text-white hover:underline font-mono">
                  Ver todos os artigos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Redes Sociais */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              REDES SOCIAIS
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Behance
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dribbble
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light gap-4">
          <p>Feito com excelência de design e Next.js moderno.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-neutral-300">
              Privacidade
            </Link>
            <Link href="#terms" className="hover:text-neutral-300">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
