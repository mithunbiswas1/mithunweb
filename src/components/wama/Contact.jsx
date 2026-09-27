"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/data/wama-data";
import { Check, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState(["Site"]);
  const [selectedBudget, setSelectedBudget] = useState("R$ 10 mil a R$ 50 mil");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    empresa: "",
    email: "",
    detalhes: "",
  });

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nome: "", telefone: "", empresa: "", email: "", detalhes: "" });
    }, 5000);
  };

  return (
    <section id="contato" className="bg-[#000000] text-white py-24 sm:py-36 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-[92%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase mb-4">
                FALE CONOSCO
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.1] tracking-tight text-white mb-6">
                Seu próximo projeto começa aqui
              </h2>
              <p className="text-base sm:text-lg font-light text-neutral-400 leading-relaxed mb-10">
                Entendemos seu momento, seus objetivos e mostramos como design e código podem transformar sua ideia em um produto digital de alto nível.
              </p>

              {/* Checkpoints */}
              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Entendimento do projeto, objetivos e necessidades;
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Próximos passos claros para tirar o projeto do papel.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <a
                href="mailto:comercial@wama.digital"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-mono tracking-wide">comercial@wama.digital</span>
              </a>

              <a
                href="https://wa.me/5519999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-sm font-mono tracking-wide">Atendimento WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            {submitted ? (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-normal text-white mb-2">Mensagem enviada com sucesso!</h3>
                <p className="text-sm font-light text-neutral-400 max-w-md">
                  Recebemos seus dados e nosso time de design e estratégia entrará em contato em breve para apresentar a melhor proposta.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-1">
                    Conte para nós o que você quer construir.
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-neutral-400">
                    Preencha o formulário abaixo para receber uma proposta personalizada.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Nome
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Nome da empresa"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-3 uppercase">
                    Qual serviço você busca na Wama?*
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                            isSelected
                              ? "bg-white text-black font-semibold shadow-xs"
                              : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection Pills */}
                <div>
                  <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-3 uppercase">
                    Você já tem algum orçamento em mente?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((budget) => {
                      const isSelected = selectedBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                            isSelected
                              ? "bg-white text-black font-semibold shadow-xs"
                              : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white"
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                    Detalhes do projeto
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Conte um pouco sobre os objetivos do projeto, prazos e expectativas..."
                    value={formData.detalhes}
                    onChange={(e) => setFormData({ ...formData, detalhes: e.target.value })}
                    className="w-full p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-y"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-full bg-white hover:bg-neutral-200 text-black font-medium tracking-wide text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                >
                  <span>Enviar proposta</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
