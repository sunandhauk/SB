# StackBros — Independent Software & AI Automation Studio

> **Big ideas. Built to click.**  
> Official web platform for StackBros Studio — building bespoke websites, custom web applications, and automated AI workflows.

---

## ⚡ Tech Stack & Architecture

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations & Physics:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Typography:** Cormorant Garamond (Editorial serif) + Manrope (Clean modern sans)
* **Email & Enquiry Engine:** Nodemailer + Fail-safe JSON storage fallback (`leads.json`)

---

## 📁 Project Structure

```text
StackBros/
├── public/
│   ├── favicon.ico                         # Studio favicon
│   └── images/                             # Optimized Retina WebP artwork & assets
│       ├── about-process-rope-2x.webp      # About section craft artwork
│       ├── console-knob-dial.png           # 3D brass rotary dial knob
│       ├── enquiry-paper-airplane-2x.webp  # Project brief paper airplane
│       ├── hero-diorama-artwork.webp       # Hero diorama 3D showcase
│       ├── og-preview.png                  # OpenGraph & social sharing card
│       ├── project-rentmatch.webp          # 01 / Rent Match portfolio card
│       ├── project-worklogix.webp          # 02 / WorkLogix portfolio card
│       ├── project-smhrnexus.webp          # 03 / SM HR Nexus portfolio card
│       ├── project-stoneart.webp           # 04 / Sri Shanmuga Stone Art card
│       ├── project-eventique.webp          # 05 / Eventique Planners card
│       ├── project-ironpulse.webp          # 06 / Iron Pulse Fitness card
│       ├── service-console-clean.webp      # Interactive hardware console chassis
│       ├── stackbros-emblem-transparent.png # Studio seal & emblem
│       └── stackbros-icon-512.png          # App icon (512x512)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── enquiry/
│   │   │       └── route.ts                # Fail-safe email & lead capture endpoint
│   │   ├── globals.css                     # Design tokens & Cormorant font definitions
│   │   ├── layout.tsx                      # Root layout, OpenGraph & SEO metadata
│   │   └── page.tsx                        # Main landing page entry
│   └── components/
│       ├── AboutStudio.tsx                 # Studio story, philosophy & values
│       ├── Hero.tsx                        # Hero fold with diorama & dual CTAs
│       ├── Navbar.tsx                      # Header navigation & quick brief modal CTA
│       ├── ProjectPlannerSection.tsx       # 30-sec brief form & post-submit greeting card
│       ├── SelectedWork.tsx                # 6 curated portfolio project showcases
│       └── StudioSection.tsx               # 3D Rotary Radio Console with live workflows
├── .env.local                              # Local SMTP credentials (git-ignored)
├── .gitignore                              # Clean ignore patterns including leads.json
├── clean-cache.js                          # Cache clearing utility for Next.js 15
├── next.config.ts                          # Next.js configuration with Webpack memory cache
├── package.json                            # Scripts & dependencies
└── tsconfig.json                           # TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_USER=stackbros.work@gmail.com
SMTP_PASS=your-google-app-password
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## 🛡️ License
Private repository & proprietary intellectual property of **StackBros Studio**.
All rights reserved.
