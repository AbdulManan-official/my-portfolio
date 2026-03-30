"use client";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone as PhoneIcon, ArrowRight } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const STATS = [
  { v: "50+",  label: "Apps Shipped" },
  { v: "2+",   label: "Years Exp."   },
  { v: "100%", label: "Satisfaction" },
];

const SOCIALS = [
  { Icon: Github,    href: "https://github.com/AbdulManan-official",             label: "GitHub"   },
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/abdul-manan-a96351254/", label: "LinkedIn" },
  { Icon: PhoneIcon, href: "https://wa.me/923195542740",                          label: "WhatsApp" },
  { Icon: Mail,      href: "mailto:abdullmananan7777@gmail.com", isEmail: true,   label: "Email"    },
];

const SCREENS = [
  { label: "Abdul Manan", accent: "#0284c7", image: "/images/my1.png", fit: "cover", pos: "center center", isSplash: true  },
];

const JOURNEY = [
  { icon: "💡", label: "Idea",   color: "#f59e0b" },
  { icon: "🎨", label: "Design", color: "#ec4899" },
  { icon: "⚙️", label: "Build",  color: "#0284c7" },
  { icon: "🚀", label: "Launch", color: "#7c3aed" },
];

/* ─── Splash Overlay ────────────────────────────────────────────────── */
function SplashOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 55%, rgba(0,8,24,0.95) 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end",
      padding: "0 18px 32px",
      pointerEvents: "none",
    }}>
      <div style={{ width: 56, height: 3, borderRadius: 2, background: "linear-gradient(90deg, transparent, #0284c7, transparent)", marginBottom: 12, opacity: 0.8 }} />
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff", textAlign: "center", lineHeight: 1.2, textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>Abdul Manan</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#38bdf8", marginTop: 5, textShadow: "0 0 12px rgba(2,132,199,0.6)" }}>Flutter Developer</div>
    </div>
  );
}

/* ─── Phone Frame ───────────────────────────────────────────────────── */
function PhoneShowcase() {
  const curr = SCREENS[0];

  return (
    <div className="phone-outer" aria-label={`Showcase: ${curr.label}`}>
      <div className="phone-glow" style={{ background: curr.accent }} />
      <div className="phone-frame">
        <div className="btn-power" /><div className="btn-vol-up" /><div className="btn-vol-dn" />
        <div className="phone-screen-wrap">
          <div className="dynamic-island">
            <div className="island-dot" style={{ background: curr.accent }} />
          </div>
          <div className="screen-viewport">
            <div className="screen-img screen-idle">
              <img src={curr.image} alt={curr.label} style={{ objectFit: curr.fit as any, objectPosition: curr.pos }} />
              {curr.isSplash && <SplashOverlay />}
            </div>
          </div>
          <div className="home-bar" />
        </div>
      </div>

      {/* Phone App Label */}
      <div className="phone-label-box">
        <div className="phone-label-dot" style={{ background: curr.accent, boxShadow: `0 0 10px ${curr.accent}` }} />
        <span>{curr.label}</span>
      </div>
    </div>
  );
}

