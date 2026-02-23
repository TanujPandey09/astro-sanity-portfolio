import { createClient } from '@sanity/client';
/* empty css                         */
import { e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, j as renderScript, i as renderComponent, k as renderSlot, n as renderHead, h as createAstro } from './astro/server_B9UMfF79.mjs';
import 'kleur/colors';
import 'clsx';
import { jsxs, jsx } from 'react/jsx-runtime';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"fqd3bez7","dataset":"production","useCdn":true}
          );

globalThis.sanityClient = sanityClient;

var on = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Te(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Qe = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(on, function() {
    function r() {
      return r = Object.assign || function(l) {
        for (var c = 1; c < arguments.length; c++) {
          var p = arguments[c];
          for (var f in p)
            Object.prototype.hasOwnProperty.call(p, f) && (l[f] = p[f]);
        }
        return l;
      }, r.apply(this, arguments);
    }
    function n(l, c) {
      if (l) {
        if (typeof l == "string")
          return i(l, c);
        var p = Object.prototype.toString.call(l).slice(8, -1);
        if (p === "Object" && l.constructor && (p = l.constructor.name), p === "Map" || p === "Set")
          return Array.from(l);
        if (p === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p))
          return i(l, c);
      }
    }
    function i(l, c) {
      (c == null || c > l.length) && (c = l.length);
      for (var p = 0, f = new Array(c); p < c; p++)
        f[p] = l[p];
      return f;
    }
    function s(l, c) {
      var p = typeof Symbol < "u" && l[Symbol.iterator] || l["@@iterator"];
      if (p)
        return (p = p.call(l)).next.bind(p);
      if (Array.isArray(l) || (p = n(l)) || c) {
        p && (l = p);
        var f = 0;
        return function() {
          return f >= l.length ? {
            done: true
          } : {
            done: false,
            value: l[f++]
          };
        };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var o = "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";
    function u(l) {
      var c = l.split("-"), p = c[1], f = c[2], O = c[3];
      if (!p || !f || !O)
        throw new Error("Malformed asset _ref '" + l + `'. Expected an id like "` + o + '".');
      var b = f.split("x"), S = b[0], M = b[1], q = +S, F = +M, $ = isFinite(q) && isFinite(F);
      if (!$)
        throw new Error("Malformed asset _ref '" + l + `'. Expected an id like "` + o + '".');
      return {
        id: p,
        width: q,
        height: F,
        format: O
      };
    }
    var d = function(c) {
      var p = c;
      return p ? typeof p._ref == "string" : false;
    }, g = function(c) {
      var p = c;
      return p ? typeof p._id == "string" : false;
    }, a = function(c) {
      var p = c;
      return p && p.asset ? typeof p.asset.url == "string" : false;
    };
    function h(l) {
      if (!l)
        return null;
      var c;
      if (typeof l == "string" && y(l))
        c = {
          asset: {
            _ref: w(l)
          }
        };
      else if (typeof l == "string")
        c = {
          asset: {
            _ref: l
          }
        };
      else if (d(l))
        c = {
          asset: l
        };
      else if (g(l))
        c = {
          asset: {
            _ref: l._id || ""
          }
        };
      else if (a(l))
        c = {
          asset: {
            _ref: w(l.asset.url)
          }
        };
      else if (typeof l.asset == "object")
        c = r({}, l);
      else
        return null;
      var p = l;
      return p.crop && (c.crop = p.crop), p.hotspot && (c.hotspot = p.hotspot), C(c);
    }
    function y(l) {
      return /^https?:\/\//.test("" + l);
    }
    function w(l) {
      var c = l.split("/").slice(-1);
      return ("image-" + c[0]).replace(/\.([a-z]+)$/, "-$1");
    }
    function C(l) {
      if (l.crop && l.hotspot)
        return l;
      var c = r({}, l);
      return c.crop || (c.crop = {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      }), c.hotspot || (c.hotspot = {
        x: 0.5,
        y: 0.5,
        height: 1,
        width: 1
      }), c;
    }
    var m = [["width", "w"], ["height", "h"], ["format", "fm"], ["download", "dl"], ["blur", "blur"], ["sharpen", "sharp"], ["invert", "invert"], ["orientation", "or"], ["minHeight", "min-h"], ["maxHeight", "max-h"], ["minWidth", "min-w"], ["maxWidth", "max-w"], ["quality", "q"], ["fit", "fit"], ["crop", "crop"], ["saturation", "sat"], ["auto", "auto"], ["dpr", "dpr"], ["pad", "pad"]];
    function v(l) {
      var c = r({}, l || {}), p = c.source;
      delete c.source;
      var f = h(p);
      if (!f)
        throw new Error("Unable to resolve image URL from source (" + JSON.stringify(p) + ")");
      var O = f.asset._ref || f.asset._id || "", b = u(O), S = Math.round(f.crop.left * b.width), M = Math.round(f.crop.top * b.height), q = {
        left: S,
        top: M,
        width: Math.round(b.width - f.crop.right * b.width - S),
        height: Math.round(b.height - f.crop.bottom * b.height - M)
      }, F = f.hotspot.height * b.height / 2, $ = f.hotspot.width * b.width / 2, H = f.hotspot.x * b.width, J = f.hotspot.y * b.height, D = {
        left: H - $,
        top: J - F,
        right: H + $,
        bottom: J + F
      };
      return c.rect || c.focalPoint || c.ignoreImageParams || c.crop || (c = r({}, c, k({
        crop: q,
        hotspot: D
      }, c))), E(r({}, c, {
        asset: b
      }));
    }
    function E(l) {
      var c = (l.baseUrl || "https://cdn.sanity.io").replace(/\/+$/, ""), p = l.asset.id + "-" + l.asset.width + "x" + l.asset.height + "." + l.asset.format, f = c + "/images/" + l.projectId + "/" + l.dataset + "/" + p, O = [];
      if (l.rect) {
        var b = l.rect, S = b.left, M = b.top, q = b.width, F = b.height, $ = S !== 0 || M !== 0 || F !== l.asset.height || q !== l.asset.width;
        $ && O.push("rect=" + S + "," + M + "," + q + "," + F);
      }
      l.bg && O.push("bg=" + l.bg), l.focalPoint && (O.push("fp-x=" + l.focalPoint.x), O.push("fp-y=" + l.focalPoint.y));
      var H = [l.flipHorizontal && "h", l.flipVertical && "v"].filter(Boolean).join("");
      return H && O.push("flip=" + H), m.forEach(function(J) {
        var D = J[0], Y = J[1];
        typeof l[D] < "u" ? O.push(Y + "=" + encodeURIComponent(l[D])) : typeof l[Y] < "u" && O.push(Y + "=" + encodeURIComponent(l[Y]));
      }), O.length === 0 ? f : f + "?" + O.join("&");
    }
    function k(l, c) {
      var p, f = c.width, O = c.height;
      if (!(f && O))
        return {
          width: f,
          height: O,
          rect: l.crop
        };
      var b = l.crop, S = l.hotspot, M = f / O, q = b.width / b.height;
      if (q > M) {
        var F = Math.round(b.height), $ = Math.round(F * M), H = Math.max(0, Math.round(b.top)), J = Math.round((S.right - S.left) / 2 + S.left), D = Math.max(0, Math.round(J - $ / 2));
        D < b.left ? D = b.left : D + $ > b.left + b.width && (D = b.left + b.width - $), p = {
          left: D,
          top: H,
          width: $,
          height: F
        };
      } else {
        var Y = b.width, Mt = Math.round(Y / M), nn = Math.max(0, Math.round(b.left)), sn = Math.round((S.bottom - S.top) / 2 + S.top), mt = Math.max(0, Math.round(sn - Mt / 2));
        mt < b.top ? mt = b.top : mt + Mt > b.top + b.height && (mt = b.top + b.height - Mt), p = {
          left: nn,
          top: mt,
          width: Y,
          height: Mt
        };
      }
      return {
        width: f,
        height: O,
        rect: p
      };
    }
    var T = ["clip", "crop", "fill", "fillmax", "max", "scale", "min"], x = ["top", "bottom", "left", "right", "center", "focalpoint", "entropy"], W = ["format"];
    function B(l) {
      return l && "config" in l ? typeof l.config == "function" : false;
    }
    function G(l) {
      return l && "clientConfig" in l ? typeof l.clientConfig == "object" : false;
    }
    function st(l) {
      for (var c = m, p = s(c), f; !(f = p()).done; ) {
        var O = f.value, b = O[0], S = O[1];
        if (l === b || l === S)
          return b;
      }
      return l;
    }
    function ot(l) {
      if (B(l)) {
        var c = l.config(), p = c.apiHost, f = c.projectId, O = c.dataset, b = p || "https://api.sanity.io";
        return new yt(null, {
          baseUrl: b.replace(/^https:\/\/api\./, "https://cdn."),
          projectId: f,
          dataset: O
        });
      }
      var S = l;
      if (G(S)) {
        var M = S.clientConfig, q = M.apiHost, F = M.projectId, $ = M.dataset, H = q || "https://api.sanity.io";
        return new yt(null, {
          baseUrl: H.replace(/^https:\/\/api\./, "https://cdn."),
          projectId: F,
          dataset: $
        });
      }
      return new yt(null, l);
    }
    var yt = /* @__PURE__ */ function() {
      function l(p, f) {
        this.options = undefined, this.options = p ? r({}, p.options || {}, f || {}) : r({}, f || {});
      }
      var c = l.prototype;
      return c.withOptions = function(f) {
        var O = f.baseUrl || this.options.baseUrl, b = {
          baseUrl: O
        };
        for (var S in f)
          if (f.hasOwnProperty(S)) {
            var M = st(S);
            b[M] = f[S];
          }
        return new l(this, r({
          baseUrl: O
        }, b));
      }, c.image = function(f) {
        return this.withOptions({
          source: f
        });
      }, c.dataset = function(f) {
        return this.withOptions({
          dataset: f
        });
      }, c.projectId = function(f) {
        return this.withOptions({
          projectId: f
        });
      }, c.bg = function(f) {
        return this.withOptions({
          bg: f
        });
      }, c.dpr = function(f) {
        return this.withOptions(f && f !== 1 ? {
          dpr: f
        } : {});
      }, c.width = function(f) {
        return this.withOptions({
          width: f
        });
      }, c.height = function(f) {
        return this.withOptions({
          height: f
        });
      }, c.focalPoint = function(f, O) {
        return this.withOptions({
          focalPoint: {
            x: f,
            y: O
          }
        });
      }, c.maxWidth = function(f) {
        return this.withOptions({
          maxWidth: f
        });
      }, c.minWidth = function(f) {
        return this.withOptions({
          minWidth: f
        });
      }, c.maxHeight = function(f) {
        return this.withOptions({
          maxHeight: f
        });
      }, c.minHeight = function(f) {
        return this.withOptions({
          minHeight: f
        });
      }, c.size = function(f, O) {
        return this.withOptions({
          width: f,
          height: O
        });
      }, c.blur = function(f) {
        return this.withOptions({
          blur: f
        });
      }, c.sharpen = function(f) {
        return this.withOptions({
          sharpen: f
        });
      }, c.rect = function(f, O, b, S) {
        return this.withOptions({
          rect: {
            left: f,
            top: O,
            width: b,
            height: S
          }
        });
      }, c.format = function(f) {
        return this.withOptions({
          format: f
        });
      }, c.invert = function(f) {
        return this.withOptions({
          invert: f
        });
      }, c.orientation = function(f) {
        return this.withOptions({
          orientation: f
        });
      }, c.quality = function(f) {
        return this.withOptions({
          quality: f
        });
      }, c.forceDownload = function(f) {
        return this.withOptions({
          download: f
        });
      }, c.flipHorizontal = function() {
        return this.withOptions({
          flipHorizontal: true
        });
      }, c.flipVertical = function() {
        return this.withOptions({
          flipVertical: true
        });
      }, c.ignoreImageParams = function() {
        return this.withOptions({
          ignoreImageParams: true
        });
      }, c.fit = function(f) {
        if (T.indexOf(f) === -1)
          throw new Error('Invalid fit mode "' + f + '"');
        return this.withOptions({
          fit: f
        });
      }, c.crop = function(f) {
        if (x.indexOf(f) === -1)
          throw new Error('Invalid crop mode "' + f + '"');
        return this.withOptions({
          crop: f
        });
      }, c.saturation = function(f) {
        return this.withOptions({
          saturation: f
        });
      }, c.auto = function(f) {
        if (W.indexOf(f) === -1)
          throw new Error('Invalid auto mode "' + f + '"');
        return this.withOptions({
          auto: f
        });
      }, c.pad = function(f) {
        return this.withOptions({
          pad: f
        });
      }, c.url = function() {
        return v(this.options);
      }, c.toString = function() {
        return this.url();
      }, l;
    }();
    return ot;
  });
})(Qe);
const Ln = typeof navigator > "u" ? false : navigator.product === "ReactNative", be = {
  timeout: Ln ? 6e4 : 12e4
};
function Wn(t) {
  const e = typeof t == "string" ? Object.assign({
    url: t
  }, be) : Object.assign({}, be, t), r = new URL(e.url, "http://localhost");
  if (e.timeout = ur(e.timeout), e.query) {
    for (const [n, i] of Object.entries(e.query))
      if (i !== undefined)
        if (Array.isArray(i))
          for (const s of i)
            r.searchParams.append(n, s);
        else
          r.searchParams.append(n, i);
  }
  return e.method = e.body && !e.method ? "POST" : (e.method || "GET").toUpperCase(), e.url = r.origin === "http://localhost" ? "".concat(r.pathname, "?").concat(r.searchParams) : r.toString(), e;
}
function ur(t) {
  if (t === false || t === 0)
    return false;
  if (t.connect || t.socket)
    return t;
  const e = Number(t);
  return isNaN(e) ? ur(be.timeout) : {
    connect: e,
    socket: e
  };
}
const Hn = /^https?:\/\//i;
function Bn(t) {
  if (!Hn.test(t.url))
    throw new Error('"'.concat(t.url, '" is not a valid URL'));
}
var he = function(t) {
  return t.replace(/^\s+|\s+$/g, "");
}, zn = function(t) {
  return Object.prototype.toString.call(t) === "[object Array]";
}, Nn = function(t) {
  if (!t)
    return {};
  for (var e = {}, r = he(t).split(`
`), n = 0; n < r.length; n++) {
    var i = r[n], s = i.indexOf(":"), o = he(i.slice(0, s)).toLowerCase(), u = he(i.slice(s + 1));
    typeof e[o] > "u" ? e[o] = u : zn(e[o]) ? e[o].push(u) : e[o] = [e[o], u];
  }
  return e;
};
const Vn = /* @__PURE__ */ Te(Nn);
var Gn = (t) => function(r, n) {
  const i = r === "onError";
  let s = n;
  for (var o = arguments.length, u = new Array(o > 2 ? o - 2 : 0), d = 2; d < o; d++)
    u[d - 2] = arguments[d];
  for (let g = 0; g < t[r].length; g++) {
    const a = t[r][g];
    if (s = a(s, ...u), i && !s)
      break;
  }
  return s;
};
function Jn() {
  const t = /* @__PURE__ */ Object.create(null);
  let e = 0;
  function r(i) {
    const s = e++;
    return t[s] = i, function() {
      delete t[s];
    };
  }
  function n(i) {
    for (const s in t)
      t[s](i);
  }
  return {
    publish: n,
    subscribe: r
  };
}
const Yn = ["request", "response", "progress", "error", "abort"], Le = ["processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders"];
function lr(t, e) {
  const r = [], n = Le.reduce((s, o) => (s[o] = s[o] || [], s), {
    processOptions: [Wn],
    validateOptions: [Bn]
  });
  function i(s) {
    const o = Yn.reduce((C, m) => (C[m] = Jn(), C), {}), u = Gn(n), d = u("processOptions", s);
    u("validateOptions", d);
    const g = {
      options: d,
      channels: o,
      applyMiddleware: u
    };
    let a = null;
    const h = o.request.subscribe((C) => {
      a = e(C, (m, v) => w(m, v, C));
    });
    o.abort.subscribe(() => {
      h(), a && a.abort();
    });
    const y = u("onReturn", o, g);
    return y === o && o.request.publish(g), y;
    function w(C, m, v) {
      let E = C, k = m;
      if (!E)
        try {
          k = u("onResponse", m, v);
        } catch (T) {
          k = null, E = T;
        }
      E = E && u("onError", E, v), E ? o.error.publish(E) : k && o.response.publish(k);
    }
  }
  return i.use = function(o) {
    if (!o)
      throw new Error("Tried to add middleware that resolved to falsey value");
    if (typeof o == "function")
      throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
    if (o.onReturn && n.onReturn.length > 0)
      throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
    return Le.forEach((u) => {
      o[u] && n[u].push(o[u]);
    }), r.push(o), i;
  }, i.clone = function() {
    return lr(r, e);
  }, t.forEach(i.use), i;
}
var fr = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, U = (t, e, r) => (fr(t, e, "read from private field"), r ? r.call(t) : e.get(t)), wt = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, at = (t, e, r, n) => (fr(t, e, "write to private field"), e.set(t, r), r), $t, qt, ct, jt, z;
class Xn {
  constructor() {
    this.readyState = 0, this.responseType = "", wt(this, $t, undefined), wt(this, qt, undefined), wt(this, ct, undefined), wt(this, jt, {}), wt(this, z, undefined);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- _async is only declared for typings compatibility
  open(e, r, n) {
    at(this, $t, e), at(this, qt, r), at(this, ct, ""), this.readyState = 1, this.onreadystatechange(), at(this, z, undefined);
  }
  abort() {
    U(this, z) && U(this, z).abort();
  }
  getAllResponseHeaders() {
    return U(this, ct);
  }
  setRequestHeader(e, r) {
    U(this, jt)[e] = r;
  }
  send(e) {
    const r = this.responseType !== "arraybuffer", n = {
      method: U(this, $t),
      headers: U(this, jt),
      body: e
    };
    typeof AbortController == "function" && (at(this, z, new AbortController()), typeof EventTarget < "u" && U(this, z).signal instanceof EventTarget && (n.signal = U(this, z).signal)), typeof document < "u" && (n.credentials = this.withCredentials ? "include" : "omit"), fetch(U(this, qt), n).then((i) => (i.headers.forEach((s, o) => {
      at(this, ct, U(this, ct) + "".concat(o, ": ").concat(s, `\r
`));
    }), this.status = i.status, this.statusText = i.statusText, this.readyState = 3, r ? i.text() : i.arrayBuffer())).then((i) => {
      typeof i == "string" ? this.responseText = i : this.response = i, this.readyState = 4, this.onreadystatechange();
    }).catch((i) => {
      var s;
      if (i.name === "AbortError") {
        this.onabort();
        return;
      }
      (s = this.onerror) == null || s.call(this, i);
    });
  }
}
$t = /* @__PURE__ */ new WeakMap();
qt = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakMap();
jt = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
const Ce = typeof XMLHttpRequest == "function" ? "xhr" : "fetch", Kn = Ce === "xhr" ? XMLHttpRequest : Xn;
var Qn = (t, e) => {
  const r = t.options, n = t.applyMiddleware("finalizeOptions", r), i = {}, s = t.applyMiddleware("interceptRequest", undefined, {
    adapter: Ce,
    context: t
  });
  if (s) {
    const T = setTimeout(e, 0, null, s);
    return {
      abort: () => clearTimeout(T)
    };
  }
  let o = new Kn();
  const u = n.headers, d = n.timeout;
  let g = false, a = false, h = false;
  if (o.onerror = v, o.ontimeout = v, o.onabort = () => {
    m(true), g = true;
  }, o.onreadystatechange = () => {
    C(), !(g || o.readyState !== 4) && o.status !== 0 && k();
  }, o.open(
    n.method,
    n.url,
    true
    // Always async
  ), o.withCredentials = !!n.withCredentials, u && o.setRequestHeader)
    for (const T in u)
      u.hasOwnProperty(T) && o.setRequestHeader(T, u[T]);
  return n.rawBody && (o.responseType = "arraybuffer"), t.applyMiddleware("onRequest", {
    options: n,
    adapter: Ce,
    request: o,
    context: t
  }), o.send(n.body || null), d && (i.connect = setTimeout(() => w("ETIMEDOUT"), d.connect)), {
    abort: y
  };
  function y() {
    g = true, o && o.abort();
  }
  function w(T) {
    h = true, o.abort();
    const x = new Error(T === "ESOCKETTIMEDOUT" ? "Socket timed out on request to ".concat(n.url) : "Connection timed out on request to ".concat(n.url));
    x.code = T, t.channels.error.publish(x);
  }
  function C() {
    d && (m(), i.socket = setTimeout(() => w("ESOCKETTIMEDOUT"), d.socket));
  }
  function m(T) {
    (T || g || o.readyState >= 2 && i.connect) && clearTimeout(i.connect), i.socket && clearTimeout(i.socket);
  }
  function v(T) {
    if (a)
      return;
    m(true), a = true, o = null;
    const x = T || new Error("Network error while attempting to reach ".concat(n.url));
    x.isNetworkError = true, x.request = n, e(x);
  }
  function E() {
    return {
      body: o.response || (o.responseType === "" || o.responseType === "text" ? o.responseText : ""),
      url: n.url,
      method: n.method,
      headers: Vn(o.getAllResponseHeaders()),
      statusCode: o.status,
      statusMessage: o.statusText
    };
  }
  function k() {
    if (!(g || a || h)) {
      if (o.status === 0) {
        v(new Error("Unknown XHR error"));
        return;
      }
      m(), a = true, e(null, E());
    }
  }
};
const Zn = function() {
  let t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Qn;
  return lr(t, e);
};
var We = { exports: {} }, de, He;
function ti() {
  if (He)
    return de;
  He = 1;
  var t = 1e3, e = t * 60, r = e * 60, n = r * 24, i = n * 7, s = n * 365.25;
  de = function(a, h) {
    h = h || {};
    var y = typeof a;
    if (y === "string" && a.length > 0)
      return o(a);
    if (y === "number" && isFinite(a))
      return h.long ? d(a) : u(a);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
    );
  };
  function o(a) {
    if (a = String(a), !(a.length > 100)) {
      var h = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        a
      );
      if (h) {
        var y = parseFloat(h[1]), w = (h[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return y * s;
          case "weeks":
          case "week":
          case "w":
            return y * i;
          case "days":
          case "day":
          case "d":
            return y * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return y * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return y * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return y * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return y;
          default:
            return;
        }
      }
    }
  }
  function u(a) {
    var h = Math.abs(a);
    return h >= n ? Math.round(a / n) + "d" : h >= r ? Math.round(a / r) + "h" : h >= e ? Math.round(a / e) + "m" : h >= t ? Math.round(a / t) + "s" : a + "ms";
  }
  function d(a) {
    var h = Math.abs(a);
    return h >= n ? g(a, h, n, "day") : h >= r ? g(a, h, r, "hour") : h >= e ? g(a, h, e, "minute") : h >= t ? g(a, h, t, "second") : a + " ms";
  }
  function g(a, h, y, w) {
    var C = h >= y * 1.5;
    return Math.round(a / y) + " " + w + (C ? "s" : "");
  }
  return de;
}
function ei(t) {
  r.debug = r, r.default = r, r.coerce = d, r.disable = s, r.enable = i, r.enabled = o, r.humanize = ti(), r.destroy = g, Object.keys(t).forEach((a) => {
    r[a] = t[a];
  }), r.names = [], r.skips = [], r.formatters = {};
  function e(a) {
    let h = 0;
    for (let y = 0; y < a.length; y++)
      h = (h << 5) - h + a.charCodeAt(y), h |= 0;
    return r.colors[Math.abs(h) % r.colors.length];
  }
  r.selectColor = e;
  function r(a) {
    let h, y = null, w, C;
    function m(...v) {
      if (!m.enabled)
        return;
      const E = m, k = Number(/* @__PURE__ */ new Date()), T = k - (h || k);
      E.diff = T, E.prev = h, E.curr = k, h = k, v[0] = r.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
      let x = 0;
      v[0] = v[0].replace(/%([a-zA-Z%])/g, (B, G) => {
        if (B === "%%")
          return "%";
        x++;
        const st = r.formatters[G];
        if (typeof st == "function") {
          const ot = v[x];
          B = st.call(E, ot), v.splice(x, 1), x--;
        }
        return B;
      }), r.formatArgs.call(E, v), (E.log || r.log).apply(E, v);
    }
    return m.namespace = a, m.useColors = r.useColors(), m.color = r.selectColor(a), m.extend = n, m.destroy = r.destroy, Object.defineProperty(m, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => y !== null ? y : (w !== r.namespaces && (w = r.namespaces, C = r.enabled(a)), C),
      set: (v) => {
        y = v;
      }
    }), typeof r.init == "function" && r.init(m), m;
  }
  function n(a, h) {
    const y = r(this.namespace + (typeof h > "u" ? ":" : h) + a);
    return y.log = this.log, y;
  }
  function i(a) {
    r.save(a), r.namespaces = a, r.names = [], r.skips = [];
    let h;
    const y = (typeof a == "string" ? a : "").split(/[\s,]+/), w = y.length;
    for (h = 0; h < w; h++)
      y[h] && (a = y[h].replace(/\*/g, ".*?"), a[0] === "-" ? r.skips.push(new RegExp("^" + a.slice(1) + "$")) : r.names.push(new RegExp("^" + a + "$")));
  }
  function s() {
    const a = [
      ...r.names.map(u),
      ...r.skips.map(u).map((h) => "-" + h)
    ].join(",");
    return r.enable(""), a;
  }
  function o(a) {
    if (a[a.length - 1] === "*")
      return true;
    let h, y;
    for (h = 0, y = r.skips.length; h < y; h++)
      if (r.skips[h].test(a))
        return false;
    for (h = 0, y = r.names.length; h < y; h++)
      if (r.names[h].test(a))
        return true;
    return false;
  }
  function u(a) {
    return a.toString().substring(2, a.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function d(a) {
    return a instanceof Error ? a.stack || a.message : a;
  }
  function g() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return r.enable(r.load()), r;
}
var ri = ei;
(function(t, e) {
  e.formatArgs = n, e.save = i, e.load = s, e.useColors = r, e.storage = o(), e.destroy = (() => {
    let d = false;
    return () => {
      d || (d = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function r() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? true : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? false : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function n(d) {
    if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
      return;
    const g = "color: " + this.color;
    d.splice(1, 0, g, "color: inherit");
    let a = 0, h = 0;
    d[0].replace(/%[a-zA-Z%]/g, (y) => {
      y !== "%%" && (a++, y === "%c" && (h = a));
    }), d.splice(h, 0, g);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(d) {
    try {
      d ? e.storage.setItem("debug", d) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function s() {
    let d;
    try {
      d = e.storage.getItem("debug");
    } catch {
    }
    return !d && typeof process < "u" && "env" in process && (d = process.env.DEBUG), d;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  t.exports = ri(e);
  const { formatters: u } = t.exports;
  u.j = function(d) {
    try {
      return JSON.stringify(d);
    } catch (g) {
      return "[UnexpectedJSONParseError]: " + g.message;
    }
  };
})(We, We.exports);
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function Be(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function ni(t) {
  var e, r;
  return Be(t) === false ? false : (e = t.constructor, e === undefined ? true : (r = e.prototype, !(Be(r) === false || r.hasOwnProperty("isPrototypeOf") === false)));
}
const ii = typeof Buffer > "u" ? () => false : (t) => Buffer.isBuffer(t), si = ["boolean", "string", "number"];
function oi() {
  return {
    processOptions: (t) => {
      const e = t.body;
      return !e || !(!(typeof e.pipe == "function") && !ii(e) && (si.indexOf(typeof e) !== -1 || Array.isArray(e) || ni(e))) ? t : Object.assign({}, t, {
        body: JSON.stringify(t.body),
        headers: Object.assign({}, t.headers, {
          "Content-Type": "application/json"
        })
      });
    }
  };
}
function ai(t) {
  return {
    onResponse: (r) => {
      const n = r.headers["content-type"] || "", i = n.indexOf("application/json") !== -1;
      return !r.body || !n || !i ? r : Object.assign({}, r, {
        body: e(r.body)
      });
    },
    processOptions: (r) => Object.assign({}, r, {
      headers: Object.assign({
        Accept: "application/json"
      }, r.headers)
    })
  };
  function e(r) {
    try {
      return JSON.parse(r);
    } catch (n) {
      throw n.message = "Failed to parsed response body as JSON: ".concat(n.message), n;
    }
  }
}
let ut;
typeof globalThis < "u" ? ut = globalThis : typeof window < "u" ? ut = window : typeof global < "u" ? ut = global : typeof self < "u" ? ut = self : ut = {};
var ci = ut;
function ui() {
  const e = (arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}).implementation || ci.Observable;
  if (!e)
    throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  return {
    onReturn: (r, n) => new e((i) => (r.error.subscribe((s) => i.error(s)), r.progress.subscribe((s) => i.next(Object.assign({
      type: "progress"
    }, s))), r.response.subscribe((s) => {
      i.next(Object.assign({
        type: "response"
      }, s)), i.complete();
    }), r.request.publish(n), () => r.abort.publish()))
  };
}
function li() {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRequest: (t) => {
      if (t.adapter !== "xhr")
        return;
      const e = t.request, r = t.context;
      "upload" in e && "onprogress" in e.upload && (e.upload.onprogress = n("upload")), "onprogress" in e && (e.onprogress = n("download"));
      function n(i) {
        return (s) => {
          const o = s.lengthComputable ? s.loaded / s.total * 100 : -1;
          r.channels.progress.publish({
            stage: i,
            percent: o,
            total: s.total,
            loaded: s.loaded,
            lengthComputable: s.lengthComputable
          });
        };
      }
    }
  };
}
var _e = function(t, e) {
  return _e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, _e(t, e);
};
function xe(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  _e(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function ze(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
  if (r)
    return r.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && n >= t.length && (t = undefined), { value: t && t[n++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Jt(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r)
    return t;
  var n = r.call(t), i, s = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = n.next()).done; )
      s.push(i.value);
  } catch (u) {
    o = { error: u };
  } finally {
    try {
      i && !i.done && (r = n.return) && r.call(n);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return s;
}
function Yt(t, e, r) {
  if (arguments.length === 2)
    for (var n = 0, i = e.length, s; n < i; n++)
      (s || !(n in e)) && (s || (s = Array.prototype.slice.call(e, 0, n)), s[n] = e[n]);
  return t.concat(s || Array.prototype.slice.call(e));
}
function L(t) {
  return typeof t == "function";
}
function dr(t) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = t(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var pe = dr(function(t) {
  return function(r) {
    t(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, i) {
      return i + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Ne(t, e) {
  if (t) {
    var r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var Ie = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, r, n, i, s;
    if (!this.closed) {
      this.closed = true;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var u = ze(o), d = u.next(); !d.done; d = u.next()) {
              var g = d.value;
              g.remove(this);
            }
          } catch (m) {
            e = { error: m };
          } finally {
            try {
              d && !d.done && (r = u.return) && r.call(u);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          o.remove(this);
      var a = this.initialTeardown;
      if (L(a))
        try {
          a();
        } catch (m) {
          s = m instanceof pe ? m.errors : [m];
        }
      var h = this._finalizers;
      if (h) {
        this._finalizers = null;
        try {
          for (var y = ze(h), w = y.next(); !w.done; w = y.next()) {
            var C = w.value;
            try {
              Ve(C);
            } catch (m) {
              s = s ?? [], m instanceof pe ? s = Yt(Yt([], Jt(s)), Jt(m.errors)) : s.push(m);
            }
          }
        } catch (m) {
          n = { error: m };
        } finally {
          try {
            w && !w.done && (i = y.return) && i.call(y);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (s)
        throw new pe(s);
    }
  }, t.prototype.add = function(e) {
    var r;
    if (e && e !== this)
      if (this.closed)
        Ve(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== undefined ? r : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var r = this._parentage;
    return r === e || Array.isArray(r) && r.includes(e);
  }, t.prototype._addParent = function(e) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }, t.prototype._removeParent = function(e) {
    var r = this._parentage;
    r === e ? this._parentage = null : Array.isArray(r) && Ne(r, e);
  }, t.prototype.remove = function(e) {
    var r = this._finalizers;
    r && Ne(r, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = true, e;
  }(), t;
}();
Ie.EMPTY;
function pr(t) {
  return t instanceof Ie || t && "closed" in t && L(t.remove) && L(t.add) && L(t.unsubscribe);
}
function Ve(t) {
  L(t) ? t() : t.unsubscribe();
}
var gr = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
}, Oe = {
  setTimeout: function(t, e) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(undefined, Yt([t, e], Jt(r)));
  },
  clearTimeout: function(t) {
    return (clearTimeout)(t);
  },
  delegate: undefined
};
function di(t) {
  Oe.setTimeout(function() {
    throw t;
  });
}
function Ge() {
}
function pi(t) {
  t();
}
var Ae = function(t) {
  xe(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = false, r ? (n.destination = r, pr(r) && r.add(n)) : n.destination = vi, n;
  }
  return e.create = function(r, n, i) {
    return new Ee(r, n, i);
  }, e.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, e.prototype.error = function(r) {
    this.isStopped || (this.isStopped = true, this._error(r));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = true, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(r) {
    this.destination.next(r);
  }, e.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(Ie);
var yi = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(e);
      } catch (n) {
        Ft(n);
      }
  }, t.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(e);
      } catch (n) {
        Ft(n);
      }
    else
      Ft(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (r) {
        Ft(r);
      }
  }, t;
}(), Ee = function(t) {
  xe(e, t);
  function e(r, n, i) {
    var s = t.call(this) || this, o;
    if (L(r) || !r)
      o = {
        next: r ?? undefined,
        error: n ?? undefined,
        complete: i ?? undefined
      };
    else {
      o = r;
    }
    return s.destination = new yi(o), s;
  }
  return e;
}(Ae);
function Ft(t) {
  di(t);
}
function mi(t) {
  throw t;
}
var vi = {
  closed: true,
  next: Ge,
  error: mi,
  complete: Ge
}, wi = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function bi(t) {
  return t;
}
function Ci(t) {
  return t.length === 0 ? bi : t.length === 1 ? t[0] : function(r) {
    return t.reduce(function(n, i) {
      return i(n);
    }, r);
  };
}
var Tt = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var i = this, s = Oi(e) ? e : new Ee(e, r, n);
    return pi(function() {
      var o = i, u = o.operator, d = o.source;
      s.add(u ? u.call(s, d) : d ? i._subscribe(s) : i._trySubscribe(s));
    }), s;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, t.prototype.forEach = function(e, r) {
    var n = this;
    return r = Je(r), new r(function(i, s) {
      var o = new Ee({
        next: function(u) {
          try {
            e(u);
          } catch (d) {
            s(d), o.unsubscribe();
          }
        },
        error: s,
        complete: i
      });
      n.subscribe(o);
    });
  }, t.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === undefined ? undefined : r.subscribe(e);
  }, t.prototype[wi] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return Ci(e)(this);
  }, t.prototype.toPromise = function(e) {
    var r = this;
    return e = Je(e), new e(function(n, i) {
      var s;
      r.subscribe(function(o) {
        return s = o;
      }, function(o) {
        return i(o);
      }, function() {
        return n(s);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function Je(t) {
  var e;
  return (e = t ?? gr.Promise) !== null && e !== undefined ? e : Promise;
}
function _i(t) {
  return t && L(t.next) && L(t.error) && L(t.complete);
}
function Oi(t) {
  return t && t instanceof Ae || _i(t) && pr(t);
}
(function(t) {
  xe(e, t);
  function e(r, n, i, s, o, u) {
    var d = t.call(this, r) || this;
    return d.onFinalize = o, d.shouldUnsubscribe = u, d._next = n ? function(g) {
      try {
        n(g);
      } catch (a) {
        r.error(a);
      }
    } : t.prototype._next, d._error = s ? function(g) {
      try {
        s(g);
      } catch (a) {
        r.error(a);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._error, d._complete = i ? function() {
      try {
        i();
      } catch (g) {
        r.error(g);
      } finally {
        this.unsubscribe();
      }
    } : t.prototype._complete, d;
  }
  return e.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var n = this.closed;
      t.prototype.unsubscribe.call(this), !n && ((r = this.onFinalize) === null || r === undefined || r.call(this));
    }
  }, e;
})(Ae); dr(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
var Ti = [];
const ye = 5;
class xi extends Error {
  constructor(e) {
    const r = vr(e);
    super(r.message), this.statusCode = 400, Object.assign(this, r);
  }
}
class Ii extends Error {
  constructor(e) {
    const r = vr(e);
    super(r.message), this.statusCode = 500, Object.assign(this, r);
  }
}
function vr(t) {
  const e = t.body, r = {
    response: t,
    statusCode: t.statusCode,
    responseBody: Mi(e, t),
    message: "",
    details: undefined
  };
  if (e.error && e.message)
    return r.message = "".concat(e.error, " - ").concat(e.message), r;
  if (Ai(e)) {
    const n = e.error.items || [], i = n.slice(0, ye).map((o) => {
      var u;
      return (u = o.error) == null ? undefined : u.description;
    }).filter(Boolean);
    let s = i.length ? `:
- `.concat(i.join(`
- `)) : "";
    return n.length > ye && (s += `
...and `.concat(n.length - ye, " more")), r.message = "".concat(e.error.description).concat(s), r.details = e.error, r;
  }
  return e.error && e.error.description ? (r.message = e.error.description, r.details = e.error, r) : (r.message = e.error || e.message || Pi(t), r);
}
function Ai(t) {
  return Ye(t) && Ye(t.error) && t.error.type === "mutationError" && typeof t.error.description == "string";
}
function Ye(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
function Pi(t) {
  const e = t.statusMessage ? " ".concat(t.statusMessage) : "";
  return "".concat(t.method, "-request to ").concat(t.url, " resulted in HTTP ").concat(t.statusCode).concat(e);
}
function Mi(t, e) {
  return (e.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(t, null, 2) : t;
}
const Ri = {
  onResponse: (t) => {
    if (t.statusCode >= 500)
      throw new Ii(t);
    if (t.statusCode >= 400)
      throw new xi(t);
    return t;
  }
}, Fi = {
  onResponse: (t) => {
    const e = t.headers["x-sanity-warning"];
    return (Array.isArray(e) ? e : [e]).filter(Boolean).forEach((n) => console.warn(n)), t;
  }
};
function $i(t) {
  const e = Zn([...t, Fi, oi(), ai(), li(), Ri, ui({
    implementation: Tt
  })]);
  function r(n) {
    return (arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e)({
      maxRedirects: 0,
      ...n
    });
  }
  return r.defaultRequester = e, r;
}
$i(Ti);
var Os = function(e) {
  for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
    n[i - 1] = arguments[i];
  var s = e.length - 1;
  return e.slice(0, s).reduce(function(o, u, d) {
    return o + u + n[d];
  }, "") + e[s];
};
const xs = /* @__PURE__ */ Te(Os);
function Is() {
  return globalThis.sanityClient || console.error("Sanity client has not been initialized correctly"), globalThis.sanityClient;
}

const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const query = xs`*[_type == "sideBar"]{
  ...,
  sideMenus[]->
}`;
  const [sideBar] = await Is().fetch(query);
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 pointer-events-none" id="main-header" data-astro-cid-ssfzsv2f> <!-- Subtle Header Background Blur --> <div class="absolute inset-0 header-bg transition-all duration-700" data-astro-cid-ssfzsv2f></div> <nav class="w-full px-6 py-6 flex items-center justify-between transition-all duration-700 relative z-10 pointer-events-auto" id="nav-container" data-astro-cid-ssfzsv2f> <!-- LEFT: System Stats Node --> <div class="hidden lg:flex items-center gap-6 flex-1" data-astro-cid-ssfzsv2f> <a href="/" class="flex items-center gap-4 group" data-astro-cid-ssfzsv2f> <div class="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#599692] transition-colors overflow-hidden" data-astro-cid-ssfzsv2f> <span class="text-white font-black text-lg tracking-tighter relative z-10" data-astro-cid-ssfzsv2f>TP</span> </div> <p class="text-[10px] font-black text-white uppercase tracking-[0.4em] group-hover:text-[#599692] transition-colors" data-astro-cid-ssfzsv2f>Tanuj Pandey</p> </a> </div> <!-- CENTER: Floating Pill Navigation --> <div class="flex-none md:flex-1 flex justify-center order-1 md:order-none" data-astro-cid-ssfzsv2f> <div class="flex items-center gap-2 p-1 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full px-4 py-1.5" data-astro-cid-ssfzsv2f> ${sideBar?.sideMenus?.map((menuItem) => renderTemplate`<a${addAttribute(menuItem.menuLink.current, "href")} class="nav-link px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#626c7d] hover:text-white transition-all rounded-full relative group" data-astro-cid-ssfzsv2f> <span class="relative z-10" data-astro-cid-ssfzsv2f>${menuItem.menuName}</span> <div class="active-pill absolute inset-0 bg-[#599692]/10 rounded-full scale-0 transition-all duration-500 group-hover:scale-100" data-astro-cid-ssfzsv2f></div> </a>`)} <!-- Mobile Menu Trigger (Visible on mobile within the pill) --> <button id="mobile-trigger" class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group ml-2" data-astro-cid-ssfzsv2f> <div class="w-5 h-[1.5px] bg-[#599692] transition-all" id="bar-1" data-astro-cid-ssfzsv2f></div> <div class="w-5 h-[1.5px] bg-white transition-all" id="bar-2" data-astro-cid-ssfzsv2f></div> </button> </div> </div> <!-- RIGHT: Interface Meta --> </nav> <!-- Mobile Overlay --> <div id="mobile-overlay" class="fixed inset-0 bg-[#000105]/98 backdrop-blur-2xl z-40 hidden flex-col items-center justify-center pointer-events-auto" data-astro-cid-ssfzsv2f> <div class="space-y-12 text-center" data-astro-cid-ssfzsv2f> ${sideBar?.sideMenus?.map((menuItem, index) => renderTemplate`<a${addAttribute(menuItem.menuLink.current, "href")} class="mobile-nav-link block text-5xl font-black text-white uppercase tracking-tighter hover:text-[#599692] transition-all relative group"${addAttribute(`animation-delay: ${index * 0.1}s`, "style")} data-astro-cid-ssfzsv2f> ${menuItem.menuName} </a>`)} </div> <button id="close-overlay" class="mt-20 px-8 py-3 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white" data-astro-cid-ssfzsv2f>Terminate [ESC]</button> </div> </header>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Sidebar.astro", undefined);

function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "relative py-32 border-t border-white/5 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-16 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#599692]" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.5em] text-[#599692]", children: "Architecture" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none", children: [
            "Building the Future ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "One Bit at a Time." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#626c7d] text-lg max-w-md italic", children: '"Synthesizing complex engineering with immersive design to architect resilient digital ecosystems."' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Protocols" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/projects", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "Archive" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/blogs", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "Journal" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about", className: "text-sm text-[#626c7d] hover:text-[#599692] transition-colors", children: "Identity" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Frequency" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxs("a", { href: "https://github.com/TanujPandey09", target: "_blank", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaGithub, { size: 18 }),
                " GitHub"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://linkedin.com/in/tanujp09", target: "_blank", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaLinkedin, { size: 18 }),
                " LinkedIn"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "#", className: "text-sm text-[#626c7d] hover:text-white transition-colors flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaInstagram, { size: 18 }),
                " Instagram"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1 space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white uppercase tracking-[0.4em]", children: "Transmission" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#626c7d]", children: "tanujp09@gmail.com" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#626c7d]", children: "Delhi, India" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-black text-[#626c7d] uppercase tracking-widest", children: [
          "© ",
          currentYear,
          " Tanuj Pandey . All Systems Operational"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-white/20 uppercase tracking-[0.3em]", children: "Latency: 12ms" }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-[#599692] uppercase tracking-[0.3em]", children: "Status: encrypted" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 bg-[#599692]/5 rounded-full blur-[120px] pointer-events-none" })
  ] });
}

const $$Loader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="preloader" class="fixed inset-0 z-[1000] bg-[#000105] flex items-center justify-center overflow-hidden" data-astro-cid-4qws3apc> <div class="relative w-full max-w-md px-12 text-center" data-astro-cid-4qws3apc> <!-- Progress Tracking UI --> <div class="mb-8 flex justify-between items-end" data-astro-cid-4qws3apc> <div class="space-y-2 text-left" data-astro-cid-4qws3apc> <p class="text-[10px] font-black text-[#599692] uppercase tracking-[0.5em]" data-astro-cid-4qws3apc>System Boot</p> <p id="loader-percent" class="text-4xl font-black text-white tracking-tighter tabular-nums" data-astro-cid-4qws3apc>00%</p> </div> <div class="text-right" data-astro-cid-4qws3apc> <p class="text-[10px] font-black text-white/20 uppercase tracking-widest" data-astro-cid-4qws3apc>Initialization</p> <div id="loader-status" class="text-[10px] font-black text-[#626c7d] uppercase tracking-widest" data-astro-cid-4qws3apc>Analyzing Frequency...</div> </div> </div> <!-- Progress Bar --> <div class="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full" data-astro-cid-4qws3apc> <div id="progress-line" class="absolute top-0 left-0 h-full w-0 bg-[#599692] shadow-[0_0_15px_#599692]" data-astro-cid-4qws3apc></div> </div> <!-- Background Decoration --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full -z-10 animate-pulse" data-astro-cid-4qws3apc></div> </div> </div>  ${renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Loader.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/tanuj/astro-sanity-portfolio/src/components/Loader.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"><meta name="generator"', "><title>", "</title>", "</head> <body> ", " ", " ", " ", ' <div class="cursor"></div> <div class="cursor2"></div> <script src="https://unpkg.com/aos@next/dist/aos.js"><\/script> <script>\n      AOS.init();\n    <\/script> </body> </html>  ', ""])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "Loader", $$Loader, {}), renderComponent($$result, "Sidebar", $$Sidebar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/tanuj/astro-sanity-portfolio/src/components/Footer", "client:component-export": "default" }), renderScript($$result, "C:/Users/tanuj/astro-sanity-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/tanuj/astro-sanity-portfolio/src/layouts/Layout.astro", undefined);

export { $$Layout as $, Is as I, xs as x };
