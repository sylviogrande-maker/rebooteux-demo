/* global React, ReactDOM, VideoBg, Cursor, Nav, Mark, SplitText, Reveal */
const { useEffect, useRef, useState } = React;

const HUES = {
  feu:     { h: '#E8B872', g: '#FFE4B5' },
  eau:     { h: '#4DA8DA', g: '#BFE3F4' },
  terre:   { h: '#6B9C7B', g: '#B6D4BB' },
  souffle: { h: '#B8A8D9', g: '#E2D8F0' },
};

/* ============================================================
   HERO — court, pour la page pratique
   ============================================================ */
function HeroPratique() {
  return (
    <section id="top" className="hero-prat">
      <div className="hero-prat-bg ornament">
        <div className="halo big"></div>
        <div className="halo small"></div>
      </div>
      <div className="wrap hero-prat-wrap">
        <Reveal className="eyebrow-row"><span className="eyebrow">Le cadre pratique</span></Reveal>
        <h1 className="display hero-prat-title">
          <SplitText tag="span">Tout ce qu’il faut savoir,</SplitText>
          <br/>
          <span className="ital"><SplitText tag="span">avant de venir.</SplitText></span>
        </h1>
        <Reveal delay={2}>
          <p className="hero-prat-sub serif">
            Tarifs, déroulé d’une séance, zone d’intervention, foire aux questions.<br/>
            Pour que vous sachiez exactement ce qui vous attend.
          </p>
        </Reveal>
        <Reveal delay={3} className="hero-prat-anchors">
          <a className="anchor-pill" href="#deroule" data-hover><span className="mono">01</span> Déroulé</a>
          <a className="anchor-pill" href="#tarifs" data-hover><span className="mono">02</span> Tarifs</a>
          <a className="anchor-pill" href="#zone" data-hover><span className="mono">03</span> Zone</a>
          <a className="anchor-pill" href="#faq" data-hover><span className="mono">04</span> FAQ</a>
        </Reveal>
      </div>
      <style>{`
        .hero-prat { position: relative; min-height: 80vh; padding: 200px var(--pad) 120px; display: grid; place-items: center; overflow: hidden; }
        .hero-prat-bg { position: absolute; inset: 0; pointer-events: none; }
        .hero-prat-bg .halo { position: absolute; border-radius: 50%; filter: blur(60px); mix-blend-mode: screen; }
        .hero-prat-bg .big { left: -10%; top: 10%; width: 800px; height: 800px; background: radial-gradient(circle, color-mix(in oklab, var(--feu-glow) 14%, transparent) 0%, transparent 60%); }
        .hero-prat-bg .small { right: -5%; bottom: -10%; width: 500px; height: 500px; background: radial-gradient(circle, color-mix(in oklab, var(--eau) 16%, transparent) 0%, transparent 60%); }
        .hero-prat-wrap { position: relative; z-index: 2; text-align: center; max-width: 1100px; }
        .hero-prat-title { margin: 32px 0 36px; font-style: italic; }
        .hero-prat-title .ital { color: var(--hue); }
        .hero-prat-sub { font-size: clamp(18px, 1.8vw, 24px); color: var(--ink-2); max-width: 620px; margin: 0 auto 56px; line-height: 1.5; font-weight: 300; font-style: italic; }
        .hero-prat-anchors { display: inline-flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
        .anchor-pill { display: inline-flex; align-items: center; gap: 12px; padding: 12px 22px; border-radius: 999px; border: 1px solid var(--hairline); background: rgba(20,26,42,.5); color: var(--ink-2); text-decoration: none; font-size: 13px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: border-color .3s, color .3s, transform .3s; }
        .anchor-pill:hover { border-color: var(--hue); color: var(--ink); transform: translateY(-2px); }
        .anchor-pill .mono { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; color: var(--hue); }
      `}</style>
    </section>
  );
}

/* ============================================================
   DÉROULÉ — 4 étapes
   ============================================================ */
