import { defineConfig } from "tsup";
import { sassPlugin } from 'esbuild-sass-plugin'
import CssModulesPlugin from 'esbuild-css-modules-plugin'
const injectFunc = `
function injectStyle(css) {
  if (!css || typeof document === 'undefined') return

  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'
          
  if(head.firstChild) {
    head.insertBefore(style, head.firstChild)
  } else {
    head.appendChild(style)
  }

  if(style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}
`;

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true, // Generate TypeScript declaration files
    splitting: false,
    clean: true,
    sourcemap: true,
    minify: false,
    injectStyle: css => {
        return `${injectFunc}injectStyle(${css});`;
    },
    esbuildPlugins: [],
    target: 'es2018',
});
