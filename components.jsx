/* global React */
const { useEffect, useRef, useState, useMemo } = React;

/* ============================================================
   VideoBg — fond vidéo plein écran avec voile + grain + tint
   ============================================================ */
function VideoBg({ src, hue, intensity = 0.5, parallax = false, fit = 'cover', scale = 1.1, maskCorner = null }) {
  const refA = useRef(null);
  const refB = useRef(null);
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Initialize: both videos load same source. B is offset by half duration
  // so when A approaches its end (the 'seam'), B is mid-clip and visible.
  useEffect(() => {
    const a = refA.current, b = refB.current;
    if (!a || !b) return;
    let mounted = true;
    let raf;
    const FADE = 1.0; // seconds of crossfade window at the seam

    const onLoaded = () => {
      if (!mounted) return;
      setReady(true);
      const d = a.duration;
      if (!d || isNaN(d)) return;
      try { b.currentTime = d / 2; } catch {}
      a.play().catch(() => {});
      b.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    };

    // Compute opacity for one video given its current time and duration
    function opacityFor(t, d) {
      // Fade is centered on the loop seam (t = 0 / t = d).
      // We fade out in last FADE/2 seconds, fade in in first FADE/2 seconds.
      const half = FADE / 2;
      let alpha = 1;
      if (t < half) alpha = t / half;
      else if (t > d - half) alpha = (d - t) / half;
      return Math.max(0, Math.min(1, alpha));
    }

    function tick() {
      const da = a.duration, db = b.duration;
      if (da && db) {
        const oa = opacityFor(a.currentTime, da);
        const ob = opacityFor(b.currentTime, db);
        // Normalize so they sum to ~1 to avoid double-bright moments
        const sum = oa + ob || 1;
        a.style.opacity = (oa / sum).toFixed(3);
        b.style.opacity = (ob / sum).toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    }

    if (a.readyState >= 2 && b.readyState >= 2) onLoaded();
    else {
      let cnt = 0;
      const ck = () => { cnt++; if (cnt >= 2) onLoaded(); };
      a.addEventListener('loadeddata', ck, { once: true });
      b.addEventListener('loadeddata', ck, { once: true });
    }

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, [src]);

  useEffect(() => {
    if (!parallax) return;
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const offset = -r.top * 0.15;
      [refA.current, refB.current].forEach(v => {
        if (v) v.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [parallax]);

  return (
    <div ref={wrapRef} className="video-bg" style={hue ? { '--hue': hue.h, '--hue-glow': hue.g } : null}>
      <video ref={refA} className={ready ? 'ready' : ''} autoPlay muted loop playsInline preload="auto" style={{ objectFit: fit, transform: `scale(${scale})` }}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={refB} className={ready ? 'ready' : ''} autoPlay muted loop playsInline preload="auto" aria-hidden style={{ objectFit: fit, transform: `scale(${scale})` }}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="veil" style={{ opacity: intensity + 0.3 }} />
      <div className="veil-side" />
      <div className="tint" />
      <div className="grain" />
      {maskCorner === 'br' && <div className="corner-mask br" aria-hidden />}
      {maskCorner === 'tr' && <div className="corner-mask tr" aria-hidden />}
    </div>
  );
}

/* ============================================================
   Curseur custom (goutte lumineuse)
   ============================================================ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.body.classList.add('cursor-on');
    const t = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    const onMove = (e) => { t.x = e.clientX; t.y = e.clientY; };
    const onOver = (e) => setHover(!!e.target.closest?.('a, button, [data-hover]'));
    addEventListener('mousemove', onMove);
    addEventListener('mouseover', onOver);
    let raf;
    const tick = () => {
      r.x += (t.x - r.x) * 0.18;
      r.y += (t.y - r.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      removeEventListener('mousemove', onMove);
      removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-on');
    };
  }, []);
  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className={`cur-ring ${hover ? 'big' : ''}`} />
      <style>{`
        .cur-dot, .cur-ring { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; border-radius: 50%; mix-blend-mode: screen; will-change: transform; }
        .cur-dot { width: 6px; height: 8px; border-radius: 60% 60% 50% 50% / 70% 70% 40% 40%; background: var(--hue-glow); box-shadow: 0 0 14px var(--hue), 0 0 4px white; }
        .cur-ring { width: 36px; height: 36px; border: 1px solid color-mix(in oklab, var(--hue) 50%, transparent); transition: width .35s var(--ease), height .35s var(--ease), background .35s, border-color .35s; }
        .cur-ring.big { width: 72px; height: 72px; background: color-mix(in oklab, var(--hue-glow) 8%, transparent); border-color: var(--hue); }
        @media (hover: none), (pointer: coarse) { .cur-dot, .cur-ring { display: none; } }
      `}</style>
    </>
  );
}

/* ============================================================
   Nav flottante minimaliste
   ============================================================ */
function Nav({ activeSection, onNav, lang, onLang, soundOn, onSound }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'top',     n: '00', l: 'Accueil',                       sub: '' },
    { id: 'feu',     n: '01', l: 'Coupeur de feu',                sub: 'Le feu' },
    { id: 'eau',     n: '02', l: 'Énergéticien · Magnétiseur',    sub: 'L’eau' },
    { id: 'terre',   n: '03', l: 'Rebouteux',                     sub: 'La terre' },
    { id: 'souffle', n: '04', l: 'Accompagnement',                sub: 'Le souffle' },
    { id: 'luc',     n: '—',  l: 'Luc Dacquin',                   sub: 'Alchimiste du vivant' },
    { id: 'contact', n: '—',  l: 'Prendre rendez-vous',           sub: 'Contact' },
  ];
  return (
    <>
      <header className="nav">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); onNav('top'); }} data-hover aria-label="Reboot'eux">
          <Mark size={72} />
        </a>
        <button className={`menu-trig ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} data-hover aria-label="Menu">
          <i></i><i></i><i></i>
          <span className="mono">{open ? 'fermer' : 'menu'}</span>
        </button>
        <div className="nav-right">
          <button className={`pill-btn ${soundOn ? 'on' : ''}`} onClick={onSound} data-hover>
            <SoundGlyph on={soundOn} />
            <span className="mono">son</span>
          </button>
          <button className="pill-btn" onClick={onLang} data-hover>
            <span className="mono"><b className={lang==='fr'?'a':''}>fr</b> · <b className={lang==='en'?'a':''}>en</b></span>
          </button>
        </div>
      </header>

      <nav className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-inner">
          <div className="mono drawer-eb">Le voyage du vivant</div>
          <ul>
            {items.map((it, i) => (
              <li key={it.id} style={{ '--i': i }}>
                <a href={`#${it.id}`} onClick={(e) => { e.preventDefault(); onNav(it.id); setOpen(false); }} className={activeSection === it.id ? 'a' : ''} data-hover>
                  <span className="num mono">{it.n}</span>
                  <span className="labels">
                    <span className="l serif">{it.l}</span>
                    {it.sub && <span className="sub mono">{it.sub}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="drawer-foot mono">
            St-Julien-en-Genevois · 30 km de Genève<br/>
            +33 6 85 75 78 63 · +41 79 595 09 38
          </div>
        </div>
      </nav>

      <style>{`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 60; padding: 24px var(--pad); display: flex; align-items: center; justify-content: space-between; gap: 24px; pointer-events: none; }
        .nav > * { pointer-events: auto; }
        .brand { display: flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none; }
        .brand-name { font-size: 18px; font-weight: 300; letter-spacing: -0.01em; }
        .brand i { font-style: normal; color: var(--hue); }
        .menu-trig {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 18px;
          background: rgba(10,14,26,.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--hairline); border-radius: 999px;
          color: var(--ink); cursor: pointer;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          transition: border-color .4s, background .4s;
        }
        .menu-trig i { width: 4px; height: 4px; border-radius: 50%; background: var(--ink); }
        .menu-trig.on { border-color: var(--hue); background: color-mix(in oklab, var(--hue) 10%, rgba(10,14,26,.6)); }
        .menu-trig.on i:nth-child(1){background:var(--feu);} .menu-trig.on i:nth-child(2){background:var(--eau);} .menu-trig.on i:nth-child(3){background:var(--terre);}
        .nav-right { display: flex; gap: 8px; }
        .pill-btn {
          background: transparent; border: 1px solid transparent;
          color: var(--ink-2); cursor: pointer;
          padding: 12px 14px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          transition: color .3s, border-color .3s;
        }
        .pill-btn:hover { color: var(--ink); border-color: var(--hairline); }
        .pill-btn.on { color: var(--hue); }
        .pill-btn b { font-weight: 400; }
        .pill-btn b.a { color: var(--ink); }

        .drawer {
          position: fixed; top: 0; right: 0; width: min(440px, 92vw); height: 100vh;
          background: rgba(5,8,16,.92); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
          border-left: 1px solid var(--hairline);
          transform: translateX(100%); transition: transform .8s var(--ease);
          z-index: 59; padding: 120px 56px 40px; overflow-y: auto;
        }
        .drawer.open { transform: translateX(0); }
        .drawer-eb { color: var(--ink-2); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 32px; }
        .drawer ul { list-style: none; padding: 0; margin: 0; }
        .drawer li { opacity: 0; transform: translateX(20px); transition: opacity .6s var(--ease), transform .6s var(--ease); transition-delay: calc(var(--i) * .06s + .15s); }
        .drawer.open li { opacity: 1; transform: translateX(0); }
        .drawer li a { display: grid; grid-template-columns: 50px 1fr; gap: 18px; align-items: start; padding: 18px 0; color: var(--ink-2); text-decoration: none; border-bottom: 1px solid var(--hairline); transition: color .3s, padding .4s var(--ease); }
        .drawer li a:hover { color: var(--ink); padding-left: 8px; }
        .drawer li a.a { color: var(--hue); }
        .drawer .num { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3); padding-top: 10px; }
        .drawer .labels { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .drawer .l { font-family: var(--serif); font-size: clamp(20px, 2.4vw, 26px); font-weight: 300; letter-spacing: -0.01em; line-height: 1.15; font-style: italic; }
        .drawer .sub { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); }
        .drawer li a.a .sub { color: color-mix(in oklab, var(--hue) 70%, var(--ink-3)); }
        .drawer-foot { margin-top: 64px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); line-height: 1.9; }
      `}</style>
    </>
  );
}

function Mark({ size = 28 }) {
  return (
    <img
      src="assets/logo.png"
      width={size}
      height={size}
      alt="Reboot'eux"
      style={{ display: 'block', filter: 'brightness(1.1) contrast(1.05)', opacity: 0.95 }}
    />
  );
}

function MarkOld({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 18 C 5 11, 11 8, 16 11" stroke="currentColor" strokeWidth="1" fill="none" opacity=".85" />
      <path d="M27 18 C 27 11, 21 8, 16 11" stroke="currentColor" strokeWidth="1" fill="none" opacity=".85" />
      <ellipse cx="11" cy="22" rx="1.4" ry="2" fill="var(--hue)" />
      <ellipse cx="16" cy="24" rx="1.4" ry="2" fill="var(--hue)" />
      <ellipse cx="21" cy="22" rx="1.4" ry="2" fill="var(--hue)" />
      <circle cx="16" cy="22" r="9" stroke="var(--hue)" strokeWidth=".5" opacity=".3" fill="none" />
    </svg>
  );
}

function SoundGlyph({ on }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 5h2l3-2.5v9L4 9H2V5z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" />
      {on && <path d="M9.5 4.5c1 .8 1 4.2 0 5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />}
    </svg>
  );
}

/* ============================================================
   SplitText — révèle mot par mot
   ============================================================ */
function _flattenText(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(_flattenText).join('');
  if (node.props && node.props.children !== undefined) return _flattenText(node.props.children);
  return '';
}
function SplitText({ children, tag: Tag = 'span', className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const text = _flattenText(children);
  const words = text.split(/(\s+)/).filter(Boolean);
  return (
    <Tag ref={ref} className={`split ${shown ? 'in' : ''} ${className}`}>
      {words.map((w, i) => /^\s+$/.test(w)
        ? <span key={i}> </span>
        : <span key={i} className="word"><span style={{ transitionDelay: `${i * 50}ms` }}>{w}</span></span>
      )}
    </Tag>
  );
}

/* ============================================================
   Reveal — IntersectionObserver wrapper
   ============================================================ */
function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-delay={delay} className={`reveal ${shown ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ============================================================
   Scroll progress rail
   ============================================================ */
function ProgressRail({ active }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onS = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setP(h > 0 ? scrollY / h : 0);
    };
    onS();
    addEventListener('scroll', onS, { passive: true });
    return () => removeEventListener('scroll', onS);
  }, []);
  const acts = ['feu', 'eau', 'terre', 'souffle'];
  return (
    <aside className="rail">
      <div className="rail-line"><div className="rail-fill" style={{ height: `${p*100}%` }} /></div>
      <div className="rail-ticks">
        {acts.map((a, i) => (
          <span key={a} className={`tick ${active === a ? 'a' : ''}`}>
            <i></i><em className="mono">0{i+1}</em>
          </span>
        ))}
      </div>
      <style>{`
        .rail { position: fixed; left: 28px; top: 50%; transform: translateY(-50%); z-index: 40; display: flex; flex-direction: column; align-items: center; gap: 14px; pointer-events: none; }
        .rail-line { position: relative; width: 1px; height: 200px; background: var(--hairline); }
        .rail-fill { position: absolute; top: 0; left: 0; width: 100%; background: var(--hue); box-shadow: 0 0 12px var(--hue-glow); transition: height .15s linear; }
        .rail-ticks { display: flex; flex-direction: column; gap: 18px; }
        .tick { display: flex; align-items: center; gap: 10px; opacity: .4; transition: opacity .3s; }
        .tick.a { opacity: 1; }
        .tick i { width: 5px; height: 5px; border-radius: 50%; background: var(--ink-3); }
        .tick.a i { background: var(--hue); box-shadow: 0 0 8px var(--hue-glow); }
        .tick em { font-style: normal; font-size: 9px; letter-spacing: 0.2em; color: var(--ink-3); }
        @media (max-width: 980px) { .rail { display: none; } }
      `}</style>
    </aside>
  );
}

Object.assign(window, { VideoBg, Cursor, Nav, Mark, SoundGlyph, SplitText, Reveal, ProgressRail });
