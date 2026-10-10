// src/app/(home)/_components/Hero.jsx

import HeroPreciseImages from "../_clients/HeroPreciseImages";
import { H1, P } from "@/components/ui/Typography";

export default function Hero() {
  return (
    <section id="hero" data-theme="light" className="relative pt-36">
      <div className="flex flex-col items-center text-center">
        <H1 variant="display" className="max-w-4xl 2xl:max-w-5xl">
          Design and development of digital products
        </H1>

        <P variant="lead" className="max-w-2xl mt-6 sm:mt-7">
          A new generation of websites, systems, and applications built with design of{" "}
          <strong className="font-semibold">excellence, value</strong>, and always exceeding expectations.
        </P>

        <HeroPreciseImages />
      </div>
    </section>
  );
}
