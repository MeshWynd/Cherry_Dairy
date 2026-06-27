// ----- Shree Shyam Dairy — main.js -----

document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Initialize Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Initialize AOS scroll animations
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  // Loader auto-hide
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 1500);
    setTimeout(() => loader.style.display = "none", 2800);
  }

  // Navbar scrolled state
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hero parallax on floating cards
  const cards = document.querySelectorAll("[data-parallax]");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    cards.forEach(c => {
      const speed = parseFloat(c.dataset.parallax || "0.15");
      c.style.translate = `0 ${y * speed}px`;
    });
  }, { passive: true });

  // Counters
  const counters = document.querySelectorAll(".counter");
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + "+";
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  counters.forEach(c => cObs.observe(c));

  // Build review carousel programmatically (Bootstrap)
  const reviews = [
    { n: "Aarti Mehra", p: "Noida", t: "Hosted our daughter's engagement at the banquet — the decor, the thali, the warmth. Every guest still talks about it." },
    { n: "Rohit Sharma", p: "Sector 62", t: "The kaju katli here is the gold standard. Diwali hampers from Shree Shyam have become our family tradition." },
    { n: "Priya Bhatia", p: "Greater Noida", t: "Their photo-cake for my son's 5th birthday was stunning. The restaurant team made the entire evening effortless." },
    { n: "Anil Verma", p: "Sector 50", t: "Royal Rajasthani thali is unmatched in NCR. Pure veg, pure ghee, served with old-school warmth." },
    { n: "Sneha Kapoor", p: "Indirapuram", t: "We booked the hall for a corporate offsite. Professional, punctual, and the catering received a standing ovation." },
  ];
  const carousel = document.getElementById("reviewCarousel");
  if (carousel) {
    const inner = carousel.querySelector(".carousel-inner");
    const ind = carousel.querySelector(".carousel-indicators");
    // Group 3 per slide on desktop, 1 per slide on mobile
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    const perSlide = isDesktop ? 3 : 1;
    const slides = [];
    for (let i = 0; i < reviews.length; i += perSlide) slides.push(reviews.slice(i, i + perSlide));

    slides.forEach((group, idx) => {
      const div = document.createElement("div");
      div.className = "carousel-item" + (idx === 0 ? " active" : "");
      const row = document.createElement("div");
      row.className = "row g-4";
      group.forEach((r) => {
        const col = document.createElement("div");
        col.className = isDesktop ? "col-lg-4" : "col-12";
        col.innerHTML = `
          <article class="review-card">
            <span class="quote"><i data-lucide="quote"></i></span>
            <span class="stars">${"<i data-lucide='star'></i>".repeat(5)}</span>
            <p class="review-text">&ldquo;${r.t}&rdquo;</p>
            <div class="review-author">
              <div class="review-avatar">${r.n.charAt(0)}</div>
              <div>
                <div class="review-name">${r.n}</div>
                <div class="overline review-meta">${r.p} · Google Review</div>
              </div>
            </div>
          </article>`;
        row.appendChild(col);
      });
      div.appendChild(row);
      inner.appendChild(div);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-bs-target", "#reviewCarousel");
      btn.setAttribute("data-bs-slide-to", String(idx));
      btn.setAttribute("data-testid", `review-dot-${idx}`);
      btn.setAttribute("aria-label", `Slide ${idx + 1}`);
      if (idx === 0) {
        btn.className = "active";
        btn.setAttribute("aria-current", "true");
      }
      ind.appendChild(btn);
    });
    // re-render icons after injecting
    if (window.lucide) window.lucide.createIcons();
  }

  // Smooth scroll for in-page anchors (Bootstrap navbar)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
