
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://M0hatem2.github.io/FreshCart/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/FreshCart/auth/login",
    "route": "/FreshCart"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/auth"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/auth/login"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/auth/register"
  },
  {
    "renderMode": 0,
    "redirectTo": "/FreshCart/user/home",
    "route": "/FreshCart/user"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/user/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6PRWLOBM.js"
    ],
    "route": "/FreshCart/user/category"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Y7TNOPDK.js"
    ],
    "route": "/FreshCart/user/products"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WL57CIK4.js"
    ],
    "route": "/FreshCart/user/brands"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BTXECLO3.js"
    ],
    "route": "/FreshCart/user/cart"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/user/Product-Detiles/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4OIWFWLN.js"
    ],
    "route": "/FreshCart/user/checkout/*"
  },
  {
    "renderMode": 0,
    "route": "/FreshCart/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17012, hash: '3a713c28c437562d7eb15ea5fe18156e0b3309377e650f798149c26ca3be9d3f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1349, hash: '3a8d2af02c147a85a15c6857584cd9f381ea7aa06982d26e06483dab805c1c6a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-TIYKDLWY.css': {size: 139457, hash: 'GxEaPXIZzHU', text: () => import('./assets-chunks/styles-TIYKDLWY_css.mjs').then(m => m.default)}
  },
};
