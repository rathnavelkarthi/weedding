"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;        // 0..1 depth → size + parallax weight
  r: number;        // base radius
  vx: number;
  vy: number;
  phase: number;    // for vertical sway
  speed: number;    // sway speed
  alpha: number;    // base brightness
};

const COUNT = 320;

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let running = true;
    const particles: Particle[] = [];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const z = Math.pow(Math.random(), 1.4); // bias toward background
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.4 + z * 2.6,
          vx: (Math.random() - 0.5) * 0.06 * (0.4 + z),
          vy: -0.04 - Math.random() * 0.12 * (0.4 + z),
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.9,
          alpha: 0.25 + Math.random() * 0.7,
        });
      }
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
    }

    let last = performance.now();

    function draw(now: number) {
      if (!running || !ctx) return;
      const dt = Math.min(48, now - last);
      last = now;
      const t = now * 0.001;

      // smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // fade-out trail for a soft glow feel
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(6,4,10,0.28)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx * dt * 0.06;
          p.y += p.vy * dt * 0.06;
          p.x += Math.sin(t * p.speed + p.phase) * 0.05 * p.z;
        }

        // wrap
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;

        const px = p.x + mouse.x * 60 * (0.3 + p.z);
        const py = p.y + mouse.y * 40 * (0.3 + p.z);

        const radius = p.r * 6;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        const a = p.alpha;
        grad.addColorStop(0, `rgba(255,240,200,${a})`);
        grad.addColorStop(0.35, `rgba(212,175,106,${a * 0.55})`);
        grad.addColorStop(1, "rgba(212,175,106,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    seed();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className="global-canvas" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "#06040a",
        }}
      />
    </div>
  );
}
