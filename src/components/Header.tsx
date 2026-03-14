"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  const [active, setActive] = useState("#home");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("am-theme") as "dark"|"light"|null;
    const t = saved || "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { threshold: 0.4 }
    );
    links.forEach(l => { const el = document.querySelector(l.href); if (el) obs.observe(el); });
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
      <header
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(var(--bg-primary-rgb,5,8,16),0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
            <div className="relative w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: "var(--gradient-main)" }}>
              <span className="text-white text-xs font-bold" style={{ fontFamily: "var(--font-display)" }}>AM</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>
              Abdul<span className="text-gradient">Manan</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {links.map(link => (
              <li key={link.name}>
                <a href={link.href}
                  className="relative px-3 py-1.5 text-sm rounded-lg block transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: active === link.href ? "var(--accent-cyan)" : "var(--text-secondary)",
                    fontWeight: active === link.href ? 600 : 400,
                    background: active === link.href ? "var(--bg-glass)" : "transparent",
                  }}
                >
                  {link.name}
                  {active === link.href && (
                    <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "var(--accent-cyan)" }} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ background: "var(--bg-glass)", border: "1px solid var(--border-subtle)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>

            {/* CTA */}
            <a href="#contact" className="hidden lg:flex btn-primary items-center gap-1.5 px-4 py-2 text-sm" style={{ textDecoration: "none" }}>
              Hire Me
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            {/* Burger */}
            <button className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg-glass)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}
              onClick={() => setOpen(o => !o)}>
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={() => setOpen(false)} />}

      {/* Mobile drawer */}
      <div className="fixed top-[68px] inset-x-4 z-50 lg:hidden transition-all duration-300 origin-top"
        style={{
          transform: open ? "scaleY(1)" : "scaleY(0.9)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "16px",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
        }}
      >
        <ul className="p-3 space-y-0.5">
          {links.map(link => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  fontFamily: "var(--font-body)",
                  color: active === link.href ? "var(--accent-cyan)" : "var(--text-secondary)",
                  background: active === link.href ? "var(--bg-glass)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: active === link.href ? "var(--accent-cyan)" : "var(--border-glow)" }} />
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-2 pb-1 px-1">
            <a href="#contact" onClick={() => setOpen(false)}
              className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2" style={{ textDecoration: "none" }}>
              Hire Me →
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}