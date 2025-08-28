# Caveats for Adding Local Packages in This Monorepo

This monorepo uses **Yarn Berry (v2+/4)** with workspaces.
To ensure local development works smoothly, you must **add packages the right way**.

---

## ✅ Correct Way

Suppose you have a package at:

```
packages/react-snap-slider/
```

and its `package.json` contains:

```json
{
  "name": "react-snap-slider",
  "version": "0.0.1"
}
```

If you want to use it inside your example app at:

```
examples/rss-sandbox/
```

then from inside `examples/rss-sandbox` run:

```sh
yarn add react-snap-slider
```

Yarn will automatically:

* Recognize that `react-snap-slider` is part of the workspace.
* Create a **symlink** to the local package (not copy from cache).
* Keep your project in sync whenever you rebuild `react-snap-slider`.

Properly adding this will result in something like this 

```json
"dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-snap-slider": "workspace:^"
}
```

---

## ❌ Wrong Way

Do **not** add the package via relative path:

```sh
yarn add ../../packages/react-snap-slider   # 🚫 Wrong
```

Why this is bad:

* Yarn copies the package into `.yarn/cache` instead of linking it.
* Changes inside `packages/react-snap-slider` won’t reflect automatically.
* You’ll end up running `yarn install` again and again, which is slow.

---

## ⚡ Tips for Smooth Development

* Run your library in **watch mode** so builds are updated automatically:

  ```sh
  cd packages/react-snap-slider
  yarn dev   # or `tsc -w`, `tsup --watch`, etc.
  ```

* In another terminal, run your example app:

  ```sh
  cd examples/rss-sandbox
  yarn dev
  ```

* Now changes in `react-snap-slider` will rebuild and reflect instantly in `rss-sandbox`.

---

✅ **Summary**

* Always `yarn add react-snap-slider` (by name).
* Never `yarn add ../../packages/react-snap-slider` (by path).

