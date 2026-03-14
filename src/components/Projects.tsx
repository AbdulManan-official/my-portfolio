"use client";
import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { id:1, title:"Tasbeeh Max", desc:"Spiritual companion for Muslims with Tasbeeh counting, Qibla direction, Prayer Times, Dua collections, and offline Hive storage.", tech:["Flutter","Dart","Hive","Notifications"], features:["Digital Counter","Qibla Finder","Prayer Times","Dua Library"], accent:"#818cf8", top:"#6366f1", bot:"#9333ea", uiType:"spiritual" },
  { id:2, title:"VPN Max & Shield VPN", desc:"Flutter VPN apps with fast server switching, connection monitoring, data usage tracking, and polished modern UI.", tech:["Flutter","Dart","Firebase","Networking"], features:["Server Switching","Connection Monitor","Data Tracking","Modern UI"], accent:"#38bdf8", top:"#3b82f6", bot:"#06b6d4", uiType:"vpn" },
  { id:3, title:"Video to Audio Converter", desc:"Advanced media converter with audio extraction, batch processing, live waveform playback, and ringtone maker with SIM assignment.", tech:["Flutter","Dart","SharedPrefs","Media APIs"], features:["Batch Convert","Waveform View","Ringtone Maker","Media Merge"], accent:"#34d399", top:"#10b981", bot:"#0d9488", uiType:"media" },
  { id:4, title:"Parcel Delivery App", desc:"Full delivery platform with custom routes, provider & customer modes, real-time chat for negotiation, and admin dashboard.", tech:["Flutter","Dart","Firebase","Cloudinary"], features:["Custom Routes","Dual Roles","Real-time Chat","Admin Panel"], accent:"#fb923c", top:"#f97316", bot:"#ef4444", uiType:"delivery" },
  { id:5, title:"BNPL E-Commerce App", desc:"Buy Now Pay Later platform with flexible payment plans, COD support, instalment tracking, and full admin dashboard.", tech:["Flutter","Dart","Firebase","Stripe"], features:["BNPL Plans","COD Support","Instalment Track","Admin Panel"], accent:"#c084fc", top:"#a855f7", bot:"#ec4899", uiType:"ecommerce" },
  { id:6, title:"E-Commerce Mobile App", desc:"Feature-rich e-commerce app with product catalog, cart, order tracking, secure auth, and seamless payment integration.", tech:["Flutter","Dart","Firebase","Firestore"], features:["Product Catalog","Cart System","Order Tracking","Secure Auth"], accent:"#fbbf24", top:"#f59e0b", bot:"#f97316", uiType:"ecommerce2" },
];

