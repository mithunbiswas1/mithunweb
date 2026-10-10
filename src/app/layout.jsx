// src/app/layout.jsx

import { Inter, Fragment_Mono, Outfit, Roboto } from "next/font/google";
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
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${fragmentMono.variable} selection:bg-neutral-200 selection:text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
