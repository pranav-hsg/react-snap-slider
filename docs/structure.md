# Repository Structure & Yarn Berry Files

This repository uses **Yarn Berry (v4)** with a monorepo setup. Below is an explanation of key files and folders, including some lesser-known Yarn internals.

## 📂 Root Files & Folders

* **package.json** – Defines project metadata, dependencies, and workspaces.
* **.yarnrc.yml** – Yarn configuration file (replaces `.yarnrc` from v1).
* **.yarn/** – Internal Yarn cache and configuration directory.

  * **releases/** – Contains Yarn releases, e.g. `yarn-4.x.cjs`. This allows the repo to lock to a specific Yarn version.
  * **plugins/** – Stores optional Yarn plugins installed for additional features.
  * **cache/** – Contains cached `.zip` archives of dependencies (instead of `node_modules`).
  * **install-state.gz** – A compressed binary file storing the current install state:

    * Tracks dependency tree resolution.
    * Records checksums to ensure integrity.
    * Used to optimize `yarn install` by avoiding unnecessary reinstalls.
  * **build-state.yml** – Caches information about builds to avoid rebuilding unchanged packages.
  * **unplugged/** – Extracted versions of packages that need to run in an uncompressed state (e.g., packages with native code or postinstall scripts).

## 📂 Workspaces

* **packages/** – Contains individual packages (libraries, utilities, etc.).
* **examples/** – Contains example projects that consume the packages.
* **docs/** – Documentation for the repo architecture and usage.

## 📂 Traditional Files

* **.gitignore** – Specifies files and folders ignored by Git.
* **README.md** – Documentation for project setup and usage.

## ⚡ How Yarn Berry Works Here

* No `node_modules/` by default – dependencies are stored in `.yarn/cache` as zip files and referenced via **Plug’n’Play (PnP)**.
* `install-state.gz` and `build-state.yml` ensure installs and builds are deterministic and fast.
* `.yarn/releases/yarn-4.x.cjs` locks the Yarn version to guarantee consistency across environments.

---

✅ This setup ensures **deterministic installs**, **lightweight repos**, and **faster builds** while supporting a scalable monorepo structure.
