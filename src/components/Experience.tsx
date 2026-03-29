"use client";
import { useEffect, useRef, useState } from "react";
import { Briefcase, MapPin, Calendar, ArrowUpRight, CheckCircle2 } from "lucide-react";

const EXP = [
  {
    role: "Flutter Developer",
    company: "Technosofts",
    location: "Sialkot, Pakistan",
    duration: "2025 – Present",
    period: "5 months & continuing",
    type: "Full-time",
    accent: "#0284c7",
    icon: "🏢",
    index: "01",
    desc: "Working as a Flutter developer on multiple production apps, shipping high-quality software across Islamic, VPN, and media categories.",
    highlights: [
      "Built Tasbeeh Max — Islamic companion app",
      "Developed VPN Max & Shield VPN apps",
      "Created Video to Audio Converter Max",
      "Writing clean, scalable Dart architecture",
    ],
  },
  {
    role: "Mobile App Developer",
    company: "Freelance",
    location: "Remote",
    duration: "2025 – Present",
    period: "Ongoing",
    type: "Freelance",
    accent: "#7c3aed",
    icon: "🚀",
    index: "02",
    desc: "Building custom Flutter apps for international clients alongside full-time work. End-to-end ownership from design to deployment.",
    highlights: [
      "Cross-platform apps for global clients",
      "End-to-end: concept → design → deployment",
      "Firebase, Supabase, Stripe integrations",
      "App Store & Play Store management",
    ],
  },
  {
    role: "Flutter Developer",
    company: "Independent Projects",
    location: "Sialkot, Pakistan",
    duration: "2024 – 2025",
    period: "Foundation phase",
    type: "Self-Learning",
    accent: "#db2777",
    icon: "🌱",
    index: "03",
    desc: "Started the Flutter journey building real apps while mastering Dart, Firebase, and mobile UI patterns.",
    highlights: [
      "Mastered Flutter & Dart fundamentals",
      "Built e-commerce and utility apps",
      "Firebase, Supabase, REST API integrations",
      "Figma UI/UX design & prototyping",
    ],
  },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Full-time":     { bg: "rgba(2,132,199,0.12)",  text: "#0284c7", border: "rgba(2,132,199,0.3)"  },
  "Freelance":     { bg: "rgba(124,58,237,0.12)", text: "#7c3aed", border: "rgba(124,58,237,0.3)" },
  "Self-Learning": { bg: "rgba(219,39,119,0.12)", text: "#db2777", border: "rgba(219,39,119,0.3)" },
};

