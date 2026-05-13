import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CmUatw8Q.mjs';
import { manifest } from './manifest_DWwfb9be.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/chatbot.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/blogs.astro.mjs');
const _page6 = () => import('./pages/blogs/_---slug_.astro.mjs');
const _page7 = () => import('./pages/projects.astro.mjs');
const _page8 = () => import('./pages/projects/_---slug_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/chatbot.ts", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/blogs/index.astro", _page5],
    ["src/pages/blogs/[...slug].astro", _page6],
    ["src/pages/projects/index.astro", _page7],
    ["src/pages/projects/[...slug].astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "af674f90-2f5b-4ed2-ae51-041ff13e68ab"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
