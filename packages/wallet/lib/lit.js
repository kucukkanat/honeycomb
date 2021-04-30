// ../../node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
var i;
var s;
var e;
var o = globalThis.trustedTypes;
var l = o ? o.createPolicy("lit-html", {createHTML: (t3) => t3}) : void 0;
var n = `lit$${(Math.random() + "").slice(9)}$`;
var h = "?" + n;
var r = `<${h}>`;
var u = document;
var c = (t3 = "") => u.createComment(t3);
var d = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
var v = Array.isArray;
var a = (t3) => {
  var i4;
  return v(t3) || typeof ((i4 = t3) === null || i4 === void 0 ? void 0 : i4[Symbol.iterator]) == "function";
};
var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var $ = /'/g;
var g = /"/g;
var y = /^(?:script|style|textarea)$/i;
var b = (t3) => (i4, ...s5) => ({_$litType$: t3, strings: i4, values: s5});
var T = b(1);
var x = b(2);
var w = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var P = new WeakMap();
var V = (t3, i4, s5) => {
  var e4, o5;
  const l4 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i4;
  let n5 = l4._$litPart$;
  if (n5 === void 0) {
    const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
    l4._$litPart$ = n5 = new C(i4.insertBefore(c(), t4), t4, void 0, s5);
  }
  return n5.I(t3), n5;
};
var E = u.createTreeWalker(u, 129, null, false);
var M = (t3, i4) => {
  const s5 = t3.length - 1, e4 = [];
  let o5, h4 = i4 === 2 ? "<svg>" : "", u3 = f;
  for (let i5 = 0; i5 < s5; i5++) {
    const s6 = t3[i5];
    let l4, c4, d2 = -1, v2 = 0;
    for (; v2 < s6.length && (u3.lastIndex = v2, c4 = u3.exec(s6), c4 !== null); )
      v2 = u3.lastIndex, u3 === f ? c4[1] === "!--" ? u3 = _ : c4[1] !== void 0 ? u3 = m : c4[2] !== void 0 ? (y.test(c4[2]) && (o5 = RegExp("</" + c4[2], "g")), u3 = p) : c4[3] !== void 0 && (u3 = p) : u3 === p ? c4[0] === ">" ? (u3 = o5 != null ? o5 : f, d2 = -1) : c4[1] === void 0 ? d2 = -2 : (d2 = u3.lastIndex - c4[2].length, l4 = c4[1], u3 = c4[3] === void 0 ? p : c4[3] === '"' ? g : $) : u3 === g || u3 === $ ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, o5 = void 0);
    const a4 = u3 === p && t3[i5 + 1].startsWith("/>") ? " " : "";
    h4 += u3 === f ? s6 + r : d2 >= 0 ? (e4.push(l4), s6.slice(0, d2) + "$lit$" + s6.slice(d2) + n + a4) : s6 + n + (d2 === -2 ? (e4.push(void 0), i5) : a4);
  }
  const c3 = h4 + (t3[s5] || "<?>") + (i4 === 2 ? "</svg>" : "");
  return [l !== void 0 ? l.createHTML(c3) : c3, e4];
};
var N = class {
  constructor({strings: t3, _$litType$: i4}, s5) {
    let e4;
    this.parts = [];
    let l4 = 0, r4 = 0;
    const u3 = t3.length - 1, d2 = this.parts, [v2, a4] = M(t3, i4);
    if (this.el = N.createElement(v2, s5), E.currentNode = this.el.content, i4 === 2) {
      const t4 = this.el.content, i5 = t4.firstChild;
      i5.remove(), t4.append(...i5.childNodes);
    }
    for (; (e4 = E.nextNode()) !== null && d2.length < u3; ) {
      if (e4.nodeType === 1) {
        if (e4.hasAttributes()) {
          const t4 = [];
          for (const i5 of e4.getAttributeNames())
            if (i5.endsWith("$lit$") || i5.startsWith(n)) {
              const s6 = a4[r4++];
              if (t4.push(i5), s6 !== void 0) {
                const t5 = e4.getAttribute(s6.toLowerCase() + "$lit$").split(n), i6 = /([.?@])?(.*)/.exec(s6);
                d2.push({type: 1, index: l4, name: i6[2], strings: t5, ctor: i6[1] === "." ? I : i6[1] === "?" ? L : i6[1] === "@" ? R : H});
              } else
                d2.push({type: 6, index: l4});
            }
          for (const i5 of t4)
            e4.removeAttribute(i5);
        }
        if (y.test(e4.tagName)) {
          const t4 = e4.textContent.split(n), i5 = t4.length - 1;
          if (i5 > 0) {
            e4.textContent = o ? o.emptyScript : "";
            for (let s6 = 0; s6 < i5; s6++)
              e4.append(t4[s6], c()), E.nextNode(), d2.push({type: 2, index: ++l4});
            e4.append(t4[i5], c());
          }
        }
      } else if (e4.nodeType === 8)
        if (e4.data === h)
          d2.push({type: 2, index: l4});
        else {
          let t4 = -1;
          for (; (t4 = e4.data.indexOf(n, t4 + 1)) !== -1; )
            d2.push({type: 7, index: l4}), t4 += n.length - 1;
        }
      l4++;
    }
  }
  static createElement(t3, i4) {
    const s5 = u.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function S(t3, i4, s5 = t3, e4) {
  var o5, l4, n5, h4;
  if (i4 === w)
    return i4;
  let r4 = e4 !== void 0 ? (o5 = s5.\u03A3i) === null || o5 === void 0 ? void 0 : o5[e4] : s5.\u03A3o;
  const u3 = d(i4) ? void 0 : i4._$litDirective$;
  return (r4 == null ? void 0 : r4.constructor) !== u3 && ((l4 = r4 == null ? void 0 : r4.O) === null || l4 === void 0 || l4.call(r4, false), u3 === void 0 ? r4 = void 0 : (r4 = new u3(t3), r4.T(t3, s5, e4)), e4 !== void 0 ? ((n5 = (h4 = s5).\u03A3i) !== null && n5 !== void 0 ? n5 : h4.\u03A3i = [])[e4] = r4 : s5.\u03A3o = r4), r4 !== void 0 && (i4 = S(t3, r4.S(t3, i4.values), r4, e4)), i4;
}
var k = class {
  constructor(t3, i4) {
    this.l = [], this.N = void 0, this.D = t3, this.M = i4;
  }
  u(t3) {
    var i4;
    const {el: {content: s5}, parts: e4} = this.D, o5 = ((i4 = t3 == null ? void 0 : t3.creationScope) !== null && i4 !== void 0 ? i4 : u).importNode(s5, true);
    E.currentNode = o5;
    let l4 = E.nextNode(), n5 = 0, h4 = 0, r4 = e4[0];
    for (; r4 !== void 0; ) {
      if (n5 === r4.index) {
        let i5;
        r4.type === 2 ? i5 = new C(l4, l4.nextSibling, this, t3) : r4.type === 1 ? i5 = new r4.ctor(l4, r4.name, r4.strings, this, t3) : r4.type === 6 && (i5 = new z(l4, this, t3)), this.l.push(i5), r4 = e4[++h4];
      }
      n5 !== (r4 == null ? void 0 : r4.index) && (l4 = E.nextNode(), n5++);
    }
    return o5;
  }
  v(t3) {
    let i4 = 0;
    for (const s5 of this.l)
      s5 !== void 0 && (s5.strings !== void 0 ? (s5.I(t3, s5, i4), i4 += s5.strings.length - 2) : s5.I(t3[i4])), i4++;
  }
};
var C = class {
  constructor(t3, i4, s5, e4) {
    this.type = 2, this.N = void 0, this.A = t3, this.B = i4, this.M = s5, this.options = e4;
  }
  setConnected(t3) {
    var i4;
    (i4 = this.P) === null || i4 === void 0 || i4.call(this, t3);
  }
  get parentNode() {
    return this.A.parentNode;
  }
  get startNode() {
    return this.A;
  }
  get endNode() {
    return this.B;
  }
  I(t3, i4 = this) {
    t3 = S(this, t3, i4), d(t3) ? t3 === A || t3 == null || t3 === "" ? (this.H !== A && this.R(), this.H = A) : t3 !== this.H && t3 !== w && this.m(t3) : t3._$litType$ !== void 0 ? this._(t3) : t3.nodeType !== void 0 ? this.$(t3) : a(t3) ? this.g(t3) : this.m(t3);
  }
  k(t3, i4 = this.B) {
    return this.A.parentNode.insertBefore(t3, i4);
  }
  $(t3) {
    this.H !== t3 && (this.R(), this.H = this.k(t3));
  }
  m(t3) {
    const i4 = this.A.nextSibling;
    i4 !== null && i4.nodeType === 3 && (this.B === null ? i4.nextSibling === null : i4 === this.B.previousSibling) ? i4.data = t3 : this.$(u.createTextNode(t3)), this.H = t3;
  }
  _(t3) {
    var i4;
    const {values: s5, _$litType$: e4} = t3, o5 = typeof e4 == "number" ? this.C(t3) : (e4.el === void 0 && (e4.el = N.createElement(e4.h, this.options)), e4);
    if (((i4 = this.H) === null || i4 === void 0 ? void 0 : i4.D) === o5)
      this.H.v(s5);
    else {
      const t4 = new k(o5, this), i5 = t4.u(this.options);
      t4.v(s5), this.$(i5), this.H = t4;
    }
  }
  C(t3) {
    let i4 = P.get(t3.strings);
    return i4 === void 0 && P.set(t3.strings, i4 = new N(t3)), i4;
  }
  g(t3) {
    v(this.H) || (this.H = [], this.R());
    const i4 = this.H;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i4.length ? i4.push(s5 = new C(this.k(c()), this.k(c()), this, this.options)) : s5 = i4[e4], s5.I(o5), e4++;
    e4 < i4.length && (this.R(s5 && s5.B.nextSibling, e4), i4.length = e4);
  }
  R(t3 = this.A.nextSibling, i4) {
    var s5;
    for ((s5 = this.P) === null || s5 === void 0 || s5.call(this, false, true, i4); t3 && t3 !== this.B; ) {
      const i5 = t3.nextSibling;
      t3.remove(), t3 = i5;
    }
  }
};
var H = class {
  constructor(t3, i4, s5, e4, o5) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t3, this.name = i4, this.M = e4, this.options = o5, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this.H = Array(s5.length - 1).fill(A), this.strings = s5) : this.H = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  I(t3, i4 = this, s5, e4) {
    const o5 = this.strings;
    let l4 = false;
    if (o5 === void 0)
      t3 = S(this, t3, i4, 0), l4 = !d(t3) || t3 !== this.H && t3 !== w, l4 && (this.H = t3);
    else {
      const e5 = t3;
      let n5, h4;
      for (t3 = o5[0], n5 = 0; n5 < o5.length - 1; n5++)
        h4 = S(this, e5[s5 + n5], i4, n5), h4 === w && (h4 = this.H[n5]), l4 || (l4 = !d(h4) || h4 !== this.H[n5]), h4 === A ? t3 = A : t3 !== A && (t3 += (h4 != null ? h4 : "") + o5[n5 + 1]), this.H[n5] = h4;
    }
    l4 && !e4 && this.W(t3);
  }
  W(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  W(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  W(t3) {
    t3 && t3 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }
};
var R = class extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }
  I(t3, i4 = this) {
    var s5;
    if ((t3 = (s5 = S(this, t3, i4, 0)) !== null && s5 !== void 0 ? s5 : A) === w)
      return;
    const e4 = this.H, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, l4 = t3 !== A && (e4 === A || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), l4 && this.element.addEventListener(this.name, this, t3), this.H = t3;
  }
  handleEvent(t3) {
    var i4, s5;
    typeof this.H == "function" ? this.H.call((s5 = (i4 = this.options) === null || i4 === void 0 ? void 0 : i4.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this.H.handleEvent(t3);
  }
};
var z = class {
  constructor(t3, i4, s5) {
    this.element = t3, this.type = 6, this.N = void 0, this.V = void 0, this.M = i4, this.options = s5;
  }
  I(t3) {
    S(this, t3);
  }
};
var Z = {Z: "$lit$", U: n, Y: h, q: 1, X: M, tt: k, it: a, st: S, et: C, ot: H, nt: L, rt: R, lt: I, ht: z};
(i = (t = globalThis).litHtmlPlatformSupport) === null || i === void 0 || i.call(t, N, C), ((s = (e = globalThis).litHtmlVersions) !== null && s !== void 0 ? s : e.litHtmlVersions = []).push("2.0.0-rc.2");

// ../../node_modules/@lit/reactive-element/css-tag.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e2 = Symbol();
var n2 = class {
  constructor(t3, n5) {
    if (n5 !== e2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    return t2 && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }
  toString() {
    return this.cssText;
  }
};
var s2 = (t3) => new n2(t3 + "", e2);
var o2 = new Map();
var r2 = (t3, ...s5) => {
  const r4 = s5.reduce((e4, s6, o5) => e4 + ((t4) => {
    if (t4 instanceof n2)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error(`Value passed to 'css' function must be a 'css' function result: ${t4}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  })(s6) + t3[o5 + 1], t3[0]);
  let i4 = o2.get(r4);
  return i4 === void 0 && o2.set(r4, i4 = new n2(r4, e2)), i4;
};
var i2 = (e4, n5) => {
  t2 ? e4.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((t3) => {
    const n6 = document.createElement("style");
    n6.textContent = t3.cssText, e4.appendChild(n6);
  });
};
var S2 = t2 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const n5 of t4.cssRules)
    e4 += n5.cssText;
  return s2(e4);
})(t3) : t3;

// ../../node_modules/@lit/reactive-element/reactive-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s3;
var e3;
var h2;
var r3;
var o3 = {toAttribute(t3, i4) {
  switch (i4) {
    case Boolean:
      t3 = t3 ? "" : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i4) {
  let s5 = t3;
  switch (i4) {
    case Boolean:
      s5 = t3 !== null;
      break;
    case Number:
      s5 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
}};
var n3 = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
var l2 = {attribute: true, type: String, converter: o3, reflect: false, hasChanged: n3};
var a2 = class extends HTMLElement {
  constructor() {
    super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
  }
  static addInitializer(t3) {
    var i4;
    (i4 = this.v) !== null && i4 !== void 0 || (this.v = []), this.v.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i4, s5) => {
      const e4 = this.\u03A0p(s5, i4);
      e4 !== void 0 && (this.\u03A0m.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i4 = l2) {
    if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i4);
      e4 !== void 0 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i4, s5) {
    return {get() {
      return this[i4];
    }, set(e4) {
      const h4 = this[t3];
      this[i4] = e4, this.requestUpdate(t3, h4, s5);
    }, configurable: true, enumerable: true};
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i4)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i4) {
    const s5 = [];
    if (Array.isArray(i4)) {
      const e4 = new Set(i4.flat(1 / 0).reverse());
      for (const i5 of e4)
        s5.unshift(S2(i5));
    } else
      i4 !== void 0 && s5.push(S2(i4));
    return s5;
  }
  static \u03A0p(t3, i4) {
    const s5 = i4.attribute;
    return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this.\u03A0g = new Promise((t4) => this.enableUpdating = t4), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t3 = this.constructor.v) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i4, s5;
    ((i4 = this.\u03A0U) !== null && i4 !== void 0 ? i4 : this.\u03A0U = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
  }
  removeController(t3) {
    var i4;
    (i4 = this.\u03A0U) === null || i4 === void 0 || i4.splice(this.\u03A0U.indexOf(t3) >>> 0, 1);
  }
  \u03A0_() {
    this.constructor.elementProperties.forEach((t3, i4) => {
      this.hasOwnProperty(i4) && (this.\u03A0i.set(i4, this[i4]), delete this[i4]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostConnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
      var i4;
      return (i4 = t4.hostDisconnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
    }), this.\u03A0o = new Promise((t4) => this.\u03A0l = t4);
  }
  attributeChangedCallback(t3, i4, s5) {
    this.K(t3, s5);
  }
  \u03A0j(t3, i4, s5 = l2) {
    var e4, h4;
    const r4 = this.constructor.\u03A0p(t3, s5);
    if (r4 !== void 0 && s5.reflect === true) {
      const n5 = ((h4 = (e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== null && h4 !== void 0 ? h4 : o3.toAttribute)(i4, s5.type);
      this.\u03A0h = t3, n5 == null ? this.removeAttribute(r4) : this.setAttribute(r4, n5), this.\u03A0h = null;
    }
  }
  K(t3, i4) {
    var s5, e4, h4;
    const r4 = this.constructor, n5 = r4.\u03A0m.get(t3);
    if (n5 !== void 0 && this.\u03A0h !== n5) {
      const t4 = r4.getPropertyOptions(n5), l4 = t4.converter, a4 = (h4 = (e4 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e4 !== void 0 ? e4 : typeof l4 == "function" ? l4 : null) !== null && h4 !== void 0 ? h4 : o3.fromAttribute;
      this.\u03A0h = n5, this[n5] = a4(i4, t4.type), this.\u03A0h = null;
    }
  }
  requestUpdate(t3, i4, s5) {
    let e4 = true;
    t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n3)(this[t3], i4) ? (this.L.has(t3) || this.L.set(t3, i4), s5.reflect === true && this.\u03A0h !== t3 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this.\u03A0g = this.\u03A0q());
  }
  async \u03A0q() {
    this.isUpdatePending = true;
    try {
      for (await this.\u03A0g; this.\u03A0o; )
        await this.\u03A0o;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.performUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((t4, i5) => this[i5] = t4), this.\u03A0i = void 0);
    let i4 = false;
    const s5 = this.L;
    try {
      i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
        var i5;
        return (i5 = t4.hostUpdate) === null || i5 === void 0 ? void 0 : i5.call(t4);
      }), this.update(s5)) : this.\u03A0$();
    } catch (t4) {
      throw i4 = false, this.\u03A0$(), t4;
    }
    i4 && this.E(s5);
  }
  willUpdate(t3) {
  }
  E(t3) {
    var i4;
    (i4 = this.\u03A0U) === null || i4 === void 0 || i4.forEach((t4) => {
      var i5;
      return (i5 = t4.hostUpdated) === null || i5 === void 0 ? void 0 : i5.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  \u03A0$() {
    this.L = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.\u03A0g;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this.\u03A0k !== void 0 && (this.\u03A0k.forEach((t4, i4) => this.\u03A0j(i4, this[i4], t4)), this.\u03A0k = void 0), this.\u03A0$();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
a2.finalized = true, a2.shadowRootOptions = {mode: "open"}, (e3 = (s3 = globalThis).reactiveElementPlatformSupport) === null || e3 === void 0 || e3.call(s3, {ReactiveElement: a2}), ((h2 = (r3 = globalThis).reactiveElementVersions) !== null && h2 !== void 0 ? h2 : r3.reactiveElementVersions = []).push("1.0.0-rc.1");

// ../../node_modules/lit-element/lit-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i3;
var l3;
var o4;
var s4;
var n4;
var a3;
var c2 = a2;
((i3 = (a3 = globalThis).litElementVersions) !== null && i3 !== void 0 ? i3 : a3.litElementVersions = []).push("3.0.0-rc.1");
var h3 = class extends a2 {
  constructor() {
    super(...arguments), this.renderOptions = {host: this}, this.\u03A6t = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const r4 = super.createRenderRoot();
    return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = r4.firstChild), r4;
  }
  update(t3) {
    const r4 = this.render();
    super.update(t3), this.\u03A6t = V(r4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return w;
  }
};
h3.finalized = true, h3._$litElement$ = true, (o4 = (l3 = globalThis).litElementHydrateSupport) === null || o4 === void 0 || o4.call(l3, {LitElement: h3}), (n4 = (s4 = globalThis).litElementPlatformSupport) === null || n4 === void 0 || n4.call(s4, {LitElement: h3});
var u2 = {K: (t3, e4, r4) => {
  t3.K(e4, r4);
}, L: (t3) => t3.L};
export {
  n2 as CSSResult,
  h3 as LitElement,
  a2 as ReactiveElement,
  c2 as UpdatingElement,
  Z as _\u03A3,
  u2 as _\u03A6,
  i2 as adoptStyles,
  r2 as css,
  o3 as defaultConverter,
  S2 as getCompatibleStyle,
  T as html,
  w as noChange,
  n3 as notEqual,
  A as nothing,
  V as render,
  t2 as supportsAdoptingStyleSheets,
  x as svg,
  s2 as unsafeCSS
};
