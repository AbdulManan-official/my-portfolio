"use client";
import { useEffect, useRef, useState } from "react";
import { Code2, Smartphone, Globe, Zap } from "lucide-react";

const HIGHLIGHTS = [
  { Icon: Code2,      title: "50+ Apps Built", desc: "Utility, wellness & social-good",  accent: "#0284c7" },
  { Icon: Smartphone, title: "iOS & Android",  desc: "True cross-platform expertise",    accent: "#7c3aed" },
  { Icon: Globe,      title: "Global Clients", desc: "Delivering remotely worldwide",    accent: "#db2777" },
  { Icon: Zap,        title: "Full Ownership", desc: "Concept → design → deployment",    accent: "#059669" },
];

const TECHS = ["Flutter", "React", "Firebase", "MongoDB"];

const BIO = [
  <>I&apos;m Abdul Manan — a Flutter developer based in Sialkot, Pakistan, currently working full-time at <strong className="bio-strong">Technosofts</strong> while taking on freelance projects on the side. I&apos;ve shipped 50+ apps across utility, wellness, spiritual, and e-commerce categories.</>,
  <>I don&apos;t just write code — I think about user experience, performance, and long-term maintainability. My stack is <strong className="bio-strong">Flutter + Dart</strong> on the front, <strong className="bio-strong">Firebase & Supabase</strong> on the back.</>,
  <>When I&apos;m not building apps, I&apos;m planning the next one — currently expanding into a portfolio of SaaS products spanning health, productivity, and social good.</>,
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || window.innerWidth < 1024) return; // Disable 3D mouse effect on mobile for performance
    const fn = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 12,
      y: (e.clientY / window.innerHeight - 0.5) * 12,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  if (!mounted) return <section id="about" style={{ background: "var(--bg-secondary)", minHeight: "100vh" }} />;

  return (
    <>
      <style>{`
        /* ── Theme Specific Toggles ── */
        :root {
          --about-glass-bg: rgba(15, 23, 42, 0.03);
          --about-glass-border: rgba(15, 23, 42, 0.08);
          --about-glass-hover: rgba(15, 23, 42, 0.06);
        }
        [data-theme="dark"] {
          --about-glass-bg: rgba(255, 255, 255, 0.03);
          --about-glass-border: rgba(255, 255, 255, 0.08);
          --about-glass-hover: rgba(255, 255, 255, 0.06);
        }

        /* ── Reveal Animations ── */
        .about-reveal {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-reveal.in { opacity: 1; transform: translateY(0); }

        .about-left {
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
        }
        .about-left.in { opacity: 1; transform: translateX(0); }

        .about-right {
          opacity: 0; transform: translateX(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
        .about-right.in { opacity: 1; transform: translateX(0); }

        /* ── Highlight Cards ── */
        .about-card {
          background: var(--about-glass-bg);
          border: 1px solid var(--about-glass-border);
          border-radius: 20px;
          padding: 24px;
          cursor: default;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .about-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--card-accent-bg, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: inherit;
          z-index: 0;
        }
        .about-card:hover { transform: translateY(-6px) scale(1.02); }
        .about-card:hover::before { opacity: 1; }
        
        .about-card-content { position: relative; z-index: 1; }
        
        .about-card .card-icon {
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease;
        }
        .about-card:hover .card-icon { transform: scale(1.2) rotate(10deg); }

        /* FIXED: Text colors adapt to light/dark mode perfectly now */
        .about-card-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 6px;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .about-card-desc {
          font-size: 13px; color: var(--text-muted);
          font-family: var(--font-body); lineHeight: 1.6;
          transition: color 0.3s ease;
        }
        .about-card:hover .about-card-desc { color: var(--text-secondary); }

        /* ── Tech Badges ── */
        .about-tech-badge {
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-display);
          padding: 6px 16px;
          border-radius: 100px;
          background: var(--about-glass-bg);
          border: 1px solid var(--about-glass-border);
          color: var(--text-primary);
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position: absolute;
          white-space: nowrap;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .about-tech-badge:hover {
          transform: translate(-50%,-50%) scale(1.15) !important;
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: var(--about-glass-hover);
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.2);
        }

        /* ── Bio Text & Hover Line ── */
        .bio-para {
          font-size: 15.5px;
          line-height: 1.85;
          color: var(--text-secondary);
          font-family: var(--font-body);
          position: relative;
          padding-left: 20px;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .bio-para::before {
          content: '';
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px; border-radius: 3px;
          background: var(--about-glass-border);
          transition: all 0.3s ease;
        }
        .bio-para:hover { color: var(--text-primary); transform: translateX(4px); }
        .bio-para:hover::before { background: linear-gradient(180deg, #0284c7, #7c3aed); box-shadow: 0 0 10px rgba(2, 132, 199, 0.4); }
        
        .bio-strong { color: var(--text-primary); font-weight: 700; transition: color 0.3s ease; }
        .bio-para:hover .bio-strong { color: var(--accent-cyan); }

        /* ── Gradients ── */
        .about-heading-gradient {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Center 3D Icon Circle ── */
        .about-icon-circle {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          box-shadow: 0 0 0 10px rgba(2,132,199,0.1),
                      0 0 40px rgba(2,132,199,0.3),
                      0 0 100px rgba(124,58,237,0.2);
          animation: pulseGlow 4s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 10px rgba(2,132,199,0.1), 0 0 40px rgba(2,132,199,0.2); }
          100% { box-shadow: 0 0 0 15px rgba(2,132,199,0.15), 0 0 60px rgba(124,58,237,0.4); }
        }
      `}</style>

      <section id="about" ref={ref} className="relative py-20 lg:py-28 overflow-hidden grid-bg"
        style={{ background: "var(--bg-secondary)" }}>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle,rgba(2,132,199,0.05),transparent)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block"
          style={{ background: "radial-gradient(circle,rgba(124,58,237,0.05),transparent)", filter: "blur(80px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className={`about-reveal ${visible ? "in" : ""} text-center mb-16 lg:mb-24`}>
            <div className="section-label justify-center mb-4">The person behind the apps</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,3.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              About <span className="about-heading-gradient">Me</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── LEFT — 3D Avatar Area ── */}
            <div className={`about-left ${visible ? "in" : ""}`}>
              <div className="relative w-full max-w-[320px] sm:max-w-sm mx-auto aspect-square"
                style={{
                  transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`,
                  transition: "transform 0.2s ease-out",
                  perspective: "1000px",
                }}>

                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full"
                  style={{ border: "1.5px solid var(--about-glass-border)", animation: "rotate-slow 25s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                    style={{ background: "#0284c7", boxShadow: "0 0 16px #0284c7" }} />
                </div>

                {/* Inner reverse ring */}
                <div className="absolute inset-8 rounded-full"
                  style={{ border: "1.5px dashed var(--about-glass-border)", animation: "rotate-slow 15s linear infinite reverse" }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full"
                    style={{ background: "#7c3aed", boxShadow: "0 0 16px #7c3aed" }} />
                </div>

                {/* Glow blob behind icon */}
                <div className="absolute inset-12 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle,rgba(2,132,199,0.15),rgba(124,58,237,0.1),transparent)", filter: "blur(25px)" }} />

                {/* Center icon circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center about-icon-circle">
                    <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating tech badges */}
                {TECHS.map((t, i) => {
                  const angles = [315, 45, 225, 135];
                  const a = (angles[i] * Math.PI) / 180;
                  const r = 48; // Radius percentage
                  const x = 50 + r * Math.cos(a);
                  const y = 50 + r * Math.sin(a);
                  return (
                    <div
                      key={t}
                      className="about-tech-badge"
                      style={{
                        left: `${x}%`, top: `${y}%`,
                        transform: "translate(-50%,-50%)",
                        animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.6s ease ${0.8 + i * 0.15}s`,
                      }}
                    >
                      {t}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT — Bio ── */}
            <div className={`about-right ${visible ? "in" : ""}`}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Label + heading */}
              <div>
                <div className="section-label mb-4">Who I Am</div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(1.5rem,3vw,2.2rem)",
                  color: "var(--text-primary)", lineHeight: 1.25,
                  letterSpacing: "-0.02em"
                }}>
                  A Flutter developer who cares about{" "}
                  <span className="about-heading-gradient">what gets built</span>, not just how.
                </h3>
              </div>

              {/* Bio paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {BIO.map((text, i) => (
                  <p key={i} className="bio-para"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(15px)",
                      transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.1}s, color 0.3s ease, transform 0.3s ease`,
                    }}>
                    {text}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, var(--about-glass-border), transparent)" }} />

              {/* Highlight cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {HIGHLIGHTS.map((h, i) => (
                  <div
                    key={h.title}
                    className="about-card"
                    style={{
                      // @ts-ignore
                      "--card-accent-bg": `${h.accent}0A`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "scale(0.92) translateY(15px)",
                      transition: `opacity 0.6s ease ${0.45 + i * 0.1}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.45 + i * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${h.accent}60`;
                      el.style.boxShadow = `0 15px 35px ${h.accent}15`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--about-glass-border)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div className="about-card-content">
                      <h.Icon
                        size={26}
                        className="card-icon"
                        style={{ color: h.accent, marginBottom: 14 }}
                      />
                      <div className="about-card-title">{h.title}</div>
                      <div className="about-card-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}