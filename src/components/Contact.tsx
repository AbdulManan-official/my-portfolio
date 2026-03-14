"use client";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { submitContactForm } from "@/lib/firebase";

const CONTACT_INFO = [
  { icon:Mail,  label:"Email",    value:"abdullmananan7777@gmail.com", href:"mailto:abdullmananan7777@gmail.com", accent:"#63e4ff" },
  { icon:Phone, label:"Phone",    value:"+92 319 5542740",             href:"tel:+923195542740",                  accent:"#a78bfa" },
  { icon:MapPin,label:"Location", value:"Sialkot, Pakistan",           href:"#",                                  accent:"#f472b6" },
];

const SOCIALS = [
  { icon:Github,   label:"GitHub",   href:"https://github.com/AbdulManan-official",              accent:"#6b7280" },
  { icon:Linkedin, label:"LinkedIn", href:"https://www.linkedin.com/in/abdul-manan-a96351254/",  accent:"#0ea5e9" },
  { icon:Mail,     label:"Email",    href:"mailto:abdullmananan7777@gmail.com",                   accent:"#f472b6" },
];

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [errors, setErrors] = useState({ name:"", email:"", message:"" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const validate = () => {
    const e = { name:"", email:"", message:"" };
    let ok = true;
    if (!form.name.trim() || form.name.trim().length<2) { e.name="Name must be at least 2 characters"; ok=false; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email="Please enter a valid email"; ok=false; }
    if (!form.message.trim() || form.message.trim().length<10) { e.message="Message must be at least 10 characters"; ok=false; }
    setErrors(e);
    return ok;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const r = await submitContactForm(form);
      if (r.success) { setStatus("success"); setForm({ name:"", email:"", message:"" }); setErrors({ name:"", email:"", message:"" }); }
      else { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors]) setErrors(er => ({ ...er, [e.target.name]:"" }));
  };

  const inputStyle = (err: string): React.CSSProperties => ({
    width:"100%", padding:"12px 16px", borderRadius:12, fontSize:14,
    fontFamily:"var(--font-body)", color:"var(--text-primary)",
    background:"var(--bg-glass)", outline:"none",
    border:`1px solid ${err ? "#ef4444" : "var(--border-subtle)"}`,
    transition:"border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <section id="contact" className="relative py-24 overflow-hidden grid-bg" style={{ background:"var(--bg-secondary)" }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(99,228,255,0.05),transparent)", filter:"blur(80px)" }}/>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(167,139,250,0.05),transparent)", filter:"blur(80px)" }}/>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-4">Get in Touch</div>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:"var(--text-primary)" }}>
            Let&apos;s Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="mt-3 text-sm max-w-xl mx-auto" style={{ color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>
            Have a project in mind or just want to talk? Drop me a message — I usually reply within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* FORM */}
          <div className="card-glass p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ background:"linear-gradient(135deg,#10b981,#34d399)" }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-gradient" style={{ fontFamily:"var(--font-display)" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color:"var(--text-secondary)" }}>Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                <button onClick={() => setStatus("idle")} className="btn-primary px-6 py-2.5 text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily:"var(--font-display)", color:"var(--text-muted)" }}>Name</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" style={inputStyle(errors.name)}
                    onFocus={e => { e.target.style.borderColor="var(--border-glow)"; e.target.style.boxShadow="0 0 0 3px rgba(99,228,255,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor=errors.name?"#ef4444":"var(--border-subtle)"; e.target.style.boxShadow="none"; }}/>
                  {errors.name && <p className="text-xs mt-1" style={{ color:"#f87171" }}>{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily:"var(--font-display)", color:"var(--text-muted)" }}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" style={inputStyle(errors.email)}
                    onFocus={e => { e.target.style.borderColor="var(--border-glow)"; e.target.style.boxShadow="0 0 0 3px rgba(99,228,255,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor=errors.email?"#ef4444":"var(--border-subtle)"; e.target.style.boxShadow="none"; }}/>
                  {errors.email && <p className="text-xs mt-1" style={{ color:"#f87171" }}>{errors.email}</p>}
                </div>
                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ fontFamily:"var(--font-display)", color:"var(--text-muted)" }}>Message</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell me about your project..." style={{ ...inputStyle(errors.message), resize:"none" }}
                    onFocus={e => { e.target.style.borderColor="var(--border-glow)"; e.target.style.boxShadow="0 0 0 3px rgba(99,228,255,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor=errors.message?"#ef4444":"var(--border-subtle)"; e.target.style.boxShadow="none"; }}/>
                  {errors.message && <p className="text-xs mt-1" style={{ color:"#f87171" }}>{errors.message}</p>}
                </div>
                <button type="submit" disabled={status==="loading"} className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
                  {status==="loading" ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Sending...</>) : (<><Send size={15}/>Send Message</>)}
                </button>
                {status==="error" && <div className="p-3 rounded-xl text-center text-sm" style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171" }}>Failed to send. Please try again.</div>}
              </form>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Contact info */}
            <div className="space-y-3">
              {CONTACT_INFO.map(info => (
                <a key={info.label} href={info.href} className="card-glass flex items-center gap-4 p-4 group" style={{ textDecoration:"none", display:"flex" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background:`${info.accent}15`, border:`1px solid ${info.accent}30` }}>
                    <info.icon size={18} style={{ color: info.accent }}/>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color:"var(--text-muted)", fontFamily:"var(--font-display)" }}>{info.label}</div>
                    <div className="text-sm font-medium truncate" style={{ color:"var(--text-primary)", fontFamily:"var(--font-body)" }}>{info.value}</div>
                  </div>
                  <svg className="ml-auto w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color:"var(--text-muted)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 18l6-6-6-6"/></svg>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="grid grid-cols-3 gap-3">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="card-glass flex flex-col items-center justify-center gap-2 py-5 group transition-all duration-300 hover:-translate-y-1"
                  style={{ textDecoration:"none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${s.accent}50`; (e.currentTarget as HTMLElement).style.boxShadow=`0 12px 30px ${s.accent}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border-subtle)"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}
                >
                  <s.icon size={22} style={{ color:s.accent, transition:"transform 0.3s" }} className="group-hover:scale-110"/>
                  <span className="text-xs font-medium" style={{ color:"var(--text-muted)", fontFamily:"var(--font-display)" }}>{s.label}</span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="card-glass p-4 flex items-start gap-3" style={{ borderColor:"rgba(52,211,153,0.2)" }}>
              <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{ background:"#34d399", boxShadow:"0 0 8px #34d399", animation:"pulse-glow 2s ease-in-out infinite" }}/>
              <div>
                <div className="text-xs font-bold mb-0.5" style={{ color:"#34d399", fontFamily:"var(--font-display)" }}>Available for Freelance</div>
                <div className="text-xs" style={{ color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>Open to new projects alongside full-time work.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 text-center" style={{ borderTop:"1px solid var(--border-subtle)" }}>
          <p className="text-xs" style={{ color:"var(--text-muted)", fontFamily:"var(--font-body)" }}>
            © {new Date().getFullYear()} Abdul Manan · Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}