"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/data/mithunweb-data";
import { Check, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState(["Website"]);
  const [selectedBudget, setSelectedBudget] = useState("$5,000 to $15,000");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    details: "",
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-60px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      setFormData({ name: "", phone: "", company: "", email: "", details: "" });
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-theme="dark"
      className="bg-[#000000] text-white py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Details with Wama Scroll Entrance */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase mb-4">
                GET IN TOUCH
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.1] tracking-tight text-white mb-6">
                Your next project starts here
              </h2>
              <p className="text-base sm:text-lg font-light text-neutral-400 leading-relaxed mb-10">
                We understand your vision, your goals, and show how design and code can transform your idea into a world-class digital product.
              </p>

              {/* Checkpoints */}
              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Deep understanding of the project, objectives, and requirements;
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-light text-neutral-300">
                    Clear, actionable next steps to bring your project to life.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <a
                href="mailto:hello@mithunweb.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:scale-105 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-mono tracking-wide">hello@mithunweb.com</span>
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#cdff59] text-black hover:bg-[#bcf148] font-medium text-sm transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form Card */}
          <div
            className={`lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"
            }`}
            style={{
              transitionDelay: "160ms",
              willChange: "transform, opacity",
            }}
          >
            {submitted ? (
              <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-normal text-white mb-2">Message sent successfully!</h3>
                <p className="text-sm font-light text-neutral-400 max-w-md">
                  We have received your inquiry and our team will get in touch shortly with a customized proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-1">
                    Tell us what you want to build.
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-neutral-400">
                    Fill out the form below to receive a personalized proposal.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-2 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block text-xs font-mono tracking-wide text-neutral-400 mb-3 uppercase">
                    Which service are you looking for at Mithun Web?*
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${
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
                    Do you have a budget in mind?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((budget) => {
                      const isSelected = selectedBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 ${
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
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, timelines, and expectations..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 focus:border-white/40 focus:outline-none text-white text-sm placeholder:text-neutral-600 transition-colors resize-y"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 px-8 rounded-full bg-white hover:bg-neutral-200 text-black font-medium tracking-wide text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg cursor-pointer"
                >
                  <span>Send proposal</span>
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
