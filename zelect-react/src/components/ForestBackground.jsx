import { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════════════════ */
const COLORS = {
  deepForest: '#081C15',
  emerald: '#0B2E26',
  midnight: '#061610',
  electricBlue: '#00BFFF',
  cyan: '#3ABFF8',
  moonlight: '#F5F9FF',
  darkBark: '#030b08',
  aurora1: 'rgba(0,191,255,0.08)',
  aurora2: 'rgba(58,191,248,0.06)',
};

/* Detect device tier for adaptive performance */
const getDeviceTier = () => {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
};

/* ═══════════════════════════════════════════════════════════
   SVG: ORGANIC PINE TREE — More realistic than simple triangles
   Uses overlapping, slightly randomised foliage layers
   ═══════════════════════════════════════════════════════════ */
const OrganicPine = ({ x, y, scale = 1, fill, opacity = 1, id }) => {
  /* Each tree gets slight random variation so no two look identical */
  const seed = (id * 137.5) % 1; // deterministic pseudo-random per id
  const skew = (seed - 0.5) * 4; // slight lean
  const branchSpread = 0.9 + seed * 0.2;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * branchSpread}, ${scale}) skewX(${skew})`}
      fill={fill}
      opacity={opacity}
    >
      {/* Top tuft */}
      <polygon points="50,0 62,28 38,28" />
      {/* Upper canopy */}
      <polygon points="50,12 72,48 28,48" />
      {/* Middle canopy */}
      <polygon points="50,30 80,72 20,72" />
      {/* Lower canopy */}
      <polygon points="50,52 88,100 12,100" />
      {/* Bottom skirt */}
      <polygon points="50,72 96,130 4,130" />
      {/* Trunk */}
      <rect x="44" y="128" width="12" height="22" rx="2" />
    </g>
  );
};

/* ═══════════════════════════════════════════════════════════
   SVG: MOUNTAIN RANGE — hand-crafted organic path
   ═══════════════════════════════════════════════════════════ */
const MountainSVG = ({ fill, opacity = 1, d }) => (
  <path d={d} fill={fill} opacity={opacity} />
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const ForestBackground = () => {
  /* Refs for every parallax layer */
  const containerRef = useRef(null);
  const skyRef = useRef(null);
  const auroraRef = useRef(null);
  const starsCanvasRef = useRef(null);
  const cloudsRef = useRef(null);
  const mountainsRef = useRef(null);
  const farTreesRef = useRef(null);
  const midTreesRef = useRef(null);
  const fgTreesRef = useRef(null);
  const fogRef = useRef(null);
  const firefliesCanvasRef = useRef(null);
  const dustCanvasRef = useRef(null);
  const lightRaysRef = useRef(null);
  const glowOrbsRef = useRef(null);

  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalised 0-1

  /* ─── Memoised tree data (deterministic, no re-renders) ─── */
  const farTreeData = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: -80 + i * 48 + ((i * 31) % 17) - 8,
      y: 280 + ((i * 53) % 30),
      scale: 0.55 + ((i * 71) % 100) / 250,
    })),
    []
  );

  const midTreeData = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 100,
      x: -60 + i * 90 + ((i * 43) % 25) - 12,
      y: 380 + ((i * 67) % 40),
      scale: 1.1 + ((i * 89) % 100) / 200,
    })),
    []
  );

  const fgTreeData = useMemo(() => [
    { id: 200, x: -80, y: 420, scale: 2.8 },
    { id: 201, x: 60, y: 460, scale: 3.2 },
    { id: 202, x: -20, y: 500, scale: 3.6 },
    { id: 203, x: 1200, y: 400, scale: 3.0 },
    { id: 204, x: 1350, y: 450, scale: 3.5 },
    { id: 205, x: 1500, y: 480, scale: 4.0 },
  ], []);

  /* ─── STARS: Canvas-based for performance ─── */
  const drawStars = useCallback((canvas) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight * 1.2;
    ctx.clearRect(0, 0, w, h);

    const starCount = getDeviceTier() === 'mobile' ? 80 : 200;
    for (let i = 0; i < starCount; i++) {
      const sx = ((i * 997) % w);
      const sy = ((i * 631) % (h * 0.6));
      const r = ((i * 173) % 100) / 100 * 1.5 + 0.3;
      const alpha = ((i * 251) % 100) / 100 * 0.6 + 0.2;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,249,255,${alpha})`;
      ctx.fill();
    }
  }, []);

  /* ─── FIREFLIES: Canvas with requestAnimationFrame ─── */
  const initFireflies = useCallback((canvas) => {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight * 1.5;
    const tier = getDeviceTier();
    const count = tier === 'mobile' ? 20 : tier === 'tablet' ? 35 : 60;

    const flies = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.008,
      isBlue: i < count * 0.3, // 30% are electric blue
    }));

    return { ctx, w, h, flies };
  }, []);

  /* ─── DUST: Canvas with subtle floating particles ─── */
  const initDust = useCallback((canvas) => {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight * 1.5;
    const tier = getDeviceTier();
    const count = tier === 'mobile' ? 15 : tier === 'tablet' ? 30 : 50;

    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.2 - 0.05,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    return { ctx, w, h, motes };
  }, []);

  /* ═══════════════════════════════════════════════════════════
     MAIN EFFECT — all GSAP timelines, canvas loops, events
     ═══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tier = getDeviceTier();

    /* Draw static stars */
    drawStars(starsCanvasRef.current);

    /* If user wants reduced motion, stop here — ambient static sky is fine */
    if (prefersReduced) return;

    /* ─── GSAP Context for automatic cleanup ─── */
    const ctx = gsap.context(() => {

      /* ══════════════════════════════════════════
         1. STAR TWINKLING — randomised opacity pulses
         ══════════════════════════════════════════ */
      if (starsCanvasRef.current) {
        gsap.to(starsCanvasRef.current, {
          opacity: 0.3,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      /* ══════════════════════════════════════════
         2. AURORA / LIGHT STREAKS — slow horizontal drift
         ══════════════════════════════════════════ */
      if (auroraRef.current) {
        const auroras = auroraRef.current.children;
        gsap.fromTo(auroras, {
          x: -100,
          opacity: 0.3,
          scaleX: 0.8,
        }, {
          x: 100,
          opacity: 0.7,
          scaleX: 1.2,
          duration: 20,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: { each: 6, from: 'random' },
        });
      }

      /* ══════════════════════════════════════════
         3. CLOUDS — very slow horizontal drift
         ══════════════════════════════════════════ */
      if (cloudsRef.current) {
        const clouds = cloudsRef.current.children;
        gsap.to(clouds, {
          x: '+=300',
          duration: 60,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          stagger: { each: 15, from: 'edges' },
        });
        gsap.to(clouds, {
          opacity: 'random(0.03, 0.12)',
          duration: 'random(8, 15)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 3 },
        });
      }

      /* ══════════════════════════════════════════
         4. SCROLL PARALLAX — each layer at different depth
         ══════════════════════════════════════════ */
      const parallaxLayers = [
        { ref: skyRef, speed: 0.05 },
        { ref: auroraRef, speed: 0.08 },
        { ref: cloudsRef, speed: 0.12 },
        { ref: mountainsRef, speed: 0.18 },
        { ref: farTreesRef, speed: 0.32 },
        { ref: midTreesRef, speed: 0.55 },
        { ref: fogRef, speed: 0.7 },
        { ref: fgTreesRef, speed: 0.9 },
        { ref: lightRaysRef, speed: 0.4 },
        { ref: glowOrbsRef, speed: 0.25 },
      ];

      parallaxLayers.forEach(({ ref, speed }) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          y: () => -ScrollTrigger.maxScroll(window) * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      /* ══════════════════════════════════════════
         5. TREE SWAYING — gentle wind via CSS transform
         ══════════════════════════════════════════ */
      // Far trees sway
      if (farTreesRef.current) {
        const farGs = farTreesRef.current.querySelectorAll('g');
        gsap.to(farGs, {
          rotation: 'random(-1.5, 1.5)',
          transformOrigin: '50% 100%',
          duration: 'random(5, 9)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.15, from: 'random' },
        });
      }

      // Mid trees sway more visibly
      if (midTreesRef.current) {
        const midGs = midTreesRef.current.querySelectorAll('g');
        gsap.to(midGs, {
          rotation: 'random(-2.5, 2.5)',
          transformOrigin: '50% 100%',
          duration: 'random(4, 7)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.2, from: 'random' },
        });
      }

      // Foreground branches sway most
      if (fgTreesRef.current) {
        const fgGs = fgTreesRef.current.querySelectorAll('g');
        gsap.to(fgGs, {
          rotation: 'random(-3, 3)',
          x: 'random(-8, 8)',
          transformOrigin: '50% 100%',
          duration: 'random(3, 6)',
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.3, from: 'random' },
        });
      }

      /* ══════════════════════════════════════════
         6. FOG — continuous horizontal drift + opacity
         ══════════════════════════════════════════ */
      if (fogRef.current) {
        const fogs = fogRef.current.children;
        gsap.to(fogs, {
          x: '+=250',
          duration: 35,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          stagger: { each: 8, from: 'random' },
        });
        gsap.to(fogs, {
          opacity: 'random(0.15, 0.6)',
          duration: 'random(6, 12)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 4 },
        });
      }

      /* ══════════════════════════════════════════
         7. VOLUMETRIC LIGHT RAYS — slowly shifting
         ══════════════════════════════════════════ */
      if (lightRaysRef.current) {
        const rays = lightRaysRef.current.children;
        gsap.to(rays, {
          rotation: '+=8',
          opacity: 'random(0.15, 0.45)',
          x: '+=60',
          duration: 25,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 5 },
        });
      }

      /* ══════════════════════════════════════════
         8. FLOATING GLOW ORBS — ambient blue pulsing
         ══════════════════════════════════════════ */
      if (glowOrbsRef.current) {
        const orbs = glowOrbsRef.current.children;
        gsap.to(orbs, {
          y: 'random(-60, 60)',
          x: 'random(-40, 40)',
          scale: 'random(0.7, 1.4)',
          opacity: 'random(0.1, 0.5)',
          duration: 'random(10, 20)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 3, from: 'random' },
        });
      }

    }, containerRef);

    /* ══════════════════════════════════════════
       9. MOUSE INTERACTIVITY (Desktop only)
       — Smooth parallax depth shift on cursor movement
       ══════════════════════════════════════════ */
    let mouseMoveHandler = null;
    if (tier === 'desktop') {
      mouseMoveHandler = (e) => {
        mouseRef.current.x = e.clientX / window.innerWidth;
        mouseRef.current.y = e.clientY / window.innerHeight;
      };
      window.addEventListener('mousemove', mouseMoveHandler, { passive: true });

      /* Render loop for smooth cursor-based parallax */
      const mouseParallax = () => {
        const mx = (mouseRef.current.x - 0.5) * 2; // -1 to 1
        const my = (mouseRef.current.y - 0.5) * 2;

        if (mountainsRef.current) gsap.to(mountainsRef.current, { x: mx * -8, y: my * -5, duration: 1.4, ease: 'power2.out', overwrite: 'auto' });
        if (farTreesRef.current) gsap.to(farTreesRef.current, { x: mx * -16, y: my * -10, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
        if (midTreesRef.current) gsap.to(midTreesRef.current, { x: mx * -30, y: my * -18, duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
        if (fgTreesRef.current) gsap.to(fgTreesRef.current, { x: mx * -55, y: my * -25, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
        if (lightRaysRef.current) gsap.to(lightRaysRef.current, { x: mx * 40, duration: 1.6, ease: 'power2.out', overwrite: 'auto' });
        if (fogRef.current) gsap.to(fogRef.current, { x: mx * 20, duration: 2.0, ease: 'power2.out', overwrite: 'auto' });

        animFrameRef.current = requestAnimationFrame(mouseParallax);
      };
      animFrameRef.current = requestAnimationFrame(mouseParallax);
    }

    /* ══════════════════════════════════════════
       10. FIREFLIES — Canvas animation loop
       ══════════════════════════════════════════ */
    const fireflyState = initFireflies(firefliesCanvasRef.current);
    const dustState = initDust(dustCanvasRef.current);
    let particleRaf = null;

    const animateParticles = (time) => {
      /* Fireflies */
      if (fireflyState) {
        const { ctx: fCtx, w: fW, h: fH, flies } = fireflyState;
        fCtx.clearRect(0, 0, fW, fH);
        flies.forEach((f) => {
          f.phase += f.speed;
          f.x += f.vx + Math.sin(f.phase) * 0.3;
          f.y += f.vy + Math.cos(f.phase * 0.7) * 0.2;

          // Wrap around edges
          if (f.x < -10) f.x = fW + 10;
          if (f.x > fW + 10) f.x = -10;
          if (f.y < -10) f.y = fH + 10;
          if (f.y > fH + 10) f.y = -10;

          const glow = (Math.sin(f.phase * 2) + 1) / 2; // 0 to 1 pulsing
          const alpha = 0.2 + glow * 0.8;
          const color = f.isBlue ? COLORS.electricBlue : COLORS.cyan;

          // Outer glow
          fCtx.beginPath();
          fCtx.arc(f.x, f.y, f.size * 4, 0, Math.PI * 2);
          const grad = fCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 4);
          grad.addColorStop(0, `${color}${Math.round(alpha * 60).toString(16).padStart(2, '0')}`);
          grad.addColorStop(1, 'transparent');
          fCtx.fillStyle = grad;
          fCtx.fill();

          // Bright core
          fCtx.beginPath();
          fCtx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2);
          fCtx.fillStyle = `rgba(245,249,255,${alpha * 0.9})`;
          fCtx.fill();
        });
      }

      /* Dust motes */
      if (dustState) {
        const { ctx: dCtx, w: dW, h: dH, motes } = dustState;
        dCtx.clearRect(0, 0, dW, dH);
        motes.forEach((m) => {
          m.phase += 0.005;
          m.x += m.vx + Math.sin(m.phase) * 0.08;
          m.y += m.vy;

          // Wrap
          if (m.y < -5) { m.y = dH + 5; m.x = Math.random() * dW; }
          if (m.x < -5) m.x = dW + 5;
          if (m.x > dW + 5) m.x = -5;

          dCtx.beginPath();
          dCtx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          dCtx.fillStyle = `rgba(245,249,255,${m.alpha * (0.5 + Math.sin(m.phase) * 0.5)})`;
          dCtx.fill();
        });
      }

      particleRaf = requestAnimationFrame(animateParticles);
    };
    particleRaf = requestAnimationFrame(animateParticles);

    /* ─── Cleanup ─── */
    return () => {
      ctx.revert();
      if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (particleRaf) cancelAnimationFrame(particleRaf);
    };
  }, [drawStars, initFireflies, initDust]);

  /* ═══════════════════════════════════════════════════════════
     RENDER — 9 visual layers + canvas overlays
     ═══════════════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      className="forest-bg-container"
      aria-hidden="true"
    >
      {/* ────── LAYER 1: SKY GRADIENT ────── */}
      <div ref={skyRef} className="forest-layer forest-sky">
        {/* Twinkling star field (canvas for perf) */}
        <canvas
          ref={starsCanvasRef}
          className="forest-stars-canvas"
        />
      </div>

      {/* ────── LAYER 1b: AURORA / LIGHT STREAKS ────── */}
      <div ref={auroraRef} className="forest-layer forest-aurora">
        <div className="aurora-streak aurora-streak-1" />
        <div className="aurora-streak aurora-streak-2" />
        <div className="aurora-streak aurora-streak-3" />
      </div>

      {/* ────── LAYER 1c: SLOW CLOUDS ────── */}
      <div ref={cloudsRef} className="forest-layer forest-clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
      </div>

      {/* ────── LAYER 2: MOUNTAINS ────── */}
      <div ref={mountainsRef} className="forest-layer forest-mountains">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 900"
          preserveAspectRatio="none"
          className="forest-mountains-svg"
        >
          <defs>
            <filter id="mtnBlur1"><feGaussianBlur stdDeviation="6" /></filter>
            <filter id="mtnBlur2"><feGaussianBlur stdDeviation="3" /></filter>
            <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.emerald} stopOpacity="0.5" />
              <stop offset="100%" stopColor={COLORS.midnight} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Far range */}
          <MountainSVG
            fill="url(#mtnGrad)"
            opacity={0.5}
            d="M0,900 L0,520 C80,490 180,440 300,470 C420,500 520,380 700,420 C880,460 1000,340 1200,380 C1400,420 1550,350 1700,400 C1800,430 1880,410 1920,450 L1920,900 Z"
          />
          {/* Near range */}
          <MountainSVG
            fill={COLORS.deepForest}
            opacity={0.7}
            d="M0,900 L0,580 C100,620 250,540 400,580 C550,620 700,500 900,550 C1100,600 1250,480 1450,530 C1600,560 1750,500 1920,540 L1920,900 Z"
          />
        </svg>
      </div>

      {/* ────── LAYER 3: FAR TREES ────── */}
      <div ref={farTreesRef} className="forest-layer forest-far-trees">
        <svg width="2600" height="800" viewBox="0 0 2600 800" className="forest-trees-svg">
          {farTreeData.map((t) => (
            <OrganicPine key={t.id} id={t.id} x={t.x} y={t.y} scale={t.scale} fill={COLORS.deepForest} opacity={0.5} />
          ))}
        </svg>
      </div>

      {/* ────── LAYER 4: MID-DISTANCE TREES ────── */}
      <div ref={midTreesRef} className="forest-layer forest-mid-trees">
        <svg width="2800" height="800" viewBox="0 0 2800 800" className="forest-trees-svg">
          {midTreeData.map((t) => (
            <OrganicPine key={t.id} id={t.id} x={t.x} y={t.y} scale={t.scale} fill={COLORS.midnight} opacity={0.75} />
          ))}
        </svg>
      </div>

      {/* ────── LAYER 5: FOREGROUND TREES (framing) ────── */}
      <div ref={fgTreesRef} className="forest-layer forest-fg-trees">
        <svg width="2000" height="900" viewBox="0 0 2000 900" className="forest-trees-svg forest-fg-svg">
          {fgTreeData.map((t) => (
            <OrganicPine key={t.id} id={t.id} x={t.x} y={t.y} scale={t.scale} fill={COLORS.darkBark} opacity={0.9} />
          ))}
        </svg>
      </div>

      {/* ────── LAYER 6: FOG ────── */}
      <div ref={fogRef} className="forest-layer forest-fog">
        <div className="fog-blob fog-1" />
        <div className="fog-blob fog-2" />
        <div className="fog-blob fog-3" />
        <div className="fog-blob fog-4" />
        <div className="fog-blob fog-5" />
      </div>

      {/* ────── LAYER 7: FIREFLIES (Canvas) ────── */}
      <canvas ref={firefliesCanvasRef} className="forest-particle-canvas forest-fireflies" />

      {/* ────── LAYER 8: DUST PARTICLES (Canvas) ────── */}
      <canvas ref={dustCanvasRef} className="forest-particle-canvas forest-dust" />

      {/* ────── LAYER 9: VOLUMETRIC LIGHT RAYS ────── */}
      <div ref={lightRaysRef} className="forest-layer forest-light-rays">
        <div className="light-ray ray-1" />
        <div className="light-ray ray-2" />
        <div className="light-ray ray-3" />
      </div>

      {/* ────── FLOATING GLOW ORBS ────── */}
      <div ref={glowOrbsRef} className="forest-layer forest-glow-orbs">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
        <div className="glow-orb orb-4" />
      </div>

      {/* ────── READABILITY GRADIENTS ────── */}
      <div className="forest-vignette" />
    </div>
  );
};

export default ForestBackground;
