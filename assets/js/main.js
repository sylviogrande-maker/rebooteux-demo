/* Luc Dacquin — interactions
   Smooth scroll (Lenis) and reveals (GSAP) only when motion is welcome.
   Content stays visible if those libraries do not load. */
(function () {
  var root = document.documentElement;
  var reduce = root.classList.contains("reduce") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.querySelector("[data-nav-panel]");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeNav() {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    document.body.classList.remove("nav-open");
  }

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
      document.body.classList.toggle("nav-open", !open);
      if (!open) {
        var first = panel.querySelector("a");
        if (first) first.focus();
      }
    });
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  document.querySelectorAll("[data-lang-switch]").forEach(function (link) {
    link.addEventListener("click", function () {
      var base = link.getAttribute("href").split("#")[0];
      link.setAttribute("href", base + window.location.hash);
    });
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  if (navLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    navLinks.forEach(function (link) {
      var id = (link.getAttribute("href") || "").replace("#", "");
      if (!id) return;
      if (!byId[id]) byId[id] = [];
      byId[id].push(link);
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) { link.classList.remove("is-current"); });
        (byId[id] || []).forEach(function (link) { link.classList.add("is-current"); });
      });
    }, { rootMargin: "-42% 0px -48% 0px", threshold: 0 });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  document.querySelectorAll("[data-accordion]").forEach(function (item) {
    var button = item.querySelector("button");
    var region = item.querySelector("[data-panel]");
    if (!button || !region) return;
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("[data-accordion] button").forEach(function (other) {
        if (other !== button) {
          other.setAttribute("aria-expanded", "false");
          var panelOther = other.parentElement.querySelector("[data-panel]");
          if (panelOther) panelOther.hidden = true;
        }
      });
      button.setAttribute("aria-expanded", open ? "false" : "true");
      region.hidden = open;
    });
  });

  var mapButton = document.querySelector("[data-map-btn]");
  if (mapButton) {
    mapButton.addEventListener("click", function () {
      var holder = document.querySelector("[data-map-holder]");
      if (!holder || holder.querySelector("iframe")) return;
      var frame = document.createElement("iframe");
      frame.src = "https://www.openstreetmap.org/export/embed.html?bbox=6.0311%2C46.1144%2C6.1311%2C46.1744&layer=mapnik&marker=46.1444%2C6.0811";
      frame.title = mapButton.getAttribute("data-map-title") || "Carte";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      holder.appendChild(frame);
      mapButton.hidden = true;
    });
  }

  var form = document.querySelector("[data-booking]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var lang = root.lang === "en" ? "en" : "fr";
      var lines = lang === "en"
        ? [
            "Hello Luc, I would like to book a session.",
            "Name: " + data.get("name"),
            "Phone: " + data.get("phone"),
            "Email: " + (data.get("email") || "—"),
            "Session: " + data.get("care"),
            "Message: " + (data.get("message") || "—")
          ]
        : [
            "Bonjour Luc, je souhaite prendre rendez-vous.",
            "Nom : " + data.get("name"),
            "Téléphone : " + data.get("phone"),
            "Email : " + (data.get("email") || "—"),
            "Soin : " + data.get("care"),
            "Message : " + (data.get("message") || "—")
          ];
      var url = "https://wa.me/33685757863?text=" + encodeURIComponent(lines.join("\n"));
      var done = document.querySelector("[data-booking-done]");
      var link = document.querySelector("[data-booking-link]");
      if (link) link.href = url;
      if (done) {
        form.hidden = true;
        done.hidden = false;
      }
      window.open(url, "_blank", "noopener");
    });
  }

  function layoutTop(el) {
    var y = 0;
    var node = el;
    while (node && node !== document.body && node !== document.documentElement) {
      y += node.offsetTop || 0;
      node = node.offsetParent;
    }
    return y;
  }

  function scrollDestination(target) {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    var pin = target.matches("[data-pin]") ? target : target.querySelector("[data-pin]");
    var spacer = pin && pin.parentElement && pin.parentElement.classList.contains("pin-spacer")
      ? pin.parentElement
      : null;
    var headerH = (header && header.offsetHeight) || 72;
    var y = (spacer ? layoutTop(spacer) : layoutTop(target)) - headerH - 8;
    return Math.max(0, Math.round(y));
  }

  function scrollToHash(hash, immediate) {
    var id = (hash || "").replace("#", "");
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var top = scrollDestination(target);
    if (!immediate && window.lenis && !reduce) {
      window.lenis.scrollTo(top, {
        force: true,
        lock: true,
        duration: 0.6,
        offset: 0,
        easing: function (t) { return 1 - Math.pow(1 - t, 3); }
      });
    } else {
      window.scrollTo({ top: top, behavior: immediate || reduce ? "auto" : "smooth" });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      closeNav();
      scrollToHash(hash, false);
      if (history.pushState) history.pushState(null, "", hash);
    });
  });

  if (!reduce && finePointer && window.Lenis) {
    var lenis = new Lenis({
      duration: 0.65,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.05,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); }
    });
    window.lenis = lenis;
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  if (!reduce && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("motion");

    function splitWords(el) {
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!text || el.dataset.splitReady) return el.querySelectorAll(".word > span");
      el.dataset.splitReady = "1";
      el.setAttribute("aria-label", text);
      var words = text.split(" ");
      el.textContent = "";
      words.forEach(function (word, index) {
        if (index) el.appendChild(document.createTextNode(" "));
        var outer = document.createElement("span");
        outer.className = "word";
        outer.setAttribute("aria-hidden", "true");
        var inner = document.createElement("span");
        inner.textContent = word;
        outer.appendChild(inner);
        el.appendChild(outer);
      });
      return el.querySelectorAll(".word > span");
    }

    function revealWords(el, trigger) {
      var inners = splitWords(el);
      if (!inners.length) return;
      gsap.fromTo(inners, { yPercent: 118 }, {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: trigger || undefined
      });
    }

    /* Hero copy stays at full opacity. A long fade left the first screen faint. */
    gsap.utils.toArray("[data-rise]").forEach(function (el) {
      if (el.closest(".hero")) return;
      gsap.fromTo(el, { y: 22, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      });
    });

    var heroMask = document.querySelector("[data-hero-mask]");
    var heroImg = document.querySelector("[data-hero-img]");
    var desktopBlur = window.matchMedia("(min-width: 981px)").matches;
    if (heroMask) {
      gsap.fromTo(heroMask, { clipPath: "inset(8% 6% 9% 6%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        delay: 0.12,
        ease: "power3.inOut"
      });
    }
    if (heroImg) {
      gsap.fromTo(heroImg, {
        scale: 1.07,
        filter: desktopBlur ? "blur(8px)" : "blur(0px)"
      }, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1.65,
        delay: 0.08,
        ease: "power3.out",
        onComplete: function () {
          heroImg.style.filter = "none";
          heroImg.style.willChange = "auto";
        }
      });
    }

    var heroPhoto = document.querySelector("[data-hero-photo]");
    var heroCaption = document.querySelector("[data-hero-caption]");
    var heroCopy = document.querySelector(".hero-copy");
    var heroLayers = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.85
      }
    });
    if (heroPhoto) heroLayers.to(heroPhoto, { yPercent: 14, ease: "none" }, 0);
    if (heroCaption) heroLayers.to(heroCaption, { yPercent: -36, ease: "none" }, 0);
    if (heroCopy) heroLayers.to(heroCopy, { yPercent: 8, ease: "none" }, 0);

    gsap.utils.toArray("[data-split-in]").forEach(function (el) {
      if (el.closest("[data-pin]")) return;
      revealWords(el, { trigger: el, start: "top 84%", once: true });
    });

    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      var care = el.classList.contains("care");
      gsap.fromTo(el, {
        y: care ? 40 : 32,
        opacity: 0,
        clipPath: care ? "inset(16% 0% 0% 0%)" : "inset(0% 0% 0% 0%)"
      }, {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true }
      });
    });

    var facts = document.querySelectorAll(".facts li");
    if (facts.length) {
      gsap.fromTo(facts, { y: 18, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".facts", start: "top 90%", once: true }
      });
    }

    var band = document.querySelector("[data-band]");
    if (band) {
      var bandImg = band.querySelector("img");
      gsap.fromTo(band, { clipPath: "inset(14% 9% 16% 9%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: band.parentElement,
          start: "top 88%",
          end: "top 28%",
          scrub: 0.85
        }
      });
      if (bandImg) {
        gsap.fromTo(bandImg, {
          scale: 1.18,
          yPercent: -6,
          filter: desktopBlur ? "blur(6px)" : "blur(0px)"
        }, {
          scale: 1,
          yPercent: 6,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: band.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9
          }
        });
      }
    }

    var hands = document.querySelector("[data-hands]");
    if (hands) {
      var handsImg = hands.querySelector("img");
      gsap.fromTo(hands, { clipPath: "inset(10% 7% 10% 7%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.25,
        ease: "power3.inOut",
        scrollTrigger: { trigger: hands, start: "top 80%", once: true }
      });
      if (handsImg) {
        gsap.fromTo(handsImg, { scale: 1.06 }, {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: hands, start: "top 80%", once: true }
        });
      }
    }

    var wipes = [
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 100% 0%)",
      "inset(0% 100% 0% 0%)",
      "inset(100% 0% 0% 0%)"
    ];

    function buildStory(mobile) {
      var pin = document.querySelector('[data-pin="story"]');
      if (!pin) return;
      var beats = pin.querySelectorAll("[data-beat]");
      var mask = pin.querySelector("[data-story-mask]");
      var img = pin.querySelector("[data-story-img]");
      var dots = pin.querySelectorAll(".story-progress i");
      if (!beats.length) return;
      gsap.set(beats, { opacity: 0, y: 0, pointerEvents: "none" });
      gsap.set(beats[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(dots, { scaleX: 0.28, transformOrigin: "left center" });
      if (dots[0]) gsap.set(dots[0], { scaleX: 1 });
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: mobile ? "+=72%" : "+=88%",
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      if (mask) gsap.set(mask, { clearProps: "clipPath" });
      if (img) gsap.set(img, { clearProps: "scale,transform,clipPath" });
      tl.to({}, { duration: 0.34 });
      for (var i = 1; i < beats.length; i++) {
        tl.to(beats[i - 1], { opacity: 0, pointerEvents: "none", ease: "none", duration: 0.08 });
        tl.set(beats[i - 1], { opacity: 0, pointerEvents: "none" });
        tl.to({}, { duration: 0.06 });
        tl.fromTo(beats[i], { opacity: 0, pointerEvents: "none" }, {
          opacity: 1,
          pointerEvents: "auto",
          ease: "none",
          duration: 0.1
        });
        if (dots[i]) tl.to(dots[i], { scaleX: 1, ease: "none", duration: 0.1 }, "<");
        tl.to({}, { duration: 0.36 });
      }
    }

    function buildVisit(mobile) {
      var pin = document.querySelector('[data-pin="visit"]');
      if (!pin) return;
      var shots = pin.querySelectorAll("[data-shot]");
      var steps = pin.querySelectorAll("[data-step]");
      var imgs = pin.querySelectorAll("[data-shot] img");
      var meter = pin.querySelector("[data-meter]");
      if (!shots.length || !steps.length) return;
      shots.forEach(function (shot, i) {
        gsap.set(shot, { zIndex: i + 1, clipPath: i === 0 ? wipes[0] : wipes[i] || wipes[1] });
      });
      gsap.set(imgs, { scale: 1.04 });
      if (imgs[0]) gsap.set(imgs[0], { scale: 1 });
      gsap.set(steps, { opacity: 0, y: 0, pointerEvents: "none" });
      gsap.set(steps[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      if (meter) gsap.set(meter, { scaleX: 0.25, transformOrigin: "left center" });
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: mobile ? "+=150%" : "+=200%",
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      tl.to({}, { duration: 0.3 });
      for (var i = 1; i < shots.length; i++) {
        tl.to(shots[i], { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.42 });
        if (imgs[i]) tl.to(imgs[i], { scale: 1, ease: "power2.out", duration: 0.42 }, "<");
        tl.set(steps[i - 1], { opacity: 0, pointerEvents: "none" }, "<0.21");
        tl.set(steps[i], { opacity: 1, pointerEvents: "auto" }, "<");
        if (meter) tl.to(meter, { scaleX: (i + 1) / shots.length, ease: "none", duration: 0.12 }, "<");
        tl.to({}, { duration: 0.32 });
      }
    }

    var mm = gsap.matchMedia();
    mm.add("(min-width: 981px)", function () {
      buildStory(false);
      buildVisit(false);
    });
    mm.add("(max-width: 980px)", function () {
      buildStory(true);
      buildVisit(true);
    });
  } else {
    root.classList.add("reduce");
  }

  if (window.location.hash) {
    window.setTimeout(function () { scrollToHash(window.location.hash, true); }, 40);
  }

  var dock = document.querySelector("[data-dock]");
  var contact = document.getElementById("contact");
  if (dock && contact && "IntersectionObserver" in window) {
    var dockWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        dock.hidden = entry.isIntersecting;
      });
    }, { threshold: 0.12 });
    dockWatch.observe(contact);
  }

  window.addEventListener("load", function () {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });
})();
