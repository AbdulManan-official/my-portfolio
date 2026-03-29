"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    const fn = () => setScrolled(window.scrollY > 50);
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
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 13px;
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
          background: var(--bg-glass);
        }
        .nav-link.active {
          color: var(--accent-cyan) !important;
          font-weight: 600;
          background: var(--bg-glass);
        }

        /* ─── Nav entrance animation ──────────────────── */
        .nav-item {
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .nav-item.visible { opacity: 1; transform: translateY(0); }

        /* ─── Hire Me — hidden mobile, shown desktop ──── */
        .hire-btn {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
background: linear-gradient(135deg, #0284c7, #7c3aed);          border: none;
          border-radius: var(--radius-btn);
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .hire-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .hire-btn:hover::after { opacity: 1; }
        .hire-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: var(--glow-cyan);
        }
        .hire-btn:active { transform: scale(0.97); }
        .hire-btn svg { flex-shrink: 0; display: block; }

        /* ─── Icon button base ────────────────────────── */
        .icon-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--icon-btn-bg);
          border: 1px solid var(--icon-btn-border);
          cursor: pointer;
          flex-shrink: 0;
          color: var(--text-primary);
          transition: background 0.25s ease, border-color 0.25s ease,
                      box-shadow 0.25s ease, transform 0.25s ease;
        }
        .icon-btn:hover {
          background: var(--icon-btn-hover-bg);
          border-color: var(--icon-btn-hover-border);
          box-shadow: var(--icon-btn-hover-shadow);
        }
        /* Burger active state */
        .icon-btn.burger-open {
          background: var(--burger-open-bg);
          border-color: transparent;
          box-shadow: var(--burger-open-shadow);
        }

        /* ─── Burger button — mobile only ─────────────── */
        .burger-btn { display: flex; }

        /* ─── Mobile pill (wraps theme + burger) ──────── */
        .mobile-pill {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 3px;
          border-radius: 13px;
          background: var(--pill-bg);
          border: 1px solid var(--pill-border);
        }
        /* Inside the pill, suppress individual icon-btn chrome */
        .mobile-pill .icon-btn {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }
        .mobile-pill .icon-btn:hover {
          background: var(--pill-icon-hover-bg);
          border-color: transparent;
          box-shadow: none;
        }
        .mobile-pill .icon-btn.burger-open {
          background: var(--pill-icon-active-bg);
          border-color: transparent;
          box-shadow: none;
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
        .mobile-nav-link:hover { background: var(--bg-glass-hover); }

        /* ─── Logo hover ──────────────────────────────── */
        .logo-wrap:hover .logo-box { transform: rotate(6deg) scale(1.08); }
        .logo-box { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }

        /* ═══════════════════════════════════════════════
           DESKTOP >= 1024px
           - Show desktop nav + Hire Me
           - Hide burger + drawer + overlay
           - Dissolve pill (display:contents)
        ═══════════════════════════════════════════════ */
        @media (min-width: 1024px) {
          .desktop-nav    { display: flex; }
          .hire-btn       { display: inline-flex; }
          .burger-btn     { display: none; }
          .mobile-pill    { display: contents; }
          .mobile-drawer  { display: none; }
          .mobile-overlay { display: none; }
        }

      `}</style>

      {/* ── Header ── */}
      <header
        className="fixed top-0 w-full z-50"
        style={{
          background:           scrolled ? "var(--header-scrolled-bg)" : "transparent",
          backdropFilter:       scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom:         `1px solid ${scrolled ? "var(--header-border)" : "transparent"}`,
          transition:           "background 0.4s ease, border-color 0.3s ease",
        }}
      >
        <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <a href="#home" className="logo-wrap" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div className="logo-box" style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #0284c7, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 11, color: "#fff", letterSpacing: "0.02em" }}>AM</span>
            </div>
           <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
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
                    style={{ color: isActive ? "var(--accent-cyan)" : "var(--nav-link-color)" }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

            {/* Hire Me — desktop only via CSS */}
            <a href="#contact" className="hire-btn" style={{ textDecoration: "none" }}>
              Hire Me
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* mobile-pill: pill on mobile, display:contents on desktop */}
            <div className="mobile-pill">

              {/* Theme toggle — always visible */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="icon-btn"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1) rotate(15deg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                {theme === "dark" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                )}
              </button>

              {/* Burger — mobile only via CSS */}
              <button
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
                className={`icon-btn burger-btn${open ? " burger-open" : ""}`}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ transition: "transform 0.3s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
                  {open ? <X size={16} /> : <Menu size={16} />}
                </div>
              </button>

            </div>
          </div>

        </nav>
      </header>

      {/* ── Mobile backdrop — hidden on desktop via CSS ── */}
      <div
        className="mobile-overlay"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* ── Mobile drawer — hidden on desktop via CSS ── */}
      <div
        className="mobile-drawer"
        style={{
          position: "fixed", top: 68, left: 12, right: 12, zIndex: 50,
          padding: 1,
          background: open ? "var(--gradient-main)" : "transparent",
          borderRadius: 18,
          transformOrigin: "top center",
          transform: open ? "scaleY(1) translateY(0)" : "scaleY(0.92) translateY(-10px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease, background 0.3s ease",
        }}
      >
        <div style={{
          background: "var(--drawer-bg)",
          borderRadius: 17,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
        }}>
          <ul style={{ padding: "10px", listStyle: "none", margin: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map((link, i) => {
              const isActive = active === link.href;
              return (
                <li
                  key={link.name}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(-14px)",
                    transition: `opacity 0.3s ease ${i * 30}ms, transform 0.3s ease ${i * 30}ms`,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="mobile-nav-link"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--accent-cyan)" : "var(--drawer-link-color)",
                      background: isActive ? "var(--drawer-link-active-bg)" : "transparent",
                    }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: isActive ? "var(--accent-cyan)" : "var(--drawer-dot-color)",
                      boxShadow: isActive ? "0 0 8px var(--accent-cyan)" : "none",
                      transition: "background 0.2s, box-shadow 0.2s",
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