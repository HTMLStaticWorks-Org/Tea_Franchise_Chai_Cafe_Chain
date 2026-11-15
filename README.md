# Chai Kulhad Co. — Tea Franchise & Chai Cafe Chain Website

A complete, multi-page, zero-dependency HTML5 / CSS3 / ES6+ JavaScript website crafted for **Chai Kulhad Co.**, India's premier earthen kulhad chai cafe and franchise network.

---

## 1. Quick Start & Installation

No build step or external CDN is required—every font, icon, script, and responsive photograph is bundled locally inside `assets/`.

1. **Direct Browser Preview:** Open `pages/index.html` (or the root `index.html`) in any modern browser.
2. **Local Static Server (Recommended):**
   ```bash
   python -m http.server 8080
   # Visit http://localhost:8080/pages/index.html
   ```
3. **Production Deployment:** Upload the folder directly to Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any Apache/Nginx host.

---

## 2. Folder Structure

```
chai-franchise-website/
├── assets/
│   ├── css/
│   │   ├── style.css          # Master stylesheet with CSS variables & responsive rules
│   │   ├── style.min.css      # Minified production stylesheet
│   │   ├── dark-mode.css      # Deep Roasted Tea (#1E1410) dark theme
│   │   └── rtl.css            # Full Right-to-Left (RTL) layout stylesheet
│   ├── js/
│   │   ├── main.js            # Modular ES6+ UI & interactive controller
│   │   ├── main.min.js        # Minified production bundle
│   │   └── plugins/
│   │       ├── tilt.js        # Local 3D Tilt & Glare engine
│   │       ├── counters.js    # Animated viewport number counters
│   │       └── slider.js      # Accessible carousel & hero slideshow engine
│   ├── images/
│   │   ├── hero/              # 5 unique hero photographs (.webp, -sm.webp, .jpg)
│   │   ├── menu/              # 21 unique drink, snack & combo photographs
│   │   ├── cafe/              # 12 unique farm-to-cup, interior & sustainability photos
│   │   ├── gallery/           # 6 unique #ChaiMoments masonry photographs
│   │   ├── people/            # 9 unique customer, partner & founder portraits
│   │   ├── franchise/         # 3 unique Kiosk, Cafe & Lounge store format photos
│   │   └── icons/             # Local SVG brand logo, favicon, cursor & icon sprite
│   └── fonts/                 # Self-hosted Google Fonts (.woff2): Fraunces, DM Sans, Caveat
├── pages/
│   ├── index.html             # Home 1 — Split Story-Led Brand Home
│   ├── home-2.html            # Home 2 — Full-Bleed Cinematic Chai Lounge
│   ├── menu.html              # Menu with sticky category filters & Chai Customizer
│   ├── franchise.html         # Franchise Opportunity with interactive ROI Calculator
│   ├── about.html             # Brand Story, Values, Milestones & Kulhad Pledge
│   ├── contact.html           # Dynamic Enquiry Form, Map Switcher & Regional Hubs
│   ├── 404.html               # Custom "Oops, this chai went cold" error page
│   └── coming-soon.html       # Jaipur Heritage Haveli Lounge launch countdown
├── documentation/
│   └── GUIDE.md               # Comprehensive customization, SEO & architecture guide
├── index.html                 # Root entry redirect to pages/index.html
├── sitemap.xml                # Production XML sitemap
├── robots.txt                 # Search engine crawler directives
└── README.md                  # Project overview
```

---

## 3. Customization Guide

### 3.1 Colors (`assets/css/style.css`)
Update the `:root` CSS variables at the top of `assets/css/style.css`:
- `--color-primary: #5A3A22;` (Masala Chai Brown)
- `--color-secondary: #3F5B3A;` (Cardamom Green)
- `--color-accent: #E3A12F;` (Saffron / Turmeric Gold)
- `--color-highlight: #C05A3A;` (Terracotta Clay)
- `--bg-primary: #FBF4E8;` (Warm Milk Cream)
- `--bg-dark-surface: #1E1410;` (Deep Roasted Tea — Dark Mode)

### 3.2 Fonts (`assets/fonts/`)
Self-hosted `.woff2` files for **Fraunces** (headings), **DM Sans** (body), and **Caveat** (script tags/labels) are loaded via `@font-face` in `assets/css/style.css`.

### 3.3 Forms & Third-Party Integrations
- **Contact Form (`pages/contact.html`):** Includes `data-netlify="true"` and a Formspree `action` placeholder (`<!-- TODO -->` comment in markup).
- **Newsletter Forms (Footer & `pages/home-2.html`):** Configured with Mailchimp-compatible `EMAIL` field names.
- **Google Maps (`pages/contact.html`):** Includes an interactive 3-city hub switcher and a commented `<iframe>` placeholder for your Google Maps Embed API key.

---

## 4. Credits & Changelog

- **Fonts:** Fraunces, DM Sans, and Caveat via Google Fonts (OFL, self-hosted locally).
- **Icons:** Custom terracotta kulhad SVGs and Lucide-compatible inline vector icons.
- **Photography:** 56 unique curated commercial-use photographs from Unsplash, locally optimized in WebP + JPG formats.

### Changelog
- **v1.0.0 (November 2026):** Initial production release with 8 distinct pages, 3D tilt cards, tea animations, dark mode, RTL support, and interactive customizer/calculators.
