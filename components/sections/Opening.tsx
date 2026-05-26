"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Opening() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const monoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1.05]);
  const monoOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 0.6, 1, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  const rayOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 0.9]);

  return (
    <section ref={ref} className="section s-opening">
      <div className="section-inner">
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,224,156,0.18), transparent 70%)",
            opacity: rayOpacity,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <motion.div
          style={{ scale: monoScale, opacity: monoOpacity, filter }}
          className="gold-text script"
          aria-label="B and G monogram"
        >
          <div
            style={{
              fontSize: "clamp(160px, 22vw, 320px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            B<span style={{ fontSize: "0.5em", verticalAlign: "0.25em" }}>&amp;</span>G
          </div>
        </motion.div>
        <motion.p
          className="display"
          style={{
            marginTop: 28,
            color: "rgba(212,175,106,0.85)",
            fontSize: 12,
            letterSpacing: "0.6em",
            opacity: useTransform(scrollYProgress, [0.4, 0.7], [0, 1]),
          }}
        >
          A Wedding Story
        </motion.p>
      </div>
    </section>
  );
}
