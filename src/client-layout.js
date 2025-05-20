"use client";
import { useEffect, useState } from "react";

import { StoreProvider } from "./components/StoreProvider/StoreProvider";
import Menu from "@/components/Menu/Menu";
import Cart from "@/components/Cart/Cart";

import { ReactLenis } from "lenis/react";

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isStoreReady, setIsStoreReady] = useState(false);

  useEffect(() => {
    setIsStoreReady(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings = isMobile
    ? {
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.05,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  return (
    <ReactLenis root options={scrollSettings}>
      <StoreProvider>
        {isStoreReady && (
          <>
            <Menu />
            <Cart />
          </>
        )}
        {children}
      </StoreProvider>
    </ReactLenis>
  );
}
