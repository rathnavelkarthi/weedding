"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const WEDDING_IMAGES = [
  "/images/photo-01.jpg",
  "/images/photo-02.jpg",
  "/images/photo-03.jpg",
  "/images/photo-04.jpg",
  "/images/photo-05.jpg",
  "/images/photo-06.jpg",
  "/images/photo-07.jpg",
  "/images/photo-08.jpg",
  "/images/photo-09.jpg",
  "/images/photo-10.jpg",
  "/images/photo-11.jpg",
];

export default function CosmosGallery() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const isMobile = width < 720;

    // Mandala-orbit sizing — a single tilted ring of portraits.
    const RING_RADIUS = isMobile ? 4.2 : 5.6;
    const RING_TILT = isMobile ? 0.32 : 0.42; // radians (X-axis lean)
    const PORTRAIT_W = isMobile ? 1.55 : 1.75;
    const PORTRAIT_H = isMobile ? 2.05 : 2.32;
    const FRAME_PAD = 0.12;
    const FOV = isMobile ? 58 : 46;
    const CAM_Z = isMobile ? 11 : 13;
    const STAR_COUNT = isMobile ? 700 : 1400;

    // Scene
    const scene = new THREE.Scene();

    // Camera — looking slightly down at the tilted ring
    const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 200);
    camera.position.set(0, 1.4, CAM_Z);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.4 : 1.6));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const warm = new THREE.PointLight(0xffd9a0, 1.4, 0, 2);
    warm.position.set(0, 4, 8);
    scene.add(warm);
    const ember = new THREE.PointLight(0xb24a1f, 0.55, 0, 2);
    ember.position.set(-10, -6, -8);
    scene.add(ember);

    // Ring group (tilted + slow auto-rotate)
    const ring = new THREE.Group();
    ring.rotation.x = -RING_TILT;
    scene.add(ring);

    // ── Golden core: a glowing center the portraits orbit ─────────────────
    const coreGeo = new THREE.SphereGeometry(0.42, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xf6c87a });
    const core = new THREE.Mesh(coreGeo, coreMat);
    ring.add(core);

    // soft halo around the core (additive sprite)
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 256;
    const hctx = haloCanvas.getContext("2d")!;
    const grad = hctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255, 220, 150, 0.9)");
    grad.addColorStop(0.35, "rgba(212, 168, 90, 0.45)");
    grad.addColorStop(1, "rgba(212, 168, 90, 0)");
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, 256, 256);
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.SpriteMaterial({
      map: haloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.set(3.4, 3.4, 1);
    ring.add(halo);

    // ── Decorative gold orbit line (the ring path) ────────────────────────
    const orbitGeo = new THREE.RingGeometry(RING_RADIUS - 0.015, RING_RADIUS + 0.015, 256);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0xd4a85a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 2; // lay flat in the ring's local space
    ring.add(orbit);

    // ── Background star particles ─────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 18 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
      const tint = 0.55 + Math.random() * 0.45;
      starCol[i * 3] = tint;
      starCol[i * 3 + 1] = tint * 0.82;
      starCol[i * 3 + 2] = tint * 0.55;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.085 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Portraits — evenly spaced on the ring, always billboarded ─────────
    const loader = new THREE.TextureLoader();
    const portraits: { group: THREE.Group; base: THREE.Vector3; phase: number }[] = [];
    const disposables: (THREE.Material | THREE.BufferGeometry | THREE.Texture)[] = [];

    WEDDING_IMAGES.forEach((src, i) => {
      const t = (i / WEDDING_IMAGES.length) * Math.PI * 2;
      const x = Math.cos(t) * RING_RADIUS;
      const z = Math.sin(t) * RING_RADIUS;

      const pivot = new THREE.Group();
      pivot.position.set(x, 0, z);
      ring.add(pivot);

      // gold frame backing
      const frameGeo = new THREE.PlaneGeometry(PORTRAIT_W + FRAME_PAD, PORTRAIT_H + FRAME_PAD);
      const frameMat = new THREE.MeshBasicMaterial({
        color: 0xd4a85a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.z = -0.01;
      pivot.add(frame);
      disposables.push(frameGeo, frameMat);

      // portrait plane
      const planeGeo = new THREE.PlaneGeometry(PORTRAIT_W, PORTRAIT_H);
      const placeholderMat = new THREE.MeshBasicMaterial({
        color: 0x1a0e08,
        side: THREE.DoubleSide,
      });
      const portrait = new THREE.Mesh(planeGeo, placeholderMat);
      pivot.add(portrait);
      disposables.push(planeGeo);

      loader.load(src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide,
          toneMapped: false,
        });
        portrait.material.dispose();
        portrait.material = mat;
        disposables.push(mat, tex);
      });

      portraits.push({ group: pivot, base: new THREE.Vector3(x, 0, z), phase: i * 0.6 });
    });

    // ── Pointer-driven gentle camera parallax ─────────────────────────────
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const handlePointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = px;
      target.y = py;
    };
    mount.addEventListener("pointermove", handlePointer, { passive: true });

    // Touch drag also nudges the ring
    let isDragging = false;
    let dragStart = { x: 0, ringY: 0 };
    const handleTouchStart = (e: PointerEvent) => {
      isDragging = true;
      dragStart = { x: e.clientX, ringY: ring.rotation.y };
    };
    const handleTouchMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x;
      ring.rotation.y = dragStart.ringY + dx * 0.008;
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };
    mount.addEventListener("pointerdown", handleTouchStart);
    mount.addEventListener("pointermove", handleTouchMove);
    mount.addEventListener("pointerup", handleTouchEnd);
    mount.addEventListener("pointercancel", handleTouchEnd);
    mount.addEventListener("pointerleave", handleTouchEnd);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Animation
    const start = performance.now();
    let raf = 0;
    const animate = () => {
      const tSec = (performance.now() - start) / 1000;

      // Slow auto-rotate the whole ring (unless user is dragging)
      if (!isDragging) ring.rotation.y += 0.0026;

      // Gentle parallax from pointer
      eased.x += (target.x - eased.x) * 0.05;
      eased.y += (target.y - eased.y) * 0.05;
      camera.position.x = eased.x * 0.9;
      camera.position.y = 1.4 + eased.y * -0.6;
      camera.lookAt(0, 0, 0);

      // Billboard each portrait + subtle bob along ring normal
      portraits.forEach((p, i) => {
        const bob = Math.sin(tSec * 0.6 + p.phase) * 0.12;
        p.group.position.set(p.base.x, bob, p.base.z);
        // Make pivot face camera in world space
        p.group.getWorldPosition(_tmp);
        p.group.lookAt(camera.getWorldPosition(_camTmp));
        // counter-rotate so portrait isn't mirrored (lookAt orients -Z toward camera)
      });

      // Core pulse + halo breathe
      const pulse = 1 + Math.sin(tSec * 1.4) * 0.06;
      core.scale.setScalar(pulse);
      halo.scale.set(3.4 * pulse, 3.4 * pulse, 1);

      // Stars drift
      stars.rotation.y += 0.00035;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    const _tmp = new THREE.Vector3();
    const _camTmp = new THREE.Vector3();
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      mount.removeEventListener("pointermove", handlePointer);
      mount.removeEventListener("pointerdown", handleTouchStart);
      mount.removeEventListener("pointermove", handleTouchMove);
      mount.removeEventListener("pointerup", handleTouchEnd);
      mount.removeEventListener("pointercancel", handleTouchEnd);
      mount.removeEventListener("pointerleave", handleTouchEnd);
      disposables.forEach((d) => d.dispose());
      coreGeo.dispose();
      coreMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
      haloTex.dispose();
      haloMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="cosmos-shell" aria-label="Wedding photo cosmos">
      <div className="cosmos-overlay">
        <div className="cosmos-eyebrow">A Universe of Memories</div>
        <h2 className="cosmos-title">Two souls, one constellation.</h2>
        <p className="cosmos-sub">Drag to spin · the ring follows</p>
      </div>
      <div
        ref={mountRef}
        className="cosmos-canvas"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% 38%, #2a160c 0%, #0a050d 60%, #000 100%)",
          touchAction: "none",
          cursor: "grab",
        }}
      />
    </div>
  );
}
