/**
 * CHAI KULHAD CO. — Main Application Controller (main.js)
 * Modular ES6+ controller for theme management, RTL toggle, navigation,
 * custom cursor, scroll reveal, menu filtering, chai customizer, ROI calculator,
 * countdown timers, cafe locator, and accessible form validation.
 */
(function () {
  'use strict';

  /**
   * 1. SPLASH SCREEN LOADER
   * Dismisses the Kulhad filling splash screen once DOM is ready.
   */
  function initSplashLoader() {
    const splash = document.getElementById('splash-loader');
    if (!splash) return;
    setTimeout(function () {
      splash.classList.add('is-hidden');
    }, 480);
  }

  /**
   * 2. THEME TOGGLE (DARK / LIGHT MODE WITH SYSTEM PREFERENCE DETECTION)
   * Persists choice in localStorage and respects prefers-color-scheme.
   */
  function initThemeToggle() {
    const root = document.documentElement;
    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    const savedTheme = localStorage.getItem('chai_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    root.setAttribute('data-theme', initialTheme);
    updateThemeButtons(initialTheme);

    function updateThemeButtons(theme) {
      toggleBtns.forEach(function (btn) {
        btn.setAttribute(
          'aria-label',
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
        const sunIcon = btn.querySelector('.icon-sun');
        const moonIcon = btn.querySelector('.icon-moon');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
          moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
        }
      });
    }

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('chai_theme', next);
        updateThemeButtons(next);
      });
    });
  }

  /**
   * 3. RTL / LTR DIRECTION TOGGLE
   * Toggles document direction and updates slider offsets.
   */
  function initRTLToggle() {
    const root = document.documentElement;
    const rtlBtns = document.querySelectorAll('[data-rtl-toggle]');
    const savedDir = localStorage.getItem('chai_dir') || 'ltr';

    root.setAttribute('dir', savedDir);
    updateRTLButtons(savedDir);

    function updateRTLButtons(dir) {
      rtlBtns.forEach(function (btn) {
        btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        btn.setAttribute(
          'aria-label',
          dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
        );
      });
    }

    rtlBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        root.setAttribute('dir', next);
        localStorage.setItem('chai_dir', next);
        updateRTLButtons(next);
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  /**
   * 4. STICKY HEADER SHRINK, SCROLL PROGRESS BAR & BACK TO TOP
   */
  function initScrollEffects() {
    const header = document.querySelector('.site-header');
    const progressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top');

    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle('is-scrolled', scrollY > 40);
      }
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;
        progressBar.style.width = pct + '%';
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('is-visible', scrollY > 360);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /**
   * 5. MOBILE HAMBURGER NAVIGATION & DROPDOWN ACCESSIBILITY
   */
  function initNavigation() {
    const menuToggle = document.querySelector('[data-mobile-toggle]');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener('click', function () {
        const isOpen = mobileDrawer.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Keyboard & click support for Home dropdown
    const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
    const dropdownParent = dropdownToggle ? dropdownToggle.closest('.has-dropdown') : null;
    if (dropdownToggle && dropdownParent) {
      dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          dropdownParent.classList.toggle('is-open');
        }
      });
    }
  }

  /**
   * 6. CUSTOM DESKTOP TEA-CUP CURSOR
   */
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    window.addEventListener(
      'mousemove',
      function (e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      },
      { passive: true }
    );

    const interactiveTargets = document.querySelectorAll(
      'a, button, .tilt-card, input, select, textarea'
    );
    interactiveTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-hover');
      });
    });
  }

  /**
   * 7. SCROLL-REVEAL & STAGGERED CARD ANIMATIONS
   */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .tilt-card');
    if (!revealEls.length) return;

    revealEls.forEach(function (el, index) {
      el.classList.add('reveal-up');
      el.style.transitionDelay = ((index % 4) * 65) + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * 8. HOME 2: CAFE LOCATOR SEARCH BAR & SPOTLIGHT SWITCHER
   */
  function initHome2Features() {
    const locatorForm = document.getElementById('cafe-locator-form');
    const locatorInput = document.getElementById('cafe-locator-input');
    const locatorResults = document.getElementById('locator-results');

    const outlets = [
      { city: 'Bengaluru', area: 'Indiranagar 100ft Road', hours: '7:00 AM – 11:30 PM', status: 'Open Now' },
      { city: 'Mumbai', area: 'Bandra West, Pali Hill', hours: '7:30 AM – 12:00 AM', status: 'Open Now' },
      { city: 'Delhi NCR', area: 'Connaught Place, Inner Circle', hours: '8:00 AM – 11:00 PM', status: 'Open Now' },
      { city: 'Hyderabad', area: 'Jubilee Hills, Road No. 36', hours: '7:00 AM – 11:30 PM', status: 'Open Now' },
      { city: 'Pune', area: 'Koregaon Park, Lane 7', hours: '7:30 AM – 11:00 PM', status: 'Open Now' },
      { city: 'Jaipur', area: 'C-Scheme, Ahinsa Circle', hours: '7:30 AM – 10:30 PM', status: 'Open Now' }
    ];

    if (locatorForm && locatorInput && locatorResults) {
      locatorForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = locatorInput.value.trim().toLowerCase();
        const matched = outlets.filter(function (o) {
          return (
            !query ||
            o.city.toLowerCase().indexOf(query) !== -1 ||
            o.area.toLowerCase().indexOf(query) !== -1
          );
        });

        const chosen = matched.length ? matched[0] : outlets[0];
        locatorResults.innerHTML =
          '<strong>Nearest Outlet Found: Chai Kulhad Co. — ' +
          chosen.city +
          ' (' +
          chosen.area +
          ')</strong><p style="margin-top:4px;font-size:0.9rem;">Hours: ' +
          chosen.hours +
          ' | Status: <span style="color:#3F5B3A;font-weight:700;">' +
          chosen.status +
          '</span></p>';
        locatorResults.classList.add('is-visible');
      });
    }

    // Chai of the Day Spotlight Rotating Notes
    const spotlightBtns = document.querySelectorAll('[data-spotlight-flavor]');
    const spotlightTitle = document.getElementById('spotlight-title');
    const spotlightDesc = document.getElementById('spotlight-desc');
    const spotlightPrice = document.getElementById('spotlight-price');
    const spotlightOrigin = document.getElementById('spotlight-origin');
    const spotlightAroma = document.getElementById('spotlight-aroma');

    const spotlightData = {
      kesar: {
        title: 'Shahi Kashmiri Kesar & Pistachio Kulhad Chai',
        desc: 'Slow-simmered upper Assam CTC decoction infused with Pampore saffron strands, crushed green cardamom pods, and roasted Iranian pistachio slivers in a fire-baked earthen kulhad.',
        price: '₹110 / 180ml Kulhad',
        origin: 'Upper Assam & Pampore Saffron',
        aroma: 'Warm Saffron, Toasted Nut & Wet Earth'
      },
      adrak: {
        title: 'Himalayan Pounded Adrak & Tulsi Kadak Brew',
        desc: 'Hand-pounded organic Meghalaya ginger root and wild rama tulsi leaves boiled with rich creamy milk for a bold, throat-soothing masala finish.',
        price: '₹85 / 180ml Kulhad',
        origin: 'Meghalaya Ginger & Doomdooma Estate',
        aroma: 'Fiery Ginger Root, Holy Basil & Caramelized Milk'
      },
      gulab: {
        title: 'Pushkar Damask Rose & Green Elaichi Chai',
        desc: 'Fragrant sun-dried Pushkar rose petals paired with Idukki green cardamom pods and organic cane jaggery for a floral, velvety evening brew.',
        price: '₹95 / 180ml Kulhad',
        origin: 'Pushkar Valley & Idukki Hills',
        aroma: 'Damask Rose Petals, Sweet Cardamom & Earthy Clay'
      }
    };

    spotlightBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-spotlight-flavor');
        const info = spotlightData[key];
        if (!info) return;
        spotlightBtns.forEach(function (b) {
          b.classList.remove('is-selected');
        });
        btn.classList.add('is-selected');
        if (spotlightTitle) spotlightTitle.textContent = info.title;
        if (spotlightDesc) spotlightDesc.textContent = info.desc;
        if (spotlightPrice) spotlightPrice.textContent = info.price;
        if (spotlightOrigin) spotlightOrigin.textContent = info.origin;
        if (spotlightAroma) spotlightAroma.textContent = info.aroma;
      });
    });
  }

  /**
   * 9. COUNTDOWN TIMERS (HOME 2 SEASONAL SPECIAL & COMING SOON LAUNCH)
   */
  function initCountdowns() {
    const countdownEls = document.querySelectorAll('[data-countdown]');
    if (!countdownEls.length) return;

    countdownEls.forEach(function (container) {
      const daysToAdd = parseInt(container.getAttribute('data-countdown-days') || '18', 10);
      const targetDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000);

      const daysEl = container.querySelector('[data-cd-days]');
      const hoursEl = container.querySelector('[data-cd-hours]');
      const minsEl = container.querySelector('[data-cd-mins]');
      const secsEl = container.querySelector('[data-cd-secs]');

      function tick() {
        const diff = Math.max(0, targetDate.getTime() - Date.now());
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
      }

      tick();
      setInterval(tick, 1000);
    });
  }

  /**
   * 10. MENU PAGE: CATEGORY FILTERING, SKELETON LOADERS, FAVOURITES & CHAI CUSTOMIZER
   */
  function initMenuPage() {
    // Category Filter Tabs with Skeleton Shimmer Transition
    const filterTabs = document.querySelectorAll('[data-menu-filter]');
    const menuCards = document.querySelectorAll('[data-menu-category]');

    if (filterTabs.length && menuCards.length) {
      filterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          const category = tab.getAttribute('data-menu-filter');
          filterTabs.forEach(function (t) {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('is-active');
          tab.setAttribute('aria-selected', 'true');

          menuCards.forEach(function (card) {
            const cardCat = card.getAttribute('data-menu-category');
            const matches = category === 'all' || cardCat === category;
            if (matches) {
              card.style.display = 'flex';
              card.classList.add('is-loading-skeleton');
              setTimeout(function () {
                card.classList.remove('is-loading-skeleton');
              }, 260);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // Add to Favourites Heart Toggle (persisted in localStorage)
    const favBtns = document.querySelectorAll('[data-fav-id]');
    const favCounter = document.getElementById('fav-count-badge');
    let savedFavs = [];
    try {
      savedFavs = JSON.parse(localStorage.getItem('chai_favourites') || '[]');
    } catch (e) {
      savedFavs = [];
    }

    function updateFavUI() {
      if (favCounter) {
        favCounter.textContent = savedFavs.length + ' Saved';
      }
      favBtns.forEach(function (btn) {
        const id = btn.getAttribute('data-fav-id');
        const isFav = savedFavs.indexOf(id) !== -1;
        btn.classList.toggle('is-fav', isFav);
        btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
        const labelSpan = btn.querySelector('.fav-label');
        if (labelSpan) {
          labelSpan.textContent = isFav ? 'Saved to Favourites' : 'Add to Favourites';
        }
      });
    }

    favBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-fav-id');
        const idx = savedFavs.indexOf(id);
        if (idx === -1) {
          savedFavs.push(id);
        } else {
          savedFavs.splice(idx, 1);
        }
        localStorage.setItem('chai_favourites', JSON.stringify(savedFavs));
        updateFavUI();
      });
    });
    updateFavUI();

    // Build Your Own Chai Interactive Customizer
    const customizerContainer = document.getElementById('chai-customizer');
    if (customizerContainer) {
      const optionBtns = customizerContainer.querySelectorAll('[data-custom-group]');
      const livePriceEl = document.getElementById('custom-chai-price');
      const liveSummaryEl = document.getElementById('custom-chai-summary');

      const state = {
        size: { label: 'Regular Kulhad (180ml)', price: 60 },
        milk: { label: 'A2 Gir Cow Milk', price: 15 },
        spice: { label: 'Kadak 5-Spice Blend', price: 10 },
        sweet: { label: 'Organic Palm Jaggery', price: 10 }
      };

      function renderCustomizer() {
        const total =
          state.size.price + state.milk.price + state.spice.price + state.sweet.price;
        if (livePriceEl) {
          livePriceEl.textContent = '₹' + total;
        }
        if (liveSummaryEl) {
          liveSummaryEl.textContent =
            state.size.label +
            ' • ' +
            state.milk.label +
            ' • ' +
            state.spice.label +
            ' • ' +
            state.sweet.label;
        }
      }

      optionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const group = btn.getAttribute('data-custom-group');
          const label = btn.getAttribute('data-custom-label');
          const price = parseInt(btn.getAttribute('data-custom-price') || '0', 10);

          customizerContainer
            .querySelectorAll('[data-custom-group="' + group + '"]')
            .forEach(function (b) {
              b.classList.remove('is-selected');
            });
          btn.classList.add('is-selected');

          state[group] = { label: label, price: price };
          renderCustomizer();
        });
      });

      renderCustomizer();
    }
  }

  /**
   * 11. FRANCHISE PAGE: INTERACTIVE ROI & BREAK-EVEN CALCULATOR
   */
  function initROICalculator() {
    const cupsInput = document.getElementById('roi-cups');
    const aovInput = document.getElementById('roi-aov');
    const modelSelect = document.getElementById('roi-model');

    if (!cupsInput || !aovInput || !modelSelect) return;

    const cupsValEl = document.getElementById('roi-cups-val');
    const aovValEl = document.getElementById('roi-aov-val');
    const revOutEl = document.getElementById('roi-monthly-rev');
    const profitOutEl = document.getElementById('roi-monthly-profit');
    const marginOutEl = document.getElementById('roi-margin');
    const breakEvenOutEl = document.getElementById('roi-breakeven');

    const modelInvestments = {
      kiosk: { investment: 850000, margin: 0.31 },
      cafe: { investment: 1650000, margin: 0.29 },
      lounge: { investment: 2800000, margin: 0.28 }
    };

    function formatINR(num) {
      return '₹' + Math.round(num).toLocaleString('en-IN');
    }

    function calculateROI() {
      const dailyOrders = parseInt(cupsInput.value, 10) || 280;
      const aov = parseInt(aovInput.value, 10) || 110;
      const modelKey = modelSelect.value || 'cafe';
      const modelInfo = modelInvestments[modelKey] || modelInvestments.cafe;

      if (cupsValEl) cupsValEl.textContent = dailyOrders + ' Orders / Day';
      if (aovValEl) aovValEl.textContent = '₹' + aov;

      const monthlyRevenue = dailyOrders * aov * 30;
      const monthlyProfit = monthlyRevenue * modelInfo.margin;
      const breakEvenMonths = Math.max(
        6,
        Math.min(28, Math.round(modelInfo.investment / Math.max(1, monthlyProfit)))
      );

      if (revOutEl) revOutEl.textContent = formatINR(monthlyRevenue);
      if (profitOutEl) profitOutEl.textContent = formatINR(monthlyProfit);
      if (marginOutEl) marginOutEl.textContent = Math.round(modelInfo.margin * 100) + '% Net';
      if (breakEvenOutEl) breakEvenOutEl.textContent = breakEvenMonths + ' Months';
    }

    cupsInput.addEventListener('input', calculateROI);
    aovInput.addEventListener('input', calculateROI);
    modelSelect.addEventListener('change', calculateROI);
    calculateROI();
  }

  /**
   * 12. ACCORDIONS (FAQS & NUTRITION / ALLERGENS)
   */
  function initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const item = trigger.closest('.accordion-item');
        if (!item) return;
        const isOpen = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  /**
   * 13. CONTACT ENQUIRY FORM, NEWSLETTER & NOTIFY-ME VALIDATION
   */
  function initForms() {
    // Dynamic Enquiry Type field toggle on Contact Page
    const enquiryTypeSelect = document.getElementById('enquiry-type');
    const budgetFieldWrap = document.getElementById('budget-field-wrap');

    if (enquiryTypeSelect && budgetFieldWrap) {
      // Auto-select Franchise if URL contains ?type=franchise
      const params = new URLSearchParams(window.location.search);
      if (params.get('type') === 'franchise') {
        enquiryTypeSelect.value = 'franchise';
      }

      function toggleBudgetField() {
        const isFranchise = enquiryTypeSelect.value === 'franchise';
        budgetFieldWrap.style.display = isFranchise ? 'flex' : 'none';
      }

      enquiryTypeSelect.addEventListener('change', toggleBudgetField);
      toggleBudgetField();
    }

    // Universal Client-Side Form Validation
    const forms = document.querySelectorAll('[data-validate-form]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]{8,16}$/;

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(function (input) {
          // Skip hidden fields (e.g. budget when non-franchise)
          if (input.offsetParent === null) return;

          const errEl = input.parentElement.querySelector('.field-error');
          const val = input.value.trim();
          let errorMsg = '';

          if (!val) {
            errorMsg = 'This field is required.';
          } else if (input.type === 'email' && !emailRegex.test(val)) {
            errorMsg = 'Please enter a valid email address.';
          } else if (input.type === 'tel' && !phoneRegex.test(val)) {
            errorMsg = 'Please enter a valid 10-digit phone number.';
          }

          if (errorMsg) {
            isValid = false;
            input.classList.add('is-invalid');
            if (errEl) errEl.textContent = errorMsg;
          } else {
            input.classList.remove('is-invalid');
            if (errEl) errEl.textContent = '';
          }
        });

        const statusBox = form.querySelector('.form-status-box');
        if (isValid && statusBox) {
          statusBox.className = 'form-status-box is-success';
          statusBox.textContent =
            form.getAttribute('data-success-msg') ||
            'Thank you! Our team has received your submission and will connect with you shortly.';
          form.reset();
          if (enquiryTypeSelect && budgetFieldWrap) {
            budgetFieldWrap.style.display =
              enquiryTypeSelect.value === 'franchise' ? 'flex' : 'none';
          }
        }
      });
    });

    // Contact Page Interactive Map Hub Switcher
    const mapCityBtns = document.querySelectorAll('[data-map-city]');
    const mapAddressTitle = document.getElementById('map-active-title');
    const mapAddressDetail = document.getElementById('map-active-address');

    const mapLocations = {
      bengaluru: {
        title: 'Bengaluru Flagship Roastery & Franchise HQ',
        address: 'Plot 42, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038'
      },
      mumbai: {
        title: 'Mumbai Western Region Lounge & Training Hub',
        address: 'Ground Floor, Heritage Court, 16th Road, Bandra West, Mumbai, Maharashtra 400050'
      },
      delhi: {
        title: 'New Delhi Northern Territory Experience Center',
        address: 'Block M-18, Outer Circle, Connaught Place, New Delhi 110001'
      }
    };

    mapCityBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-map-city');
        const loc = mapLocations[key];
        if (!loc) return;
        mapCityBtns.forEach(function (b) {
          b.classList.remove('is-selected');
        });
        btn.classList.add('is-selected');
        if (mapAddressTitle) mapAddressTitle.textContent = loc.title;
        if (mapAddressDetail) mapAddressDetail.textContent = loc.address;
      });
    });
  }

  /**
   * 14. 404 PAGE QUICK SEARCH
   */
  function init404Search() {
    const searchForm = document.getElementById('error-search-form');
    const searchInput = document.getElementById('error-search-input');
    if (!searchForm || !searchInput) return;

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      if (q.indexOf('menu') !== -1 || q.indexOf('chai') !== -1 || q.indexOf('snack') !== -1) {
        window.location.href = 'menu.html';
      } else if (q.indexOf('franchise') !== -1 || q.indexOf('roi') !== -1 || q.indexOf('invest') !== -1) {
        window.location.href = 'franchise.html';
      } else if (q.indexOf('about') !== -1 || q.indexOf('story') !== -1 || q.indexOf('kulhad') !== -1) {
        window.location.href = 'about.html';
      } else if (q.indexOf('contact') !== -1 || q.indexOf('call') !== -1) {
        window.location.href = 'contact.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  /**
   * INITIALIZE ALL MODULES ON DOMCONTENTLOADED
   */
  document.addEventListener('DOMContentLoaded', function () {
    initSplashLoader();
    initThemeToggle();
    initRTLToggle();
    initScrollEffects();
    initNavigation();
    initCustomCursor();
    if (window.ChaiTilt) window.ChaiTilt.init();
    if (window.ChaiCounters) window.ChaiCounters.init();
    if (window.ChaiSlider) window.ChaiSlider.init();
    initScrollReveal();
    initHome2Features();
    initCountdowns();
    initMenuPage();
    initROICalculator();
    initAccordions();
    initForms();
    init404Search();
  });
})();
