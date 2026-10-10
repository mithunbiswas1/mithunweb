// src/app/(home)/_clients/ContactForm.jsx

"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "../_data/home-data";
import { Send, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactForm() {
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

  if (submitted) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
        <h3 className="text-2xl font-normal text-white mb-2">Message sent successfully!</h3>
        <p className="text-sm font-light text-neutral-400 max-w-md">
          We have received your inquiry and our team will get in touch shortly with a customized proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-xl sm:text-2xl font-normal text-white mb-1">
          Tell us what you want to build.
        </h3>
        <p className="text-xs sm:text-sm font-light text-neutral-400">
          Fill out the form below to receive a personalized proposal.
        </p>
      </div>

      {/* Input Fields using reusable Input UI component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Phone / WhatsApp"
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <Input
          label="Company"
          placeholder="Company name"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          required
          placeholder="you@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
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
      <Textarea
        label="Project Details"
        rows={4}
        placeholder="Tell us about your project goals, timelines, and expectations..."
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
      />

      {/* Submit CTA */}
      <Button
        type="submit"
        variant="white"
        size="lg"
        rounded="full"
        className="w-full py-4 gap-2 text-sm font-medium"
      >
        <span>Send proposal</span>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
