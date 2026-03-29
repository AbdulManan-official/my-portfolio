"use client";
import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { id:1, title:"Tasbeeh Max",          desc:"Spiritual companion for Muslims — Tasbeeh counter, Qibla direction, Prayer Times, Dua collections, offline Hive storage.",                          tech:["Flutter","Dart","Hive","Notifications"],          features:["Digital Counter","Qibla Finder","Prayer Times","Dua Library"],    accent:"#818cf8", top:"#6366f1", bot:"#9333ea", ui:"spiritual"  },
  { id:2, title:"VPN Max & Shield VPN", desc:"Flutter VPN apps with fast server switching, connection monitoring, data usage tracking, and a polished modern UI.",                                  tech:["Flutter","Dart","Firebase","Networking"],          features:["Server Switching","Connection Monitor","Data Tracking","Modern UI"], accent:"#38bdf8", top:"#3b82f6", bot:"#06b6d4", ui:"vpn"       },
  { id:3, title:"Video to Audio Converter", desc:"Advanced media converter — audio extraction, batch processing, live waveform playback, and ringtone maker with SIM assignment.",               tech:["Flutter","Dart","SharedPrefs","Media APIs"],       features:["Batch Convert","Waveform View","Ringtone Maker","Media Merge"],  accent:"#34d399", top:"#10b981", bot:"#0d9488", ui:"media"     },
  { id:4, title:"Parcel Delivery App",  desc:"Full delivery platform with custom routes, provider & customer roles, real-time chat for negotiation, and admin dashboard.",                        tech:["Flutter","Dart","Firebase","Cloudinary"],          features:["Custom Routes","Dual Roles","Real-time Chat","Admin Panel"],    accent:"#fb923c", top:"#f97316", bot:"#ef4444", ui:"delivery"  },
  { id:5, title:"BNPL E-Commerce App",  desc:"Buy Now Pay Later platform with flexible payment plans, COD support, instalment tracking, and full admin dashboard.",                                tech:["Flutter","Dart","Firebase","Stripe"],              features:["BNPL Plans","COD Support","Instalment Track","Admin Panel"],   accent:"#c084fc", top:"#a855f7", bot:"#ec4899", ui:"ecommerce" },
  { id:6, title:"E-Commerce Mobile App",desc:"Feature-rich e-commerce app — product catalog, cart, order tracking, secure auth, and seamless payment integration.",                              tech:["Flutter","Dart","Firebase","Firestore"],            features:["Product Catalog","Cart System","Order Tracking","Secure Auth"],  accent:"#fbbf24", top:"#f59e0b", bot:"#f97316", ui:"ecommerce2"},
];

