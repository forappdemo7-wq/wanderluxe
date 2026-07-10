// src/app/ClientLayout.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

// Providers
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CursorProvider } from "@/context/CursorContext";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ConciergeFAB from "@/components/ConciergeFAB";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/dashboard");

  // State for the current view (used by ConciergeFAB to navigate)
  const [activeView, setActiveView] = useState("explorations");

  return (
    <CursorProvider>
      <CurrencyProvider>
        <CustomCursor />

        {/* CONDITIONAL NAVBAR */}
        {!hideNavbar && <Navbar />}

        <main>{children}</main>

        {/* CONDITIONAL FOOTER */}
        {!hideNavbar && <Footer />}

        {/* Render the concierge button on all pages except dashboard */}
        {!hideNavbar && (
          <ConciergeFAB
            activeView={activeView}
            setActiveView={setActiveView}
          />
        )}
      </CurrencyProvider>
    </CursorProvider>
  );
}