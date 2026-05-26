"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Blessing() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const blessingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const blessingY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);
  const tamilOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.5, 0.8], [30, 0]);
  const signoffOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);

  const handleSave = () => {
    const start = new Date(Date.UTC(2026, 4, 29, 12, 30)); // 6:00 PM IST = 12:30 UTC
    const end = new Date(Date.UTC(2026, 4, 29, 17, 0));
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Bala Gayathri//Wedding//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@bala-gayathri.wedding`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      "SUMMARY:Bala & Gayathri – Wedding Reception",
      "LOCATION:Manammai Maruthupandiyar Mandapam, Pattaladai, Mannargudi",
      "DESCRIPTION:With the blessings of family and friends.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Bala-Gayathri-Reception.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={ref} className="section s-blessing">
      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.div style={{ opacity: blessingOpacity, y: blessingY }}>
          <p
            style={{
              color: "rgba(212,175,106,0.7)",
              fontSize: 11,
              letterSpacing: "0.6em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            With Blessings
          </p>

          <p
            className="display"
            style={{
              fontSize: "clamp(26px, 3.6vw, 44px)",
              lineHeight: 1.45,
              fontStyle: "italic",
              color: "rgba(240,228,200,0.92)",
              letterSpacing: "0.02em",
              maxWidth: 820,
              margin: "0 auto",
            }}
          >
            May this union be blessed
            <br />
            with love that lasts a lifetime.
          </p>
        </motion.div>

        <motion.p
          style={{
            opacity: tamilOpacity,
            marginTop: 32,
            fontFamily: "var(--font-catamaran, sans-serif)",
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: "rgba(240,228,200,0.75)",
            letterSpacing: "0.06em",
            lineHeight: 1.6,
          }}
        >
          உங்கள் வருகையும் வாழ்த்துக்களும் எங்கள் பேறு.
        </motion.p>

        <motion.div style={{ opacity: buttonOpacity, y: buttonY, marginTop: 56 }}>
          <button className="btn-gold" type="button" onClick={handleSave}>
            <span>Save The Date</span>
          </button>
        </motion.div>

        <motion.div
          style={{
            opacity: signoffOpacity,
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div className="ornament" style={{ width: 140, height: 1 }} />
          <p
            className="gold-text"
            style={{
              fontFamily: "var(--font-italianno, cursive)",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1,
            }}
          >
            Bala &amp; Gayathri
          </p>
          <p
            style={{
              color: "rgba(240,228,200,0.55)",
              fontFamily: "var(--font-cormorant, serif)",
              fontStyle: "italic",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Awaiting your presence
          </p>
        </motion.div>
      </div>
    </section>
  );
}
