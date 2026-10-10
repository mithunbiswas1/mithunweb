// src/app/(home)/layout.jsx

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
