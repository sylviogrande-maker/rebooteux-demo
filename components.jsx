/* global React */
const { useEffect, useRef, useState, useMemo } = React;

/* ============================================================
   i18n — Dictionnaire FR / EN
   t('key') retourne la traduction selon window.__lang
   ============================================================ */
const I18N = {
  fr: {
    'nav.home':'Accueil','nav.feu.l':'Coupeur de feu','nav.feu.sub':'Le feu','nav.eau.l':'Énergéticien · Magnétiseur','nav.eau.sub':'L’eau','nav.terre.l':'Rebouteux','nav.terre.sub':'La terre','nav.souffle.l':'Accompagnement','nav.souffle.sub':'Le souffle','nav.luc.l':'Luc Dacquin','nav.luc.sub':'Alchimiste du vivant','nav.pratique.l':'Tarifs et FAQ','nav.pratique.sub':'Cadre pratique','nav.contact.l':'Prendre rendez-vous','nav.contact.sub':'Contact','nav.menu':'menu','nav.close':'fermer','nav.eyebrow':'Le voyage du vivant','nav.foot1':'St-Julien-en-Genevois · 30 km de Genève',
    'hero.eyebrow':'Cabinet de soins énergétiques · St-Julien-en-Genevois','hero.subA':'retrouver son juste équilibre,','hero.subB':'une','hero.subC':'guérison','hero.subD':'qui honore le corps et l’esprit.','hero.cta1':'Prendre rendez-vous','hero.cta2':'Découvrir le voyage','hero.scroll':'scroller',
    'man.eyebrow':'Manifeste','man.line1':'Soigner n’est pas changer —','man.line2':'c’est rappeler au corps ce qu’il a toujours su être.','man.signature':'— Luc Dacquin, alchimiste du vivant',
    'act.cta':'Prendre rendez-vous →',
    'act.feu.poeticA':'Couper le feu,','act.feu.poeticB':'apaiser la brûlure.','act.feu.quote':'« Sous la main qui sait, la braise se souvient d’avoir été silence. »','act.feu.body':'Imposition des mains à distance ou en présentiel pour soulager les brûlures, le zona, les douleurs aiguës de peau. Une séance de 20 à 60 minutes, sans contact direct.','act.feu.list':['Brûlures du quotidien','Coups de soleil','Zona, herpès','Brûlures post-radiothérapie','Douleurs cutanées aiguës'],
    'act.eau.poeticA':'Faire circuler','act.eau.poeticB':'les flux qui dorment.','act.eau.quote':'« Sous la main qui passe, le courant se souvient d’être courant. »','act.eau.body':'Magnétisme et travail énergétique pour les blocages chroniques, la fatigue persistante, les états où "rien ne passe". Une séance de 60 minutes pour rétablir la circulation des flux.','act.eau.list':['Céphalées','Fatigue chronique','Insomnie','Stress, anxiété','Sciatique','Convalescence'],
    'act.terre.poeticA':'Remettre les os','act.terre.poeticB':'à leur juste place.','act.terre.quote':'« Chaque os connaît sa place. Le geste lui en redonne le souvenir. »','act.terre.body':'Travail manuel ostéo-articulaire ancestral pour les blocages mécaniques — nuque, dos, épaules, articulations. Précis, doux, sans crispation.','act.terre.list':['Nuque bloquée','Lombalgie','Tendinites','Entorses anciennes','Articulations raides','Contractures'],
    'act.souffle.poeticA':'Accompagner ceux','act.souffle.poeticB':'qui traversent l’épreuve.','act.souffle.quote':'« La nuit ne fait pas peur à deux. »','act.souffle.body':'Présence régulière auprès des patients en traitement lourd — cancer, post-opératoire, maladie chronique — en complément du parcours médical. Une alliance de science et de sagesse.','act.souffle.list':['Effets secondaires de chimio','Post-opératoire','Cancer','Maladie chronique','Burnout','Traversées difficiles'],
    'act.feu.soin':'Coupeur de feu','act.eau.soin':'Énergéticien · Magnétiseur','act.terre.soin':'Rebouteux','act.souffle.soin':'Accompagnement longue durée',
    'act.feu.subtitle':'Apaiser les brûlures, le zona, les douleurs aiguës de peau','act.eau.subtitle':'Libérer les blocages, faire circuler l’énergie','act.terre.subtitle':'Remettre le corps en place, soulager les tensions','act.souffle.subtitle':'Soutenir la traversée — cancer, post-opératoire, maladie chronique',
    'act.feu.num':'01 / Le feu','act.eau.num':'02 / L’eau','act.terre.num':'03 / La terre','act.souffle.num':'04 / Le souffle',
    'luc.eyebrow':'L’alchimiste du vivant','luc.titleA':'Quarante-deux années d’ingénierie,','luc.titleB':'une vie entière d’écoute.','luc.body1':'Issu d’une famille vivant en harmonie étroite avec la Nature, sportif accompli, Luc a d’abord choisi la rigueur de l’ingénierie et du management de projet, qu’il pratique pendant quarante-deux années. Puis il quitte un métier qui ne le quittait plus, pour suivre la voie qu’il sentait monter en lui depuis toujours : celle des savoirs ancestraux, transmis par son arrière-grand-mère et ses grands-pères.','luc.body2':'Aujourd’hui il relie les deux mondes : la précision de la science et la sagesse des soins ancestraux. Il maîtrise les techniques de magnétisme et de reboutement, complétées par un chemin de Druide Guérisseur. Il ne promet pas. Il accompagne.','luc.quote':'Je cultive l’art de relier mes énergies à celles de la nature, riche en pouvoir de guérison.','luc.cta':'Le rencontrer →','luc.portrait1':'Luc Dacquin','luc.portrait2':'Ingénieur · sportif · druide guérisseur',
    'contact.eyebrow':'Prendre rendez-vous','contact.titleA':'Un mot,','contact.titleB':'et nous trouvons','contact.titleC':'le juste moment.','contact.callFR':'appeler →','contact.callCH':'appeler →','contact.write':'écrire →','contact.info1':'St-Julien-en-Genevois','contact.info2':'Présentiel · Distance','contact.info3':'Sur rendez-vous · 30 km de Genève',
    'form.name':'Nom','form.phone':'Téléphone','form.email':'Email','form.soin':'Soin envisagé','form.msg':'Message libre','form.placeholder':'Décrivez en quelques lignes ce que vous traversez.','form.consent':'J’accepte que mes données (nom, téléphone, email, message) soient utilisées par Luc Dacquin pour me recontacter au sujet de ma demande. Voir la','form.consent.link':'politique de confidentialité','form.submit':'Envoyer la demande','form.foot':'Réponse sous 24h · Données conservées 3 ans max ·','form.sent.t':'Message reçu.','form.sent.b':'Luc vous rappelle dans la journée.',
    'foot.h.soins':'Les soins','foot.h.contact':'Contact','foot.h.pratique':'Pratique','foot.h.cabinet':'Cabinet','foot.tarifs':'Tarifs','foot.zone':'Zone d’intervention','foot.faq':'Foire aux questions','foot.luc':'À propos de Luc','foot.formulaire':'Formulaire','foot.cabinet1':'St-Julien-en-Genevois','foot.cabinet2':'France · Suisse romande','foot.cabinet3':'30 km autour de Genève','foot.cabinet4':'Sur rendez-vous','foot.copy':'© 2026 Reboot’eux · Luc Dacquin','foot.signature':'— retrouver son juste équilibre.','foot.legal1':'Mentions légales','foot.legal2':'Confidentialité · RGPD',
    'prat.eyebrow':'Le cadre pratique','prat.titleA':'Tout ce qu’il faut savoir,','prat.titleB':'avant de venir.','prat.sub':'Tarifs, déroulé d’une séance, zone d’intervention, foire aux questions. Pour que vous sachiez exactement ce qui vous attend.','prat.anchor1':'Déroulé','prat.anchor2':'Tarifs','prat.anchor3':'Zone','prat.anchor4':'FAQ',
  },
  en: {
    'nav.home':'Home','nav.feu.l':'Fire cutter','nav.feu.sub':'Fire','nav.eau.l':'Energy healer · Magnetizer','nav.eau.sub':'Water','nav.terre.l':'Bone-setter','nav.terre.sub':'Earth','nav.souffle.l':'Long-term support','nav.souffle.sub':'Breath','nav.luc.l':'Luc Dacquin','nav.luc.sub':'Alchemist of the living','nav.pratique.l':'Pricing & FAQ','nav.pratique.sub':'Practical','nav.contact.l':'Book a session','nav.contact.sub':'Contact','nav.menu':'menu','nav.close':'close','nav.eyebrow':'The journey of the living','nav.foot1':'St-Julien-en-Genevois · 30 km from Geneva',
    'hero.eyebrow':'Energy healing practice · St-Julien-en-Genevois','hero.subA':'finding your right balance,','hero.subB':'a','hero.subC':'healing','hero.subD':'that honors body and spirit.','hero.cta1':'Book a session','hero.cta2':'Discover the journey','hero.scroll':'scroll',
    'man.eyebrow':'Manifesto','man.line1':'Healing is not changing —','man.line2':'it is reminding the body of what it has always known how to be.','man.signature':'— Luc Dacquin, alchemist of the living',
    'act.cta':'Book a session →',
    'act.feu.poeticA':'Cutting fire,','act.feu.poeticB':'easing the burn.','act.feu.quote':'"Beneath the knowing hand, the ember remembers having been silence."','act.feu.body':'Hands-on healing — remote or in person — for burns, shingles and acute skin pain. A 20- to 60-minute session, without direct contact.','act.feu.list':['Everyday burns','Sunburn','Shingles, herpes','Post-radiotherapy burns','Acute skin pain'],
    'act.eau.poeticA':'Letting the dormant','act.eau.poeticB':'flows circulate again.','act.eau.quote':'"Beneath the passing hand, the current remembers being current."','act.eau.body':'Magnetism and energy work for chronic blockages, persistent fatigue, and states where "nothing flows anymore". A 60-minute session to restore circulation.','act.eau.list':['Headaches','Chronic fatigue','Insomnia','Stress, anxiety','Sciatica','Recovery'],
    'act.terre.poeticA':'Returning the bones','act.terre.poeticB':'to their rightful place.','act.terre.quote':'"Every bone knows its place. The gesture only reminds it."','act.terre.body':'Ancestral hands-on osteo-articular work for mechanical blockages — neck, back, shoulders, joints. Precise, gentle, without strain.','act.terre.list':['Stiff neck','Lower back pain','Tendinitis','Old sprains','Stiff joints','Muscle contractions'],
    'act.souffle.poeticA':'Accompanying those','act.souffle.poeticB':'who go through hardship.','act.souffle.quote':'"The night does not frighten when one is two."','act.souffle.body':'Regular presence alongside patients undergoing heavy treatment — cancer, post-surgery, chronic illness — as a complement to medical care. An alliance of science and ancient wisdom.','act.souffle.list':['Chemo side effects','Post-surgery','Cancer','Chronic illness','Burnout','Difficult passages'],
    'act.feu.soin':'Fire cutter','act.eau.soin':'Energy healer · Magnetizer','act.terre.soin':'Bone-setter','act.souffle.soin':'Long-term support',
    'act.feu.subtitle':'Soothing burns, shingles, acute skin pain','act.eau.subtitle':'Releasing blockages, letting energy flow again','act.terre.subtitle':'Realigning the body, easing tensions','act.souffle.subtitle':'Supporting the passage — cancer, post-surgery, chronic illness',
    'act.feu.num':'01 / Fire','act.eau.num':'02 / Water','act.terre.num':'03 / Earth','act.souffle.num':'04 / Breath',
    'luc.eyebrow':'The alchemist of the living','luc.titleA':'Forty-two years of engineering,','luc.titleB':'a lifetime of listening.','luc.body1':'Born into a family living in close harmony with Nature, an accomplished sportsman, Luc first chose the rigor of engineering and project management, which he practiced for forty-two years. Then he left a profession that no longer left him, to follow the path he had always felt rising within him: that of the ancestral knowledge passed down by his great-grandmother and grandfathers.','luc.body2':'Today he bridges the two worlds: the precision of science and the wisdom of ancestral care. He masters the techniques of magnetism and bone-setting, completed by a path of Druid Healer. He does not promise. He accompanies.','luc.quote':'I cultivate the art of connecting my energies with those of nature, rich in healing power.','luc.cta':'Meet him →','luc.portrait1':'Luc Dacquin','luc.portrait2':'Engineer · sportsman · druid healer',
    'contact.eyebrow':'Book a session','contact.titleA':'A word,','contact.titleB':'and we find','contact.titleC':'the right moment.','contact.callFR':'call →','contact.callCH':'call →','contact.write':'message →','contact.info1':'St-Julien-en-Genevois','contact.info2':'In person · Remote','contact.info3':'By appointment · 30 km from Geneva',
    'form.name':'Name','form.phone':'Phone','form.email':'Email','form.soin':'Type of session','form.msg':'Message','form.placeholder':'Tell me in a few lines what you are going through.','form.consent':'I agree that my data (name, phone, email, message) be used by Luc Dacquin to contact me regarding my request. See the','form.consent.link':'privacy policy','form.submit':'Send the request','form.foot':'Reply within 24h · Data kept 3 years max ·','form.sent.t':'Message received.','form.sent.b':'Luc will call you back during the day.',
    'foot.h.soins':'Sessions','foot.h.contact':'Contact','foot.h.pratique':'Practical','foot.h.cabinet':'Practice','foot.tarifs':'Pricing','foot.zone':'Service area','foot.faq':'Frequently asked','foot.luc':'About Luc','foot.formulaire':'Form','foot.cabinet1':'St-Julien-en-Genevois','foot.cabinet2':'France · French-speaking Switzerland','foot.cabinet3':'30 km around Geneva','foot.cabinet4':'By appointment','foot.copy':'© 2026 Reboot’eux · Luc Dacquin','foot.signature':'— finding your right balance.','foot.legal1':'Legal notice','foot.legal2':'Privacy · GDPR',
    'prat.eyebrow':'Practical info','prat.titleA':'Everything you need to know,','prat.titleB':'before coming.','prat.sub':'Pricing, how a session unfolds, service area, frequently asked questions. So you know exactly what to expect.','prat.anchor1':'Flow','prat.anchor2':'Pricing','prat.anchor3':'Area','prat.anchor4':'FAQ',
  },
};
// Resolve current language — based on URL filename (most reliable)
function getLang() {
  if (typeof window === 'undefined') return 'fr';
  // Trust the URL pattern -en.html as the source of truth
  if (location.pathname.includes('-en.html')) { window.__lang = 'en'; return 'en'; }
  if (window.__lang === 'en') return 'en';
  return 'fr';
}
// Helper: build a link to a page in the current language (e.g. pageHref('pratique') → 'pratique.html' or 'pratique-en.html')
function pageHref(page, hash) {
  const lang = getLang();
  const suffix = lang === 'en' ? '-en.html' : '.html';
  const h = hash ? '#' + hash : '';
  if (page === 'index' || page === '' || page === 'home') return 'index' + suffix + h;
  return page + suffix + h;
}
window.pageHref = pageHref;
function t(k) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][k] !== undefined) ? I18N[lang][k] : (I18N.fr[k] !== undefined ? I18N.fr[k] : k);
}
window.t = t;
window.getLang = getLang;
window.I18N = I18N;
// Initialize language on script load
getLang();

