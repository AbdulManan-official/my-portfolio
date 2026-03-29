"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const T = [
  { id:1, name:"Sarah Johnson",  role:"CEO",             company:"FitnessTech Inc.",  content:"Abdul delivered an exceptional Flutter app that exceeded our expectations. His attention to detail and technical expertise made the entire process seamless.",   rating:5, avatar:"SJ", accent:"#0284c7", avatarBg:"rgba(2,132,199,0.12)",  avatarColor:"#0284c7" },
  { id:2, name:"Michael Chen",   role:"Product Manager", company:"FoodHub Solutions", content:"Working with Abdul was a game-changer for our food delivery platform. The app is fast, intuitive, and our users absolutely love it.",                           rating:5, avatar:"MC", accent:"#7c3aed", avatarBg:"rgba(124,58,237,0.12)", avatarColor:"#7c3aed" },
  { id:3, name:"Emma Williams",  role:"CTO",             company:"FinanceWise",       content:"Professional, skilled, and incredibly responsive. Abdul built our finance app with top-notch security and beautiful UI. Highly recommended.",                    rating:5, avatar:"EW", accent:"#059669", avatarBg:"rgba(5,150,105,0.12)",  avatarColor:"#059669" },
  { id:4, name:"David Brown",    role:"Founder",         company:"ChatNow",           content:"The real-time app Abdul created is robust and scalable. His expertise in mobile development and clean architecture is truly impressive.",                        rating:5, avatar:"DB", accent:"#db2777", avatarBg:"rgba(219,39,119,0.12)", avatarColor:"#db2777" },
  { id:5, name:"Lisa Anderson",  role:"Director",        company:"EduLearn",          content:"Our e-learning platform came to life thanks to Abdul's exceptional skills. Students and teachers alike praise the app's functionality and design.",               rating:5, avatar:"LA", accent:"#0284c7", avatarBg:"rgba(2,132,199,0.12)",  avatarColor:"#0284c7" },
];

