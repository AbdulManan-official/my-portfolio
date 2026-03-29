"use client";
import { useEffect, useState, useMemo } from "react";
import { Github, Linkedin, Mail, Phone as PhoneIcon } from "lucide-react";

const STATS = [
  { v: "50+",  label: "Apps Shipped" },
  { v: "2+",   label: "Years Exp." },
  { v: "100%", label: "Satisfaction" },
];

const SOCIALS = [
  { Icon: Github,    href: "https://github.com/AbdulManan-official",             label: "GitHub" },
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/abdul-manan-a96351254/", label: "LinkedIn" },
  { Icon: PhoneIcon, href: "https://wa.me/923195542740",                          label: "WhatsApp" },
  { Icon: Mail,      href: "mailto:abdullmananan7777@gmail.com", isEmail: true,   label: "Email" },
];

const SCREENS = [
  { label: "Tasbeeh Max",  top: "#6366f1", bot: "#9333ea", accent: "#a78bfa" },
  { label: "VPN Max",      top: "#3b82f6", bot: "#06b6d4", accent: "#67e8f9" },
  { label: "MedicineTime", top: "#10b981", bot: "#0d9488", accent: "#6ee7b7" },
];

const PILLS = [
  { text: "Flutter",  sub: "Expert",  pos: { left: "-84px",  top: "36px"     }, delay: "0s"   },
  { text: "Firebase", sub: "Backend", pos: { right: "-80px", top: "110px"    }, delay: "1s"   },
  { text: "50+ Apps", sub: "Shipped", pos: { right: "-80px", bottom: "130px" }, delay: "0.5s" },
];

const JOURNEY = [
  { icon: "💡", label: "Idea",   color: "#f59e0b" },
  { icon: "🎨", label: "Design", color: "#ec4899" },
  { icon: "⚙️", label: "Build",  color: "#0284c7" },
  { icon: "🚀", label: "Launch", color: "#7c3aed" },
];

