import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}
