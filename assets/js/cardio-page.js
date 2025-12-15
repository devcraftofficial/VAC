// Cardio Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // AOS Animation Initialization
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Enhanced Navbar Functionality
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effects
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.top-nav');
    const logoImg = document.querySelector('.logo-img');
    
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
      if (logoImg) logoImg.style.filter = 'brightness(0)';
    } else {
      nav.classList.remove('scrolled');
      if (logoImg) logoImg.style.filter = '';
    }
  });

  // Schedule card interactions
  document.querySelectorAll('.schedule-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.schedule-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Hero image parallax effect
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1 + scrolled * 0.0001)`;
    }
  });

  // Counter animation for stats (if added later)
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      if (elementIsVisible(counter)) {
        updateCounter();
      }
    });
  }

  function elementIsVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  });

  document.querySelectorAll('.feature-card, .schedule-card').forEach(el => {
    observer.observe(el);
  });
});