function ExpCard({ exp, visible, delay }: {
  exp: typeof EXP[0]; visible: boolean; delay: number;
}) {
  const [hov, setHov] = useState(false);
  const tc = TYPE_COLORS[exp.type] ?? TYPE_COLORS["Full-time"];

  return (
    <div
      className={`exp-card ${visible ? "in" : ""} ${hov ? "hov" : ""}`}
      style={{
        transitionDelay: `${delay}s`,
        borderColor: hov ? `${exp.accent}45` : undefined,
        boxShadow:   hov ? `0 24px 64px ${exp.accent}18` : undefined,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top accent bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:2,
        borderRadius:"20px 20px 0 0",
        background:`linear-gradient(90deg,${exp.accent},transparent)`,
        opacity: hov ? 1 : 0, transition:"opacity 0.3s",
      }}/>

      {/* Watermark */}
      <div style={{
        position:"absolute", top:-4, right:16,
        fontFamily:"var(--font-display)", fontSize:"4.5rem",
        fontWeight:800, lineHeight:1,
        color:"rgba(15,23,42,0.04)",
        pointerEvents:"none", userSelect:"none",
        transition:"color 0.3s",
      }}
        className="exp-wm"
      >{exp.index}</div>

      {/* Badge + period */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:14 }}>
        <span style={{
          fontSize:10, fontWeight:700, letterSpacing:"0.12em",
          textTransform:"uppercase", fontFamily:"var(--font-display)",
          padding:"3px 10px", borderRadius:100,
          background:tc.bg, border:`1px solid ${tc.border}`, color:tc.text,
        }}>{exp.type}</span>
        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontFamily:"var(--font-body)", color:"var(--text-muted)" }}>
          <Calendar size={10} strokeWidth={2}/>{exp.period}
        </span>
      </div>

      {/* Icon + role */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
        <div style={{
          width:44, height:44, borderRadius:12, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:20,
          background:`linear-gradient(135deg,${exp.accent}20,${exp.accent}0d)`,
          border:`1px solid ${exp.accent}30`,
        }}>{exp.icon}</div>
        <div>
          <h3 style={{
            fontFamily:"var(--font-display)", fontWeight:700, fontSize:15,
            margin:"0 0 3px", lineHeight:1.3, letterSpacing:"-0.01em",
            transition:"color 0.3s",
            color: hov ? exp.accent : "var(--exp-role-color)",
          }}>{exp.role}</h3>
          <div style={{ fontFamily:"var(--font-body)", fontSize:12, fontWeight:600, color:"var(--text-muted)" }}>
            {exp.company}
          </div>
        </div>
      </div>

      {/* Meta chips */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
        {[
          { Icon: MapPin,    text: exp.location },
          { Icon: Briefcase, text: exp.duration  },
        ].map(({ Icon, text }) => (
          <span key={text} style={{
            display:"inline-flex", alignItems:"center", gap:4,
            fontSize:11, fontFamily:"var(--font-body)", color:"var(--text-muted)",
            background:"var(--exp-chip-bg)",
            border:"1px solid var(--exp-chip-border)",
            padding:"3px 9px", borderRadius:100,
          }}>
            <Icon size={10} strokeWidth={2} style={{ color:exp.accent }}/>
            {text}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{
        height:1, marginBottom:14, borderRadius:1,
        background: hov ? `${exp.accent}22` : "var(--exp-divider)",
        transition:"background 0.3s",
      }}/>

      {/* Desc */}
      <p style={{
        fontFamily:"var(--font-body)", fontSize:12.5, lineHeight:1.75,
        color: hov ? "var(--text-primary)" : "var(--text-secondary)",
        marginBottom:14, paddingLeft:12,
        borderLeft:`2px solid ${hov ? exp.accent+"55" : "var(--exp-border-left)"}`,
        transition:"color 0.3s, border-color 0.3s",
      }}>{exp.desc}</p>

      {/* Highlights */}
      <ul style={{ listStyle:"none", padding:0, margin:"0 0 16px", display:"flex", flexDirection:"column", gap:7 }}>
        {exp.highlights.map((h,i) => (
          <li key={i} style={{
            display:"flex", alignItems:"flex-start", gap:7,
            fontSize:12, fontFamily:"var(--font-body)", lineHeight:1.5,
            color: hov ? "var(--text-secondary)" : "var(--text-muted)",
            transition:"color 0.25s",
          }}>
            <CheckCircle2 size={13} strokeWidth={2} style={{ color:exp.accent, flexShrink:0, marginTop:1 }}/>
            {h}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        paddingTop:12,
        borderTop:`1px solid ${hov ? exp.accent+"22" : "var(--exp-divider)"}`,
        transition:"border-color 0.3s",
      }}>
        <span style={{
          fontFamily:"var(--font-display)", fontSize:11, fontWeight:700,
          letterSpacing:"0.1em", opacity:0.6, color:exp.accent,
        }}>{exp.index}</span>
        <ArrowUpRight size={15} style={{
          color: hov ? exp.accent : "var(--exp-arrow)",
          transition:"color 0.25s, transform 0.3s",
          transform: hov ? "translate(3px,-3px)" : "none",
        }}/>
      </div>
    </div>
  );
}

export default function Experience() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="experience" style={{ background:"var(--bg-secondary)", paddingTop:96, paddingBottom:96 }}/>;

  return (
    <>
      <style>{`

        /* ── CSS tokens per theme ─────────────────────── */
        :root {
          --exp-role-color:   #1e293b;
          --exp-chip-bg:      rgba(15,23,42,0.05);
          --exp-chip-border:  rgba(15,23,42,0.1);
          --exp-divider:      rgba(15,23,42,0.08);
          --exp-border-left:  rgba(15,23,42,0.1);
          --exp-arrow:        rgba(15,23,42,0.25);
        }
        [data-theme="dark"] {
          --exp-role-color:   #f1f5f9;
          --exp-chip-bg:      rgba(255,255,255,0.04);
          --exp-chip-border:  rgba(255,255,255,0.09);
          --exp-divider:      rgba(255,255,255,0.08);
          --exp-border-left:  rgba(255,255,255,0.1);
          --exp-arrow:        rgba(255,255,255,0.2);
        }

        /* ── Watermark per theme ── */
        .exp-wm { color: rgba(15,23,42,0.04); }
        [data-theme="dark"] .exp-wm { color: rgba(255,255,255,0.04); }

        /* ── Reveal ── */
        .exp-reveal {
          opacity:0; transform:translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .exp-reveal.in { opacity:1; transform:translateY(0); }

        /* ── Card base ── */
        .exp-card {
          background: var(--bg-card);
          border: 1px solid var(--exp-chip-border);
          border-radius: 20px;
          padding: 22px;
          position: relative; overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: default;
          width: 100%;
          opacity: 0; transform: translateY(28px);
          transition:
            opacity 0.5s ease,
            transform 0.5s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .exp-card.in  { opacity:1; transform:translateY(0); }
        .exp-card:hover { transform:translateY(-5px) scale(1.012) !important; }

        /* ── Stats ── */
        .exp-stat-num {
          font-family:var(--font-display); font-size:1.3rem; font-weight:800;
          background:linear-gradient(135deg,#0284c7,#7c3aed);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .exp-stat-lbl {
          font-family:var(--font-body); font-size:10px;
          color:var(--text-muted); letter-spacing:0.08em; text-transform:uppercase;
        }

        /* ══════════════════════════════════════════════
           MOBILE default  (< 768px)
           Simple stacked list with left rail
        ══════════════════════════════════════════════ */
        .exp-layout-mobile {
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
        }
        /* Left rail line */
        .exp-layout-mobile::before {
          content:'';
          position:absolute; left:15px; top:0; bottom:0; width:1px;
          background:linear-gradient(
            to bottom,
            transparent 0%,
            rgba(2,132,199,0.4) 15%,
            rgba(124,58,237,0.5) 52%,
            rgba(219,39,119,0.35) 88%,
            transparent 100%
          );
          z-index:0;
        }
        .exp-mobile-row {
          display:flex; flex-direction:row;
          align-items:flex-start; gap:14px; position:relative; z-index:1;
        }
        .exp-mobile-dot {
          width:14px; height:14px; border-radius:50%; flex-shrink:0;
          margin-top:18px; border:2px solid rgba(255,255,255,0.2);
          position:relative; z-index:2;
        }
        .exp-mobile-card { flex:1; min-width:0; }

        /* HIDE desktop layout on mobile */
        .exp-layout-desktop { display:none; }

        /* ══════════════════════════════════════════════
           TABLET  768px–1023px
           Single column centered, wider cards
        ══════════════════════════════════════════════ */
        @media (min-width:768px) and (max-width:1023px) {
          .exp-layout-mobile  { display:none; }
          .exp-layout-desktop { display:none; }
          .exp-layout-tablet  {
            display:flex; flex-direction:column;
            align-items:center; gap:20px;
            position:relative;
          }
          /* center spine */
          .exp-layout-tablet::before {
            content:'';
            position:absolute; left:50%; transform:translateX(-50%);
            top:0; bottom:0; width:1px;
            background:linear-gradient(
              to bottom,
              transparent 0%,
              rgba(2,132,199,0.4) 10%,
              rgba(124,58,237,0.5) 50%,
              rgba(219,39,119,0.35) 90%,
              transparent 100%
            );
            z-index:0;
          }
          .exp-tablet-row {
            display:grid; grid-template-columns:40px 1fr;
            align-items:flex-start; gap:16px;
            width:100%; max-width:640px; position:relative; z-index:1;
          }
          .exp-tablet-node {
            display:flex; flex-direction:column; align-items:center; gap:4px;
            padding-top:14px;
          }
          .exp-tablet-dot {
            width:40px; height:40px; border-radius:50%;
            display:flex; align-items:center; justify-content:center;
            font-size:18px; position:relative; z-index:2;
          }
          .exp-tablet-card { flex:1; }
        }
        /* hide tablet layout on other breakpoints */
        @media (max-width:767px)  { .exp-layout-tablet { display:none; } }
        @media (min-width:1024px) { .exp-layout-tablet { display:none; } }

        /* ══════════════════════════════════════════════
           DESKTOP  >= 1024px
           Alternating left/right timeline
        ══════════════════════════════════════════════ */
        @media (min-width:1024px) {
          .exp-layout-mobile  { display:none; }
          .exp-layout-desktop {
            display:block; position:relative;
          }
          /* center spine */
          .exp-layout-desktop::before {
            content:'';
            position:absolute; left:50%; transform:translateX(-50%);
            top:0; bottom:0; width:1px;
            background:linear-gradient(
              to bottom,
              transparent 0%,
              rgba(2,132,199,0.4) 10%,
              rgba(124,58,237,0.5) 50%,
              rgba(219,39,119,0.35) 90%,
              transparent 100%
            );
            z-index:0;
          }
          .exp-desktop-row {
            display:grid;
            grid-template-columns:1fr 80px 1fr;
            align-items:flex-start;
            padding:0.75rem 0;
          }
          .exp-slot-l { display:flex; justify-content:flex-end; padding-right:2rem; }
          .exp-slot-r { display:flex; justify-content:flex-start; padding-left:2rem; }
          .exp-slot-m {
            display:flex; flex-direction:column; align-items:center;
            gap:4px; padding-top:14px; position:relative; z-index:2;
          }
          .exp-node {
            width:48px; height:48px; border-radius:50%;
            display:flex; align-items:center; justify-content:center;
            font-size:20px; cursor:default;
            transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
          }
          .exp-node:hover { transform:scale(1.15) rotate(10deg); }
          .exp-node-lbl {
            font-family:var(--font-display); font-size:9px;
            font-weight:700; letter-spacing:0.1em; opacity:0.55;
          }
        }

        /* orbs */
        .exp-orb {
          position:absolute; border-radius:50%;
          pointer-events:none; filter:blur(80px); z-index:0;
        }
      `}</style>

      <section id="experience" ref={ref} className="relative py-24 overflow-hidden grid-bg"
        style={{ background:"var(--bg-secondary)" }}>

        {/* Orbs */}
        <div className="exp-orb" style={{ width:460, height:460, top:"-80px", right:"-100px",
          background:"radial-gradient(circle,rgba(2,132,199,0.06),transparent 70%)" }}/>
        <div className="exp-orb" style={{ width:380, height:380, bottom:"-60px", left:"-80px",
          background:"radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%)" }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* ── Header ── */}
          <div className={`exp-reveal ${visible?"in":""} text-center mb-16`}>
            <div className="section-label justify-center mb-4">Work History</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(2rem,4vw,3rem)", color:"var(--text-primary)" }}>
              My{" "}
              <span style={{ background:"linear-gradient(135deg,#0284c7,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Experience
              </span>
            </h2>
            {/* Stats */}
            <div style={{ display:"flex", justifyContent:"center", gap:"2rem", flexWrap:"wrap", marginTop:"1.25rem" }}>
              {[{ n:"5+", l:"Apps Shipped" },{ n:"1+", l:"Years Flutter" },{ n:"3+", l:"Client Projects" }].map(({ n, l })=>(
                <div key={l} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                  <span className="exp-stat-num">{n}</span>
                  <span className="exp-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════
              MOBILE  (< 768px)
          ════════════════════════════ */}
          <div className="exp-layout-mobile">
            {EXP.map((exp, i) => (
              <div key={i} className="exp-mobile-row">
                <div className="exp-mobile-dot" style={{
                  background: exp.accent,
                  boxShadow: `0 0 10px ${exp.accent}80`,
                }}/>
                <div className="exp-mobile-card">
                  <ExpCard exp={exp} visible={visible} delay={0.06 + i * 0.1}/>
                </div>
              </div>
            ))}
          </div>

          {/* ════════════════════════════
              TABLET  (768px – 1023px)
          ════════════════════════════ */}
          <div className="exp-layout-tablet">
            {EXP.map((exp, i) => (
              <div key={i} className="exp-tablet-row">
                {/* Node */}
                <div className="exp-tablet-node">
                  <div className="exp-tablet-dot" style={{
                    background:`linear-gradient(135deg,${exp.accent}22,${exp.accent}0d)`,
                    border:`1.5px solid ${exp.accent}40`,
                    boxShadow:`0 0 0 5px ${exp.accent}12`,
                  }}>
                    {exp.icon}
                  </div>
                </div>
                {/* Card */}
                <div className="exp-tablet-card">
                  <ExpCard exp={exp} visible={visible} delay={0.06 + i * 0.1}/>
                </div>
              </div>
            ))}
          </div>

          {/* ════════════════════════════
              DESKTOP  (>= 1024px)
              Alternating left / right
          ════════════════════════════ */}
          <div className="exp-layout-desktop">
            {EXP.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="exp-desktop-row">
                  {/* Left slot */}
                  <div className="exp-slot-l">
                    {isLeft
                      ? <ExpCard exp={exp} visible={visible} delay={0.06 + i * 0.1}/>
                      : <div/>}
                  </div>

                  {/* Center node */}
                  <div className="exp-slot-m">
                    <span className="exp-node-lbl" style={{ color:exp.accent }}>{exp.index}</span>
                    <div className="exp-node" style={{
                      background:`linear-gradient(135deg,${exp.accent}22,${exp.accent}0d)`,
                      border:`1.5px solid ${exp.accent}40`,
                      boxShadow:`0 0 0 6px ${exp.accent}12, 0 0 24px ${exp.accent}20`,
                    }}>
                      {exp.icon}
                    </div>
                  </div>

                  {/* Right slot */}
                  <div className="exp-slot-r">
                    {!isLeft
                      ? <ExpCard exp={exp} visible={visible} delay={0.06 + i * 0.1}/>
                      : <div/>}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}