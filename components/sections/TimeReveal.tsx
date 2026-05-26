"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TICKS = 60;

export default function TimeReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.05]);
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.85, 1], [0, 1, 1, 0.6]);
  const timeOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const subOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  return (
    <section ref={ref} className="section s-time">
      <div className="section-inner" style={{ textAlign: "center", position: "relative" }}>
        {/* Particle clock ring */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(70vmin, 640px)",
            height: "min(70vmin, 640px)",
            translateX: "-50%",
            translateY: "-50%",
            rotate: ringRotate,
            scale: ringScale,
            opacity: ringOpacity,
          }}
        >
          {Array.from({ length: TICKS }).map((_, i) => {
            const angle = (i / TICKS) * 360;
            const isMajor = i % 5 === 0;
            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: isMajor ? 2 : 1,
                  height: isMajor ? 16 : 8,
                  background: isMajor
                    ? "linear-gradient(180deg, rgba(255,224,156,0.95), rgba(212,175,106,0.3))"
                    : "rgba(212,175,106,0.5)",
                  transformOrigin: "50% 50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-46%)`,
                  borderRadius: 2,
                  boxShadow: isMajor ? "0 0 8px rgba(255,224,156,0.6)" : "none",
                }}
              />
            );
          })}
          {/* Outer faint ring */}
          <div
            style={{
              position: "absolute",
              inset: "8%",
              borderRadius: "50%",
              border: "1px solid rgba(212,175,106,0.18)",
            }}
          />
        </motion.div>

        <motion.div style={{ opacity: timeOpacity, position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "rgba(212,175,106,0.7)",
              fontSize: 11,
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            The Hour
          </p>
          <h2
            className="gold-text"
            style={{
              fontFamily: "var(--font-cinzel, serif)",
              fontSize: "clamp(72px, 12vw, 200px)",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            6:00<span style={{ fontSize: "0.4em", marginLeft: "0.2em" }}>PM</span>
          </h2>
        </motion.div>

        <motion.p
          style={{
            opacity: subOpacity,
            position: "relative",
            zIndex: 1,
            marginTop: 36,
            color: "rgba(240,228,200,0.75)",
            fontFamily: "var(--font-cormorant, serif)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.7vw, 22px)",
            letterSpacing: "0.06em",
          }}
        >
          As the sun bows to the evening sky.
        </motion.p>
      </div>
    </section>
  );
}
