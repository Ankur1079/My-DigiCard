# 📇 My-DigiCard (Digital Introduction Card)

A polished, highly interactive, and professionally designed Digital Card and Resume dashboard tailored for **Ankur Yadav**. Designed for rapid communication, this card works flawlessly on both desktop and mobile devices with light and dark mode states.

---

## 🛠️ Full Tech Stack

The application is built using the following modern industrial frontend stack:

- **Core Library**: **React 19**
  - Utilizes functional components, custom Hooks, and fully reactive state management with client-side key-value caching (`localStorage`) for real-time customizations.
- **Language**: **TypeScript**
  - Strongly typed schemas and interfaces (`src/types.ts`) guaranteeing end-to-end data safety, strict compiler checks, and code readability.
- **Build System & Dev Server**: **Vite 6**
  - Ultra-fast native ES modules (ESM) hot routing, bundled on a high-speed engine which ensures optimized single-page asset compilation.
- **Styling Architecture**: **Tailwind CSS v4**
  - Fast, modern utility-first CSS utilizing direct CSS imports (`@import "tailwindcss";`), custom theme configurations, and optimized responsive modifiers (`sm:`, `md:`, `lg:`) for deep device responsiveness.
- **Interaction & Animations**: **Motion (Framer Motion v12)**
  - Advanced physical simulations, hardware-accelerated state transitions, stagger animations, micro-interactions, scale taps, and entrance animations of card wrappers.
- **Design Assets & Iconography**: **Lucide Icons (`lucide-react`)**
  - Clean, high-contrast, scalable vector SVG icon mappings representing skill categories, copy actions, location variables, and contact channels.

---

## ✨ Features & Design Highlights

1. **Dual theme (Sleek Slate Interface)**:
   - High-contrast **Light Theme** (slate-50 backgrounds and clean dark-indigo text) and a rich deep-space **Dark Theme** featuring gorgeous glowing ambient radial blobs.
2. **Dynamic Skill Grid**:
   - Organized interactive chips with custom assigned category icons mapped directly for Programming, Frontend, Database, and Tooling categories.
3. **Optimized Avatar & Local Storage**:
   - Native rendering of a sharp, high-resolution portrait saved locally in `/public/avatar.jpg`, with local storage fallback layers ensuring instantaneous offline-first loading.
4. **Actionable Contact Panel**:
   - Click-to-copy utility with responsive emerald-green Success indicators for copy-to-clipboard, with beautiful direct communication controls targeting GitHub, LinkedIn, Website, Call, and Email.
5. **Interactive Experience Timeline & Modal**:
   - High-fidelity modal view displaying interactive, chronological experiences, education records (CGPA & percentages), projects, and Meta certificates.

---

## 📁 Project Architecture

```bash
├── public/                 # Static assets directory
│   └── avatar.jpg          # High-resolution offline profile image
├── src/
│   ├── components/
│   │   ├── CardPreview.tsx # Core Digital Card design component
│   │   └── ResumeModal.tsx # Interactive educational & timeline modal
│   ├── App.tsx             # Theme states, global triggers & app container
│   ├── defaultData.ts      # Structured card schemas & data declarations
│   ├── index.css           # Global custom theme & Tailwind CSS directives
│   ├── main.tsx            # Main application mounting entry-point
│   └── types.ts            # Shared TypeScript type guidelines
├── index.html              # Core HTML Shell with "My-DigiCard" configurations
├── package.json            # Task definitions & dependency declarations
├── tsconfig.json           # Type checking guidelines
└── vite.config.ts          # Vite build optimization rules
```

---

## ⚡ Getting Started

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these simple steps to run the project locally.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Build for Production
To bundle the application into highly compressed static assets:
```bash
npm run build
```
This will compile all compiled assets cleanly inside the `/dist` directory, fully ready for static hostings like Vercel, Netlify, or Github Pages.

---

## 📄 Customization

To personalize the information rendered on this digital introduction card, simply update the JSON properties inside `/src/defaultData.ts`. It will instantly cascade across the entire card layout.