function PhoneUI({ uiType, top }: { uiType: string; top: string }) {
  switch(uiType) {
    case "spiritual": return (
      <div className="flex flex-col items-center gap-2 px-3 pt-10">
        <div className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center"><div className="w-5 h-5 rounded-full bg-white/30"/></div>
        <div className="w-16 h-1.5 bg-white/25 rounded-full"/><div className="w-10 h-1 bg-white/15 rounded-full"/>
        <div className="w-20 h-20 rounded-full border-4 border-white/25 flex items-center justify-center mt-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white/90 text-[10px] font-bold">99</span></div>
        </div>
        <div className="flex gap-1.5 mt-1">{[0,1,2].map(i=><div key={i} className="w-8 h-5 rounded-lg bg-white/15"/>)}</div>
      </div>
    );
    case "vpn": return (
      <div className="flex flex-col items-center gap-2 px-3 pt-10">
        <div className="w-16 h-1.5 bg-white/25 rounded-full"/>
        <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center mt-1">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><div className="w-5 h-6 border-2 border-white/70 rounded-sm"/></div>
        </div>
        <div className="w-12 h-1 bg-white/20 rounded-full"/>
        <div className="flex gap-1.5 mt-1">{[0,1,2,3].map(i=><div key={i} className="w-5 h-6 rounded-lg bg-white/10 border border-white/15"/>)}</div>
        <div className="w-14 h-3 rounded-full bg-white/25"/>
      </div>
    );
    case "media": return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div className="w-full h-8 rounded-lg bg-white/10 flex items-center px-2 gap-1"><div className="w-4 h-4 rounded bg-white/20"/><div className="flex-1 h-1 bg-white/20 rounded-full"/></div>
        <div className="flex items-end gap-0.5 h-10 bg-white/5 rounded-lg px-2 py-1">
          {[3,6,4,9,5,8,4,7,3,6,8,5,4,7].map((h,i)=><div key={i} className="flex-1 rounded-full bg-white/40" style={{height:`${h*6}%`}}/>)}
        </div>
        <div className="grid grid-cols-2 gap-1">{[0,1,2,3].map(i=><div key={i} className="h-6 rounded-lg bg-white/10 flex items-center px-1.5 gap-1"><div className="w-2 h-2 rounded bg-white/30"/><div className="flex-1 h-1 bg-white/20 rounded"/></div>)}</div>
      </div>
    );
    case "delivery": return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div className="w-full h-16 rounded-xl bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 opacity-20">{Array.from({length:20}).map((_,i)=><div key={i} className="border border-white/30"/>)}</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/80 shadow-lg"/>
        </div>
        {[0,1].map(i=><div key={i} className="h-7 rounded-xl bg-white/10 flex items-center px-3 gap-2"><div className="w-2 h-2 rounded-full bg-white/40"/><div className="flex-1 h-1 bg-white/20 rounded"/><div className="w-5 h-3 rounded bg-white/20"/></div>)}
        <div className="w-full h-6 rounded-full bg-white/25 flex items-center justify-center"><div className="w-12 h-1 bg-white/60 rounded-full"/></div>
      </div>
    );
    default: return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div className="flex gap-1 items-center"><div className="flex-1 h-1.5 bg-white/25 rounded-full"/><div className="w-5 h-5 rounded-lg bg-white/20"/></div>
        <div className="grid grid-cols-2 gap-1.5">{[0,1,2,3].map(i=><div key={i} className="rounded-xl bg-white/10 overflow-hidden"><div className="h-10 bg-white/15"/><div className="p-1.5 space-y-1"><div className="h-1 bg-white/25 rounded w-3/4"/><div className="h-1 bg-white/15 rounded w-1/2"/></div></div>)}</div>
        <div className="h-5 rounded-full bg-white/25 flex items-center justify-center"><div className="w-8 h-1 bg-white/50 rounded-full"/></div>
      </div>
    );
  }
}

function Phone({ p }: { p: typeof PROJECTS[0] }) {
  const W=110, H=220, R=26, BW=2.5;
  return (
    <div className="relative flex-shrink-0" style={{width:W,height:H}}>
      {/* Glow */}
      <div className="absolute rounded-full pointer-events-none" style={{background:`radial-gradient(circle,${p.accent}60,transparent)`,width:W*1.5,height:H*0.4,bottom:-16,left:"50%",transform:"translateX(-50%)",filter:"blur(18px)"}}/>
      {/* Body */}
      <div className="absolute inset-0 overflow-hidden" style={{borderRadius:R,background:"linear-gradient(145deg,#2a2d3e,#14172a,#1c2038)",boxShadow:`0 0 0 1.5px rgba(255,255,255,0.1),0 20px 50px rgba(0,0,0,0.7),0 0 40px ${p.accent}25,inset 0 1px 0 rgba(255,255,255,0.08)`}}>
        {/* Screen */}
        <div className="absolute overflow-hidden" style={{top:BW,left:BW,right:BW,bottom:BW,borderRadius:R-BW,background:`linear-gradient(160deg,${p.top},${p.bot})`}}>
          <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 45%)"}}/>
          <PhoneUI uiType={p.uiType} top={p.top}/>
          {/* Pill notch */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full" style={{background:"rgba(0,0,0,0.5)",backdropFilter:"blur(8px)"}}>
            <div className="w-1.5 h-1.5 rounded-full" style={{background:p.accent,opacity:0.7}}/>
            <div className="w-8 h-1 rounded-full bg-white/20"/>
          </div>
          {/* Home bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-white/30"/>
        </div>
        {/* Btns */}
        <div className="absolute rounded-r-sm" style={{right:-2,top:44,width:2.5,height:20,background:"rgba(255,255,255,0.15)"}}/>
        <div className="absolute rounded-l-sm" style={{left:-2,top:34,width:2.5,height:16,background:"rgba(255,255,255,0.12)"}}/>
        <div className="absolute rounded-l-sm" style={{left:-2,top:55,width:2.5,height:16,background:"rgba(255,255,255,0.12)"}}/>
        {/* Reflection */}
        <div className="absolute inset-0 pointer-events-none" style={{borderRadius:R,background:"linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 40%)"}}/>
      </div>
    </div>
  );
}

