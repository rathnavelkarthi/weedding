"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Beginning() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

  return (
    <section ref={ref} className="section s-beginning">
      <div className="section-inner" style={{ maxWidth: 900, padding: "0 32px" }}>
        <motion.div style={{ opacity, y }}>
          <motion.div
            className="ornament"
            style={{ width: lineWidth, height: 1, margin: "0 auto 40px" }}
          />
          <p
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              lineHeight: 1.35,
              fontStyle: "italic",
              color: "rgba(240,228,200,0.92)",
              textAlign: "center",
              letterSpacing: "0.01em",
            }}
          >
            Every beautiful story begins
            <br />
            with a single, quiet moment.
          </p>
          <motion.div
            className="ornament"
            style={{ width: lineWidth, height: 1, margin: "40px auto 0" }}
          />
          <p
            style={{
              marginTop: 28,
              color: "rgba(212,175,106,0.7)",
              fontSize: 11,
              letterSpacing: "0.5em",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Chapter One
          </p>
        </motion.div>
      </div>
    </section>
  );
}
