/**
 * CHAI KULHAD CO. — Local Animated Number Counters Plugin (counters.js)
 * Smoothly animates statistical numbers when scrolled into viewport.
 */
(function (window) {
  'use strict';

  /**
   * Animates a single counter element from 0 to its data-target value.
   * @param {HTMLElement} el - Counter DOM node with data-target attribute
   */
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1800;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Observes all [data-counter] elements and triggers animation on intersection.
   */
  function initCounters() {
    const counters = document.querySelectorAll('[data-target].counter-number');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  window.ChaiCounters = {
    init: initCounters
  };
})(window);
