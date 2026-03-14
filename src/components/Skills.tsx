"use client";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { label: "Mobile Development", accent: "#63e4ff",
    items: [{ name:"Flutter",level:95 },{ name:"Dart",level:93 },{ name:"State Management",level:90 },{ name:"App Deploy",level:87 }] },
  { label: "Backend & Database", accent: "#a78bfa",
    items: [{ name:"Firebase",level:90 },{ name:"Supabase",level:88 },{ name:"Firestore",level:88 },{ name:"REST APIs",level:85 }] },
  { label: "Design & Tools", accent: "#f472b6",
    items: [{ name:"UI/UX Design",level:90 },{ name:"Figma",level:82 },{ name:"Git & GitHub",level:88 },{ name:"App Architecture",level:87 }] },
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); setTimeout(() => setAnimate(true), 200); }
    }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="skills" className="py-24" style={{ background: "var(--bg-primary)" }} />;

  return (
    <section id="skills" ref={ref} className="relative py-24 overflow-hidden grid-bg" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,228,255,0.04), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.6s ease" }}>
          <div className="section-label justify-center mb-4">What I know</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </div>

        {/* Skill cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.label} className="card-glass p-6"
              style={{ opacity:visible?1:0, transform:visible?"none":"translateY(24px)", transition:`all 0.6s ease ${ci*0.1}s` }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.accent }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.accent, fontFamily:"var(--font-display)" }}>{cat.label}</span>
              </div>
              <div className="space-y-4">
                {cat.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color:"var(--text-secondary)", fontFamily:"var(--font-body)" }}>{skill.name}</span>
                      <span className="text-xs font-bold" style={{ color: cat.accent, fontFamily:"var(--font-display)" }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"var(--border-subtle)" }}>
                      <div className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                        style={{ width: animate ? `${skill.level}%` : "0%", background: `linear-gradient(90deg, ${cat.accent}99, ${cat.accent})`, transitionDelay:`${200+ci*100+si*60}ms` }}>
                        <div className="absolute inset-0" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)", animation:"shimmer 2s ease-in-out infinite", animationDelay:`${si*0.3}s` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div style={{ opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:"all 0.6s ease 0.4s" }}>
          <div className="section-label justify-center mb-6">Tech Stack</div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {BADGES.map((b, i) => (
              <div key={b}
                className="px-4 py-2 rounded-full text-sm cursor-default select-none transition-all duration-200"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: hovered===i ? "scale(1.08) translateY(-2px)" : "scale(1)",
                  background: hovered===i ? "#ffffff" : "var(--bg-glass)",
                  border: hovered===i ? "1px solid rgba(255,255,255,0.8)" : "1px solid var(--border-subtle)",
                  color: hovered===i ? "#000" : "var(--text-secondary)",
                  boxShadow: hovered===i ? "0 8px 24px rgba(255,255,255,0.15)" : "none",
                  fontFamily: "var(--font-body)",
                  transitionDelay: visible ? `${0.5+i*0.03}s` : "0s",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}