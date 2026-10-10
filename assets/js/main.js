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

  function scrollToHash(hash, immediate) {
    var id = (hash || "").replace("#", "");
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var offset = -((header && header.offsetHeight) || 72) - 12;
    if (!immediate && window.lenis && !reduce) {
      window.lenis.scrollTo(target, { offset: offset, duration: 1.05 });
    } else {
      var top = target.getBoundingClientRect().top + window.scrollY + offset;
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
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1
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
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        }
      );
    });
    gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      gsap.fromTo(el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
    var heroFigure = document.querySelector("[data-hero-figure]");
    if (heroFigure) {
      gsap.fromTo(heroFigure, { y: 18 }, { y: 0, duration: 1.3, ease: "power3.out" });
    }
  } else {
    root.classList.add("reduce");
  }

  if (window.location.hash) {
    window.setTimeout(function () { scrollToHash(window.location.hash, true); }, 40);
  }

  window.addEventListener("load", function () {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });
})();
