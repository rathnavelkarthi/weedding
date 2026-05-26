"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setShow(false);
      else setShow(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <div className="scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <span className="line" />
    </div>
  );
}
