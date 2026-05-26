"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Destiny() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const groomX = useTransform(scrollYProgress, [0, 0.5], ["-40vw", "0vw"]);
  const brideX = useTransform(scrollYProgress, [0, 0.5], ["40vw", "0vw"]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.7], [0, 1, 1, 0]);

  const ampX = useTransform(scrollYProgress, [0.55, 0.75], [0.4, 1]);
  const ampScale = useTransform(scrollYProgress, [0.55, 0.8, 1], [0.6, 1, 1]);
  const ampOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

  const pathDraw = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);

  return (
    <section ref={ref} className="section s-destiny">
      <div
        className="section-inner"
        style={{
          textAlign: "center",
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Two names approaching */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: "clamp(40px, 8vw, 140px)",
            x: 0,
            opacity: sideOpacity,
          }}
        >
          <motion.span
            className="gold-text"
            style={{
              x: groomX,
              fontFamily: "var(--font-cinzel, serif)",
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "0.12em",
            }}
          >
            BALA
          </motion.span>
          <motion.span
            className="gold-text"
            style={{
              x: brideX,
              fontFamily: "var(--font-italianno, cursive)",
              fontSize: "clamp(56px, 8vw, 120px)",
              lineHeight: 1,
            }}
          >
            Gayathri
          </motion.span>
        </motion.div>

        {/* Infinity / ampersand */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: ampOpacity,
            scale: ampScale,
          }}
        >
          <svg
            width="min(70vw, 720px)"
            height="min(38vw, 400px)"
            viewBox="0 0 720 400"
            fill="none"
          >
            <defs>
              <linearGradient id="destinyGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6e3a8" />
                <stop offset="0.5" stopColor="#d4af6a" />
                <stop offset="1" stopColor="#a87c3d" />
              </linearGradient>
              <filter id="destinyGlow">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M 180 200 C 180 80, 360 80, 360 200 C 360 320, 540 320, 540 200 C 540 80, 360 80, 360 200 C 360 320, 180 320, 180 200 Z"
              stroke="url(#destinyGold)"
              strokeWidth={2.5}
              fill="none"
              filter="url(#destinyGlow)"
              style={{ pathLength: pathDraw }}
            />
          </svg>
        </motion.div>

        <motion.p
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(240,228,200,0.8)",
            fontFamily: "var(--font-cormorant, serif)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 26px)",
            letterSpacing: "0.05em",
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
          }}
        >
          Two souls. One infinite story.
        </motion.p>
      </div>
    </section>
  );
}