/* ─── Styles Component ──────────────────────────────────────────────── */
function HeroStyles() {
  return (
    <style>{`
      /* ─── Theme Variables ─── */
      :root {
        --hero-glass-bg: rgba(15, 23, 42, 0.04);
        --hero-glass-border: rgba(15, 23, 42, 0.08);
        --hero-glass-hover: rgba(15, 23, 42, 0.08);
        --hero-text-primary: #0f172a;
        --hero-text-secondary: #475569;
        --hero-text-muted: #64748b;
        
        /* Specifically darker borders for journey in light mode */
        --journey-border: rgba(15, 23, 42, 0.25); 
      }
      [data-theme="dark"] {
        --hero-glass-bg: rgba(255, 255, 255, 0.03);
        --hero-glass-border: rgba(255, 255, 255, 0.1);
        --hero-glass-hover: rgba(255, 255, 255, 0.08);
        --hero-text-primary: #ffffff;
        --hero-text-secondary: rgba(255, 255, 255, 0.75);
        --hero-text-muted: rgba(255, 255, 255, 0.5);
        
        /* Subtle/bright borders for journey in dark mode */
        --journey-border: rgba(255, 255, 255, 0.15); 
      }

      /* ─── Phone Mockup ─── */
      .phone-outer { position: relative; width: 270px; display: flex; flex-direction: column; align-items: center; gap: 16px; z-index: 10; }
      .phone-glow  { position: absolute; width: 200px; height: 320px; top: 60px; left: 50%; transform: translateX(-50%); border-radius: 50%; filter: blur(70px); opacity: 0.4; pointer-events: none; transition: background 0.7s ease; }
      .phone-frame { position: relative; width: 270px; height: 550px; border-radius: 46px; background: linear-gradient(145deg, #1e2029, #0a0b10); box-shadow: 0 0 0 1.5px rgba(255,255,255,0.1), inset 0 2px 4px rgba(255,255,255,0.2), 0 30px 60px rgba(0,0,0,0.5); }
      .btn-power  { position: absolute; right: -3px; top: 110px; width: 3px; height: 60px; border-radius: 0 3px 3px 0; background: #333; }
      .btn-vol-up { position: absolute; left: -3px; top: 90px;  width: 3px; height: 35px; border-radius: 3px 0 0 3px; background: #333; }
      .btn-vol-dn { position: absolute; left: -3px; top: 135px; width: 3px; height: 35px; border-radius: 3px 0 0 3px; background: #333; }
      
      .phone-screen-wrap { position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; border-radius: 36px; overflow: hidden; background: #000; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
      .dynamic-island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); z-index: 30; display: flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 20px; background: #000; box-shadow: 0 2px 10px rgba(0,0,0,0.5); }
      .island-dot { width: 6px; height: 6px; border-radius: 50%; transition: background 0.4s; }
      .home-bar { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 40%; height: 4px; border-radius: 4px; background: rgba(255,255,255,0.4); z-index: 25; }
      
      .screen-viewport { position: absolute; inset: 0; background: #0a0a0a; }
      .screen-img { position: absolute; inset: 0; width: 100%; height: 100%; }
      .screen-img img { width: 100%; height: 100%; display: block; }
      
      .phone-label-box { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--hero-text-primary); }
      .phone-label-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.4s; }

      /* ─── Hero Content Left ─── */
      .hero-content { display: flex; flex-direction: column; gap: 24px; z-index: 10; position: relative; }
      
      .role-badge { display: inline-flex; align-items: center; gap: 10px; padding: 6px 16px 6px 6px; border-radius: 100px; background: var(--hero-glass-bg); border: 1px solid var(--hero-glass-border); backdrop-filter: blur(10px); }
      .role-dot   { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #7c3aed); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); }
      .role-text  { font-family: var(--font-display); font-size: 11.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--hero-text-primary); }
      
      .hero-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; color: var(--hero-text-primary); margin: 0; }
      .hero-subtitle { font-family: var(--font-display); font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 700; line-height: 1.2; color: var(--hero-text-primary); margin: 8px 0 0 0; }
      .text-gradient { background: linear-gradient(135deg, #0284c7 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      
      .hero-bio { font-family: var(--font-body); font-size: clamp(15px, 1.5vw, 17px); line-height: 1.7; color: var(--hero-text-secondary); max-width: 520px; margin: 0; }
      .hero-bio strong { color: var(--hero-text-primary); font-weight: 600; }
      
      /* Journey Timeline */
      .journey-track { display: flex; align-items: center; justify-content: flex-start; gap: 8px; width: 100%; max-width: 480px; }
      .journey-node { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; }
      
      /* Darker borders for journey rings */
      .journey-ring { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; background: var(--hero-glass-bg); border: 1.5px solid var(--journey-border); transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      .journey-ring:hover { transform: scale(1.15) translateY(-4px); }
      .journey-label { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
      
      /* Darker journey connecting lines */
      .journey-line  { flex-grow: 1; height: 2px; background: var(--journey-border); border-radius: 2px; position: relative; top: -10px; }
      
      /* Stats Grid */
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 500px; }
      .stat-card  { display: flex; flex-direction: column; justify-content: center; padding: 16px; border-radius: 20px; background: var(--hero-glass-bg); border: 1px solid var(--hero-glass-border); backdrop-filter: blur(10px); transition: all 0.3s ease; }
      .stat-card:hover { transform: translateY(-4px); border-color: rgba(2, 132, 199, 0.4); box-shadow: 0 10px 30px rgba(2, 132, 199, 0.1); }
      .stat-value { font-family: var(--font-display); font-weight: 800; font-size: clamp(1.4rem, 2vw, 1.8rem); line-height: 1; margin-bottom: 4px; background: linear-gradient(135deg, #0284c7, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .stat-label { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--hero-text-muted); }
      
      /* Buttons & Socials */
      .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #fff; background: linear-gradient(135deg, #0284c7, #7c3aed); border: none; border-radius: 14px; cursor: pointer; text-decoration: none; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3); transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      .btn-primary:hover  { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 25px rgba(2, 132, 199, 0.4); }
      
      .btn-outline { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--hero-text-primary); background: var(--hero-glass-bg); border: 1px solid var(--hero-glass-border); border-radius: 14px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
      .btn-outline:hover { background: var(--hero-glass-hover); border-color: var(--hero-text-primary); transform: translateY(-3px); }
      
      .hero-socials { display: flex; gap: 12px; flex-wrap: wrap; }
      .social-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--hero-glass-bg); border: 1px solid var(--hero-glass-border); color: var(--hero-text-secondary); text-decoration: none; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      .social-icon:hover { color: #0284c7; border-color: #0284c7; background: var(--hero-glass-hover); transform: translateY(-4px) scale(1.1); box-shadow: 0 8px 20px rgba(2, 132, 199, 0.2); }
      
      /* Utilities */
      .h-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .h-reveal.ready { opacity: 1; transform: translateY(0); }
      
      /* Mobile vs Desktop Layout Adjustments */
      @media (min-width: 1024px) {
        .mobile-phone-slot { display: none; }
        .desktop-phone-slot { display: flex; justify-content: center; align-items: center; }
        .hero-content { align-items: flex-start; text-align: left; }
      }
      @media (max-width: 1023px) {
        .desktop-phone-slot { display: none; }
        .mobile-phone-slot { display: flex; justify-content: center; padding-top: 20px; padding-bottom: 20px; }
        .hero-content { align-items: center; text-align: center; gap: 20px; }
        .hero-bio { text-align: center; }
        .journey-track { justify-content: center; }
        .hero-actions { width: 100%; flex-direction: column; gap: 12px; }
        .btn-primary, .btn-outline { width: 100%; }
        
        /* Centering socials explicitly for mobile */
        .hero-socials { justify-content: center; width: 100%; }
        
        /* Scale down phone slightly for mobile to save vertical space */
        .phone-outer { width: 220px; }
        .phone-frame { width: 220px; height: 450px; border-radius: 40px; }
        .phone-screen-wrap { border-radius: 30px; }
        .btn-power { top: 90px; height: 50px; }
        .btn-vol-up { top: 75px; height: 30px; }
        .btn-vol-dn { top: 115px; height: 30px; }
        .dynamic-island { padding: 5px 12px; }
        .island-dot { width: 5px; height: 5px; }
        
        /* Stats grid adjust */
        .stats-grid { gap: 8px; width: 100%; }
        .stat-card { padding: 12px 10px; align-items: center; }
      }

      /* Animations */
      @keyframes floatPhone { 0%,100% { transform: translateY(0px) rotateZ(0deg); } 50% { transform: translateY(-12px) rotateZ(0.8deg); } }
      .phone-float { animation: floatPhone 6s ease-in-out infinite; perspective: 1000px; }
      @keyframes scrollBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      .scroll-dot { width: 2px; height: 6px; border-radius: 2px; background: var(--hero-text-primary); animation: scrollBounce 2s infinite ease-in-out; }
    `}</style>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [mounted,   setMounted]   = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [mouse,     setMouse]     = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setHeroReady(true), 100);
  }, []);

  useEffect(() => {
    if (!mounted || window.innerWidth < 1024) return;
    const fn = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 15,
      y: (e.clientY / window.innerHeight - 0.5) * 15,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  if (!mounted) {
    return (
      <>
        <HeroStyles />
        <section id="home" style={{ minHeight: "100vh", background: "var(--bg-primary)" }} />
      </>
    );
  }

  return (
    <>
      <HeroStyles />

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden grid-bg"
        style={{ background: "var(--bg-primary)", paddingTop: 80, paddingBottom: 60 }}
      >
        {/* Ambient Glows */}
        <div className="absolute pointer-events-none" style={{ width: 600, height: 600, top: "-10%", left: "-10%", borderRadius: "50%", background: "radial-gradient(circle,rgba(2,132,199,0.06),transparent)", filter: "blur(80px)" }} />
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, bottom: "-10%", right: "-5%", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.06),transparent)", filter: "blur(80px)" }} />

        {/* MAIN CONTAINER */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">

          {/* MOBILE PHONE SLOT (Shows on top on small screens) */}
          <div className="mobile-phone-slot">
            <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.1s" }}>
              <PhoneShowcase />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ══ LEFT COLUMN ══ */}
            <div className="hero-content">

              {/* Badge */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.1s" }}>
                <div className="role-badge">
                  <div className="role-dot">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="role-text">Mobile & Web Developer</span>
                </div>
              </div>

              {/* Titles */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.2s" }}>
                <h1 className="hero-title">Abdul <span className="text-gradient">Manan</span></h1>
                <h2 className="hero-subtitle">From <span className="text-gradient">Idea to Play Store</span></h2>
              </div>

              {/* Journey Nodes */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.3s", width: "100%" }}>
                <div className="journey-track">
                  {JOURNEY.map((step, i) => (
                    <div key={step.label} style={{ display: "contents" }}>
                      <div className="journey-node">
                        <div
                          className="journey-ring"
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = step.color; el.style.boxShadow = `0 4px 15px ${step.color}40`; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ""; el.style.boxShadow = ""; }}
                        >
                          {step.icon}
                        </div>
                        <span className="journey-label" style={{ color: step.color }}>{step.label}</span>
                      </div>
                      {i < JOURNEY.length - 1 && <div className="journey-line" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.4s" }}>
                <p className="hero-bio">
                  I design and build <strong>Flutter</strong> apps with pixel-perfect UIs,
                  powered by <strong>Firebase & Supabase</strong> backends.
                  Whether it's your first MVP or a full product — I take it from
                  wireframes directly to the <strong>App Store</strong>.
                </p>
              </div>

              {/* Stats */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.5s", width: "100%" }}>
                <div className="stats-grid">
                  {STATS.map(s => (
                    <div key={s.label} className="stat-card">
                      <div className="stat-value">{s.v}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.6s", width: "100%" }}>
                <div className="hero-actions">
                  <a href="#projects" className="btn-primary">
                    View My Work
                    <ArrowRight size={18} />
                  </a>
                  <a href="#about" className="btn-outline">
                    About Me
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.7s", width: "100%" }}>
                <div className="hero-socials">
                  {SOCIALS.map(({ Icon, href, isEmail, label }) => (
                    <a key={label} href={href} target={!isEmail ? "_blank" : undefined} rel={!isEmail ? "noopener noreferrer" : undefined} aria-label={label} className="social-icon">
                      <Icon size={18} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>

            </div>{/* /LEFT */}

            {/* ══ RIGHT COLUMN — DESKTOP PHONE ══ */}
            <div className="desktop-phone-slot">
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.3s" }}>
                <div className="phone-float" style={{ transform: `rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`, transition: "transform 0.3s ease-out" }}>
                  <PhoneShowcase />
                </div>
              </div>
            </div>

          </div>{/* /grid */}
        </div>{/* /container */}

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" style={{ opacity: heroReady ? 1 : 0, transition: "opacity 1s ease 1s" }}>
          <div style={{ width: 20, height: 32, borderRadius: 12, border: "2px solid var(--hero-glass-border)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div className="scroll-dot" />
          </div>
        </div>

      </section>
    </>
  );
}