function PhoneUI({ ui }: { ui: string }) {
  const w = "rgba(255,255,255,";
  switch (ui) {
    case "spiritual": return (
      <div className="flex flex-col items-center gap-2 px-3 pt-10">
        <div style={{width:36,height:36,borderRadius:"50%",border:`2px solid ${w}0.3)`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:20,height:20,borderRadius:"50%",background:w+"0.3)"}} /></div>
        <div style={{height:6,width:64,borderRadius:3,background:w+"0.25)"}} />
        <div style={{height:4,width:40,borderRadius:2,background:w+"0.15)"}} />
        <div style={{width:80,height:80,borderRadius:"50%",border:`4px solid ${w}0.25)`,display:"flex",alignItems:"center",justifyContent:"center",marginTop:4}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:w+"0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:w+"0.9)",fontSize:10,fontWeight:700}}>99</span></div>
        </div>
        <div style={{display:"flex",gap:6,marginTop:4}}>{[0,1,2].map(k=><div key={k} style={{width:28,height:20,borderRadius:6,background:w+"0.15)"}} />)}</div>
      </div>
    );
    case "vpn": return (
      <div className="flex flex-col items-center gap-2 px-3 pt-10">
        <div style={{height:6,width:64,borderRadius:3,background:w+"0.25)"}} />
        <div style={{width:80,height:80,borderRadius:"50%",border:`4px solid ${w}0.2)`,display:"flex",alignItems:"center",justifyContent:"center",marginTop:4}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:w+"0.22)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:18,height:22,border:`2px solid ${w}0.7)`,borderRadius:4}} /></div>
        </div>
        <div style={{height:4,width:48,borderRadius:2,background:w+"0.2)"}} />
        <div style={{display:"flex",gap:5,marginTop:4}}>{[0,1,2,3].map(k=><div key={k} style={{width:18,height:22,borderRadius:5,background:w+"0.12)",border:`1px solid ${w}0.18)`}} />)}</div>
      </div>
    );
    case "media": return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div style={{width:"100%",height:28,borderRadius:8,background:w+"0.12)",display:"flex",alignItems:"center",padding:"0 8px",gap:6}}><div style={{width:16,height:16,borderRadius:4,background:w+"0.22)"}} /><div style={{flex:1,height:4,borderRadius:2,background:w+"0.2)"}} /></div>
        <div style={{display:"flex",alignItems:"flex-end",gap:2,height:40,background:w+"0.06)",borderRadius:8,padding:"4px 8px"}}>{[3,6,4,9,5,8,4,7,3,6,8,5,4,7].map((h,k)=><div key={k} style={{flex:1,borderRadius:2,background:w+"0.45)",height:`${h*6}%`}} />)}</div>
        <div className="grid grid-cols-2 gap-1">{[0,1,2,3].map(k=><div key={k} style={{height:22,borderRadius:6,background:w+"0.12)",display:"flex",alignItems:"center",padding:"0 6px",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:w+"0.3)"}} /><div style={{flex:1,height:4,borderRadius:2,background:w+"0.2)"}} /></div>)}</div>
      </div>
    );
    case "delivery": return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div style={{width:"100%",height:64,borderRadius:10,background:w+"0.12)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,display:"grid",gridTemplateColumns:"repeat(5,1fr)",gridTemplateRows:"repeat(4,1fr)",opacity:0.18}}>{Array.from({length:20}).map((_,k)=><div key={k} style={{border:`1px solid ${w}0.35)`}} />)}</div>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:12,height:12,borderRadius:"50%",background:w+"0.85)"}} />
        </div>
        {[0,1].map(k=><div key={k} style={{height:26,borderRadius:8,background:w+"0.1)",display:"flex",alignItems:"center",padding:"0 10px",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:w+"0.4)"}} /><div style={{flex:1,height:4,borderRadius:2,background:w+"0.2)"}} /><div style={{width:20,height:12,borderRadius:4,background:w+"0.22)"}} /></div>)}
        <div style={{height:22,borderRadius:100,background:w+"0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:32,height:4,borderRadius:2,background:w+"0.55)"}} /></div>
      </div>
    );
    default: return (
      <div className="flex flex-col gap-2 px-3 pt-10">
        <div style={{display:"flex",gap:4,alignItems:"center"}}><div style={{flex:1,height:6,borderRadius:3,background:w+"0.25)"}} /><div style={{width:20,height:20,borderRadius:5,background:w+"0.22)"}} /></div>
        <div className="grid grid-cols-2 gap-1.5">{[0,1,2,3].map(k=><div key={k} style={{borderRadius:10,overflow:"hidden",background:w+"0.12)"}}><div style={{height:36,background:w+"0.18)"}} /><div style={{padding:6,display:"flex",flexDirection:"column",gap:3}}><div style={{height:4,width:"75%",borderRadius:2,background:w+"0.28)"}} /><div style={{height:3,width:"50%",borderRadius:2,background:w+"0.18)"}} /></div></div>)}</div>
        <div style={{height:20,borderRadius:100,background:w+"0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:28,height:4,borderRadius:2,background:w+"0.55)"}} /></div>
      </div>
    );
  }
}

function Phone({ p }: { p: typeof PROJECTS[0] }) {
  const W=112, H=224, R=26, BW=2.5;
  return (
    <div style={{ position:"relative", width:W, height:H, flexShrink:0 }}>
      <div style={{ position:"absolute", borderRadius:R+8, background:`radial-gradient(circle,${p.accent}55,transparent)`, width:W*1.5, height:H*0.35, bottom:-14, left:"50%", transform:"translateX(-50%)", filter:"blur(18px)" }} />
      <div style={{ position:"absolute", inset:0, borderRadius:R, overflow:"hidden", background:"linear-gradient(145deg,#252838,#14172a,#1a1d30)", boxShadow:`0 0 0 1.5px rgba(255,255,255,0.10),0 20px 50px rgba(0,0,0,0.7),0 0 40px ${p.accent}28,inset 0 1px 0 rgba(255,255,255,0.09)` }}>
        <div style={{ position:"absolute", top:BW, left:BW, right:BW, bottom:BW, borderRadius:R-BW, overflow:"hidden", background:`linear-gradient(160deg,${p.top},${p.bot})` }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.16) 0%,transparent 45%)" }} />
          <div style={{ position:"absolute", top:5, left:"50%", transform:"translateX(-50%)", zIndex:20, display:"flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:100, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:p.top, opacity:0.8 }} />
            <div style={{ width:28, height:5, borderRadius:3, background:"rgba(255,255,255,0.22)" }} />
          </div>
          <div style={{ position:"absolute", inset:0 }}><PhoneUI ui={p.ui} /></div>
          <div style={{ position:"absolute", bottom:5, left:"50%", transform:"translateX(-50%)", width:32, height:3, borderRadius:2, background:"rgba(255,255,255,0.3)" }} />
        </div>
        <div style={{ position:"absolute", right:-2, top:44, width:2.5, height:20, borderRadius:"0 3px 3px 0", background:"rgba(255,255,255,0.14)" }} />
        <div style={{ position:"absolute", left:-2, top:34, width:2.5, height:16, borderRadius:"3px 0 0 3px", background:"rgba(255,255,255,0.11)" }} />
        <div style={{ position:"absolute", left:-2, top:55, width:2.5, height:16, borderRadius:"3px 0 0 3px", background:"rgba(255,255,255,0.11)" }} />
      </div>
    </div>
  );
}

export default function Projects() {
  const [flipped,  setFlipped]  = useState<number | null>(null);
  const [visible,  setVisible]  = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  const handleCardInteraction = (id: number) => {
    if (isMobile) setFlipped(prev => prev === id ? null : id);
  };

  if (!mounted) return <section id="projects" style={{ background:"var(--bg-secondary)", minHeight:400 }} />;

  return (
    <>
      <style>{`

        /* ── Theme tokens for text/borders ──────────────────── */
        :root {
          /* Card title */
          --proj-title-color:   #0f172a;
          /* Description text */
          --proj-desc-color:    #334155;
          /* Tech tag in front card */
          --proj-tag-bg:        rgba(15,23,42,0.06);
          --proj-tag-border:    rgba(15,23,42,0.18);
          --proj-tag-color:     #1e293b;
          /* Tech tag on back card */
          --proj-tag-back-bg:   rgba(15,23,42,0.05);
          --proj-tag-back-border: rgba(15,23,42,0.15);
          --proj-tag-back-color:  #334155;
          /* Section label */
          --proj-label-color:   #475569;
          /* Feature item */
          --proj-feat-color:    #1e293b;
          /* Desc border left */
          --proj-desc-border:   rgba(15,23,42,0.15);
          /* Card outer border */
          --proj-card-border:   rgba(15,23,42,0.12);
          /* Muted */
          --proj-muted:         #64748b;
        }
        [data-theme="dark"] {
          --proj-title-color:   #f1f5f9;
          --proj-desc-color:    #94a3b8;
          --proj-tag-bg:        rgba(255,255,255,0.06);
          --proj-tag-border:    rgba(255,255,255,0.14);
          --proj-tag-color:     #cbd5e1;
          --proj-tag-back-bg:   rgba(255,255,255,0.05);
          --proj-tag-back-border: rgba(255,255,255,0.12);
          --proj-tag-back-color:  #94a3b8;
          --proj-label-color:   #64748b;
          --proj-feat-color:    #e2e8f0;
          --proj-desc-border:   rgba(255,255,255,0.12);
          --proj-card-border:   rgba(255,255,255,0.09);
          --proj-muted:         #64748b;
        }

        /* ── Reveal ── */
        .proj-reveal {
          opacity:0; transform:translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .proj-reveal.in { opacity:1; transform:translateY(0); }

        /* ── Card wrapper ── */
        .proj-card-wrap {
          position:relative; height:460px;
          cursor:pointer; perspective:1200px;
          opacity:0; transform:translateY(28px) scale(0.96);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .proj-card-wrap.in { opacity:1; transform:translateY(0) scale(1); }

        /* ── Flip ── */
        .proj-flip {
          position:relative; width:100%; height:100%;
          transform-style:preserve-3d;
          transition:transform 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .proj-flip.flipped { transform:rotateY(180deg); }

        /* ── Face shared ── */
        .proj-face {
          position:absolute; inset:0; border-radius:18px;
          overflow:hidden; backface-visibility:hidden;
          -webkit-backface-visibility:hidden;
        }
        .proj-face-back { transform:rotateY(180deg); }

        /* ── Border wrapper ── */
        .proj-border {
          position:absolute; inset:0; border-radius:18px;
          border:1px solid var(--proj-card-border);
        }

        /* ── Inner bg ── */
        .proj-inner {
          position:absolute; inset:1px; border-radius:16px;
          background:var(--bg-card);
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
        }

        /* ── Front card title ── */
        .proj-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: var(--proj-title-color);
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Front card desc ── */
        .proj-card-desc {
          font-size: 11px;
          line-height: 1.65;
          color: var(--proj-desc-color);
          font-family: var(--font-body);
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Tech tag — FRONT (accent-colored) ── */
        .proj-tag-accent {
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 100px;
          font-family: var(--font-body);
          font-weight: 600;
          white-space: nowrap;
          /* color & bg set inline per card via accent */
        }

        /* ── Tech tag — BACK (neutral) ── */
        .proj-tag-neutral {
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 100px;
          font-family: var(--font-body);
          font-weight: 600;
          white-space: nowrap;
          background: var(--proj-tag-back-bg);
          border: 1px solid var(--proj-tag-back-border);
          color: var(--proj-tag-back-color);
        }

        /* ── Overflow neutral tag ── */
        .proj-tag-more {
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 100px;
          font-family: var(--font-body);
          font-weight: 600;
          white-space: nowrap;
          background: var(--proj-tag-bg);
          border: 1px solid var(--proj-tag-border);
          color: var(--proj-tag-color);
        }

        /* ── Back card title ── */
        .proj-back-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14.5px;
          color: var(--proj-title-color);
          margin-bottom: 6px;
        }

        /* ── Back card desc ── */
        .proj-back-desc {
          font-size: 12px;
          line-height: 1.75;
          color: var(--proj-desc-color);
          font-family: var(--font-body);
          margin-bottom: 16px;
          padding-left: 10px;
          border-left: 2px solid var(--proj-desc-border);
        }

        /* ── Section label ── */
        .proj-section-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--proj-label-color);
          margin-bottom: 8px;
          font-family: var(--font-display);
        }

        /* ── Feature item ── */
        .proj-feature {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          border-radius: 8px;
        }
        .proj-feature-text {
          font-size: 10px;
          font-weight: 600;
          font-family: var(--font-body);
          color: var(--proj-feat-color);
        }
        /* Override feat text in dark — accent color looks good */
        [data-theme="dark"] .proj-feature-text {
          color: var(--proj-feat-color);
        }

        /* ── Glow ── */
        .proj-glow {
          position:absolute; inset:0; z-index:-1;
          border-radius:18px; filter:blur(20px);
          transition:opacity 0.5s ease;
        }

        /* ── Mobile tap hint ── */
        .proj-tap-hint {
          position:absolute; bottom:10px; right:12px;
          font-size:9px; font-weight:600;
          letter-spacing:0.1em; text-transform:uppercase;
          color:var(--proj-muted); font-family:var(--font-display);
          pointer-events:none;
        }
      `}</style>

      <section id="projects" ref={ref} className="relative py-24 overflow-hidden grid-bg"
        style={{ background:"var(--bg-secondary)" }}>

        {/* Orbs */}
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(167,139,250,0.06),transparent)", filter:"blur(60px)" }}/>
        <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(99,228,255,0.05),transparent)", filter:"blur(60px)" }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className={`proj-reveal ${visible?"in":""} text-center mb-16`}>
            <div className="section-label justify-center mb-4">My Work</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(2rem,4vw,3rem)", color:"var(--text-primary)" }}>
              Featured{" "}
              <span style={{ background:"linear-gradient(135deg,#0284c7,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Projects
              </span>
            </h2>
            <p style={{ marginTop:8, fontSize:14, color:"var(--proj-muted)", fontFamily:"var(--font-body)" }}>
              Real apps I&apos;ve designed, built, and shipped
            </p>
            <p className="md:hidden" style={{ marginTop:4, fontSize:11, color:"var(--proj-muted)", fontFamily:"var(--font-body)" }}>
              Tap a card to see details
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => {
              const isFlipped = flipped === p.id;
              return (
                <div
                  key={p.id}
                  className={`proj-card-wrap ${visible?"in":""}`}
                  style={{ transitionDelay:`${0.1 + i * 0.08}s` }}
                  onMouseEnter={() => !isMobile && setFlipped(p.id)}
                  onMouseLeave={() => !isMobile && setFlipped(null)}
                  onClick={() => handleCardInteraction(p.id)}
                >
                  <div className={`proj-flip ${isFlipped?"flipped":""}`}>

                    {/* ══ FRONT ══ */}
                    <div className="proj-face">
                      <div className="proj-border" style={{ background:`linear-gradient(135deg,${p.accent}25,${p.bot}18)` }}/>
                      <div className="proj-inner" style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>

                        {/* Phone */}
                        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px 16px", background:`radial-gradient(ellipse at 50% 80%,${p.accent}12,transparent)` }}>
                          <Phone p={p}/>
                        </div>

                        {/* Separator */}
                        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${p.accent}30,transparent)` }}/>

                        {/* Info */}
                        <div style={{ padding:"12px 16px 14px" }}>
                          <h3 className="proj-card-title">{p.title}</h3>
                          <p className="proj-card-desc">{p.desc}</p>

                          {/* Tech tags — accent tinted */}
                          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                            {p.tech.slice(0,3).map(t => (
                              <span key={t} className="proj-tag-accent" style={{
                                background:`${p.accent}18`,
                                border:`1px solid ${p.accent}35`,
                                color: p.accent,
                              }}>{t}</span>
                            ))}
                            {p.tech.length > 3 && (
                              <span className="proj-tag-more">+{p.tech.length-3}</span>
                            )}
                          </div>
                        </div>

                        <div className="proj-tap-hint md:hidden">tap to flip</div>
                      </div>
                    </div>

                    {/* ══ BACK ══ */}
                    <div className="proj-face proj-face-back">
                      <div className="proj-border" style={{ background:`linear-gradient(135deg,${p.accent}25,${p.bot}18)` }}/>
                      <div className="proj-inner" style={{ padding:20, display:"flex", flexDirection:"column" }}>

                        {/* Title + accent bar */}
                        <div style={{ marginBottom:12 }}>
                          <h3 className="proj-back-title">{p.title}</h3>
                          <div style={{ height:2, width:32, borderRadius:1, background:`linear-gradient(90deg,${p.accent},${p.bot})` }}/>
                        </div>

                        {/* Desc */}
                        <p className="proj-back-desc" style={{ borderLeftColor:`${p.accent}45` }}>{p.desc}</p>

                        {/* Features */}
                        <div style={{ marginBottom:14 }}>
                          <p className="proj-section-label">Key Features</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {p.features.map(f => (
                              <div key={f} className="proj-feature" style={{
                                background:`${p.accent}12`,
                                border:`1px solid ${p.accent}25`,
                              }}>
                                <div style={{ width:5, height:5, borderRadius:"50%", flexShrink:0, background:p.accent }}/>
                                <span className="proj-feature-text">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <p className="proj-section-label">Tech Stack</p>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                            {p.tech.map(t => (
                              <span key={t} className="proj-tag-neutral">{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="proj-tap-hint md:hidden">tap to go back</div>
                      </div>
                    </div>
                  </div>

                  {/* Glow */}
                  <div className="proj-glow" style={{
                    background:`linear-gradient(135deg,${p.accent}35,transparent)`,
                    opacity: isFlipped ? 0.5 : 0.12,
                  }}/>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}