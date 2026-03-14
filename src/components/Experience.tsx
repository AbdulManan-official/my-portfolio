"use client";
import { useEffect, useRef, useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const EXP = [
  {
    role: "Flutter Developer", company: "Technosofts", location: "Sialkot, Pakistan",
    duration: "2025 – Present", period: "5 months & continuing", type: "Full-time", accent: "#63e4ff",
    desc: "Working as a Flutter developer on multiple production mobile apps, shipping high-quality apps across Islamic, VPN, and media categories.",
    highlights: ["Built Tasbeeh Max — Islamic companion app", "Developed VPN Max & Shield VPN apps", "Created Video to Audio Converter Max", "Writing clean, scalable Dart architecture"],
    icon: "🏢",
  },
  {
    role: "Mobile App Developer", company: "Freelance", location: "Remote",
    duration: "2025 – Present", period: "Ongoing", type: "Freelance", accent: "#a78bfa",
    desc: "Building custom Flutter apps for international clients alongside full-time work. End-to-end ownership from design to deployment.",
    highlights: ["Cross-platform apps for global clients", "End-to-end: concept → design → deployment", "Firebase, Supabase, Stripe integrations", "App Store & Play Store management"],
    icon: "🚀",
  },
  {
    role: "Flutter Developer (Learning & Building)", company: "Independent Projects", location: "Sialkot, Pakistan",
    duration: "2024 – 2025", period: "Foundation phase", type: "Self-Learning", accent: "#34d399",
    desc: "Started the Flutter journey building real apps while mastering Dart, Firebase, and mobile UI patterns.",
    highlights: ["Mastered Flutter & Dart fundamentals", "Built e-commerce and utility apps", "Firebase, Supabase, REST API integrations", "Figma UI/UX design & prototyping"],
    icon: "🌱",
  },
];

function TimelineDot({ exp }: { exp: typeof EXP[0] }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
      <div className="absolute inset-0 rounded-full opacity-20 animate-pulse"
        style={{ background: exp.accent, filter: "blur(6px)" }} />
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg z-10"
        style={{ background: `${exp.accent}22`, border: `1.5px solid ${exp.accent}50` }}>
        {exp.icon}
      </div>
    </div>
  );
}

function Card({ exp }: { exp: typeof EXP[0] }) {
  return (
    <div className="card-glass p-5 group relative overflow-hidden">
      {/* Type + period row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: `${exp.accent}20`, color: exp.accent, border: `1px solid ${exp.accent}35`, fontFamily: "var(--font-display)" }}>
          {exp.type}
        </span>
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{exp.period}</span>
      </div>

      {/* Role */}
      <h3 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
        {exp.role}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-3">
        {[
          { I: Briefcase, t: exp.company,  c: "var(--accent-cyan)" },
          { I: MapPin,    t: exp.location,  c: "var(--accent-violet)" },
          { I: Calendar,  t: exp.duration,  c: "var(--accent-pink)" },
        ].map(({ I, t, c }) => (
          <span key={t} className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
            <I size={10} style={{ color: c, flexShrink: 0 }} />{t}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{exp.desc}</p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accent }} />
            <span style={{ fontFamily: "var(--font-body)" }}>{h}</span>
          </li>
        ))}
      </ul>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${exp.accent}, transparent)` }} />
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="experience" className="py-24" style={{ background: "var(--bg-secondary)" }} />;

  return (
    <section id="experience" ref={ref} className="relative py-24 overflow-hidden grid-bg"
      style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(167,139,250,0.06),transparent)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(99,228,255,0.05),transparent)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <div className="section-label justify-center mb-4">Work History</div>
          <h2 className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            My <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* ── Alternating timeline ── */}
        <div className="relative">
          {/* Center vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet), transparent)" }} />
          {/* Left line — mobile */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet), transparent)" }} />

          <div className="space-y-12">
            {EXP.map((exp, i) => (
              <div key={i} className="relative"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `all 0.65s ease ${0.15 + i * 0.17}s` }}>

                {/* ── Mobile layout ── */}
                <div className="md:hidden flex gap-5">
                  <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 24, paddingTop: 2 }}>
                    <div className="w-4 h-4 rounded-full z-10"
                      style={{ background: exp.accent, boxShadow: `0 0 10px ${exp.accent}` }} />
                  </div>
                  <div className="flex-1"><Card exp={exp} /></div>
                </div>

                {/* ── Desktop alternating layout ── */}
                {i % 2 === 0 ? (
                  // Even → card LEFT, dot CENTER, empty RIGHT
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="flex justify-end pr-8"><div className="w-full max-w-sm"><Card exp={exp} /></div></div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                      <TimelineDot exp={exp} />
                    </div>
                    <div /> {/* empty right */}
                  </div>
                ) : (
                  // Odd → empty LEFT, dot CENTER, card RIGHT
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div /> {/* empty left */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                      <TimelineDot exp={exp} />
                    </div>
                    <div className="pl-8"><div className="w-full max-w-sm"><Card exp={exp} /></div></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}