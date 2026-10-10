// src/app/(home)/_components/Services.jsx

import { SERVICES } from "../_data/home-data";
import ServiceCard from "@/components/shared/ServiceCard";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Services() {
  return (
    <Section id="services">
      <SectionHeader
        badge="SERVICES"
        title="Solutions for every stage of your business"
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.title}
            service={service}
          />
        ))}
      </div>
    </Section>
  );
}
