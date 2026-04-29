/* global React, ReactDOM, VideoBg, Cursor, Nav, Mark, SplitText, Reveal, ProgressRail, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSlider, TweakToggle, TweakButton */
const { useEffect, useRef, useState } = React;

const HUES = {
  feu:     { h: '#E8B872', g: '#FFE4B5' },
  eau:     { h: '#4DA8DA', g: '#BFE3F4' },
  terre:   { h: '#6B9C7B', g: '#B6D4BB' },
  souffle: { h: '#B8A8D9', g: '#E2D8F0' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "element": "auto",
  "veil": 0.55
}/*EDITMODE-END*/;

/* ============================================================
   HERO — vidéo plein écran + grand serif
   ============================================================ */
function Hero() {
  return (
    <section id="top" className="hero" data-screen-label="01 Hero">
      <VideoBg src="videos/hero.mp4" hue={HUES.feu} intensity={0.4} fit="contain" scale={1} />
      <div className="hero-content">
        <Reveal className="eyebrow-row"><span className="eyebrow">Cabinet de soins énergétiques · St-Julien-en-Genevois</span></Reveal>
        <h1 className="display hero-title">
          <SplitText tag="span">Reboot’eux</SplitText>
        </h1>
        <Reveal delay={2}>
          <p className="hero-sub serif">
            <em>retrouver son juste équilibre,</em><br/>
            une <i>guérison</i> qui honore le corps et l’esprit.
          </p>
        </Reveal>
        <Reveal delay={3} className="hero-ctas">
          <a className="btn" href="#contact" data-hover><span className="stone"></span>Prendre rendez-vous</a>
          <a className="btn btn-ghost" href="#manifeste" data-hover>Découvrir le voyage <ArrowDown /></a>
        </Reveal>
      </div>
      <div className="scroll-cue ornament">
        <span className="mono">scroller</span>
        <span className="line"><i></i></span>
      </div>
      <style>{`
        .hero { position: relative; min-height: 100vh; display: grid; place-items: center; padding: 140px var(--pad) 100px; overflow: hidden; }
        .hero-content { position: relative; z-index: 2; text-align: center; max-width: 1200px; }
        .eyebrow-row { margin-bottom: 32px; }
        .hero-title { margin: 0 0 36px; font-style: italic; }
        .hero-sub { font-size: clamp(20px, 2.2vw, 30px); color: var(--ink); max-width: 580px; margin: 0 auto 48px; line-height: 1.4; font-weight: 300; }
        .hero-sub em { font-style: italic; color: var(--ink-2); }
        .hero-sub i { font-style: italic; color: var(--hue); }
        .hero-ctas { display: inline-flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .scroll-cue { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 14px; color: var(--ink-2); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; z-index: 2; }
        .scroll-cue .line { width: 1px; height: 60px; background: var(--hairline); position: relative; overflow: hidden; }
        .scroll-cue .line i { position: absolute; left: 0; top: -20px; width: 100%; height: 20px; background: linear-gradient(to bottom, transparent, var(--hue)); animation: scroll-down 2.4s ease-in-out infinite; }
        @keyframes scroll-down { 0% { top: -20px; } 100% { top: 100%; } }
      `}</style>
    </section>
  );
}

function ArrowDown() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

/* ============================================================
   MANIFESTE — phrase géante, fond noir
   ============================================================ */
function Manifeste() {
  return (
    <section id="manifeste" className="manifeste" data-screen-label="02 Manifeste">
      <div className="man-glow ornament"></div>
      <div className="wrap">
        <Reveal className="eb"><span className="eyebrow">Manifeste</span></Reveal>
        <h2 className="display man-line">
          <SplitText>Là où la flamme s’éteint,</SplitText>
          <br/>
          <span className="ital"><SplitText>le vivant respire.</SplitText></span>
        </h2>
        <Reveal delay={2} className="man-foot mono">— Luc Dacquin, alchimiste du vivant</Reveal>
      </div>
      <style>{`
        .manifeste { position: relative; padding: 240px var(--pad); text-align: center; overflow: hidden; background: var(--bg-0); }
        .man-glow { position: absolute; left: 50%; top: 50%; width: 1200px; height: 1200px; transform: translate(-50%, -50%); background: radial-gradient(circle, color-mix(in oklab, var(--feu-glow) 8%, transparent) 0%, transparent 60%); mix-blend-mode: screen; filter: blur(40px); }
        .manifeste .eb { margin-bottom: 80px; color: var(--ink-2); }
        .man-line { font-style: italic; font-weight: 300; }
        .man-line .ital { color: var(--feu); }
        .man-foot { margin-top: 80px; color: var(--ink-3); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; }
      `}</style>
    </section>
  );
}

/* ============================================================
   ACTS — 4 actes cinématiques avec fond vidéo
   ============================================================ */
const ACTS = [
  {
    id: 'feu', n: '01 / Le feu', el: 'Coupeur de feu', soin: 'Apaiser les brûlures, le zona, les douleurs aiguës de peau',
    poetic: <>Couper le feu,<br/><em>apaiser la brûlure.</em></>,
    quote: '« La flamme reconnaît la main qui sait l’éteindre. »',
    body: 'Imposition des mains à distance ou en présentiel pour soulager les brûlures, le zona, les douleurs aiguës de peau. Une séance de 20 à 60 minutes, sans contact direct.',
    list: ['Brûlures du quotidien', 'Coups de soleil', 'Zona, herpès', 'Brûlures post-radiothérapie', 'Douleurs cutanées aiguës'],
    video: 'videos/feu.mp4',
    hue: HUES.feu,
  },
  {
    id: 'eau', n: '02 / L’eau', el: 'Énergéticien · Magnétiseur', soin: 'Libérer les blocages, faire circuler l’énergie',
    poetic: <>Faire circuler<br/><em>les flux qui dorment.</em></>,
    quote: '« L’eau ne combat pas la pierre. Elle finit par la traverser. »',
    body: 'Magnétisme et travail énergétique pour les blocages chroniques, la fatigue persistante, les états où "rien ne passe". Une séance de 60 minutes pour rétablir la circulation des flux.',
    list: ['Céphalées', 'Fatigue chronique', 'Insomnie', 'Stress, anxiété', 'Sciatique', 'Convalescence'],
    video: 'videos/eau.mp4',
    hue: HUES.eau,
  },
  {
    id: 'terre', n: '03 / La terre', el: 'Rebouteux', soin: 'Remettre le corps en place, soulager les tensions',
    poetic: <>Remettre les os<br/><em>à leur juste place.</em></>,
    quote: '« Les racines ne demandent rien. Elles tiennent. »',
    body: 'Travail manuel ostéo-articulaire ancestral pour les blocages mécaniques — nuque, dos, épaules, articulations. Précis, doux, sans crispation.',
    list: ['Nuque bloquée', 'Lombalgie', 'Tendinites', 'Entorses anciennes', 'Articulations raides', 'Contractures'],
    video: 'videos/terre.mp4',
    hue: HUES.terre,
  },
  {
    id: 'souffle', n: '04 / Le souffle', el: 'Accompagnement en traitement lourd', soin: 'Soutenir la traversée — cancer, post-opératoire, maladie chronique',
    poetic: <>Accompagner ceux<br/><em>qui traversent l’épreuve.</em></>,
    quote: '« Le souffle n’efface pas la nuit. Il l’habite avec toi. »',
    body: 'Présence régulière auprès des patients en traitement lourd — cancer, post-opératoire, maladie chronique — en complément du parcours médical. Une alliance de science et de sagesse.',
    list: ['Effets secondaires de chimio', 'Post-opératoire', 'Cancer', 'Maladie chronique', 'Burnout', 'Traversées difficiles'],
    video: 'videos/souffle.mp4',
    hue: HUES.souffle,
  },
];

function Acts({ onActive }) {
  const refs = useRef([]);
  useEffect(() => {
    const onScroll = () => {
      const center = innerHeight / 2;
      let best = 0, bd = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const m = r.top + r.height / 2;
        const d = Math.abs(m - center);
        if (d < bd && r.top < innerHeight && r.bottom > 0) { bd = d; best = i; }
      });
      onActive(ACTS[best]?.id);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {ACTS.map((a, i) => (
        <Act key={a.id} act={a} idx={i} innerRef={(el) => refs.current[i] = el} />
      ))}
    </>
  );
}

function Act({ act, idx, innerRef }) {
  const left = idx % 2 === 0;
  return (
    <section
      id={act.id}
      ref={innerRef}
      data-screen-label={`0${idx + 3} Acte ${act.el}`}
      className={`act ${left ? 'L' : 'R'}`}
      style={{ '--hue': act.hue.h, '--hue-glow': act.hue.g }}
    >
      <VideoBg
        src={act.video}
        hue={act.hue}
        intensity={0.5}
        parallax
        fit={act.id === 'souffle' ? 'contain' : 'cover'}
        scale={act.id === 'souffle' ? 0.95 : 1.1}
        maskCorner={act.id === 'souffle' ? 'br' : null}
      />
      <div className="wrap act-wrap">
        <div className="act-grid">
          <div className="act-meta">
            <Reveal className="num mono">{act.n}</Reveal>
            <Reveal delay={1} className="el serif" style={{ fontSize: '32px', lineHeight: 1.15 }}>{act.el}</Reveal>
            <Reveal delay={2} className="soin mono">{act.soin}</Reveal>
          </div>
          <div className="act-text">
            <h2 className="display act-title"><SplitText>{textFromPoetic(act.poetic)}</SplitText></h2>
            <Reveal delay={2} className="quote serif">{act.quote}</Reveal>
            <Reveal delay={3} className="body">{act.body}</Reveal>
            <Reveal delay={3} className="list">
              <ul>
                {act.list.map(x => <li key={x}><i></i>{x}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={4} className="cta">
              <a href="#contact" className="link" data-hover>Prendre rendez-vous →</a>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`
        .act { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 140px var(--pad); overflow: hidden; }
        .act-wrap { position: relative; z-index: 2; width: 100%; }
        .act-grid { display: grid; grid-template-columns: 220px 1fr; gap: 80px; align-items: start; max-width: 1280px; margin: 0 auto; }
        .act.R .act-grid { grid-template-columns: 1fr 220px; }
        .act.R .act-meta { grid-column: 2; grid-row: 1; }
        .act.R .act-text { grid-column: 1; grid-row: 1; }
        .act-meta { display: flex; flex-direction: column; gap: 14px; padding-top: 12px; }
        .act-meta .num { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--hue); }
        .act-meta .el { font-size: 56px; font-weight: 300; font-style: italic; line-height: 1; letter-spacing: -0.02em; color: var(--ink); }
        .act-meta .soin { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-2); }
        .act-title { font-size: clamp(48px, 7vw, 110px); margin: 0 0 36px; font-style: italic; max-width: 11ch; }
        .act-title em { font-style: italic; color: var(--hue); }
        .quote { font-size: clamp(20px, 2vw, 28px); font-style: italic; color: var(--ink-2); margin: 0 0 36px; padding-left: 22px; border-left: 1px solid var(--hue); max-width: 540px; font-weight: 300; }
        .body { font-size: 16px; color: var(--ink); max-width: 560px; margin: 0 0 36px; line-height: 1.7; opacity: .9; }
        .list ul { list-style: none; padding: 0; margin: 0 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 32px; max-width: 540px; font-size: 14px; color: var(--ink-2); }
        .list li { display: flex; align-items: center; gap: 12px; }
        .list li i { width: 5px; height: 5px; border-radius: 50%; background: var(--hue); box-shadow: 0 0 8px var(--hue-glow); flex: 0 0 auto; }
        @media (max-width: 900px) {
          .act-grid, .act.R .act-grid { grid-template-columns: 1fr; gap: 24px; }
          .list ul { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function textFromPoetic(p) {
  if (typeof p === 'string') return p;
  if (p == null || typeof p === 'boolean') return '';
  if (Array.isArray(p)) return p.map(textFromPoetic).join(' ');
  if (p?.props?.children !== undefined) {
    const c = p.props.children;
    if (Array.isArray(c)) return c.map(textFromPoetic).join(' ');
    return textFromPoetic(c);
  }
  return '';
}

/* ============================================================
   LUC — portrait + texte
   ============================================================ */
function LucSection() {
  return (
    <section id="luc" className="luc" data-screen-label="07 Luc">
      <VideoBg src="videos/etoiles.mp4" hue={HUES.souffle} intensity={0.65} />
      <div className="wrap luc-wrap">
        <div className="luc-grid">
          <Reveal className="luc-portrait">
            <div className="portrait-frame">
              <div className="portrait-ph">
                <div className="ph-photo" style={{ backgroundImage: 'url(assets/luc-portrait.jpg)' }} aria-label="Luc Dacquin"></div>
              </div>
              <div className="portrait-caption mono">
                <span>Luc Dacquin</span>
                <span>ingénieur 42 ans · énergéticien depuis 2019</span>
              </div>
            </div>
          </Reveal>
          <div className="luc-text">
            <Reveal className="eyebrow">L’alchimiste du vivant</Reveal>
            <h2 className="display luc-title">
              <SplitText>Vingt ans d’ingénierie,</SplitText><br/>
              <span className="ital"><SplitText>une vie d’écoute.</SplitText></span>
            </h2>
            <Reveal delay={2} className="luc-body">
              <p>Né dans une famille en harmonie avec la nature, Luc a d’abord choisi la rigueur — l’ingénierie, les lignes droites, les calculs. Il y consacre quarante-deux années. Puis il quitte un métier qui ne le quittait plus, et reprend le chemin du druide guérisseur que les hommes de sa lignée pratiquent depuis des générations.</p>
              <p>Aujourd’hui il relie deux mondes : la précision de la science et la sagesse des soins ancestraux. Il ne promet pas. Il accompagne.</p>
            </Reveal>
            <Reveal delay={3} className="luc-quote serif">
              <span className="q">«</span> Je cultive l’art de relier mes énergies à celles de la nature, riche en pouvoir de guérison. <span className="q">»</span>
            </Reveal>
            <Reveal delay={4}>
              <a href="#contact" className="link" data-hover>Le rencontrer →</a>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`
        .luc { position: relative; padding: 180px var(--pad); overflow: hidden; }
        .luc-wrap { position: relative; z-index: 2; }
        .luc-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 80px; align-items: center; max-width: 1280px; margin: 0 auto; }
        .portrait-frame { display: flex; flex-direction: column; gap: 16px; }
        .portrait-ph {
          aspect-ratio: 3 / 4; width: 100%;
          background: #0a0e1a;
          border: 1px solid var(--hairline);
          display: flex; align-items: flex-end; padding: 20px;
          position: relative; overflow: hidden;
        }
        .ph-photo { position: absolute; inset: 0; background-size: cover; background-position: center top; }
        .portrait-caption { display: flex; flex-direction: column; gap: 4px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
        .luc-title { font-size: clamp(40px, 5.5vw, 88px); margin: 28px 0 36px; font-style: italic; }
        .luc-title .ital { color: var(--hue); }
        .luc-body p { color: var(--ink); max-width: 560px; line-height: 1.75; margin: 0 0 16px; opacity: .92; }
        .luc-quote { font-family: var(--serif); font-size: clamp(22px, 2.4vw, 32px); font-style: italic; line-height: 1.4; color: var(--ink); padding: 36px 0; margin: 36px 0; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); font-weight: 300; max-width: 580px; }
        .luc-quote .q { color: color-mix(in oklab, var(--hue) 70%, transparent); margin: 0 6px; font-size: 1.4em; }
        @media (max-width: 900px) { .luc-grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [soin, setSoin] = useState('feu');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="contact" data-screen-label="08 Contact">
      <div className="contact-bg ornament">
        <div className="halo big"></div>
      </div>
      <div className="wrap c-wrap">
        <div className="c-head">
          <Reveal className="eyebrow">Prendre rendez-vous</Reveal>
          <h2 className="display c-title">
            <SplitText>Un mot,</SplitText> <span className="ital"><SplitText>et nous trouvons</SplitText></span><br/>
            <SplitText>le juste moment.</SplitText>
          </h2>
        </div>
        <div className="c-grid">
          <div className="c-channels">
            <a href="tel:+33685757863" className="ch" data-hover>
              <span className="ch-flag mono">FR</span>
              <span className="ch-num serif">+33 6 85 75 78 63</span>
              <span className="ch-act mono">appeler →</span>
            </a>
            <a href="tel:+41795950938" className="ch" data-hover>
              <span className="ch-flag mono">CH</span>
              <span className="ch-num serif">+41 79 595 09 38</span>
              <span className="ch-act mono">appeler →</span>
            </a>
            <a href="https://wa.me/33685757863" className="ch" data-hover>
              <span className="ch-flag mono">WA</span>
              <span className="ch-num serif">WhatsApp</span>
              <span className="ch-act mono">écrire →</span>
            </a>
            <div className="ch-info mono">
              <span>St-Julien-en-Genevois</span>
              <span>Présentiel · Distance</span>
              <span>Sur rendez-vous · 30 km de Genève</span>
            </div>
          </div>
          <form className="c-form" onSubmit={(e) => { e.preventDefault(); if (name && phone) setSent(true); }}>
            {sent ? (
              <div className="sent">
                <Mark size={48} />
                <div className="serif sent-t">Message reçu.</div>
                <div className="sent-b">Luc vous rappelle dans la journée.</div>
              </div>
            ) : (
              <>
                <div className="row">
                  <label><span className="mono">Nom</span><input value={name} onChange={e=>setName(e.target.value)} required /></label>
                  <label><span className="mono">Téléphone</span><input value={phone} onChange={e=>setPhone(e.target.value)} required type="tel" /></label>
                </div>
                <label className="full"><span className="mono">Email</span><input value={email} onChange={e=>setEmail(e.target.value)} type="email" /></label>
                <label className="full"><span className="mono">Soin envisagé</span>
                  <div className="pills">
                    {ACTS.map(a => (
                      <button type="button" key={a.id} className={`pill ${soin===a.id?'a':''}`} onClick={()=>setSoin(a.id)} data-hover>{a.el} · {a.soin}</button>
                    ))}
                  </div>
                </label>
                <label className="full"><span className="mono">Message libre</span><textarea rows="4" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Décrivez en quelques lignes ce que vous traversez."/></label>
                <button className="btn submit" type="submit" data-hover><span className="stone"></span>Envoyer la demande</button>
                <div className="form-foot mono">Réponse sous 24h · Aucune donnée partagée</div>
              </>
            )}
          </form>
        </div>
      </div>
      <style>{`
        .contact { position: relative; padding: 180px var(--pad); background: var(--bg-1); overflow: hidden; }
        .contact-bg { position: absolute; inset: 0; }
        .contact-bg .halo.big { position: absolute; left: -10%; top: -20%; width: 800px; height: 800px; background: radial-gradient(circle, color-mix(in oklab, var(--hue-glow) 14%, transparent) 0%, transparent 60%); border-radius: 50%; filter: blur(60px); mix-blend-mode: screen; }
        .c-wrap { position: relative; z-index: 2; }
        .c-head { text-align: center; margin-bottom: 100px; }
        .c-title { font-size: clamp(56px, 9vw, 160px); margin-top: 32px; font-style: italic; }
        .c-title .ital { color: var(--hue); }
        .c-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; max-width: 1200px; margin: 0 auto; }
        .c-channels { display: flex; flex-direction: column; gap: 14px; }
        .ch { display: grid; grid-template-columns: 50px 1fr auto; align-items: center; gap: 16px; padding: 22px 26px; background: rgba(20,26,42,.7); border: 1px solid var(--hairline); border-radius: 14px; color: var(--ink); text-decoration: none; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: border-color .3s, transform .3s; }
        .ch:hover { border-color: var(--hue); transform: translateX(4px); }
        .ch-flag { font-size: 11px; letter-spacing: 0.18em; color: var(--hue); }
        .ch-num { font-size: 20px; font-weight: 300; }
        .ch-act { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
        .ch-info { display: flex; flex-direction: column; gap: 6px; padding: 24px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); border-top: 1px solid var(--hairline); margin-top: 12px; }
        .c-form { background: rgba(20,26,42,.6); border: 1px solid var(--hairline); border-radius: 18px; padding: 40px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .c-form label { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .c-form label span.mono { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3); }
        .c-form input, .c-form textarea { background: var(--bg-0); border: 1px solid var(--hairline); border-radius: 10px; padding: 14px 16px; color: var(--ink); font-family: var(--sans); font-size: 14px; font-weight: 300; transition: border-color .3s; }
        .c-form input:focus, .c-form textarea:focus { outline: none; border-color: var(--hue); }
        .c-form textarea { resize: vertical; }
        .pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill { background: var(--bg-0); border: 1px solid var(--hairline); color: var(--ink-2); padding: 10px 14px; border-radius: 999px; font-size: 12px; cursor: pointer; transition: all .3s; font-family: var(--sans); }
        .pill:hover { color: var(--ink); border-color: var(--ink-2); }
        .pill.a { background: color-mix(in oklab, var(--hue) 14%, transparent); border-color: var(--hue); color: var(--ink); }
        .submit { width: 100%; justify-content: center; margin-top: 16px; }
        .form-foot { text-align: center; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); margin-top: 16px; }
        .sent { text-align: center; padding: 60px 0; color: var(--hue); }
        .sent-t { font-size: 32px; font-style: italic; color: var(--ink); margin: 24px 0 12px; font-weight: 300; }
        .sent-b { color: var(--ink-2); }
        @media (max-width: 900px) { .c-grid { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   FOOTER cinématique
   ============================================================ */
function Footer() {
  return (
    <footer className="footer" data-screen-label="09 Footer">
      <div className="footer-stars ornament"></div>
      <div className="wrap">
        <div className="f-mark">
          <Mark size={64} />
          <div className="serif f-name">Reboot’eux</div>
          <div className="serif f-cite">— retrouver son juste équilibre.</div>
        </div>
        <div className="f-grid">
          <div className="f-col">
            <div className="f-h mono">Les soins</div>
            <a className="link" href="#feu">Coupeur de feu</a>
            <a className="link" href="#eau">Énergéticien · Magnétiseur</a>
            <a className="link" href="#terre">Rebouteux</a>
            <a className="link" href="#souffle">Accompagnement</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Contact</div>
            <a className="link" href="tel:+33685757863">FR · +33 6 85 75 78 63</a>
            <a className="link" href="tel:+41795950938">CH · +41 79 595 09 38</a>
            <a className="link" href="#">WhatsApp</a>
            <a className="link" href="#">contact@reboot-eux.com</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Pratique</div>
            <a className="link" href="#">Tarifs</a>
            <a className="link" href="#">Zone d’intervention</a>
            <a className="link" href="#">Foire aux questions</a>
            <a className="link" href="#">À propos de Luc</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Cabinet</div>
            <span>St-Julien-en-Genevois</span>
            <span>France · Suisse romande</span>
            <span>30 km autour de Genève</span>
          </div>
        </div>
        <div className="f-bot">
          <span className="mono">© 2026 Reboot’eux · Luc Dacquin</span>
          <div className="f-legal">
            <a className="link" href="#">Mentions légales</a>
            <a className="link" href="#">RGPD</a>
            <a className="link" href="#">Cookies</a>
          </div>
        </div>
      </div>
      <style>{`
        .footer { position: relative; padding: 140px var(--pad) 60px; background: linear-gradient(180deg, var(--bg-1) 0%, #050810 100%); overflow: hidden; border-top: 1px solid var(--hairline); }
        .footer-stars { position: absolute; inset: 0;
          background-image:
            radial-gradient(1px 1px at 12% 22%, #F5EFE0 100%, transparent),
            radial-gradient(1px 1px at 78% 65%, #F5EFE0 100%, transparent),
            radial-gradient(1px 1px at 45% 80%, #FFE4B5 100%, transparent),
            radial-gradient(1px 1px at 88% 12%, #F5EFE0 100%, transparent),
            radial-gradient(1px 1px at 25% 50%, #F5EFE0 100%, transparent);
          opacity: .6;
          animation: shimmer 6s ease-in-out infinite;
        }
        @keyframes shimmer { 0%,100%{opacity:.4;} 50%{opacity:.7;} }
        .f-mark { text-align: center; margin-bottom: 80px; color: var(--hue); }
        .f-name { font-size: 36px; color: var(--ink); margin-top: 12px; font-weight: 300; letter-spacing: -0.02em; }
        .f-cite { font-size: 14px; color: var(--ink-2); font-style: italic; margin-top: 4px; }
        .f-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; padding-bottom: 64px; border-bottom: 1px solid var(--hairline); }
        .f-col { display: flex; flex-direction: column; gap: 12px; }
        .f-col span { color: var(--ink-2); font-size: 13px; }
        .f-h { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
        .f-bot { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; color: var(--ink-3); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; }
        .f-legal { display: flex; gap: 24px; }
        @media (max-width: 900px) { .f-grid { grid-template-columns: 1fr 1fr; } .f-bot { flex-direction: column; gap: 16px; } }
      `}</style>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [active, setActive] = useState('feu');
  const [lang, setLang] = useState('fr');
  const [soundOn, setSoundOn] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const themeKey = (tweaks.element && tweaks.element !== 'auto') ? tweaks.element : active;
  const theme = HUES[themeKey] || HUES.feu;

  useEffect(() => {
    document.documentElement.style.setProperty('--hue', theme.h);
    document.documentElement.style.setProperty('--hue-glow', theme.g);
  }, [theme.h, theme.g]);

  function navigate(id) {
    if (id === 'top') { scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Cursor />
      <Nav activeSection={active} onNav={navigate} lang={lang} onLang={() => setLang(l => l==='fr'?'en':'fr')} soundOn={soundOn} onSound={() => setSoundOn(s => !s)} />
      <ProgressRail active={active} />
      <main>
        <Hero />
        <Manifeste />
        <Acts onActive={setActive} />
        <LucSection />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel title="Reboot’eux">
        <TweakSection label="Élément actif">
          <TweakRadio label="Ambiance" value={tweaks.element} onChange={v => setTweak('element', v)} options={['auto', 'feu', 'eau', 'terre', 'souffle']} />
        </TweakSection>
        <TweakSection label="Voile vidéo">
          <TweakSlider label="Opacité" value={tweaks.veil ?? 0.55} onChange={v => setTweak('veil', v)} min={0.2} max={0.85} step={0.05} unit="" />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