export default function Testimonials() {
  const [current,   setCurrent]   = useState(0);
  const [visible,   setVisible]   = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const ref      = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % T.length), 5000);
  };

  const go = (n: number) => { setCurrent((n + T.length) % T.length); resetTimer(); };
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (!mounted) return;
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mounted]);

  const onTouchStart = (e: React.TouchEvent) => setDragStart(e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    setDragStart(null);
  };

  if (!mounted) return <section id="testimonials" style={{ minHeight: 400 }} />;

  const t = T[current];

  return (
    <>
      <style>{`
        /* ── Theme tokens ── */
        :root {
          --testi-card-bg:      rgba(255,255,255,0.92);
          --testi-card-border:  rgba(15,23,42,0.1);
          --testi-quote-color:  #334155;
          --testi-name-color:   #0f172a;
          --testi-meta-color:   #64748b;
          --testi-label-color:  #64748b;
          --testi-ctrl-bg:      rgba(255,255,255,0.9);
          --testi-ctrl-border:  rgba(15,23,42,0.14);
          --testi-dot-off:      rgba(15,23,42,0.15);
          --testi-divider:      rgba(15,23,42,0.09);
          --testi-glow:         rgba(2,132,199,0.04);
          --testi-label-line:   rgba(15,23,42,0.15);
        }
        [data-theme="dark"] {
          --testi-card-bg:      rgba(12,18,35,0.85);
          --testi-card-border:  rgba(255,255,255,0.09);
          --testi-quote-color:  #94a3b8;
          --testi-name-color:   #f1f5f9;
          --testi-meta-color:   #64748b;
          --testi-label-color:  #64748b;
          --testi-ctrl-bg:      rgba(12,18,35,0.85);
          --testi-ctrl-border:  rgba(255,255,255,0.1);
          --testi-dot-off:      rgba(255,255,255,0.15);
          --testi-divider:      rgba(255,255,255,0.08);
          --testi-glow:         rgba(2,132,199,0.05);
          --testi-label-line:   rgba(255,255,255,0.12);
        }

        /* ── Reveal ── */
        .testi-reveal {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .testi-reveal.in { opacity: 1; transform: translateY(0); }

        /* ── Card ── */
        .testi-card {
          background: var(--testi-card-bg);
          border: 1px solid var(--testi-card-border);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-height: 260px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        /* ── Quote text ── */
        .testi-quote {
          font-size: 15px;
          line-height: 1.82;
          color: var(--testi-quote-color);
          font-family: var(--font-body);
          flex: 1;
        }

        /* ── Author name ── */
        .testi-name {
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-display);
          color: var(--testi-name-color);
        }

        /* ── Author meta ── */
        .testi-meta {
          font-size: 12px;
          color: var(--testi-meta-color);
          font-family: var(--font-body);
          margin-top: 2px;
        }

        /* ── Avatar ── */
        .testi-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          font-family: var(--font-display);
          flex-shrink: 0;
          border: 1.5px solid transparent;
        }

        /* ── Control button ── */
        .testi-ctrl-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: var(--testi-ctrl-bg);
          border: 1px solid var(--testi-ctrl-border);
          color: var(--testi-name-color);
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .testi-ctrl-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(2,132,199,0.15);
        }

        /* ── Dot ── */
        .testi-dot {
          height: 7px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
          padding: 0;
        }
      `}</style>

      <section
        id="testimonials"
        ref={ref}
        className="relative py-24 overflow-hidden grid-bg"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, var(--testi-glow), transparent)" }}/>

        {/* Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(2,132,199,0.05),transparent)", filter:"blur(70px)" }}/>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(124,58,237,0.05),transparent)", filter:"blur(70px)" }}/>

        <div className="relative z-10 max-w-2xl mx-auto px-5">

          {/* ── Header ── */}
          <div className={`testi-reveal ${visible?"in":""} text-center mb-12`}>
            {/* Label */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:14 }}>
              <div style={{ flex:1, maxWidth:48, height:"0.5px", background:"var(--testi-label-line)" }}/>
              <span style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--font-display)", fontWeight:600, color:"var(--testi-label-color)" }}>
                Social Proof
              </span>
              <div style={{ flex:1, maxWidth:48, height:"0.5px", background:"var(--testi-label-line)" }}/>
            </div>

            <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.6rem)", color:"var(--text-primary)", marginBottom:8 }}>
              Client{" "}
              <span style={{ background:"linear-gradient(135deg,#0284c7,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Testimonials
              </span>
            </h2>
            <p style={{ fontSize:14, color:"var(--testi-meta-color)", fontFamily:"var(--font-body)" }}>
              What clients say about working with me
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            className={`testi-reveal ${visible?"in":""}`}
            style={{ transitionDelay:"0.15s" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Track */}
            <div style={{ overflow:"hidden", width:"100%", borderRadius:20 }}>
              <div style={{
                display:"flex",
                transition:"transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                transform:`translateX(-${current * 100}%)`,
                willChange:"transform",
              }}>
                {T.map((item) => (
                  <div key={item.id} style={{ flex:"0 0 100%", padding:"0 2px" }}>
                    <div className="testi-card" style={{ borderColor: `${item.accent}22` }}>

                      {/* Top accent bar */}
                      <div style={{ height:3, borderRadius:3, background:`linear-gradient(90deg,${item.accent},transparent)`, width:"100%" }}/>

                      {/* Stars */}
                      <div style={{ display:"flex", gap:4 }}>
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <svg key={i} style={{ width:15, height:15 }} fill="#f59e0b" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="testi-quote">&ldquo;{item.content}&rdquo;</p>

                      {/* Author */}
                      <div style={{
                        display:"flex", alignItems:"center", gap:12,
                        paddingTop:16,
                        borderTop:`1px solid var(--testi-divider)`,
                      }}>
                        <div
                          className="testi-avatar"
                          style={{
                            background: item.avatarBg,
                            color: item.avatarColor,
                            borderColor: `${item.accent}30`,
                          }}
                        >
                          {item.avatar}
                        </div>
                        <div>
                          <div className="testi-name">{item.name}</div>
                          <div className="testi-meta">{item.role} · {item.company}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Controls ── */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:"1.25rem" }}>

              <button
                onClick={prev}
                aria-label="Previous"
                className="testi-ctrl-btn"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = t.accent; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--testi-ctrl-border)"; }}
              >
                <ChevronLeft size={17}/>
              </button>

              {/* Dots */}
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                {T.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Testimonial ${i+1}`}
                    className="testi-dot"
                    style={{
                      width: i === current ? 24 : 7,
                      background: i === current ? T[i].accent : "var(--testi-dot-off)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next"
                className="testi-ctrl-btn"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = t.accent; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--testi-ctrl-border)"; }}
              >
                <ChevronRight size={17}/>
              </button>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}