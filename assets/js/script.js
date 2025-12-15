// NAV: mobile hamburger toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when clicking any mobile link
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Close menu on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ================= SCROLL REVEAL USING INTERSECTION OBSERVER =================

// Mark elements that should reveal on scroll
document.querySelectorAll(
  ".why-item, .class-card, .price-card, .testimonial-person, .testimonial-main"
).forEach((el) => el.classList.add("reveal"));

const observerOptions = {
  threshold: 0.18,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});
