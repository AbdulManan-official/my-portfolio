"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  { id:1, name:"Sarah Johnson", role:"CEO", company:"FitnessTech Inc.", content:"Abdul delivered an exceptional Flutter app that exceeded our expectations. His attention to detail and technical expertise made the entire process seamless.", rating:5, avatar:"SJ", accent:"from-cyan-500 to-blue-500" },
  { id:2, name:"Michael Chen", role:"Product Manager", company:"FoodHub Solutions", content:"Working with Abdul was a game-changer for our food delivery platform. The app is fast, intuitive, and our users absolutely love it.", rating:5, avatar:"MC", accent:"from-orange-500 to-red-500" },
  { id:3, name:"Emma Williams", role:"CTO", company:"FinanceWise", content:"Professional, skilled, and incredibly responsive. Abdul built our finance app with top-notch security and beautiful UI. Highly recommended.", rating:5, avatar:"EW", accent:"from-green-500 to-emerald-500" },
  { id:4, name:"David Brown", role:"Founder", company:"ChatNow", content:"The real-time app Abdul created is robust and scalable. His expertise in mobile development and clean architecture is truly impressive.", rating:5, avatar:"DB", accent:"from-purple-500 to-pink-500" },
  { id:5, name:"Lisa Anderson", role:"Director", company:"EduLearn", content:"Our e-learning platform came to life thanks to Abdul's exceptional skills. Students and teachers alike praise the app's functionality and design.", rating:5, avatar:"LA", accent:"from-indigo-500 to-purple-500" },
];

function getStyle(index: number, current: number, total: number): React.CSSProperties {
  const abs = ((index - current + total) % total);
  if (abs === 0) return { transform:"translateX(0%) rotateY(0deg) scale(1)", opacity:1, zIndex:50 };
  if (abs === 1) return { transform:"translateX(75%) rotateY(-28deg) scale(0.84)", opacity:0.55, zIndex:40 };
  if (abs === total-1) return { transform:"translateX(-75%) rotateY(28deg) scale(0.84)", opacity:0.55, zIndex:40 };
  if (abs === 2) return { transform:"translateX(130%) rotateY(-38deg) scale(0.68)", opacity:0.22, zIndex:30 };
  if (abs === total-2) return { transform:"translateX(-130%) rotateY(38deg) scale(0.68)", opacity:0.22, zIndex:30 };
  return { transform:"scale(0.5)", opacity:0, zIndex:10 };
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);
  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setCurrent(c => (c+1)%TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [mounted]);

  if (!mounted) return <section id="testimonials" className="py-24" style={{ background:"var(--bg-primary)" }}/>;

  return (
    <section id="testimonials" ref={ref} className="relative py-24 overflow-hidden grid-bg" style={{ background:"var(--bg-primary)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(167,139,250,0.05),transparent)" }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-16" style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.6s ease" }}>
          <div className="section-label justify-center mb-4">Social Proof</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color:"var(--text-muted)" }}>What clients say about working with me</p>
        </div>

        {/* Carousel */}
        <div style={{ opacity:visible?1:0, transform:visible?"none":"translateY(24px)", transition:"all 0.6s ease 0.2s" }}>
          <div className="relative h-[460px] md:h-[400px]" style={{ perspective:"2000px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id}
                className="absolute top-1/2 left-1/2 w-full"
                style={{
                  maxWidth:"48rem",
                  marginLeft:"-24rem",
                  ...getStyle(i, current, TESTIMONIALS.length),
                  transformStyle:"preserve-3d",
                  transition:"all 0.7s cubic-bezier(0.32,0.72,0,1)",
                  marginTop: "-11rem",
                }}
              >
                {/* Card */}
                <div className={`relative bg-gradient-to-br ${t.accent} p-[1.5px] rounded-2xl`}>
                  <div className="relative rounded-[14px] p-7 md:p-9" style={{ background:"var(--bg-card)", backdropFilter:"blur(20px)" }}>
                    <div className="absolute top-5 right-5" style={{ opacity:0.05 }}>
                      <Quote size={72} strokeWidth={1.5} style={{ color:"var(--text-primary)" }}/>
                    </div>
                    <div className="relative z-10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-5">
                        {Array.from({length:t.rating}).map((_,si)=>(
                          <svg key={si} className="w-4 h-4" fill="#fbbf24" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                      <p className="text-base md:text-lg leading-relaxed mb-7" style={{ color:"var(--text-secondary)", fontFamily:"var(--font-body)" }}>
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div className="flex items-center gap-4">
                        <div className={`w-13 h-13 w-12 h-12 rounded-full bg-gradient-to-br ${t.accent} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`} style={{ fontFamily:"var(--font-display)" }}>
                          {t.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-base" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>{t.name}</div>
                          <div className="text-xs" style={{ color:"var(--text-muted)" }}>{t.role} at {t.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${t.accent} rounded-2xl`} style={{ filter:"blur(24px)", opacity:0.15 }}/>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button onClick={() => setCurrent(c=>(c-1+TESTIMONIALS.length)%TESTIMONIALS.length)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background:"var(--bg-card)", border:"1px solid var(--border-subtle)", color:"var(--text-primary)" }}
              aria-label="Previous">
              <ChevronLeft size={18}/>
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_,i)=>(
                <button key={i} onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{ width: i===current?28:8, height:8, background: i===current?"var(--accent-cyan)":"var(--border-subtle)" }}
                  aria-label={`Testimonial ${i+1}`}/>
              ))}
            </div>

            <button onClick={() => setCurrent(c=>(c+1)%TESTIMONIALS.length)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background:"var(--bg-card)", border:"1px solid var(--border-subtle)", color:"var(--text-primary)" }}
              aria-label="Next">
              <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}