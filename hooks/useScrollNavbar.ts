"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollNavbar(removeAllDisplay: () => void) {
  const [showMainNavbar, setShowMainNavbar] = useState(false);
  const prevScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      removeAllDisplay();

      const currentScroll = window.pageYOffset;

      // Avoid repeated setState when value doesn't change
      if (currentScroll > 500 && !showMainNavbar) {
        setShowMainNavbar(true);
      } else if (currentScroll <= 500 && showMainNavbar) {
        setShowMainNavbar(false);
      }

      prevScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [removeAllDisplay, showMainNavbar]);

  return { showMainNavbar };
}
