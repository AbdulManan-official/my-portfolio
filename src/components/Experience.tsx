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
    accent: "#0284c7", // Sky
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
    accent: "#7c3aed", // Purple
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
    accent: "#db2777", // Pink
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

function ExpCard({ exp, delay = 0 }: { exp: typeof EXP[0]; delay?: number; }) {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tc = TYPE_COLORS[exp.type] ?? TYPE_COLORS["Full-time"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`exp-card ${visible ? "in" : ""} ${hov ? "hov" : ""}`}
      style={{
        transitionDelay: visible ? `${delay}s` : "0s",
        borderColor: hov ? `${exp.accent}50` : undefined,
        boxShadow: hov ? `0 30px 60px -12px ${exp.accent}25, inset 0 1px 1px rgba(255,255,255,0.08)` : undefined,
        transform: visible ? (hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(40px) scale(0.95)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top accent glow */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${exp.accent}, transparent)`,
        opacity: hov ? 1 : 0, transition:"opacity 0.4s ease",
        boxShadow: hov ? `0 0 20px ${exp.accent}` : "none"
      }}/>

      {/* Watermark */}
      <div className="exp-wm" style={{
        position:"absolute", top:-10, right:10,
        fontFamily:"var(--font-display)", fontSize:"clamp(4rem, 10vw, 6rem)",
        fontWeight:800, lineHeight:1,
        pointerEvents:"none", userSelect:"none",
        transition:"color 0.4s, transform 0.4s",
        transform: hov ? "translate(-5px, 5px) scale(1.05)" : "none",
      }}>{exp.index}</div>

      {/* Badge + period */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:18, position: "relative", zIndex: 10 }}>
        <span style={{
          fontSize:11, fontWeight:700, letterSpacing:"0.12em",
          textTransform:"uppercase", fontFamily:"var(--font-display)",
          padding:"4px 12px", borderRadius:100,
          background:tc.bg, border:`1px solid ${tc.border}`, color:tc.text,
        }}>{exp.type}</span>
        <span style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontFamily:"var(--font-body)", color:"var(--text-muted)", fontWeight: 500 }}>
          <Calendar size={12} strokeWidth={2} style={{ color: exp.accent }}/>
          {exp.period}
        </span>
      </div>

      {/* Icon + role */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:16, position: "relative", zIndex: 10 }}>
        <div style={{
          width:52, height:52, borderRadius:16, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:24,
          background:`linear-gradient(135deg,${exp.accent}20,${exp.accent}05)`,
          border:`1px solid ${exp.accent}40`,
          boxShadow: hov ? `0 0 20px ${exp.accent}30` : "none",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
          transform: hov ? "scale(1.1) rotate(-5deg)" : "none"
        }}>{exp.icon}</div>
        <div style={{ paddingTop: 2 }}>
          <h3 style={{
            fontFamily:"var(--font-display)", fontWeight:700, fontSize:17,
            margin:"0 0 4px", lineHeight:1.3, letterSpacing:"-0.01em",
            transition:"color 0.3s",
            color: hov ? exp.accent : "var(--exp-role-color)",
          }}>{exp.role}</h3>
          <div style={{ fontFamily:"var(--font-body)", fontSize:13, fontWeight:600, color:"var(--text-secondary)" }}>
            {exp.company}
          </div>
        </div>
      </div>

      {/* Meta chips */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:18, position: "relative", zIndex: 10 }}>
        {[
          { Icon: MapPin,    text: exp.location },
          { Icon: Briefcase, text: exp.duration  },
        ].map(({ Icon, text }) => (
          <span key={text} style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontSize:12, fontFamily:"var(--font-body)", color:"var(--text-muted)", fontWeight: 500,
            background:"var(--exp-chip-bg)",
            border:"1px solid var(--exp-chip-border)",
            padding:"4px 12px", borderRadius:100,
            transition: "background 0.3s ease",
          }}>
            <Icon size={12} strokeWidth={2.5} style={{ color:exp.accent }}/>
            {text}
          </span>
        ))}
      </div>

      {/* Desc */}
      <p style={{
        fontFamily:"var(--font-body)", fontSize:14, lineHeight:1.7,
        color: hov ? "var(--text-primary)" : "var(--text-secondary)",
        marginBottom:18, paddingLeft:14,
        borderLeft:`2px solid ${hov ? exp.accent : "var(--exp-border-left)"}`,
        transition:"color 0.3s, border-color 0.3s",
        position: "relative", zIndex: 10
      }}>{exp.desc}</p>

      {/* Highlights */}
      <ul style={{ listStyle:"none", padding:0, margin:"0 0 20px", display:"flex", flexDirection:"column", gap:10, position: "relative", zIndex: 10 }}>
        {exp.highlights.map((h,i) => (
          <li key={i} style={{
            display:"flex", alignItems:"flex-start", gap:8,
            fontSize:13, fontFamily:"var(--font-body)", lineHeight:1.5,
            color: hov ? "var(--text-secondary)" : "var(--text-muted)",
            transition:"color 0.25s",
          }}>
            <CheckCircle2 size={16} strokeWidth={2.5} style={{ color:exp.accent, flexShrink:0, marginTop:1 }}/>
            {h}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        paddingTop:16,
        borderTop:`1px solid ${hov ? exp.accent+"30" : "var(--exp-divider)"}`,
        transition:"border-color 0.3s",
        position: "relative", zIndex: 10
      }}>
        <span style={{
          fontFamily:"var(--font-display)", fontSize:12, fontWeight:700,
          letterSpacing:"0.15em", opacity: hov ? 1 : 0.6, color:exp.accent,
          transition: "opacity 0.3s"
        }}>READ MORE</span>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: hov ? exp.accent : "var(--exp-chip-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s ease",
          transform: hov ? "rotate(45deg)" : "none"
        }}>
          <ArrowUpRight size={16} style={{
            color: hov ? "#fff" : "var(--exp-arrow)",
            transition:"color 0.25s",
          }}/>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Scroll Motion tracking
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const center = windowHeight / 2;
      let p = (center - top) / height;
      p = Math.max(0, Math.min(1, p));
      
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) return <section id="experience" style={{ background:"var(--bg-secondary)", minHeight: "100vh" }}/>;

  return (
    <>
      <style>{`
        /* ── CSS tokens per theme ─────────────────────── */
        :root {
          --exp-role-color:   #0f172a;
          --exp-chip-bg:      rgba(15,23,42,0.03);
          --exp-chip-border:  rgba(15,23,42,0.06);
          --exp-divider:      rgba(15,23,42,0.08);
          --exp-border-left:  rgba(15,23,42,0.1);
          --exp-arrow:        rgba(15,23,42,0.4);
        }
        [data-theme="dark"] {
          --exp-role-color:   #f8fafc;
          --exp-chip-bg:      rgba(255,255,255,0.03);
          --exp-chip-border:  rgba(255,255,255,0.08);
          --exp-divider:      rgba(255,255,255,0.08);
          --exp-border-left:  rgba(255,255,255,0.15);
          --exp-arrow:        rgba(255,255,255,0.4);
        }

        /* ── Watermark per theme ── */
        .exp-wm { color: rgba(15,23,42,0.03); }
        [data-theme="dark"] .exp-wm { color: rgba(255,255,255,0.03); }

        /* ── Card base ── */
        .exp-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 20px; /* Reduced padding for mobile by default */
          position: relative; overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          cursor: default;
          width: 100%;
          opacity: 0; 
          transition:
            opacity 0.6s ease,
            transform 0.6s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }
        .exp-card.in  { opacity: 1; }
        @media (min-width: 640px) {
          .exp-card { padding: 28px; } /* Larger padding for bigger screens */
        }

        /* ── Timeline Common Styles ── */
        .timeline-spine-bg {
          position: absolute; top: 0; bottom: 0; width: 2px;
          background: var(--border-subtle);
          z-index: 0;
          height: 100%;
        }
        .timeline-spine-active {
          position: absolute; top: 0; width: 2px;
          background: linear-gradient(to bottom, #0284c7, #7c3aed, #db2777);
          z-index: 1;
          transition: height 0.1s ease-out;
          box-shadow: 0 0 10px rgba(124,58,237,0.5);
        }

        /* ── Strict Layout Breakpoints ── */
        
        /* 1. MOBILE (Base up to 767px) */
        .exp-layout-mobile {
          display: flex; flex-direction: column; gap: 24px; position: relative;
        }
        .exp-layout-tablet { display: none; }
        .exp-layout-desktop { display: none; }
        
        /* Center the line inside the left column */
        .exp-layout-mobile .timeline-spine-bg,
        .exp-layout-mobile .timeline-spine-active { left: 7px; } 
        
        .exp-mobile-row { display:flex; align-items:flex-start; gap:16px; position:relative; z-index:2; }
        .exp-mobile-dot {
          width:16px; height:16px; border-radius:50%; flex-shrink:0; margin-top:32px;
          border: 3px solid var(--bg-secondary); position:relative; z-index:3;
          transition: all 0.3s ease;
        }

        /* 2. TABLET (768px–1023px) */
        @media (min-width:768px) and (max-width:1023px) {
          .exp-layout-mobile  { display:none; }
          .exp-layout-tablet  {
            display:flex; flex-direction:column; align-items:center; gap:32px; position:relative;
          }
          .exp-layout-desktop { display:none; }
          
          .exp-layout-tablet .timeline-spine-bg,
          .exp-layout-tablet .timeline-spine-active { left: 50%; transform: translateX(-50%); }
          
          .exp-tablet-row {
            display:grid; grid-template-columns:48px 1fr; align-items:flex-start; gap:24px;
            width:100%; max-width:640px; position:relative; z-index:2;
          }
          .exp-tablet-node { display:flex; flex-direction:column; align-items:center; gap:4px; padding-top:20px; }
          .exp-tablet-dot {
            width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center;
            font-size:20px; position:relative; z-index:3;
          }
          .exp-tablet-card { flex:1; }
        }

        /* 3. DESKTOP (>= 1024px) */
        @media (min-width:1024px) {
          .exp-layout-mobile  { display:none; }
          .exp-layout-tablet  { display:none; }
          .exp-layout-desktop { display:block; position:relative; padding: 2rem 0; }
          
          .exp-layout-desktop .timeline-spine-bg,
          .exp-layout-desktop .timeline-spine-active { left: 50%; transform: translateX(-50%); }
          
          .exp-desktop-row {
            display:grid; grid-template-columns:1fr 100px 1fr; align-items:center; margin-bottom: 2rem;
          }
          .exp-slot-l { display:flex; justify-content:flex-end; padding-right:3rem; }
          .exp-slot-r { display:flex; justify-content:flex-start; padding-left:3rem; }
          .exp-slot-m {
            display:flex; flex-direction:column; align-items:center; gap:8px; position:relative; z-index:3;
          }
          .exp-node {
            width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center;
            font-size:24px; cursor:default;
            transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
          }
          .exp-node:hover { transform:scale(1.15) rotate(10deg); }
          .exp-node-lbl {
            font-family:var(--font-display); font-size:11px; font-weight:800; letter-spacing:0.15em; opacity:0.8;
          }
        }

        /* Background Parallax Orbs */
        .exp-orb {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(100px); z-index:0;
          transition: transform 0.1s linear;
        }
      `}</style>

      <section id="experience" ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden grid-bg"
        style={{ background:"var(--bg-secondary)" }}>

        {/* Ambient Parallax Orbs tied to Scroll */}
        <div className="exp-orb hidden md:block" style={{ 
          width:500, height:500, top: "10%", right: "-10%",
          background:"radial-gradient(circle,rgba(2,132,199,0.08),transparent 70%)",
          transform: `translateY(${scrollY * 0.15}px)`
        }}/>
        <div className="exp-orb hidden md:block" style={{ 
          width:400, height:400, bottom: "20%", left: "-5%",
          background:"radial-gradient(circle,rgba(124,58,237,0.08),transparent 70%)",
          transform: `translateY(${scrollY * -0.1}px)`
        }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* ── Header ── */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="section-label justify-center mb-4">Work History</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(2.2rem,5vw,3.5rem)", color:"var(--text-primary)" }}>
              My{" "}
              <span style={{ background:"linear-gradient(135deg,#0284c7,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Experience
              </span>
            </h2>
          </div>

          {/* ════════════════════════════
              MOBILE  (< 768px)
          ════════════════════════════ */}
          <div className="exp-layout-mobile">
            {/* Dynamic Scroll Spine */}
            <div className="timeline-spine-bg" />
            <div className="timeline-spine-active" style={{ height: `${scrollProgress * 100}%` }} />

            {EXP.map((exp, i) => {
              const isActive = scrollProgress > (i / EXP.length) * 0.8;
              return (
                <div key={i} className="exp-mobile-row">
                  <div className="exp-mobile-dot" style={{
                    background: isActive ? exp.accent : "var(--border-subtle)",
                    boxShadow: isActive ? `0 0 15px ${exp.accent}80` : "none",
                  }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <ExpCard exp={exp} delay={0.1}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ════════════════════════════
              TABLET  (768px – 1023px)
          ════════════════════════════ */}
          <div className="exp-layout-tablet">
            {/* Dynamic Scroll Spine */}
            <div className="timeline-spine-bg" />
            <div className="timeline-spine-active" style={{ height: `${scrollProgress * 100}%` }} />

            {EXP.map((exp, i) => {
              const isActive = scrollProgress > (i / EXP.length) * 0.8;
              return (
                <div key={i} className="exp-tablet-row">
                  <div className="exp-tablet-node">
                    <div className="exp-tablet-dot" style={{
                      background: isActive ? `linear-gradient(135deg,${exp.accent}30,${exp.accent}10)` : "var(--bg-card)",
                      border:`2px solid ${isActive ? exp.accent : "var(--border-subtle)"}`,
                      boxShadow: isActive ? `0 0 0 6px ${exp.accent}15, 0 0 20px ${exp.accent}40` : "none",
                      transition: "all 0.4s ease"
                    }}>
                      <span style={{ opacity: isActive ? 1 : 0.3, transition: "opacity 0.4s" }}>{exp.icon}</span>
                    </div>
                  </div>
                  <div className="exp-tablet-card">
                    <ExpCard exp={exp} delay={0.1}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ════════════════════════════
              DESKTOP  (>= 1024px)
          ════════════════════════════ */}
          <div className="exp-layout-desktop">
            {/* Dynamic Scroll Spine */}
            <div className="timeline-spine-bg" />
            <div className="timeline-spine-active" style={{ height: `${scrollProgress * 100}%` }} />

            {EXP.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isActive = scrollProgress > (i / EXP.length) * 0.75;

              return (
                <div key={i} className="exp-desktop-row">
                  {/* Left slot */}
                  <div className="exp-slot-l">
                    {isLeft && <ExpCard exp={exp} delay={0.1}/>}
                  </div>

                  {/* Center node */}
                  <div className="exp-slot-m">
                    <span className="exp-node-lbl" style={{ 
                      color: isActive ? exp.accent : "var(--text-muted)",
                      transition: "color 0.4s ease"
                    }}>{exp.index}</span>
                    
                    <div className="exp-node" style={{
                      background: isActive ? `linear-gradient(135deg,${exp.accent}25,${exp.accent}0a)` : "var(--bg-card)",
                      border:`2px solid ${isActive ? exp.accent : "var(--border-subtle)"}`,
                      boxShadow: isActive ? `0 0 0 8px ${exp.accent}12, 0 0 30px ${exp.accent}30` : "none",
                      transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)"
                    }}>
                      <span style={{ 
                        opacity: isActive ? 1 : 0.2, 
                        filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                        transition: "all 0.5s ease" 
                      }}>{exp.icon}</span>
                    </div>
                  </div>

                  {/* Right slot */}
                  <div className="exp-slot-r">
                    {!isLeft && <ExpCard exp={exp} delay={0.1}/>}
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