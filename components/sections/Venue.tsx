"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Venue() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const archDraw = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const archOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.7], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const detailOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section ref={ref} className="section s-venue">
      {/* Floating architecture lines */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: archOpacity,
        }}
      >
        <defs>
          <linearGradient id="venueGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6e3a8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#a87c3d" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Mandapam silhouette - temple arch */}
        <motion.path
          d="M 200 500 L 200 320 Q 200 200 300 200 L 400 180 L 500 200 Q 600 200 600 320 L 600 500"
          stroke="url(#venueGold)"
          strokeWidth={1.2}
          fill="none"
          style={{ pathLength: archDraw }}
        />
        {/* Inner arch */}
        <motion.path
          d="M 280 500 L 280 360 Q 280 280 400 280 Q 520 280 520 360 L 520 500"
          stroke="url(#venueGold)"
          strokeWidth={1}
          fill="none"
          style={{ pathLength: archDraw }}
        />
        {/* Pillars */}
        <motion.line x1="240" y1="500" x2="240" y2="220" stroke="url(#venueGold)" strokeWidth={0.8} style={{ pathLength: archDraw }} />
        <motion.line x1="560" y1="500" x2="560" y2="220" stroke="url(#venueGold)" strokeWidth={0.8} style={{ pathLength: archDraw }} />
        {/* Crown finial */}
        <motion.path
          d="M 380 180 L 400 140 L 420 180"
          stroke="url(#venueGold)"
          strokeWidth={1}
          fill="none"
          style={{ pathLength: archDraw }}
        />
        <motion.circle cx="400" cy="130" r="6" fill="none" stroke="url(#venueGold)" strokeWidth={0.8} style={{ pathLength: archDraw }} />
      </motion.svg>

      <div className="section-inner" style={{ textAlign: "center", position: "relative" }}>
        <motion.p
          style={{
            color: "rgba(212,175,106,0.7)",
            fontSize: 11,
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: titleOpacity,
          }}
        >
          The Venue
        </motion.p>

        <motion.h2
          className="gold-text"
          style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontWeight: 500,
            fontSize: "clamp(34px, 5vw, 64px)",
            lineHeight: 1.15,
            letterSpacing: "0.04em",
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          Manammai Maruthupandiyar
          <br />
          Mandapam
        </motion.h2>

        <motion.div style={{ opacity: detailOpacity, marginTop: 28 }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.8vw, 24px)",
              color: "rgba(240,228,200,0.85)",
              letterSpacing: "0.05em",
            }}
          >
            Pattaladai, Mannargudi
          </p>
          <div
            className="ornament"
            style={{ width: 120, height: 1, margin: "24px auto" }}
          />
          <p
            style={{
              fontFamily: "var(--font-catamaran, sans-serif)",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              color: "rgba(240,228,200,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            மணம்மை மருதுபாண்டியர் மண்டபம்
          </p>
        </motion.div>
      </div>
    </section>
  );
}