function Deroule() {
  const steps = [
    {
      n: '01', t: 'La prise de contact', d: 'Vous appelez ou écrivez. On échange en quelques minutes pour comprendre ce que vous traversez et choisir le soin le plus adapté. Pas de jargon, pas de pression.', i: 'phone',
    },
    {
      n: '02', t: 'La préparation', d: 'Avant la séance, buvez de l’eau, évitez le café et l’alcool si possible. Habillez-vous confortablement. À distance, choisissez un endroit calme où vous ne serez pas dérangé.', i: 'cup',
    },
    {
      n: '03', t: 'La séance', d: 'Présentielle ou à distance, elle dure 30 à 60 minutes. Luc impose ses mains au-dessus de la zone, parle peu, écoute beaucoup. Vous restez habillé. Vous pouvez fermer les yeux.', i: 'hand',
    },
    {
      n: '04', t: 'Après', d: 'Une fatigue agréable est fréquente. Buvez, marchez, dormez tôt. Luc reste joignable dans les jours qui suivent si quelque chose bouge ou si vous avez une question.', i: 'leaf',
    },
  ];
  return (
    <section id="deroule" className="deroule">
      <div className="wrap">
        <Reveal className="eyebrow">Comment ça se passe</Reveal>
        <h2 className="display section-title">
          <SplitText>Une séance, en quatre temps.</SplitText>
        </h2>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i+1} className="step">
              <span className="step-num mono">{s.n}</span>
              <h3 className="step-t serif">{s.t}</h3>
              <p className="step-d">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .deroule { padding: 160px var(--pad); position: relative; }
        .section-title { font-size: clamp(40px, 6vw, 88px); margin: 24px 0 80px; font-style: italic; max-width: 16ch; }
        .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .step { padding: 32px 0; border-top: 1px solid var(--hairline); }
        .step-num { display: block; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--hue); margin-bottom: 24px; }
        .step-t { font-size: clamp(20px, 2vw, 26px); font-weight: 300; font-style: italic; margin: 0 0 16px; letter-spacing: -0.01em; line-height: 1.2; }
        .step-d { font-size: 14px; color: var(--ink-2); line-height: 1.7; margin: 0; }
        @media (max-width: 980px) { .steps { grid-template-columns: 1fr 1fr; gap: 32px; } }
        @media (max-width: 600px) { .steps { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   TARIFS — 4 cards par compétence
   ============================================================ */
const TARIFS = [
  { id: 'feu', el: 'Le feu', soin: 'Coupeur de feu', durée: '20 à 60 min',
    ligns: [['Présentiel', '70 €'], ['Distance', '50 €'], ['Étudiant présentiel', '60 €'], ['Étudiant distance', '40 €']],
    hue: HUES.feu },
  { id: 'eau', el: 'L’eau', soin: 'Énergéticien · Magnétiseur', durée: '60 min',
    ligns: [['Présentiel', '80 €'], ['Distance', '50 €'], ['Étudiant présentiel', '60 €'], ['Étudiant distance', '40 €']],
    hue: HUES.eau },
  { id: 'terre', el: 'La terre', soin: 'Rebouteux', durée: '30 à 60 min',
    ligns: [['Présentiel', '80 €'], ['Distance', '50 €'], ['Étudiant présentiel', '60 €'], ['Étudiant distance', '40 €']],
    hue: HUES.terre },
  { id: 'souffle', el: 'Le souffle', soin: 'Accompagnement longue durée', durée: 'sur la durée',
    ligns: [['Forfait hebdomadaire', '50 € / sem'], ['Étudiant', 'sur demande']],
    hue: HUES.souffle },
];

function Tarifs() {
  return (
    <section id="tarifs" className="tarifs">
      <div className="wrap">
        <Reveal className="eyebrow">Les tarifs</Reveal>
        <h2 className="display section-title">
          <SplitText>Clairs, sans surprise,</SplitText>
          <br/>
          <span className="ital"><SplitText>tarifs étudiants prévus.</SplitText></span>
        </h2>
        <div className="cards">
          {TARIFS.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i+1, 4)} className="card" style={{ '--hue': t.hue.h, '--hue-glow': t.hue.g }}>
              <div className="card-head">
                <span className="card-el mono">{t.el}</span>
                <h3 className="card-soin serif">{t.soin}</h3>
                <span className="card-dur mono">durée · {t.durée}</span>
              </div>
              <ul className="card-prices">
                {t.ligns.map(([l, p]) => (
                  <li key={l}><span className="l">{l}</span><span className="p">{p}</span></li>
                ))}
              </ul>
              <a href="index.html#contact" className="card-cta" data-hover>Prendre rendez-vous →</a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={4} className="tarifs-note mono">
          paiement · espèces, virement, TWINT (CH) · pas de carte bancaire pour le moment<br/>
          tarifs étudiants sur présentation d’un justificatif · reçu fourni sur demande
        </Reveal>
      </div>
      <style>{`
        .tarifs { padding: 160px var(--pad); position: relative; background: var(--bg-1); }
        .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 1200px; margin: 0 auto; }
        .card { background: rgba(20,26,42,.6); border: 1px solid var(--hairline); border-radius: 18px; padding: 40px; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); transition: border-color .4s, transform .4s; position: relative; overflow: hidden; }
        .card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 0% 0%, color-mix(in oklab, var(--hue) 14%, transparent) 0%, transparent 60%); pointer-events: none; opacity: .8; }
        .card:hover { border-color: var(--hue); transform: translateY(-4px); }
        .card > * { position: relative; z-index: 1; }
        .card-head { padding-bottom: 24px; border-bottom: 1px solid var(--hairline); margin-bottom: 24px; }
        .card-el { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--hue); }
        .card-soin { font-size: clamp(24px, 2.6vw, 34px); font-weight: 300; font-style: italic; letter-spacing: -0.01em; margin: 12px 0 8px; line-height: 1.15; }
        .card-dur { display: block; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-3); }
        .card-prices { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 12px; }
        .card-prices li { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 12px; border-bottom: 1px solid color-mix(in oklab, var(--hairline) 50%, transparent); font-size: 14px; }
        .card-prices li:last-child { border-bottom: none; padding-bottom: 0; }
        .card-prices .l { color: var(--ink-2); }
        .card-prices .p { font-family: var(--serif); font-style: italic; font-size: 22px; color: var(--ink); font-weight: 300; }
        .card-cta { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); text-decoration: none; padding-bottom: 6px; border-bottom: 1px solid var(--hue); font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; transition: gap .3s, color .3s; }
        .card-cta:hover { color: var(--hue); gap: 14px; }
        .tarifs-note { text-align: center; margin-top: 64px; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); line-height: 2; }
        @media (max-width: 800px) { .cards { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   ZONE — radar animé avec balayage tournant
   ============================================================ */
const SWEEP_DURATION = 8; // seconds

// Each city has a position + an angle (relative to center) used to time its ping
// Center is at (300, 220). Radius 30km = 160px.
// angle in degrees: 0 = east, 90 = south, 180 = west, 270 = north
const RADAR_CITIES = [
  // North group (well-spaced)
  { nom: 'Versoix',     d: '24 km', cx: 280, cy: 90,  angle: 257, anchor: 'start',  dx: 12,  dy: 4 },
  { nom: 'Genève',      d: '12 km', cx: 320, cy: 130, angle: 297, anchor: 'start',  dx: 12,  dy: 4 },
  { nom: 'Carouge',     d: '9 km',  cx: 290, cy: 145, angle: 257, anchor: 'end',    dx: -12, dy: 4 },
  { nom: 'Annemasse',   d: '15 km', cx: 380, cy: 195, angle: 332, anchor: 'start',  dx: 12,  dy: 4 },
  // East
  { nom: 'Bonneville',  d: '28 km', cx: 430, cy: 270, angle: 26,  anchor: 'start',  dx: 12,  dy: 4 },
  // South
  { nom: 'Annecy',      d: '32 km', cx: 280, cy: 380, angle: 95,  anchor: 'start',  dx: 12,  dy: 4 },
  { nom: 'Cluses',      d: '34 km', cx: 410, cy: 340, angle: 47,  anchor: 'start',  dx: 12,  dy: 4 },
];
const RADAR_CENTER = { cx: 300, cy: 220 };

function Zone() {
  return (
    <section id="zone" className="zone">
      <div className="wrap">
        <Reveal className="eyebrow">Zone d’intervention</Reveal>
        <h2 className="display section-title">
          <SplitText>30 kilomètres autour</SplitText>
          <br/>
          <span className="ital"><SplitText>de St-Julien-en-Genevois.</SplitText></span>
        </h2>
        <div className="zone-grid">
          <Reveal className="zone-map">
            <svg viewBox="0 0 600 460" xmlns="http://www.w3.org/2000/svg" aria-label="Zone d'intervention de Reboot'eux" className="radar">
              <defs>
                {/* Sweep gradient (fades from full to nothing along the arc) */}
                <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"  stopColor="var(--feu)" stopOpacity="0.10"/>
                  <stop offset="60%" stopColor="var(--feu)" stopOpacity="0.04"/>
                  <stop offset="100%" stopColor="var(--feu)" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="var(--feu)" stopOpacity="0.55"/>
                  <stop offset="60%"  stopColor="var(--feu)" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="var(--feu)" stopOpacity="0"/>
                </linearGradient>
              </defs>

              {/* Halo (subtle radial glow) */}
              <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="160" fill="url(#haloGrad)"/>

              {/* Concentric rings */}
              <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="160" fill="none" stroke="var(--hue)" strokeOpacity="0.30" strokeWidth="1" strokeDasharray="3 5"/>
              <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="106" fill="none" stroke="var(--hue)" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 6"/>
              <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="53"  fill="none" stroke="var(--hue)" strokeOpacity="0.10" strokeWidth="1" strokeDasharray="2 6"/>

              {/* Cross hairs */}
              <line x1={RADAR_CENTER.cx - 170} y1={RADAR_CENTER.cy} x2={RADAR_CENTER.cx + 170} y2={RADAR_CENTER.cy} stroke="var(--hue)" strokeOpacity="0.08" strokeWidth="1"/>
              <line x1={RADAR_CENTER.cx} y1={RADAR_CENTER.cy - 170} x2={RADAR_CENTER.cx} y2={RADAR_CENTER.cy + 170} stroke="var(--hue)" strokeOpacity="0.08" strokeWidth="1"/>

              {/* Sweep beam — rotating cone */}
              <g className="radar-sweep" style={{ transformOrigin: `${RADAR_CENTER.cx}px ${RADAR_CENTER.cy}px` }}>
                <path
                  d={`M ${RADAR_CENTER.cx} ${RADAR_CENTER.cy}
                      L ${RADAR_CENTER.cx + 160} ${RADAR_CENTER.cy - 30}
                      A 160 160 0 0 0 ${RADAR_CENTER.cx + 160} ${RADAR_CENTER.cy + 30}
                      Z`}
                  fill="url(#sweepGrad)"
                />
                <line x1={RADAR_CENTER.cx} y1={RADAR_CENTER.cy} x2={RADAR_CENTER.cx + 160} y2={RADAR_CENTER.cy} stroke="var(--feu)" strokeOpacity="0.7" strokeWidth="1"/>
              </g>

              {/* Center point — St-Julien (always visible) */}
              <g>
                <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="14" fill="none" stroke="var(--hue)" strokeOpacity="0.4" strokeWidth="1" className="center-ring"/>
                <circle cx={RADAR_CENTER.cx} cy={RADAR_CENTER.cy} r="5" fill="var(--hue)"/>
                <text x={RADAR_CENTER.cx + 18} y={RADAR_CENTER.cy + 4} fill="var(--ink)" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>
                  St-Julien-en-Genevois
                </text>
              </g>

              {/* Cities — each pings when the sweep passes over its angle */}
              {RADAR_CITIES.map((v) => {
                // Calculate when the sweep reaches this city's angle.
                // Sweep goes 0° → 360° in SWEEP_DURATION seconds. Use negative delay to anchor.
                const delay = -((v.angle / 360) * SWEEP_DURATION).toFixed(2);
                return (
                  <g key={v.nom} className="city" style={{ animationDelay: `${delay}s` }}>
                    <circle cx={v.cx} cy={v.cy} r="8" fill="none" stroke="var(--hue)" strokeWidth="1" className="city-ping"/>
                    <circle cx={v.cx} cy={v.cy} r="3" fill="var(--ink)" className="city-dot"/>
                    <text
                      x={v.cx + v.dx} y={v.cy + v.dy}
                      textAnchor={v.anchor}
                      fill="var(--ink-2)" fontSize="10" fontFamily="var(--mono)" letterSpacing="0.12em"
                      style={{ textTransform: 'uppercase' }}
                      className="city-label"
                    >
                      {v.nom} · {v.d}
                    </text>
                  </g>
                );
              })}
            </svg>
            <style>{`
              .radar { width: 100%; height: auto; max-width: 600px; display: block; }
              @keyframes radarSpin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
              @keyframes cityPing {
                0%   { opacity: 0; r: 3; }
                3%   { opacity: 1; r: 14; }
                12%  { opacity: 0.6; r: 18; }
                25%  { opacity: 0; r: 22; }
                100% { opacity: 0; r: 3; }
              }
              @keyframes cityDot {
                0%, 1%   { opacity: 0.15; }
                3%, 25%  { opacity: 1; }
                40%, 100%{ opacity: 0.15; }
              }
              @keyframes cityLabel {
                0%, 1%   { opacity: 0; }
                4%, 25%  { opacity: 1; }
                40%, 100%{ opacity: 0; }
              }
              .radar-sweep { animation: radarSpin ${SWEEP_DURATION}s linear infinite; }
              .city .city-ping  { animation: cityPing  ${SWEEP_DURATION}s linear infinite; transform-box: fill-box; transform-origin: center; }
              .city .city-dot   { animation: cityDot   ${SWEEP_DURATION}s linear infinite; }
              .city .city-label { animation: cityLabel ${SWEEP_DURATION}s linear infinite; }
              .center-ring { animation: radarSpin 12s linear infinite reverse; transform-origin: ${RADAR_CENTER.cx}px ${RADAR_CENTER.cy}px; }
              @media (prefers-reduced-motion: reduce) {
                .radar-sweep, .city .city-ping, .city .city-dot, .city .city-label, .center-ring { animation: none !important; }
                .city .city-dot, .city .city-label { opacity: 0.85; }
              }
            `}</style>
          </Reveal>
          <div className="zone-text">
            <Reveal delay={1}>
              <p className="zone-p">
                Luc se déplace dans un rayon de 30 km autour de son cabinet, à St-Julien-en-Genevois. Cette zone couvre la quasi-totalité du bassin genevois (France et Suisse romande).
              </p>
            </Reveal>
            <Reveal delay={2} className="zone-villes">
              <div className="zone-h mono">Villes desservies</div>
              <ul>
                <li>Genève · Carouge · Versoix (CH)</li>
                <li>Annemasse · Bonneville · St-Gervais (FR)</li>
                <li>Annecy · Cluses · Chamonix (FR)</li>
                <li>Et toute la zone frontalière franco-suisse</li>
              </ul>
            </Reveal>
            <Reveal delay={3} className="zone-note mono">
              au-delà de 30 km · possible sur demande, frais de déplacement appliqués
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`
        .zone { padding: 160px var(--pad); position: relative; }
        .zone-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .zone-map svg { width: 100%; height: auto; max-width: 600px; }
        .zone-text { display: flex; flex-direction: column; gap: 24px; }
        .zone-p { font-size: 17px; line-height: 1.7; color: var(--ink); margin: 0; max-width: 480px; }
        .zone-villes ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .zone-villes li { color: var(--ink-2); font-size: 14px; padding-left: 16px; position: relative; }
        .zone-villes li::before { content: ''; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--hue); box-shadow: 0 0 8px var(--hue-glow); }
        .zone-h { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 12px; }
        .zone-note { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); padding-top: 24px; border-top: 1px solid var(--hairline); line-height: 1.8; }
        @media (max-width: 900px) { .zone-grid { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
    </section>
  );
}

/* ============================================================
   FAQ — accordéon
   ============================================================ */
const FAQS = [
  {
    q: 'Est-ce que les soins de Luc remplacent un traitement médical ?',
    a: 'Non, jamais. Les soins de Luc sont des compléments, pas des substituts. Ils s’inscrivent en alliance avec le parcours médical, pas à sa place. Pour toute pathologie, consultez d’abord un médecin.',
  },
  {
    q: 'Est-ce que les soins font mal ?',
    a: 'Non. L’imposition des mains est sans contact direct. Le travail de rebouteux est manuel mais doux, sans crispation. Vous restez habillé, allongé ou assis selon le soin. Beaucoup de personnes ressentent une chaleur ou un apaisement.',
  },
  {
    q: 'Comment se passe une séance à distance ?',
    a: 'Vous prenez rendez-vous, on échange par téléphone quelques minutes pour comprendre ce que vous traversez, puis vous vous installez tranquillement chez vous au moment convenu. Luc travaille à son cabinet en pensant à vous. Beaucoup ressentent une chaleur, des picotements ou un grand apaisement pendant la séance.',
  },
  {
    q: 'Y a-t-il des contre-indications ?',
    a: 'Aucune contre-indication connue. Les soins sont compatibles avec tous les traitements médicaux et toutes les conditions. Si vous avez un doute, parlez-en à Luc avant de prendre rendez-vous.',
  },
  {
    q: 'Combien de séances faut-il en moyenne ?',
    a: 'Pour un soin ponctuel (brûlure, blocage aigu) : 1 à 3 séances suffisent souvent. Pour un travail plus profond ou un accompagnement, le rythme se construit ensemble, généralement une fois par semaine ou par quinzaine.',
  },
  {
    q: 'Que se passe-t-il après la séance ?',
    a: 'Une fatigue agréable est fréquente dans les heures qui suivent — c’est le corps qui intègre. Buvez beaucoup d’eau, marchez si vous pouvez, dormez tôt. Les effets continuent de se déposer pendant 2 à 3 jours.',
  },
  {
    q: 'Comment payer ?',
    a: 'Espèces, virement bancaire, ou TWINT en Suisse. Pas de carte bancaire pour le moment. Reçu fourni sur demande.',
  },
  {
    q: 'Y a-t-il un remboursement par la mutuelle ou la sécu ?',
    a: 'Pas de remboursement par la sécurité sociale (médecines complémentaires). Certaines mutuelles proposent un forfait médecines douces — renseignez-vous auprès de la vôtre. Reçu fourni sur demande.',
  },
  {
    q: 'Comment réserver ?',
    a: 'Par téléphone (FR ou CH), WhatsApp, ou via le formulaire de contact sur la page d’accueil. Réponse sous 24h en semaine.',
  },
  {
    q: 'Et si ça ne marche pas pour moi ?',
    a: 'Tous les corps ne réagissent pas pareil et certains soins fonctionnent mieux sur certaines personnes. Si après 2-3 séances vous ne ressentez aucun effet, on en discute ensemble et on réoriente si besoin.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="wrap">
        <Reveal className="eyebrow">Foire aux questions</Reveal>
        <h2 className="display section-title">
          <SplitText>Les réponses</SplitText>
          <br/>
          <span className="ital"><SplitText>aux questions qu’on se pose.</SplitText></span>
        </h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={Math.min(i+1, 4)} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} data-hover aria-expanded={open === i}>
                <span className="faq-num mono">{String(i+1).padStart(2,'0')}</span>
                <span className="faq-q-text serif">{f.q}</span>
                <span className="faq-toggle" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .faq { padding: 160px var(--pad); position: relative; background: var(--bg-1); }
        .faq-list { max-width: 980px; margin: 80px auto 0; }
        .faq-item { border-top: 1px solid var(--hairline); }
        .faq-item:last-child { border-bottom: 1px solid var(--hairline); }
        .faq-q { width: 100%; display: grid; grid-template-columns: 60px 1fr 30px; gap: 24px; align-items: center; padding: 32px 0; background: none; border: none; color: var(--ink-2); cursor: pointer; text-align: left; transition: color .3s; }
        .faq-q:hover { color: var(--ink); }
        .faq-num { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3); }
        .faq-q-text { font-size: clamp(18px, 2vw, 24px); font-weight: 300; font-style: italic; line-height: 1.3; letter-spacing: -0.01em; color: var(--ink); }
        .faq-toggle { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--hairline); display: flex; align-items: center; justify-content: center; color: var(--ink-2); transition: transform .5s var(--ease), border-color .3s, color .3s; flex-shrink: 0; }
        .faq-item.open .faq-toggle { transform: rotate(45deg); border-color: var(--hue); color: var(--hue); }
        .faq-a-wrap { max-height: 0; overflow: hidden; transition: max-height .6s var(--ease); }
        .faq-item.open .faq-a-wrap { max-height: 400px; }
        .faq-a { padding: 0 24px 32px 84px; margin: 0; color: var(--ink-2); font-size: 15px; line-height: 1.8; max-width: 740px; }
        @media (max-width: 700px) {
          .faq-q { grid-template-columns: 40px 1fr 30px; gap: 14px; }
          .faq-a { padding: 0 0 24px 54px; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   CTA — bandeau final
   ============================================================ */
function CTABand() {
  return (
    <section id="cta" className="cta-band">
      <VideoBg src="videos/souffle.mp4" hue={HUES.souffle} intensity={0.6} />
      <div className="wrap cta-wrap">
        <Reveal className="eyebrow">Prêt à faire le pas ?</Reveal>
        <h2 className="display cta-title">
          <SplitText>Une question reste ?</SplitText>
          <br/>
          <span className="ital"><SplitText>Appelons-nous.</SplitText></span>
        </h2>
        <Reveal delay={2} className="cta-buttons">
          <a href="tel:+33685757863" className="btn" data-hover><span className="stone"></span>FR · +33 6 85 75 78 63</a>
          <a href="tel:+41795950938" className="btn btn-ghost" data-hover>CH · +41 79 595 09 38</a>
          <a href="index.html#contact" className="btn btn-ghost" data-hover>Formulaire de contact →</a>
        </Reveal>
      </div>
      <style>{`
        .cta-band { position: relative; min-height: 80vh; display: grid; place-items: center; padding: 160px var(--pad); overflow: hidden; }
        .cta-wrap { position: relative; z-index: 2; text-align: center; max-width: 1000px; }
        .cta-title { font-size: clamp(48px, 8vw, 130px); margin: 32px 0 56px; font-style: italic; }
        .cta-title .ital { color: var(--hue); }
        .cta-buttons { display: inline-flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
      `}</style>
    </section>
  );
}

/* ============================================================
   FOOTER — repris de app.jsx, adapté pour cross-page nav
   ============================================================ */
function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="footer-stars ornament"></div>
      <div className="wrap">
        <div className="f-mark">
          <Mark size={48} />
          <div className="serif f-name">Reboot’eux</div>
          <div className="serif f-cite">— retrouver son juste équilibre.</div>
        </div>
        <div className="f-grid">
          <div className="f-col">
            <div className="f-h mono">Les soins</div>
            <a className="link" href="index.html#feu">Coupeur de feu</a>
            <a className="link" href="index.html#eau">Énergéticien · Magnétiseur</a>
            <a className="link" href="index.html#terre">Rebouteux</a>
            <a className="link" href="index.html#souffle">Accompagnement</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Contact</div>
            <a className="link" href="tel:+33685757863">FR · +33 6 85 75 78 63</a>
            <a className="link" href="tel:+41795950938">CH · +41 79 595 09 38</a>
            <a className="link" href="https://wa.me/33685757863">WhatsApp</a>
            <a className="link" href="index.html#contact">Formulaire</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Pratique</div>
            <a className="link" href="#tarifs">Tarifs</a>
            <a className="link" href="#zone">Zone d’intervention</a>
            <a className="link" href="#faq">Foire aux questions</a>
            <a className="link" href="index.html#luc">À propos de Luc</a>
          </div>
          <div className="f-col">
            <div className="f-h mono">Cabinet</div>
            <span>St-Julien-en-Genevois</span>
            <span>France · Suisse romande</span>
            <span>30 km autour de Genève</span>
            <span>Sur rendez-vous</span>
          </div>
        </div>
        <div className="f-bot">
          <span className="mono">© 2026 Reboot’eux · Luc Dacquin</span>
          <div className="f-legal">
            <a className="link" href="mentions-legales.html">Mentions légales</a>
            <a className="link" href="confidentialite.html">Confidentialité · RGPD</a>
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
          opacity: .5; animation: shimmer 6s ease-in-out infinite;
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
  const [lang, setLang] = useState(window.__lang || 'fr');

  useEffect(() => {
    window.__lang = lang;
    try { localStorage.setItem('reb_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
  }, [lang]);

  function navigate(id) {
    const pratiqueIds = ['top','deroule','tarifs','zone','faq','cta'];
    if (!pratiqueIds.includes(id)) {
      window.location.href = `index.html#${id === 'top' ? '' : id}`;
      return;
    }
    if (id === 'top') { scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleLang() {
    const here = location.pathname.split('/').pop() || 'pratique.html';
    let target;
    if (lang === 'en' || here.includes('-en.html')) {
      target = here.replace('-en.html', '.html');
    } else {
      target = here.endsWith('.html') ? here.replace('.html', '-en.html') : here.replace(/\/?$/, '/pratique-en.html');
    }
    location.href = target + location.hash;
  }

  return (
    <>
      <Cursor />
      <Nav activeSection="" onNav={navigate} lang={lang} onLang={toggleLang} />
      <main>
        <HeroPratique />
        <Deroule />
        <Tarifs />
        <Zone />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
