/**
 * CHAI KULHAD CO. — Local Carousel & Hero Slideshow Plugin (slider.js)
 * Handles testimonial sliders, best-seller carousels, and full-bleed hero slideshows.
 */
(function (window) {
  'use strict';

  /**
   * Initializes horizontal card carousels with prev/next buttons and touch swipe.
   */
  function initCardSliders() {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(function (sliderEl) {
      const track = sliderEl.querySelector('.slider-track');
      const slides = sliderEl.querySelectorAll('.slider-slide');
      const prevBtn = sliderEl.querySelector('[data-slider-prev]');
      const nextBtn = sliderEl.querySelector('[data-slider-next]');
      if (!track || !slides.length) return;

      let currentIndex = 0;

      function getVisibleCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
      }

      function updateSlider() {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, slides.length - visible);
        if (currentIndex > maxIndex) currentIndex = 0;
        if (currentIndex < 0) currentIndex = maxIndex;

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = 24;
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const offset = (slideWidth + gap) * currentIndex * (isRTL ? 1 : -1);
        track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          currentIndex -= 1;
          updateSlider();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          currentIndex += 1;
          updateSlider();
        });
      }

      // Touch swipe support
      let startX = 0;
      track.addEventListener(
        'touchstart',
        function (e) {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );

      track.addEventListener(
        'touchend',
        function (e) {
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            currentIndex += diff > 0 ? 1 : -1;
            updateSlider();
          }
        },
        { passive: true }
      );

      window.addEventListener('resize', updateSlider, { passive: true });
      updateSlider();
    });
  }

  /**
   * Initializes full-bleed background slideshow on Home 2 hero.
   */
  function initHeroSlideshow() {
    const heroSlidesContainer = document.querySelector('[data-hero-slideshow]');
    if (!heroSlidesContainer) return;

    const slides = heroSlidesContainer.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;

    let activeIdx = 0;
    setInterval(function () {
      slides[activeIdx].classList.remove('is-active');
      activeIdx = (activeIdx + 1) % slides.length;
      slides[activeIdx].classList.add('is-active');
    }, 5200);
  }

  window.ChaiSlider = {
    init: function () {
      initCardSliders();
      initHeroSlideshow();
    }
  };
})(window);
