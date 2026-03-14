"use client";
import { useEffect, useState, useMemo } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const STATS = [
  { value: "50+",  label: "Apps Shipped" },
  { value: "2+",   label: "Years Exp." },
  { value: "100%", label: "Satisfaction" },
];

const SOCIALS = [
  { Icon: Github,   href: "https://github.com/AbdulManan-official",               label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/abdul-manan-a96351254/",   label: "LinkedIn" },
  { Icon: Phone,    href: "https://wa.me/923195542740",                            label: "WhatsApp" },
  { Icon: Mail,     href: "mailto:abdullmananan7777@gmail.com", isEmail: true,      label: "Email" },
];

const APP_SCREENS = [
  { label: "Tasbeeh Max",  sub: "Islamic Companion", top: "#6366f1", bot: "#9333ea" },
  { label: "VPN Max",      sub: "Secure & Fast",     top: "#3b82f6", bot: "#06b6d4" },
  { label: "MedicineTime", sub: "Health & Care",     top: "#10b981", bot: "#0d9488" },
];

function HeroPhone({ screen }: { screen: typeof APP_SCREENS[0] }) {
  return (
    <div className="relative" style={{ width: 230, height: 460 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 65%, ${screen.top}50, transparent 70%)`, filter: "blur(28px)", transform: "scale(1.25)" }} />

      {/* Frame */}
      <div className="absolute inset-0 rounded-[44px] overflow-hidden"
        style={{ background: "linear-gradient(145deg,#272a38,#161926,#1d2035)", boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.09), 0 0 55px ${screen.top}28` }}>

        {/* Screen */}
        <div className="absolute top-3 inset-x-3 bottom-3 rounded-[40px] overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${screen.top}, ${screen.bot})` }}>
          {/* shine */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.13) 0%,transparent 50%)" }} />
          {/* pill notch */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.42)", backdropFilter: "blur(8px)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: screen.top }} />
            <div className="w-11 h-1.5 rounded-full bg-white/20" />
          </div>
          {/* UI */}
          <div className="absolute inset-0 pt-11 px-4 pb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />)}</div>
            </div>
            <div className="space-y-1.5 mt-1">
              <div className="h-2 bg-white/25 rounded-full w-3/4" />
              <div className="h-1.5 bg-white/15 rounded-full w-1/2" />
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1 mt-1">
              {[0,1,2,3].map(i => <div key={i} className="bg-white/10 rounded-2xl" />)}
            </div>
            <div className="text-center text-white/90 text-xs font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}>{screen.label}</div>
            <div className="w-12 h-1 rounded-full bg-white/30 mx-auto" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -right-0.5 top-24 w-[3px] h-10 rounded-r-sm" style={{ background: "rgba(255,255,255,0.14)" }} />
        <div className="absolute -left-0.5 top-20 w-[3px] h-6 rounded-l-sm" style={{ background: "rgba(255,255,255,0.11)" }} />
        <div className="absolute -left-0.5 top-32 w-[3px] h-6 rounded-l-sm" style={{ background: "rgba(255,255,255,0.11)" }} />
        {/* reflection */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,transparent 40%)", borderRadius: "inherit" }} />
      </div>

      {/* Floating pills */}
      {[
        { text: "Flutter",  sub: "Expert",   pos: "-left-16 top-16",   accent: "#63e4ff", delay: "0s" },
        { text: "Firebase", sub: "Backend",  pos: "-right-14 top-36",  accent: "#a78bfa", delay: "1s" },
        { text: "50+ Apps", sub: "Shipped",  pos: "-left-12 bottom-24",accent: "#34d399", delay: "0.5s" },
      ].map(p => (
        <div key={p.text} className={`absolute ${p.pos} px-3 py-2 rounded-xl text-center`}
          style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}38`, backdropFilter: "blur(10px)", animation: `float 4s ease-in-out ${p.delay} infinite` }}>
          <div className="text-xs font-bold" style={{ color: p.accent, fontFamily: "var(--font-display)" }}>{p.text}</div>
          <div className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>{p.sub}</div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [screen,  setScreen]  = useState(0);
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });

  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top:  Math.random() * 100,
      delay: Math.random() * 4,
      dur:   3 + Math.random() * 3,
    })), []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setScreen(s => (s+1) % APP_SCREENS.length), 3500);
    return () => clearInterval(t);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const fn = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 12,
      y: (e.clientY / window.innerHeight - 0.5) * 12,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  if (!mounted) return <section id="home" className="min-h-screen" style={{ background: "var(--bg-primary)" }} />;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      style={{ background: "var(--bg-primary)", paddingTop: 80 }}>

      {/* Ambient orbs */}
      {[
        { w:580, h:580, t:"-18%", l:"-12%", c:"rgba(99,228,255,0.055)",  d:"12s" },
        { w:480, h:480, b:"-18%", r:"-8%",  c:"rgba(167,139,250,0.065)", d:"10s" },
        { w:280, h:280, t:"42%",  l:"32%",  c:"rgba(52,211,153,0.035)",  d:"14s" },
      ].map((o, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:o.w, height:o.h, top:o.t, left:o.l, bottom:(o as any).b, right:(o as any).r,
            background:`radial-gradient(circle, ${o.c}, transparent)`, filter:"blur(70px)", animation:`floatSlow ${o.d} ease-in-out infinite`, animationDelay:`${i*3}s` }} />
      ))}

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none"
          style={{ left:`${p.left}%`, top:`${p.top}%`, width:1.5, height:1.5, background:"var(--accent-cyan)", opacity:0.35,
            animation:`glow-pulse ${p.dur}s ease-in-out infinite`, animationDelay:`${p.delay}s` }} />
      ))}

      {/* Geometric SVG shapes */}
      <div className="absolute top-28 right-16 opacity-[0.08] pointer-events-none" style={{ animation:"rotate-slow 22s linear infinite" }}>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <polygon points="55,6 105,85 5,85" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none"/>
          <polygon points="55,22 92,78 18,78" stroke="var(--accent-violet)" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>
      <div className="absolute bottom-20 left-14 opacity-[0.07] pointer-events-none" style={{ animation:"rotate-slow 28s linear infinite reverse" }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <rect x="8" y="8" width="56" height="56" rx="3" stroke="var(--accent-violet)" strokeWidth="1.5" fill="none" transform="rotate(45 36 36)"/>
          <rect x="20" y="20" width="32" height="32" rx="2" stroke="var(--accent-cyan)" strokeWidth="0.8" fill="none" transform="rotate(45 36 36)"/>
        </svg>
      </div>
      <div className="absolute top-1/2 right-[4%] opacity-[0.07] pointer-events-none -translate-y-1/2" style={{ animation:"rotate-slow 34s linear infinite" }}>
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
          <circle cx="27" cy="27" r="22" stroke="var(--accent-green)" strokeWidth="0.8" strokeDasharray="3.5 3.5" fill="none"/>
          <circle cx="27" cy="27" r="13" stroke="var(--accent-green)" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            {/* Availability */}
            <div className="section-label mb-5" style={{ animation: "fadeUp 0.6s ease-out 0.1s both" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)", animation: "glow-pulse 2s ease-in-out infinite" }} />
              Available for Projects
            </div>

            {/* Heading */}
            <div style={{ animation: "fadeUp 0.7s ease-out 0.2s both" }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                Flutter Developer & Mobile Craftsman
              </p>
              <h1 className="text-5xl md:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                Abdul Manan
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-gradient"
                style={{ fontFamily: "var(--font-display)" }}>
                I Build Apps People<br/>Actually Love Using.
              </h2>
            </div>

            {/* Bio */}
            <p className="mt-5 text-[15px] leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", animation: "fadeUp 0.7s ease-out 0.4s both" }}>
              I turn complex ideas into clean, high-performance mobile apps — specializing in Flutter with Firebase & Supabase backends. From concept to App Store, I own the full journey.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-7" style={{ animation: "fadeUp 0.7s ease-out 0.5s both" }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-gradient" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-7" style={{ animation: "fadeUp 0.7s ease-out 0.6s both" }}>
              <a href="#projects" className="btn-primary px-7 py-3 text-sm gap-2">
                View My Work
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#about" className="btn-outline px-7 py-3 text-sm">About Me</a>
            </div>

            {/* Social links — with bottom spacing so content below isn't cramped */}
            <div className="flex gap-2.5 mt-6 mb-10 md:mb-0" style={{ animation: "fadeUp 0.7s ease-out 0.75s both" }}>
              {SOCIALS.map(({ Icon, href, isEmail, label }) => (
                <a key={label} href={href}
                  target={!isEmail ? "_blank" : undefined}
                  rel={!isEmail ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-250 hover:scale-110 hover:-translate-y-0.5"
                  style={{ background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", textDecoration: "none" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-glow)";
                    el.style.color = "var(--accent-cyan)";
                    el.style.background = "var(--bg-glass-hover)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-subtle)";
                    el.style.color = "var(--text-secondary)";
                    el.style.background = "var(--bg-glass)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — phone */}
          <div className="flex items-center justify-center" style={{ animation: "scaleIn 1s ease-out 0.4s both" }}>
            <div style={{
              transform: `rotateY(${mouse.x * 0.38}deg) rotateX(${-mouse.y * 0.38}deg)`,
              transition: "transform 0.5s ease-out",
              perspective: "1000px",
            }}>
              <HeroPhone screen={APP_SCREENS[screen]} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ animation: "fadeUp 1s ease-out 1.4s both" }}>
        <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>scroll</span>
        <div className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
          style={{ borderColor: "var(--border-glow)" }}>
          <div className="w-0.5 h-2 rounded-full" style={{ background: "var(--accent-cyan)", animation: "bounce-dot 1.6s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}