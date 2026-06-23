import { useEffect, useRef, useState } from "react";
import pic from "./pic.png";
import RippleGrid from "./RippleGrid";
const skills = [
  { icon: "☕", name: "Java", cat: "backend" },
  { icon: "🌱", name: "Spring Boot", cat: "backend" },
  { icon: "⚡", name: "Node.js", cat: "backend" },
  { icon: "🛠️", name: "Express.js", cat: "backend" },
  { icon: "⚛️", name: "React.js", cat: "frontend" },
  { icon: "🍃", name: "MongoDB", cat: "database" },
  { icon: "🐘", name: "SQL", cat: "database" },
  { icon: "🐍", name: "Python", cat: "language" },
  { icon: "➕", name: "C++", cat: "language" },
  { icon: "🔧", name: "C", cat: "language" },
  { icon: "🔗", name: "REST APIs", cat: "architecture" },
  { icon: "🏗️", name: "Microservices", cat: "architecture" },
];

const projects = [
  {
    name: "Swasthya Mitra",
    desc: "A health-focused web app built with Spring Boot, providing medical assistance and health management features.",
    tags: [{ label: "Spring Boot", cls: "spring" }, { label: "Java", cls: "spring" }],
    github: "https://github.com/Future7dev/Swasthya-mitra",
    live: "https://swasthya-mitra-pi.vercel.app/home",
  },
  {
    name: "Chatify",
    desc: "A real-time messaging application powered by Spring Boot with WebSocket support for instant communication.",
    tags: [{ label: "Spring Boot", cls: "spring" }, { label: "WebSocket", cls: "spring" }],
    github: "https://github.com/Future7dev/Chatify",
    live: "https://chatify-nu-three.vercel.app/",
  },
  {
    name: "Code-O-Share",
    desc: "A MERN-stack collaborative code sharing platform to paste, share, and discuss snippets in real time.",
    tags: [{ label: "MERN", cls: "mern" }, { label: "Real-time", cls: "mern" }],
    github: "https://github.com/Future7dev/code-o-share",
    live: "https://code-o-share.vercel.app/",
  },
  {
    name: "NexMeet",
    desc: "Full-featured video conferencing platform using WebRTC and Socket.io, with JWT auth and dark glassmorphism UI.",
    tags: [{ label: "MERN", cls: "mern" }, { label: "WebRTC", cls: "mern" }, { label: "Socket.io", cls: "mern" }],
    github: "https://github.com/Future7dev/nexmeet",
    live: "https://nexmeet-opal.vercel.app/",
  },
  {
    name: "Bitcoin Price Predictor",
    desc: "ML-based web app that forecasts Bitcoin prices using historical data and predictive models in Python.",
    tags: [{ label: "Python", cls: "other" }, { label: "ML", cls: "other" }],
    github: "https://github.com/Future7dev/Bitcoin-Price-prediction-",
    live: null,
  },
  {
    name: "Spotify Clone",
    desc: "A pixel-perfect Spotify UI clone with music playback functionality and a sleek dark interface.",
    tags: [{ label: "Web", cls: "other" }, { label: "UI Clone", cls: "other" }],
    github: "https://github.com/Future7dev/spotify_clone",
    live: null,
  },
];

const phrases = [
  "Full-Stack Developer",
  "Java Backend Specialist",
  "MERN Stack Engineer",
  "Spring Boot Developer",
  "WebRTC Enthusiast",
];

