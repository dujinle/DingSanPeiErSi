require = function s(r, a, c) {
function h(i, t) {
if (!a[i]) {
if (!r[i]) {
var e = "function" == typeof require && require;
if (!t && e) return e(i, !0);
if (l) return l(i, !0);
var n = new Error("Cannot find module '" + i + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
var o = a[i] = {
exports: {}
};
r[i][0].call(o.exports, function(t) {
var e = r[i][1][t];
return h(e || t);
}, o, o.exports, s, r, a, c);
}
return a[i].exports;
}
for (var l = "function" == typeof require && require, t = 0; t < c.length; t++) h(c[t]);
return h;
}({
Consts: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "f7df7UuIW9LuovhAmnpX4Kz", "Consts");
cc._RF.pop();
}, {} ],
1: [ function(t, e, i) {
"use strict";
i.byteLength = function(t) {
return 3 * t.length / 4 - p(t);
};
i.toByteArray = function(t) {
var e, i, n, o, s, r = t.length;
o = p(t);
s = new l(3 * r / 4 - o);
i = 0 < o ? r - 4 : r;
var a = 0;
for (e = 0; e < i; e += 4) {
n = c[t.charCodeAt(e)] << 18 | c[t.charCodeAt(e + 1)] << 12 | c[t.charCodeAt(e + 2)] << 6 | c[t.charCodeAt(e + 3)];
s[a++] = n >> 16 & 255;
s[a++] = n >> 8 & 255;
s[a++] = 255 & n;
}
if (2 === o) {
n = c[t.charCodeAt(e)] << 2 | c[t.charCodeAt(e + 1)] >> 4;
s[a++] = 255 & n;
} else if (1 === o) {
n = c[t.charCodeAt(e)] << 10 | c[t.charCodeAt(e + 1)] << 4 | c[t.charCodeAt(e + 2)] >> 2;
s[a++] = n >> 8 & 255;
s[a++] = 255 & n;
}
return s;
};
i.fromByteArray = function(t) {
for (var e, i = t.length, n = i % 3, o = "", s = [], r = 16383, a = 0, c = i - n; a < c; a += r) s.push(u(t, a, c < a + r ? c : a + r));
if (1 === n) {
e = t[i - 1];
o += h[e >> 2];
o += h[e << 4 & 63];
o += "==";
} else if (2 === n) {
e = (t[i - 2] << 8) + t[i - 1];
o += h[e >> 10];
o += h[e >> 4 & 63];
o += h[e << 2 & 63];
o += "=";
}
s.push(o);
return s.join("");
};
for (var h = [], c = [], l = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, s = n.length; o < s; ++o) {
h[o] = n[o];
c[n.charCodeAt(o)] = o;
}
c["-".charCodeAt(0)] = 62;
c["_".charCodeAt(0)] = 63;
function p(t) {
var e = t.length;
if (0 < e % 4) throw new Error("Invalid string. Length must be a multiple of 4");
return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0;
}
function u(t, e, i) {
for (var n, o, s = [], r = e; r < i; r += 3) {
n = (t[r] << 16 & 16711680) + (t[r + 1] << 8 & 65280) + (255 & t[r + 2]);
s.push(h[(o = n) >> 18 & 63] + h[o >> 12 & 63] + h[o >> 6 & 63] + h[63 & o]);
}
return s.join("");
}
}, {} ],
2: [ function(e, t, I) {
(function(t) {
"use strict";
var n = e("base64-js"), s = e("ieee754"), r = e("isarray");
I.Buffer = p;
I.SlowBuffer = function(t) {
+t != t && (t = 0);
return p.alloc(+t);
};
I.INSPECT_MAX_BYTES = 50;
p.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
try {
var t = new Uint8Array(1);
t.__proto__ = {
__proto__: Uint8Array.prototype,
foo: function() {
return 42;
}
};
return 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
} catch (t) {
return !1;
}
}();
I.kMaxLength = i();
function i() {
return p.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function a(t, e) {
if (i() < e) throw new RangeError("Invalid typed array length");
if (p.TYPED_ARRAY_SUPPORT) (t = new Uint8Array(e)).__proto__ = p.prototype; else {
null === t && (t = new p(e));
t.length = e;
}
return t;
}
function p(t, e, i) {
if (!(p.TYPED_ARRAY_SUPPORT || this instanceof p)) return new p(t, e, i);
if ("number" == typeof t) {
if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
return h(this, t);
}
return o(this, t, e, i);
}
p.poolSize = 8192;
p._augment = function(t) {
t.__proto__ = p.prototype;
return t;
};
function o(t, e, i, n) {
if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, i, n) {
e.byteLength;
if (i < 0 || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
if (e.byteLength < i + (n || 0)) throw new RangeError("'length' is out of bounds");
e = void 0 === i && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, i) : new Uint8Array(e, i, n);
p.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = p.prototype : t = l(t, e);
return t;
}(t, e, i, n) : "string" == typeof e ? function(t, e, i) {
"string" == typeof i && "" !== i || (i = "utf8");
if (!p.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
var n = 0 | _(e, i), o = (t = a(t, n)).write(e, i);
o !== n && (t = t.slice(0, o));
return t;
}(t, e, i) : function(t, e) {
if (p.isBuffer(e)) {
var i = 0 | u(e.length);
if (0 === (t = a(t, i)).length) return t;
e.copy(t, 0, 0, i);
return t;
}
if (e) {
if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? a(t, 0) : l(t, e);
if ("Buffer" === e.type && r(e.data)) return l(t, e.data);
}
var n;
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}(t, e);
}
p.from = function(t, e, i) {
return o(null, t, e, i);
};
if (p.TYPED_ARRAY_SUPPORT) {
p.prototype.__proto__ = Uint8Array.prototype;
p.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && p[Symbol.species] === p && Object.defineProperty(p, Symbol.species, {
value: null,
configurable: !0
});
}
function c(t) {
if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
if (t < 0) throw new RangeError('"size" argument must not be negative');
}
p.alloc = function(t, e, i) {
return function(t, e, i, n) {
c(e);
return e <= 0 ? a(t, e) : void 0 !== i ? "string" == typeof n ? a(t, e).fill(i, n) : a(t, e).fill(i) : a(t, e);
}(null, t, e, i);
};
function h(t, e) {
c(e);
t = a(t, e < 0 ? 0 : 0 | u(e));
if (!p.TYPED_ARRAY_SUPPORT) for (var i = 0; i < e; ++i) t[i] = 0;
return t;
}
p.allocUnsafe = function(t) {
return h(null, t);
};
p.allocUnsafeSlow = function(t) {
return h(null, t);
};
function l(t, e) {
var i = e.length < 0 ? 0 : 0 | u(e.length);
t = a(t, i);
for (var n = 0; n < i; n += 1) t[n] = 255 & e[n];
return t;
}
function u(t) {
if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
return 0 | t;
}
p.isBuffer = function(t) {
return !(null == t || !t._isBuffer);
};
p.compare = function(t, e) {
if (!p.isBuffer(t) || !p.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
if (t === e) return 0;
for (var i = t.length, n = e.length, o = 0, s = Math.min(i, n); o < s; ++o) if (t[o] !== e[o]) {
i = t[o];
n = e[o];
break;
}
return i < n ? -1 : n < i ? 1 : 0;
};
p.isEncoding = function(t) {
switch (String(t).toLowerCase()) {
case "hex":
case "utf8":
case "utf-8":
case "ascii":
case "latin1":
case "binary":
case "base64":
case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return !0;

default:
return !1;
}
};
p.concat = function(t, e) {
if (!r(t)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === t.length) return p.alloc(0);
var i;
if (void 0 === e) for (i = e = 0; i < t.length; ++i) e += t[i].length;
var n = p.allocUnsafe(e), o = 0;
for (i = 0; i < t.length; ++i) {
var s = t[i];
if (!p.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
s.copy(n, o);
o += s.length;
}
return n;
};
function _(t, e) {
if (p.isBuffer(t)) return t.length;
if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
"string" != typeof t && (t = "" + t);
var i = t.length;
if (0 === i) return 0;
for (var n = !1; ;) switch (e) {
case "ascii":
case "latin1":
case "binary":
return i;

case "utf8":
case "utf-8":
case void 0:
return F(t).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * i;

case "hex":
return i >>> 1;

case "base64":
return O(t).length;

default:
if (n) return F(t).length;
e = ("" + e).toLowerCase();
n = !0;
}
}
p.byteLength = _;
p.prototype._isBuffer = !0;
function g(t, e, i) {
var n = t[e];
t[e] = t[i];
t[i] = n;
}
p.prototype.swap16 = function() {
var t = this.length;
if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var e = 0; e < t; e += 2) g(this, e, e + 1);
return this;
};
p.prototype.swap32 = function() {
var t = this.length;
if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var e = 0; e < t; e += 4) {
g(this, e, e + 3);
g(this, e + 1, e + 2);
}
return this;
};
p.prototype.swap64 = function() {
var t = this.length;
if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
for (var e = 0; e < t; e += 8) {
g(this, e, e + 7);
g(this, e + 1, e + 6);
g(this, e + 2, e + 5);
g(this, e + 3, e + 4);
}
return this;
};
p.prototype.toString = function() {
var t = 0 | this.length;
return 0 === t ? "" : 0 === arguments.length ? b(this, 0, t) : function(t, e, i) {
var n = !1;
(void 0 === e || e < 0) && (e = 0);
if (e > this.length) return "";
(void 0 === i || i > this.length) && (i = this.length);
if (i <= 0) return "";
if ((i >>>= 0) <= (e >>>= 0)) return "";
t || (t = "utf8");
for (;;) switch (t) {
case "hex":
return k(this, e, i);

case "utf8":
case "utf-8":
return b(this, e, i);

case "ascii":
return C(this, e, i);

case "latin1":
case "binary":
return S(this, e, i);

case "base64":
return v(this, e, i);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return P(this, e, i);

default:
if (n) throw new TypeError("Unknown encoding: " + t);
t = (t + "").toLowerCase();
n = !0;
}
}.apply(this, arguments);
};
p.prototype.equals = function(t) {
if (!p.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
return this === t || 0 === p.compare(this, t);
};
p.prototype.inspect = function() {
var t = "", e = I.INSPECT_MAX_BYTES;
if (0 < this.length) {
t = this.toString("hex", 0, e).match(/.{2}/g).join(" ");
this.length > e && (t += " ... ");
}
return "<Buffer " + t + ">";
};
p.prototype.compare = function(t, e, i, n, o) {
if (!p.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
void 0 === e && (e = 0);
void 0 === i && (i = t ? t.length : 0);
void 0 === n && (n = 0);
void 0 === o && (o = this.length);
if (e < 0 || i > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
if (o <= n && i <= e) return 0;
if (o <= n) return -1;
if (i <= e) return 1;
if (this === t) return 0;
for (var s = (o >>>= 0) - (n >>>= 0), r = (i >>>= 0) - (e >>>= 0), a = Math.min(s, r), c = this.slice(n, o), h = t.slice(e, i), l = 0; l < a; ++l) if (c[l] !== h[l]) {
s = c[l];
r = h[l];
break;
}
return s < r ? -1 : r < s ? 1 : 0;
};
function d(t, e, i, n, o) {
if (0 === t.length) return -1;
if ("string" == typeof i) {
n = i;
i = 0;
} else 2147483647 < i ? i = 2147483647 : i < -2147483648 && (i = -2147483648);
i = +i;
isNaN(i) && (i = o ? 0 : t.length - 1);
i < 0 && (i = t.length + i);
if (i >= t.length) {
if (o) return -1;
i = t.length - 1;
} else if (i < 0) {
if (!o) return -1;
i = 0;
}
"string" == typeof e && (e = p.from(e, n));
if (p.isBuffer(e)) return 0 === e.length ? -1 : f(t, e, i, n, o);
if ("number" == typeof e) {
e &= 255;
return p.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : f(t, [ e ], i, n, o);
}
throw new TypeError("val must be string, number or Buffer");
}
function f(t, e, i, n, o) {
var s, r = 1, a = t.length, c = e.length;
if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
if (t.length < 2 || e.length < 2) return -1;
a /= r = 2;
c /= 2;
i /= 2;
}
function h(t, e) {
return 1 === r ? t[e] : t.readUInt16BE(e * r);
}
if (o) {
var l = -1;
for (s = i; s < a; s++) if (h(t, s) === h(e, -1 === l ? 0 : s - l)) {
-1 === l && (l = s);
if (s - l + 1 === c) return l * r;
} else {
-1 !== l && (s -= s - l);
l = -1;
}
} else {
a < i + c && (i = a - c);
for (s = i; 0 <= s; s--) {
for (var p = !0, u = 0; u < c; u++) if (h(t, s + u) !== h(e, u)) {
p = !1;
break;
}
if (p) return s;
}
}
return -1;
}
p.prototype.includes = function(t, e, i) {
return -1 !== this.indexOf(t, e, i);
};
p.prototype.indexOf = function(t, e, i) {
return d(this, t, e, i, !0);
};
p.prototype.lastIndexOf = function(t, e, i) {
return d(this, t, e, i, !1);
};
function m(t, e, i, n) {
i = Number(i) || 0;
var o = t.length - i;
n ? o < (n = Number(n)) && (n = o) : n = o;
var s = e.length;
if (s % 2 != 0) throw new TypeError("Invalid hex string");
s / 2 < n && (n = s / 2);
for (var r = 0; r < n; ++r) {
var a = parseInt(e.substr(2 * r, 2), 16);
if (isNaN(a)) return r;
t[i + r] = a;
}
return r;
}
function y(t, e, i, n) {
return Y(function(t) {
for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
return e;
}(e), t, i, n);
}
p.prototype.write = function(t, e, i, n) {
if (void 0 === e) {
n = "utf8";
i = this.length;
e = 0;
} else if (void 0 === i && "string" == typeof e) {
n = e;
i = this.length;
e = 0;
} else {
if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
e |= 0;
if (isFinite(i)) {
i |= 0;
void 0 === n && (n = "utf8");
} else {
n = i;
i = void 0;
}
}
var o = this.length - e;
(void 0 === i || o < i) && (i = o);
if (0 < t.length && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
n || (n = "utf8");
for (var s, r, a, c, h, l, p, u, _, g = !1; ;) switch (n) {
case "hex":
return m(this, t, e, i);

case "utf8":
case "utf-8":
return u = e, _ = i, Y(F(t, (p = this).length - u), p, u, _);

case "ascii":
return y(this, t, e, i);

case "latin1":
case "binary":
return y(this, t, e, i);

case "base64":
return c = this, h = e, l = i, Y(O(t), c, h, l);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return r = e, a = i, Y(function(t, e) {
for (var i, n, o, s = [], r = 0; r < t.length && !((e -= 2) < 0); ++r) {
i = t.charCodeAt(r);
n = i >> 8;
o = i % 256;
s.push(o);
s.push(n);
}
return s;
}(t, (s = this).length - r), s, r, a);

default:
if (g) throw new TypeError("Unknown encoding: " + n);
n = ("" + n).toLowerCase();
g = !0;
}
};
p.prototype.toJSON = function() {
return {
type: "Buffer",
data: Array.prototype.slice.call(this._arr || this, 0)
};
};
function v(t, e, i) {
return 0 === e && i === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, i));
}
function b(t, e, i) {
i = Math.min(t.length, i);
for (var n = [], o = e; o < i; ) {
var s = t[o], r = null, a = 239 < s ? 4 : 223 < s ? 3 : 191 < s ? 2 : 1;
if (o + a <= i) {
var c, h, l, p;
switch (a) {
case 1:
s < 128 && (r = s);
break;

case 2:
128 == (192 & (c = t[o + 1])) && 127 < (p = (31 & s) << 6 | 63 & c) && (r = p);
break;

case 3:
c = t[o + 1];
h = t[o + 2];
128 == (192 & c) && 128 == (192 & h) && 2047 < (p = (15 & s) << 12 | (63 & c) << 6 | 63 & h) && (p < 55296 || 57343 < p) && (r = p);
break;

case 4:
c = t[o + 1];
h = t[o + 2];
l = t[o + 3];
128 == (192 & c) && 128 == (192 & h) && 128 == (192 & l) && 65535 < (p = (15 & s) << 18 | (63 & c) << 12 | (63 & h) << 6 | 63 & l) && p < 1114112 && (r = p);
}
}
if (null === r) {
r = 65533;
a = 1;
} else if (65535 < r) {
r -= 65536;
n.push(r >>> 10 & 1023 | 55296);
r = 56320 | 1023 & r;
}
n.push(r);
o += a;
}
return function(t) {
var e = t.length;
if (e <= w) return String.fromCharCode.apply(String, t);
var i = "", n = 0;
for (;n < e; ) i += String.fromCharCode.apply(String, t.slice(n, n += w));
return i;
}(n);
}
var w = 4096;
function C(t, e, i) {
var n = "";
i = Math.min(t.length, i);
for (var o = e; o < i; ++o) n += String.fromCharCode(127 & t[o]);
return n;
}
function S(t, e, i) {
var n = "";
i = Math.min(t.length, i);
for (var o = e; o < i; ++o) n += String.fromCharCode(t[o]);
return n;
}
function k(t, e, i) {
var n = t.length;
(!e || e < 0) && (e = 0);
(!i || i < 0 || n < i) && (i = n);
for (var o = "", s = e; s < i; ++s) o += z(t[s]);
return o;
}
function P(t, e, i) {
for (var n = t.slice(e, i), o = "", s = 0; s < n.length; s += 2) o += String.fromCharCode(n[s] + 256 * n[s + 1]);
return o;
}
p.prototype.slice = function(t, e) {
var i, n = this.length;
(t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n);
(e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n);
e < t && (e = t);
if (p.TYPED_ARRAY_SUPPORT) (i = this.subarray(t, e)).__proto__ = p.prototype; else {
var o = e - t;
i = new p(o, void 0);
for (var s = 0; s < o; ++s) i[s] = this[s + t];
}
return i;
};
function E(t, e, i) {
if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
if (i < t + e) throw new RangeError("Trying to access beyond buffer length");
}
p.prototype.readUIntLE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) n += this[t + s] * o;
return n;
};
p.prototype.readUIntBE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t + --e], o = 1; 0 < e && (o *= 256); ) n += this[t + --e] * o;
return n;
};
p.prototype.readUInt8 = function(t, e) {
e || E(t, 1, this.length);
return this[t];
};
p.prototype.readUInt16LE = function(t, e) {
e || E(t, 2, this.length);
return this[t] | this[t + 1] << 8;
};
p.prototype.readUInt16BE = function(t, e) {
e || E(t, 2, this.length);
return this[t] << 8 | this[t + 1];
};
p.prototype.readUInt32LE = function(t, e) {
e || E(t, 4, this.length);
return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
};
p.prototype.readUInt32BE = function(t, e) {
e || E(t, 4, this.length);
return 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
};
p.prototype.readIntLE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) n += this[t + s] * o;
(o *= 128) <= n && (n -= Math.pow(2, 8 * e));
return n;
};
p.prototype.readIntBE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = e, o = 1, s = this[t + --n]; 0 < n && (o *= 256); ) s += this[t + --n] * o;
(o *= 128) <= s && (s -= Math.pow(2, 8 * e));
return s;
};
p.prototype.readInt8 = function(t, e) {
e || E(t, 1, this.length);
return 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
};
p.prototype.readInt16LE = function(t, e) {
e || E(t, 2, this.length);
var i = this[t] | this[t + 1] << 8;
return 32768 & i ? 4294901760 | i : i;
};
p.prototype.readInt16BE = function(t, e) {
e || E(t, 2, this.length);
var i = this[t + 1] | this[t] << 8;
return 32768 & i ? 4294901760 | i : i;
};
p.prototype.readInt32LE = function(t, e) {
e || E(t, 4, this.length);
return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
};
p.prototype.readInt32BE = function(t, e) {
e || E(t, 4, this.length);
return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
};
p.prototype.readFloatLE = function(t, e) {
e || E(t, 4, this.length);
return s.read(this, t, !0, 23, 4);
};
p.prototype.readFloatBE = function(t, e) {
e || E(t, 4, this.length);
return s.read(this, t, !1, 23, 4);
};
p.prototype.readDoubleLE = function(t, e) {
e || E(t, 8, this.length);
return s.read(this, t, !0, 52, 8);
};
p.prototype.readDoubleBE = function(t, e) {
e || E(t, 8, this.length);
return s.read(this, t, !1, 52, 8);
};
function T(t, e, i, n, o, s) {
if (!p.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (o < e || e < s) throw new RangeError('"value" argument is out of bounds');
if (i + n > t.length) throw new RangeError("Index out of range");
}
p.prototype.writeUIntLE = function(t, e, i, n) {
t = +t;
e |= 0;
i |= 0;
if (!n) {
T(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
}
var o = 1, s = 0;
this[e] = 255 & t;
for (;++s < i && (o *= 256); ) this[e + s] = t / o & 255;
return e + i;
};
p.prototype.writeUIntBE = function(t, e, i, n) {
t = +t;
e |= 0;
i |= 0;
if (!n) {
T(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
}
var o = i - 1, s = 1;
this[e + o] = 255 & t;
for (;0 <= --o && (s *= 256); ) this[e + o] = t / s & 255;
return e + i;
};
p.prototype.writeUInt8 = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 1, 255, 0);
p.TYPED_ARRAY_SUPPORT || (t = Math.floor(t));
this[e] = 255 & t;
return e + 1;
};
function R(t, e, i, n) {
e < 0 && (e = 65535 + e + 1);
for (var o = 0, s = Math.min(t.length - i, 2); o < s; ++o) t[i + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
}
p.prototype.writeUInt16LE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 2, 65535, 0);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
} else R(this, t, e, !0);
return e + 2;
};
p.prototype.writeUInt16BE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 2, 65535, 0);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 8;
this[e + 1] = 255 & t;
} else R(this, t, e, !1);
return e + 2;
};
function L(t, e, i, n) {
e < 0 && (e = 4294967295 + e + 1);
for (var o = 0, s = Math.min(t.length - i, 4); o < s; ++o) t[i + o] = e >>> 8 * (n ? o : 3 - o) & 255;
}
p.prototype.writeUInt32LE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 4, 4294967295, 0);
if (p.TYPED_ARRAY_SUPPORT) {
this[e + 3] = t >>> 24;
this[e + 2] = t >>> 16;
this[e + 1] = t >>> 8;
this[e] = 255 & t;
} else L(this, t, e, !0);
return e + 4;
};
p.prototype.writeUInt32BE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 4, 4294967295, 0);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 24;
this[e + 1] = t >>> 16;
this[e + 2] = t >>> 8;
this[e + 3] = 255 & t;
} else L(this, t, e, !1);
return e + 4;
};
p.prototype.writeIntLE = function(t, e, i, n) {
t = +t;
e |= 0;
if (!n) {
var o = Math.pow(2, 8 * i - 1);
T(this, t, e, i, o - 1, -o);
}
var s = 0, r = 1, a = 0;
this[e] = 255 & t;
for (;++s < i && (r *= 256); ) {
t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1);
this[e + s] = (t / r >> 0) - a & 255;
}
return e + i;
};
p.prototype.writeIntBE = function(t, e, i, n) {
t = +t;
e |= 0;
if (!n) {
var o = Math.pow(2, 8 * i - 1);
T(this, t, e, i, o - 1, -o);
}
var s = i - 1, r = 1, a = 0;
this[e + s] = 255 & t;
for (;0 <= --s && (r *= 256); ) {
t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1);
this[e + s] = (t / r >> 0) - a & 255;
}
return e + i;
};
p.prototype.writeInt8 = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 1, 127, -128);
p.TYPED_ARRAY_SUPPORT || (t = Math.floor(t));
t < 0 && (t = 255 + t + 1);
this[e] = 255 & t;
return e + 1;
};
p.prototype.writeInt16LE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 2, 32767, -32768);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
} else R(this, t, e, !0);
return e + 2;
};
p.prototype.writeInt16BE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 2, 32767, -32768);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 8;
this[e + 1] = 255 & t;
} else R(this, t, e, !1);
return e + 2;
};
p.prototype.writeInt32LE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 4, 2147483647, -2147483648);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
this[e + 2] = t >>> 16;
this[e + 3] = t >>> 24;
} else L(this, t, e, !0);
return e + 4;
};
p.prototype.writeInt32BE = function(t, e, i) {
t = +t;
e |= 0;
i || T(this, t, e, 4, 2147483647, -2147483648);
t < 0 && (t = 4294967295 + t + 1);
if (p.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 24;
this[e + 1] = t >>> 16;
this[e + 2] = t >>> 8;
this[e + 3] = 255 & t;
} else L(this, t, e, !1);
return e + 4;
};
function N(t, e, i, n, o, s) {
if (i + n > t.length) throw new RangeError("Index out of range");
if (i < 0) throw new RangeError("Index out of range");
}
function A(t, e, i, n, o) {
o || N(t, 0, i, 4);
s.write(t, e, i, n, 23, 4);
return i + 4;
}
p.prototype.writeFloatLE = function(t, e, i) {
return A(this, t, e, !0, i);
};
p.prototype.writeFloatBE = function(t, e, i) {
return A(this, t, e, !1, i);
};
function x(t, e, i, n, o) {
o || N(t, 0, i, 8);
s.write(t, e, i, n, 52, 8);
return i + 8;
}
p.prototype.writeDoubleLE = function(t, e, i) {
return x(this, t, e, !0, i);
};
p.prototype.writeDoubleBE = function(t, e, i) {
return x(this, t, e, !1, i);
};
p.prototype.copy = function(t, e, i, n) {
i || (i = 0);
n || 0 === n || (n = this.length);
e >= t.length && (e = t.length);
e || (e = 0);
0 < n && n < i && (n = i);
if (n === i) return 0;
if (0 === t.length || 0 === this.length) return 0;
if (e < 0) throw new RangeError("targetStart out of bounds");
if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
if (n < 0) throw new RangeError("sourceEnd out of bounds");
n > this.length && (n = this.length);
t.length - e < n - i && (n = t.length - e + i);
var o, s = n - i;
if (this === t && i < e && e < n) for (o = s - 1; 0 <= o; --o) t[o + e] = this[o + i]; else if (s < 1e3 || !p.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) t[o + e] = this[o + i]; else Uint8Array.prototype.set.call(t, this.subarray(i, i + s), e);
return s;
};
p.prototype.fill = function(t, e, i, n) {
if ("string" == typeof t) {
if ("string" == typeof e) {
n = e;
e = 0;
i = this.length;
} else if ("string" == typeof i) {
n = i;
i = this.length;
}
if (1 === t.length) {
var o = t.charCodeAt(0);
o < 256 && (t = o);
}
if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
if ("string" == typeof n && !p.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
} else "number" == typeof t && (t &= 255);
if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
if (i <= e) return this;
e >>>= 0;
i = void 0 === i ? this.length : i >>> 0;
t || (t = 0);
var s;
if ("number" == typeof t) for (s = e; s < i; ++s) this[s] = t; else {
var r = p.isBuffer(t) ? t : F(new p(t, n).toString()), a = r.length;
for (s = 0; s < i - e; ++s) this[s + e] = r[s % a];
}
return this;
};
var B = /[^+\/0-9A-Za-z-_]/g;
function z(t) {
return t < 16 ? "0" + t.toString(16) : t.toString(16);
}
function F(t, e) {
e = e || Infinity;
for (var i, n = t.length, o = null, s = [], r = 0; r < n; ++r) {
if (55295 < (i = t.charCodeAt(r)) && i < 57344) {
if (!o) {
if (56319 < i) {
-1 < (e -= 3) && s.push(239, 191, 189);
continue;
}
if (r + 1 === n) {
-1 < (e -= 3) && s.push(239, 191, 189);
continue;
}
o = i;
continue;
}
if (i < 56320) {
-1 < (e -= 3) && s.push(239, 191, 189);
o = i;
continue;
}
i = 65536 + (o - 55296 << 10 | i - 56320);
} else o && -1 < (e -= 3) && s.push(239, 191, 189);
o = null;
if (i < 128) {
if ((e -= 1) < 0) break;
s.push(i);
} else if (i < 2048) {
if ((e -= 2) < 0) break;
s.push(i >> 6 | 192, 63 & i | 128);
} else if (i < 65536) {
if ((e -= 3) < 0) break;
s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128);
} else {
if (!(i < 1114112)) throw new Error("Invalid code point");
if ((e -= 4) < 0) break;
s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128);
}
}
return s;
}
function O(t) {
return n.toByteArray(function(t) {
var e;
if ((t = (e = t, e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(B, "")).length < 2) return "";
for (;t.length % 4 != 0; ) t += "=";
return t;
}(t));
}
function Y(t, e, i, n) {
for (var o = 0; o < n && !(o + i >= e.length || o >= t.length); ++o) e[o + i] = t[o];
return o;
}
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
"base64-js": 1,
ieee754: 4,
isarray: 3
} ],
3: [ function(t, e, i) {
var n = {}.toString;
e.exports = Array.isArray || function(t) {
return "[object Array]" == n.call(t);
};
}, {} ],
4: [ function(t, e, i) {
i.read = function(t, e, i, n, o) {
var s, r, a = 8 * o - n - 1, c = (1 << a) - 1, h = c >> 1, l = -7, p = i ? o - 1 : 0, u = i ? -1 : 1, _ = t[e + p];
p += u;
s = _ & (1 << -l) - 1;
_ >>= -l;
l += a;
for (;0 < l; s = 256 * s + t[e + p], p += u, l -= 8) ;
r = s & (1 << -l) - 1;
s >>= -l;
l += n;
for (;0 < l; r = 256 * r + t[e + p], p += u, l -= 8) ;
if (0 === s) s = 1 - h; else {
if (s === c) return r ? NaN : Infinity * (_ ? -1 : 1);
r += Math.pow(2, n);
s -= h;
}
return (_ ? -1 : 1) * r * Math.pow(2, s - n);
};
i.write = function(t, e, i, n, o, s) {
var r, a, c, h = 8 * s - o - 1, l = (1 << h) - 1, p = l >> 1, u = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _ = n ? 0 : s - 1, g = n ? 1 : -1, d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
e = Math.abs(e);
if (isNaN(e) || Infinity === e) {
a = isNaN(e) ? 1 : 0;
r = l;
} else {
r = Math.floor(Math.log(e) / Math.LN2);
if (e * (c = Math.pow(2, -r)) < 1) {
r--;
c *= 2;
}
if (2 <= (e += 1 <= r + p ? u / c : u * Math.pow(2, 1 - p)) * c) {
r++;
c /= 2;
}
if (l <= r + p) {
a = 0;
r = l;
} else if (1 <= r + p) {
a = (e * c - 1) * Math.pow(2, o);
r += p;
} else {
a = e * Math.pow(2, p - 1) * Math.pow(2, o);
r = 0;
}
}
for (;8 <= o; t[i + _] = 255 & a, _ += g, a /= 256, o -= 8) ;
r = r << o | a;
h += o;
for (;0 < h; t[i + _] = 255 & r, _ += g, r /= 256, h -= 8) ;
t[i + _ - g] |= 128 * d;
};
}, {} ],
LoadGame: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "0c295vrLU5GMYLULq/2SF+x", "LoadGame");
cc.Class({
extends: cc.Component,
properties: {
loadBar: cc.ProgressBar,
precent: cc.Label,
rate: 0,
source_leng: 83
},
onLoad: function() {
this.source_leng = 83;
this.load_res();
this.schedule(this.load_update, .5);
},
load_update: function() {
this.loadBar.progress = this.rate / this.source_leng * 100;
this.precent.string = this.loadBar.progress + "%";
cc.log("this.rate:" + this.rate);
if (this.rate >= this.source_leng) {
this.unschedule(this.load_update);
cc.director.loadScene("LoginScene");
}
},
load_res: function() {
var n = this;
cc.loader.loadResDir("", cc.SpriteFrame, function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
n.rate = n.rate + 1;
cc.log("load res :" + e[i].name);
}
});
cc.loader.loadResDir("prefab", function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
n.rate = n.rate + 1;
cc.log("load res :" + e[i].name);
}
});
}
});
cc._RF.pop();
}, {} ],
Login: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "6a0a37wcANEsZIkorqukZR4", "Login");
cc.Class({
extends: cc.Component,
properties: {
version_label: cc.Node,
login_flag: !1,
login_type: null
},
onLogin: function() {
cc.director.getVisibleSize();
},
saveUserInfo: function(t) {
g_user = t.initdata.player;
Storage.setPhoneNumber(g_user.phone_num);
Storage.setPassword(g_user.password);
Storage.setLoginType(this.login_type);
Storage.setAutoLoginFlag(this.auto_login);
Storage.setPasswordFlag(this.retain_pwd);
console.log("start saveUserInfo......" + JSON.stringify(g_user));
cc.director.loadScene("MainScene");
},
wxLogin: function() {
cc.log("wxLogin");
this.login_flag = !0;
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loginByWeiXin", "(I)V", 123456);
},
onLoad: function() {
this.login_type = Storage.getLoginType();
"weixin" == this.login_type && this.onLogin();
}
});
cc._RF.pop();
}, {} ],
MainScene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1670aKLL5hOAIWk8H6TNuBZ", "MainScene");
cc.Class({
extends: cc.Component,
properties: {
user_info: cc.Node,
username_label: cc.Label,
fangka_label: cc.Label,
sex_sprite: cc.Sprite
},
onLoad: function() {
cc.log("on load main scene.....");
this.node.on("pressed", this.buy_fangka_scene, this);
this.username_label.string = g_user.nickName;
this.fangka_label.string = g_user.fangka;
1 == g_user.gender && (this.sex_sprite.spriteFrame = g_assets.gender1);
cc.loader.loadResDir("", cc.SpriteFrame, function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
cc.log("load res :" + e[i].name);
}
});
cc.loader.loadResDir("prefab", function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
cc.log("load res :" + e[i].name);
}
});
},
popUserLayer: function() {
cc.log("start init pop user layer info");
var t = cc.director.getWinSize();
this.user_layer = cc.instantiate(g_assets.pop_userinfo);
var e = this.user_layer.getComponent("popUserLayer");
this.node.addChild(this.user_layer);
this.user_layer.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
e.show();
},
buy_fangka_scene: function() {
var t = cc.director.getWinSize();
this.pop_buyfangka = cc.instantiate(g_assets.PopBuyFangKaScene);
this.pop_buyfangka.getComponent("buy_fangka").init(g_buy_fangka_data);
this.node.addChild(this.pop_buyfangka);
this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
},
store_scene: function() {
cc.director.loadScene("StoreScene");
},
feed_back_scene: function() {
cc.director.loadScene("FeedBack");
},
exit: function() {
cc.director.end();
}
});
cc._RF.pop();
}, {} ],
Register: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ddc3f+ssUBG6qFL1qdnuKXW", "Register");
cc.Class({
extends: cc.Component,
properties: {
phone_box: cc.Node,
name_box: cc.Node,
qianming_box: cc.Node,
pwd_box: cc.Node,
repwd_box: cc.Node,
ptip_label: cc.Label,
nick_label: cc.Label,
pwd_label: cc.Label,
rtip_label: cc.Label,
rbutton: cc.Button,
sex_nan: cc.Node,
sex_nv: cc.Node,
phone_num: null,
nick_name: null,
sign_text: null,
sex_type: null,
password: null,
repwd: null
},
onLoad: function() {
this.node.on("pressed", this.switchRadio, this);
this.sex_nan.active = !0;
this.sex_type = 1;
this.sex_nv.active = !1;
},
input_phone_begin: function() {
this.ptip_label.string = "";
},
input_phone_end: function() {
var e = this;
e.phone_num = e.phone_box.getComponent(cc.EditBox).string;
Servers.getIsPhone(e.phone_num, function(t) {
e.ptip_label.string = t.msg;
200 == t.code && (e.rbutton.getComponent(cc.Button).interactable = !0);
});
},
input_name_begin: function() {
this.nick_label.string = "";
},
input_name_end: function() {
this.nick_name = this.name_box.getComponent(cc.EditBox).string;
},
input_qianming_begin: function() {},
input_qianming_end: function() {
this.sign_text = this.qianming_box.getComponent(cc.EditBox).string;
},
input_pwd_begin: function() {
this.pwd_label.string = "";
},
input_pwd_end: function() {
this.password = this.pwd_box.getComponent(cc.EditBox).string;
},
input_rpwd_begin: function() {
this.rtip_label.string = "";
},
input_rpwd_end: function() {
this.repwd = this.repwd_box.getComponent(cc.EditBox).string;
if (this.password != this.repwd) {
this.rtip_label.string = "密码不匹配";
this.rbutton.getComponent(cc.Button).interactable = !1;
} else this.rbutton.getComponent(cc.Button).interactable = !0;
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
if (0 == e) {
this.sex_nan.active = !0;
this.sex_nv.active = !1;
this.sex_type = 1;
} else if (1 == e) {
this.sex_nan.active = !1;
this.sex_nv.active = !0;
this.sex_type = 0;
}
},
onRegister: function() {
var i = this, n = cc.director.getVisibleSize();
null != this.phone_num && "" != this.phone_num ? null != this.nick_name && "" != this.nick_name ? null != this.password && "" != this.password ? null != this.repwd && "" != this.repwd ? Servers.getRegister(this.phone_num, this.nick_name, this.password, this.sign_text, this.sex_type, function(t) {
util.show_error_info(i, n, t.msg);
if (200 == t.code) {
var e = cc.callFunc(i.intoHail, i);
i.node.runAction(cc.sequence(new cc.DelayTime(2.5), e));
}
}) : this.rtip_label.string = "密码输入不正确" : this.pwd_label.string = "密码不能为空" : this.nick_label.string = "昵称不能为空" : this.ptip_label.string = "手机号不能为空";
},
intoHail: function() {
cc.director.loadScene("LoginScene");
}
});
cc._RF.pop();
}, {} ],
add_chip: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "c0fa5ATHo9G0KE9WhBUPxdm", "add_chip");
cc.Class({
extends: cc.Component,
properties: {
silder_num1: 0,
silder_num2: 0,
callback: null,
pthis: null
},
onLoad: function() {
cc.log("start go into pop add chip js");
},
init_callback: function(t, e) {
this.pthis = t;
this.callback = e;
},
silder1_callback: function(t, e) {
this.silder_num1 = t.progress;
cc.log("silder1:" + this.silder_num1);
this.callback(this.pthis, 1, this.silder_num1);
},
silder2_callback: function(t, e) {
this.silder_num2 = t.progress;
cc.log("silder1:" + this.silder_num2);
this.callback(this.pthis, 2, this.silder_num2);
}
});
cc._RF.pop();
}, {} ],
bipai_choice: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "dd767pT3yVM6IqdabBmQWEl", "bipai_choice");
cc.Class({
extends: cc.Component,
properties: {
index: 0,
type: 0
},
onLoad: function() {
cc.log("go into bipai choice");
var e = this;
this.node.on("touchstart", function(t) {
e.node.dispatchEvent(new cc.Event.EventCustom("pressed", !0));
}, e);
},
start: function() {
var t = cc.scaleTo(.5, .5, .5), e = cc.scaleTo(.5, 2, 2), i = cc.sequence(t, e), n = cc.repeatForever(i);
this.node.runAction(n);
cc.log("baipai choice index:", this.node.getSiblingIndex());
},
init: function(t, e) {
this.index = t;
this.type = e;
}
});
cc._RF.pop();
}, {} ],
buy_fangka: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "f17ad/xS8pCFYLrpj3LLpjZ", "buy_fangka");
cc.Class({
extends: cc.Component,
properties: {
fangka_num: 0,
danjia: 2,
zongjia: 0,
game_sprite: cc.Node,
tip_label: cc.Label,
num_label: cc.Node,
danjia_label: cc.Label,
zongjia_label: cc.Label
},
onLoad: function() {
cc.log("on load store buy");
var r = this;
this.node.on("pressed", this.switchRadio, this);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, this.game_sprite);
this.init({
danjia: 2
});
},
init: function(t) {
this.danjia = t.danjia;
this.danjia_label.string = this.danjia + "元";
this.zongjia = this.danjia * this.fangka_num;
this.zongjia_label.string = this.zongjia + "元";
},
onEditDidBegan: function(t, e) {},
onEditDidEnded: function(t, e) {
this.fangka_num = t.string;
this.zongjia = this.danjia * this.fangka_num;
this.zongjia_label.string = this.zongjia + "元";
cc.log("fangka_num:" + this.fangka_num);
},
onTextChanged: function(t, e, i) {
this.fangka_num = e.string;
this.zongjia = this.danjia * this.fangka_num;
this.zongjia_label.string = this.zongjia + "元";
cc.log("fangka_num:" + this.fangka_num);
},
onEditingReturn: function(t, e) {},
switchRadio: function() {
this.fangka_num = parseInt(this.fangka_num) + 1;
this.num_label.getComponent("cc.EditBox").string = this.fangka_num;
this.zongjia = this.danjia * this.fangka_num;
this.zongjia_label.string = this.zongjia + "元";
}
});
cc._RF.pop();
}, {} ],
count_timer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "537707dxNpO1q1HV1x0DYFo", "count_timer");
cc.Class({
extends: cc.Component,
properties: {
progress_bar_top: cc.ProgressBar,
progress_bar_boom: cc.ProgressBar,
top_precent: 0,
boom_precent: 0,
pid: 0,
sumTime: 3
},
onLoad: function() {
cc.log("load counter time progress", this.sumTime);
this.sumTime = 3;
this.progress_bar_top.progress = 0;
this.progress_bar_boom.progress = 0;
this.top_precent = 0;
this.boom_precent = 0;
cc.log(this.progress_bar_top.progress, this.progress_bar_boom.progress);
},
start_timer: function() {
cc.log("start timer .......", this.sumTime);
cc.log("start timer .......", this.progress_bar_top.progress, this.progress_bar_boom.progress);
this.progress_bar_top.progress = 0;
this.progress_bar_boom.progress = 0;
this.top_precent = 0;
this.boom_precent = 0;
this.schedule(this.progress_bar, .1);
},
progress_bar: function() {
cc.log("top_precent:" + this.top_precent + " boom_precent" + this.boom_precent);
cc.log("top:" + this.progress_bar_top.progress + " boom:" + this.progress_bar_boom.progress);
if (this.progress_bar_boom.progress <= 1) {
this.boom_precent = this.boom_precent + .2;
this.progress_bar_boom.progress = this.boom_precent / this.sumTime;
} else if (this.progress_bar_top.progress <= 1) {
this.top_precent = this.top_precent + .2;
this.progress_bar_top.progress = this.top_precent / this.sumTime;
} else this.unschedule(this.progress_bar);
},
stop_timer: function() {
this.unschedule(this.progress_bar);
this.progress_bar_top.progress = 0;
this.progress_bar_boom.progress = 0;
this.top_precent = 0;
this.boom_precent = 0;
}
});
cc._RF.pop();
}, {} ],
emitter: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1ded2p7ha9L/pDpK5QJ45i4", "emitter");
e.exports = n;
function n(t) {
if (t) return function(t) {
for (var e in n.prototype) t[e] = n.prototype[e];
return t;
}(t);
}
(window.EventEmitter = n).prototype.on = n.prototype.addEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
(this._callbacks[t] = this._callbacks[t] || []).push(e);
return this;
};
n.prototype.once = function(t, e) {
var i = this;
this._callbacks = this._callbacks || {};
function n() {
i.off(t, n);
e.apply(this, arguments);
}
n.fn = e;
this.on(t, n);
return this;
};
n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
if (0 == arguments.length) {
this._callbacks = {};
return this;
}
var i, n = this._callbacks[t];
if (!n) return this;
if (1 == arguments.length) {
delete this._callbacks[t];
return this;
}
for (var o = 0; o < n.length; o++) if ((i = n[o]) === e || i.fn === e) {
n.splice(o, 1);
break;
}
return this;
};
n.prototype.emit = function(t) {
this._callbacks = this._callbacks || {};
var e = [].slice.call(arguments, 1), i = this._callbacks[t];
if (i) for (var n = 0, o = (i = i.slice(0)).length; n < o; ++n) i[n].apply(this, e);
return this;
};
n.prototype.listeners = function(t) {
this._callbacks = this._callbacks || {};
return this._callbacks[t] || [];
};
n.prototype.hasListeners = function(t) {
return !!this.listeners(t).length;
};
cc._RF.pop();
}, {} ],
enter_game_scene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "80075bAHldNQrIGuxPiNse3", "enter_game_scene");
cc.Class({
extends: cc.Component,
properties: {
create_game_sprite: cc.Node,
enter_game_sprite: cc.Node,
back: cc.Node
},
onLoad: function() {
cc.log("load enter game scene js");
},
hide: function() {
cc.log("start go into enter game scene hide");
this.create_game_sprite.getComponent(cc.Button).interactable = !1;
this.enter_game_sprite.getComponent(cc.Button).interactable = !1;
this.back.getComponent(cc.Button).interactable = !1;
this.node.active = !1;
},
show: function() {
cc.log("start go into enter game scene show");
this.create_game_sprite.getComponent(cc.Button).interactable = !0;
this.enter_game_sprite.getComponent(cc.Button).interactable = !0;
this.back.getComponent(cc.Button).interactable = !0;
this.node.active = !0;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
feed_back: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ede636Du+lBKJm56kdUAjk9", "feed_back");
cc.Class({
extends: cc.Component,
properties: {
edit_box: cc.EditBox,
bg_sprite: cc.Node,
title: null,
tid: 0,
text_info: null,
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
this.tid = 0;
this.title = "意见";
this.node.on("pressed", this.switchRadio, this);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
cc.rectContainsPoint(s, n) ? cc.log("ok touch in the region......") : cc.log("touch remove from parent");
}
}, this.bg_sprite);
},
edit_start: function() {
cc.log("start:" + this.edit_box.string);
},
edit_change: function() {
cc.log("change:" + this.edit_box.string);
},
edit_end: function() {
cc.log("end:" + this.edit_box.string);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_radios.length; n++) {
var o = this.choice_radios[n].getComponent("one_choice");
if (o.index == e) {
0 == (this.tid = e) ? this.title = "意见" : 1 == e ? this.title = "Bug" : 2 == e ? this.title = "体验" : 3 == e && (this.title = "其他");
o.pitchOn();
} else o.lifeUp();
}
cc.log("title : " + this.title + " tid:" + this.tid);
},
button_ok: function() {
var e = this, i = cc.director.getVisibleSize();
0 < this.edit_box.string.length ? Servers.feedback(g_user.playerId, "all", this.edit_box.string, function(t) {
cc.log(t);
200 != t.code ? util.show_error_info(e, i, "信息提交失败") : util.show_error_info(e, i, "信息提交成功");
}) : util.show_error_info(e, i, "没有输入内容");
},
button_close: function() {
this.node.active = !1;
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
game_player_item: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "0ac50C0VvpHK7fELCHsSS37", "game_player_item");
cc.Class({
extends: cc.Component,
properties: {
player_name: cc.Label,
start_gold: cc.Label,
end_gold: cc.Label,
diff_gold: cc.Label
},
onLoad: function() {},
set_player_info: function(t) {
cc.log(JSON.stringify(t));
this.player_name.string = t[0];
this.start_gold.string = t[1];
this.end_gold.string = t[2];
this.diff_gold.string = t[3];
}
});
cc._RF.pop();
}, {} ],
game_scene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "8d4afA99/1CSJlZKjH1aVWl", "game_scene");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
cc.log("load game scene js");
this.zjh_sprite = this.node.getChildByName("ZJH_sprite");
this.tdk_sprite = this.node.getChildByName("TDK_sprite");
this.zhq_sprite = this.node.getChildByName("ZHQ_sprite");
},
hide: function() {
cc.log("start go into game scene hide");
this.zjh_sprite.getComponent(cc.Button).interactable = !1;
this.tdk_sprite.getComponent(cc.Button).interactable = !1;
this.zhq_sprite.getComponent(cc.Button).interactable = !1;
this.node.active = !1;
},
show: function() {
cc.log("start go into game scene show");
this.zjh_sprite.getComponent(cc.Button).interactable = !0;
this.tdk_sprite.getComponent(cc.Button).interactable = !0;
this.zhq_sprite.getComponent(cc.Button).interactable = !0;
this.node.active = !0;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
main_store: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e85ccytqq1ALolP5oCKCRxN", "main_store");
cc.Class({
extends: cc.Component,
properties: {
buy_scene: cc.Node
},
onLoad: function() {
this.index_arr = [ "购买房卡", "购买钻石", "包月", "包年" ];
this.node.on("pressed", this.switchRadio, this);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
var n = this.buy_scene.getComponent("store_buy"), o = new Array();
o.push(this.index_arr[i]);
o.push(e);
o.push(i);
n.show_buy_scene(o);
},
call_back: function() {
cc.director.loadScene("MainScene");
}
});
cc._RF.pop();
}, {} ],
msage_scroll: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b13ed8BnidJ64JY/eb8+mGs", "msage_scroll");
cc.Class({
extends: cc.Component,
properties: {
scroll_label: cc.Label,
scroll_parent: cc.Node
},
onLoad: function() {},
set_string: function(t) {
this.scroll_label.node.active = !1;
this.scroll_label.node.stopAllActions();
this.scroll_label.string = t;
this.scroll_label.node.x = this.scroll_parent.getContentSize().width / 2 + this.scroll_parent.getPositionX() + this.scroll_label.node.getContentSize().width;
this.start_scroll();
},
start_scroll: function() {
this.scroll_label.node.active = !0;
var i = this;
this.scroll_label.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.001, 0, 0), cc.callFunc(function() {
var t = i.scroll_label.node;
t.x = t.x - 2.5;
var e = i.scroll_parent.getContentSize().width / 2 + t.getContentSize().width;
t.x <= -e + i.scroll_parent.x && t.stopAllActions();
}.bind(this)))));
}
});
cc._RF.pop();
}, {} ],
one_choice: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "d1a018PC3BH/bIuqlMswyHX", "one_choice");
cc.Class({
extends: cc.Component,
properties: {
index: 0,
type: 0
},
onLoad: function() {
var e = this;
this.node.on("touchstart", function(t) {
e.node.dispatchEvent(new cc.Event.EventCustom("pressed", !0));
}, this);
},
init: function(t, e) {
this.index = t;
this.type = e;
},
pitchOn: function() {
this.node.getChildByName("choiced").active = !0;
this.node.getChildByName("choice").active = !1;
},
lifeUp: function() {
this.node.getChildByName("choice").active = !0;
this.node.getChildByName("choiced").active = !1;
}
});
cc._RF.pop();
}, {} ],
payJS: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "2fd20Nw61NOvpGkpRg4KuHC", "payJS");
var n = n || {};
n.javascriptMethod = function(t) {
cc.log(t);
cc.log("------------------------------------------");
pomelo.request("payInfo.payInfoHandler.payMsg", {
param: t
}, function(t) {
console.log(t.msg);
});
};
cc._RF.pop();
}, {} ],
pj_card: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "dd952ewm1JBR7Ig9KAPYmyx", "pj_card");
cc.Class({
extends: cc.Component,
properties: {
sprite: null,
sprite_back: cc.Sprite,
touch_tag: !1,
id: 0,
suit: 0,
rank: 0
},
initCardSprite: function(t, e) {
cc.director.getVisibleSize();
this.suit = t;
this.rank = e;
var i = 4 * (this.rank - 2) + this.suit;
this.sprite = new cc.Node("sprite");
this.sprite.addComponent(cc.Sprite).spriteFrame = g_assets[i.toString()];
this.sprite.runAction(cc.hide());
this.node.addChild(this.sprite);
},
onLoad: function() {
cc.log("zjh_card  onload......");
},
installTouch: function() {
var e = this;
cc.director.getVisibleSize();
e.node.on("touchstart", function(t) {
e.menuCallbackButton();
e.node.dispatchEvent(new cc.Event.EventCustom("pressed", !0));
}, e);
},
uninstallTouch: function() {
cc.director.getVisibleSize();
this.node.off("touchstart", function(t) {
cc.log("uninstallTouch.....");
}, this);
},
menuCallbackButton: function() {
console.log("start move the card......");
if (0 == this.touch_tag) {
var t = this.node.getPositionX(), e = this.node.getPositionY() + 10;
console.log("start move the card up......x:" + t + " y:" + e);
var i = cc.moveTo(.1, cc.p(t, e));
console.log("start move the card up......");
this.node.runAction(i);
this.touch_tag = !0;
} else {
t = this.node.getPositionX(), e = this.node.getPositionY() - 10;
var n = cc.moveTo(.1, cc.p(t, e));
console.log("start move the card down......x:" + t + " y:" + e);
this.node.runAction(n);
this.touch_tag = !1;
}
return this.touch_tag;
}
});
cc._RF.pop();
}, {} ],
pj_create_game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "35ba8zJX5JMmadNUurTYkMw", "pj_create_game");
cc.Class({
extends: cc.Component,
properties: {
game_bg: cc.Node,
model: 1,
max_type: 1,
fangka: 1,
game_type: "PJ",
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into create game js");
var r = this;
r.model = 1;
r.max_type = 1;
r.fangka = 1;
r.node.on("pressed", r.switchRadio, r);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
r.node.destroy();
}
}
}, r.game_bg);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_radios.length; n++) {
var o = this.choice_radios[n].getComponent("one_choice");
if (o.index == e) {
0 == e ? this.model = i : 1 == e && (this.max_type = i);
o.type == i ? o.pitchOn() : o.lifeUp();
}
}
cc.log("select model" + this.model + " fangka:" + this.fangka + " zuida:" + this.max_type);
},
create_game: function() {
var i = this, n = cc.director.getVisibleSize();
window.g_fapaiNum = this.koupai + 1;
var t = {
roomType: this.game_type,
playerId: g_user.playerId,
model: this.model,
max_type: this.max_type,
fangKa: this.fangka
};
room_create(t, function(t) {
var e = cc.instantiate(g_assets.prop_error_scene);
e.getComponent("prop_error_info").show_error_info(t);
i.node.addChild(e);
e.setPosition(i.node.convertToNodeSpace(n.width / 2, n.height / 2));
cc.log(t);
});
}
});
cc._RF.pop();
}, {} ],
pj_game_room: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "e92dbCeczRCzYDDV7UOGw50", "pj_game_room");
cc.Class({
extends: cc.Component,
properties: {
sumBet: 100,
count: 0,
fapai_count: 0,
roomNum: 0,
roomState: 0,
master_name: null,
total_count: 0,
zhuang_serverPosition: 0,
currentGetPowerPlayerPosition: 0,
pai_back_sprite: cc.Sprite,
master_label: cc.Label,
room_num_label: cc.Label,
zhuang_label: cc.Label,
huihe_label: cc.Label,
msage_scroll: cc.Node,
chip_layout: cc.Node,
button_layout: cc.Node,
zhunbei_button: cc.Node,
qiangzhang_button: cc.Node,
xiazhu_button: cc.Node,
queding_button: cc.Node,
peipai_button: cc.Node,
kaipai_button: cc.Node,
players: {
type: cc.Node,
default: []
}
},
onLoad: function() {
this.sumBet = g_roomData[1];
this.count = g_roomData[2];
this.roomNum = g_roomData[3];
this.roomState = g_roomData[5];
this.currentGetPowerPlayerPosition = g_roomData[6];
this.master_name = g_roomData[0];
this.total_count = g_totalCount;
this.startDealCardPosition = 0;
this.startDealCardPosition = 0;
this.myselfCards = new Array();
this.init_head_info();
this.initButtonEnableAfterComeInRoom();
this.initPlayersAndPlayer_noPower();
this.schedule(this.showRoomMessageUpdate, 1 / 60, cc.REPEAT_FOREVER, 0);
this.node.on("pressed", this.switchRadio, this);
},
start: function() {
cc.loader.loadResDir("", cc.SpriteFrame, function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
cc.log("load res :" + e[i].name);
}
});
cc.loader.loadResDir("prefab", function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
cc.log("load res :" + e[i].name);
}
});
},
init_head_info: function() {
cc.director.getWinSize();
this.master_label.getComponent(cc.Label).string = this.master_name;
this.room_num_label.getComponent(cc.Label).string = this.roomNum;
this.zhuang_label.getComponent(cc.Label).string = 100;
this.huihe_label.getComponent(cc.Label).string = this.count + "/" + this.total_count;
},
initButtonEnableAfterComeInRoom: function() {
this.get_one_button("ready", !0);
},
initPlayersAndPlayer_noPower: function() {
cc.log("initPlayersAndPlayer_noPower" + JSON.stringify(g_playerData));
for (var t = 0; t < g_playerData.length; t++) if (g_playerData[t][0] == g_user.playerId) {
g_myselfPlayerPos = g_playerData[t][1];
break;
}
var e = new Array();
for (t = 0; t < g_playerData.length; t++) {
var i = -1;
if ((n = g_playerData[t])[1] == g_myselfPlayerPos) i = 0; else if (n[1] > g_myselfPlayerPos) i = n[1] - g_myselfPlayerPos; else if (n[1] < g_myselfPlayerPos) i = this.players.length - g_myselfPlayerPos + n[1];
0 <= i && (e[i] = n);
}
for (t = 0; t < this.players.length; t++) {
var n;
if (null != (n = e[t])) {
var o = this.players[t], s = o.getComponent("tdk_player");
s.init(n);
s.player_position = t + 1;
cc.log("set player_com: player_position:" + s.player_position + " position_server:" + s.position_server);
0 == s.is_power ? g_players_noPower.push(o) : g_players.push(o);
o.active = !0;
}
}
},
init_count_timer: function() {
for (var t = g_players_noPower.concat(g_players), e = 0; e < t.length; e++) {
var i = t[e].getComponent("tdk_player");
if (i.position_server == g_myselfPlayerPos) {
i.start_timer();
break;
}
}
},
initPlayerCardsPosition: function() {
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t], i = e.getComponent("tdk_player");
if (2 == i.is_power) for (var n = 0; n < 3; n++) {
var o = this.calc_player_card_position(e, n);
i.my_cards[n].setPosition(o);
}
}
},
get_one_button: function(t) {
var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
this.button_layout.active = !0;
this.zhunbei_button.active = !1;
this.qiangzhang_button.active = !1;
this.peipai_button.active = !1;
this.kaipai_button.active = !1;
this.queding_button.active = !1;
this.xiazhu_button.active = !1;
var i = this.zhunbei_button;
"ready" == t ? i = this.zhunbei_button : "qiang" == t ? i = this.qiangzhang_button : "peipai" == t ? i = this.peipai_button : "kaipai" == t ? i = this.kaipai_button : "queding" == t ? i = this.queding_button : "xiazhu" == t && (i = this.xiazhu_button);
i.active = !0;
i.getComponent(cc.Button).interactable = e;
},
callback_zhunbei: function() {
this.zhunbei_button.active = !1;
var e = this;
e.onReady_function({
location: g_myselfPlayerPos
});
e.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
for (var t = 1; t < 4; t++) e.onReady_function({
location: t + 1
});
e.get_one_button("qiang", !0);
})));
},
callback_qiangzhuang: function() {
this.qiangzhang_button.active = !1;
for (var t = 0; t < 4; t++) this.onQiangzhuang_function({
location: t + 1
});
this.onGetzhuang_function({
location: 1
});
},
callback_xiazhu: function() {
this.xiazhu_button.getComponent(cc.Button).interactable = !1;
this.chip_layout = cc.instantiate(g_assets.pop_add_chip);
this.chip_layout.getComponent("add_chip").init_callback(this, this.silder_callback);
this.node.addChild(this.chip_layout);
for (var t = 0; t < g_players.length; t++) {
if (g_players[t].getComponent("tdk_player").position_server == g_myselfPlayerPos) {
var e = this.button_layout.getPositionY() + this.button_layout.getContentSize().height / 2 + 10 + this.chip_layout.getContentSize().height / 2;
this.chip_layout.setPosition(cc.p(0, e));
break;
}
}
this.get_one_button("queding", !1);
},
callback_queding: function() {
this.chip_layout.active = !1;
this.queding_button.active = !1;
this.onFapai_function({
location: 1,
shaizi1: 3,
shaizi2: 2,
all_chip: 100
});
var t = cc.callFunc(this.onShoupai_function, this, g_paixing);
this.node.runAction(cc.sequence(cc.delayTime(2.5), t));
},
callback_peipai: function() {
this.peipai_button.active = !1;
for (var t = cc.director.getVisibleSize(), e = -1, i = 0; i < g_players.length; i++) {
if (g_players[i].getComponent("tdk_player").position_server == g_myselfPlayerPos) {
e = i;
break;
}
}
if (2 == g_players[e].getComponent("tdk_player").selected_cards.length) {
this.peipai_button.active = !1;
this.onPeipai_function(g_peipai_data1);
this.onPeipai_function(g_peipai_data2);
this.onPeipai_function(g_peipai_data3);
this.onPeipai_function(g_peipai_data4);
} else util.show_error_info(this, t, "只能选择两张牌");
},
callback_kaipai: function() {
this.kaipai_button.active = !1;
this.onEndPai_function(g_endpai_data);
this.onEnd_function(g_end_data);
},
callback_setting: function() {
var e = this, t = cc.director.getVisibleSize(), i = cc.instantiate(g_assets.pop_setting_scene);
i.getComponent("pop_set_scene").set_callback(function(t) {
0 == t && (g_music_key == BOOL.NO ? e.audioSource.pause() : e.audioSource.play());
});
var n = t.width / 2, o = t.height / 2;
this.node.addChild(i);
i.setPosition(this.node.convertToNodeSpaceAR(cc.p(n, o)));
},
callback_gameback: function() {
var e = this;
pomelo.request(util.getGameRoute(), {
process: "quitRoom"
}, function(t) {
console.log("-----quit------" + JSON.stringify(t));
e.onExit();
cc.director.loadScene("MainScene");
});
},
callback_uinfo: function(t, e) {
var i = this.players[e].getComponent("tdk_player");
pomelo.request(util.getGameRoute(), {
process: "get_uinfo",
send_from: g_myselfPlayerPos,
send_to: i.position_server
}, function(t) {
console.log("-----quit------" + JSON.stringify(t));
});
},
showRoomMessageUpdate: function() {
var t = this.sumBet;
this.zhuang_label.string = t;
var e = this.count + "/" + this.total_count;
this.huihe_label.string = e;
},
pomelo_on: function() {
pomelo.on("onReady", this.onReady_function.bind(this));
pomelo.on("onAdd", this.onAdd_function.bind(this));
pomelo.on("onNoRound", this.onNoRound_function.bind(this));
pomelo.on("onFapai", this.onFapai_function.bind(this));
pomelo.on("onGetUinfo", this.onGetUinfo_function.bind(this));
pomelo.on("onShoupai", this.onShoupai_function.bind(this));
pomelo.on("onOpen", this.onOpen_function.bind(this));
pomelo.on("onThrow", this.onThrow_function.bind(this));
pomelo.on("onFollow", this.onFollow_function.bind(this));
pomelo.on("onLeave", this.onLeave_function.bind(this));
pomelo.on("onChangePlayer", this.onChangePlayer_function.bind(this));
pomelo.on("onBipai", this.onBipai_function.bind(this));
pomelo.on("onEnd", this.onEnd_function.bind(this));
pomelo.on("onEndPai", this.onEndPai_function.bind(this));
pomelo.on("onAddChip", this.onAddChip_function.bind(this));
pomelo.on("onActBroadcast", this.onUserBroadcast_function.bind(this));
},
onReady_function: function(t) {
cc.log("pomelo on Ready:" + t.location + " is ready");
for (var e = 0; e < g_players_noPower.length; e++) {
if ((n = (i = g_players_noPower[e]).getComponent("tdk_player")).position_server == t.location) {
g_players.push(i);
g_players_noPower.splice(e, 1);
break;
}
}
for (e = 0; e < g_players.length; e++) {
var i, n;
if ((n = (i = g_players[e]).getComponent("tdk_player")).position_server == t.location) {
n.is_power = 1;
n.setSpriteStatus("yizhunbei");
n.stop_timer();
break;
}
}
},
onQiangzhuang_function: function(t) {
cc.log("pomelo onQiangzhuang_function:" + t.location);
for (var e = 0; e < g_players.length; e++) {
var i = g_players[e].getComponent("tdk_player");
if (i.position_server == t.location) {
i.is_power = 1;
i.setSpriteStatus("qiang");
break;
}
}
},
onGetzhuang_function: function(t) {
cc.log("pomelo onGetzhuang_function:" + t.location);
var e = cc.director.getWinSize();
this.zhuang_serverPosition = t.location;
this.yao_shaizi = cc.instantiate(g_assets.yaoshaizi);
this.yao_shaizi.getComponent("shai_zhong_active").init_start(null, 3, 2);
this.node.addChild(this.yao_shaizi);
this.yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 2)));
var i = cc.callFunc(this.getzhuang_callback, this);
this.node.runAction(cc.sequence(cc.delayTime(3), i));
},
onAdd_function: function(t) {
cc.log("onAdd:" + JSON.stringify(t));
var e = null, i = t.user, n = new Array();
n.push(i.id);
n.push(i.location);
n.push(i.isGame);
n.push(i.nickName);
n.push(i.gold);
n.push(i.gender);
n.push(i.mark);
var o = 0;
o = n[1] > g_myselfPlayerPos ? n[1] - g_myselfPlayerPos : this.players.length - g_myselfPlayerPos + n[1];
var s = (e = this.players[o]).getComponent("tdk_player");
s.init(n);
s.player_position = o + 1;
1 == this.roomState ? g_players_noPower.push(e) : g_players.push(e);
e.active = !0;
this.playerNum++;
},
onFapai_function: function(t) {
cc.log("onFapai" + JSON.stringify(t));
var e = cc.director.getWinSize();
this.count = t.round;
this.currentGetPowerPlayerPosition = t.location;
this.startDealCardPosition = t.location;
this.startDealCardPosition = t.location;
for (var i = this.fapai_count = 0; i < g_players.length; i++) {
(n = g_players[i].getComponent("tdk_player")).remove_cards();
}
this.sumBet = t.all_chip;
for (i = 0; i < g_players.length; i++) {
var n;
(n = g_players[i].getComponent("tdk_player")).check_card = !1;
n.hide_game_sprite();
}
var o = t.shaizi1, s = t.shaizi2;
this.yao_shaizi = cc.instantiate(g_assets.yaoshaizi);
this.yao_shaizi.getComponent("shai_zhong_active").init_start(null, o, s);
this.node.addChild(this.yao_shaizi);
this.yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 2)));
},
onShoupai_function: function(t, e) {
cc.log("onShoupai:" + JSON.stringify(e));
this.myselfCards.splice(0, this.myselfCards.length);
var n = e.paixing;
for (i = 1; i < 5; i++) {
var o = n["s" + i], s = n["p" + i], r = new Array();
r.push(o);
r.push(s);
this.myselfCards.push(r);
}
this.myselfCardsReach = !0;
this.actionFaPai();
},
onPeipai_function: function(t) {
cc.log("onPeipai_function:" + JSON.stringify(t));
var e = t.location, i = t.select;
0 == t.unpei && (this.kaipai_button.active = !0);
for (var n = 0; n < g_players.length; n++) {
var o = g_players[n], s = o.getComponent("tdk_player");
if (s.position_server == e) {
for (var r = s.my_cards, a = new Array(), c = new Array(), h = 0; h < r.length; h++) {
var l = !1, p = r[h], u = p.getComponent("pj_card");
cc.log("card_item_com id:" + u.id + " selected_cards:" + s.selected_cards.length);
for (var _ = 0; _ < i.length; _++) if (u.id == i[_]) {
l = !0;
break;
}
0 == l ? a.push(p) : c.push(p);
}
if (1 == t.first) {
this.set_cards_w(o, c);
this.set_cards_h(o, a);
} else {
this.set_cards_h(o, c);
this.set_cards_w(o, a);
}
break;
}
}
},
onLeave_function: function(t) {
cc.log("onLeave:" + JSON.stringify(t));
for (var e = t.user, i = !1, n = 0; n < g_players.length; n++) {
if ((s = (o = g_players[n]).getComponent("tdk_player")).id == e) {
cc.log("quit from zjh room g_players");
s.remove_cards();
o.active = !1;
g_players.splice(n, 1);
i = !0;
break;
}
}
if (0 == i) for (n = 0; n < g_players_noPower.length; n++) {
var o, s;
if ((s = (o = g_players_noPower[n]).getComponent("tdk_player")).id == e) {
cc.log("quit from zjh room g_players_noPower");
s.remove_cards();
o.active = !1;
g_players_noPower.splice(n, 1);
i = !0;
break;
}
}
this.playerNum--;
},
onEnd_function: function(t) {
cc.log("onEnd:" + JSON.stringify(t));
for (var e = t.winners, i = t.losers, n = 0; n < g_players.length; n++) {
for (var o = g_players[n].getComponent("tdk_player"), s = 0; s < e.length; s++) o.position_server == e[s] && o.setGameStatus("winner");
for (s = 0; s < i.length; s++) o.position_server == i[s] && o.setGameStatus("loser");
}
},
onEndPai_function: function(t) {
cc.log("onEndPai:" + JSON.stringify(t));
for (i = 1; i < 5; i++) {
var e = t["location" + i];
if (g_myselfPlayerPos != i) {
console.log("location:num:" + i);
new Array(), e.s1, e.p1, e.s2, e.p2, e.s3, e.p3, e.s4, e.p4;
for (var n = 0; n < g_players.length; n++) {
var o = g_players[n].getComponent("tdk_player");
if (o.position_server == i) {
for (var s = 0; s < 4; s++) {
o.my_cards[s].getComponent("pj_card").initCardSprite(parseInt(e["s" + (s + 1)]), parseInt(e["p" + (s + 1)]));
}
break;
}
}
}
}
this.openAllCard();
},
onUserBroadcast_function: function(t) {
console.log("onUserBroadcast:" + JSON.stringify(t));
this.msage_scroll.getComponent("msage_scroll").set_string(t);
},
onNoRound_function: function(t) {
console.log("onNoRound:" + JSON.stringify(t));
var e = cc.director.getVisibleSize(), i = t.golds, n = new Array();
for (var o in i) n.push(i[o]);
var s = cc.instantiate(g_assets.pop_game_finish);
s.getComponent("pop_game_finish").init_info(n);
var r = e.width / 2, a = e.height / 2;
this.node.addChild(s);
s.setPosition(this.node.convertToNodeSpaceAR(cc.p(r, a)));
},
onGetUinfo_function: function(t) {
console.log("onNoRound:" + JSON.stringify(t));
var e = cc.director.getWinSize();
if (t.send_from == g_myselfPlayerPos) {
this.uinfo = cc.instantiate(g_assets.pop_game_user);
this.uinfo.getComponent("pop_game_user").init_info(t, this.actionSendGift);
this.node.addChild(this.uinfo);
this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 2)));
}
},
actionSendGift: function(t, e, i, n) {
cc.log("actionSendGift", e, i, n);
var o = null, s = null, r = g_players.concat(g_players_noPower);
if (i == n) return !1;
for (var a = 0; a < r.length; a++) {
var c = r[a].getComponent("tdk_player");
c.position_server == i && (o = r[a]);
c.position_server == n && (s = r[a]);
}
var h = null, l = null;
if (1 == e) {
h = cc.instantiate(g_assets.shoe_active);
l = "shoe_active";
} else if (2 == e) {
h = cc.instantiate(g_assets.egg_active);
l = "egg_active";
} else if (3 == e) {
h = cc.instantiate(g_assets.bomb_active);
l = "bomb_active";
} else if (4 == e) {
h = cc.instantiate(g_assets.kiss_active);
l = "kiss_active";
} else if (5 == e) {
h = cc.instantiate(g_assets.flower_active);
l = "flower_active";
} else if (6 == e) {
h = cc.instantiate(g_assets.cheers_active);
l = "cheers_active";
}
t.addChild(h);
h.setPosition(o.getPosition());
var p = cc.moveTo(.5, s.getPosition()), u = cc.rotateBy(.5, 360), _ = cc.spawn(p, u), g = cc.callFunc(function() {
var t = h.getComponent(cc.Animation);
t.on("finished", function() {
h.destroy();
}, null);
var e = t.play(l);
e.wrapMode = cc.WrapMode.Normal;
e.wrapMode = cc.WrapMode.Loop;
e.repeatCount = 1;
});
h.runAction(cc.sequence(_, g));
},
actionFaPai: function() {
cc.director.getVisibleSize();
var t = !1, e = -1;
cc.log("start into actionDealCards........startDealCardPosition:" + this.startDealCardPosition);
if (this.fapai_count >= g_players.length) {
var i = cc.callFunc(this.fapai_finish, this);
this.node.runAction(cc.sequence(cc.delayTime(1), i));
} else {
for (var n = 0; n < g_players.length; n++) {
if ((s = g_players[n].getComponent("tdk_player")).position_server == this.startDealCardPosition) {
e = n;
t = !0;
break;
}
}
if (1 == t) {
if (-1 == e) {
cc.log("outside error.......................actionDealCards:function()");
return;
}
this.startDealCardPosition++;
this.startDealCardPosition = this.startDealCardPosition % 4;
0 == this.startDealCardPosition && (this.startDealCardPosition = 4);
var o = g_players[e], s = o.getComponent("tdk_player");
for (n = 0; n < 4; n++) {
var r = s.addPlayerCard(), a = r.getComponent("pj_card");
if (s.position_server == g_myselfPlayerPos) {
a.installTouch();
s.set_card_sprite(n, parseInt(this.myselfCards[n][0]), parseInt(this.myselfCards[n][1]));
}
var c = this.calc_player_card_position(o, n);
r.setPosition(c);
}
var h = cc.callFunc(this.actionFaPai, this);
this.node.runAction(cc.sequence(cc.delayTime(.45), h));
this.fapai_count++;
} else {
this.startDealCardPosition++;
this.startDealCardPosition = this.startDealCardPosition % 4;
0 == this.startDealCardPosition && (this.startDealCardPosition = 4);
this.actionFaPai();
}
}
},
actionBottomBet: function(t) {
for (var e = cc.director.getVisibleSize(), i = -1, n = 0; n < g_betArray.length; n++) if (this.bet == g_betArray[n]) {
i = ++n;
break;
}
if (-1 != i) {
var o = cc.instantiate(g_assets["chip_" + this.bet]);
this.node.addChild(o);
this.betPhotoArray.push(o);
o.setPosition(t);
var s = e.width / 3 + e.width / 3 * Math.random(), r = e.height / 2 + 150 * Math.random(), a = this.node.convertToNodeSpaceAR(cc.p(s, r)), c = cc.moveTo(.3, a);
o.runAction(c);
} else cc.log("error........outside actionBottomBet:function");
},
actionFollowBet: function(t, e) {
cc.log("go into actionFollowBet......" + e);
for (var i = cc.director.getWinSize(), n = -1, o = 0; o < g_betArray.length; o++) if (this.bet == g_betArray[o]) {
n = ++o;
break;
}
var s = 1;
1 == e && (s = 2);
if (-1 != n) for (;0 < s; ) {
var r = cc.instantiate(g_assets["chip_" + this.bet]);
this.node.addChild(r);
this.betPhotoArray.push(r);
r.setPosition(t);
var a = i.width / 3 + i.width / 3 * Math.random(), c = i.height / 2 + 150 * Math.random(), h = this.node.convertToNodeSpaceAR(cc.p(a, c)), l = cc.moveTo(.3, h);
r.runAction(l);
s--;
} else cc.log("error........outside actionFollowBet:function");
},
fapai_finish: function() {
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server == g_myselfPlayerPos) {
for (var i = 0; i < 4; i++) {
var n = cc.sequence(cc.delayTime(.45), cc.hide()), o = cc.rotateBy(.45, 0, -90), s = cc.spawn(n, o), r = cc.sequence(cc.delayTime(.45), cc.show()), a = cc.rotateBy(.6, 0, -360), c = cc.spawn(r, a), h = e.my_cards[i].getComponent("pj_card");
h.sprite_back.node.runAction(s);
h.sprite.runAction(c);
}
break;
}
}
this.button_layout.active = !0;
this.zhunbei_button.active = !1;
this.qiangzhang_button.active = !1;
this.peipai_button.active = !0;
},
openAllCard: function() {
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server != g_myselfPlayerPos) for (var i = 0; i < 4; i++) {
var n = cc.sequence(cc.delayTime(.45), cc.hide()), o = cc.rotateBy(.45, 0, -90), s = cc.spawn(n, o), r = cc.sequence(cc.delayTime(.45), cc.show()), a = cc.rotateBy(.6, 0, -360), c = cc.spawn(r, a), h = e.my_cards[i].getComponent("pj_card");
h.sprite_back.node.runAction(s);
h.sprite.runAction(c);
}
}
},
switchRadio: function(t) {
var e = t.target.getComponent("pj_card"), i = t.target.getComponent("pj_card").suit, n = t.target.getComponent("pj_card").rank;
cc.log("switchRadio : suit:" + i + " rank:" + n);
for (var o = null, s = 0; s < g_players.length; s++) {
if ((o = g_players[s].getComponent("tdk_player")).position_server == g_myselfPlayerPos) break;
}
if (null == o) return !1;
if (1 == e.touch_tag) o.selected_cards.push(t.target); else for (s = 0; s < o.selected_cards.length; s++) {
if (o.selected_cards[s] == t.target) {
o.selected_cards.splice(s, 1);
break;
}
}
},
calc_player_chip_position: function(t) {
var e = t.getComponent("tdk_player"), i = 0, n = 0;
if (1 == e.player_position) {
i = t.getPositionX() + e.mobile_sprite.node.getContentSize().width / 2 + e.chips_label.getContentSize().width / 2 + 10;
n = t.getPositionY();
} else if (2 == e.player_position) {
i = t.getPositionX();
n = t.getPositionY() + e.mobile_sprite.node.height / 2 + e.chips_label.getContentSize().height / 2 + 10;
} else if (3 == e.player_position) {
i = t.getPositionX() + e.mobile_sprite.node.getContentSize().width / 2 + e.chips_label.getContentSize().width / 2 + 10;
n = t.getPositionY();
} else if (4 == e.player_position) {
i = t.getPositionX();
n = t.getPositionY() + e.mobile_sprite.node.height / 2 + e.chips_label.getContentSize().height / 2 + 10;
}
cc.log("calc x:" + i + " y:" + n);
return cc.p(i, n);
},
calc_player_card_position: function(t, e) {
var i = t.getComponent("tdk_player"), n = 0, o = 0, s = 0;
i.position_server == this.zhuang_serverPosition && (s = -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 60 + s + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
o = i.chips_label.getPositionY();
} else if (2 == i.player_position || 4 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
o = i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s;
}
cc.log("calc player_com:" + i.player_position + "x:" + n + " y:" + o);
return cc.p(n, o);
},
calc_hpeipai_position: function(t, e) {
var i = t.getComponent("tdk_player"), n = 0, o = 0, s = 0;
i.position_server == this.zhuang_serverPosition && (s = -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 60 + s + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
o = i.chips_label.getPositionY();
} else if (2 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * (e + 2);
o = i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s;
} else if (4 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
o = i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s;
}
cc.log("calc player_com:" + i.player_position + "x:" + n + " y:" + o);
return cc.p(n, o);
},
calc_wpeipai_position: function(t, e) {
var i = t.getComponent("tdk_player"), n = 0, o = 0, s = 0;
i.position_server == this.zhuang_serverPosition && (s = -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + 60 + s + (this.pai_back_sprite.node.getContentSize().width + 2) + this.pai_back_sprite.node.getContentSize().height / 2 + 2;
o = 0 == e ? i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : i.chips_label.getPositionY() - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
} else if (4 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + this.pai_back_sprite.node.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().height / 2 + 2 + (this.pai_back_sprite.node.getContentSize().width + 2);
o = 0 == e ? i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
} else if (2 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 4 + this.pai_back_sprite.node.getContentSize().height / 2 + 2;
o = 0 == e ? i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : i.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + s - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
}
cc.log("calc x:" + n + " y:" + o);
return cc.p(n, o);
},
startFirstRotationPosition: function() {
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server == this.currentGetPowerPlayerPosition) {
e.start_timer();
break;
}
}
if (this.currentGetPowerPlayerPosition == g_myselfPlayerPos) {
this.bipai_button.getComponent(cc.Button).interactable = !0;
this.genzhu_button.getComponent(cc.Button).interactable = !0;
this.jiazhu_button.getComponent(cc.Button).interactable = !0;
}
this.kaipai_button.getComponent(cc.Button).interactable = !0;
this.qipai_button.getComponent(cc.Button).interactable = !0;
},
displayLoser: function(t, e) {
g_players_noPower.concat(g_players);
for (var i = 0; i < g_players.length; i++) {
var n = g_players[i].getComponent("tdk_player");
if (n.position_server == e) {
n.setSpriteStatus("loser");
g_players_noPower.push(g_players[i]);
g_players.splice(i, 1);
break;
}
}
},
actionWinnerGetBet: function(t, e) {
for (var i in this.betPhotoArray) {
var n = cc.moveTo(1, e);
this.betPhotoArray[i].runAction(cc.sequence(n, cc.hide()));
}
this.roomState = 0;
this.initButtonEnableAfterComeInRoom();
for (var o = g_players_noPower.concat(g_players), s = 0; s < o.length; s++) {
var r = o[s].getComponent("tdk_player");
if (r.position_server == this.currentGetPowerPlayerPosition) {
r.stop_timer();
break;
}
}
},
biPaiSelectCallBack: function(t) {
g_myselfPlayerPos;
for (var e = null, i = 0; i < g_players.length; i++) {
var n = g_players[i].getComponent("tdk_player");
if (n.player_position == t + 1) {
e = n.position_server;
break;
}
}
null != e && pomelo.request(util.getGameRoute(), {
process: "bipai",
location1: g_myselfPlayerPos,
location2: e
}, function(t) {
cc.log(JSON.stringify(t));
});
},
set_cards_w: function(t, e) {
cc.log("set_cards_w:" + e.length);
for (var i = 0; i < e.length; i++) {
var n = e[i], o = this.calc_wpeipai_position(t, i), s = cc.moveTo(.45, o), r = cc.rotateBy(.45, 90, 90), a = cc.spawn(s, r);
n.runAction(a);
}
},
set_cards_h: function(t, e) {
cc.log("set_cards_h:" + e.length);
for (var i = 0; i < e.length; i++) {
var n = e[i], o = this.calc_hpeipai_position(t, i), s = cc.moveTo(.45, o);
n.runAction(s);
}
},
getzhuang_callback: function() {
cc.log("getzhuang_callback");
for (var t = this.zhuang_serverPosition, e = 0, i = [ "zhuang", "chumen", "tianmen", "momen" ], n = 0; n < g_players.length; n++) {
if ((r = (s = g_players[n]).getComponent("tdk_player")).position_server == this.zhuang_serverPosition) {
r.is_power = 1;
r.setSpriteStatus(i[e]);
r.resetMoneyLabel(this.sumBet);
r.install_chip_label(!0);
var o = this.calc_player_chip_position(s);
r.chips_label.setPosition(o);
t += 1;
e += 1;
break;
}
}
for (n = 0; n < g_players.length; n++) {
var s, r;
5 == t && (t = 1);
if ((r = (s = g_players[n]).getComponent("tdk_player")).position_server == t) {
r.is_power = 1;
r.setSpriteStatus(i[e]);
t += 1;
e += 1;
r.install_chip_label(!1);
o = this.calc_player_chip_position(s);
r.chips_label.setPosition(o);
}
}
this.get_one_button("xiazhu", !0);
},
silder_callback: function(t, e, i) {
var n = Math.floor(i * t.sumBet);
cc.log("pj_game_scene silder1:" + n);
for (var o = 0; o < g_players.length; o++) {
var s = g_players[o].getComponent("tdk_player");
s.position_server != t.zhuang_serverPosition && s.set_chips(e, n);
}
t.get_one_button("queding", !0);
},
pomelo_removeListener: function() {
cc.log("remove listener");
pomelo.removeListener("onReady");
pomelo.removeListener("onGetUinfo");
pomelo.removeListener("onFollow");
pomelo.removeListener("onAddChip");
pomelo.removeListener("onAdd");
pomelo.removeListener("onOpen");
pomelo.removeListener("onThrow");
pomelo.removeListener("onBipai");
pomelo.removeListener("onNoRound");
pomelo.removeListener("onLeave");
pomelo.removeListener("onEnd");
pomelo.removeListener("onFapai");
pomelo.removeListener("onShoupai");
pomelo.removeListener("onChangePlayer");
pomelo.removeListener("onEndPai");
pomelo.removeListener("onActBroadcast");
},
onExit: function() {
g_dealCardBack.destroy();
g_playerData.splice(0, g_playerData.length);
g_roomData.splice(0, g_roomData.length);
g_players.splice(0, g_players.length);
g_players_noPower.splice(0, g_players_noPower.length);
console.log("exit from the room......");
this.pomelo_removeListener();
this.destroy();
}
});
cc._RF.pop();
}, {} ],
"pomelo-client": [ function(R, L, t) {
"use strict";
cc._RF.push(L, "f46b8iXN9NIP6/33SIBNQ7O", "pomelo-client");
(function() {
var r = R("protocol"), a = r.Package, c = r.Message, t = window.EventEmitter;
"undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
"function" != typeof Object.create && (Object.create = function(t) {
function e() {}
e.prototype = t;
return new e();
});
var e = window, h = Object.create(t.prototype);
e.pomelo = h;
var i = null, n = 0, o = {}, s = {}, l = {}, p = 0, u = 0, _ = 0, g = null, d = null, f = null, m = {
sys: {
type: "js-websocket",
version: "0.0.1"
},
user: {}
}, y = null;
h.init = function(t, e) {
y = e;
var i = t.host, n = t.port, o = "ws://" + i;
n && (o += ":" + n);
m.user = t.user;
f = t.handshakeCallback;
v(o, e);
};
var v = function(t, e) {
(i = new WebSocket(t)).binaryType = "arraybuffer";
i.onopen = function(t) {
var e = a.encode(a.TYPE_HANDSHAKE, r.strencode(JSON.stringify(m)));
w(e);
};
i.onmessage = function(t) {
S(a.decode(t.data), e);
u && (_ = Date.now() + u);
};
i.onerror = function(t) {
h.emit("io-error", t);
cc.error("socket error: ", t);
};
i.onclose = function(t) {
h.emit("close", t);
h.emit("disconnect", t);
cc.error("socket close: ", t);
};
};
h.disconnect = function() {
if (i) {
i.disconnect && i.disconnect();
i.close && i.close();
cc.log("disconnect");
i = null;
}
if (g) {
clearTimeout(g);
g = null;
}
if (d) {
clearTimeout(d);
d = null;
}
};
h.request = function(t, e, i) {
if (2 === arguments.length && "function" == typeof e) {
i = e;
e = {};
} else e = e || {};
if (t = t || e.route) {
b(++n, t, e);
o[n] = i;
l[n] = t;
}
};
h.notify = function(t, e) {
b(0, t, e = e || {});
};
var b = function(t, e, i) {
var n = t ? c.TYPE_REQUEST : c.TYPE_NOTIFY;
i = (h.data.protos ? h.data.protos.client : {})[e] ? protobuf.encode(e, i) : r.strencode(JSON.stringify(i));
var o = 0;
if (h.dict && h.dict[e]) {
e = h.dict[e];
o = 1;
}
i = c.encode(t, n, o, e, i);
var s = a.encode(a.TYPE_DATA, i);
w(s);
}, w = function(t) {
i.send(t.buffer);
}, C = function t() {
var e = _ - Date.now();
if (100 < e) d = setTimeout(t, e); else {
cc.error("server heartbeat timeout");
h.emit("heartbeat timeout");
h.disconnect();
}
};
s[a.TYPE_HANDSHAKE] = function(t) {
if (501 !== (t = JSON.parse(r.strdecode(t))).code) if (200 === t.code) {
E(t);
var e = a.encode(a.TYPE_HANDSHAKE_ACK);
w(e);
if (y) {
y(i);
y = null;
}
} else h.emit("error", "handshake fail"); else h.emit("error", "client version not fullfill");
};
s[a.TYPE_HEARTBEAT] = function(t) {
if (p) {
var e = a.encode(a.TYPE_HEARTBEAT);
if (d) {
clearTimeout(d);
d = null;
}
g || (g = setTimeout(function() {
g = null;
w(e);
_ = Date.now() + u;
d = setTimeout(C, u);
}, p));
}
};
s[a.TYPE_DATA] = function(t) {
var e = c.decode(t);
if (0 < e.id) {
e.route = l[e.id];
delete l[e.id];
if (!e.route) return;
}
e.body = P(e);
k(h, e);
};
s[a.TYPE_KICK] = function(t) {
t = JSON.parse(r.strdecode(t));
h.emit("onKick", t);
};
var S = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
s[i.type](i.body);
} else s[t.type](t.body);
}, k = function(t, e) {
e.id || t.emit(e.route, e.body);
var i = o[e.id];
delete o[e.id];
"function" == typeof i && i(e.body);
}, P = function(t) {
var e = h.data.protos ? h.data.protos.server : {}, i = h.data.abbrs, n = t.route;
if (t.compressRoute) {
if (!i[n]) return {};
n = t.route = i[n];
}
return e[n] ? protobuf.decode(n, t.body) : JSON.parse(r.strdecode(t.body));
}, E = function(t) {
if (t.sys && t.sys.heartbeat) {
p = 1e3 * t.sys.heartbeat;
u = 2 * p;
} else u = p = 0;
T(t);
"function" == typeof f && f(t.user);
}, T = function(t) {
if (t && t.sys) {
h.data = h.data || {};
var e = t.sys.dict, i = t.sys.protos;
if (e) {
h.data.dict = e;
h.data.abbrs = {};
for (var n in e) h.data.abbrs[e[n]] = n;
}
if (i) {
h.data.protos = {
server: i.server || {},
client: i.client || {}
};
protobuf && protobuf.init({
encoderProtos: i.client,
decoderProtos: i.server
});
}
}
};
L.exports = h;
})();
cc._RF.pop();
}, {
protocol: "protocol"
} ],
popUserLayer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "28973LNYvZCvo0j8HuItTFl", "popUserLayer");
cc.Class({
extends: cc.Component,
properties: {
bg_sprite: cc.Node,
vnickname_lable: cc.Label,
vacount_label: cc.Label,
vlevel_label: cc.Label,
vfangka_label: cc.Label,
vuid_label: cc.Label,
vsex_label: cc.Label,
vvip_label: cc.Label,
vdiamon_label: cc.Label
},
onLoad: function() {
cc.log("start go into popUserLayer js");
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
var i = e.getCurrentTarget().convertToNodeSpace(t.getLocation());
cc.log("当前点击坐标" + i);
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, this.bg_sprite);
},
show: function() {
this.vnickname_lable.string = g_user.nickName;
this.vacount_label.string = "1234567890";
this.vlevel_label.string = "0";
this.vfangka_label.string = g_user.fangka;
this.vuid_label.string = "12345566";
1 == g_user.gender ? this.vsex_label.string = "男" : this.vsex_label.string = "女";
this.vvip_label.string = g_user.vip;
this.vdiamon_label.string = g_user.diamond;
this.node.active = !0;
},
hide: function() {
this.node.active = !1;
},
exit: function() {}
});
cc._RF.pop();
}, {} ],
pop_enter_game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b971by1BnxEaJGLtRZN/ATB", "pop_enter_game");
cc.Class({
extends: cc.Component,
properties: {
myindex: -1,
shuru_kuangs: {
type: cc.Node,
default: []
},
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into create game js");
var r = this;
r.room_num = new Array();
r.node.on("pressed", r.switchRadio, r);
var t = r.node.getChildByName("bg_sprite");
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, t);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
if (2 == i) {
if (1 == e) {
if (0 <= this.myindex) {
this.shuru_kuangs[this.myindex].getChildByName("num_label").active = !1;
this.room_num.splice(this.myindex, 1);
this.myindex = this.myindex - 1;
}
} else if (2 == e) {
for (var n = 0; n < this.shuru_kuangs.length; n++) this.shuru_kuangs[n].getChildByName("num_label").active = !1;
this.room_num.splice(0, this.room_num.length);
this.myindex = -1;
}
} else if (1 == i) if (this.myindex < 5) {
this.myindex = this.myindex + 1;
var o = this.shuru_kuangs[this.myindex].getChildByName("num_label");
o.getComponent(cc.Label).string = e;
o.active = !0;
this.room_num.push(e);
5 == this.myindex && this.enter_game();
} else this.enter_game();
cc.log("room_num:" + JSON.stringify(this.room_num));
},
enter_game: function() {
this.myindex = -1;
for (var t = this.room_num.join(""), e = 0; e < this.shuru_kuangs.length; e++) this.shuru_kuangs[e].getChildByName("num_label").active = !1;
this.room_num.splice(0, this.room_num.length);
var i = {
playerId: g_user.playerId,
roomNum: t,
roomType: g_game_type
}, n = this, o = cc.director.getVisibleSize();
room_enter(i, function(t) {
var e = cc.instantiate(g_assets.prop_error_scene);
e.getComponent("prop_error_info").show_error_info(t);
n.node.addChild(e);
e.setPosition(n.node.convertToNodeSpace(o.width / 2, o.height / 2));
cc.log(t);
});
}
});
cc._RF.pop();
}, {} ],
pop_game_finish: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "916d1/c0zhKrLwMP79sEhb1", "pop_game_finish");
cc.Class({
extends: cc.Component,
properties: {
game_sprite: cc.Node,
items: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into pop game finish js");
for (var t = 0; t < this.items.length; t++) {
this.items[t].active = !1;
}
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
r.destroy();
}
}
}, r.game_sprite);
},
init_info: function(t) {
for (var e = 0; e < t.length; e++) {
var i = t[e].getComponent("tdk_player"), n = this.items[e];
this.set_item_info(n, i);
n.active = !0;
}
},
set_item_info: function(t, e) {
var i = t.getChildByName("user_layout"), n = i.getChildByName("user_sprite"), o = i.getChildByName("user_label"), s = t.getChildByName("slabel"), r = t.getChildByName("elabel"), a = t.getChildByName("dlabel");
s.string = e.start_gold;
r.string = e.my_gold;
a.string = e.my_gold - e.start_gold;
o.string = e.nick_name;
n.SpriteFrame = e.mobile_sprite.getChildByName("man").SpriteFrame;
}
});
cc._RF.pop();
}, {} ],
pop_game_user: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "77e12SZ3t9C0LJP2smCdIy0", "pop_game_user");
cc.Class({
extends: cc.Component,
properties: {
bg_sprite: cc.Node,
shoe_node: cc.Node,
egg_node: cc.Node,
bomb_node: cc.Node,
kiss_node: cc.Node,
flower_node: cc.Node,
cheer_node: cc.Node,
vnickname_lable: cc.Label,
vacount_label: cc.Label,
vlevel_label: cc.Label,
vfangka_label: cc.Label,
vuid_label: cc.Label,
vsex_label: cc.Label,
vvip_label: cc.Label,
vdiamon_label: cc.Label,
vsign_label: cc.Label,
call_back: null,
location: null
},
onLoad: function() {
cc.log("start go into pop game player js");
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, r.bg_sprite);
},
init_info: function(t, e) {
this.vnickname_lable.string = t.player.nickName;
this.vacount_label.string = "1234567890";
this.vlevel_label.string = "0";
this.vfangka_label.string = t.player.fangka;
this.vuid_label.string = "12345566";
1 == t.player.gender ? this.vsex_label.string = "男" : this.vsex_label.string = "女";
this.vvip_label.string = t.player.vip;
this.vdiamon_label.string = t.player.diamond;
this.vsign_label.string = t.player.signature;
this.node.active = !0;
this.call_back = e;
this.location = t.location;
this.send_from = t.send_from;
},
hide: function() {
this.node.active = !1;
},
button_call: function(t, e) {
cc.log("button call", e);
this.node.active = !1;
this.node.destroy();
this.call_back(this.node.parent, e, this.send_from, this.location);
},
test_t: function() {
this.vnickname_lable.string = "11111111";
this.vacount_label.string = "1234567890";
this.vlevel_label.string = "0";
this.vfangka_label.string = "1111111";
this.vuid_label.string = "12345566";
this.vsex_label.string = "男";
this.vvip_label.string = 1;
this.vdiamon_label.string = 1;
this.vsign_label.string = "111111111";
this.node.active = !0;
}
});
cc._RF.pop();
}, {} ],
pop_set_scene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "c1654vYXBxIRJSIRRdRbbW9", "pop_set_scene");
cc.Class({
extends: cc.Component,
properties: {
choice_sprite: {
type: cc.Sprite,
default: []
},
callback: null
},
onLoad: function() {
cc.log("start go into create game js");
var r = this;
this.init_back_info();
r.node.on("pressed", r.switchRadio, r);
var t = r.node.getChildByName("bg_sprite");
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, t);
},
init_back_info: function() {
g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
g_sound_key = cc.sys.localStorage.getItem(SOUND_KEY);
g_chat_key = cc.sys.localStorage.getItem(CHAT_KEY);
for (var t = [ g_music_key, g_sound_key, g_chat_key, 0 ], e = 0; e < this.choice_sprite.length; e++) {
var i = this.choice_sprite[e];
t[e] == BOOL.NO ? i.spriteFrame = g_assets.set_close : i.spriteFrame = g_assets.set_open;
}
},
set_callback: function(t) {
this.callback = t;
},
buttonCloseCallback: function() {
console.log("running buttonCloseCallback:function()");
this.node.active = !1;
this.destroy();
},
buttonMusicSettingCallback: function() {
var t = this.choice_sprite[0];
if (g_music_key == BOOL.NO) {
g_music_key = BOOL.YES;
cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.YES);
t.spriteFrame = g_assets.set_open;
} else {
g_music_key = BOOL.NO;
cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.NO);
t.spriteFrame = g_assets.set_close;
}
},
buttonSoundSettingCallback: function() {
var t = this.choice_sprite[1];
if (g_sound_key == BOOL.NO) {
g_sound_key = BOOL.YES;
cc.sys.localStorage.setItem(SOUND_KEY, BOOL.YES);
t.spriteFrame = g_assets.set_open;
} else {
g_sound_key = BOOL.NO;
cc.sys.localStorage.setItem(SOUND_KEY, BOOL.NO);
t.spriteFrame = g_assets.set_close;
}
},
buttonChatSettingCallback: function() {
var t = this.choice_sprite[2];
if (g_chat_key == BOOL.NO) {
g_chat_key = BOOL.YES;
cc.sys.localStorage.setItem(CHAT_KEY, BOOL.YES);
t.spriteFrame = g_assets.set_open;
} else {
g_chat_key = BOOL.NO;
cc.sys.localStorage.setItem(CHAT_KEY, BOOL.NO);
t.spriteFrame = g_assets.set_close;
}
},
buttonShockSettingCallback: function() {},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
0 == e ? this.buttonMusicSettingCallback() : 1 == e ? this.buttonSoundSettingCallback() : 2 == e ? this.buttonChatSettingCallback() : 3 == e && this.buttonShockSettingCallback();
this.callback(e);
}
});
cc._RF.pop();
}, {} ],
prop_error_info: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "71d84sx7uBPEYQV97jT63Ze", "prop_error_info");
cc.Class({
extends: cc.Component,
properties: {
message: cc.Label,
error_sprite: cc.Sprite
},
onLoad: function() {
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, this.error_sprite);
},
show_error_info: function(t) {
this.message.string = t;
this.node.runAction(cc.fadeOut(3));
}
});
cc._RF.pop();
}, {} ],
protobuf: [ function(t, n, e) {
"use strict";
cc._RF.push(n, "27d1cdsWbJCp6+gJ11UoKmu", "protobuf");
(function(t, e) {
var i = t;
i.init = function(t) {
i.encoder.init(t.encoderProtos);
i.decoder.init(t.decoderProtos);
};
i.encode = function(t, e) {
return i.encoder.encode(t, e);
};
i.decode = function(t, e) {
return i.decoder.decode(t, e);
};
n.exports = i;
"undefined" != typeof window && (window.protobuf = i);
})("undefined" == typeof window ? n.exports : {});
(("undefined" != typeof protobuf ? protobuf : n.exports).constants = {}).TYPES = {
uInt32: 0,
sInt32: 0,
int32: 0,
double: 1,
string: 2,
message: 2,
float: 5
};
(("undefined" != typeof protobuf ? protobuf : n.exports).util = {}).isSimpleType = function(t) {
return "uInt32" === t || "sInt32" === t || "int32" === t || "uInt64" === t || "sInt64" === t || "float" === t || "double" === t;
};
(function(t, e) {
var i = t.codec = {}, n = new ArrayBuffer(8), o = new Float32Array(n), s = new Float64Array(n), r = new Uint8Array(n);
i.encodeUInt32 = function(t) {
t = parseInt(t);
if (isNaN(t) || t < 0) return null;
var e = [];
do {
var i = t % 128, n = Math.floor(t / 128);
0 !== n && (i += 128);
e.push(i);
t = n;
} while (0 !== t);
return e;
};
i.encodeSInt32 = function(t) {
t = parseInt(t);
if (isNaN(t)) return null;
t = t < 0 ? 2 * Math.abs(t) - 1 : 2 * t;
return i.encodeUInt32(t);
};
i.decodeUInt32 = function(t) {
for (var e = 0, i = 0; i < t.length; i++) {
var n = parseInt(t[i]);
e += (127 & n) * Math.pow(2, 7 * i);
if (n < 128) return e;
}
return e;
};
i.decodeSInt32 = function(t) {
var e = this.decodeUInt32(t);
return e = (e % 2 + e) / 2 * (e % 2 == 1 ? -1 : 1);
};
i.encodeFloat = function(t) {
o[0] = t;
return r;
};
i.decodeFloat = function(t, e) {
if (!t || t.length < e + 4) return null;
for (var i = 0; i < 4; i++) r[i] = t[e + i];
return o[0];
};
i.encodeDouble = function(t) {
s[0] = t;
return r.subarray(0, 8);
};
i.decodeDouble = function(t, e) {
if (!t || t.length < 8 + e) return null;
for (var i = 0; i < 8; i++) r[i] = t[e + i];
return s[0];
};
i.encodeStr = function(t, e, i) {
for (var n = 0; n < i.length; n++) for (var o = a(i.charCodeAt(n)), s = 0; s < o.length; s++) {
t[e] = o[s];
e++;
}
return e;
};
i.decodeStr = function(t, e, i) {
for (var n = [], o = e + i; e < o; ) {
var s = 0;
if (t[e] < 128) {
s = t[e];
e += 1;
} else if (t[e] < 224) {
s = ((63 & t[e]) << 6) + (63 & t[e + 1]);
e += 2;
} else {
s = ((15 & t[e]) << 12) + ((63 & t[e + 1]) << 6) + (63 & t[e + 2]);
e += 3;
}
n.push(s);
}
for (var r = "", a = 0; a < n.length; ) {
r += String.fromCharCode.apply(null, n.slice(a, a + 1e4));
a += 1e4;
}
return r;
};
i.byteLength = function(t) {
if ("string" != typeof t) return -1;
for (var e = 0, i = 0; i < t.length; i++) {
e += c(t.charCodeAt(i));
}
return e;
};
function a(t) {
return t <= 127 ? [ t ] : t <= 2047 ? [ 192 | t >> 6, 128 | 63 & t ] : [ 224 | t >> 12, 128 | (4032 & t) >> 6, 128 | 63 & t ];
}
function c(t) {
return t <= 127 ? 1 : t <= 2047 ? 2 : 3;
}
})("undefined" != typeof protobuf ? protobuf : n.exports);
(function(t, e) {
var i = t, n = t.encoder = {}, c = i.codec, o = i.constants, r = i.util;
n.init = function(t) {
this.protos = t || {};
};
n.encode = function(t, e) {
var i = this.protos[t];
if (!function t(e, i) {
if (!i) return !1;
for (var n in i) {
var o = i[n];
switch (o.option) {
case "required":
if ("undefined" == typeof e[n]) return !1;

case "optional":
"undefined" != typeof e[n] && i.__messages[o.type] && t(e[n], i.__messages[o.type]);
break;

case "repeated":
if (e[n] && i.__messages[o.type]) for (var s = 0; s < e[n].length; s++) if (!t(e[n][s], i.__messages[o.type])) return !1;
}
}
return !0;
}(e, i)) return null;
var n = c.byteLength(JSON.stringify(e)), o = new ArrayBuffer(n), s = new Uint8Array(o), r = 0;
return i && 0 < (r = h(s, r, i, e)) ? s.subarray(0, r) : null;
};
function h(t, e, i, n) {
for (var o in n) if (i[o]) {
var s = i[o];
switch (s.option) {
case "required":
case "optional":
e = p(t, e, u(s.type, s.tag));
e = a(n[o], s.type, e, t, i);
break;

case "repeated":
0 < n[o].length && (e = l(n[o], s, e, t, i));
}
}
return e;
}
function a(t, e, i, n, o) {
switch (e) {
case "uInt32":
i = p(n, i, c.encodeUInt32(t));
break;

case "int32":
case "sInt32":
i = p(n, i, c.encodeSInt32(t));
break;

case "float":
p(n, i, c.encodeFloat(t));
i += 4;
break;

case "double":
p(n, i, c.encodeDouble(t));
i += 8;
break;

case "string":
var s = c.byteLength(t);
i = p(n, i, c.encodeUInt32(s));
c.encodeStr(n, i, t);
i += s;
break;

default:
if (o.__messages[e]) {
var r = new ArrayBuffer(c.byteLength(JSON.stringify(t)));
s = h(r, s = 0, o.__messages[e], t);
i = p(n, i, c.encodeUInt32(s));
for (var a = 0; a < s; a++) {
n[i] = r[a];
i++;
}
}
}
return i;
}
function l(t, e, i, n, o) {
var s = 0;
if (r.isSimpleType(e.type)) {
i = p(n, i = p(n, i, u(e.type, e.tag)), c.encodeUInt32(t.length));
for (s = 0; s < t.length; s++) i = a(t[s], e.type, i, n);
} else for (s = 0; s < t.length; s++) {
i = p(n, i, u(e.type, e.tag));
i = a(t[s], e.type, i, n, o);
}
return i;
}
function p(t, e, i) {
for (var n = 0; n < i.length; n++, e++) t[e] = i[n];
return e;
}
function u(t, e) {
var i = o.TYPES[t] || 2;
return c.encodeUInt32(e << 3 | i);
}
})("undefined" != typeof protobuf ? protobuf : n.exports);
(function(t, e) {
var a, i = t, n = t.decoder = {}, c = i.codec, s = i.util, h = 0;
n.init = function(t) {
this.protos = t || {};
};
n.setProtos = function(t) {
t && (this.protos = t);
};
n.decode = function(t, e) {
var i = this.protos[t];
a = e;
h = 0;
return i ? l({}, i, a.length) : null;
};
function l(t, e, i) {
for (;h < i; ) {
var n = (void 0, {
type: 7 & (r = c.decodeUInt32(_())),
tag: r >> 3
}), o = n.tag, s = e.__tags[o];
switch (e[s].option) {
case "optional":
case "required":
t[s] = p(e[s].type, e);
break;

case "repeated":
t[s] || (t[s] = []);
u(t[s], e[s].type, e);
}
}
var r;
return t;
}
function p(t, e) {
switch (t) {
case "uInt32":
return c.decodeUInt32(_());

case "int32":
case "sInt32":
return c.decodeSInt32(_());

case "float":
var i = c.decodeFloat(a, h);
h += 4;
return i;

case "double":
var n = c.decodeDouble(a, h);
h += 8;
return n;

case "string":
var o = c.decodeUInt32(_()), s = c.decodeStr(a, h, o);
h += o;
return s;

default:
if (e && e.__messages[t]) {
o = c.decodeUInt32(_());
var r = {};
l(r, e.__messages[t], h + o);
return r;
}
}
}
function u(t, e, i) {
if (s.isSimpleType(e)) for (var n = c.decodeUInt32(_()), o = 0; o < n; o++) t.push(p(e)); else t.push(p(e, i));
}
function _(t) {
var e, i = [], n = h;
t = t || !1;
do {
e = a[n];
i.push(e);
n++;
} while (128 <= e);
t || (h = n);
return i;
}
})("undefined" != typeof protobuf ? protobuf : n.exports);
cc._RF.pop();
}, {} ],
protocol: [ function(t, n, e) {
(function(t) {
"use strict";
cc._RF.push(n, "33a92JJsX1FX7opbirwgfli", "protocol");
(function(t, g, e) {
var d = t, i = d.Package = {}, o = d.Message = {};
i.TYPE_HANDSHAKE = 1;
i.TYPE_HANDSHAKE_ACK = 2;
i.TYPE_HEARTBEAT = 3;
i.TYPE_DATA = 4;
i.TYPE_KICK = 5;
o.TYPE_REQUEST = 0;
o.TYPE_NOTIFY = 1;
o.TYPE_RESPONSE = 2;
o.TYPE_PUSH = 3;
d.strencode = function(t) {
for (var e = new g(3 * t.length), i = 0, n = 0; n < t.length; n++) {
var o = t.charCodeAt(n), s = null;
s = o <= 127 ? [ o ] : o <= 2047 ? [ 192 | o >> 6, 128 | 63 & o ] : [ 224 | o >> 12, 128 | (4032 & o) >> 6, 128 | 63 & o ];
for (var r = 0; r < s.length; r++) {
e[i] = s[r];
++i;
}
}
var a = new g(i);
f(a, 0, e, 0, i);
return a;
};
d.strdecode = function(t) {
for (var e = new g(t), i = [], n = 0, o = 0, s = e.length; n < s; ) {
if (e[n] < 128) {
o = e[n];
n += 1;
} else if (e[n] < 224) {
o = ((63 & e[n]) << 6) + (63 & e[n + 1]);
n += 2;
} else {
o = ((15 & e[n]) << 12) + ((63 & e[n + 1]) << 6) + (63 & e[n + 2]);
n += 3;
}
i.push(o);
}
return String.fromCharCode.apply(null, i);
};
i.encode = function(t, e) {
var i = e ? e.length : 0, n = new g(4 + i), o = 0;
n[o++] = 255 & t;
n[o++] = i >> 16 & 255;
n[o++] = i >> 8 & 255;
n[o++] = 255 & i;
e && f(n, 4, e, 0, i);
return n;
};
i.decode = function(t) {
for (var e = 0, i = new g(t), n = 0, o = []; e < i.length; ) {
var s = i[e++], r = (n = (i[e++] << 16 | i[e++] << 8 | i[e++]) >>> 0) ? new g(n) : null;
f(r, 0, i, e, n);
e += n;
o.push({
type: s,
body: r
});
}
return 1 === o.length ? o[0] : o;
};
o.encode = function(t, e, i, n, o) {
var s = 1 + (m(e) ? c(t) : 0);
if (y(e)) if (i) {
if ("number" != typeof n) throw new Error("error flag for number route!");
s += 2;
} else {
s += 1;
if (n) {
if (255 < (n = d.strencode(n)).length) throw new Error("route maxlength is overflow");
s += n.length;
}
}
o && (s += o.length);
var r = new g(s), a = 0;
a = h(e, i, r, a);
m(e) && (a = l(t, r, a));
y(e) && (a = p(i, n, r, a));
o && (a = u(o, r, a));
return r;
};
o.decode = function(t) {
var e = new g(t), i = e.length || e.byteLength, n = 0, o = 0, s = null, r = e[n++], a = 1 & r, c = r >> 1 & 7;
if (m(c)) {
var h = parseInt(e[n]), l = 0;
do {
o += (127 & (h = parseInt(e[n]))) * Math.pow(2, 7 * l);
n++;
l++;
} while (128 <= h);
}
if (y(c)) if (a) s = e[n++] << 8 | e[n++]; else {
var p = e[n++];
if (p) {
s = new g(p);
f(s, 0, e, n, p);
s = d.strdecode(s);
} else s = "";
n += p;
}
var u = i - n, _ = new g(u);
f(_, 0, e, n, u);
return {
id: o,
type: c,
compressRoute: a,
route: s,
body: _
};
};
var f = function(t, e, i, n, o) {
if ("function" == typeof i.copy) i.copy(t, e, n, n + o); else for (var s = 0; s < o; s++) t[e++] = i[n++];
}, m = function(t) {
return t === o.TYPE_REQUEST || t === o.TYPE_RESPONSE;
}, y = function(t) {
return t === o.TYPE_REQUEST || t === o.TYPE_NOTIFY || t === o.TYPE_PUSH;
}, c = function(t) {
var e = 0;
do {
e += 1;
t >>= 7;
} while (0 < t);
return e;
}, h = function(t, e, i, n) {
if (t !== o.TYPE_REQUEST && t !== o.TYPE_NOTIFY && t !== o.TYPE_RESPONSE && t !== o.TYPE_PUSH) throw new Error("unkonw message type: " + t);
i[n] = t << 1 | (e ? 1 : 0);
return n + 1;
}, l = function(t, e, i) {
do {
var n = t % 128, o = Math.floor(t / 128);
0 !== o && (n += 128);
e[i++] = n;
t = o;
} while (0 !== t);
return i;
}, p = function(t, e, i, n) {
if (t) {
if (65535 < e) throw new Error("route number is overflow");
i[n++] = e >> 8 & 255;
i[n++] = 255 & e;
} else if (e) {
i[n++] = 255 & e.length;
f(i, n, e, 0, e.length);
n += e.length;
} else i[n++] = 0;
return n;
}, u = function(t, e, i) {
f(e, i, t, 0, t.length);
return i + t.length;
};
n.exports = d;
"undefined" != typeof window && (window.Protocol = d);
})("undefined" == typeof window ? n.exports : {}, "undefined" == typeof window ? t : Uint8Array);
cc._RF.pop();
}).call(this, t("buffer").Buffer);
}, {
buffer: 2
} ],
select_compare: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e1efdlK4kpDhaXtMJGLPm0j", "select_compare");
cc.Class({
extends: cc.Component,
properties: {
my_selects: {
type: cc.Node,
default: []
},
callback: null
},
onLoad: function() {
cc.log("start go into select comparejs");
var r = this;
r.node.on("pressed", r.switchRadio, r);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, r.node);
},
set_which_select: function(t) {
cc.log(JSON.stringify(t));
for (var e = 0; e < t.length; e++) {
var i = t[e] - 1;
this.my_selects[i].active = !0;
}
},
set_callback: function(t) {
this.callback = t;
},
switchRadio: function(t) {
var e = t.target.getComponent("bipai_choice").index, i = t.target.getComponent("bipai_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
this.callback(e);
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
shai_zhong_active: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "58e85sjqZxHDJ0WY84Xehq9", "shai_zhong_active");
cc.Class({
extends: cc.Component,
properties: {
shai_zhong: cc.Node,
shaizi_layout: cc.Node,
shaizi_1: cc.Sprite,
shaizi_2: cc.Sprite,
sz_num_1: 0,
sz_num_2: 0,
callback: null,
anim: null,
animStatus: null
},
onLoad: function() {},
init_start: function(t, e, i) {
cc.log("load 筛盅 active class");
this.callback = t;
this.sz_num_1 = e;
this.sz_num_2 = i;
this.shaizi_layout.active = !1;
this.anim = this.shai_zhong.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("shai_zhong_active");
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 3;
},
onFinished: function() {
var t = this;
cc.log("shoe active finish", this.isValid);
t.shaizi_layout.active = !0;
t.shaizi_1.spriteFrame = g_assets["shaizi_" + t.sz_num_1];
t.shaizi_2.spriteFrame = g_assets["shaizi_" + t.sz_num_2];
t.node.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(1), cc.callFunc(function() {
null != t.callback && t.callback();
t.node.parent = null;
t.node.destroy();
})));
}
});
cc._RF.pop();
}, {} ],
shoe_active: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "dfb59ONzBZFg59ZmmgPe0+v", "shoe_active");
cc.Class({
extends: cc.Component,
properties: {
is_start: !1,
shoe_active: cc.Node,
egg_active: cc.Node,
bomb_active: cc.Node,
kiss_active: cc.Node,
flower_active: cc.Node,
cheers_active: cc.Node,
show_type: 0,
is_finish: !1,
anim: null,
animStatus: null
},
onLoad: function() {
cc.log("load gift active class");
this.shoe_active.active = !1;
this.egg_active.active = !1;
this.bomb_active.active = !1;
this.kiss_active.active = !1;
this.flower_active.active = !1;
this.cheers_active.active = !1;
this.show_shoe();
},
onFinished: function() {
cc.log("shoe active finish", this.isValid);
1 == this.show_type ? this.shoe_active.active = !1 : 2 == this.show_type ? this.egg_active.active = !1 : 3 == this.show_type ? this.bomb_active.active = !1 : 4 == this.show_type ? this.kiss_active.active = !1 : 5 == this.show_type ? this.flower_active.active = !1 : 6 == this.show_type && (this.cheers_active.active = !1);
this.is_finish = !0;
this.is_start = !1;
this.node.parent = null;
this.node.destroy();
},
show_shoe: function(t, e) {
var a = this;
cc.loader.loadResDir("", cc.SpriteFrame, function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
a.rate = a.rate + 1;
cc.log("load res :" + e[i].name);
}
});
cc.loader.loadResDir("prefab", function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
a.rate = a.rate + 1;
cc.log("load res :" + e[i].name);
}
var n = cc.instantiate(g_assets.shoe_active);
a.node.addChild(n);
n.setPosition(cc.p(0, 0));
var o = cc.moveTo(.5, cc.p(100, 100)), s = cc.rotateBy(.5, 360);
cc.spawn(o, s);
n.runAction(o);
var r = n.getComponent(cc.Animation).play("shoe_active");
r.wrapMode = cc.WrapMode.Normal;
r.wrapMode = cc.WrapMode.Loop;
r.repeatCount = 1;
});
},
show_egg: function() {
this.show_type = 2;
this.egg_active.active = !0;
this.anim = this.egg_active.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("egg_active");
this.is_start = !0;
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
},
show_bomb: function() {
this.show_type = 3;
this.bomb_active.active = !0;
this.anim = this.bomb_active.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("bomb_active");
this.is_start = !0;
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
},
show_kiss: function() {
this.show_type = 4;
this.kiss_active.active = !0;
this.anim = this.kiss_active.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("kiss_active");
this.is_start = !0;
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
},
show_flower: function() {
this.show_type = 5;
this.flower_active.active = !0;
this.anim = this.flower_active.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("flower_active");
this.is_start = !0;
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
},
show_cheers: function() {
this.show_type = 6;
this.cheers_active.active = !0;
this.anim = this.cheers_active.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("cheers_active");
this.is_start = !0;
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
}
});
cc._RF.pop();
}, {} ],
tdk_player_item: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "aa71a6xydlEjbhSZYFLngmV", "tdk_player_item");
cc.Class({
extends: cc.Component,
properties: {
player_name: cc.Label,
score: cc.Label,
status: cc.Sprite,
cards: {
type: cc.Node,
default: []
}
},
onLoad: function() {},
set_card_info: function(t, e, i) {
cc.log("tdk player item:", t, e, i);
var n = this.cards[t];
n.getComponent(cc.Sprite).spriteFrame = g_assets["tdk_" + e];
n.getChildByName("card_label").getComponent(cc.Label).string = g_Puke[i];
}
});
cc._RF.pop();
}, {} ],
tdk_player: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "028ffRybvBD86qaxXFtjPlE", "tdk_player");
cc.Class({
extends: cc.Component,
properties: {
id: 0,
nick_name: null,
my_gold: 0,
start_gold: 0,
my_chip1: 0,
my_chip2: 0,
position_server: 0,
player_position: 0,
check_card: !1,
is_power: 0,
mobile_sprite: cc.Sprite,
counter_timer: cc.Node,
status_sprite: cc.Sprite,
game_sprite: cc.Sprite,
nick_name_label: cc.Label,
chips_label: cc.Node,
gold_label: cc.Label,
my_cards: {
type: cc.Node,
default: []
},
selected_cards: {
type: cc.Node,
default: []
}
},
init: function(t) {
cc.log("tdk_player init: " + JSON.stringify(t));
this.id = t[0];
this.position_server = t[1];
this.is_power = t[2];
this.nick_name = t[3];
this.my_gold = t[4];
this.nick_name_label.getComponent(cc.Label).string = this.nick_name;
this.gold_label.getComponent(cc.Label).string = this.my_gold;
},
start_timer: function() {
this.counter_timer.getComponent("count_timer").start_timer();
},
stop_timer: function() {
this.counter_timer.getComponent("count_timer").stop_timer();
},
setSpriteStatus: function(t) {
console.log("zjh_player setSpriteStatus:" + t);
this.status_sprite.spriteFrame = g_assets[t];
this.status_sprite.node.active = !0;
},
setGameStatus: function(t) {
console.log("zjh_player setSpriteStatus:" + t);
this.game_sprite.spriteFrame = g_assets[t];
this.game_sprite.node.active = !0;
},
install_chip_label: function(t) {
cc.log("install_chip_label");
if (1 == t) {
cc.log("install chips_label zhuang");
this.chips_label = cc.instantiate(g_assets.chip_bg_zhuang);
} else if (1 == this.player_position) {
cc.log("install chips_label 1");
this.chips_label = cc.instantiate(g_assets.chip_bg_1);
} else if (2 == this.player_position) {
cc.log("install chips_label 2");
this.chips_label = cc.instantiate(g_assets.chip_bg_2);
} else if (3 == this.player_position) {
cc.log("install chips_label 3");
this.chips_label = cc.instantiate(g_assets.chip_bg_3);
} else if (4 == this.player_position) {
cc.log("install chips_label 4");
this.chips_label = cc.instantiate(g_assets.chip_bg_4);
}
this.node.parent.addChild(this.chips_label);
if (0 == t) {
this.chips_label.getChildByName("chip_up").getComponent(cc.Label).string = 0;
this.chips_label.getChildByName("chip_down").getComponent(cc.Label).string = 0;
}
},
set_chips: function(t, e) {
cc.log("set_chips idx:" + t + " chip:" + e);
if (1 == t) {
this.chips_label.getChildByName("chip_up").getComponent(cc.Label).string = e;
this.my_chip1 = e;
} else if (2 == t) {
this.chips_label.getChildByName("chip_down").getComponent(cc.Label).string = e;
this.my_chip2 = e;
}
},
remove_select_cards: function() {
for (var t = 0; t < this.selected_cards.length; t++) for (var e = this.selected_cards[t], i = 0; i < this.my_cards.length; i++) if (e == this.my_cards[i]) {
this.my_cards.splice(i, 1);
break;
}
this.selected_cards.splice(0, this.selected_cards.length);
},
resetSelectCard: function() {
for (var t = 0; t < this.selected_cards.length; t++) {
this.selected_cards[t].getComponent("zhq_card").menuCallbackButton();
}
this.selected_cards.splice(0, this.selected_cards.length);
},
addPlayerCard: function() {
var t = cc.instantiate(g_assets.pj_card);
t.getComponent("pj_card").id = this.my_cards.length;
this.node.parent.addChild(t);
this.my_cards.push(t);
return t;
},
set_card_sprite: function(t, e, i) {
cc.log("set_card_sprite: idx" + t + " suit:" + e + " rank:" + i);
this.my_cards[t].getComponent("pj_card").initCardSprite(e, i);
},
remove_cards: function() {
for (var t = 0; t < this.my_cards.length; t++) {
this.my_cards[t].destroy();
}
this.my_cards.splice(0, this.my_cards.length);
},
hide_status_sprite: function() {
this.status_sprite.node.active = !1;
},
hide_game_sprite: function() {
this.game_sprite.node.active = !1;
},
resetMoneyLabel: function(t) {
this.my_gold = t;
this.gold_label.string = t;
}
});
cc._RF.pop();
}, {} ],
test: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "17b36kiCZ5IJZX6Uq0Yxa9F", "test");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {}
});
cc._RF.pop();
}, {} ],
threedes: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ab00fX5W+5NP7hxzlBM9JEn", "threedes");
cc._RF.pop();
}, {} ],
zhq_create_game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "c8795nffhdCJYdcRWKLd5x3", "zhq_create_game");
cc.Class({
extends: cc.Component,
properties: {
jushu: 20,
dizhu: 100,
renshu: 4,
fangka: 1,
tianxuan: 0,
game_type: "ZHQ",
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into create game js");
var r = this;
r.dizhu = 100;
r.renshu = 4;
r.jushu = 20;
r.fangka = 1;
r.tianxuan = 0;
r.node.on("pressed", r.switchRadio, r);
var t = r.node.getChildByName("bg_sprite");
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, t);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_radios.length; n++) {
var o = this.choice_radios[n].getComponent("one_choice");
if (o.type == i) if (o.index == e) {
if (1 == i) {
this.jushu = 20 * e;
this.fangka = e;
} else 2 == i ? this.renshu = 3 + e : 3 == i && (this.tianxuan = e - 1);
o.pitchOn();
} else o.lifeUp();
}
cc.log("select jushu" + this.jushu + " fangka:" + this.fangka + " renshu:" + this.renshu + " tianxuan:" + this.tianxuan);
},
start: function() {},
create_game: function() {
var i = this, n = cc.director.getVisibleSize(), t = {
playerId: g_user.playerId,
roomType: this.game_type,
maxChip: this.dizhu,
renShu: this.renshu,
tianXuan: this.tianxuan,
juShu: this.jushu,
fangKa: this.fangka
};
room_create(t, function(t) {
var e = cc.instantiate(g_assets.prop_error_scene);
e.getComponent("prop_error_info").show_error_info(t);
i.node.addChild(e);
e.setPosition(i.node.convertToNodeSpace(n.width / 2, n.height / 2));
cc.log(t);
});
}
});
cc._RF.pop();
}, {} ],
zjh_compare: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3583bFm+c5C86nHjWxeFmm6", "zjh_compare");
cc.Class({
extends: cc.Component,
properties: {
bg_sprite: cc.Sprite,
left_name_label: cc.Label,
right_name_label: cc.Label,
left_cards: {
type: cc.Sprite,
default: []
},
right_cards: {
type: cc.Sprite,
default: []
},
dianshan: cc.Sprite,
is_finish: !1,
is_start: !1,
anim: null,
animStatus: null,
duration: 0
},
onLoad: function() {
cc.log("load dianji class");
this.is_finish = !1;
this.anim = this.bg_sprite.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
},
init_info: function(t, e) {
this.left_name_label.string = t;
this.right_name_label.string = e;
},
bipai_start: function(t) {
var e = this;
e.is_finish = !1;
setTimeout(function() {
e.animStatus = e.anim.play("dianshan");
e.is_start = !0;
e.animStatus.wrapMode = cc.WrapMode.Normal;
e.animStatus.wrapMode = cc.WrapMode.Loop;
e.animStatus.repeatCount = 3;
}, 1e3 * t);
},
onFinished: function() {
cc.log("zjh compare finish", this.isValid);
this.is_finish = !0;
this.is_start = !1;
this.node.parent = null;
this.node.destroy();
},
get_cur_time: function() {
return 1 == this.is_start ? this.animStatus.time / this.animStatus.speed * 3 : this.animStatus.duration / this.animStatus.speed * 3;
},
get_card_position: function(t) {
var e = t;
"cc.Sprite" == e.__cid__ && (e = e.node);
for (var i = cc.p(e.getPosition()); null != e.parent; ) {
"cc.Sprite" == e.__cid__ && (e = e.node);
if (e == this.node) break;
var n = e.parent, o = n.getPosition();
i.x = o.x + i.x;
i.y = o.y + i.y;
e = n;
}
return i;
},
test: function() {
this.bipai_start(1.5);
var t = this;
setTimeout(function() {
cc.log(t.animStatus.duration, t.animStatus.time, t.animStatus.speed);
}, 2e3);
}
});
cc._RF.pop();
}, {} ],
zjh_create_game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "de7b5RyeWxEvbI7/S89B7ZU", "zjh_create_game");
cc.Class({
extends: cc.Component,
properties: {
jushu: 20,
dizhu: 100,
shangxian: 300,
fangka: 1,
game_type: "ZJH",
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into create game js");
var r = this;
r.dizhu = 100;
r.shangxian = 300;
r.jushu = 20;
r.fangka = 1;
r.node.on("pressed", r.switchRadio, r);
var t = r.node.getChildByName("bg_sprite");
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpace(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, t);
},
switchRadio: function(t) {
for (var e = [ 1, 3, 5, 8, 10 ], i = t.target.getComponent("one_choice").index, n = t.target.getComponent("one_choice").type, o = 0; o < this.choice_radios.length; o++) {
var s = this.choice_radios[o].getComponent("one_choice");
if (s.type == n) if (s.index == i) {
if (1 == n) {
this.jushu = 20 * i;
this.fangka = i;
} else 2 == n && (this.shangxian = 100 * e[i]);
s.pitchOn();
} else s.lifeUp();
}
cc.log("select jushu" + this.jushu + " fangka:" + this.fangka + " shangxian:" + this.shangxian);
},
start: function() {},
create_game: function() {
var i = this, n = cc.director.getVisibleSize(), t = {
playerId: g_user.playerId,
roomType: this.game_type,
maxChip: this.shangxian,
juShu: this.jushu,
fangKa: this.fangka
};
room_create(t, function(t) {
var e = cc.instantiate(g_assets.prop_error_scene);
e.getComponent("prop_error_info").show_error_info(t);
i.node.addChild(e);
e.setPosition(i.node.convertToNodeSpace(n.width / 2, n.height / 2));
cc.log(t);
});
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "LoadGame", "MainScene", "bipai_choice", "one_choice", "test", "pj_card", "add_chip", "feed_back", "pop_game_user", "prop_error_info", "shai_zhong_active", "shoe_active", "game_player_item", "pop_game_finish", "select_compare", "tdk_player_item", "zjh_compare", "count_timer", "pj_game_room", "enter_game_scene", "game_scene", "pj_create_game", "pop_enter_game", "zhq_create_game", "zjh_create_game", "Login", "Register", "msage_scroll", "tdk_player", "pop_set_scene", "buy_fangka", "main_store", "popUserLayer", "Consts", "payJS", "threedes", "emitter", "pomelo-client", "protobuf", "protocol" ]);