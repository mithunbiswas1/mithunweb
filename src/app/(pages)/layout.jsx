// src/app/(pages)/layout.jsx

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function PagesLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