export default function Projects() {
  const [flipped, setFlipped] = useState<number|null>(null);
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

  if (!mounted) return <section id="projects" className="py-24" style={{ background:"var(--bg-secondary)" }}/>;

  return (
    <section id="projects" ref={ref} className="relative py-24 overflow-hidden grid-bg" style={{ background:"var(--bg-secondary)" }}>
      <div className="absolute top-20 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(167,139,250,0.06),transparent)", filter:"blur(60px)" }}/>
      <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(99,228,255,0.05),transparent)", filter:"blur(60px)" }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.6s ease" }}>
          <div className="section-label justify-center mb-4">My Work</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color:"var(--text-muted)" }}>Real apps I&apos;ve designed, built, and shipped</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="relative h-[460px] cursor-pointer"
              style={{ perspective:"1200px", opacity:visible?1:0, transform:visible?"none":"translateY(28px) scale(0.96)", transition:`all 0.6s ease ${0.1+i*0.08}s` }}
              onMouseEnter={() => setFlipped(p.id)} onMouseLeave={() => setFlipped(null)}>

              <div className="relative w-full h-full"
                style={{ transform:flipped===p.id?"rotateY(180deg)":"rotateY(0deg)", transformStyle:"preserve-3d", transition:"transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}>

                {/* FRONT */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden" as any }}>
                  <div className="absolute inset-0 rounded-2xl" style={{ background:`linear-gradient(135deg,${p.accent}30,${p.bot}20)`, border:`1px solid ${p.accent}25` }}/>
                  <div className="absolute inset-[1px] rounded-[14px] flex flex-col overflow-hidden" style={{ background:"var(--bg-card)", backdropFilter:"blur(16px)" }}>
                    {/* Phone */}
                    <div className="flex-1 flex items-center justify-center py-5 px-4" style={{ background:`radial-gradient(ellipse at 50% 80%,${p.accent}12,transparent)` }}>
                      <Phone p={p}/>
                    </div>
                    {/* Divider */}
                    <div style={{ height:1, background:`linear-gradient(90deg,transparent,${p.accent}40,transparent)` }}/>
                    {/* Info */}
                    <div className="px-4 py-3.5">
                      <h3 className="text-sm font-bold mb-1 truncate" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>{p.title}</h3>
                      <p className="text-[11px] leading-relaxed mb-2.5 line-clamp-2" style={{ color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:`${p.accent}15`, color:p.accent, border:`1px solid ${p.accent}30`, fontFamily:"var(--font-body)" }}>{t}</span>
                        ))}
                        {p.tech.length>3 && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:"var(--bg-glass)", color:"var(--text-muted)", border:"1px solid var(--border-subtle)" }}>+{p.tech.length-3}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden" as any, transform:"rotateY(180deg)" }}>
                  <div className="absolute inset-0 rounded-2xl" style={{ background:`linear-gradient(135deg,${p.accent}30,${p.bot}20)`, border:`1px solid ${p.accent}25` }}/>
                  <div className="absolute inset-[1px] rounded-[14px] p-5 flex flex-col" style={{ background:"var(--bg-card)", backdropFilter:"blur(16px)" }}>
                    <div className="mb-3">
                      <h3 className="text-base font-bold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>{p.title}</h3>
                      <div className="mt-1.5 h-[2px] w-8 rounded-full" style={{ background:`linear-gradient(90deg,${p.accent},${p.bot})` }}/>
                    </div>
                    <p className="text-[12px] leading-relaxed mb-4" style={{ color:"var(--text-secondary)", fontFamily:"var(--font-body)" }}>{p.desc}</p>
                    <div className="mb-3">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color:"var(--text-muted)" }}>Key Features</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {p.features.map(f => (
                          <div key={f} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background:`${p.accent}12`, border:`1px solid ${p.accent}20` }}>
                            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:p.accent }}/>
                            <span className="text-[10px] font-medium" style={{ color:p.accent, fontFamily:"var(--font-body)" }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color:"var(--text-muted)" }}>Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map(t => (
                          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full" style={{ background:"var(--bg-glass)", color:"var(--text-secondary)", border:"1px solid var(--border-subtle)", fontFamily:"var(--font-body)" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl transition-opacity duration-500" style={{ background:`linear-gradient(135deg,${p.accent}35,transparent)`, filter:"blur(20px)", opacity:flipped===p.id?0.5:0.15 }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}