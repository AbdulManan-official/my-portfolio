"use client";
import { useEffect, useRef, useState } from "react";
import { Smartphone, Globe, Zap, Palette, Shield, HeartHandshake } from "lucide-react";

const SERVICES = [
  { Icon:Smartphone, title:"Mobile App Development", accent:"#63e4ff",
    desc:"End-to-end Flutter development for iOS & Android. Custom UI, state management, and full App Store deployment.",
    features:["Flutter & Dart","Cross-platform","Custom Animations","App Store Deploy"] },
  { Icon:Globe, title:"Web Development", accent:"#a78bfa",
    desc:"Modern responsive web apps with Next.js, React, and Tailwind CSS. Fast, SEO-friendly, and pixel-perfect.",
    features:["Next.js & React","Tailwind CSS","SEO Optimized","Custom Deployment"] },
  { Icon:Zap, title:"Firebase & Supabase", accent:"#f59e0b",
    desc:"Full backend integration — auth, real-time databases, cloud storage, and push notifications.",
    features:["Auth & Users","Real-time DB","Cloud Storage","Push Notifications"] },
  { Icon:Palette, title:"UI/UX Design", accent:"#f472b6",
    desc:"Figma prototypes to pixel-perfect implementation. Beautiful interfaces with smooth animations.",
    features:["Figma Prototyping","Animations","Dark/Light Themes","Responsive Layouts"] },
  { Icon:Shield, title:"Maintenance & Support", accent:"#34d399",
    desc:"Ongoing bug fixes, OS update compatibility, performance tuning, and new feature additions.",
    features:["Bug Fixing","Performance","OS Compatibility","Feature Updates"] },
  { Icon:HeartHandshake, title:"Custom Solutions", accent:"#c084fc",
    desc:"Unique idea? I build custom mobile and web solutions tailored exactly to your requirements.",
    features:["Requirement Analysis","Custom Architecture","Scalable Code","Full Documentation"] },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number|null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="services" className="py-24" style={{ background:"var(--bg-primary)" }} />;

  return (
    <section id="services" ref={ref} className="relative py-24 overflow-hidden grid-bg" style={{ background:"var(--bg-primary)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 70% 50% at 50% 50%,rgba(167,139,250,0.04),transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.6s ease" }}>
          <div className="section-label justify-center mb-4">What I offer</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
            My <span className="text-gradient">Services</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((s,i) => (
            <div key={s.title} className="card-glass p-6 group relative overflow-hidden cursor-default"
              style={{ opacity:visible?1:0, transform:visible?"none":"translateY(24px)", transition:`all 0.5s ease ${0.1+i*0.07}s`,
                boxShadow: hovered===i ? `0 20px 60px ${s.accent}20` : "none",
                borderColor: hovered===i ? `${s.accent}40` : "var(--border-subtle)" }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background:`${s.accent}18`, border:`1px solid ${s.accent}30` }}>
                <s.Icon size={20} style={{ color: s.accent }} />
              </div>

              <h3 className="text-base font-bold mb-2 transition-colors duration-300"
                style={{ fontFamily:"var(--font-display)", color: hovered===i ? s.accent : "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--text-secondary)", fontFamily:"var(--font-body)" }}>{s.desc}</p>

              <ul className="space-y-1.5">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color:"var(--text-muted)" }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.accent }} />{f}
                  </li>
                ))}
              </ul>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
                style={{ background:`linear-gradient(90deg, ${s.accent}, transparent)`, opacity: hovered===i ? 1 : 0 }} />
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-2xl p-10 text-center"
          style={{ opacity:visible?1:0, transition:"all 0.6s ease 0.6s", background:"var(--gradient-card)", border:"1px solid var(--border-glow)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 60% 80% at 50% 50%,rgba(99,228,255,0.08),transparent)" }} />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
              Got a project in mind?
            </h3>
            <p className="mb-7 max-w-xl mx-auto text-sm leading-relaxed" style={{ color:"var(--text-secondary)" }}>
              Whether it&apos;s a mobile app, a web product, or something custom — I&apos;d love to hear about it. Let&apos;s turn your idea into something real.
            </p>
            <a href="#contact" className="btn-primary px-8 py-3.5 text-sm inline-flex items-center gap-2" style={{ textDecoration:"none" }}>
              Let&apos;s Talk →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}