"use client";
import { useEffect, useRef, useState } from "react";

const CATS = [
  { label: "Mobile Development", accent: "#0284c7", items: [{ n: "Flutter", l: 95 }, { n: "Dart", l: 93 }, { n: "React Native", l: 88 }, { n: "Swift", l: 85 }] },
  { label: "Backend & Database", accent: "#7c3aed", items: [{ n: "Firebase", l: 92 }, { n: "Supabase", l: 89 }, { n: "Node.js", l: 86 }, { n: "PostgreSQL", l: 84 }] },
  { label: "Design & Arch", accent: "#db2777", items: [{ n: "UI/UX & Figma", l: 90 }, { n: "Clean Architecture", l: 88 }, { n: "Git Flow", l: 88 }, { n: "CI/CD", l: 85 }] },
];

const BADGES = [
  "Flutter", "Dart", "Firebase", "Supabase", "React", "Next.js", "Tailwind", "TypeScript",
  "Figma", "UI/UX", "Git", "GitHub", "Node.js", "REST API", "GraphQL", "MongoDB",
  "Swift", "Kotlin", "Docker", "AWS", "Vercel", "Postgres", "Prisma", "Python"
];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimate(true), 150);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="skills" style={{ minHeight: "80vh" }} />;

  const row1 = BADGES.slice(0, 8);
  const row2 = BADGES.slice(8, 16);
  const row3 = BADGES.slice(16, 24);

  return (
    <>
      <style>{`
        :root {
          --sk-bg-card: rgba(15, 23, 42, 0.02);
          --sk-border: rgba(15, 23, 42, 0.06);
          --sk-track: rgba(15, 23, 42, 0.05);
          --sk-text: #0f172a;
          --sk-badge-bg: #ffffff;
        }
        [data-theme="dark"] {
          --sk-bg-card: rgba(255, 255, 255, 0.02);
          --sk-border: rgba(255, 255, 255, 0.08);
          --sk-track: rgba(255, 255, 255, 0.06);
          --sk-text: #f8fafc;
          --sk-badge-bg: #0f172a;
        }

        .reveal-up {
          opacity: 0; transform: translateY(20px);
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-up.in { opacity: 1; transform: translateY(0); }

        .expertise-gradient {
          background: linear-gradient(135deg, #0284c7, #7c3aed, #db2777);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skill-card {
          background: var(--sk-bg-card);
          border: 1px solid var(--sk-border);
          border-radius: 20px;
          padding: 24px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          border-color: var(--card-accent);
          box-shadow: 0 12px 30px rgba(0,0,0,0.03);
        }

        .progress-track {
          height: 6px; border-radius: 6px;
          background: var(--sk-track); overflow: hidden;
        }
        .progress-fill {
          height: 100%; border-radius: 6px;
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .marquee-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        .marquee-row {
          display: flex;
          gap: 12px;
          width: max-content;
          margin-bottom: 12px;
        }

        .marquee-track-left { animation: scrollLeft 50s linear infinite; }
        .marquee-track-right { animation: scrollRight 50s linear infinite; }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 6px)); }
        }

        @keyframes scrollRight {
          from { transform: translateX(calc(-50% - 6px)); }
          to { transform: translateX(0); }
        }

        .tech-pill {
          background: var(--sk-badge-bg);
          color: var(--sk-text);
          border: 1px solid var(--sk-border);
          padding: 10px 22px;
          border-radius: 50px;
          font-family: var(--font-display);
          font-weight: 600; font-size: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .tech-pill:hover {
          background: #0284c7;
          color: #fff;
          border-color: #0284c7;
          transform: translateY(-2px);
        }
      `}</style>

      <section id="skills" ref={ref} className="relative py-12 lg:py-16 overflow-hidden bg-[var(--bg-primary)]">
        
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">

          {/* ── Heading 1 ── */}
          <div className={`reveal-up ${visible ? "in" : ""} text-center mb-10`}>
            <div className="section-label justify-center mb-3">Technical Arsenal</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight font-display">
              Skills & <span className="expertise-gradient">Expertise</span>
            </h2>
          </div>

          {/* ── Skill Cards ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-20">
            {CATS.map((cat, ci) => (
              <div key={cat.label} className={`reveal-up skill-card ${visible ? "in" : ""}`}
                style={{ transitionDelay: `${ci * 0.1}s`, "--card-accent": cat.accent } as React.CSSProperties}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.accent, boxShadow: `0 0 10px ${cat.accent}` }} />
                  <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: cat.accent }}>{cat.label}</span>
                </div>
                <div className="flex flex-col gap-4">
                  {cat.items.map((skill, si) => (
                    <div key={skill.n}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-semibold text-[var(--sk-text)]">{skill.n}</span>
                        <span className="text-xs font-bold" style={{ color: cat.accent }}>{skill.l}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{
                          background: `linear-gradient(90deg, ${cat.accent}80, ${cat.accent})`,
                          width: animate ? `${skill.l}%` : "0%",
                          transitionDelay: `${ci * 100 + si * 80}ms`,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Heading 2: Tech Stack (Styled exactly like Heading 1) ── */}
          <div className={`reveal-up ${visible ? "in" : ""} text-center mb-10`} style={{ transitionDelay: "0.15s" }}>
            <div className="section-label justify-center mb-3">Ecosystem</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight font-display">
              Tech <span className="expertise-gradient">Stack</span>
            </h2>
          </div>

          <div className={`reveal-up ${visible ? "in" : ""} mt-4`} style={{ transitionDelay: "0.2s" }}>
            <div className="marquee-viewport">
              <div className="marquee-row marquee-track-left">
                {[...row1, ...row1].map((badge, i) => (
                  <div key={i} className="tech-pill">{badge}</div>
                ))}
              </div>
              <div className="marquee-row marquee-track-right">
                {[...row2, ...row2].map((badge, i) => (
                  <div key={i} className="tech-pill">{badge}</div>
                ))}
              </div>
              <div className="marquee-row marquee-track-left">
                {[...row3, ...row3].map((badge, i) => (
                  <div key={i} className="tech-pill">{badge}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}