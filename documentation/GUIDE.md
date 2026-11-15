# Chai Kulhad Co. — Complete Technical & Customization Documentation

## 1. Architecture & Page Breakdown (Zero Repeated Sections)

Every page in `/pages/` is purpose-built with unique sections and unique local photography:

1. **`pages/index.html` (Home 1 — Split, Story-Led Layout)**
   - Split Hero with 3D tilt frame, animated CSS steam wisps, and floating stat chips (`150+ Outlets`, `2.4M+ Cups Served`).
   - Infinite scrolling Trust Marquee.
   - 4-Step Chai Ritual (`Boil`, `Spice`, `Steep`, `Serve`).
   - Why People Love Us (6 icon tilt cards).
   - Animated Outlet Counters (`156+ Outlets`, `42+ Cities`, `2.4M+ Kulhads`, `118+ Partners`).
   - Customer Love Testimonial Slider.
   - `#ChaiMoments` 6-photo Masonry Gallery.
   - Final Dual-Action CTA Banner.

2. **`pages/home-2.html` (Home 2 — Full-Bleed Cinematic Lounge)**
   - Full-Screen 3-Slide Background Hero with "Find Your Nearest Chai Cafe" live search locator.
   - Featured-In & Awards Strip.
   - Interactive Chai of the Day Spotlight with rotating tasting notes (`Kashmiri Kesar`, `Himalayan Adrak`, `Pushkar Rose`).
   - Horizontal Scroll-Snap Farm-to-Cup Sourcing Journey.
   - 5-Item Best Sellers Swipeable Carousel.
   - Seasonal Specials block with live countdown timer.
   - 5-Photo Cafe Ambience Bento Grid.
   - "The Kulhad Guild" Loyalty App teaser with phone mockup.
   - VIP Tasting Pass Newsletter Band.

3. **`pages/menu.html` (Menu)**
   - Compact Page Banner with Breadcrumb.
   - Sticky Category Filter Bar (`All`, `Signature Chai`, `Coffee`, `Cold Brews & Coolers`, `Snacks`, `Desserts`, `Combos`) with skeleton shimmer transitions and saved favourites counter.
   - 3D Tilt Menu Cards with 100% Pure Veg badges, ₹ Rupees pricing, and `localStorage`-persisted "Add to Favourites" hearts.
   - Interactive "Build Your Own Kulhad Chai" Customizer with live price calculation.
   - Signature Combo Meal Offers.
   - Nutrition & Allergen Advisory Accordion.
   - Menu FAQs Accordion.

4. **`pages/franchise.html` (Franchise Opportunity)**
   - Franchise Hero with key metrics (`64% Gross Margin`, `10–14 Mo Break-Even`, `45 Days Launch`).
   - Why Franchise With Us cards.
   - 3 Franchise Models (`Express Kiosk ₹8.5L`, `Signature Cafe ₹16.5L`, `Premium Lounge ₹28.0L`).
   - Investment Breakdown Comparison Table.
   - Interactive ROI & Break-Even Calculator (sliders for daily orders, average bill value, and format).
   - 6-Pillar Support System.
   - 5-Step Franchise Launch Timeline.
   - Eligibility & Property Requirements Checklist.
   - Verified Franchise Partner Success Stories.
   - Franchise FAQs Accordion & Apply CTA (`contact.html?type=franchise#enquiry-form`).

5. **`pages/about.html` (About Us)**
   - Heritage Banner, Brand Story (2018 Indiranagar origin), Mission & Vision, 4 Core Values, 2018–2026 Milestones Timeline, Meet the Founders & Master Tea Sommelier, and The Kulhad Sustainability Pledge.

6. **`pages/contact.html` (Contact & Enquiry Form)**
   - Dynamic Enquiry Form (`General`, `Franchise`, `Bulk Order`, `Feedback`) that conditionally reveals the Investment Budget selector for Franchise leads, Contact Info Cards, Interactive 3-City Map Pin Switcher, Social Community Cards, and Regional Offices directory.

7. **`pages/404.html` & `pages/coming-soon.html`**
   - Custom "Oops, This Chai Went Cold!" error page with smart keyword redirect search, and Jaipur Heritage Haveli Lounge launch countdown with Notify-Me validation.

---

## 2. Responsive Design & Button System Rules

- **Mobile (`<640px`):** All tags, headings, sub-text, and buttons are center-aligned (`text-align: center`). Every `.btn` element shares the exact same dimensions (`width: 100%; max-width: 280px; min-width: 280px; height: 48px; padding: 0 24px; font-size: 0.95rem`).
- **Tablet (`640px–1024px`):** All tags, headings, and buttons are center-aligned.
- **Desktop (`>1024px`):** Split hero and story sections use left-aligned typography where appropriate, while all `.tilt-card` components maintain center-aligned icons and text across all viewports.

---

## 3. Support & Maintenance

For customization assistance or enterprise deployment questions, inspect the `<!-- TODO -->` markers inside `pages/*.html` and `assets/css/style.css`.