// ─── Typing Hook ───────────────────────────────────────────────────────────────
function useTyping(phrases) {
  const [text, setText] = useState("");
  const state = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { pi, ci, deleting } = state.current;
      const cur = phrases[pi];
      if (!deleting) {
        const next = ci + 1;
        setText(cur.slice(0, next));
        state.current.ci = next;
        if (next === cur.length) {
          state.current.deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
      } else {
        const next = ci - 1;
        setText(cur.slice(0, next));
        state.current.ci = next;
        if (next === 0) {
          state.current.deleting = false;
          state.current.pi = (pi + 1) % phrases.length;
        }
      }
      timer = setTimeout(tick, deleting ? 60 : 100);
    }
    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

// ─── Particle Canvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let dots = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    function init() {
      const n = Math.floor((canvas.width * canvas.height) / 18000);
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.5 + 0.1,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${d.a})`;
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const typed = useTyping(phrases);
  const [sent, setSent] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #13131f;
          --surface: #12121a;
          --glass: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.08);
          --accent: #6C63FF;
          --accent2: #00D4AA;
          --accent3: #FF6B6B;
          --text: #F0F0F8;
          --muted: #8B8BA0;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'Inter', sans-serif;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

        .port-container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 1; }

        /* NAV */
        .port-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(10,10,15,0.85); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
        }
        .port-nav-inner {
          display: flex;  justify-content: space-between;
          padding: 1rem 2rem;  margin: 0 auto;
        }
        .port-logo { font-family: var(--mono); font-size: 1.1rem; color: var(--accent); cursor: default; }
        .port-logo span { color: var(--accent2); }
        .port-nav-links { display: flex; gap: 2rem; list-style: none; }
        .port-nav-links button {
          background: none; border: none; color: var(--muted); font-size: 0.875rem;
          cursor: pointer; font-family: var(--sans); transition: color 0.2s;
        }
        .port-nav-links button:hover { color: var(--text); }

        /* HERO */
        .port-hero { min-height: 100vh; display: flex; align-items: center; padding-top: 5rem; }
        .port-hero-grid {
          display: grid; grid-template-columns: 1fr 440px; gap: 8rem;
          align-items: center; width: 100%;
        }
        .port-hero-tag {
          font-family: var(--mono); font-size: 0.75rem; color: var(--accent2);
          letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .port-hero-tag::before { content: ''; width: 24px; height: 1px; background: var(--accent2); }
        .port-hero-name { font-size: clamp(2.5rem,5vw,4rem); font-weight: 700; line-height: 1.1; margin-bottom: 0.5rem; }
        .port-hero-name .first { color: var(--text); }
        .port-hero-name .last { color: var(--accent); }
        .port-typing {
          font-family: var(--mono); font-size: 1.1rem; color: var(--accent2);
          min-height: 2rem; margin-bottom: 1.5rem;
          position: absolute;
          bottom: -1px; /* adjust distance below image */
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 10;

          
          font-weight: 600;
        }
        .port-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        .port-hero-desc { color: var(--muted); line-height: 1.8; max-width: 480px; margin-bottom: 2rem; }
        .port-stats-row { display: flex; gap: 2rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .port-stat-num { font-size: 1.5rem; font-weight: 700; font-family: var(--mono); color: var(--accent); }
        .port-stat-label { font-size: 0.72rem; color: var(--muted); font-family: var(--mono); }
        .port-cta { display: flex; gap: 1rem; flex-wrap: wrap; }

        /* BUTTONS */
        .port-btn {
          padding: 0.75rem 1.75rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500;
          cursor: pointer; text-decoration: none; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--sans);
        }
        .port-btn-primary { background: var(--accent); color: #fff; border: none; }
        .port-btn-primary:hover { background: #5a52e0; transform: translateY(-1px); }
        .port-btn-outline { background: transparent; color: var(--text); border: 1px solid var(--glass-border); }
        .port-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        /* AVATAR */
        .port-avatar-wrap { position: relative; display: flex; justify-content: center; bottom:6rem; }
        .port-orbit {
          position: absolute; width: 320px; height: 320px; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          border: 1px dashed rgba(108,99,255,0.2); border-radius: 50%;
          animation: spin 20s linear infinite;
        }
        .port-orbit-dot {
          position: absolute; width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent); top: -4px; left: 50%; transform: translateX(-50%);
        }
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        .port-avatar-ring {
          width: 380px; height: 700px; 
         
          padding: 3px; position: relative;
        }
        .port-avatar-inner {
          width: 100%; height: 100%;  background: var(--surface);
          display: flex; align-items: center; justify-content: center; overflow: hidden;
          font-size: 5rem; font-weight: 700; color: var(--accent); font-family: var(--mono);
        }
        .port-avatar-inner img { width: 100%; height: 100%; object-fit: cover; }
        .port-avatar-badge {
          position: absolute; bottom: 129px; right: 8px; background: var(--surface);
          border: 1px solid var(--glass-border); border-radius: 20px;
          padding: 0.4rem 0.9rem; font-family: var(--mono); font-size: 0.7rem;
          color: var(--accent2); white-space: nowrap;
        }
              .avatar-bg {
        position: relative;
        width: 520px;      /* adjust */
        height: 570px;     /* adjust */
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .avatar-bg > div:first-child {
        position: absolute;
        inset: 0;
        z-index: 0;
      }

      .avatar-bg img {
        position: relative;
       pointer-events: none;
        width: 320px;      /* adjust */
        height: 420px;     /* adjust */
        object-fit: cover;
        border-radius: 20%;
      }
        /* SECTIONS */
        .port-section { padding: 5rem 0; }
        .port-section-header { margin-bottom: 3rem; text-align: center; }
        .port-section-tag { font-family: var(--mono); font-size: 0.7rem; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .port-section-title { font-size: 2rem; font-weight: 700; }
        .port-section-line { width: 40px; height: 2px; background: var(--accent); margin: 0.75rem auto 0; }

        /* SKILLS */
        .port-skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 1rem; }
        .port-skill-card {
          background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px;
          padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 0.85rem;
          transition: all 0.2s;
        }
        .port-skill-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .port-skill-icon { font-size: 1.5rem; }
        .port-skill-name { font-size: 0.9rem; font-weight: 500; }
        .port-skill-cat { font-size: 0.72rem; color: var(--muted); font-family: var(--mono); }

        /* PROJECTS */
        .port-proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px,1fr)); gap: 1.5rem; }
        .port-proj-card {
          background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px;
          overflow: hidden; transition: all 0.25s; display: flex; flex-direction: column;
        }
        .port-proj-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .port-proj-header { padding: 1.5rem 1.5rem 0; flex: 1; }
        .port-proj-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
        .port-proj-tag {
          font-family: var(--mono); font-size: 0.65rem; padding: 0.25rem 0.6rem;
          border-radius: 4px; font-weight: 500;
        }
        .port-tag-spring { background: rgba(0,212,170,0.12); color: var(--accent2); }
        .port-tag-mern { background: rgba(108,99,255,0.12); color: var(--accent); }
        .port-tag-other { background: rgba(255,107,107,0.12); color: var(--accent3); }
        .port-proj-name { font-size: 1.15rem; font-weight: 600; margin-bottom: 0.5rem; }
        .port-proj-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
        .port-proj-links { padding: 0 1.5rem 1.5rem; display: flex; gap: 0.75rem; }
        .port-proj-link {
          font-size: 0.8rem; font-family: var(--mono); text-decoration: none;
          display: flex; align-items: center; gap: 0.35rem;
          border-radius: 6px; padding: 0.35rem 0.75rem; transition: all 0.15s;
          color: var(--accent); border: 1px solid rgba(108,99,255,0.25);
        }
        .port-proj-link:hover { background: rgba(108,99,255,0.1); }
        .port-proj-link.live { color: var(--accent2); border-color: rgba(0,212,170,0.25); }
        .port-proj-link.live:hover { background: rgba(0,212,170,0.08); }

        /* CONTACT */
        .port-contact-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        .port-contact-text h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; }
        .port-contact-text p { color: var(--muted); line-height: 1.8; margin-bottom: 1.5rem; }
        .port-contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
        .port-contact-link {
          display: flex; align-items: center; gap: 0.75rem; color: var(--text);
          text-decoration: none; font-size: 0.875rem; padding: 0.75rem 1rem;
          background: var(--glass); border: 1px solid var(--glass-border); border-radius: 10px;
          transition: all 0.2s;
        }
        .port-contact-link:hover { border-color: var(--accent); color: var(--accent); }

        /* FORM */
        .port-form { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 16px; padding: 2rem; }
        .port-form-group { margin-bottom: 1.25rem; }
        .port-form-group label { display: block; font-size: 0.8rem; font-family: var(--mono); color: var(--muted); margin-bottom: 0.5rem; }
        .port-form-group input,
        .port-form-group textarea {
          width: 100%; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
          border-radius: 8px; padding: 0.75rem 1rem; color: var(--text);
          font-family: var(--sans); font-size: 0.875rem; outline: none; transition: border-color 0.2s;
        }
        .port-form-group input:focus,
        .port-form-group textarea:focus { border-color: var(--accent); }
        .port-form-group textarea { height: 100px; resize: vertical; }
        .port-btn-send {
          width: 100%; border: none; padding: 0.85rem; border-radius: 8px;
          font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: var(--sans);
          transition: background 0.2s; background: var(--accent); color: #fff;
        }
        .port-btn-send:hover { background: #5a52e0; }
        .port-btn-send.sent { background: var(--accent2) !important; }

        /* FOOTER */
        .port-footer { border-top: 1px solid var(--glass-border); padding: 2rem 0; text-align: center; }
        .port-footer p { color: var(--muted); font-size: 0.8rem; font-family: var(--mono); }
        .port-footer span { color: var(--accent); }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .port-hero-grid { grid-template-columns: 1fr; text-align: center; }
          .port-avatar-wrap { order: -1; }
          .port-avatar-ring { width: 180px; height: 180px; }
          .port-orbit { width: 220px; height: 220px; }
          .port-contact-wrap { grid-template-columns: 1fr; }
          .port-hero-desc { max-width: 100%; }
          .port-cta { justify-content: center; }
          .port-stats-row { justify-content: center; }
        }
      `}</style>

      <ParticleCanvas />

      {/* NAV */}
      <nav className="port-nav">
        <div className="port-nav-inner">
          <div className="port-logo">pk<span>.dev</span></div>
          <ul className="port-nav-links">
            {["about", "skills", "projects", "contact"].map((s) => (
              <li key={s}><button onClick={() => scrollTo(s)}>{s}</button></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="port-hero" id="about">
        <div className="port-container">
          <div className="port-hero-grid">
            <div>
              <div className="port-hero-tag">available for opportunities</div>
              <div className="port-hero-name">
                <div className="first">Priyam</div>
                <div className="last">Koley</div>
              </div>
              {/* <div className="port-typing">
                {typed}<span className="port-cursor">|</span>
              </div> */}
              <p className="port-hero-desc">
                Full-Stack Developer crafting scalable backends and polished frontends.
                CSE student at VIT Bhopal · Passionate about real-time systems, RESTful APIs, and clean code.
              </p>
              <div className="port-stats-row">
                {[["6+","projects"],["10+","technologies"],["LeetCode","problem solver"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="port-stat-num">{n}</div>
                    <div className="port-stat-label">{l}</div>
                  </div>
                ))}
              </div>
              <div className="port-cta">
                <a href="https://github.com/Future7dev/Resume/blob/main/java_Priyam_v2.pdf" target="_blank" rel="noreferrer" className="port-btn port-btn-primary">📄 Resume</a>
                <button className="port-btn port-btn-outline" onClick={() => scrollTo("projects")}>View Projects</button>
                <button className="port-btn port-btn-outline" onClick={() => scrollTo("contact")}>Contact Me</button>
              </div>
            </div>

            <div className="port-avatar-wrap">
              <div className="port-orbit"><div className="port-orbit-dot" /></div>
              <div className="port-avatar-ring">
                
                <div className="port-avatar-inner">
                <div className="avatar-bg">
                  <RippleGrid
                    enableRainbow={false}
                    gridColor="#5227FF"
                    rippleIntensity={0.04}
                    gridSize={10}
                    gridThickness={15}
                    mouseInteraction={true}
                    mouseInteractionRadius={0.8}
                    opacity={1}
                    fadeDistance={3}
                    vignetteStrength={4}
                    glowIntensity={0.1}
                    gridRotation={0}
                  />

                  <img src={pic} alt="Avatar" />
                  <div className="port-typing">
                {typed}<span className="port-cursor">|</span>
                </div>
                </div>
              </div>
              </div>
              <div className="port-avatar-badge">🟢 Open to Work</div>
               
            </div>
           
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="port-section" id="skills">
        <div className="port-container">
          <div className="port-section-header">
            <div className="port-section-tag">// tech_stack</div>
            <h2 className="port-section-title">Skills & Technologies</h2>
            <div className="port-section-line" />
          </div>
          <div className="port-skills-grid">
            {skills.map((s) => (
              <div key={s.name} className="port-skill-card">
                <div className="port-skill-icon">{s.icon}</div>
                <div>
                  <div className="port-skill-name">{s.name}</div>
                  <div className="port-skill-cat">{s.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="port-section" id="projects">
        <div className="port-container">
          <div className="port-section-header">
            <div className="port-section-tag">// my_work</div>
            <h2 className="port-section-title">Featured Projects</h2>
            <div className="port-section-line" />
          </div>
          <div className="port-proj-grid">
            {projects.map((p) => (
              <div key={p.name} className="port-proj-card">
                <div className="port-proj-header">
                  <div className="port-proj-tags">
                    {p.tags.map((t) => (
                      <span key={t.label} className={`port-proj-tag port-tag-${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                  <div className="port-proj-name">{p.name}</div>
                  <div className="port-proj-desc">{p.desc}</div>
                </div>
                <div className="port-proj-links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="port-proj-link">🐙 GitHub</a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="port-proj-link live">🌐 Live</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="port-section" id="contact">
        <div className="port-container">
          <div className="port-section-header">
            <div className="port-section-tag">// get_in_touch</div>
            <h2 className="port-section-title">Contact</h2>
            <div className="port-section-line" />
          </div>
          <div className="port-contact-wrap">
            <div className="port-contact-text">
              <h3>Let's build something together</h3>
              <p>Whether it's a job opportunity, collaboration, or just a chat about tech — my inbox is always open.</p>
              <div className="port-contact-links">
                {[
                  ["✉️", "koleypriyam8@gmail.com", "mailto:koleypriyam8@gmail.com"],
                  ["💼", "LinkedIn · priyam-koley-pk22", "https://www.linkedin.com/in/priyam-koley-pk22/"],
                  ["🧩", "LeetCode · P20__", "https://leetcode.com/u/P20__/"],
                  ["🐙", "GitHub · Future7dev", "https://github.com/Future7dev"],
                  ["📄", "Download Resume", "https://github.com/Future7dev/Resume/blob/main/java_Priyam_v2.pdf"],
                ].map(([icon, label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="port-contact-link">
                    <span>{icon}</span> {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="port-form">
              <div className="port-form-group">
                <label>// name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="port-form-group">
                <label>// email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="port-form-group">
                <label>// message</label>
                <textarea placeholder="What's on your mind?" />
              </div>
              <button
                className={`port-btn-send${sent ? " sent" : ""}`}
                onClick={() => setSent(true)}
              >
                {sent ? "Message Sent! 🚀" : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="port-footer">
        <div className="port-container">
          <p>Designed & built by <span>Priyam Koley</span> · VIT Bhopal CSE · <span>2025</span></p>
        </div>
      </footer>
    </>
  );
}