/* ============================================================
   VideoBg — fond vidéo plein écran avec voile + grain + tint
   ============================================================ */
function VideoBg({ src, hue, intensity = 0.5, parallax = false, fit = 'cover', scale = 1.1, maskCorner = null, priority = 'low' }) {
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

  const preloadAttr = priority === 'high' ? 'auto' : 'metadata';
  return (
    <div ref={wrapRef} className="video-bg" style={hue ? { '--hue': hue.h, '--hue-glow': hue.g } : null}>
      <video ref={refA} className={ready ? 'ready' : ''} autoPlay muted loop playsInline preload={preloadAttr} style={{ objectFit: fit, transform: `scale(${scale})` }}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={refB} className={ready ? 'ready' : ''} autoPlay muted loop playsInline preload={preloadAttr} aria-hidden style={{ objectFit: fit, transform: `scale(${scale})` }}>
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
function Nav({ activeSection, onNav, lang, onLang }) {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'top',      n: '00', lk: 'nav.home',         sk: '',                href: pageHref('index') },
    { id: 'feu',      n: '01', lk: 'nav.feu.l',        sk: 'nav.feu.sub',     href: pageHref('index','feu') },
    { id: 'eau',      n: '02', lk: 'nav.eau.l',        sk: 'nav.eau.sub',     href: pageHref('index','eau') },
    { id: 'terre',    n: '03', lk: 'nav.terre.l',      sk: 'nav.terre.sub',   href: pageHref('index','terre') },
    { id: 'souffle',  n: '04', lk: 'nav.souffle.l',    sk: 'nav.souffle.sub', href: pageHref('index','souffle') },
    { id: 'luc',      n: '—',  lk: 'nav.luc.l',        sk: 'nav.luc.sub',     href: pageHref('index','luc') },
    { id: 'pratique', n: '—',  lk: 'nav.pratique.l',   sk: 'nav.pratique.sub',href: pageHref('pratique') },
    { id: 'contact',  n: '—',  lk: 'nav.contact.l',    sk: 'nav.contact.sub', href: pageHref('index','contact') },
  ];
  return (
    <>
      <header className="nav">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); onNav('top'); }} data-hover aria-label="Reboot'eux">
          <Mark size={72} />
        </a>
        <button className={`menu-trig ${open ? 'on' : ''}`} onClick={() => setOpen(o => !o)} data-hover aria-label="Menu">
          <i></i><i></i><i></i>
          <span className="mono">{open ? t('nav.close') : t('nav.menu')}</span>
        </button>
        <div className="nav-right">
          <button className="pill-btn" onClick={onLang} data-hover aria-label="Changer la langue">
            <span className="mono"><b className={lang==='fr'?'a':''}>fr</b> · <b className={lang==='en'?'a':''}>en</b></span>
          </button>
        </div>
      </header>

      <nav className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-inner">
          <div className="mono drawer-eb">{t('nav.eyebrow')}</div>
          <ul>
            {items.map((it, i) => (
              <li key={it.id} style={{ '--i': i }}>
                <a href={it.href || `#${it.id}`} onClick={(e) => {
                  const samePageHash = it.href && it.href.includes('#') && it.href.split('#')[0] && location.pathname.endsWith('/' + it.href.split('#')[0]);
                  const isHomePage = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
                  const targetIsHome = (it.href === 'index.html' || (it.href && it.href.startsWith('index.html#'))) && isHomePage;
                  if (targetIsHome || samePageHash) {
                    e.preventDefault();
                    onNav(it.id);
                    setOpen(false);
                  } else {
                    setOpen(false);
                  }
                }} className={activeSection === it.id ? 'a' : ''} data-hover>
                  <span className="num mono">{it.n}</span>
                  <span className="labels">
                    <span className="l serif">{t(it.lk)}</span>
                    {it.sk && <span className="sub mono">{t(it.sk)}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="drawer-foot mono">
            {t('nav.foot1')}<br/>
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
