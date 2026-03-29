"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV = [
  { name: "Home",         href: "#home" },
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Experience",   href: "#experience" },
  { name: "Services",     href: "#services" },
  { name: "Projects",     href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact",      href: "#contact" },
];

export default function Header() {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [theme,      setTheme]      = useState<"dark" | "light">("dark");
  const [active,     setActive]     = useState("#home");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = (localStorage.getItem("am-theme") as "dark" | "light") || "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    setTimeout(() => setNavVisible(true), 100);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { threshold: 0.4 }
    );
    NAV.forEach(l => { const el = document.querySelector(l.href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [mounted]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("am-theme", next);
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        /* ─── Header specific theme variables ─────────── */
        :root {
          --header-bg: rgba(15, 23, 42, 0.85); /* Dark mode header bg */
          --header-border: rgba(255, 255, 255, 0.08);
          --switch-border: rgba(255, 255, 255, 0.2);
          --shadow-scrolled: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        [data-theme="light"] {
          --header-bg: rgba(255, 255, 255, 0.92); /* Light mode header bg */
          --header-border: rgba(0, 0, 0, 0.15); /* Darker border for light mode */
          --switch-border: rgba(0, 0, 0, 0.35); /* Much darker border for switch in light mode */
          --shadow-scrolled: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        /* ─── Desktop nav ─────────────────────────────── */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }

        /* ─── Nav link ────────────────────────────────── */
        .nav-link {
          position: relative;
          display: block;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-family: var(--font-body);
          text-decoration: none;
          transition: color 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 10px; right: 10px;
          height: 1.5px;
          border-radius: 1px;
          background: var(--accent-cyan);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link:hover {
          color: var(--text-primary) !important;
          background: rgba(124, 58, 237, 0.08);
        }
        .nav-link.active {
          color: var(--accent-cyan) !important;
          font-weight: 600;
          background: rgba(2, 132, 199, 0.08);
        }

        /* ─── Nav entrance animation ──────────────────── */
        .nav-item {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .nav-item.visible { opacity: 1; transform: translateY(0); }

        /* ─── Hire Me — hidden mobile, shown desktop ──── */
        @keyframes btn-shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }

        .hire-btn {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
          background: linear-gradient(135deg, #0284c7, #7c3aed);          
          border: none;
          border-radius: var(--radius-btn, 12px);
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .hire-btn::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: btn-shine 3s infinite ease-in-out;
        }
        .hire-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
        }
        .hire-btn:active { transform: scale(0.97); }
        .hire-btn svg { flex-shrink: 0; display: block; }

        /* ─── Sliding Theme Switch ────────────────────── */
        .theme-switcher {
          position: relative;
          width: 54px;
          height: 28px;
          border-radius: 14px;
          background: transparent;
          border: 1.5px solid var(--switch-border); /* Uses the strict dark/light border */
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0 4px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .theme-switcher:hover {
          border-color: var(--accent-cyan);
        }
        
        /* The glowing moving circle (Knob) */
        .ts-knob {
          position: absolute;
          top: 2px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      background 0.4s ease, 
                      box-shadow 0.4s ease;
          z-index: 2;
        }
        /* Dark mode state */
        .ts-knob.dark {
          transform: translateX(0);
          background: linear-gradient(135deg, #7c3aed, #db2777);
          box-shadow: 0 0 14px rgba(124, 58, 237, 0.7);
        }
        /* Light mode state */
        .ts-knob.light {
          transform: translateX(25px);
          background: linear-gradient(135deg, #0284c7, #0ea5e9);
          box-shadow: 0 0 14px rgba(2, 132, 199, 0.8);
        }

        /* Static background icons inside the track */
        .ts-bg-icons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 0 2px;
          color: var(--text-muted);
          pointer-events: none;
          z-index: 1;
        }

        /* ─── Burger button base ──────────────────────── */
        .burger-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--switch-border);
          cursor: pointer;
          flex-shrink: 0;
          color: var(--text-primary);
          transition: background 0.25s ease, transform 0.25s ease, border-color 0.3s ease;
        }
        .burger-btn:hover {
          background: rgba(124, 58, 237, 0.08);
          border-color: var(--accent-cyan);
        }

        /* ─── Mobile pill (wraps theme + burger) ──────── */
        .mobile-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px;
          border-radius: 18px;
          background: var(--bg-glass);
          border: 1px solid var(--switch-border);
          backdrop-filter: blur(12px);
        }
        .mobile-pill .burger-btn {
          background: transparent;
          border-color: transparent;
        }

        /* ─── Mobile drawer & overlay ─────────────────── */
        .mobile-drawer  { display: block; }
        .mobile-overlay { display: block; }

        /* ─── Mobile drawer nav link ──────────────────── */
        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 14px;
          font-family: var(--font-body);
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .mobile-nav-link:hover { background: rgba(124, 58, 237, 0.1); }

        /* ─── Logo hover ──────────────────────────────── */
        .logo-wrap:hover .logo-box { transform: rotate(8deg) scale(1.1); box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4); }
        .logo-box { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; }

        /* ═══════════════════════════════════════════════
           DESKTOP >= 1024px
        ═══════════════════════════════════════════════ */
        @media (min-width: 1024px) {
          .desktop-nav    { display: flex; }
          .hire-btn       { display: inline-flex; }
          .burger-btn     { display: none; }
          .mobile-pill    { background: transparent; border: none; padding: 0; gap: 16px; backdrop-filter: none; }
          .mobile-drawer  { display: none; }
          .mobile-overlay { display: none; }
        }
      `}</style>

      {/* ── Header ── */}
      <header
        className="fixed top-0 w-full z-50"
        style={{
          background:           "var(--header-bg)", /* Always solid/frosted, never transparent */
          backdropFilter:       "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom:         "1px solid var(--header-border)",
          boxShadow:            scrolled ? "var(--shadow-scrolled)" : "none",
          transition:           "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <a href="#home" className="logo-wrap" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div className="logo-box" style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0284c7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: "0.02em" }}>AM</span>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Abdul<span style={{ background: "linear-gradient(135deg, #0284c7, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Manan</span>
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <ul className="desktop-nav">
            {NAV.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li key={link.name} className={`nav-item ${navVisible ? "visible" : ""}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    style={{ color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)" }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

            {/* Hire Me — desktop only */}
            <a href="#contact" className="hire-btn">
              Hire Me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Mobile Island / Desktop Wrapper */}
            <div className="mobile-pill">

              {/* Glowing Slider Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme switch"
                className="theme-switcher"
              >
                {/* Background track icons */}
                <div className="ts-bg-icons">
                  <Moon size={13} strokeWidth={2.5} />
                  <Sun size={13} strokeWidth={2.5} />
                </div>
                
                {/* The moving glowing knob */}
                <div className={`ts-knob ${theme}`}>
                  {theme === "dark" ? <Moon size={11} strokeWidth={3} /> : <Sun size={11} strokeWidth={3} />}
                </div>
              </button>

              {/* Burger Menu — mobile only */}
              <button
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
                className="burger-btn"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: open ? "rotate(90deg) scale(1.1)" : "rotate(0deg) scale(1)" }}>
                  {open ? <X size={20} /> : <Menu size={20} />}
                </div>
              </button>

            </div>
          </div>

        </nav>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className="mobile-overlay"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(5px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Mobile drawer ── */}
      <div
        className="mobile-drawer"
        style={{
          position: "fixed", top: 80, left: 16, right: 16, zIndex: 50,
          padding: 1,
          background: open ? "linear-gradient(135deg, rgba(2,132,199,0.5), rgba(124,58,237,0.5))" : "transparent",
          borderRadius: 20,
          transformOrigin: "top center",
          transform: open ? "scaleY(1) translateY(0)" : "scaleY(0.9) translateY(-15px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease",
        }}
      >
        <div style={{
          background: "var(--bg-card)",
          borderRadius: 19,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
        }}>
          <ul style={{ padding: "12px", listStyle: "none", margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li
                  key={link.name}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.4s ease ${i * 40}ms, transform 0.4s ease ${i * 40}ms`,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="mobile-nav-link"
                    style={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      background: isActive ? "rgba(124, 58, 237, 0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(124, 58, 237, 0.2)" : "1px solid transparent",
                    }}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: isActive ? "var(--accent-cyan)" : "var(--border-subtle)",
                      boxShadow: isActive ? "0 0 10px var(--accent-cyan)" : "none",
                      transition: "all 0.3s ease",
                    }} />
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}