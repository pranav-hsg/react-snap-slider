# React Snap Slider Monorepo

This repository is structured as a **Yarn workspaces monorepo** containing the main package (`react-snap-slider`) and example projects (e.g., `rss-sandbox`).

---

## 🚀 Project Setup

### 1. Initialize the Project

```bash
yarn init
```

### 2. Enable Yarn Workspaces

Add the following to your `package.json`:

```json
{
  "workspaces": [
    "packages/*",
    "examples/*"
  ]
}
```

### 3. Upgrade to Yarn Berry (Yarn 4)

```bash
yarn set version berry
```

### 4. Create Folder Structure

```bash
mkdir packages examples
```

---

## 📦 Example Project Setup (`examples/rss-sandbox`)

Inside the `examples/rss-sandbox` folder, create a Vite React + TypeScript project:

```bash
yarn create vite . --template react-ts
```

---

## 📚 Main Package Setup (`packages/react-snap-slider`)

Followed [this guide](https://medium.com/@sundargautam2022/creating-and-publishing-react-npm-packages-simply-using-tsup-6809168e4c86) to set up the package.

### Initialize

```bash
yarn init -y
```

### Install Dependencies

```bash
npm install react react-dom
npm install --save-dev typescript tsup @types/react @types/react-dom
```

---

## 🛠 Development

* The main library lives in `packages/react-snap-slider`
* Example usage can be tested inside `examples/rss-sandbox`

Use `tsup` to build the library and `yarn` to manage dependencies across workspaces.

---

## 📦 Publishing

(To be added — configure `tsup` build, `package.json` exports, and publish to npm)

---

## 📂 Repository Structure

```
.
├── examples/
│   └── rss-sandbox/   # Example React project (Vite + TS)
├── packages/
│   └── react-snap-slider/   # Main library package
└── package.json
```
