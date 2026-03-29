"use client";
import { useEffect, useRef, useState } from "react";

const CATS = [
  { label:"Mobile Development", accent:"#0284c7", items:[{n:"Flutter",l:95},{n:"Dart",l:93},{n:"Next Js",l:90},{n:"React",l:87}] },
  { label:"Backend & Database",  accent:"#7c3aed", items:[{n:"Firebase",l:90},{n:"Supabase",l:88},{n:"Firestore",l:88},{n:"REST APIs",l:85}] },
  { label:"Design & Tools",      accent:"#db2777", items:[{n:"UI/UX Design",l:90},{n:"Figma",l:82},{n:"Git & GitHub",l:88},{n:"App Architecture",l:87}] },
];

const BADGES = ["Flutter","Dart","Firebase","Supabase","Expo","Figma","Git","Firestore","REST API","UI/UX","Hive","Next.js","Tailwind CSS"];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState<number|null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimate(true), 100); // faster — was 200
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="skills" style={{ background:"var(--bg-primary)", paddingTop:96, paddingBottom:96 }} />;

  return (
    <>
      <style>{`
        /* ── Category label — dark & vivid in both modes ── */
        .cat-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: var(--font-display);
        }

        /* ── Skill name — darker in both modes ── */
        .skill-name {
          font-size: 13.5px;
          font-weight: 600;
          font-family: var(--font-body);
          color: #1e293b;
        }
        [data-theme="dark"] .skill-name {
  color: #f1f5f9; /* ✅ light/white text for dark mode */
}

        /* ── Card glass override — darker border ── */
        .skills-card {
          background: var(--bg-card);
          border: 1px solid rgba(15,23,42,0.18);
          border-radius: var(--radius-card);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 24px;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        [data-theme="dark"] .skills-card {
          border-color: rgba(255,255,255,0.1);
        }
        .skills-card:hover {
          transform: translateY(-4px);
        }

        /* ── Progress track — visible in both modes ── */
        .progress-track {
          height: 5px;
          border-radius: 3px;
          overflow: hidden;
          background: rgba(15,23,42,0.1);
        }
        [data-theme="dark"] .progress-track {
          background: rgba(255,255,255,0.08);
        }

        /* ── "Expertise" heading gradient — same both modes ── */
        .expertise-gradient {
          background: linear-gradient(135deg, #0284c7, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Tech badge ── */
        .tech-badge {
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-family: var(--font-body);
          font-weight: 500;
          cursor: default;
          user-select: none;
          transition: all 0.15s ease;
          /* darker border in both modes */
          border: 1px solid rgba(15,23,42,0.2);
          background: var(--bg-glass);
          color: var(--text-secondary);
        }
        [data-theme="dark"] .tech-badge {
          border-color: rgba(255,255,255,0.12);
        }
        .tech-badge:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          background: #0f172a;
          color: #ffffff;
          border-color: transparent;
        }
        [data-theme="dark"] .tech-badge:hover {
          background: #ffffff;
          color: #0f172a;
          border-color: transparent;
        }

        /* ── Faster reveal ── */
        .skills-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .skills-reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .skills-card-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .skills-card-wrap.in {
          opacity: 1;
          transform: translateY(0);
        }

        .badge-item {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .badge-item.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section id="skills" ref={ref} className="relative py-24 overflow-hidden grid-bg"
        style={{ background: "var(--bg-primary)" }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%,rgba(2,132,199,0.04),transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* ── Header ── */}
          <div className={`skills-reveal ${visible ? "in" : ""} text-center mb-16`}>
            <div className="section-label justify-center mb-4">What I know</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(2rem,4vw,3rem)", color:"var(--text-primary)" }}>
              Skills & <span className="expertise-gradient">Expertise</span>
            </h2>
          </div>

          {/* ── Skill cards ── */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {CATS.map((cat, ci) => (
              <div
                key={cat.label}
                className={`skills-card-wrap skills-card ${visible ? "in" : ""}`}
                style={{ transitionDelay: `${ci * 0.08}s` }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${cat.accent}18`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.accent}44`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
              >
                {/* Category label */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:cat.accent, flexShrink:0,
                    boxShadow:`0 0 8px ${cat.accent}88` }} />
                  <span className="cat-label" style={{ color: cat.accent }}>{cat.label}</span>
                </div>

                {/* Skills */}
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {cat.items.map((skill, si) => (
                    <div key={skill.n}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span className="skill-name">{skill.n}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:cat.accent, fontFamily:"var(--font-display)" }}>
                          {skill.l}%
                        </span>
                      </div>
                      <div className="progress-track">
                        <div style={{
                          height:"100%", borderRadius:3,
                          background:`linear-gradient(90deg,${cat.accent}88,${cat.accent})`,
                          width: animate ? `${skill.l}%` : "0%",
                          // faster bar animation — was 0.8s
                          transition: "width 0.55s ease-out",
                          transitionDelay: `${100 + ci * 60 + si * 40}ms`,
                          position:"relative", overflow:"hidden",
                        }}>
                          <div style={{
                            position:"absolute", inset:0,
                            background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)",
                            animation:"shimmer 2s ease-in-out infinite",
                            animationDelay:`${si * 0.3}s`,
                          }}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Tech Stack ── */}
          <div className={`skills-reveal ${visible ? "in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="section-label justify-center mb-6">Tech Stack</div>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10 }}>
              {BADGES.map((b, i) => (
                <div
                  key={b}
                  className={`tech-badge badge-item ${visible ? "in" : ""}`}
                  style={{ transitionDelay: `${0.22 + i * 0.018}s` }} // faster stagger — was 0.3 + i*0.02
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}