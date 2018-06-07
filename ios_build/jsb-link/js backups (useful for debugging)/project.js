require = function s(r, a, c) {
function l(e, t) {
if (!a[e]) {
if (!r[e]) {
var i = "function" == typeof require && require;
if (!t && i) return i(e, !0);
if (h) return h(e, !0);
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
var o = a[e] = {
exports: {}
};
r[e][0].call(o.exports, function(t) {
return l(r[e][1][t] || t);
}, o, o.exports, s, r, a, c);
}
return a[e].exports;
}
for (var h = "function" == typeof require && require, t = 0; t < c.length; t++) l(c[t]);
return l;
}({
1: [ function(t, e, i) {
"use strict";
i.byteLength = function(t) {
return 3 * t.length / 4 - _(t);
};
i.toByteArray = function(t) {
var e, i, n, o, s, r = t.length;
o = _(t);
s = new h(3 * r / 4 - o);
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
o += l[e >> 2];
o += l[e << 4 & 63];
o += "==";
} else if (2 === n) {
e = (t[i - 2] << 8) + t[i - 1];
o += l[e >> 10];
o += l[e >> 4 & 63];
o += l[e << 2 & 63];
o += "=";
}
s.push(o);
return s.join("");
};
for (var l = [], c = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, s = n.length; o < s; ++o) {
l[o] = n[o];
c[n.charCodeAt(o)] = o;
}
c["-".charCodeAt(0)] = 62;
c["_".charCodeAt(0)] = 63;
function _(t) {
var e = t.length;
if (0 < e % 4) throw new Error("Invalid string. Length must be a multiple of 4");
return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0;
}
function u(t, e, i) {
for (var n, o, s = [], r = e; r < i; r += 3) {
n = (t[r] << 16 & 16711680) + (t[r + 1] << 8 & 65280) + (255 & t[r + 2]);
s.push(l[(o = n) >> 18 & 63] + l[o >> 12 & 63] + l[o >> 6 & 63] + l[63 & o]);
}
return s.join("");
}
}, {} ],
2: [ function(e, t, I) {
(function(t) {
"use strict";
var n = e("base64-js"), s = e("ieee754"), r = e("isarray");
I.Buffer = _;
I.SlowBuffer = function(t) {
+t != t && (t = 0);
return _.alloc(+t);
};
I.INSPECT_MAX_BYTES = 50;
_.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
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
return _.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function a(t, e) {
if (i() < e) throw new RangeError("Invalid typed array length");
if (_.TYPED_ARRAY_SUPPORT) (t = new Uint8Array(e)).__proto__ = _.prototype; else {
null === t && (t = new _(e));
t.length = e;
}
return t;
}
function _(t, e, i) {
if (!(_.TYPED_ARRAY_SUPPORT || this instanceof _)) return new _(t, e, i);
if ("number" == typeof t) {
if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
return l(this, t);
}
return o(this, t, e, i);
}
_.poolSize = 8192;
_._augment = function(t) {
t.__proto__ = _.prototype;
return t;
};
function o(t, e, i, n) {
if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, i, n) {
e.byteLength;
if (i < 0 || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
if (e.byteLength < i + (n || 0)) throw new RangeError("'length' is out of bounds");
e = void 0 === i && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, i) : new Uint8Array(e, i, n);
_.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = _.prototype : t = h(t, e);
return t;
}(t, e, i, n) : "string" == typeof e ? function(t, e, i) {
"string" == typeof i && "" !== i || (i = "utf8");
if (!_.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
var n = 0 | p(e, i), o = (t = a(t, n)).write(e, i);
o !== n && (t = t.slice(0, o));
return t;
}(t, e, i) : function(t, e) {
if (_.isBuffer(e)) {
var i = 0 | u(e.length);
if (0 === (t = a(t, i)).length) return t;
e.copy(t, 0, 0, i);
return t;
}
if (e) {
if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? a(t, 0) : h(t, e);
if ("Buffer" === e.type && r(e.data)) return h(t, e.data);
}
var n;
throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}(t, e);
}
_.from = function(t, e, i) {
return o(null, t, e, i);
};
if (_.TYPED_ARRAY_SUPPORT) {
_.prototype.__proto__ = Uint8Array.prototype;
_.__proto__ = Uint8Array;
"undefined" != typeof Symbol && Symbol.species && _[Symbol.species] === _ && Object.defineProperty(_, Symbol.species, {
value: null,
configurable: !0
});
}
function c(t) {
if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
if (t < 0) throw new RangeError('"size" argument must not be negative');
}
_.alloc = function(t, e, i) {
return function(t, e, i, n) {
c(e);
return e <= 0 ? a(t, e) : void 0 !== i ? "string" == typeof n ? a(t, e).fill(i, n) : a(t, e).fill(i) : a(t, e);
}(null, t, e, i);
};
function l(t, e) {
c(e);
t = a(t, e < 0 ? 0 : 0 | u(e));
if (!_.TYPED_ARRAY_SUPPORT) for (var i = 0; i < e; ++i) t[i] = 0;
return t;
}
_.allocUnsafe = function(t) {
return l(null, t);
};
_.allocUnsafeSlow = function(t) {
return l(null, t);
};
function h(t, e) {
var i = e.length < 0 ? 0 : 0 | u(e.length);
t = a(t, i);
for (var n = 0; n < i; n += 1) t[n] = 255 & e[n];
return t;
}
function u(t) {
if (t >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
return 0 | t;
}
_.isBuffer = function(t) {
return !(null == t || !t._isBuffer);
};
_.compare = function(t, e) {
if (!_.isBuffer(t) || !_.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
if (t === e) return 0;
for (var i = t.length, n = e.length, o = 0, s = Math.min(i, n); o < s; ++o) if (t[o] !== e[o]) {
i = t[o];
n = e[o];
break;
}
return i < n ? -1 : n < i ? 1 : 0;
};
_.isEncoding = function(t) {
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
_.concat = function(t, e) {
if (!r(t)) throw new TypeError('"list" argument must be an Array of Buffers');
if (0 === t.length) return _.alloc(0);
var i;
if (void 0 === e) for (i = e = 0; i < t.length; ++i) e += t[i].length;
var n = _.allocUnsafe(e), o = 0;
for (i = 0; i < t.length; ++i) {
var s = t[i];
if (!_.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
s.copy(n, o);
o += s.length;
}
return n;
};
function p(t, e) {
if (_.isBuffer(t)) return t.length;
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
return B(t).length;

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return 2 * i;

case "hex":
return i >>> 1;

case "base64":
return j(t).length;

default:
if (n) return B(t).length;
e = ("" + e).toLowerCase();
n = !0;
}
}
_.byteLength = p;
_.prototype._isBuffer = !0;
function g(t, e, i) {
var n = t[e];
t[e] = t[i];
t[i] = n;
}
_.prototype.swap16 = function() {
var t = this.length;
if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
for (var e = 0; e < t; e += 2) g(this, e, e + 1);
return this;
};
_.prototype.swap32 = function() {
var t = this.length;
if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
for (var e = 0; e < t; e += 4) {
g(this, e, e + 3);
g(this, e + 1, e + 2);
}
return this;
};
_.prototype.swap64 = function() {
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
_.prototype.toString = function() {
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
return S(this, e, i);

case "latin1":
case "binary":
return w(this, e, i);

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
_.prototype.equals = function(t) {
if (!_.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
return this === t || 0 === _.compare(this, t);
};
_.prototype.inspect = function() {
var t = "", e = I.INSPECT_MAX_BYTES;
if (0 < this.length) {
t = this.toString("hex", 0, e).match(/.{2}/g).join(" ");
this.length > e && (t += " ... ");
}
return "<Buffer " + t + ">";
};
_.prototype.compare = function(t, e, i, n, o) {
if (!_.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
void 0 === e && (e = 0);
void 0 === i && (i = t ? t.length : 0);
void 0 === n && (n = 0);
void 0 === o && (o = this.length);
if (e < 0 || i > t.length || n < 0 || o > this.length) throw new RangeError("out of range index");
if (o <= n && i <= e) return 0;
if (o <= n) return -1;
if (i <= e) return 1;
if (this === t) return 0;
for (var s = (o >>>= 0) - (n >>>= 0), r = (i >>>= 0) - (e >>>= 0), a = Math.min(s, r), c = this.slice(n, o), l = t.slice(e, i), h = 0; h < a; ++h) if (c[h] !== l[h]) {
s = c[h];
r = l[h];
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
"string" == typeof e && (e = _.from(e, n));
if (_.isBuffer(e)) return 0 === e.length ? -1 : f(t, e, i, n, o);
if ("number" == typeof e) {
e &= 255;
return _.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : f(t, [ e ], i, n, o);
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
function l(t, e) {
return 1 === r ? t[e] : t.readUInt16BE(e * r);
}
if (o) {
var h = -1;
for (s = i; s < a; s++) if (l(t, s) === l(e, -1 === h ? 0 : s - h)) {
-1 === h && (h = s);
if (s - h + 1 === c) return h * r;
} else {
-1 !== h && (s -= s - h);
h = -1;
}
} else {
a < i + c && (i = a - c);
for (s = i; 0 <= s; s--) {
for (var _ = !0, u = 0; u < c; u++) if (l(t, s + u) !== l(e, u)) {
_ = !1;
break;
}
if (_) return s;
}
}
return -1;
}
_.prototype.includes = function(t, e, i) {
return -1 !== this.indexOf(t, e, i);
};
_.prototype.indexOf = function(t, e, i) {
return d(this, t, e, i, !0);
};
_.prototype.lastIndexOf = function(t, e, i) {
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
return F(function(t) {
for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
return e;
}(e), t, i, n);
}
_.prototype.write = function(t, e, i, n) {
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
for (var s, r, a, c, l, h, _, u, p, g = !1; ;) switch (n) {
case "hex":
return m(this, t, e, i);

case "utf8":
case "utf-8":
return u = e, p = i, F(B(t, (_ = this).length - u), _, u, p);

case "ascii":
return y(this, t, e, i);

case "latin1":
case "binary":
return y(this, t, e, i);

case "base64":
return c = this, l = e, h = i, F(j(t), c, l, h);

case "ucs2":
case "ucs-2":
case "utf16le":
case "utf-16le":
return r = e, a = i, F(function(t, e) {
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
_.prototype.toJSON = function() {
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
var c, l, h, _;
switch (a) {
case 1:
s < 128 && (r = s);
break;

case 2:
128 == (192 & (c = t[o + 1])) && 127 < (_ = (31 & s) << 6 | 63 & c) && (r = _);
break;

case 3:
c = t[o + 1];
l = t[o + 2];
128 == (192 & c) && 128 == (192 & l) && 2047 < (_ = (15 & s) << 12 | (63 & c) << 6 | 63 & l) && (_ < 55296 || 57343 < _) && (r = _);
break;

case 4:
c = t[o + 1];
l = t[o + 2];
h = t[o + 3];
128 == (192 & c) && 128 == (192 & l) && 128 == (192 & h) && 65535 < (_ = (15 & s) << 18 | (63 & c) << 12 | (63 & l) << 6 | 63 & h) && _ < 1114112 && (r = _);
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
if (e <= C) return String.fromCharCode.apply(String, t);
var i = "", n = 0;
for (;n < e; ) i += String.fromCharCode.apply(String, t.slice(n, n += C));
return i;
}(n);
}
var C = 4096;
function S(t, e, i) {
var n = "";
i = Math.min(t.length, i);
for (var o = e; o < i; ++o) n += String.fromCharCode(127 & t[o]);
return n;
}
function w(t, e, i) {
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
_.prototype.slice = function(t, e) {
var i, n = this.length;
(t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n);
(e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n);
e < t && (e = t);
if (_.TYPED_ARRAY_SUPPORT) (i = this.subarray(t, e)).__proto__ = _.prototype; else {
var o = e - t;
i = new _(o, void 0);
for (var s = 0; s < o; ++s) i[s] = this[s + t];
}
return i;
};
function E(t, e, i) {
if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
if (i < t + e) throw new RangeError("Trying to access beyond buffer length");
}
_.prototype.readUIntLE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) n += this[t + s] * o;
return n;
};
_.prototype.readUIntBE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t + --e], o = 1; 0 < e && (o *= 256); ) n += this[t + --e] * o;
return n;
};
_.prototype.readUInt8 = function(t, e) {
e || E(t, 1, this.length);
return this[t];
};
_.prototype.readUInt16LE = function(t, e) {
e || E(t, 2, this.length);
return this[t] | this[t + 1] << 8;
};
_.prototype.readUInt16BE = function(t, e) {
e || E(t, 2, this.length);
return this[t] << 8 | this[t + 1];
};
_.prototype.readUInt32LE = function(t, e) {
e || E(t, 4, this.length);
return (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
};
_.prototype.readUInt32BE = function(t, e) {
e || E(t, 4, this.length);
return 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
};
_.prototype.readIntLE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = this[t], o = 1, s = 0; ++s < e && (o *= 256); ) n += this[t + s] * o;
(o *= 128) <= n && (n -= Math.pow(2, 8 * e));
return n;
};
_.prototype.readIntBE = function(t, e, i) {
t |= 0;
e |= 0;
i || E(t, e, this.length);
for (var n = e, o = 1, s = this[t + --n]; 0 < n && (o *= 256); ) s += this[t + --n] * o;
(o *= 128) <= s && (s -= Math.pow(2, 8 * e));
return s;
};
_.prototype.readInt8 = function(t, e) {
e || E(t, 1, this.length);
return 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
};
_.prototype.readInt16LE = function(t, e) {
e || E(t, 2, this.length);
var i = this[t] | this[t + 1] << 8;
return 32768 & i ? 4294901760 | i : i;
};
_.prototype.readInt16BE = function(t, e) {
e || E(t, 2, this.length);
var i = this[t + 1] | this[t] << 8;
return 32768 & i ? 4294901760 | i : i;
};
_.prototype.readInt32LE = function(t, e) {
e || E(t, 4, this.length);
return this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
};
_.prototype.readInt32BE = function(t, e) {
e || E(t, 4, this.length);
return this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
};
_.prototype.readFloatLE = function(t, e) {
e || E(t, 4, this.length);
return s.read(this, t, !0, 23, 4);
};
_.prototype.readFloatBE = function(t, e) {
e || E(t, 4, this.length);
return s.read(this, t, !1, 23, 4);
};
_.prototype.readDoubleLE = function(t, e) {
e || E(t, 8, this.length);
return s.read(this, t, !0, 52, 8);
};
_.prototype.readDoubleBE = function(t, e) {
e || E(t, 8, this.length);
return s.read(this, t, !1, 52, 8);
};
function N(t, e, i, n, o, s) {
if (!_.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
if (o < e || e < s) throw new RangeError('"value" argument is out of bounds');
if (i + n > t.length) throw new RangeError("Index out of range");
}
_.prototype.writeUIntLE = function(t, e, i, n) {
t = +t;
e |= 0;
i |= 0;
if (!n) {
N(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
}
var o = 1, s = 0;
this[e] = 255 & t;
for (;++s < i && (o *= 256); ) this[e + s] = t / o & 255;
return e + i;
};
_.prototype.writeUIntBE = function(t, e, i, n) {
t = +t;
e |= 0;
i |= 0;
if (!n) {
N(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
}
var o = i - 1, s = 1;
this[e + o] = 255 & t;
for (;0 <= --o && (s *= 256); ) this[e + o] = t / s & 255;
return e + i;
};
_.prototype.writeUInt8 = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 1, 255, 0);
_.TYPED_ARRAY_SUPPORT || (t = Math.floor(t));
this[e] = 255 & t;
return e + 1;
};
function L(t, e, i, n) {
e < 0 && (e = 65535 + e + 1);
for (var o = 0, s = Math.min(t.length - i, 2); o < s; ++o) t[i + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
}
_.prototype.writeUInt16LE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 2, 65535, 0);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
} else L(this, t, e, !0);
return e + 2;
};
_.prototype.writeUInt16BE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 2, 65535, 0);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 8;
this[e + 1] = 255 & t;
} else L(this, t, e, !1);
return e + 2;
};
function R(t, e, i, n) {
e < 0 && (e = 4294967295 + e + 1);
for (var o = 0, s = Math.min(t.length - i, 4); o < s; ++o) t[i + o] = e >>> 8 * (n ? o : 3 - o) & 255;
}
_.prototype.writeUInt32LE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 4, 4294967295, 0);
if (_.TYPED_ARRAY_SUPPORT) {
this[e + 3] = t >>> 24;
this[e + 2] = t >>> 16;
this[e + 1] = t >>> 8;
this[e] = 255 & t;
} else R(this, t, e, !0);
return e + 4;
};
_.prototype.writeUInt32BE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 4, 4294967295, 0);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 24;
this[e + 1] = t >>> 16;
this[e + 2] = t >>> 8;
this[e + 3] = 255 & t;
} else R(this, t, e, !1);
return e + 4;
};
_.prototype.writeIntLE = function(t, e, i, n) {
t = +t;
e |= 0;
if (!n) {
var o = Math.pow(2, 8 * i - 1);
N(this, t, e, i, o - 1, -o);
}
var s = 0, r = 1, a = 0;
this[e] = 255 & t;
for (;++s < i && (r *= 256); ) {
t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1);
this[e + s] = (t / r >> 0) - a & 255;
}
return e + i;
};
_.prototype.writeIntBE = function(t, e, i, n) {
t = +t;
e |= 0;
if (!n) {
var o = Math.pow(2, 8 * i - 1);
N(this, t, e, i, o - 1, -o);
}
var s = i - 1, r = 1, a = 0;
this[e + s] = 255 & t;
for (;0 <= --s && (r *= 256); ) {
t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1);
this[e + s] = (t / r >> 0) - a & 255;
}
return e + i;
};
_.prototype.writeInt8 = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 1, 127, -128);
_.TYPED_ARRAY_SUPPORT || (t = Math.floor(t));
t < 0 && (t = 255 + t + 1);
this[e] = 255 & t;
return e + 1;
};
_.prototype.writeInt16LE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 2, 32767, -32768);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
} else L(this, t, e, !0);
return e + 2;
};
_.prototype.writeInt16BE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 2, 32767, -32768);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 8;
this[e + 1] = 255 & t;
} else L(this, t, e, !1);
return e + 2;
};
_.prototype.writeInt32LE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 4, 2147483647, -2147483648);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = 255 & t;
this[e + 1] = t >>> 8;
this[e + 2] = t >>> 16;
this[e + 3] = t >>> 24;
} else R(this, t, e, !0);
return e + 4;
};
_.prototype.writeInt32BE = function(t, e, i) {
t = +t;
e |= 0;
i || N(this, t, e, 4, 2147483647, -2147483648);
t < 0 && (t = 4294967295 + t + 1);
if (_.TYPED_ARRAY_SUPPORT) {
this[e] = t >>> 24;
this[e + 1] = t >>> 16;
this[e + 2] = t >>> 8;
this[e + 3] = 255 & t;
} else R(this, t, e, !1);
return e + 4;
};
function A(t, e, i, n, o, s) {
if (i + n > t.length) throw new RangeError("Index out of range");
if (i < 0) throw new RangeError("Index out of range");
}
function T(t, e, i, n, o) {
o || A(t, 0, i, 4);
s.write(t, e, i, n, 23, 4);
return i + 4;
}
_.prototype.writeFloatLE = function(t, e, i) {
return T(this, t, e, !0, i);
};
_.prototype.writeFloatBE = function(t, e, i) {
return T(this, t, e, !1, i);
};
function O(t, e, i, n, o) {
o || A(t, 0, i, 8);
s.write(t, e, i, n, 52, 8);
return i + 8;
}
_.prototype.writeDoubleLE = function(t, e, i) {
return O(this, t, e, !0, i);
};
_.prototype.writeDoubleBE = function(t, e, i) {
return O(this, t, e, !1, i);
};
_.prototype.copy = function(t, e, i, n) {
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
if (this === t && i < e && e < n) for (o = s - 1; 0 <= o; --o) t[o + e] = this[o + i]; else if (s < 1e3 || !_.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) t[o + e] = this[o + i]; else Uint8Array.prototype.set.call(t, this.subarray(i, i + s), e);
return s;
};
_.prototype.fill = function(t, e, i, n) {
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
if ("string" == typeof n && !_.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
} else "number" == typeof t && (t &= 255);
if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
if (i <= e) return this;
e >>>= 0;
i = void 0 === i ? this.length : i >>> 0;
t || (t = 0);
var s;
if ("number" == typeof t) for (s = e; s < i; ++s) this[s] = t; else {
var r = _.isBuffer(t) ? t : B(new _(t, n).toString()), a = r.length;
for (s = 0; s < i - e; ++s) this[s + e] = r[s % a];
}
return this;
};
var x = /[^+\/0-9A-Za-z-_]/g;
function z(t) {
return t < 16 ? "0" + t.toString(16) : t.toString(16);
}
function B(t, e) {
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
function j(t) {
return n.toByteArray(function(t) {
var e;
if ((t = (e = t, e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(x, "")).length < 2) return "";
for (;t.length % 4 != 0; ) t += "=";
return t;
}(t));
}
function F(t, e, i, n) {
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
var s, r, a = 8 * o - n - 1, c = (1 << a) - 1, l = c >> 1, h = -7, _ = i ? o - 1 : 0, u = i ? -1 : 1, p = t[e + _];
_ += u;
s = p & (1 << -h) - 1;
p >>= -h;
h += a;
for (;0 < h; s = 256 * s + t[e + _], _ += u, h -= 8) ;
r = s & (1 << -h) - 1;
s >>= -h;
h += n;
for (;0 < h; r = 256 * r + t[e + _], _ += u, h -= 8) ;
if (0 === s) s = 1 - l; else {
if (s === c) return r ? NaN : Infinity * (p ? -1 : 1);
r += Math.pow(2, n);
s -= l;
}
return (p ? -1 : 1) * r * Math.pow(2, s - n);
};
i.write = function(t, e, i, n, o, s) {
var r, a, c, l = 8 * s - o - 1, h = (1 << l) - 1, _ = h >> 1, u = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : s - 1, g = n ? 1 : -1, d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
e = Math.abs(e);
if (isNaN(e) || Infinity === e) {
a = isNaN(e) ? 1 : 0;
r = h;
} else {
r = Math.floor(Math.log(e) / Math.LN2);
if (e * (c = Math.pow(2, -r)) < 1) {
r--;
c *= 2;
}
if (2 <= (e += 1 <= r + _ ? u / c : u * Math.pow(2, 1 - _)) * c) {
r++;
c /= 2;
}
if (h <= r + _) {
a = 0;
r = h;
} else if (1 <= r + _) {
a = (e * c - 1) * Math.pow(2, o);
r += _;
} else {
a = e * Math.pow(2, _ - 1) * Math.pow(2, o);
r = 0;
}
}
for (;8 <= o; t[i + p] = 255 & a, p += g, a /= 256, o -= 8) ;
r = r << o | a;
l += o;
for (;0 < l; t[i + p] = 255 & r, p += g, r /= 256, l -= 8) ;
t[i + p - g] |= 128 * d;
};
}, {} ],
Consts: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "f7df7UuIW9LuovhAmnpX4Kz", "Consts");
cc._RF.pop();
}, {} ],
LoadUpdateGame: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b6b19y7HMRAHoYEkJT8R5rN", "LoadUpdateGame");
cc.Class({
extends: cc.Component,
properties: {
loadBar: cc.ProgressBar,
precent: cc.Label,
process_type: 0,
rate: 0,
_update_flag: !1,
source_leng: 0,
_storagePath: "",
manifestUrl: cc.RawAsset,
callback: null
},
init: function(t) {
this.callback = t;
},
onLoad: function() {
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpaceAR(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
cc.rectContainsPoint(s, n) ? cc.log("ok touch in the region......") : cc.log("touch remove from parent");
}
}, this.node);
this.updateInterval = .2;
this.source_leng = 108;
this.load_res();
this.schedule(this.load_update, .5);
},
load_update: function() {
var t = this;
this.loadBar.progress = this.rate / this.source_leng * 100;
cc.log("this.rate:" + this.rate);
if (this.rate >= this.source_leng) {
this.precent.string = "加载完成......";
this.unschedule(this.load_update);
if (cc.sys.os == cc.sys.OS_ANDROID) {
-1 != jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I") ? this.init_update() : util.show_net_error("当前网络不可用，请检查自己的网络状态", function() {
t.init_update();
});
} else this.init_update();
}
},
update: function(t) {
this.updateTimer += t;
if (!(this.updateTimer < this.updateInterval)) {
this.updateTimer = 0;
if (1 == this._update_flag) {
this._update_flag;
this.node.active = !1;
this.callback();
}
}
},
load_res: function() {
var n = this;
cc.loader.loadResDir("", cc.SpriteFrame, function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
n.rate = n.rate + 1;
n.precent.string = "加载文件中......";
cc.log("load res :" + e[i].name);
}
});
cc.loader.loadResDir("prefab", function(t, e) {
for (var i = 0; i < e.length; i++) {
g_assets[e[i].name] = e[i];
n.rate = n.rate + 1;
n.precent.string = "加载文件中......";
cc.log("load res :" + e[i].name);
}
});
},
init_update: function() {
try {
if (!cc.sys.isNative) {
this._update_flag = !0;
return;
}
this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
cc.log("Storage path for remote asset : " + this._storagePath);
this.versionCompareHandle = function(t, e) {
cc.log("JS Custom Version Compare: version A is " + t + ", version B is " + e);
for (var i = (g_version = t).split("."), n = e.split("."), o = 0; o < i.length; ++o) {
var s = parseInt(i[o]), r = parseInt(n[o] || 0);
if (s !== r) return s - r;
}
return n.length > i.length ? -1 : 0;
};
cc.log("Local manifest URL : " + this.manifestUrl);
this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS || this._am.retain();
this._am.setVerifyCallback(function(t, e) {
var i = e.compressed, n = e.md5, o = e.path;
e.size;
if (i) {
cc.log("Verification passed : " + o);
return !0;
}
cc.log("Verification passed : " + o + " (" + n + ")");
return !0;
});
if (cc.sys.os === cc.sys.OS_ANDROID) {
this._am.setMaxConcurrentTask(2);
cc.log("Max concurrent tasks count have been limited to 2");
}
this.checkUpdate();
} catch (t) {
this._update_flag = !0;
cc.log("ERROR:" + t.message);
}
},
checkCb: function(t) {
try {
cc.log("Code: " + t.getEventCode());
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.precent.string = "跳过更新......";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.precent.string = "跳过更新......";
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.precent.string = "开始更新......";
this.process_type = 1;
this.loadBar.progress = 0;
break;

default:
return;
}
cc.eventManager.removeListener(this._checkListener);
this._checkListener = null;
0 == this.process_type ? this._update_flag = !0 : this.hotUpdate();
} catch (t) {
this._update_flag = !0;
cc.log("ERROR:" + t.message);
}
},
checkUpdate: function() {
try {
this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl);
if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
this.precent.string = "加载配置文件失败 ...";
this._update_flag = !0;
return;
}
this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
cc.eventManager.addListener(this._checkListener, 1);
this._am.checkUpdate();
} catch (t) {
this._update_flag = !0;
cc.log("ERROR:" + t.message);
}
},
hotUpdate: function() {
if (this._am) {
this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
cc.eventManager.addListener(this._updateListener, 1);
this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl);
this._failCount = 0;
this._am.update();
}
},
updateCb: function(t) {
var e = !1, i = !1;
switch (t.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.precent.string = "跳过更新......";
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
this.loadBar.progress = t.getPercent();
var n = t.getMessage();
if (n) {
this.precent.string = "更新文件中.....";
cc.log(t.getPercent() / 100 + "% : " + n);
}
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.precent.string = "跳过更新......";
i = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
this.precent.string = "跟新完成......";
e = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.precent.string = "跳过更新......";
i = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
this.precent.string = "跳过更新......";
cc.log("Asset update error: " + t.getAssetId() + ", " + t.getMessage());
i = !0;
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
cc.log(t.getMessage());
i = !0;
}
if (i) {
cc.eventManager.removeListener(this._updateListener);
this._update_flag = !0;
}
if (e) {
this.precent.string = "准备重新启动......";
cc.eventManager.removeListener(this._updateListener);
this._updateListener = null;
var o = jsb.fileUtils.getSearchPaths(), s = this._am.getLocalManifest().getSearchPaths();
console.log(JSON.stringify(s));
Array.prototype.unshift(o, s);
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(o));
jsb.fileUtils.setSearchPaths(o);
cc.audioEngine.stopAll();
cc.game.restart();
}
},
onDestroy: function() {
if (this._updateListener) {
cc.eventManager.removeListener(this._updateListener);
this._updateListener = null;
}
this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS && this._am.release();
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
button_login: cc.Node,
load_update: cc.Node,
callback: null
},
wxLogin: function() {
cc.log("wxLogin");
this.button_login.getComponent("cc.Button").interactable = !1;
if (cc.sys.os == cc.sys.OS_ANDROID) {
jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
this.login_flag = !0;
} else if (cc.sys.os == cc.sys.OS_IOS) {
jsb.reflection.callStaticMethod("NativeOcClass", "iOSLoginWithWX");
this.login_flag = !0;
} else this.onLogin();
},
update: function() {
this.version_label.getComponent("cc.Label").string = g_version;
if (1 == g_login_auto) {
this.wxLogin();
g_login_auto = !1;
}
if (1 == this.login_flag) {
this.login_flag = !1;
if (cc.sys.os == cc.sys.OS_ANDROID) {
var t = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;"), e = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
if (null != (i = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;")) && "null" != i) {
Storage.setData("app_id", t);
Storage.setData("app_secret", e);
this.callback = this.get_access_token;
util.get("https://api.weixin.qq.com/sns/oauth2/access_token", "appid=" + t + "&secret=" + e + "&code=" + i + "&grant_type=authorization_code", this);
} else this.login_flag = !0;
} else if (cc.sys.os == cc.sys.OS_IOS) {
var i;
t = jsb.reflection.callStaticMethod("NativeOcClass", "getAppId"), e = jsb.reflection.callStaticMethod("NativeOcClass", "getAppSecret");
if (null != (i = jsb.reflection.callStaticMethod("NativeOcClass", "getWXCode")) && "null" != i) {
Storage.setData("app_id", t);
Storage.setData("app_secret", e);
this.callback = this.get_access_token;
util.get("https://api.weixin.qq.com/sns/oauth2/access_token", "appid=" + t + "&secret=" + e + "&code=" + i + "&grant_type=authorization_code", this);
} else this.login_flag = !0;
}
}
},
get_access_token: function(t) {
cc.log("get_access_token:" + t);
if (null != t.access_token && null != t.openid) {
Storage.setData("access_token", t.access_token);
Storage.setData("openid", t.openid);
Storage.setData("unionid", t.unionid);
Storage.setData("refresh_token", t.refresh_token);
this.callback = this.get_wxuser_info;
util.get("https://api.weixin.qq.com/sns/userinfo", "access_token=" + t.access_token + "&openid=" + t.openid, this);
} else this.error_code(t);
},
get_wxuser_info: function(t) {
cc.log("get_wxuser_info:" + JSON.stringify(t));
if (null != t.openid) {
g_user.nickname = t.nickname;
g_user.fangka = 0;
g_user.gender = t.sex;
g_user.player_id = t.unionid;
g_user.headimgurl = t.headimgurl;
this.onLogin();
} else this.error_code(t);
},
onLoad: function() {
var t = this;
this.xieyi_select = !0;
g_current_scene = SCENE_TAG.LOAD;
cc.log("onLoad" + this.login_flag);
this.version_label.getComponent("cc.Label").string = g_version;
t.node.on("pressed", t.switchRadio, t);
this.load_update.getComponent("LoadUpdateGame").init(function() {
t.onInitLogin();
});
},
onInitLogin: function() {
this.button_login.getComponent("cc.Button").interactable = !1;
if (cc.sys.os == cc.sys.OS_WINDOWS) this.button_login.getComponent("cc.Button").interactable = !0; else if (cc.sys.isNative) {
this.login_flag = !1;
var t = Storage.getData("refresh_token"), e = Storage.getData("app_id");
if (null == t) {
if (cc.sys.os == cc.sys.OS_ANDROID) {
1 == jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I") && this.wxLogin();
} else if (cc.sys.os == cc.sys.OS_IOS) {
1 == jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType") && this.wxLogin();
}
return !(this.button_login.getComponent("cc.Button").interactable = !0);
}
this.callback = this.get_access_token;
util.get("https://api.weixin.qq.com/sns/oauth2/refresh_token", "appid=" + e + "&grant_type=refresh_token&refresh_token=" + t, this);
}
},
onLogin: function() {
var i = this;
cc.log("go into on login......" + JSON.stringify(g_user));
Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(t) {
console.log("get login info succ:" + JSON.stringify(t));
if (200 == t.code) {
var e = t.token;
Servers.getEntry(e, function(t) {
200 == t.code && i.saveUserInfo(t.player);
});
}
});
},
saveUserInfo: function(t) {
for (var e in t) g_user[e] = t[e];
g_is_login = !0;
if (null != g_next_scene) onGameEnterRoom(g_next_data.room_num, g_next_data.rid); else {
if (cc.sys.os == cc.sys.OS_ANDROID) if (1 == jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I")) {
var i = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRoomNum", "()Ljava/lang/String;"), n = (jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getScene", "()Ljava/lang/String;"), 
jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRid", "()Ljava/lang/String;"));
onGameEnterRoom(i, n);
} else cc.director.loadScene("MainScene"); else if (cc.sys.os == cc.sys.OS_IOS) if (1 == jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType")) {
i = jsb.reflection.callStaticMethod("NativeOcClass", "getRoomNum"), jsb.reflection.callStaticMethod("NativeOcClass", "getScene"), 
n = jsb.reflection.callStaticMethod("NativeOcClass", "getRid");
onGameEnterRoom(i, n);
} else cc.director.loadScene("MainScene"); else cc.director.loadScene("MainScene");
}
},
error_code: function(t) {
var e = cc.director.getVisibleSize();
40029 == t.errcode ? util.show_error_info(this, e, "无效的code请重新登录") : 40030 == t.errcode ? util.show_error_info(this, e, "无效的refresh_token请重新登录") : 40003 == t.errcode && util.show_error_info(this, e, "无效的openid请重新登录");
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice");
if (1 == this.xieyi_select) {
e.lifeUp();
this.xieyi_select = !1;
} else {
e.pitchOn();
this.xieyi_select = !0;
}
},
pop_user_xieyi: function() {
var t = cc.director.getVisibleSize();
this.pop_xieyi = cc.instantiate(g_assets.PopXieyiScene);
var e = t.width / 2, i = t.height / 2;
this.node.addChild(this.pop_xieyi);
this.pop_xieyi.setPosition(this.node.convertToNodeSpaceAR(cc.p(e, i)));
}
});
cc._RF.pop();
}, {} ],
MainScene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "052bdBloNxA8ZVUfzQaV8be", "MainScene");
cc.Class({
extends: cc.Component,
properties: {
touxiang_sprite: cc.Sprite,
username_label: cc.Label,
fangka_label: cc.Label,
sex_sprite: cc.Sprite,
exit_node: cc.Node,
audio: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
cc.log("on load main scene.....");
g_current_scene = SCENE_TAG.MAIN;
g_root_node = cc.director.getScene().getChildByName("RootNode");
var n = this;
if (cc.sys.os == cc.sys.OS_ANDROID) jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "setLoadStatus", "(I)V", 1); else if (cc.sys.os == cc.sys.OS_IOS) {
this.exit_node.active = !1;
jsb.reflection.callStaticMethod("NativeOcClass", "setLoadStatus:", 1);
}
g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
if (null == g_music_key || g_music_key == BOOL.YES) {
cc.audioEngine.stopAll();
this.current = cc.audioEngine.play(this.audio, !0, 1);
}
this.username_label.string = g_user.nick_name;
this.fangka_label.string = g_user.fangka_num;
1 == g_user.gender && (this.sex_sprite.spriteFrame = g_assets.gender1);
null != g_user.headimgurl && 0 < g_user.headimgurl.length ? cc.loader.load({
url: g_user.headimgurl,
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
g_assets.headimg = i;
n.touxiang_sprite.spriteFrame = i;
}) : g_assets.headimg = n.touxiang_sprite.spriteFrame;
},
update: function() {
this.fangka_label.string = g_user.fangka_num;
},
buy_fangka_scene: function() {
var t = cc.director.getWinSize();
this.pop_buyfangka = cc.instantiate(g_assets.PopBuyFangKaScene);
this.node.addChild(this.pop_buyfangka);
this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
},
popCreatScene: function() {
var t = cc.director.getWinSize();
this.pop_creat_scene = cc.instantiate(g_assets.PopCreatRoomScene);
this.node.addChild(this.pop_creat_scene);
this.pop_creat_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
},
popEnterScene: function() {
var t = cc.director.getWinSize();
this.pop_enter_scene = cc.instantiate(g_assets.PopEnterRoomScene);
this.node.addChild(this.pop_enter_scene);
this.pop_enter_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
},
popGonghuiScene: function() {
cc.director.loadScene("GongHuiScene");
},
popMyGameScene: function() {
cc.director.loadScene("MyGameInfoScene");
},
popHelpScene: function() {
var t = cc.director.getWinSize();
this.pop_help_scene = cc.instantiate(g_assets.PopHelpScene);
this.node.addChild(this.pop_help_scene);
this.pop_help_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(t.width / 2, t.height / 2)));
},
exit: function() {
cc.sys.os == cc.sys.OS_ANDROID ? cc.director.end() : (cc.sys.os, cc.sys.OS_IOS);
},
onDestroy: function() {
cc.audioEngine.stop(this.current);
}
});
cc._RF.pop();
}, {} ],
PopXieyi: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "976f4cEfWhBmbJz7b5iEPEu", "PopXieyi");
cc.Class({
extends: cc.Component,
properties: {
content: cc.Node
},
onClose: function() {
this.node.active = !1;
this.node.destroy();
},
onLoad: function() {
for (var t = 1; t < 21; t++) {
var e = new cc.Node();
e.addComponent(cc.Sprite).spriteFrame = g_assets["xieyi_text_" + t];
this.content.addChild(e);
}
},
start: function() {}
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
pthis: null,
total: 0
},
onLoad: function() {
cc.log("start go into pop add chip js");
},
init_callback: function(t, e, i) {
this.pthis = t;
this.callback = i;
this.total = e;
},
silder1_callback: function(t, e) {
this.silder_num1 = Math.floor(t.progress * (this.total - this.silder_num2));
cc.log("silder1:" + this.silder_num1);
this.callback(this.pthis, 1, this.silder_num1);
},
silder2_callback: function(t, e) {
this.silder_num2 = Math.floor(t.progress * (this.total - this.silder_num1));
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
bomb_action: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "341e6ixhkdIH41d1uXrCVPC", "bomb_action");
cc.Class({
extends: cc.Component,
properties: {
anim: null,
animStatus: null,
audio: null,
audioStatus: null
},
onLoad: function() {},
play: function(t) {
this.anim = this.node.getComponent(cc.Animation);
this.animStatus = this.anim.play(t);
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 1;
g_sound_key = cc.sys.localStorage.getItem(SOUND_KEY);
this.audio = this.node.getComponent(cc.AudioSource);
if (null != this.audio && g_sound_key == BOOL.YES) {
this.audio.loop = !1;
this.audioStatus = this.audio.play();
}
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
game_sprite: cc.Node,
weixin_label: cc.Node,
copy_button: cc.Node
},
onLoad: function() {
cc.log("on load store buy");
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {
var i = e.getCurrentTarget(), n = i.convertToNodeSpaceAR(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, this.game_sprite);
},
copy_callback: function() {
var t = this.weixin_label.getComponent("cc.Label").string;
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "copy", "(Ljava/lang/String;)V", t) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeOcClass", "copy:", t);
}
});
cc._RF.pop();
}, {} ],
buy_order: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "39be2Fk/RNJPLECkzhYEeD3", "buy_order");
cc.Class({
extends: cc.Component,
properties: {
order_id: null,
fangka_num: 0,
danjia: 2,
zongjia: 0,
game_sprite: cc.Node,
tip_label: cc.Label,
num_label: cc.Node,
danjia_label: cc.Label,
zongjia_label: cc.Label,
orderid_label: cc.Label,
buy_button: cc.Node
},
onLoad: function() {
cc.log("on load store buy");
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.node);
},
init: function(t) {
this.fangka_num = t.fangka_num;
this.danjia = t.danjia;
this.zongjia = t.zongjia;
this.order_id = t.order_id;
this.num_label.string = t.fangka_num + "张";
this.danjia_label.string = t.danjia + "元";
this.zongjia_label.string = t.zongjia + "元";
this.orderid_label.string = t.order_id;
},
button_cb: function() {
var e = this;
Servers.storeProcess("payOrder", {
order_id: order_id
}, function(t) {
if (200 == t.code) {
e.node.active = !1;
e.node.destroy();
g_user.fangka_num = t.fangka_num;
cc.director.loadScene("MainScene");
}
});
},
close_scene: function() {
this.node.active = !1;
this.node.destroy();
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
created_room_scene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "12a53iwsR5K9Y7u9TAUdP//", "created_room_scene");
cc.Class({
extends: cc.Component,
properties: {
fangka_label: cc.Label,
room_num_node: cc.Node,
fangzhu_node: cc.Node,
max_pai_node: cc.Node,
renshu_node: cc.Node,
wait_time_node: cc.Node,
fangzhu_fangka_node: cc.Node,
wanjia_fangka_node: cc.Node,
start_button: cc.Node,
debug_label: cc.Label,
choice_sprite: {
type: cc.Node,
default: []
},
left_time_node: cc.Node,
player_num: 0
},
onLoad: function() {
this.pomelo_removeListener();
cc.log("created_room_scene", "start gointo created room scene......");
g_current_scene = SCENE_TAG.WAITROOM;
this.node.on("pressed", this.switchRadio, this);
this.wait_flag = !0;
this.player_num = g_room_data.real_num;
this.fangka_label.string = g_user.fangka_num;
this.init_data();
this.init_room_pos();
var t = Date.now(), e = parseInt((t - g_room_data.creat_time) / 1e3);
this.left_time = 60 * parseInt(g_room_data.wait_time) - e;
this.pomelo_on();
cc.log("created_room_scene", "this.choice_sprite:" + this.choice_sprite.length);
this.schedule(this.wait_time_cb, 1);
},
init_data: function() {
this.room_num_node.getComponent("cc.Label").string = g_room_data.room_num;
this.fangzhu_node.getComponent("cc.Label").string = g_room_data.fangzhu_name;
1 == g_room_data.max_type ? this.max_pai_node.getComponent("cc.Label").string = "鬼大" : 2 == g_room_data.max_type ? this.max_pai_node.getComponent("cc.Label").string = "玄大" : 3 == g_room_data.max_type && (this.max_pai_node.getComponent("cc.Label").string = "皇上大");
this.renshu_node.getComponent("cc.Label").string = g_room_data.player_num + "人";
this.wait_time_node.getComponent("cc.Label").string = g_room_data.wait_time + "分钟";
if (1 == g_room_data.fangka_type) {
this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费1张";
this.wanjia_fangka_node.getComponent("cc.Label").string = "消费1张";
} else if (2 == g_room_data.fangka_type) {
this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费" + g_room_data.fangka_num + "张";
this.wanjia_fangka_node.getComponent("cc.Label").string = "消费0张";
}
g_room_data.fangzhu_id != g_user.id && (this.start_button.getComponent("cc.Button").interactable = !1);
},
init_room_pos: function() {
for (var t = this, o = this, e = function(n) {
s = t.choice_sprite[n].getComponent("player_select");
if (null != (r = g_room_data["location" + (n + 1)]) && "null" != r) {
a = r.split("*")[0];
Servers.userInfoProcess("get_player", {
player_id: a
}, function(t) {
200 == t.code && (null != t.msg.head_img_url && 0 < t.msg.head_img_url.length ? cc.loader.load({
url: t.msg.head_img_url,
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
o.choice_sprite[n].getComponent("cc.Sprite").spriteFrame = i;
}) : o.choice_sprite[n].getComponent("cc.Sprite").spriteFrame = g_assets.headimg);
});
s.set_flag(!0);
}
g_room_data.player_num <= g_room_data.real_num && s.set_flag(!0);
}, i = 0; i < this.choice_sprite.length; i++) {
var s, r, a;
e(i);
}
},
share_button_cb: function() {
cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxShare", "(Ljava/lang/String;Ljava/lang/String;I)V", g_room_data.room_num, g_room_data.fangzhu_name, g_room_data.rid) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeOcClass", "WxShare:masterName:roomId:", g_room_data.room_num, g_room_data.fangzhu_name, g_room_data.rid);
},
pomelo_on: function() {
pomelo.on("onStartGame", this.onStartGame_function.bind(this));
pomelo.on("onEnterRoom", this.onEnterRoom_function.bind(this));
pomelo.on("onDelayWaitTime", this.onDelayWaitTime_function.bind(this));
pomelo.on("onDissolveRoom", this.onDissolveRoom_function.bind(this));
pomelo.on("onLeaveRoom", this.onLeaveRoom_function.bind(this));
},
onEnterRoom_function: function(t) {
var n = this;
cc.log("pomelo on onEnterRoom_function:" + t.location + " is ready" + this.choice_sprite.length);
var e = t.location;
this.enter_player = t.player;
this.enter_item = this.choice_sprite[e - 1];
var i = this.enter_item.getComponent("player_select");
i.set_data(this.enter_player);
i.set_flag(!0);
null != this.enter_player.head_img_url && 0 < this.enter_player.head_img_url.length ? cc.loader.load({
url: this.enter_player.head_img_url,
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
n.enter_item.getComponent("cc.Sprite").spriteFrame = i;
}) : n.enter_item.getComponent("cc.Sprite").spriteFrame = g_assets.headimg;
n.player_num = n.player_num + 1;
if (n.enter_player.id == g_user.id) {
g_user.fangka_num = n.enter_player.fangka_num;
for (var o = 0; o < n.choice_sprite.length; o++) {
n.choice_sprite[o].getComponent("player_select").set_flag(!0);
}
}
if (n.player_num >= g_room_data.player_num) {
for (var s = 0; s < n.choice_sprite.length; s++) {
n.choice_sprite[s].getComponent("player_select").set_flag(!0);
}
n.enter_player.id == g_user.id ? util.show_error_info(null, null, "房间人员已经到齐，请点击开始游戏，进入游戏！") : util.show_error_info(null, null, "房间人员已经到齐，请等待房主开始游戏，进入游戏！");
}
},
onDelayWaitTime_function: function(t) {
cc.log("pomelo on onDelayWaitTime_function:" + JSON.stringify(t) + " is ready");
var e = t.wait_time;
if (g_room_data.fangzhu_id == g_user.id) {
g_room_data.wait_time = e;
var i = Date.now(), n = parseInt((i - g_room_data.creat_time) / 1e3);
this.left_time = 60 * parseInt(g_room_data.wait_time) - n;
} else this.left_time = 120;
this.wait_flag = !0;
},
onDissolveRoom_function: function(t) {
this.pomelo_removeListener();
util.show_error_info(null, null, "房主已经解散了该房间,所有玩家退出房间！");
g_room_data = null;
cc.director.loadScene("MainScene");
},
onLeaveRoom_function: function(t) {
var e = t.location;
t.data, t.player_id;
if (-1 != e) {
var i = this.choice_sprite[e - 1];
i.getComponent("player_select");
this.player_num = this.player_num - 1;
i.set_data(null);
i.set_flag(!1);
i.getComponent("cc.Sprite").spriteFrame = g_assets["wait_" + e];
}
},
onStartGame_function: function(t) {
cc.log("pomelo on onStartGame_function:" + JSON.stringify(t));
var i = this, e = t.players;
g_players_data.splice(0, g_players_data.length);
for (var n = 0; n < e.length; n++) null != e[n] && "null" != e[n] && g_players_data.push(e[n]);
var o = {
rid: g_room_data.rid
};
pomelo.request(util.getRoomInfoRoute(), o, function(t) {
cc.log(JSON.stringify(t));
if (200 == t.code) {
for (var e in t.msg) g_room_data[e] = t.msg[e];
i.pomelo_removeListener();
cc.director.loadScene("PJRoomScene");
} else util.show_error_info(null, null, t.msg);
});
},
game_back: function() {
var e = this;
util.show_isok_info(function(t) {
1 == t && (g_room_data.fangzhu_id == g_user.id ? e.goout_game() : e.leave_room());
}, "你确定要解散房间吗？如果已经消费房卡，则消费的房卡不会退回，请稍安勿躁！");
},
wait_time_cb: function() {
this.fangka_label.string = g_user.fangka_num;
var e = this;
this.wait_flag = !1;
if (1 == this.wait_flag) {
0 < this.left_time && (this.left_time = this.left_time - 1);
this.left_time_node.getComponent("cc.Label").string = this.left_time;
if (this.left_time <= 0) {
this.wait_flag = !1;
g_room_data.fangzhu_id == g_user.id && (2 <= this.player_num ? util.show_isok_info(function(t) {
0 == t ? e.start_game() : e.delay_wait_time();
}, "是否进行延迟等待，点击确定延迟等待，点击取消则进入游戏。") : util.show_isok_info(function(t) {
0 == t ? e.goout_game() : e.delay_wait_time();
}, "是否进行延迟等待，点击确定延迟等待，点击取消则退出游戏。"));
}
}
},
start_game: function() {
this.start_button.getComponent("cc.Button").interactable = !1;
if (2 <= this.player_num) {
var t = {
rid: g_room_data.rid,
player_id: g_room_data.fangzhu_id
};
pomelo.request(util.getStartGameRoute(), t, function(t) {
cc.log(JSON.stringify(t));
});
} else {
this.start_button.getComponent("cc.Button").interactable = !0;
util.show_error_info(null, null, "人员不够，无法开始游戏，请等待玩家加入！");
}
},
goout_game: function() {
this.pomelo_removeListener();
var t = {
rid: g_room_data.rid,
player_id: g_user.id
};
pomelo.request(util.getDissolveRoomRoute(), t, function(t) {
cc.log(JSON.stringify(t));
cc.director.loadScene("MainScene");
});
},
leave_room: function() {
this.pomelo_removeListener();
for (var t = 0; t < this.choice_sprite.length; t++) {
var e = this.choice_sprite[t].getComponent("player_select").get_data();
if (null != e && e.id == g_user.id) {
var i = {
rid: g_room_data.rid,
player_id: g_user.id,
location: t + 1
};
pomelo.request(util.getLeaveRoomRoute(), i, function(t) {
cc.log(JSON.stringify(t));
cc.director.loadScene("MainScene");
});
return !0;
}
}
i = {
rid: g_room_data.rid,
player_id: g_user.id,
location: null
};
pomelo.request(util.getLeaveRoomRoute(), i, function(t) {
cc.log(JSON.stringify(t));
cc.director.loadScene("MainScene");
});
},
delay_wait_time: function() {
var t = {
rid: g_room_data.rid,
player_id: g_user.id
};
pomelo.request(util.getDelayWaitTimeRoute(), t, function(t) {
cc.log(JSON.stringify(t));
});
},
switchRadio: function(t) {
var e = t.target.getComponent("player_select").index, i = t.target.getComponent("player_select").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_sprite.length; n++) {
var o = this.choice_sprite[n].getComponent("player_select");
if (o.index == e) {
if (0 == o.get_flag()) {
o.set_flag(!0);
var s = {
rid: g_room_data.rid,
location: e,
player_id: g_user.id
};
pomelo.request(util.getEnterRoute(), s, function(t) {
if (200 == t.code) g_user.fangka_num = t.fangka_num; else {
o.set_flag(!1);
util.show_error_info(null, null, t.msg);
}
cc.log(JSON.stringify(t));
});
}
break;
}
}
},
pomelo_removeListener: function() {
cc.log("remove listener");
pomelo.removeListener("onStartGame");
pomelo.removeListener("onEnterRoom");
pomelo.removeListener("onDelayWaitTime");
pomelo.removeListener("onDissolveRoom");
pomelo.removeListener("onLeaveRoom");
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
game_history_item: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3cbe7dh6gdGX5E7NGrBV+cm", "game_history_item");
cc.Class({
extends: cc.Component,
properties: {
order_id: cc.Node,
fangka_num: cc.Node,
renshu: cc.Node,
creat_time: cc.Node,
game_status: cc.Node,
itemID: 0,
pthis: null
},
init: function(t, e, i) {
this.itemID = t;
this.pthis = i;
this.order_id.getComponent("cc.Label").string = e.room_num;
this.fangka_num.getComponent("cc.Label").string = e.use_fangka;
this.renshu.getComponent("cc.Label").string = e.renshu;
var n = util.dateftt(e.creat_time, "yyyy-MM-dd h:m:s");
this.creat_time.getComponent("cc.Label").string = n;
this.game_status.getComponent("cc.Label").string = e.game_status;
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
gonghui_empty: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "7ea469YRrlMLrt7TpzXgRoJ", "gonghui_empty");
cc.Class({
extends: cc.Component,
properties: {
tip_label: cc.Label,
no_g: "您还没有公会信息，只有加入公会才可以购买房卡。",
has_g: "您已经拥有公会或者加入了其他公会，无法再进行公会申请",
join_g: "您已经拥有公会或者加入了其他公会，无法再申请加入公会",
adding_g: "申请正在审核中，工作人员会在3-5个工作日与您取得联系，并确认信息。\n有任何疑问请拨打电话 0317-5071648"
},
set_text: function(t) {
"no_g" == t ? this.tip_label.string = this.no_g : "has_g" == t && (this.tip_label.string = this.has_g);
"join_g" == t && (this.tip_label.string = this.join_g);
"adding_g" == t && (this.tip_label.string = this.adding_g);
},
onLoad: function() {},
start: function() {}
});
cc._RF.pop();
}, {} ],
gonghui_jiaru: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e79e3e5OpRNSpXIJYH3ePHJ", "gonghui_jiaru");
cc.Class({
extends: cc.Component,
properties: {
gonghui_id: cc.Node,
pthis: null,
gid: null
},
init: function(t) {
this.pthis = t;
},
onChangeEdit: function() {
this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
},
onEndEdit: function() {
this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
},
jiaru_cb: function() {
var e = this, i = cc.director.getWinSize();
(null == this.gid || this.gid.length < 4) && util.show_error_info(e.pthis, i, "输入正确的公会ID");
var t = {
player_id: g_user.id,
gonghui_id: this.gid
};
Servers.gonghuiProcess("join_gonghui", t, function(t) {
if (200 == t.code) {
e.node.active = !1;
g_user.gonghui_id = t.msg.gonghui_id;
e.pthis.my_gonghui_button_cb();
} else util.show_error_info(e.pthis, i, "没有找到对应的公会信息");
});
}
});
cc._RF.pop();
}, {} ],
gonghui_shenqing: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3a4fd0yAOhNNZDwB7jenFL3", "gonghui_shenqing");
cc.Class({
extends: cc.Component,
properties: {
gonghui_name_node: cc.Node,
phone_node: cc.Node,
tip_node: cc.Node,
phone_num: null,
gonghui_name: null,
level: 1,
default_tip: null,
pthis: null,
choice_radios: {
type: cc.Node,
default: []
}
},
init: function(t) {
this.pthis = t;
},
onChangePhone: function() {
this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
},
onEndPhone: function() {
this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
},
onChangeName: function() {
this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
},
onEndName: function() {
this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
},
shenqing_cb: function() {
var e = this, i = cc.director.getWinSize();
if (null != this.phone_num && null != this.gonghui_name) {
var t = {
player_id: g_user.id,
player_name: g_user.nickname,
gonghui_name: this.gonghui_name,
telphone: this.phone_num,
level: this.level
};
Servers.gonghuiProcess("shenqing", t, function(t) {
if (200 == t.code) {
e.node.active = !1;
e.pthis.add_gonghui_button_cb();
} else util.show_error_info(e.pthis, i, t.msg);
});
} else util.show_error_info(e.pthis, i, "请完善信息在次提交");
},
onLoad: function() {
this.node.on("pressed", this.switchRadio, this);
this.default_tip = this.tip_node.getComponent("cc.Label").string;
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_radios.length; n++) {
var o = this.choice_radios[n].getComponent("one_choice");
if (o.type == i) {
this.level = e;
o.index == e ? o.pitchOn() : o.lifeUp();
}
}
cc.log("select level" + this.level);
}
});
cc._RF.pop();
}, {} ],
gonghui_yuan: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "a9cednJaSNGhLQ/2xZErFNa", "gonghui_yuan");
cc.Class({
extends: cc.Component,
properties: {
gonghui_id: cc.Node,
gonghui_name: cc.Node,
gonghui_zhang: cc.Node,
fangka_num: cc.Node,
renshu: cc.Node,
danjia: cc.Node,
xuanyan: cc.Node,
pthis: null
},
init: function(t, e) {
this.pthis = e;
this.gonghui_id.getComponent("cc.Label").string = t.gonghui_id;
this.gonghui_name.getComponent("cc.Label").string = t.gonghui_name;
this.gonghui_zhang.getComponent("cc.Label").string = t.player_name;
this.fangka_num.getComponent("cc.Label").string = t.fangka_num;
this.renshu.getComponent("cc.Label").string = t.renshu;
this.danjia.getComponent("cc.Label").string = t.danjia;
this.xuanyan.getComponent("cc.Label").string = t.xuanyan;
this.gonggao.getComponent("cc.Label").string = t.gonggao;
},
tuichu_cb: function() {},
onLoad: function() {},
start: function() {}
});
cc._RF.pop();
}, {} ],
gonghui_zhang: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "0f49ebS2PZCv5to8L7PECVA", "gonghui_zhang");
cc.Class({
extends: cc.Component,
properties: {
gonghui_id: cc.Node,
gonghui_name: cc.Node,
gonghui_zhang: cc.Node,
fangka_num: cc.Node,
renshu: cc.Node,
danjia: cc.Node,
xuanyan: cc.Node,
danjia_str: null,
xuanyan_str: null,
xuka_status: null,
data: null,
pthis: null
},
init: function(t, e) {
this.pthis = e;
this.data = t;
this.gonghui_id.getComponent("cc.Label").string = t.gonghui_id;
this.gonghui_name.getComponent("cc.Label").string = t.gonghui_name;
this.fangka_num.getComponent("cc.Label").string = t.fangka_num;
this.renshu.getComponent("cc.Label").string = t.renshu;
this.danjia.getComponent("cc.EditBox").string = t.danjia;
this.xuanyan.getComponent("cc.EditBox").string = t.xuanyan;
this.gonghui_zhang.getComponent("cc.Label").string = t.player_name;
this.xuka_status = t.xuka_status;
this.xuanyan_str = t.xuanyan;
this.danjia_str = t.danjia;
},
onChangeDanjia: function() {
this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
},
onEndDanjia: function() {
this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
},
onChangeXuanyan: function() {
this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
},
onEndXuanyan: function() {
this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
},
onXuka: function() {
var e = cc.director.getWinSize(), i = this, t = {
gonghui_id: this.data.id,
player_id: g_user.id,
player_name: g_user.nickname,
telphone: this.data.telphone
};
Servers.gonghuiProcess("xuka", t, function(t) {
200 == t.code ? util.show_error_info(i.parent, e, "申请续卡已经提交，等待工作人员确认信息。") : util.show_error_info(i.parent, e, t.msg);
});
},
onTijiao: function() {
var e = this, t = {
id: this.data.id,
danjia: this.danjia,
xuanyan: this.xuanyan_str,
gonggao: this.gonggao_str
};
Servers.gonghuiProcess("update_gonghui", t, function(t) {
if (200 == t.code) {
util.show_error_info(e.parent, size, "公会信息更新完成");
e.init(t.msg);
} else util.show_error_info(e.parent, size, t.msg);
});
}
});
cc._RF.pop();
}, {} ],
gonghui: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "8b6a5PGzY5FZI+EpPeBqv51", "gonghui");
cc.Class({
extends: cc.Component,
properties: {
my_gonghui_button: cc.Node,
add_gonghui_button: cc.Node,
join_gonghui_button: cc.Node,
game_sprite: cc.Node,
my_gonghui_node: cc.Node,
my_gonghui_zhang_node: cc.Node,
add_gonghui_node: cc.Node,
join_gonghui_node: cc.Node,
empty_node: cc.Node
},
unable_one_button: function(t) {
this.my_gonghui_button.getComponent("cc.Button").interactable = !0;
this.add_gonghui_button.getComponent("cc.Button").interactable = !0;
this.join_gonghui_button.getComponent("cc.Button").interactable = !0;
"gonghui" == t ? this.my_gonghui_button.getComponent("cc.Button").interactable = !1 : "add_gonghui" == t ? this.add_gonghui_button.getComponent("cc.Button").interactable = !1 : "join_gonghui" == t && (this.join_gonghui_button.getComponent("cc.Button").interactable = !1);
},
my_gonghui_button_cb: function() {
cc.log("my_gonghui_button_cb");
var i = this;
i.unable_one_button("gonghui");
if (null == g_user.gonghui_id) {
i.empty_node.getComponent("gonghui_empty").set_text("no_g");
i.show_one_node("empty");
} else Servers.gonghuiProcess("getGonghui", {
gonghui_id: g_user.gonghui_id
}, function(t) {
if (200 == t.code) {
var e = t.msg;
if (e.player_id != g_user.id) {
i.my_gonghui_node.getComponent("gonghui_yuan").init(e, i);
i.show_one_node("gonghui");
} else {
i.my_gonghui_zhang_node.getComponent("gonghui_zhang").init(e, i);
i.show_one_node("gonghui_zhang");
}
}
});
},
add_gonghui_button_cb: function() {
cc.log("add_gonghui_button_cb");
var e = this;
this.unable_one_button("add_gonghui");
if (null != g_user.gonghui_id) {
this.empty_node.getComponent("gonghui_empty").set_text("has_g");
this.show_one_node("empty");
} else Servers.gonghuiProcess("getGonghuiAns", {
player_id: g_user.id
}, function(t) {
if (200 == t.code) {
if (0 == t.msg.status) {
e.empty_node.getComponent("gonghui_empty").set_text("adding_g");
e.show_one_node("empty");
}
} else {
e.add_gonghui_node.getComponent("gonghui_shenqing").init(e);
e.show_one_node("add_gonghui");
}
});
},
join_gonghui_button_cb: function() {
cc.log("join_gonghui_button_cb");
this.unable_one_button("join_gonghui");
var e = this;
if (null != g_user.gonghui_id) {
this.empty_node.getComponent("gonghui_empty").set_text("join_g");
this.show_one_node("empty");
} else Servers.gonghuiProcess("getGonghuiAns", {
player_id: g_user.id
}, function(t) {
if (200 == t.code) {
if (0 == t.msg.status) {
e.empty_node.getComponent("gonghui_empty").set_text("adding_g");
e.show_one_node("empty");
}
} else {
e.join_gonghui_node.getComponent("gonghui_jiaru").init(e);
e.show_one_node("join_gonghui");
}
});
},
onLoad: function() {
g_current_scene = SCENE_TAG.GONGHUI;
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.game_sprite);
this.my_gonghui_button_cb();
},
close_scene: function() {
this.node.active = !1;
this.node.destroy();
cc.director.loadScene("MainScene");
},
show_one_node: function(t) {
this.my_gonghui_node.active = !1;
this.my_gonghui_zhang_node.active = !1;
this.add_gonghui_node.active = !1;
this.join_gonghui_node.active = !1;
this.empty_node.active = !1;
"empty" == t ? this.empty_node.active = !0 : "gonghui" == t ? this.my_gonghui_node.active = !0 : "gonghui_zhang" == t ? this.my_gonghui_zhang_node.active = !0 : "add_gonghui" == t ? this.add_gonghui_node.active = !0 : "join_gonghui" == t && (this.join_gonghui_node.active = !0);
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
my_game_info: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ba26ePwh/RNWIeA859ndTMc", "my_game_info");
cc.Class({
extends: cc.Component,
properties: {
game_sprite: cc.Node,
zhanji_node: cc.Node,
zhanji_button: cc.Node,
record_button: cc.Node,
record_node: cc.Node
},
onLoad: function() {
var i = this;
g_current_scene = SCENE_TAG.GAMEINFO;
Servers.userInfoProcess("get_player", {
player_id: g_user.id
}, function(t) {
if (200 == t.code) {
for (var e in t.msg) g_user[e] = t.msg[e];
i.zhanji_button_cb();
}
});
},
zhanji_button_cb: function() {
this.zhanji_button.getComponent("cc.Button").interactable = !1;
this.record_button.getComponent("cc.Button").interactable = !0;
this.zhanji_node.getComponent("my_game_zhanji").init_zhanji_info(g_user, this);
this.zhanji_node.active = !0;
this.record_node.getComponent("my_game_record").clear_scroll_data();
this.record_node.active = !1;
cc.log("zhanji_button_cb");
},
record_button_cb: function() {
this.record_button.getComponent("cc.Button").interactable = !1;
this.zhanji_button.getComponent("cc.Button").interactable = !0;
this.record_node.getComponent("my_game_record").init_record_info(g_user, this);
this.record_node.active = !0;
this.zhanji_node.getComponent("my_game_zhanji").clear_scroll_data();
this.zhanji_node.active = !1;
cc.log("record_button_cb");
},
close_scene: function() {
this.node.active = !1;
this.node.destroy();
cc.director.loadScene("MainScene");
}
});
cc._RF.pop();
}, {} ],
my_game_record: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "be293aRiopAYoyqdhktCN8Y", "my_game_record");
cc.Class({
extends: cc.Component,
properties: {
itemHeight: 40,
scrollView: {
default: null,
type: cc.ScrollView
},
spawnCount: 0,
totalCount: 0,
spacing: 0,
data_list: null,
all_num_node: cc.Node,
use_num_node: cc.Node,
left_num_node: cc.Node,
invalid_num_node: cc.Node,
debug_label: cc.Label,
pthis: null
},
onLoad: function() {},
initialize: function() {
this.content = this.scrollView.content;
this.items = [];
this.updateTimer = 0;
this.updateInterval = .2;
this.itemHeight = 40;
this.lastContentPosY = 0;
this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
for (var t = 0; t < this.spawnCount; ++t) {
var e = cc.instantiate(g_assets.record_item_layout);
this.content.addChild(e);
e.setPosition(0, -e.height * (.5 + t) - this.spacing * (t + 1));
e.getComponent("record_item").init(t, this.data_list[t], this.pthis);
this.items.push(e);
}
},
getPositionInView: function(t) {
var e = t.parent.convertToWorldSpaceAR(t.position);
return this.scrollView.node.convertToNodeSpaceAR(e);
},
update: function(t) {
this.updateTimer += t;
if (!(this.updateTimer < this.updateInterval || null == this.items || this.items.length <= 0)) {
this.updateTimer = 0;
for (var e = this.items, i = this.scrollView.content.y < this.lastContentPosY, n = (this.itemHeight + this.spacing) * e.length, o = 0, s = 0; s < e.length; ++s) {
var r = this.getPositionInView(e[s]);
if (i) {
o = e[s].y + n;
if (r.y < -this.bufferZone && o < 0) {
e[s].setPositionY(o);
var a = e[s].getComponent("record_item"), c = a.itemID - e.length;
a.init(c, this.data_list[c], this.pthis);
cc.log("prev id:" + c);
}
} else {
o = e[s].y - n;
if (r.y > this.bufferZone && o > -this.content.height) {
e[s].setPositionY(o);
var l = e[s].getComponent("record_item"), h = l.itemID + e.length;
l.init(h, this.data_list[h], this.pthis);
cc.log("next id:" + h);
}
}
}
this.lastContentPosY = this.scrollView.content.y;
}
},
init_record_info: function(t, e) {
var i = this;
this.pthis = e;
this.all_num_node.getComponent("cc.Label").string = t.fangka_history;
this.use_num_node.getComponent("cc.Label").string = parseInt(t.fangka_history) - parseInt(t.fangka_num);
this.left_num_node.getComponent("cc.Label").string = t.fangka_num;
this.invalid_num_node.getComponent("cc.Label").string = t.invalid_fangka;
var n = {
player_id: t.id,
index: 0,
length: this.totalCount
};
Servers.gameInfoProcess("getBuyFangkaList", n, function(t) {
i.data_list = t.msg;
i.totalCount = i.data_list.length;
0 < i.data_list.length && i.initialize();
});
},
clear_scroll_data: function() {
if (null != this.items) {
this.debug_label.string = "";
for (var t = 0; t < this.items.length; t++) {
var e = this.items[t];
e.removeFromParent();
e.destroy();
}
}
}
});
cc._RF.pop();
}, {} ],
my_game_zhanji: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e7cde2/xQdAYqLHczjMuqhh", "my_game_zhanji");
cc.Class({
extends: cc.Component,
properties: {
itemHeight: 40,
scrollView: {
default: null,
type: cc.ScrollView
},
spawnCount: 0,
totalCount: 0,
spacing: 0,
data_list: null,
jushu_node: cc.Node,
fenshu_node: cc.Node,
win_node: cc.Node,
lose_node: cc.Node,
equal_node: cc.Node,
debug_label: cc.Label,
pthis: null
},
onLoad: function() {},
initialize: function() {
this.content = this.scrollView.content;
this.items = [];
this.updateTimer = 0;
this.updateInterval = .2;
this.itemHeight = 40;
this.lastContentPosY = 0;
this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
for (var t = 0; t < this.spawnCount && !(this.data_list.length <= t); ++t) {
var e = cc.instantiate(g_assets.game_history_item_layout);
this.content.addChild(e);
e.setPosition(0, -e.height * (.5 + t) - this.spacing * (t + 1));
e.getComponent("game_history_item").init(t, this.data_list[t], this.pthis);
this.items.push(e);
}
},
getPositionInView: function(t) {
var e = t.parent.convertToWorldSpaceAR(t.position);
return this.scrollView.node.convertToNodeSpaceAR(e);
},
update: function(t) {
this.updateTimer += t;
if (!(this.updateTimer < this.updateInterval || null == this.items || this.items.length <= 0)) {
this.updateTimer = 0;
for (var e = this.items, i = this.scrollView.content.y < this.lastContentPosY, n = (this.itemHeight + this.spacing) * e.length, o = 0, s = 0; s < e.length; ++s) {
var r = this.getPositionInView(e[s]);
if (i) {
o = e[s].y + n;
if (r.y < -this.bufferZone && o < 0) {
e[s].setPositionY(o);
var a = e[s].getComponent("game_history_item"), c = a.itemID - e.length;
a.init(c, this.data_list[c], this.pthis);
cc.log("prev id:" + c);
}
} else {
o = e[s].y - n;
if (r.y > this.bufferZone && o > -this.content.height) {
e[s].setPositionY(o);
var l = e[s].getComponent("game_history_item"), h = l.itemID + e.length;
l.init(h, this.data_list[h], this.pthis);
cc.log("next id:" + h);
}
}
}
this.lastContentPosY = this.scrollView.content.y;
}
},
init_zhanji_info: function(t, e) {
var i = this;
this.pthis = e;
this.jushu_node.getComponent("cc.Label").string = t.round_num;
this.fenshu_node.getComponent("cc.Label").string = t.all_score;
this.win_node.getComponent("cc.Label").string = t.win_num;
this.lose_node.getComponent("cc.Label").string = t.lose_num;
this.equal_node.getComponent("cc.Label").string = parseInt(t.round_num) - parseInt(t.win_num) - parseInt(t.lose_num);
var n = {
player_id: t.id,
index: 0,
length: this.totalCount
};
Servers.gameInfoProcess("getGameHistoryList", n, function(t) {
if (200 == t.code) {
i.data_list = t.msg;
i.totalCount = i.data_list.length;
0 < i.data_list.length && i.initialize();
}
});
},
clear_scroll_data: function() {
if (null != this.items) for (var t = 0; t < this.items.length; t++) {
var e = this.items[t];
e.removeFromParent();
e.destroy();
}
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
sprite: cc.Node,
sprite_back: cc.Sprite,
touch_tag: !1,
num: 0,
id: 0,
suit: 0,
rank: 0
},
initCardSprite: function(t) {
this.num = t;
this.suit = g_paixing[t][1];
this.rank = g_paixing[t][0];
this.sprite.getComponent("cc.Sprite").spriteFrame = g_assets[t.toString()];
this.sprite.runAction(cc.hide());
},
onLoad: function() {
cc.log("zjh_card  onload......");
},
installTouch: function() {
this.node.on("touchstart", this.touch_call, this);
},
uninstallTouch: function() {
this.node.off("touchstart", this.touch_call, this);
},
touch_call: function(t) {
this.menuCallbackButton();
this.node.dispatchEvent(new cc.Event.EventCustom("pressed", !0));
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
tip_label: cc.Label,
max_type: 1,
fangka: 1,
wait_time: 1,
renshu: 2,
game_type: "PJ",
button_node: cc.Node,
choice_radios: {
type: cc.Node,
default: []
}
},
onLoad: function() {
cc.log("start go into create game js");
var t = this;
t.model = 1;
t.max_type = 1;
t.fangka = 1;
t.node.on("pressed", t.switchRadio, t);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.node);
},
switchRadio: function(t) {
var e = t.target.getComponent("one_choice").index, i = t.target.getComponent("one_choice").type;
cc.log("switchRadio : index:" + e + " type:" + i);
for (var n = 0; n < this.choice_radios.length; n++) {
var o = this.choice_radios[n].getComponent("one_choice");
if (o.type == i) {
0 == i ? this.renshu = e : 1 == i ? this.max_type = e : 2 == i ? this.wait_time = e : 3 == i && (this.fangka = e);
o.index == e ? o.pitchOn() : o.lifeUp();
}
}
cc.log("select renshu" + this.renshu + " fangka:" + this.fangka + " zuida:" + this.max_type + " wait_time:" + this.wait_time);
},
create_game: function() {
this.button_node.getComponent("cc.Button").interactable = !1;
var t = {
renshu: this.renshu,
room_type: this.game_type,
player_id: g_user.id,
wait_time: this.wait_time,
max_type: this.max_type,
fangka_type: this.fangka
};
room_create(t, this);
},
close_scene: function() {
this.node.active = !1;
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
pj_game_room: [ function(t, e, i) {
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
zhuang_serverPosition: 0,
left_cards: null,
qieguo: 0,
pai_back_sprite: cc.Sprite,
suiji_qiangzhuang: cc.Node,
master_label: cc.Label,
room_num_label: cc.Label,
zhuang_label: cc.Label,
huihe_label: cc.Label,
msage_scroll: cc.Node,
left_card_layout: cc.Node,
button_layout: cc.Node,
zhunbei_button: cc.Node,
qiangzhang_button: cc.Node,
xiazhu_button: cc.Node,
queding_button: cc.Node,
peipai_button: cc.Node,
kaipai_button: cc.Node,
qieguo_button: cc.Node,
buqie_button: cc.Node,
players: {
type: cc.Node,
default: []
},
audio: {
url: cc.AudioClip,
default: null
}
},
onLoad: function() {
cc.log("go into pj game room scene onload");
g_current_scene = SCENE_TAG.ROOM;
this.pomelo_removeListener();
this.sumBet = g_room_data.zhuang_score;
this.count = g_room_data.round;
this.qieguo = g_room_data.qieguo;
this.roomNum = g_room_data.room_num;
this.roomState = g_room_data.is_gaming;
this.master_name = g_room_data.fangzhu_name;
this.startDealCardPosition = g_room_data.first_fapai;
this.zhuang_serverPosition = g_room_data.zhuang_location;
this.cur_turn = g_room_data.cur_turn;
this.myselfCards = new Array();
this.left_cards = new Array();
this.betPhotoArray = new Array();
this.suiji_qiangzhuang.active = !1;
this.init_head_info();
this.initButtonEnableAfterComeInRoom();
this.initPlayersAndPlayer_noPower();
2 == this.roomState && this.init_game_status();
this.schedule(this.showRoomMessageUpdate, 1 / 60, cc.REPEAT_FOREVER, 0);
this.node.on("pressed", this.switchRadio, this);
},
start: function() {
cc.log("go into pj game room scene start");
g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
if (null == g_music_key || g_music_key == BOOL.YES) {
cc.audioEngine.stopAll();
this.current = cc.audioEngine.play(this.audio, !0, 1);
}
this.pomelo_on();
this.init_count_timer();
},
init_head_info: function() {
cc.director.getWinSize();
this.master_label.getComponent(cc.Label).string = this.master_name;
this.room_num_label.getComponent(cc.Label).string = this.roomNum;
this.zhuang_label.getComponent(cc.Label).string = this.sumBet;
this.huihe_label.getComponent(cc.Label).string = this.count;
},
initButtonEnableAfterComeInRoom: function() {
this.get_one_button("ready", !0);
this.qieguo_button.active = !1;
this.buqie_button.active = !1;
},
init_game_status: function() {
for (var t = null, e = 0; e < g_players.length; e++) {
if ((t = g_players[e].getComponent("tdk_player")).position_server == g_myselfPlayerPos) {
cc.log("init_game_status: location:" + t.position_server + " is_power:" + t.is_power);
break;
}
}
if (1 <= t.is_power) for (e = 0; e < g_players.length; e++) {
var i = g_players[e].getComponent("tdk_player");
cc.log("setSpriteStatus: location:" + i.position_server + " is_power:" + i.is_power);
1 <= i.is_power && i.setSpriteStatus("yizhunbei");
}
if (2 <= t.is_power) {
this.getzhuang_callback();
for (e = 0; e < g_players.length; e++) {
i = g_players[e].getComponent("tdk_player");
cc.log("getzhuang_callback: location:" + i.position_server + " is_power:" + i.is_power);
if (3 <= i.is_power) {
var n = i.position_server, o = g_room_data["score_" + n];
if (null != o && "null" != o) {
var s = JSON.parse(o);
i.set_chips(1, parseInt(s[0]));
i.set_chips(2, parseInt(s[1]));
}
}
}
}
4 <= t.is_power && this.repairFapai_function();
5 <= t.is_power && this.repairPeipai_function();
6 <= t.is_power && this.repairOpenpai_function();
7 <= t.is_power && this.repairQieguo_function();
},
initPlayersAndPlayer_noPower: function() {
cc.log("initPlayersAndPlayer_noPower" + JSON.stringify(g_players_data));
g_players.splice(0, g_players.length);
for (var t = 0; t < g_players_data.length; t++) if (g_players_data[t].id == g_user.id) {
g_myselfPlayerPos = g_players_data[t].location;
break;
}
var e = new Array();
for (t = 0; t < g_players_data.length; t++) {
var i = -1;
if ((o = g_players_data[t]).location == g_myselfPlayerPos) i = 0; else if (o.location > g_myselfPlayerPos) i = o.location - g_myselfPlayerPos; else if (o.location < g_myselfPlayerPos) i = this.players.length - g_myselfPlayerPos + o.location;
0 <= i && (e[i] = o);
}
var n = 1;
for (t = 0; t < this.players.length; t++) {
var o, s = this.players[t], r = s.getComponent("tdk_player");
if (null != (o = e[t])) {
n = o.location;
o.is_power = g_room_data["is_game_" + o.location];
this.zhuang_serverPosition == o.location ? o.my_gold = g_room_data.zhuang_score : o.my_gold = g_room_data["left_score_" + o.location];
r.init(o);
r.player_position = t + 1;
cc.log("set player_com: player_position:" + r.player_position + " position_server:" + r.position_server);
cc.log("player_com: is_power:" + r.is_power);
g_players.push(s);
s.active = !0;
} else {
0 == (n = (n + 1) % 4) && (n = 4);
r.player_position = t + 1;
r.position_server = n;
s.active = !1;
}
}
},
init_count_timer: function() {
cc.log("g_players:" + g_players.length);
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server == g_myselfPlayerPos) {
e.start_timer();
break;
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
pomelo.request(util.getGameRoute(), {
process: "ready",
location: g_myselfPlayerPos
}, function(t) {
cc.log(t.msg);
});
},
callback_xiazhu: function() {
this.xiazhu_button.getComponent(cc.Button).interactable = !1;
this.chip_layout = cc.instantiate(g_assets.pop_add_chip);
this.chip_layout.getComponent("add_chip").init_callback(this, this.sumBet, this.silder_callback);
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
this.chip_layout.destroy();
this.queding_button.active = !1;
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server == g_myselfPlayerPos) {
var i = e.my_chip1, n = e.my_chip2;
pomelo.request(util.getGameRoute(), {
process: "xiazhu",
chips: [ i, n ],
location: g_myselfPlayerPos
}, function(t) {
cc.log(t.msg);
});
break;
}
}
},
callback_peipai: function() {
this.peipai_button.active = !1;
for (var t = cc.director.getVisibleSize(), e = -1, i = 0; i < g_players.length; i++) {
if ((n = g_players[i].getComponent("tdk_player")).position_server == g_myselfPlayerPos) {
e = i;
break;
}
}
var n, o = (n = g_players[e].getComponent("tdk_player")).selected_cards;
if (2 == o.length) {
this.peipai_button.active = !1;
for (i = 0; i < 4; i++) {
(a = n.my_cards[i].getComponent("pj_card")).uninstallTouch();
}
var s = [], r = [];
for (i = 0; i < o.length; i++) {
var a = o[i].getComponent("pj_card");
s.push(a.num);
r.push(a.id);
}
pomelo.request(util.getGameRoute(), {
process: "peipai",
peipai: s,
select: r,
location: g_myselfPlayerPos
}, function(t) {
console.log(t.msg);
});
} else {
util.show_error_info(this, t, "只能选择两张牌");
this.peipai_button.active = !0;
}
},
callback_kaipai: function() {
this.kaipai_button.active = !1;
pomelo.request(util.getGameRoute(), {
process: "open",
location: g_myselfPlayerPos
}, function(t) {
cc.log(t.msg);
});
},
callback_qieguo: function() {
this.qieguo_button.active = !1;
this.buqie_button.active = !1;
pomelo.request(util.getGameRoute(), {
process: "qieguo",
location: g_myselfPlayerPos,
flag: !0
}, function(t) {
cc.log(t.msg);
});
},
callback_buqie: function() {
this.qieguo_button.active = !1;
this.buqie_button.active = !1;
pomelo.request(util.getGameRoute(), {
process: "qieguo",
location: g_myselfPlayerPos,
flag: !1
}, function(t) {
cc.log(t.msg);
});
},
callback_setting: function() {
var e = this, t = cc.director.getVisibleSize(), i = cc.instantiate(g_assets.pop_setting_scene);
i.getComponent("pop_set_scene").set_callback(function(t) {
if (0 == t) if (g_music_key == BOOL.NO && null != e.current) {
cc.audioEngine.stop(e.current);
e.current = null;
} else null == e.current && (e.current = cc.audioEngine.play(e.audio, !0, 1));
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
process: "get_user_info",
send_from: g_myselfPlayerPos,
location: i.position_server
}, function(t) {
console.log("-----quit------" + JSON.stringify(t));
});
},
showRoomMessageUpdate: function() {
this.zhuang_label.string = this.sumBet;
this.huihe_label.string = this.count;
},
repairFapai_function: function() {
this.myselfCards.splice(0, this.myselfCards.length);
this.myselfCards.push(JSON.parse(g_room_data.pai1));
this.myselfCards.push(JSON.parse(g_room_data.pai2));
this.myselfCards.push(JSON.parse(g_room_data.pai3));
this.myselfCards.push(JSON.parse(g_room_data.pai4));
if (1 == this.cur_turn) {
for (var t = 1; t < 33; t++) {
for (var e = !1, i = 0; i < this.myselfCards.length; i++) for (var n = this.myselfCards[i], o = 0; o < n.length; o++) t == n[o] && (e = !0);
if (0 == e) {
(a = (u = cc.instantiate(g_assets.pj_card)).getComponent("pj_card")).initCardSprite(t);
a.sprite.runAction(cc.show());
a.sprite_back.node.runAction(cc.hide());
this.left_card_layout.addChild(u);
this.left_cards.push(u);
}
}
this.cur_turn;
}
for (t = 0; t < this.players.length; t++) {
var s = (l = this.players[t]).getComponent("tdk_player"), r = this.myselfCards[s.position_server - 1];
cc.log("actionFaPai card_type:" + JSON.stringify(r) + " position_server:" + s.position_server);
for (i = 0; i < 4; i++) {
var a = (u = s.addPlayerCard()).getComponent("pj_card"), c = this.calc_player_card_position(l, i);
if (s.position_server == g_myselfPlayerPos) {
a.installTouch();
s.set_card_sprite(i, r[i]);
a.sprite_back.node.runAction(cc.hide());
a.sprite.runAction(cc.show());
}
u.setPosition(c);
}
}
for (t = 0; t < g_players.length; t++) {
s = (l = g_players[t]).getComponent("tdk_player");
var l, h = new Array(), _ = new Array();
if (5 <= s.is_power && s.position_server != g_myselfPlayerPos) {
for (i = 0; i < 4; i++) {
var u = s.my_cards[i];
i < 2 ? _.push(u) : h.push(u);
}
this.set_cards_w(l, _);
this.set_cards_h(l, h);
}
}
this.get_one_button("peipai", !0);
},
repairPeipai_function: function() {
for (var t = !0, e = 0; e < g_players.length; e++) {
var i = (a = g_players[e]).getComponent("tdk_player"), n = new Array(), o = new Array();
if (5 <= i.is_power && i.position_server == g_myselfPlayerPos) {
for (var s = 0; s < 4; s++) {
var r = i.my_cards[s];
s < 2 ? o.push(r) : n.push(r);
}
this.set_cards_w(a, o);
this.set_cards_h(a, n);
}
}
for (e = 0; e < g_players.length; e++) {
var a;
i = (a = g_players[e]).getComponent("tdk_player");
cc.log("repairPeipai_function : is_power:" + i.is_power);
5 <= i.is_power || (t = !1);
}
cc.log("repairPeipai_function:" + this.zhuang_serverPosition + " " + g_myselfPlayerPos + " " + t);
this.zhuang_serverPosition == g_myselfPlayerPos && 1 == t && this.get_one_button("kaipai", !0);
this.peipai_button.active = !1;
this.peipai_button.getComponent("cc.Button").interactable = !1;
},
repairOpenpai_function: function() {
for (var t = 0; t < this.players.length; t++) for (var e = this.players[t].getComponent("tdk_player"), i = this.myselfCards[e.position_server - 1], n = 0; n < 4; n++) {
e.set_card_sprite(n, i[n]);
var o = e.my_cards[n].getComponent("pj_card");
o.sprite_back.node.runAction(cc.hide());
o.sprite.runAction(cc.show());
}
var s = [ g_room_data.left_score_1, g_room_data.left_score_2, g_room_data.left_score_3, g_room_data.left_score_4 ];
this.qieguo = g_room_data.qieguo;
this.sumBet = this.sumBet + s[this.zhuang_serverPosition - 1];
for (t = 0; t < g_players.length; t++) {
(e = g_players[t].getComponent("tdk_player")).resetMoneyLabel(e.my_gold + s[e.position_server - 1]);
if (e.position_server != this.zhuang_serverPosition) if (0 < s[e.position_server - 1]) {
e.setGameStatus("winner");
this.actionWinnerGetBet(this.zhuang_serverPosition, e.position_server, !0);
} else if (s[e.position_server - 1] < 0) {
e.setGameStatus("loser");
this.actionWinnerGetBet(e.position_server, this.zhuang_serverPosition, !0);
} else {
e.setGameStatus("equal");
this.actionWinnerGetBet(0, 0, !1);
}
}
},
repairQieguo_function: function() {
this.repairOpenpai_function();
var t = [ g_room_data.left_score_1, g_room_data.left_score_2, g_room_data.left_score_3, g_room_data.left_score_4 ], e = !1;
1 == g_room_data.qieguo_flag && (e = !0);
this.onQieguo_function({
scores: t,
flag: e
});
},
pomelo_on: function() {
pomelo.on("onReady", this.onReady_function.bind(this));
pomelo.on("onGetZhuang", this.onGetZhuang_function.bind(this));
pomelo.on("onXiazhu", this.onXiazhu_function.bind(this));
pomelo.on("onPeiPai", this.onPeiPai_function.bind(this));
pomelo.on("onPeiPaiFinish", this.onPeiPaiFinish_function.bind(this));
pomelo.on("onFapai", this.onFapai_function.bind(this));
pomelo.on("onGetUinfo", this.onGetUinfo_function.bind(this));
pomelo.on("onShoupai", this.onShoupai_function.bind(this));
pomelo.on("onSendGift", this.onSendGift_function.bind(this));
pomelo.on("onOpen", this.onOpen_function.bind(this));
pomelo.on("onQieguo", this.onQieguo_function.bind(this));
pomelo.on("onEnd", this.onEnd_function.bind(this));
pomelo.on("onActBroadcast", this.onUserBroadcast_function.bind(this));
},
onReady_function: function(t) {
cc.log("pomelo on Ready:" + t.location + " is ready");
for (var e = 0; e < g_players.length; e++) {
var i = g_players[e].getComponent("tdk_player");
if (i.position_server == t.location) {
i.setSpriteStatus("yizhunbei");
i.stop_timer();
break;
}
}
},
onGetZhuang_function: function(t) {
cc.log("pomelo onGetzhuang_function:" + JSON.stringify(t));
var e = cc.director.getWinSize(), i = t.nums[0], n = t.nums[1];
this.zhuang_serverPosition = t.zhuang_local;
this.suiji_qiangzhuang.active = !0;
for (var o = 0; o < this.players.length; o++) {
var s = this.players[o];
if (s.getComponent("tdk_player").position_server == this.zhuang_serverPosition) {
var r = cc.instantiate(g_assets.yaoshaizi);
r.getComponent("shai_zhong_active").init_start(null, i, n, s.getPosition());
this.node.addChild(r);
r.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 4 * 1.8)));
var a = cc.callFunc(this.getzhuang_callback, this);
this.node.runAction(cc.sequence(cc.delayTime(3), a));
break;
}
}
},
onXiazhu_function: function(t) {
cc.log("onXiazhu_function:" + JSON.stringify(t));
t.location;
for (var e = t.chips, i = 0; i < g_players.length; i++) {
var n = g_players[i].getComponent("tdk_player");
if (n.position_server == t.location) {
n.set_chips(1, e[0]);
n.set_chips(2, e[1]);
break;
}
}
},
onFapai_function: function(t) {
cc.log("onFapai" + JSON.stringify(t));
var e = cc.director.getWinSize();
this.cur_turn = t.cur_turn;
if (0 == this.cur_turn) {
for (var i = 0; i < this.left_cards.length; i++) {
this.left_cards[i].removeFromParent();
}
this.left_cards.splice(0, this.left_cards.length);
}
this.startDealCardPosition = t.location;
for (i = 0; i < this.betPhotoArray.length; i++) this.betPhotoArray[i].removeFromParent();
this.betPhotoArray.splice(0, this.betPhotoArray.length);
for (i = 0; i < this.players.length; i++) {
(n = this.players[i].getComponent("tdk_player")).remove_cards();
n.remove_select_cards();
}
this.sumBet = t.all_chip;
for (i = 0; i < g_players.length; i++) {
(n = g_players[i].getComponent("tdk_player")).hide_game_sprite();
}
for (i = 0; i < this.players.length; i++) {
var n, o = this.players[i];
if ((n = o.getComponent("tdk_player")).position_server == this.startDealCardPosition) {
var s = t.nums[0], r = t.nums[1], a = cc.instantiate(g_assets.yaoshaizi);
a.getComponent("shai_zhong_active").init_start(null, s, r, o.getPosition());
this.node.addChild(a);
a.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 4 * 1.8)));
break;
}
}
},
onShoupai_function: function(t) {
cc.log("onShoupai:" + JSON.stringify(t));
this.myselfCards.splice(0, this.myselfCards.length);
this.count = t.round;
for (var e = t.paixing, i = 0; i < e.length; i++) this.myselfCards.push(e[i]);
cc.log("myselfCards:" + JSON.stringify(this.myselfCards));
this.myselfCardsReach = !0;
var n = new Array(), o = this.startDealCardPosition;
for (i = 0; i < 4; i++) {
var s = o % 4;
0 == s && (s = 4);
n.push(s);
o += 1;
}
cc.log("fapai_order:" + JSON.stringify(n));
this.actionFaPai(this, n);
},
onPeiPai_function: function(t) {
cc.log("onPeipai_function:" + JSON.stringify(t));
for (var e = t.location, i = t.select, n = t.flag, o = 0; o < g_players.length; o++) {
var s = g_players[o], r = s.getComponent("tdk_player");
if (r.position_server == e) {
for (var a = r.my_cards, c = new Array(), l = new Array(), h = 0; h < a.length; h++) {
var _ = !1, u = a[h], p = u.getComponent("pj_card");
cc.log("card_item_com id:" + p.id + " selected_cards:" + r.selected_cards.length);
for (var g = 0; g < i.length; g++) if (p.id == i[g]) {
_ = !0;
break;
}
0 == _ ? c.push(u) : l.push(u);
}
if (1 == n) {
for (g = 0; g < l.length; g++) {
l[g].getComponent("pj_card").id = g;
}
for (g = 0; g < c.length; g++) {
c[g].getComponent("pj_card").id = g + 2;
}
this.set_cards_w(s, l);
this.set_cards_h(s, c);
} else {
for (g = 0; g < l.length; g++) {
l[g].getComponent("pj_card").id = g + 2;
}
for (g = 0; g < c.length; g++) {
c[g].getComponent("pj_card").id = g;
}
this.set_cards_w(s, c);
this.set_cards_h(s, l);
}
break;
}
}
},
onPeiPaiFinish_function: function(t) {
g_myselfPlayerPos == this.zhuang_serverPosition && this.get_one_button("kaipai", !0);
},
onEnd_function: function(t) {
cc.log("onEnd:" + JSON.stringify(t));
var e = t.scores;
this.qieguo = t.isqie;
this.sumBet = this.sumBet + e[this.zhuang_serverPosition - 1];
for (var i = 0; i < g_players.length; i++) {
var n = g_players[i].getComponent("tdk_player");
n.resetMoneyLabel(n.my_gold + e[n.position_server - 1]);
if (n.position_server != this.zhuang_serverPosition) if (0 < e[n.position_server - 1]) {
n.setGameStatus("winner");
this.actionWinnerGetBet(this.zhuang_serverPosition, n.position_server, !0);
} else if (e[n.position_server - 1] < 0) {
n.setGameStatus("loser");
this.actionWinnerGetBet(n.position_server, this.zhuang_serverPosition, !0);
} else {
n.setGameStatus("equal");
this.actionWinnerGetBet(0, 0, !1);
}
}
},
onQieguo_function: function(t) {
cc.log("onQieguo_function:" + JSON.stringify(t));
var e = cc.director.getVisibleSize();
if (0 == t.flag) {
if (g_myselfPlayerPos != this.zhuang_serverPosition) {
for (var i = 0; i < this.players.length; i++) {
var n = this.players[i].getComponent("tdk_player");
if (n.position_server == g_myselfPlayerPos) {
n.set_chips(1, 0);
n.set_chips(2, 0);
}
}
this.get_one_button("xiazhu", !0);
}
} else {
var o = t.scores, s = new Array();
for (i = 0; i < g_players_data.length; i++) {
var r = g_players_data[i];
if (null != r && "null" != r) {
var a = new Array();
a.push(r.nick_name);
a.push(r.head_img_url);
r.location == this.zhuang_serverPosition ? a.push(100) : a.push(0);
a.push(o[r.location - 1]);
if (r.location == g_myselfPlayerPos) {
var c = {
player_id: g_user.id,
renshu: g_room_data.real_num,
game_status: a[3] - a[2],
status: a[3] - a[2],
creat_time: g_room_data.creat_time,
room_num: g_room_data.room_num,
use_fangka: 1
};
2 == g_room_data.fangka_type && (g_myselfPlayerPos == this.zhuang_serverPosition ? c.use_fangka = g_room_data.fangka_num : c.use_fangka = 0);
Servers.gameInfoProcess("update_game", c, function(t) {});
}
s.push(a);
}
}
var l = this, h = e.width / 2, _ = e.height / 2, u = cc.instantiate(g_assets.pop_game_finish), p = u.getComponent("pop_game_finish");
this.node.addChild(u);
p.init_info(s, function() {
l.onExit();
});
u.setPosition(this.node.convertToNodeSpaceAR(cc.p(h, _)));
}
},
onOpen_function: function(t) {
cc.log("onOpen_function:" + JSON.stringify(t));
for (var e = t.all_pai, i = 0; i < this.players.length; i++) {
var n = this.players[i].getComponent("tdk_player"), o = e[n.position_server - 1];
if (n.position_server != g_myselfPlayerPos) for (var s = 0; s < 4; s++) {
var r = n.my_cards[s].getComponent("pj_card");
r.initCardSprite(o[r.id]);
var a = cc.sequence(cc.delayTime(.45), cc.hide()), c = cc.rotateBy(.45, 0, -90), l = cc.spawn(a, c), h = cc.sequence(cc.delayTime(.45), cc.show()), _ = cc.rotateBy(.6, 0, -360), u = cc.spawn(h, _);
r.sprite_back.node.runAction(l);
r.sprite.runAction(u);
}
}
},
onUserBroadcast_function: function(t) {
console.log("onUserBroadcast:" + JSON.stringify(t));
this.msage_scroll.getComponent("msage_scroll").set_string(t);
},
onGetUinfo_function: function(t) {
console.log("onGetUinfo_function:" + JSON.stringify(t));
var e = cc.director.getWinSize();
if (t.send_from == g_myselfPlayerPos) {
this.uinfo = cc.instantiate(g_assets.pop_game_user);
this.uinfo.getComponent("pop_game_user_info").init_info(t, this.actionSendGift);
this.node.addChild(this.uinfo);
this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.p(e.width / 2, e.height / 2)));
}
},
onSendGift_function: function(t) {
cc.log("actionSendGift", n, o, s);
var e = null, i = null, n = t.type, o = t.send_from, s = t.send_to;
if (o == s) return !1;
for (var r = 0; r < g_players.length; r++) {
var a = g_players[r].getComponent("tdk_player");
a.position_server == o && (e = g_players[r]);
a.position_server == s && (i = g_players[r]);
}
var c = null, l = null;
if (1 == n) {
c = cc.instantiate(g_assets.shoe_active);
l = "shoe_active";
} else if (2 == n) {
c = cc.instantiate(g_assets.egg_active);
l = "egg_active";
} else if (3 == n) {
c = cc.instantiate(g_assets.bomb_active);
l = "bomb_active";
} else if (4 == n) {
c = cc.instantiate(g_assets.kiss_active);
l = "kiss_active";
} else if (5 == n) {
c = cc.instantiate(g_assets.flower_active);
l = "flower_active";
} else if (6 == n) {
c = cc.instantiate(g_assets.cheers_active);
l = "cheers_active";
}
this.node.addChild(c);
c.setPosition(e.getPosition());
var h = cc.moveTo(.5, i.getPosition()), _ = cc.rotateBy(.5, 360), u = cc.spawn(h, _), p = cc.callFunc(function() {
c.getComponent("bomb_action").play(l);
});
c.runAction(cc.sequence(u, p));
},
actionSendGift: function(t, e, i) {
pomelo.request(util.getGameRoute(), {
process: "send_gift",
send_from: e,
send_to: i,
type: t
}, function(t) {
console.log("-----quit------" + JSON.stringify(t));
});
},
actionFaPai: function(t, e) {
cc.log("actionFaPai:" + JSON.stringify(e));
cc.director.getVisibleSize();
for (var i = e.shift(), n = 0; n < this.players.length; n++) {
var o = this.players[n], s = o.getComponent("tdk_player"), r = this.myselfCards[i - 1];
cc.log("actionFaPai card_type:" + JSON.stringify(r) + " position_server:" + s.position_server + " local:" + i);
if (s.position_server == i) {
for (var a = 0; a < 4; a++) {
var c = s.addPlayerCard(), l = c.getComponent("pj_card");
if (s.position_server == g_myselfPlayerPos) {
l.installTouch();
s.set_card_sprite(a, r[a]);
}
var h = this.calc_player_card_position(o, a);
c.setPosition(h);
}
break;
}
}
if (0 != e.length) {
var _ = cc.callFunc(this.actionFaPai, this, e);
this.node.runAction(cc.sequence(cc.delayTime(.45), _));
} else {
var u = cc.callFunc(this.fapai_finish, this);
this.node.runAction(cc.sequence(cc.delayTime(1), u));
}
},
fapai_finish: function() {
for (var t = 0; t < g_players.length; t++) {
var e = g_players[t].getComponent("tdk_player");
if (e.position_server == g_myselfPlayerPos) {
for (var i = 0; i < 4; i++) {
var n = cc.sequence(cc.delayTime(.45), cc.hide()), o = cc.rotateBy(.45, 0, -90), s = cc.spawn(n, o), r = cc.sequence(cc.delayTime(.45), cc.show()), a = cc.rotateBy(.6, 0, -360), c = cc.spawn(r, a), l = e.my_cards[i].getComponent("pj_card");
l.sprite_back.node.runAction(s);
l.sprite.runAction(c);
}
break;
}
}
this.get_one_button("peipai", !0);
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
i.position_server == this.zhuang_serverPosition && (s = 2 == i.player_position || 4 == i.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 80 + s + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
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
i.position_server == this.zhuang_serverPosition && (s = 2 == i.player_position || 4 == i.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 80 + s + (this.pai_back_sprite.node.getContentSize().width + 2) * e;
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
i.position_server == this.zhuang_serverPosition && (s = 2 == i.player_position || 4 == i.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
if (1 == i.player_position || 3 == i.player_position) {
n = i.chips_label.getPositionX() - i.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + 80 + s + (this.pai_back_sprite.node.getContentSize().width + 2) + this.pai_back_sprite.node.getContentSize().height / 2 + 2;
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
actionWinnerGetBet: function(t, e, i) {
if (1 == i) {
for (var n = null, o = null, s = 0; s < g_players.length; s++) {
var r = g_players[s], a = r.getComponent("tdk_player");
a.position_server == t ? n = r : a.position_server == e && (o = r);
}
var c = cc.instantiate(g_assets.chip);
this.node.addChild(c);
this.betPhotoArray.push(c);
c.setPosition(n.getPosition());
var l = cc.moveTo(.5, o.getPosition());
c.runAction(cc.sequence(l, cc.hide()));
}
var h = cc.callFunc(this.ready_next_turn, this);
this.node.runAction(cc.sequence(cc.delayTime(1), h));
},
ready_next_turn: function() {
if (0 == this.cur_turn) for (var t = 0; t < this.myselfCards.length; t++) for (var e = this.myselfCards[t], i = 0; i < e.length; i++) {
var n = cc.instantiate(g_assets.pj_card), o = n.getComponent("pj_card");
o.initCardSprite(e[i]);
o.sprite.runAction(cc.show());
o.sprite_back.node.runAction(cc.hide());
this.left_card_layout.addChild(n);
this.left_cards.push(n);
}
for (t = 0; t < this.players.length; t++) {
(s = this.players[t].getComponent("tdk_player")).remove_cards();
s.remove_select_cards();
}
if (g_myselfPlayerPos == this.zhuang_serverPosition) if (1 == this.qieguo) {
this.qieguo_button.active = !0;
this.buqie_button.active = !0;
this.qieguo_button.getComponent("cc.Button").interactable = !0;
this.buqie_button.getComponent("cc.Button").interactable = !0;
} else if (2 == this.qieguo) {
this.qieguo_button.active = !0;
this.buqie_button.active = !0;
this.qieguo_button.getComponent("cc.Button").interactable = !0;
this.buqie_button.getComponent("cc.Button").interactable = !1;
}
if (g_myselfPlayerPos != this.zhuang_serverPosition && 0 == this.qieguo) {
for (t = 0; t < this.players.length; t++) {
var s;
if ((s = this.players[t].getComponent("tdk_player")).position_server == g_myselfPlayerPos) {
s.set_chips(1, 0);
s.set_chips(2, 0);
}
}
this.get_one_button("xiazhu", !0);
}
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
this.suiji_qiangzhuang.active = !1;
for (var t = [ "zhuang", "chumen", "tianmen", "momen" ], e = 0; e < this.players.length; e++) {
if ((s = (o = this.players[e]).getComponent("tdk_player")).position_server == this.zhuang_serverPosition) {
s.setSpriteStatus(t[0]);
s.resetMoneyLabel(this.sumBet);
s.install_chip_label(!0);
var i = this.calc_player_chip_position(o);
s.chips_label.setPosition(i);
} else {
var n = 0;
cc.log("position_server:" + s.position_server + " zhuang_serverPosition:" + this.zhuang_serverPosition);
s.position_server > this.zhuang_serverPosition ? n = s.position_server - this.zhuang_serverPosition : s.position_server < this.zhuang_serverPosition && (n = s.position_server - this.zhuang_serverPosition + 4);
s.setSpriteStatus(t[n]);
s.install_chip_label(!1);
i = this.calc_player_chip_position(o);
s.chips_label.setPosition(i);
}
}
if (g_myselfPlayerPos != this.zhuang_serverPosition) {
for (e = 0; e < this.players.length; e++) {
var o, s;
if ((s = (o = this.players[e]).getComponent("tdk_player")).position_server == g_myselfPlayerPos) {
s.set_chips(1, 0);
s.set_chips(2, 0);
}
}
this.get_one_button("xiazhu", !0);
} else {
this.zhunbei_button.getComponent(cc.Button).interactable = !1;
this.zhunbei_button.active = !1;
}
},
silder_callback: function(t, e, i) {
cc.log("pj_game_scene silder1:" + i);
for (var n = 0; n < g_players.length; n++) {
var o = g_players[n].getComponent("tdk_player");
if (o.position_server == g_myselfPlayerPos) {
o.set_chips(e, i);
break;
}
}
t.get_one_button("queding", !0);
},
pomelo_removeListener: function() {
cc.log("remove listener");
pomelo.removeListener("onReady");
pomelo.removeListener("onGetZhuang");
pomelo.removeListener("onXiazhu");
pomelo.removeListener("onPeiPai");
pomelo.removeListener("onPeiPaiFinish");
pomelo.removeListener("onFapai");
pomelo.removeListener("onGetUinfo");
pomelo.removeListener("onShoupai");
pomelo.removeListener("onSendGift");
pomelo.removeListener("onOpen");
pomelo.removeListener("onQieguo");
pomelo.removeListener("onEnd");
pomelo.removeListener("onActBroadcast");
},
onExit: function() {
g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
null != g_music_key && g_music_key != BOOL.YES || cc.audioEngine.stop(this.current);
g_players_data.splice(0, g_players_data.length);
g_room_data = null;
g_players.splice(0, g_players.length);
console.log("exit from the room......");
this.pomelo_removeListener();
this.destroy();
}
});
cc._RF.pop();
}, {} ],
player_select: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "6cd10KaJURMSYNzEA/Ev8Cf", "player_select");
cc.Class({
extends: cc.Component,
properties: {
index: 0,
type: 0,
data: null,
flag: !1
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
set_data: function(t) {
this.data = t;
},
get_data: function() {
return this.data;
},
set_flag: function(t) {
this.flag = t;
},
get_flag: function() {
return this.flag;
}
});
cc._RF.pop();
}, {} ],
"pomelo-client": [ function(L, R, t) {
"use strict";
cc._RF.push(R, "f46b8iXN9NIP6/33SIBNQ7O", "pomelo-client");
(function() {
var r = L("protocol"), a = r.Package, c = r.Message, t = window.EventEmitter;
"undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
"function" != typeof Object.create && (Object.create = function(t) {
function e() {}
e.prototype = t;
return new e();
});
var e = window, l = Object.create(t.prototype);
e.pomelo = l;
var i = null, n = 0, o = {}, s = {}, h = {}, _ = 0, u = 0, p = 0, g = null, d = null, f = null, m = {
sys: {
type: "js-websocket",
version: "0.0.1"
},
user: {}
}, y = null;
l.init = function(t, e) {
y = e;
var i = t.host, n = t.port, o = "ws://" + i;
n && (o += ":" + n);
console.log("pomelo init:" + o);
m.user = t.user;
f = t.handshakeCallback;
v(o, e);
};
var v = function(t, e) {
(i = new WebSocket(t)).binaryType = "arraybuffer";
i.onopen = function(t) {
var e = a.encode(a.TYPE_HANDSHAKE, r.strencode(JSON.stringify(m)));
C(e);
};
i.onmessage = function(t) {
console.log("pomelo onmessage........");
w(a.decode(t.data), e);
u && (p = Date.now() + u);
};
i.onerror = function(t) {
l.emit("io-error", t);
console.log("socket error: ", t);
};
i.onclose = function(t) {
l.emit("close", t);
l.emit("disconnect", t);
console.log("socket close: ", t);
};
console.log("pomelo init finish");
};
l.disconnect = function() {
if (i) {
i.disconnect && i.disconnect();
i.close && i.close();
console.log("disconnect");
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
l.request = function(t, e, i) {
if (2 === arguments.length && "function" == typeof e) {
i = e;
e = {};
} else e = e || {};
if (t = t || e.route) {
b(++n, t, e);
o[n] = i;
h[n] = t;
}
};
l.notify = function(t, e) {
b(0, t, e = e || {});
};
var b = function(t, e, i) {
var n = t ? c.TYPE_REQUEST : c.TYPE_NOTIFY;
i = (l.data.protos ? l.data.protos.client : {})[e] ? protobuf.encode(e, i) : r.strencode(JSON.stringify(i));
var o = 0;
if (l.dict && l.dict[e]) {
e = l.dict[e];
o = 1;
}
i = c.encode(t, n, o, e, i);
var s = a.encode(a.TYPE_DATA, i);
C(s);
}, C = function(t) {
i.send(t.buffer);
}, S = function t() {
var e = p - Date.now();
if (100 < e) d = setTimeout(t, e); else {
cc.error("server heartbeat timeout");
l.emit("heartbeat timeout");
l.disconnect();
}
};
s[a.TYPE_HANDSHAKE] = function(t) {
if (501 !== (t = JSON.parse(r.strdecode(t))).code) if (200 === t.code) {
E(t);
var e = a.encode(a.TYPE_HANDSHAKE_ACK);
C(e);
if (y) {
y(i);
y = null;
}
} else l.emit("error", "handshake fail"); else l.emit("error", "client version not fullfill");
};
s[a.TYPE_HEARTBEAT] = function(t) {
if (_) {
var e = a.encode(a.TYPE_HEARTBEAT);
if (d) {
clearTimeout(d);
d = null;
}
g || (g = setTimeout(function() {
g = null;
C(e);
p = Date.now() + u;
d = setTimeout(S, u);
}, _));
}
};
s[a.TYPE_DATA] = function(t) {
var e = c.decode(t);
if (0 < e.id) {
e.route = h[e.id];
delete h[e.id];
if (!e.route) return;
}
e.body = P(e);
k(l, e);
};
s[a.TYPE_KICK] = function(t) {
t = JSON.parse(r.strdecode(t));
l.emit("onKick", t);
};
var w = function(t) {
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
var e = l.data.protos ? l.data.protos.server : {}, i = l.data.abbrs, n = t.route;
if (t.compressRoute) {
if (!i[n]) return {};
n = t.route = i[n];
}
return e[n] ? protobuf.decode(n, t.body) : JSON.parse(r.strdecode(t.body));
}, E = function(t) {
if (t.sys && t.sys.heartbeat) {
_ = 1e3 * t.sys.heartbeat;
u = 2 * _;
} else u = _ = 0;
N(t);
"function" == typeof f && f(t.user);
}, N = function(t) {
if (t && t.sys) {
l.data = l.data || {};
var e = t.sys.dict, i = t.sys.protos;
if (e) {
l.data.dict = e;
l.data.abbrs = {};
for (var n in e) l.data.abbrs[e[n]] = n;
}
if (i) {
l.data.protos = {
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
R.exports = l;
})();
cc._RF.pop();
}, {
protocol: "protocol"
} ],
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
this.room_num = new Array();
this.node.on("pressed", this.switchRadio, this);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.node);
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
player_id: g_user.id,
room_num: t,
rid: null
};
enter_wait_room(i, this);
},
close_scene: function() {
this.node.active = !1;
this.node.destroy();
}
});
cc._RF.pop();
}, {} ],
pop_game_action: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "dfb59ONzBZFg59ZmmgPe0+v", "pop_game_action");
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
animStatus: null,
audio: null,
audioStatus: null
},
onLoad: function() {
cc.log("load gift active class");
this.shoe_active.active = !1;
this.egg_active.active = !1;
this.bomb_active.active = !1;
this.kiss_active.active = !1;
this.flower_active.active = !1;
this.cheers_active.active = !1;
this.show_egg();
},
onFinished: function() {
cc.log("shoe active finish", this.isValid);
1 == this.show_type ? this.shoe_active.active = !1 : 2 == this.show_type ? this.egg_active.active = !1 : 3 == this.show_type ? this.bomb_active.active = !1 : 4 == this.show_type ? this.kiss_active.active = !1 : 5 == this.show_type ? this.flower_active.active = !1 : 6 == this.show_type && (this.cheers_active.active = !1);
this.is_finish = !0;
this.is_start = !1;
this.node.parent = null;
this.node.destroy();
},
show_shoe: function() {
this.shoe_active.active = !0;
this.shoe_active.getComponent("bomb_action").play("shoe_active");
},
show_egg: function() {
this.egg_active.active = !0;
this.egg_active.getComponent("bomb_action").play("egg_active");
},
show_bomb: function() {
this.bomb_active.active = !0;
this.bomb_active.getComponent("bomb_action").play("bomb_active");
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
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.node);
},
init_info: function(t, e) {
this.cb = e;
cc.log("pop game finish:" + JSON.stringify(t));
for (var i = 0; i < t.length; i++) {
var n = t[i], o = this.items[i];
this.set_item_info(o, n);
o.active = !0;
}
},
set_item_info: function(t, e) {
var i = t.getChildByName("user_layout"), n = i.getChildByName("user_sprite").getComponent("cc.Sprite"), o = i.getChildByName("user_label").getComponent("cc.Label"), s = t.getChildByName("slabel").getComponent("cc.Label"), r = t.getChildByName("elabel").getComponent("cc.Label"), a = t.getChildByName("dlabel").getComponent("cc.Label");
o.string = e[0];
null != e[1] && cc.loader.load({
url: e[1],
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
n.spriteFrame = i;
});
s.string = e[2];
r.string = e[3];
a.string = e[3] - e[2];
},
callback_tuichu: function() {
var e = this, t = {
rid: g_room_data.rid,
player_id: g_user.id,
location: null
};
pomelo.request(util.getLeaveRoomRoute(), t, function(t) {
cc.log(JSON.stringify(t));
e.node.active = !1;
e.cb();
cc.director.loadScene("MainScene");
});
}
});
cc._RF.pop();
}, {} ],
pop_game_user_info: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "28973LNYvZCvo0j8HuItTFl", "pop_game_user_info");
cc.Class({
extends: cc.Component,
properties: {
bg_sprite: cc.Node,
touxiang: cc.Sprite,
shoe_node: cc.Node,
egg_node: cc.Node,
bomb_node: cc.Node,
kiss_node: cc.Node,
flower_node: cc.Node,
cheer_node: cc.Node,
vnickname_lable: cc.Label,
vfangka_label: cc.Label,
vsex_label: cc.Label,
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
var i = e.getCurrentTarget(), n = i.convertToNodeSpaceAR(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
if (cc.rectContainsPoint(s, n)) cc.log("ok touch in the region......"); else {
cc.log("touch remove from parent");
r.node.active = !1;
}
}
}, r.bg_sprite);
},
init_info: function(t, e) {
var n = this;
this.vnickname_lable.string = t.player.nick_name;
this.vfangka_label.string = t.player.fangka_num;
1 == t.player.gender ? this.vsex_label.string = "男" : this.vsex_label.string = "女";
null != t.player.head_img_url && cc.loader.load({
url: t.player.head_img_url,
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
n.touxiang.spriteFrame = i;
});
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
this.call_back(e, this.send_from, this.location);
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
pop_help: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "9b897R+UB9EupC/kAj6bv1+", "pop_help");
cc.Class({
extends: cc.Component,
properties: {},
onClose: function() {
this.node.active = !1;
this.node.destroy();
},
onLoad: function() {},
start: function() {}
});
cc._RF.pop();
}, {} ],
pop_net_error: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "503299Pdn1D/rd8w3uXSpw3", "pop_net_error");
cc.Class({
extends: cc.Component,
properties: {
message: cc.Label,
error_sprite: cc.Sprite,
cb: null
},
onLoad: function() {
this.updateTimer = 0;
this.updateInterval = .2;
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
}, this.error_sprite);
},
show_error_info: function(t, e) {
this.message.string = t;
this.cb = e;
},
update: function(t) {
this.updateTimer += t;
if (!(this.updateTimer < this.updateInterval)) {
this.updateTimer = 0;
if (cc.sys.os == cc.sys.OS_ANDROID) {
if (-1 != jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I")) {
this.cb();
this.node.active = !1;
this.node.destroy();
}
} else if (cc.sys.os == cc.sys.OS_IOS) {
if (-1 != jsb.reflection.callStaticMethod("NativeOcClass", "getNetType")) {
this.cb();
this.node.active = !1;
this.node.destroy();
}
}
}
}
});
cc._RF.pop();
}, {} ],
pop_set_scene: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "cd66dahiX9BG5Wye2ZRSv9U", "pop_set_scene");
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
var i = e.getCurrentTarget(), n = i.convertToNodeSpaceAR(t.getLocation()), o = i.getContentSize(), s = cc.rect(0, 0, o.width, o.height);
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
t.stopPropagation();
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
prop_isok_info: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "08bd6H2aJ9NN4tpZX08yodu", "prop_isok_info");
cc.Class({
extends: cc.Component,
properties: {
message: cc.Label,
callback: null,
flag: !1
},
onLoad: function() {
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
onTouchBegan: function(t, e) {
return !0;
},
onTouchMoved: function(t, e) {},
onTouchEnded: function(t, e) {}
}, this.node);
},
show_error_info: function(t) {
this.message.string = t;
var e = cc.callFunc(this.button_no, this);
this.node.runAction(cc.sequence(cc.fadeOut(20), e));
},
init: function(t) {
this.callback = t;
},
button_ok: function() {
this.flag = !0;
this.callback(this.flag);
this.node.destroy();
},
button_no: function() {
this.flag = !1;
this.callback(this.flag);
this.node.destroy();
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
return i && 0 < (r = l(s, r, i, e)) ? s.subarray(0, r) : null;
};
function l(t, e, i, n) {
for (var o in n) if (i[o]) {
var s = i[o];
switch (s.option) {
case "required":
case "optional":
e = _(t, e, u(s.type, s.tag));
e = a(n[o], s.type, e, t, i);
break;

case "repeated":
0 < n[o].length && (e = h(n[o], s, e, t, i));
}
}
return e;
}
function a(t, e, i, n, o) {
switch (e) {
case "uInt32":
i = _(n, i, c.encodeUInt32(t));
break;

case "int32":
case "sInt32":
i = _(n, i, c.encodeSInt32(t));
break;

case "float":
_(n, i, c.encodeFloat(t));
i += 4;
break;

case "double":
_(n, i, c.encodeDouble(t));
i += 8;
break;

case "string":
var s = c.byteLength(t);
i = _(n, i, c.encodeUInt32(s));
c.encodeStr(n, i, t);
i += s;
break;

default:
if (o.__messages[e]) {
var r = new ArrayBuffer(c.byteLength(JSON.stringify(t)));
s = l(r, s = 0, o.__messages[e], t);
i = _(n, i, c.encodeUInt32(s));
for (var a = 0; a < s; a++) {
n[i] = r[a];
i++;
}
}
}
return i;
}
function h(t, e, i, n, o) {
var s = 0;
if (r.isSimpleType(e.type)) {
i = _(n, i = _(n, i, u(e.type, e.tag)), c.encodeUInt32(t.length));
for (s = 0; s < t.length; s++) i = a(t[s], e.type, i, n);
} else for (s = 0; s < t.length; s++) {
i = _(n, i, u(e.type, e.tag));
i = a(t[s], e.type, i, n, o);
}
return i;
}
function _(t, e, i) {
for (var n = 0; n < i.length; n++, e++) t[e] = i[n];
return e;
}
function u(t, e) {
var i = o.TYPES[t] || 2;
return c.encodeUInt32(e << 3 | i);
}
})("undefined" != typeof protobuf ? protobuf : n.exports);
(function(t, e) {
var a, i = t, n = t.decoder = {}, c = i.codec, s = i.util, l = 0;
n.init = function(t) {
this.protos = t || {};
};
n.setProtos = function(t) {
t && (this.protos = t);
};
n.decode = function(t, e) {
var i = this.protos[t];
a = e;
l = 0;
return i ? h({}, i, a.length) : null;
};
function h(t, e, i) {
for (;l < i; ) {
var n = (void 0, {
type: 7 & (r = c.decodeUInt32(p())),
tag: r >> 3
}), o = n.tag, s = e.__tags[o];
switch (e[s].option) {
case "optional":
case "required":
t[s] = _(e[s].type, e);
break;

case "repeated":
t[s] || (t[s] = []);
u(t[s], e[s].type, e);
}
}
var r;
return t;
}
function _(t, e) {
switch (t) {
case "uInt32":
return c.decodeUInt32(p());

case "int32":
case "sInt32":
return c.decodeSInt32(p());

case "float":
var i = c.decodeFloat(a, l);
l += 4;
return i;

case "double":
var n = c.decodeDouble(a, l);
l += 8;
return n;

case "string":
var o = c.decodeUInt32(p()), s = c.decodeStr(a, l, o);
l += o;
return s;

default:
if (e && e.__messages[t]) {
o = c.decodeUInt32(p());
var r = {};
h(r, e.__messages[t], l + o);
return r;
}
}
}
function u(t, e, i) {
if (s.isSimpleType(e)) for (var n = c.decodeUInt32(p()), o = 0; o < n; o++) t.push(_(e)); else t.push(_(e, i));
}
function p(t) {
var e, i = [], n = l;
t = t || !1;
do {
e = a[n];
i.push(e);
n++;
} while (128 <= e);
t || (l = n);
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
a = l(e, i, r, a);
m(e) && (a = h(t, r, a));
y(e) && (a = _(i, n, r, a));
o && (a = u(o, r, a));
return r;
};
o.decode = function(t) {
var e = new g(t), i = e.length || e.byteLength, n = 0, o = 0, s = null, r = e[n++], a = 1 & r, c = r >> 1 & 7;
if (m(c)) {
var l = parseInt(e[n]), h = 0;
do {
o += (127 & (l = parseInt(e[n]))) * Math.pow(2, 7 * h);
n++;
h++;
} while (128 <= l);
}
if (y(c)) if (a) s = e[n++] << 8 | e[n++]; else {
var _ = e[n++];
if (_) {
s = new g(_);
f(s, 0, e, n, _);
s = d.strdecode(s);
} else s = "";
n += _;
}
var u = i - n, p = new g(u);
f(p, 0, e, n, u);
return {
id: o,
type: c,
compressRoute: a,
route: s,
body: p
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
}, l = function(t, e, i, n) {
if (t !== o.TYPE_REQUEST && t !== o.TYPE_NOTIFY && t !== o.TYPE_RESPONSE && t !== o.TYPE_PUSH) throw new Error("unkonw message type: " + t);
i[n] = t << 1 | (e ? 1 : 0);
return n + 1;
}, h = function(t, e, i) {
do {
var n = t % 128, o = Math.floor(t / 128);
0 !== o && (n += 128);
e[i++] = n;
t = o;
} while (0 !== t);
return i;
}, _ = function(t, e, i, n) {
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
record_item: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "46030o+yUtK/ZBAGK5EYmIY", "record_item");
cc.Class({
extends: cc.Component,
properties: {
order_id: cc.Node,
fangka_num: cc.Node,
money: cc.Node,
creat_time: cc.Node,
sbutton: cc.Node,
itemID: null,
pthis: null,
data: null
},
init: function(t, e, i) {
this.itemID = t;
this.pthis = i;
this.data = e;
this.order_id.getComponent("cc.Label").string = e.order_id;
this.fangka_num.getComponent("cc.Label").string = e.fangka_num;
this.money.getComponent("cc.Label").string = e.zongjia;
this.creat_time.getComponent("cc.Label").string = e.creat_time;
if (1 == e.status) {
this.sbutton.getComponent("cc.Button").interactable = !1;
this.sbutton.getChildByName("label").getComponent("cc.Label").string = "完成";
}
if (0 == e.status) {
this.sbutton.getComponent("cc.Button").interactable = !0;
this.sbutton.getChildByName("label").getComponent("cc.Label").string = "去完成";
}
},
button_callback: function() {
this.pthis.node.active = !1;
this.pthis.node.destroy();
var t = cc.instantiate(g_assets.PopBuyOrderScene);
t.getComponent("buy_order").init(this.data);
pthis.parent.node.addChild(t);
t.setPosition(pthis.parent.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
}
});
cc._RF.pop();
}, {} ],
root_node: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "9fcd7Jev9JMiqFmrBsVBLAf", "root_node");
cc.Class({
extends: cc.Component,
properties: {
data: null
},
onLoad: function() {
cc.game.addPersistRootNode(this.node);
pomelo.on("disconnect", function() {
console.log("掉线了");
var t = -1;
cc.sys.os == cc.sys.OS_ANDROID ? t = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I") : cc.sys.os == cc.sys.OS_IOS && (t = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType"));
console.log("掉线了" + t);
-1 != t && Servers.getLogin(g_user.player_id, g_user.nickname, g_user.gender, g_user.headimgurl, function(t) {
console.log("get login info succ:" + JSON.stringify(t));
if (200 == t.code) {
var e = t.token;
Servers.getEntry(e, function(t) {
200 != t.code && util.show_error_info(null, null, t.msg);
});
} else util.show_error_info(null, null, t.msg);
});
});
pomelo.on("heartbeat timeout", function() {
console.log("心跳超时");
});
},
setdata: function(t) {
this.data = t;
},
getdata: function() {
return this.data;
}
});
cc._RF.pop();
}, {} ],
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
init_start: function(t, e, i, n) {
cc.log("load 筛盅 active class");
this.callback = t;
this.sz_num_1 = e;
this.sz_num_2 = i;
this.position = n;
this.shaizi_layout.active = !1;
this.anim = this.shai_zhong.getComponent(cc.Animation);
this.anim.on("finished", this.onFinished, this);
this.animStatus = this.anim.play("shai_zhong_active");
this.animStatus.wrapMode = cc.WrapMode.Normal;
this.animStatus.wrapMode = cc.WrapMode.Loop;
this.animStatus.repeatCount = 3;
},
onFinished: function() {
var e = this;
cc.log("shoe active finish", this.isValid);
e.shaizi_layout.active = !0;
e.shaizi_1.spriteFrame = g_assets["shaizi_" + e.sz_num_1];
e.shaizi_2.spriteFrame = g_assets["shaizi_" + e.sz_num_2];
e.shai_zhong.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
var t = cc.moveTo(.5, e.position);
e.shaizi_layout.runAction(cc.sequence(t, cc.fadeOut(2), cc.callFunc(function() {
null != e.callback && e.callback();
e.node.removeFromParent();
e.node.destroy();
})));
})));
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
my_chip1: 0,
my_chip2: 0,
position_server: 0,
player_position: 0,
is_power: 0,
mobile_sprite: cc.Sprite,
head_sprite: cc.Sprite,
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
var n = this;
this.id = t.id;
this.position_server = t.location;
this.is_power = t.is_power;
this.nick_name = t.nick_name;
this.my_gold = t.my_gold;
this.nick_name_label.getComponent(cc.Label).string = this.nick_name;
this.gold_label.getComponent(cc.Label).string = this.my_gold;
null != t.head_img_url && 0 < t.head_img_url.length ? cc.loader.load({
url: t.head_img_url,
type: "png"
}, function(t, e) {
var i = new cc.SpriteFrame(e);
n.head_sprite.spriteFrame = i;
}) : n.head_sprite.spriteFrame = g_assets.headimg;
1 == this.is_power && this.setSpriteStatus("yizhunbei");
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
set_card_sprite: function(t, e) {
cc.log("set_card_sprite: idx" + t + " rank:" + e);
this.my_cards[t].getComponent("pj_card").initCardSprite(e);
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
}, {} ]
}, {}, [ "LoadUpdateGame", "MainScene", "bomb_action", "bipai_choice", "one_choice", "player_select", "test", "pj_card", "add_chip", "pop_game_user", "pop_help", "pop_net_error", "prop_error_info", "prop_isok_info", "root_node", "shai_zhong_active", "game_player_item", "pop_game_finish", "select_compare", "tdk_player_item", "zjh_compare", "count_timer", "pj_game_room", "created_room_scene", "pj_create_game", "pop_enter_game", "Login", "PopXieyi", "msage_scroll", "tdk_player", "pop_set_scene", "buy_fangka", "buy_order", "game_history_item", "gonghui", "gonghui_empty", "gonghui_jiaru", "gonghui_shenqing", "gonghui_yuan", "gonghui_zhang", "my_game_info", "my_game_record", "my_game_zhanji", "record_item", "pop_game_action", "pop_game_user_info", "Consts", "payJS", "threedes", "emitter", "pomelo-client", "protobuf", "protocol" ]);