import { Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Mithun Web | Design Agency, Websites, SaaS & Applications",
  description:
    "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands seeking design excellence and modern technology.",
  metadataBase: new URL("https://mithunweb.vercel.app"),
  alternates: {
    canonical: "https://mithunweb.vercel.app/",
  },
  icons: {
    icon: [
      {
        url: "/images/icons/InmV8zs6TpFKUGdN3OeeQf60oIc.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/icons/liZlkr66syBeQlBokhdrHsRgXss.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/images/icons/TsQgtMigLZDvUbZSdD8m70svgpQ.png",
  },
  openGraph: {
    type: "website",
    url: "https://mithunweb.vercel.app/",
    title: "Mithun Web | Design Agency, Websites, SaaS & Applications",
    description:
      "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands seeking design excellence and modern technology.",
    images: [
      {
        url: "/images/projects/followhr-project.webp",
        width: 1200,
        height: 630,
        alt: "Mithun Web - Design & Technology Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithun Web | Design Agency, Websites, SaaS & Applications",
    description:
      "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands seeking design excellence and modern technology.",
    images: ["/images/projects/followhr-project.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${fragmentMono.variable} font-sans bg-[#ffffff] text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
