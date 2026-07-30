# 💻 Interactive Terminal Portfolio — Filbert Christian Winch

An immersive, retro terminal-style portfolio web application designed for developers and tech recruiters. Styled after the soothing **Vesper** color scheme (`vesper.nvim`), it emulator-simulates a command-line shell with interactive capabilities.

🚀 **Live Demo:** [https://winchfilbert.github.io/Portfolio/](https://winchfilbert.github.io/Portfolio/)

---

## 🌟 Key Features

- **Interactive Command Emulator**: Type commands to navigate the portfolio. Type `help` for a full list of commands or try running `about`, `projects`, `experience`, `skills`, or `contact`.
- **Quick-Access Navigation**: Integrated a mouse-clickable navigation dock in the welcome banner so recruiters can explore the portfolio without having to type.
- **Vesper.nvim Aesthetics**: Modernized terminal UI featuring custom CSS variables, rounded blocks, glassmorphic backdrop filters, and soft glowing accents.
- **Hiring-Centric Tech Highlighting**: An auto-scanning keyword highlighter that colors technology stacks and quantitative impact metrics to make accomplishments stand out.
- **Media Carousels & Lightbox**: Interactive project cards that open detailed modal dialogs featuring auto-rotating media carousels and high-res lightbox views.
- **Responsive Layout**: Designed to adapt dynamically between desktop dual-column layouts and mobile terminal shells.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, Vite, TanStack Router)
- **Styling**: Vanilla CSS, Tailwind CSS, Lucide Icons
- **Deployment**: GitHub Pages (Configured via SPA mode with static prerendering)

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Development Server
Start the local hot-reloading development server on port 3000:
```bash
npm run dev
```

### 3. Build & Local Preview
Compile both client and server targets for production:
```bash
npm run build
```
Preview the built SPA client application locally:
```bash
npm run preview
```

### 4. Deploying to GitHub Pages
To publish the latest build to GitHub Pages, run the automated pipeline command:
```bash
npm run deploy
```
*(This triggers `predeploy` to compile the app in SPA mode, copies Vinxi's `_shell.html` to `index.html` to establish the entry point, and pushes the build folder to the `gh-pages` branch).*
