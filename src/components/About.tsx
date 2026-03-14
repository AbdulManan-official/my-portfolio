"use client";
import { useEffect, useRef, useState } from "react";
import { Code2, Smartphone, Globe, Zap } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Code2,      title: "50+ Apps Built",    desc: "Utility, wellness & social-good" },
  { icon: Smartphone, title: "iOS & Android",      desc: "True cross-platform expertise" },
  { icon: Globe,      title: "Global Clients",     desc: "Delivering remotely worldwide" },
  { icon: Zap,        title: "Full Ownership",     desc: "Concept → design → deployment" },
];

const TECHS = ["Flutter", "Dart", "Firebase", "Supabase"];

export default function About() {
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const fn = (e: MouseEvent) => setMouse({ x: (e.clientX/window.innerWidth-0.5)*8, y: (e.clientY/window.innerHeight-0.5)*8 });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  if (!mounted) return <section id="about" className="py-24" style={{ background: "var(--bg-primary)" }} />;

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden grid-bg" style={{ background: "var(--bg-secondary)" }}>
      {/* Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,228,255,0.05), transparent)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.05), transparent)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16" style={{ opacity: visible?1:0, transform: visible?"none":"translateY(24px)", transition: "all 0.7s ease" }}>
          <div className="section-label justify-center mb-4">The person behind the apps</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — 3D avatar orb */}
          <div style={{ opacity: visible?1:0, transform: visible?"none":"translateX(-32px)", transition: "all 0.8s ease 0.1s" }}>
            <div className="relative max-w-sm mx-auto aspect-square"
              style={{ transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`, transition: "transform 0.4s ease-out", perspective: "800px" }}>

              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full" style={{ border: "1px solid var(--border-glow)", animation: "rotate-slow 20s linear infinite" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{ background: "var(--accent-cyan)", boxShadow: "0 0 12px var(--accent-cyan)" }} />
              </div>
              <div className="absolute inset-4 rounded-full" style={{ border: "1px solid var(--border-subtle)", animation: "rotate-slow 15s linear infinite reverse" }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "var(--accent-violet)", boxShadow: "0 0 10px var(--accent-violet)" }} />
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,228,255,0.15), rgba(167,139,250,0.1), transparent)", filter: "blur(20px)" }} />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-main)", boxShadow: "0 0 60px rgba(99,228,255,0.3), 0 0 120px rgba(167,139,250,0.2)" }}>
                  <Code2 className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Floating tech badges */}
              {TECHS.map((t, i) => {
                const angles = [315, 45, 225, 135];
                const angle = (angles[i] * Math.PI) / 180;
                const r = 48;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <div key={t}
                    className="absolute px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: "translate(-50%,-50%)",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glow)",
                      color: "var(--accent-cyan)",
                      fontFamily: "var(--font-display)",
                      backdropFilter: "blur(12px)",
                      animation: `float ${3.5+i*0.4}s ease-in-out infinite`,
                      animationDelay: `${i*0.3}s`,
                    }}>{t}</div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Bio */}
          <div className="space-y-6" style={{ opacity: visible?1:0, transform: visible?"none":"translateX(32px)", transition: "all 0.8s ease 0.2s" }}>
            <div>
              <div className="section-label mb-3">Who I Am</div>
              <h3 className="text-2xl md:text-3xl font-bold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                A Flutter developer who cares about{" "}
                <span className="text-gradient">what gets built</span>, not just how.
              </h3>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
              <p>I&apos;m Abdul Manan — a Flutter developer based in Sialkot, Pakistan, currently working full-time at <strong style={{ color: "var(--text-primary)" }}>Technosofts</strong> while taking on freelance projects on the side. I&apos;ve shipped 50+ apps across utility, wellness, spiritual, and e-commerce categories.</p>
              <p>I don&apos;t just write code — I think about user experience, performance, and long-term maintainability. My stack is <strong style={{ color: "var(--text-primary)" }}>Flutter + Dart</strong> on the front, <strong style={{ color: "var(--text-primary)" }}>Firebase & Supabase</strong> on the back.</p>
              <p>When I&apos;m not building apps, I&apos;m planning the next one — currently expanding into a portfolio of SaaS products spanning health, productivity, and social good.</p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {HIGHLIGHTS.map((h, i) => (
                <div key={h.title} className="card-glass p-4 group cursor-default"
                  style={{ opacity: visible?1:0, transform: visible?"none":"scale(0.9)", transition: `all 0.5s ease ${0.4+i*0.08}s` }}>
                  <h.icon className="w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "var(--accent-cyan)" }} />
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{h.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}