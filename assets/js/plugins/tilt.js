/**
 * CHAI KULHAD CO. — Local 3D Tilt & Glare Plugin (tilt.js)
 * Zero-dependency Vanilla-Tilt style 3D card effect with glare & depth layer.
 * Automatically falls back to a gentle lift on touch devices or reduced motion.
 */
(function (window) {
  'use strict';

  /**
   * Initializes 3D tilt and glare interactions on all matching card elements.
   * @param {string} selector - CSS selector for tilt cards (default: '.tilt-card, .hero-tilt-frame')
   */
  function initTiltCards(selector) {
    const targetSelector = selector || '.tilt-card, .hero-tilt-frame';
    const cards = document.querySelectorAll(targetSelector);
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    cards.forEach(function (card) {
      if (card.dataset.tiltInitialized === 'true') return;
      card.dataset.tiltInitialized = 'true';

      // Inject glare overlay if not already present
      if (!card.querySelector('.tilt-glare')) {
        const glare = document.createElement('span');
        glare.className = 'tilt-glare';
        glare.setAttribute('aria-hidden', 'true');
        card.appendChild(glare);
      }

      // On touch devices or reduced motion, rely on gentle CSS lift
      if (prefersReducedMotion || isTouchDevice) {
        return;
      }

      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 7;
      let rafId = null;

      function handleMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const glareX = Math.round((x / rect.width) * 100);
        const glareY = Math.round((y / rect.height) * 100);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
          card.style.transform =
            'perspective(1000px) rotateX(' +
            rotateX.toFixed(2) +
            'deg) rotateY(' +
            rotateY.toFixed(2) +
            'deg) scale3d(1.015, 1.015, 1.015)';
          card.style.setProperty('--glare-x', glareX + '%');
          card.style.setProperty('--glare-y', glareY + '%');
        });
      }

      function handleMouseLeave() {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }

      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });
  }

  window.ChaiTilt = {
    init: initTiltCards
  };
})(window);
