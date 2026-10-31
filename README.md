# Kartik Service Centre (ಕಾರ್ತಿಕ ಸರ್ವಿಸ್ ಸೆಂಟರ್)

> Precision Engineering & Master Craftsmanship for Two-Wheelers in Chitguppa, Karnataka.

[![Website Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://github.com/shashikant-panchal/kartik-service-center)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![3D Engine: Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20WebGL-orange)](https://threejs.org/)

---

## 📖 Overview
**Kartik Service Centre** is an automotive garage website crafted for Kartik, an experienced mechanic in Chitguppa (Karnataka). The website blends an authentic industrial workshop atmosphere with high-end, clean modern aesthetics—featuring real Three.js 3D machinery simulations, responsive 3D floating metal tools, live workshop photo galleries, and zero-clutter floating contact docks.

---

## 📁 Production Directory Structure

```text
kartik-service-center/
├── assets/
│   ├── css/
│   │   └── styles.css              # Custom styling, pastel tokens, glassmorphism, responsive canvas
│   ├── js/
│   │   └── app.js                  # Three.js 3D engine, procedural machinery models, gallery & modal logic
│   └── images/
│       ├── branding/
│       │   ├── logo.svg            # Official metallic shield logo
│       │   └── favicon.svg         # High-contrast tab icon
│       ├── owner/
│       │   └── kartik.jpeg         # Portrait of Kartik (Experienced Mechanic)
│       ├── workshop/
│       │   ├── banner.jpeg         # Outdoor official board (ShopBanner)
│       │   ├── visiting-card.jpeg  # Official printed business card (ShopCard)
│       │   ├── storefront.jpeg     # Garage entrance on Chitguppa Main Road
│       │   └── storefront-alt.jpeg # High-res alternate entrance photograph
│       └── gallery/
│           ├── work-01-cylinder-head.jpeg
│           ├── work-02-clutch-pack.jpeg
│           ├── work-03-compressor.jpeg
│           ├── work-04-tool-wall.jpeg
│           ├── work-05-bullet-fork.jpeg
│           ├── work-06-pulsar-tuning.jpeg
│           ├── work-07-splendor-crankcase.jpeg
│           ├── work-08-bullet-engine.jpeg
│           ├── work-09-connecting-rod.jpeg
│           ├── work-10-crankshaft.jpeg
│           ├── work-11-gearbox.jpeg
│           ├── work-12-wheel-hub.jpeg
│           ├── work-13-cvt-variator.jpeg
│           ├── work-14-piston-ring.jpeg
│           ├── work-15-carburetor.jpeg
│           └── work-16-precision-tools.jpeg
├── index.html                      # Semantic, accessible HTML5 single-page application
├── package.json                    # Project metadata & npm preview scripts
├── .editorconfig                   # Consistent code formatting standard
├── .gitignore                      # Git exclusion rules for clean repository
└── README.md                       # Complete production documentation
```

---

## ⚡ Key Highlights & Features

### 1. Interactive 3D Machinery Showcase
Procedurally modeled, PBR-rendered Three.js machinery cards with 360° user drag-and-orbit, auto-spin, and full inspection studio modal:
- **Metro Super Compressor:** Cast-iron twin V-cylinders, cooling fins, heavy-duty pressure gauges, and belt pulley.
- **High-Pressure Washer:** Triplex brass plunger pump, dual lance nozzles, and hydro-gauge.
- **Pneumatic Air Impact Gun:** Ergonomic grip, twin-hammer torque housing, and air-inlet regulator.
- **Heavy-Duty Drill:** Multi-speed chuck, side stability handle, and ventilation ports.
- **Angle Grinder:** High-speed spinning abrasive disc, chrome safety guard, and spindle lock.
- **Rapid Battery Charger:** Calibrated analog Ammeter/Voltmeter dials, cyan backlit digital LCD display, 4 diagnostic LEDs, knurled rate selector knobs, illuminated rocker switch, and thick flexible cables with serrated solid copper alligator clamps.

### 2. 15 Real Metal Workshop Tools (Three.js PBR)
Authentic Indian workshop tools distributed strictly along the screen margins without obstructing center content:
- **Left Margin:** Hathoda (Hammer), Pechkas (Screwdriver), Spark Plug, Nose Pakkad, Double Pana, Salai Pana, Chheni (Chisel), Goli Bearing.
- **Right Margin:** T-Pana, Pakkad (Pliers), Nut-Boltu, L-Key, Ring Pana, Goti Ratchet, Reti (File).

### 3. Live Workshop Craftsman Gallery
- Smooth horizontal carousel with arrow controls.
- "View All (16 Photos)" toggle switching seamlessly into a 4-column responsive grid.
- Category filtering: *All*, *Engine Overhauls*, *Bike Servicing*, and *Workshop Tools*.
- Click-to-zoom modal lightbox for high-resolution inspection.

### 4. Zero Clutter & Direct Floating Action Dock
- Only two permanent, ergonomic action buttons docked at the bottom-right:
  - 📞 **Phone Dialer:** Instant click-to-call [`6363176145`](tel:6363176145)
  - 💬 **WhatsApp:** One-click pre-filled chat [`6363176145`](https://wa.me/916363176145)

---

## 🛠 Tech Stack
- **Markup & Layout:** HTML5 Semantic Structure, Tailwind CSS (CDN)
- **Visuals & 3D:** Three.js (WebGL, PBR Metallic Materials, Orthographic & Perspective Viewports)
- **Iconography:** Lucide Icons (CDN)
- **Typography:** Orbitron (Headings), Space Grotesk (Tech labels), Plus Jakarta Sans (Body)
- **Architecture:** Zero-dependency static frontend (pluggable, portable, instant load)

---

## 💻 Local Development & Preview

### Option A: Double-Click (Zero Setup)
Simply double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, or Firefox.

### Option B: Local Web Server
```bash
# Clone the repository
git clone https://github.com/shashikant-panchal/kartik-service-center.git
cd kartik-service-center

# Run lightweight local server (Node.js 16+)
npm run dev
# or
npx serve -l 3000 .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide

### Deploy to GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** > **Source**, select `Deploy from a branch`.
3. Choose branch: `main` and folder: `/ (root)`.
4. Click **Save**. Your site will be live at `https://shashikant-panchal.github.io/kartik-service-center/`.

### Deploy to Vercel / Netlify
- **Build Command:** *(Leave empty)*
- **Output Directory:** `.` *(Root)*

---

## 📍 Workshop Contact Information
- **Owner:** Kartik (Experienced Mechanic)
- **Primary Phone & WhatsApp:** +91 6363176145
- **Secondary Phone:** +91 8296949628
- **Location:** Near Neharu Chowk Main Road, Chitguppa 585-412, Karnataka
- **Working Hours:** Monday – Saturday: 8:30 AM – 8:30 PM | Sunday: 9:00 AM – 2:00 PM

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
