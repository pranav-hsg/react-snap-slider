# React Snap Slider

A modern **React slider component** built with a **Yarn Berry monorepo** and workspaces. The setup provides a clean separation between the main package and example projects for easy development and testing.

---

## 📖 Project Definition

The goal of this project is to create a reusable, modern **React slider component** packaged for npm.

* **Main library** → `packages/react-snap-slider`
* **Example sandbox app** → `examples/rss-sandbox` (React + Vite + TypeScript)
* **Build tool** → `tsup` (TypeScript bundler for npm packages)
* **Package manager** → Yarn Berry (Yarn 4) with workspaces

---

## ⚡ Features

* Smartly calculates and applies margin between slide cards
* Automatically adjusts spacing based on screen size
* Smooth sliding experience with snapping behavior
* Simple, reusable React component written in TypeScript
* Built with `tsup` for easy publishing to npm
* Example app included for testing and showcasing usage

---

## 🏗 Monorepo Architecture

```
.
├── docs/                     # Documentation files
│   ├── initial-arch.md       # Initial architecture notes
│   └── structure.md          # Repository structure explanation
├── examples/
│   └── rss-sandbox/          # Example React project (Vite + TypeScript)
├── packages/
│   └── react-snap-slider/    # Main library package
└── package.json
```

* [Initial Architecture Notes](./docs/initial-arch.md)
* [Repository Structure](./docs/structure.md)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Build all packages

```bash
yarn run build:all
```

### 3. Run development server (example app)

```bash
yarn run dev
```

---

## 🛠 Development Workflow

* Develop your component in `packages/react-snap-slider`
* Build the library with `tsup`
* Use `examples/rss-sandbox` to test the library live while developing

---

## 📦 Publishing

1. Build the package using `tsup`
2. Configure `package.json` with proper `exports`, `main`, and `types`
3. Publish to npm with:

   ```bash
   npm publish --access public
   ```

---

## ✅ Outcome

This setup makes it easier to:

* Maintain a clean **separation between library and examples**
* Test changes in real projects instantly
* Provide a smart, responsive React slider ready for **npm publishing**
