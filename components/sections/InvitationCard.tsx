"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function InvitationCard() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The card materializes from depth - opacity, scale, rotate Y, z
  const rawScale = useTransform(scrollYProgress, [0.0, 0.4, 0.6, 1], [0.55, 0.9, 1, 1.02]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 22 });
  const rotY = useTransform(scrollYProgress, [0, 0.5, 1], [-22, 0, 6]);
  const rotX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], [0, 0.5, 1, 1]);
  const z = useTransform(scrollYProgress, [0, 0.5], [-200, 0]);
  const foilShift = useTransform(scrollYProgress, [0.3, 0.9], ["-30%", "130%"]);

  const orbOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section ref={ref} className="section s-card">
      {/* Atmospheric orb behind the card */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80vmin",
          height: "80vmin",
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,224,156,0.18), transparent 60%)",
          filter: "blur(40px)",
          opacity: orbOpacity,
          pointerEvents: "none",
        }}
      />

      <div
        className="section-inner"
        style={{
          perspective: 1600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            scale,
            rotateY: rotY,
            rotateX: rotX,
            z,
            opacity,
            transformStyle: "preserve-3d",
            width: "min(86vw, 460px)",
            aspectRatio: "4 / 5",
            borderRadius: 14,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, #1a1208 0%, #110a05 60%, #0a0603 100%)",
            boxShadow:
              "0 60px 120px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,106,0.35) inset, 0 0 80px rgba(255,224,156,0.08)",
            willChange: "transform, opacity",
          }}
        >
          {/* Paper texture overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(255,224,156,0.06), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(232,194,160,0.05), transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Moving foil sweep */}
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              bottom: "-20%",
              width: "30%",
              left: foilShift,
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,240,200,0.18) 50%, transparent 70%)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />

          {/* Gilded border frame */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: 8,
              border: "1px solid rgba(212,175,106,0.45)",
              boxShadow: "0 0 0 1px rgba(212,175,106,0.15) inset",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 22,
              borderRadius: 4,
              border: "0.5px solid rgba(212,175,106,0.25)",
              pointerEvents: "none",
            }}
          />

          {/* Card content */}
          <div
            style={{
              position: "relative",
              height: "100%",
              padding: "clamp(28px, 6%, 44px) clamp(22px, 5%, 36px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            <div>
              <p
                style={{
                  color: "rgba(212,175,106,0.8)",
                  fontSize: 9,
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                }}
              >
                Wedding Reception
              </p>
              <div
                className="ornament"
                style={{ width: 60, height: 1, margin: "12px auto" }}
              />
              <p
                style={{
                  color: "rgba(240,228,200,0.6)",
                  fontFamily: "var(--font-catamaran, sans-serif)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                திருமண வரவேற்பு
              </p>
            </div>

            <div style={{ width: "100%" }}>
              <p
                className="gold-text"
                style={{
                  fontFamily: "var(--font-cinzel, serif)",
                  fontSize: "clamp(20px, 5vw, 28px)",
                  letterSpacing: "0.18em",
                  marginBottom: 4,
                }}
              >
                S. BALA
              </p>
              <p
                style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(20px, 5vw, 26px)",
                  color: "rgba(255,224,156,0.7)",
                  letterSpacing: "0.18em",
                  margin: "8px 0",
                }}
              >
                &amp;
              </p>
              <p
                className="gold-text"
                style={{
                  fontFamily: "var(--font-italianno, cursive)",
                  fontSize: "clamp(40px, 9vw, 56px)",
                  lineHeight: 1,
                }}
              >
                Gayathri
              </p>
              <div
                className="ornament"
                style={{ width: 80, height: 1, margin: "18px auto" }}
              />
              <p
                style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: "clamp(13px, 3vw, 16px)",
                  color: "rgba(240,228,200,0.78)",
                  fontStyle: "italic",
                  letterSpacing: "0.06em",
                  lineHeight: 1.6,
                }}
              >
                Friday · 29 May 2026
                <br />
                6:00 PM onwards
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: "clamp(12px, 2.6vw, 14px)",
                  color: "rgba(240,228,200,0.7)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.5,
                }}
              >
                Manammai Maruthupandiyar Mandapam
                <br />
                Pattaladai, Mannargudi
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