/* ─────────────────────────────────────────────
   Interactive Phone
───────────────────────────────────────────── */
function Phone({ s, tapped, onTap }: {
  s: typeof SCREENS[0]; tapped: boolean; onTap: () => void;
}) {
  return (
    <div onClick={onTap} style={{ position:"relative", width:220, height:440, cursor:"pointer" }}>
      {/* glow */}
      <div style={{
        position:"absolute", inset:0, borderRadius:48, pointerEvents:"none",
        background:`radial-gradient(ellipse at 50% 65%, ${s.top}${tapped?"99":"60"}, transparent 68%)`,
        filter:`blur(${tapped?"24px":"36px"})`,
        transform:`scale(${tapped?"1.5":"1.35"})`,
        transition:"all 0.45s ease",
      }}/>
      {/* frame */}
      <div style={{
        position:"absolute", inset:0, borderRadius:46, overflow:"hidden",
        background:"linear-gradient(150deg,#2e3147,#13162a,#1c1f35)",
        boxShadow:`0 0 0 1.5px rgba(255,255,255,0.11), 0 ${tapped?"40":"30"}px 80px rgba(0,0,0,0.65), 0 0 ${tapped?"90":"60"}px ${s.top}${tapped?"55":"28"}, inset 0 1px 0 rgba(255,255,255,0.11)`,
        transform: tapped ? "scale(0.97)" : "scale(1)",
        transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
      }}>
        {/* screen */}
        <div style={{
          position:"absolute", top:12, left:12, right:12, bottom:12,
          borderRadius:36, overflow:"hidden",
          background:`linear-gradient(160deg,${s.top},${s.bot})`,
          transition:"background 0.7s ease",
        }}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 50%)"}}/>
          {/* dynamic island */}
          <div style={{
            position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
            zIndex:20, display:"flex", alignItems:"center", gap:6,
            padding:"5px 14px", borderRadius:100,
            background:"rgba(0,0,0,0.5)", backdropFilter:"blur(10px)",
          }}>
            <div style={{
              width:7, height:7, borderRadius:"50%", background:s.accent,
              boxShadow: tapped ? `0 0 8px ${s.accent}` : "none",
              transition:"box-shadow 0.3s",
            }}/>
            <div style={{width:44,height:5,borderRadius:3,background:"rgba(255,255,255,0.25)"}}/>
          </div>
          {/* app ui */}
          <div style={{position:"absolute",inset:0,padding:"44px 16px 16px",display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.22)"}}/>
              <div style={{display:"flex",gap:5}}>
                {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.4)"}}/>)}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>
              <div style={{height:7,borderRadius:4,width:"75%",background:"rgba(255,255,255,0.28)"}}/>
              <div style={{height:5,borderRadius:3,width:"50%",background:"rgba(255,255,255,0.18)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,flex:1,marginTop:4}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{
                  borderRadius:16,
                  background: tapped
                    ? `linear-gradient(135deg,${s.top}44,${s.bot}44)`
                    : "rgba(255,255,255,0.13)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  transition:`background 0.3s ease ${i*60}ms`,
                }}/>
              ))}
            </div>
            <div style={{textAlign:"center",fontSize:11,fontWeight:700,letterSpacing:"0.05em",color:"rgba(255,255,255,0.9)",fontFamily:"var(--font-display)"}}>
              {s.label}
            </div>
            <div style={{width:48,height:4,borderRadius:2,background:"rgba(255,255,255,0.3)",margin:"0 auto"}}/>
          </div>
        </div>
        {/* side buttons */}
        <div style={{position:"absolute",right:-2,top:90,width:3,height:40,borderRadius:"0 3px 3px 0",background:"rgba(255,255,255,0.15)"}}/>
        <div style={{position:"absolute",left:-2,top:76,width:3,height:28,borderRadius:"3px 0 0 3px",background:"rgba(255,255,255,0.12)"}}/>
        <div style={{position:"absolute",left:-2,top:114,width:3,height:28,borderRadius:"3px 0 0 3px",background:"rgba(255,255,255,0.12)"}}/>
        <div style={{position:"absolute",inset:0,borderRadius:46,background:"linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 40%)",pointerEvents:"none"}}/>
      </div>
      {/* tap hint */}
      <div style={{
        position:"absolute", bottom:-28, left:"50%", transform:"translateX(-50%)",
        fontSize:10, fontFamily:"var(--font-body)", color:"var(--text-muted)",
        letterSpacing:"0.08em", whiteSpace:"nowrap", opacity: tapped ? 0 : 0.7,
        transition:"opacity 0.3s",
      }}>tap to interact</div>
      {/* pills */}
      {PILLS.map(p=>(
        <div key={p.text} className="hero-pill"
          style={{position:"absolute",...p.pos,animation:`float 4s ease-in-out ${p.delay} infinite`}}>
          <div className="hero-pill-title">{p.text}</div>
          <div className="hero-pill-sub">{p.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function Hero() {
  const [mounted,   setMounted]   = useState(false);
  const [screen,    setScreen]    = useState(0);
  const [tapped,    setTapped]    = useState(false);
  const [mouse,     setMouse]     = useState({ x:0, y:0 });
  const [heroReady, setHeroReady] = useState(false);

  const particles = useMemo(()=>Array.from({length:18},(_,i)=>({
    id:i, left:Math.random()*100, top:Math.random()*100,
    delay:Math.random()*4, dur:3+Math.random()*3,
  })),[]);

  useEffect(()=>{ setMounted(true); setTimeout(()=>setHeroReady(true),80); },[]);

  useEffect(()=>{
    if(!mounted) return;
    const t = setInterval(()=>setScreen(s=>(s+1)%SCREENS.length),3500);
    return ()=>clearInterval(t);
  },[mounted]);

  useEffect(()=>{
    if(!mounted) return;
    const fn=(e:MouseEvent)=>setMouse({
      x:(e.clientX/window.innerWidth -0.5)*10,
      y:(e.clientY/window.innerHeight-0.5)*10,
    });
    window.addEventListener("mousemove",fn);
    return ()=>window.removeEventListener("mousemove",fn);
  },[mounted]);

  const handleTap = () => {
    setTapped(true);
    setScreen(s=>(s+1)%SCREENS.length);
    setTimeout(()=>setTapped(false), 600);
  };

  if(!mounted) return <section id="home" style={{minHeight:"100vh",background:"var(--bg-primary)"}}/>;

  return (
    <>
      <style>{`

        /* ── Name ───────────────────────────────────── */
        .hero-name {
          display: inline-block;
          font-size: clamp(2.1rem, 5vw, 3.4rem);
          font-weight: 800;
          position: relative;
         -webkit-text-fill-color: unset;
background: none;
color: var(--text-primary);
          background-clip: text;
          opacity: 0;
          transform: translateY(25px);
          animation: nameFadeUp 0.9s ease forwards;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .hero-name::before {
          content: "Abdul Manan";
          position: absolute;
          left: 0; top: 0;
          z-index: -1;
          background: linear-gradient(135deg, #63e4ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: blur(14px);
          opacity: 0.5;
        }
        .hero-name:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 10px rgba(99,228,255,0.5));
        }
        @keyframes nameFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Subtitle ───────────────────────────────── */
        .hero-subtitle {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.05rem, 2.3vw, 1.55rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        /* ── Role badge ─────────────────────────────── */
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 16px 7px 8px;
          border-radius: 100px;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          margin-bottom: 18px;
        }
        .role-badge-dot {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg,#0284c7,#7c3aed);
          display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .role-badge-text {
          font-family: var(--font-display);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-primary);
        }

        /* ── Journey ────────────────────────────────── */
        .journey-container { position:relative; overflow:visible !important; padding:0 12px; }
        .journey-wrap {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 20px; overflow: visible !important; padding: 8px 0;
        }
        .journey-wrap::-webkit-scrollbar { display:none; }
        .journey-node {
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          position: relative; flex-shrink: 0; min-width: 64px;
        }
        .journey-icon-ring {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
          border: 1.5px solid var(--border-subtle);
          background: var(--bg-glass);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.25s;
          cursor: default; position: relative; z-index: 10;
          transform: translateZ(0); will-change: transform;
        }
        .journey-icon-ring:hover {
          transform: scale(1.18) translateY(-3px) !important;
          z-index: 20;
        }
        .journey-node-label {
          font-family: var(--font-display); font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-muted); white-space: nowrap;
          position: relative; z-index: 10;
        }
        .journey-connector {
          width: 28px; height: 1px; flex-shrink: 0; margin: 0 2px;
          background: linear-gradient(90deg, var(--border-glow), transparent);
          margin-bottom: 18px; position: relative; z-index: 5;
        }

        /* ── Bio ────────────────────────────────────── */
        .hero-bio {
          font-size: 14.5px; line-height: 1.82; max-width: 430px;
          color: var(--text-secondary); font-family: var(--font-body); margin-bottom: 22px;
        }
        .hero-bio strong { color: var(--text-primary); font-weight: 600; }

        /* ── Stats ──────────────────────────────────── */
        .stats-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
        .stat-card {
          display: flex; flex-direction: column; gap: 3px;
          padding: 12px 16px; border-radius: 14px;
          background: var(--bg-glass); border: 1px solid var(--border-subtle);
          cursor: default; flex: 1; min-width: 76px;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.25s;
        }
        .stat-card:hover {
          transform: translateY(-4px) scale(1.04);
          border-color: var(--border-glow); box-shadow: var(--glow-cyan);
        }
        .stat-value {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.45rem; line-height: 1;
          background: linear-gradient(135deg,#0284c7,#7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-label {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-muted); font-family: var(--font-body);
        }

        /* ── Buttons ────────────────────────────────── */
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; font-family: var(--font-display);
          font-weight: 700; font-size: 13.5px; color: #fff;
          background: linear-gradient(135deg,#0284c7,#7c3aed);
          border: none; border-radius: var(--radius-btn); cursor: pointer;
          text-decoration: none; position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
          white-space: nowrap;
        }
        .hero-btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.12); opacity: 0; transition: opacity 0.25s;
        }
        .hero-btn-primary:hover::after { opacity: 1; }
        .hero-btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: var(--glow-cyan); }
        .hero-btn-primary:active { transform: scale(0.97); }

        .hero-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; font-family: var(--font-display);
          font-weight: 600; font-size: 13.5px; color: var(--accent-cyan);
          background: transparent; border: 1.5px solid var(--border-glow);
          border-radius: var(--radius-btn); cursor: pointer;
          text-decoration: none; transition: all 0.3s; white-space: nowrap;
        }
        .hero-btn-outline:hover {
          background: var(--bg-glass-hover); border-color: var(--accent-cyan);
          box-shadow: var(--glow-cyan); transform: translateY(-2px);
        }

        /* ── Social icons ───────────────────────────── */
        .social-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-glass); border: 1px solid var(--border-subtle);
          color: var(--text-secondary); text-decoration: none; flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .social-icon:hover {
          border-color: var(--border-glow); color: var(--accent-cyan);
          background: var(--bg-glass-hover); transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 20px rgba(99,228,255,0.15);
        }

        /* ── Reveal ─────────────────────────────────── */
        .hero-reveal {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .hero-reveal.ready { opacity: 1; transform: translateY(0); }

        .hero-phone-wrap {
          opacity: 0; transform: scale(0.88);
          transition: opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.3s;
        }
        .hero-phone-wrap.ready { opacity: 1; transform: scale(1); }

        /* ── Pills ──────────────────────────────────── */
        .hero-pill {
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 12px; padding: 8px 12px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          min-width: 88px; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .hero-pill-title {
          font-family: var(--font-display); font-size: 11px;
          font-weight: 700; color: var(--text-primary); white-space: nowrap;
        }
        .hero-pill-sub {
          font-family: var(--font-body); font-size: 10px;
          color: var(--text-muted); margin-top: 2px;
        }

        /* ── Divider ────────────────────────────────── */
        .hero-divider {
          height: 1px; max-width: 300px; margin-bottom: 22px;
          background: linear-gradient(90deg,var(--border-glow),transparent);
        }

        /* ── Scroll indicator ───────────────────────── */
        .scroll-mouse {
          width: 22px; height: 34px; border-radius: 11px;
          border: 1.5px solid var(--border-glow);
          display: flex; justify-content: center; padding-top: 6px;
        }
        .scroll-dot {
          width: 2px; height: 8px; border-radius: 2px;
          background: var(--accent-cyan);
          animation: bounce-dot 1.6s ease-in-out infinite;
        }

        /* ════════════════════════════════════════
           MOBILE  < 640px
        ════════════════════════════════════════ */
        @media (max-width: 639px) {
          .hero-pill { display: none; }
          .phone-desktop-col { display: none !important; }

          .hero-phone-mobile-slot {
            display: flex; justify-content: center;
            padding: 24px 0 12px; margin-bottom: 16px;
          }

          /* ── CENTER everything on mobile ── */
          .hero-left-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .role-badge {
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-name {
            display: block;
            text-align: center;
            font-size: clamp(1.9rem, 8vw, 2.6rem);
          }
          /* fix ::before pseudo for centered name */
          .hero-name::before { left: 0; right: 0; text-align: center; }

          .hero-subtitle {
            text-align: center;
            font-size: clamp(1rem, 4vw, 1.3rem);
            margin-bottom: 16px;
          }

          .journey-container { padding: 0 8px; margin-bottom: 24px; }
          .journey-wrap {
            justify-content: center;
            gap: 4px; padding: 12px 0;
          }
          .journey-node { min-width: 56px; gap: 4px; }
          .journey-icon-ring { width: 40px; height: 40px; font-size: 16px; min-width: 40px; }
          .journey-connector { width: 20px; min-width: 20px; }
          .journey-node-label { font-size: 8px; padding: 0 2px; }

          .hero-bio {
            font-size: 13.5px; line-height: 1.7;
            margin-bottom: 20px; text-align: center;
            max-width: 100%;
          }

          .stats-row {
            gap: 6px; margin-bottom: 18px;
            justify-content: center; width: 100%;
          }
          .stat-card { padding: 10px 12px; min-width: 64px; flex: 1 1 70px; }
          .stat-value { font-size: 1.2rem; }
          /* center stat text */
          .stat-card { align-items: center; }

          .hero-divider {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-btns {
            flex-direction: column !important;
            gap: 10px; width: 100%;
          }
          .hero-btn-primary, .hero-btn-outline {
            justify-content: center;
            width: 100%; padding: 14px 20px; font-size: 14px;
          }

          .socials-mobile { justify-content: center; gap: 12px; }
          .social-icon { width: 36px; height: 36px; }
        }

        /* ── Tablet 640–1023 ────────────────────────── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-pill { display: none; }
          .phone-desktop-col { display: none !important; }
          .hero-phone-mobile-slot {
            display: flex; justify-content: center; padding: 28px 0 8px;
          }
          .journey-icon-ring { width: 40px; height: 40px; font-size: 16px; }
          .journey-connector { width: 24px; }
        }

        /* ── Desktop ≥ 1024 ─────────────────────────── */
        @media (min-width: 1024px) {
          .hero-phone-mobile-slot { display: none; }
          .journey-container { overflow: visible !important; }
        }

        /* ── Keyframes ──────────────────────────────── */
        @keyframes bounce-dot {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(8px); }
          60% { transform: translateY(4px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden grid-bg"
        style={{ background:"var(--bg-primary)", paddingTop:80, paddingBottom:80 }}
      >
        {/* Orbs */}
        <div className="absolute rounded-full pointer-events-none" style={{width:600,height:600,top:"-20%",left:"-14%",background:"radial-gradient(circle,rgba(99,228,255,0.05),transparent)",filter:"blur(72px)",animation:"floatSlow 12s ease-in-out infinite"}}/>
        <div className="absolute rounded-full pointer-events-none" style={{width:500,height:500,bottom:"-18%",right:"-10%",background:"radial-gradient(circle,rgba(167,139,250,0.06),transparent)",filter:"blur(72px)",animation:"floatSlow 10s ease-in-out infinite 3s"}}/>

        {/* Particles */}
        {particles.map(p=>(
          <div key={p.id} className="absolute rounded-full pointer-events-none" style={{left:`${p.left}%`,top:`${p.top}%`,width:1.5,height:1.5,background:"var(--accent-cyan)",opacity:0.22,animation:`glow-pulse ${p.dur}s ease-in-out infinite`,animationDelay:`${p.delay}s`}}/>
        ))}

        {/* SVG accents */}
        <div className="absolute pointer-events-none" style={{top:112,right:64,opacity:0.07,animation:"rotate-slow 22s linear infinite"}}>
          <svg width="100" height="100" viewBox="0 0 110 110" fill="none">
            <polygon points="55,6 105,85 5,85" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none"/>
            <polygon points="55,22 92,78 18,78" stroke="var(--accent-violet)" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>
        <div className="absolute pointer-events-none" style={{bottom:80,left:56,opacity:0.06,animation:"rotate-slow 28s linear infinite reverse"}}>
          <svg width="66" height="66" viewBox="0 0 72 72" fill="none">
            <rect x="8" y="8" width="56" height="56" rx="3" stroke="var(--accent-violet)" strokeWidth="1.5" fill="none" transform="rotate(45 36 36)"/>
            <rect x="20" y="20" width="32" height="32" rx="2" stroke="var(--accent-cyan)" strokeWidth="0.8" fill="none" transform="rotate(45 36 36)"/>
          </svg>
        </div>

        {/* ── Main ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">

          {/* Phone — mobile/tablet only */}
          <div className="hero-phone-mobile-slot">
            <div className={`hero-phone-wrap ${heroReady ? "ready" : ""}`}>
              <Phone s={SCREENS[screen]} tapped={tapped} onTap={handleTap}/>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── LEFT ── */}
            <div className="hero-left-col">

              {/* Role badge */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.08s"}}>
                <div className="role-badge">
                  <div className="role-badge-dot">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                  </div>
                  <span className="role-badge-text">Mobile &amp; Web Developer</span>
                </div>
              </div>

              {/* Name */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.16s",marginBottom:10,width:"100%"}}>
                <h1 style={{
                  fontFamily:"var(--font-display)", fontWeight:800,
                  letterSpacing:"-0.03em", color:"var(--text-primary)", margin:0,
                }}>
                  <span className="hero-name">Abdul Manan</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.22s",marginBottom:18,width:"100%"}}>
                <h2 className="hero-subtitle">
                  From{" "}
                  <span style={{
                    background:"linear-gradient(135deg,#0284c7,#7c3aed)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  }}>
                    Idea to Play Store
                  </span>
                </h2>
              </div>

              {/* Journey nodes */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.28s",width:"100%"}}>
                <div className="journey-container">
                  <div className="journey-wrap">
                    {JOURNEY.map((step,i)=>(
                      <div key={step.label} style={{display:"contents"}}>
                        <div className="journey-node">
                          <div
                            className="journey-icon-ring"
                            onMouseEnter={e=>{
                              const el = e.currentTarget as HTMLElement;
                              el.style.borderColor = step.color;
                              el.style.boxShadow = `0 0 14px ${step.color}55`;
                            }}
                            onMouseLeave={e=>{
                              const el = e.currentTarget as HTMLElement;
                              el.style.borderColor = "";
                              el.style.boxShadow = "";
                            }}
                          >
                            {step.icon}
                          </div>
                          <span className="journey-node-label" style={{color: step.color + "cc"}}>
                            {step.label}
                          </span>
                        </div>
                        {i < JOURNEY.length-1 && <div className="journey-connector"/>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.34s",width:"100%"}}>
                <p className="hero-bio">
                  I design and build <strong>Flutter</strong> apps with pixel-perfect UIs,
                  powered by <strong>Firebase &amp; Supabase</strong> backends.
                  Whether it's your first MVP or a full product — I take it from
                  wireframe to the <strong>Play Store &amp; App Store</strong>, fast.
                </p>
              </div>

              {/* Stats */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.40s",width:"100%"}}>
                <div className="stats-row">
                  {STATS.map(s=>(
                    <div key={s.label} className="stat-card">
                      <div className="stat-value">{s.v}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.45s",width:"100%"}}>
                <div className="hero-divider"/>
              </div>

              {/* CTA */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.50s",marginBottom:22,width:"100%"}}>
                <div className="hero-btns" style={{display:"flex",flexWrap:"wrap",gap:12}}>
                  <a href="#projects" className="hero-btn-primary">
                    View My Work
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <a href="#about" className="hero-btn-outline">About Me</a>
                </div>
              </div>

              {/* Socials */}
              <div className={`hero-reveal ${heroReady?"ready":""}`} style={{transitionDelay:"0.56s",paddingBottom:32,width:"100%"}}>
                <div className="socials-mobile" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {SOCIALS.map(({Icon,href,isEmail,label})=>(
                    <a key={label} href={href}
                      target={!isEmail?"_blank":undefined}
                      rel={!isEmail?"noopener noreferrer":undefined}
                      aria-label={label} className="social-icon">
                      <Icon size={16}/>
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT — desktop phone only ── */}
            <div
              className="phone-desktop-col"
              style={{display:"flex",alignItems:"center",justifyContent:"center"}}
            >
              <div className={`hero-phone-wrap ${heroReady?"ready":""}`}>
                <div style={{
                  transform:`rotateY(${mouse.x*0.4}deg) rotateX(${-mouse.y*0.4}deg)`,
                  transition:"transform 0.5s ease-out", perspective:"1000px",
                }}>
                  <Phone s={SCREENS[screen]} tapped={tapped} onTap={handleTap}/>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{opacity:heroReady?1:0,transition:"opacity 0.6s ease 1.4s"}}>
          <span style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.2em",color:"var(--text-muted)",fontFamily:"var(--font-body)"}}>scroll</span>
          <div className="scroll-mouse"><div className="scroll-dot"/></div>
        </div>

      </section>
    </>
  );
}