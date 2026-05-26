"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DateReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const dayY = useTransform(scrollYProgress, [0.15, 0.45], [120, 0]);
  const dayOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const monthY = useTransform(scrollYProgress, [0.3, 0.6], [120, 0]);
  const monthOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const yearY = useTransform(scrollYProgress, [0.45, 0.75], [120, 0]);
  const yearOpacity = useTransform(scrollYProgress, [0.45, 0.75], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);

  return (
    <section ref={ref} className="section s-date">
      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.p
          style={{
            color: "rgba(212,175,106,0.7)",
            fontSize: 11,
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            marginBottom: 48,
            opacity: labelOpacity,
          }}
        >
          Save the Date
        </motion.p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            overflow: "hidden",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="gold-text"
              style={{
                y: dayY,
                opacity: dayOpacity,
                fontFamily: "var(--font-cinzel, serif)",
                fontWeight: 700,
                fontSize: "clamp(120px, 22vw, 320px)",
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
              }}
            >
              29
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              style={{
                y: monthY,
                opacity: monthOpacity,
                fontFamily: "var(--font-cormorant, serif)",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "rgba(240,228,200,0.95)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              May
            </motion.div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.div
              style={{
                y: yearY,
                opacity: yearOpacity,
                fontFamily: "var(--font-cinzel, serif)",
                fontSize: "clamp(28px, 3.4vw, 48px)",
                color: "rgba(240,228,200,0.85)",
                letterSpacing: "0.4em",
              }}
            >
              2026
            </motion.div>
          </div>
        </div>

        <motion.p
          style={{
            marginTop: 48,
            opacity: captionOpacity,
            color: "rgba(240,228,200,0.7)",
            fontFamily: "var(--font-cormorant, serif)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 22px)",
            letterSpacing: "0.06em",
          }}
        >
          A Friday evening, blessed.
        </motion.p>
      </div>
    </section>
  );
}
