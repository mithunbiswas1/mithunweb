// src/app/(home)/_components/Clients.jsx

import { CLIENT_LOGOS_DATA } from "../_data/client-logos";

import ClientLogoCard from "@/components/shared/ClientLogoCard";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Clients({ logos = CLIENT_LOGOS_DATA }) {
  return (
    <Section theme="dark">
      <SectionHeader
        badge="CLIENTS"
        title="Creativity, excellence, & recognition."
        color="white"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {logos.map((item, index) => (
          <ClientLogoCard
            key={item.id || `${item.name}-${index}`}
            svg={item.svg}
            name={item.name}
          />
        ))}
      </div>
    </Section>
  );
}
