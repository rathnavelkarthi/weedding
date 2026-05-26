"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAME = "M. GAYATHRI";

function Petal({ i, progress }: { i: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const seed = useMemo(() => ({
    x: (Math.random() - 0.5) * 100,
    delay: Math.random() * 0.5,
    rot: Math.random() * 360,
    size: 6 + Math.random() * 10,
    drift: 40 + Math.random() * 80,
  }), []);

  const y = useTransform(progress, [0, 1], [-120, 120 + seed.drift]);
  const rotate = useTransform(progress, [0, 1], [seed.rot, seed.rot + 220]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: "absolute",
        top: `${(i * 53) % 100}%`,
        left: `${(i * 37) % 100}%`,
        width: seed.size,
        height: seed.size * 1.4,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(255,235,210,0.9), rgba(232,194,160,0.5) 60%, rgba(212,175,106,0.1))",
        boxShadow: "0 0 12px rgba(255,224,180,0.35)",
        y,
        rotate,
        opacity,
        x: seed.x,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Bride() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const detailOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section ref={ref} className="section s-bride">
      {/* Jasmine petals — client-only to avoid SSR/CSR random mismatch */}
      <div
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
        suppressHydrationWarning
      >
        {mounted &&
          Array.from({ length: 28 }).map((_, i) => (
            <Petal key={i} i={i} progress={scrollYProgress} />
          ))}
      </div>

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
          The Bride
        </motion.p>

        <motion.h2
          className="gold-text"
          style={{
            fontFamily: "var(--font-italianno, cursive)",
            fontSize: "clamp(96px, 16vw, 260px)",
            letterSpacing: "0.02em",
            lineHeight: 1,
            y: titleY,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Gayathri
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
            M. Gayathri · GNM
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
            Daughter of
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
            Mr. M. Thandavarayan &amp; Mrs. S. Meenakshi
          </p>
        </motion.div>
      </div>
    </section>
  );
}
