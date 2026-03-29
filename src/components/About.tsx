"use client";
import { useEffect, useRef, useState } from "react";
import { Code2, Smartphone, Globe, Zap } from "lucide-react";

const HIGHLIGHTS = [
  { Icon: Code2,      title: "50+ Apps Built", desc: "Utility, wellness & social-good",  accent: "#0284c7" },
  { Icon: Smartphone, title: "iOS & Android",   desc: "True cross-platform expertise",    accent: "#7c3aed" },
  { Icon: Globe,      title: "Global Clients",  desc: "Delivering remotely worldwide",    accent: "#db2777" },
  { Icon: Zap,        title: "Full Ownership",  desc: "Concept → design → deployment",   accent: "#059669" },
];

const TECHS = ["Flutter", "Dart", "Firebase", "Supabase"];

const BIO = [
  <>I&apos;m Abdul Manan — a Flutter developer based in Sialkot, Pakistan, currently working full-time at{" "}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Technosofts</strong>{" "}while taking on freelance projects on the side. I&apos;ve shipped 50+ apps across utility, wellness, spiritual, and e-commerce categories.</>,
  <>I don&apos;t just write code — I think about user experience, performance, and long-term maintainability. My stack is{" "}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Flutter + Dart</strong>{" "}on the front,{" "}<strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Firebase & Supabase</strong>{" "}on the back.</>,
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
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const fn = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 8,
      y: (e.clientY / window.innerHeight - 0.5) * 8,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  if (!mounted) return <section id="about" style={{ background: "var(--bg-secondary)", minHeight: 400 }} />;

  return (
    <>
      <style>{`
        .about-reveal {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .about-reveal.in { opacity: 1; transform: translateY(0); }

        .about-left {
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        .about-left.in { opacity: 1; transform: translateX(0); }

        .about-right {
          opacity: 0; transform: translateX(28px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .about-right.in { opacity: 1; transform: translateX(0); }

        /* ── Highlight card ── */
        .about-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 18px;
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .about-card::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--card-accent-bg, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        .about-card:hover { transform: translateY(-4px) scale(1.02); }
        .about-card:hover::before { opacity: 1; }
        .about-card .card-icon {
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), color 0.3s ease;
        }
        .about-card:hover .card-icon { transform: scale(1.2) rotate(6deg); }

        /* ── Card title — always dark/readable ── */
        .about-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          /* Same rich dark color in both modes */
          color: #0f172a;
          margin-bottom: 3px;
        }
        [data-theme="dark"] .about-card-title {
          color: #0f172a;
        }

        /* ── Tech badge ── */
        .about-tech-badge {
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-display);
          padding: 5px 14px;
          border-radius: 100px;
          background: var(--pill-bg, var(--bg-glass));
          border: 1px solid var(--pill-border, var(--border-subtle));
          color: var(--pill-text, var(--text-primary));
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          position: absolute;
          white-space: nowrap;
          backdrop-filter: blur(12px);
        }
        .about-tech-badge:hover {
          transform: translate(-50%,-50%) scale(1.12) !important;
        }

        /* ── Bio paragraph ── */
        .bio-para {
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--text-secondary);
          font-family: var(--font-body);
          position: relative;
          padding-left: 16px;
          transition: color 0.3s ease;
        }
        .bio-para::before {
          content: '';
          position: absolute;
          left: 0; top: 8px; bottom: 8px;
          width: 2px; border-radius: 1px;
          background: var(--border-glow);
          transition: background 0.3s ease;
        }
        .bio-para:hover { color: var(--text-primary); }
        .bio-para:hover::before { background: var(--accent-cyan); }

        /* ── Section heading "Me" — same gradient both modes ── */
        .about-heading-gradient {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── "what gets built" — same dark gradient both modes ── */
        .about-sub-gradient {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Code2 icon background — same in both modes ── */
        .about-icon-circle {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          box-shadow: 0 0 0 8px rgba(2,132,199,0.1),
                      0 0 60px rgba(2,132,199,0.2),
                      0 0 120px rgba(124,58,237,0.15);
        }
      `}</style>

      <section id="about" ref={ref} className="relative py-24 overflow-hidden grid-bg"
        style={{ background: "var(--bg-secondary)" }}>

        {/* Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(2,132,199,0.06),transparent)", filter: "blur(70px)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(124,58,237,0.06),transparent)", filter: "blur(70px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className={`about-reveal ${visible ? "in" : ""} text-center mb-16`}>
            <div className="section-label justify-center mb-4">The person behind the apps</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text-primary)" }}>
              About <span className="about-heading-gradient">Me</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── LEFT — 3D Avatar ── */}
            <div className={`about-left ${visible ? "in" : ""}`}>
              <div className="relative max-w-sm mx-auto aspect-square"
                style={{
                  transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`,
                  transition: "transform 0.4s ease-out",
                  perspective: "800px",
                }}>

                {/* Outer spinning ring */}
                <div className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid var(--border-glow)", animation: "rotate-slow 20s linear infinite" }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                    style={{ background: "#0284c7", boxShadow: "0 0 14px #0284c7" }} />
                </div>

                {/* Inner reverse ring */}
                <div className="absolute inset-5 rounded-full"
                  style={{ border: "1px solid var(--border-subtle)", animation: "rotate-slow 13s linear infinite reverse" }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full"
                    style={{ background: "#7c3aed", boxShadow: "0 0 12px #7c3aed" }} />
                </div>

                {/* Dashed ring */}
                <div className="absolute inset-[-12px] rounded-full pointer-events-none"
                  style={{ border: "1px dashed var(--border-subtle)", opacity: 0.5 }} />

                {/* Glow blob */}
                <div className="absolute inset-10 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle,rgba(2,132,199,0.14),rgba(124,58,237,0.1),transparent)", filter: "blur(22px)" }} />

                {/* Center icon circle — same gradient both modes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full flex items-center justify-center about-icon-circle">
                    <Code2 className="w-14 h-14 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating tech badges */}
                {TECHS.map((t, i) => {
                  const angles = [315, 45, 225, 135];
                  const a = (angles[i] * Math.PI) / 180;
                  const r = 47;
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
                        transition: `opacity 0.5s ease ${0.9 + i * 0.12}s`,
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
              style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Label + heading */}
              <div>
                <div className="section-label mb-3">Who I Am</div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "clamp(1.35rem,2.5vw,1.85rem)",
                  color: "var(--text-primary)", lineHeight: 1.35,
                }}>
                  A Flutter developer who cares about{" "}
                  <span className="about-sub-gradient">what gets built</span>, not just how.
                </h3>
              </div>

              {/* Bio paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {BIO.map((text, i) => (
                  <p key={i} className="bio-para"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(10px)",
                      transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s, color 0.3s ease`,
                    }}>
                    {text}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, var(--border-glow), transparent)" }} />

              {/* Highlight cards */}
              <div className="grid grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <div
                    key={h.title}
                    className="about-card"
                    style={{
                      // @ts-ignore
                      "--card-accent-bg": `${h.accent}10`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "scale(0.92) translateY(10px)",
                      transition: `opacity 0.5s ease ${0.45 + i * 0.08}s, transform 0.5s ease ${0.45 + i * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${h.accent}55`;
                      el.style.boxShadow = `0 12px 32px ${h.accent}20`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-subtle)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <h.Icon
                      size={22}
                      className="card-icon"
                      style={{ color: h.accent, marginBottom: 10 }}
                    />
                    {/* Title — dark in both modes */}
                    <div className="about-card-title">{h.title}</div>
                    <div style={{
                      fontSize: 12, color: "var(--text-muted)",
                      fontFamily: "var(--font-body)", lineHeight: 1.5,
                    }}>
                      {h.desc}
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