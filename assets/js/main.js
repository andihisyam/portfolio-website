(() => {
  // Floating "back to top" button
  const backToTop = document.querySelector("[data-back-to-top]");
  function updateBackToTop() {
    if (!backToTop) return;
    const visible = window.scrollY > 500;
    backToTop.setAttribute("data-visible", visible ? "true" : "false");
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  // Scroll reveal (lazy-render feel)
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    const reveal = (el) => el.classList.add("is-visible");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(reveal);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            reveal(entry.target);
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  // Mobile menu
  const menuBtn = document.querySelector("[data-mobile-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.getAttribute("data-open") === "true";
      mobileMenu.setAttribute("data-open", open ? "false" : "true");
      menuBtn.setAttribute("aria-expanded", open ? "false" : "true");
    });
    mobileMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      mobileMenu.setAttribute("data-open", "false");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  }

  // Smooth scroll for on-page anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^=\"#\"]");
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  // Active section highlight (only for the home page)
  const linkMap = new Map();
  document.querySelectorAll(".nav-links a[href^=\"#\"], .mobile-menu a[href^=\"#\"]").forEach((a) => {
    linkMap.set(a.getAttribute("href"), a);
  });
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  if (sections.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const href = `#${visible.target.id}`;
        document.querySelectorAll(".nav-links a[aria-current=\"page\"]").forEach((a) => {
          a.removeAttribute("aria-current");
        });
        const active = linkMap.get(href);
        if (active) active.setAttribute("aria-current", "page");
      },
      { rootMargin: "-25% 0px -70% 0px", threshold: [0.1, 0.2, 0.3] },
    );
    sections.forEach((s) => obs.observe(s));
  }
})();
