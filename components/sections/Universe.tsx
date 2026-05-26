"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  twinkle: number;
};

function generateStars(): Star[] {
  return Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.4,
    delay: Math.random() * 1.4,
    twinkle: 2 + Math.random() * 3,
  }));
}

const CONSTELLATION = [
  { x: 22, y: 38 },
  { x: 32, y: 30 },
  { x: 44, y: 36 },
  { x: 52, y: 28 },
  { x: 62, y: 34 },
  { x: 72, y: 42 },
  { x: 78, y: 56 },
];

export default function Universe() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const starOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const lineDraw = useTransform(scrollYProgress, [0.35, 0.75], [0, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  // Stars generated only on the client so SSR/CSR don't disagree
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(generateStars());
  }, []);

  const polyline = useMemo(
    () => CONSTELLATION.map((p) => `${p.x},${p.y}`).join(" "),
    []
  );

  return (
    <section ref={ref} className="section s-universe">
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(20,18,40,0.6), rgba(6,4,10,0.95))",
          opacity: starOpacity,
        }}
      />

      {/* Starfield */}
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        style={{ position: "absolute", inset: 0, opacity: starOpacity }}
      >
        {stars.map((s) => (
          <motion.span
            key={s.id}
            style={{
              position: "absolute",
              top: `${s.y}%`,
              left: `${s.x}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "rgba(255,240,200,0.95)",
              boxShadow: "0 0 8px rgba(255,224,156,0.7)",
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: s.twinkle,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Constellation */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="constellationGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d4af6a" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f6e3a8" stopOpacity="1" />
            <stop offset="1" stopColor="#d4af6a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polyline
          points={polyline}
          fill="none"
          stroke="url(#constellationGold)"
          strokeWidth={0.18}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: lineDraw }}
        />
        {CONSTELLATION.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={0.5}
            fill="#fff0c8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
          />
        ))}
      </svg>

      <div className="section-inner" style={{ position: "relative", textAlign: "center" }}>
        <motion.div style={{ opacity: quoteOpacity }}>
          <p
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              lineHeight: 1.4,
              fontStyle: "italic",
              color: "rgba(240,228,200,0.95)",
              letterSpacing: "0.01em",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            When destiny writes a story,
            <br />
            the universe holds its breath.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
