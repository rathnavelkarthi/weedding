"use client";

import { useEffect, useRef } from "react";

export function useMouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      el!.classList.add("active");
    }
    function onLeave() {
      el!.classList.remove("active");
    }
    function tick() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
