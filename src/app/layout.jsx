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
  title: "Mithun Web | Agência de Design, Sites, SaaS e Aplicativos",
  description:
    "Sites em Framer, SaaS, sistemas e aplicativos personalizados para empresas que buscam design de excelência, tecnologia e experiências digitais que geram valor na era da IA.",
  metadataBase: new URL("https://mithunweb.vercel.app"),
  alternates: {
    canonical: "https://mithunweb.vercel.app/",
  },
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/images/InmV8zs6TpFKUGdN3OeeQf60oIc.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://framerusercontent.com/images/liZlkr66syBeQlBokhdrHsRgXss.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "https://framerusercontent.com/images/TsQgtMigLZDvUbZSdD8m70svgpQ.png",
  },
  openGraph: {
    type: "website",
    url: "https://mithunweb.vercel.app/",
    title: "Mithun Web | Agência de Design, Sites, SaaS e Aplicativos",
    description:
      "Sites em Framer, SaaS, sistemas e aplicativos personalizados para empresas que buscam design de excelência, tecnologia e experiências digitais que geram valor na era da IA.",
    images: [
      {
        url: "https://framerusercontent.com/images/hxiEcAniRHQ0i8LJkuyQQyJc.png",
        width: 1200,
        height: 630,
        alt: "Mithun Web - Agência de Design e Tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithun Web | Agência de Design, Sites, SaaS e Aplicativos",
    description:
      "Sites em Framer, SaaS, sistemas e aplicativos personalizados para empresas que buscam design de excelência, tecnologia e experiências digitais que geram valor na era da IA.",
    images: ["https://framerusercontent.com/images/hxiEcAniRHQ0i8LJkuyQQyJc.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} ${fragmentMono.variable} font-sans bg-[#ffffff] text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
