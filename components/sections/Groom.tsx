"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAME = "S. BALA";

export default function Groom() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const spotX = useTransform(scrollYProgress, [0, 1], ["-30%", "130%"]);
  const detailOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const patternOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.4]);

  return (
    <section ref={ref} className="section s-groom">
      {/* Temple pattern */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: patternOpacity,
          background:
            "repeating-linear-gradient(45deg, rgba(212,175,106,0.05) 0 2px, transparent 2px 28px), repeating-linear-gradient(-45deg, rgba(212,175,106,0.05) 0 2px, transparent 2px 28px)",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Sweeping spotlight */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          bottom: "-10%",
          width: "40%",
          left: spotX,
          background:
            "linear-gradient(90deg, transparent, rgba(255,224,156,0.12) 50%, transparent)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.p
          style={{
            color: "rgba(212,175,106,0.7)",
            fontSize: 11,
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          The Groom
        </motion.p>

        <motion.h2
          className="gold-text"
          style={{
            fontFamily: "var(--font-cinzel, serif)",
            fontSize: "clamp(64px, 11vw, 180px)",
            letterSpacing: "0.12em",
            lineHeight: 1,
            y: titleY,
            display: "flex",
            justifyContent: "center",
            gap: "0.04em",
          }}
        >
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ delay: i * 0.06, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div style={{ opacity: detailOpacity, marginTop: 36 }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.8vw, 24px)",
              color: "rgba(240,228,200,0.85)",
              letterSpacing: "0.05em",
            }}
          >
            B.E.
          </p>
          <p
            style={{
              marginTop: 18,
              color: "rgba(240,228,200,0.65)",
              fontSize: 13,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Son of
          </p>
          <p
            style={{
              marginTop: 8,
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(16px, 1.6vw, 20px)",
              color: "rgba(240,228,200,0.95)",
              letterSpacing: "0.06em",
            }}
          >
            Mr. S. Sitharaman &amp; Mrs. K. Mani
          </p>
        </motion.div>
      </div>
    </section>
  );
}
