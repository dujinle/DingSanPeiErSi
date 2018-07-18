require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  Consts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7df7UuIW9LuovhAmnpX4Kz", "Consts");
    "use strict";
    var Consts = {
      TaskFlag: {
        everydayPlay8: 1001,
        everydayWin8: 1002,
        everydayExchange3: 1003,
        everydayAllIn1: 1004,
        everydayFinish: 1005,
        everydaySpeaker: 1006,
        recharge50: 1041,
        recharge500: 1042,
        recharge5000: 1043,
        recharge20000: 1044,
        systemPlay100: 1045,
        systemWin100: 1046,
        systemUp: 1047,
        systemDown: 1048,
        systemBaozi: 1049,
        systemTonghuashun: 1050,
        systemJinhua: 1051,
        system235: 1052,
        systemCoin30: 1053,
        systemRecharge50: 1054,
        systemAvatar: 1055,
        systemErpin: 1056,
        systemExpression1000: 1057,
        systemVip3: 1058
      }
    };
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = "undefined" !== typeof Uint8Array ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function placeHoldersCount(b64) {
      var len = b64.length;
      if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      return "=" === b64[len - 2] ? 2 : "=" === b64[len - 1] ? 1 : 0;
    }
    function byteLength(b64) {
      return 3 * b64.length / 4 - placeHoldersCount(b64);
    }
    function toByteArray(b64) {
      var i, l, tmp, placeHolders, arr;
      var len = b64.length;
      placeHolders = placeHoldersCount(b64);
      arr = new Arr(3 * len / 4 - placeHolders);
      l = placeHolders > 0 ? len - 4 : len;
      var L = 0;
      for (i = 0; i < l; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 255;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = 255 & tmp;
      }
      if (2 === placeHolders) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = 255 & tmp;
      } else if (1 === placeHolders) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = 255 & tmp;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[63 & num];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (255 & uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var output = "";
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      if (1 === extraBytes) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 63];
        output += "==";
      } else if (2 === extraBytes) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 63];
        output += lookup[tmp << 2 & 63];
        output += "=";
      }
      parts.push(output);
      return parts.join("");
    }
  }, {} ],
  2: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      var base64 = require("base64-js");
      var ieee754 = require("ieee754");
      var isArray = require("isarray");
      exports.Buffer = Buffer;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
      exports.kMaxLength = kMaxLength();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42;
            }
          };
          return 42 === arr.foo() && "function" === typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
        } catch (e) {
          return false;
        }
      }
      function kMaxLength() {
        return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function createBuffer(that, length) {
        if (kMaxLength() < length) throw new RangeError("Invalid typed array length");
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = new Uint8Array(length);
          that.__proto__ = Buffer.prototype;
        } else {
          null === that && (that = new Buffer(length));
          that.length = length;
        }
        return that;
      }
      function Buffer(arg, encodingOrOffset, length) {
        if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, encodingOrOffset, length);
        if ("number" === typeof arg) {
          if ("string" === typeof encodingOrOffset) throw new Error("If encoding is specified then the first argument must be a string");
          return allocUnsafe(this, arg);
        }
        return from(this, arg, encodingOrOffset, length);
      }
      Buffer.poolSize = 8192;
      Buffer._augment = function(arr) {
        arr.__proto__ = Buffer.prototype;
        return arr;
      };
      function from(that, value, encodingOrOffset, length) {
        if ("number" === typeof value) throw new TypeError('"value" argument must not be a number');
        if ("undefined" !== typeof ArrayBuffer && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, encodingOrOffset, length);
        if ("string" === typeof value) return fromString(that, value, encodingOrOffset);
        return fromObject(that, value);
      }
      Buffer.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        "undefined" !== typeof Symbol && Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
      function assertSize(size) {
        if ("number" !== typeof size) throw new TypeError('"size" argument must be a number');
        if (size < 0) throw new RangeError('"size" argument must not be negative');
      }
      function alloc(that, size, fill, encoding) {
        assertSize(size);
        if (size <= 0) return createBuffer(that, size);
        if (void 0 !== fill) return "string" === typeof encoding ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
        return createBuffer(that, size);
      }
      Buffer.alloc = function(size, fill, encoding) {
        return alloc(null, size, fill, encoding);
      };
      function allocUnsafe(that, size) {
        assertSize(size);
        that = createBuffer(that, size < 0 ? 0 : 0 | checked(size));
        if (!Buffer.TYPED_ARRAY_SUPPORT) for (var i = 0; i < size; ++i) that[i] = 0;
        return that;
      }
      Buffer.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      function fromString(that, string, encoding) {
        "string" === typeof encoding && "" !== encoding || (encoding = "utf8");
        if (!Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
        var length = 0 | byteLength(string, encoding);
        that = createBuffer(that, length);
        var actual = that.write(string, encoding);
        actual !== length && (that = that.slice(0, actual));
        return that;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : 0 | checked(array.length);
        that = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) that[i] = 255 & array[i];
        return that;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        array.byteLength;
        if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
        if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
        array = void 0 === byteOffset && void 0 === length ? new Uint8Array(array) : void 0 === length ? new Uint8Array(array, byteOffset) : new Uint8Array(array, byteOffset, length);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          that = array;
          that.__proto__ = Buffer.prototype;
        } else that = fromArrayLike(that, array);
        return that;
      }
      function fromObject(that, obj) {
        if (Buffer.isBuffer(obj)) {
          var len = 0 | checked(obj.length);
          that = createBuffer(that, len);
          if (0 === that.length) return that;
          obj.copy(that, 0, 0, len);
          return that;
        }
        if (obj) {
          if ("undefined" !== typeof ArrayBuffer && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if ("number" !== typeof obj.length || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
          }
          if ("Buffer" === obj.type && isArray(obj.data)) return fromArrayLike(that, obj.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function checked(length) {
        if (length >= kMaxLength()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
        return 0 | length;
      }
      function SlowBuffer(length) {
        +length != length && (length = 0);
        return Buffer.alloc(+length);
      }
      Buffer.isBuffer = function isBuffer(b) {
        return !!(null != b && b._isBuffer);
      };
      Buffer.compare = function compare(a, b) {
        if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError("Arguments must be Buffers");
        if (a === b) return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
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
          return true;

         default:
          return false;
        }
      };
      Buffer.concat = function concat(list, length) {
        if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === list.length) return Buffer.alloc(0);
        var i;
        if (void 0 === length) {
          length = 0;
          for (i = 0; i < list.length; ++i) length += list[i].length;
        }
        var buffer = Buffer.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer.isBuffer(string)) return string.length;
        if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
        "string" !== typeof string && (string = "" + string);
        var len = string.length;
        if (0 === len) return 0;
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "ascii":
         case "latin1":
         case "binary":
          return len;

         case "utf8":
         case "utf-8":
         case void 0:
          return utf8ToBytes(string).length;

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return 2 * len;

         case "hex":
          return len >>> 1;

         case "base64":
          return base64ToBytes(string).length;

         default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        (void 0 === start || start < 0) && (start = 0);
        if (start > this.length) return "";
        (void 0 === end || end > this.length) && (end = this.length);
        if (end <= 0) return "";
        end >>>= 0;
        start >>>= 0;
        if (end <= start) return "";
        encoding || (encoding = "utf8");
        while (true) switch (encoding) {
         case "hex":
          return hexSlice(this, start, end);

         case "utf8":
         case "utf-8":
          return utf8Slice(this, start, end);

         case "ascii":
          return asciiSlice(this, start, end);

         case "latin1":
         case "binary":
          return latin1Slice(this, start, end);

         case "base64":
          return base64Slice(this, start, end);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return utf16leSlice(this, start, end);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
        }
      }
      Buffer.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
        return this;
      };
      Buffer.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer.prototype.toString = function toString() {
        var length = 0 | this.length;
        if (0 === length) return "";
        if (0 === arguments.length) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer.prototype.equals = function equals(b) {
        if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return 0 === Buffer.compare(this, b);
      };
      Buffer.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
          str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
          this.length > max && (str += " ... ");
        }
        return "<Buffer " + str + ">";
      };
      Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (!Buffer.isBuffer(target)) throw new TypeError("Argument must be a Buffer");
        void 0 === start && (start = 0);
        void 0 === end && (end = target ? target.length : 0);
        void 0 === thisStart && (thisStart = 0);
        void 0 === thisEnd && (thisEnd = this.length);
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
        if (thisStart >= thisEnd && start >= end) return 0;
        if (thisStart >= thisEnd) return -1;
        if (start >= end) return 1;
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (0 === buffer.length) return -1;
        if ("string" === typeof byteOffset) {
          encoding = byteOffset;
          byteOffset = 0;
        } else byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648);
        byteOffset = +byteOffset;
        isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1);
        byteOffset < 0 && (byteOffset = buffer.length + byteOffset);
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (!dir) return -1;
          byteOffset = 0;
        }
        "string" === typeof val && (val = Buffer.from(val, encoding));
        if (Buffer.isBuffer(val)) {
          if (0 === val.length) return -1;
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        }
        if ("number" === typeof val) {
          val &= 255;
          if (Buffer.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf) return dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (void 0 !== encoding) {
          encoding = String(encoding).toLowerCase();
          if ("ucs2" === encoding || "ucs-2" === encoding || "utf16le" === encoding || "utf-16le" === encoding) {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i) {
          return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, -1 === foundIndex ? 0 : i - foundIndex)) {
            -1 === foundIndex && (foundIndex = i);
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            -1 !== foundIndex && (i -= i - foundIndex);
            foundIndex = -1;
          }
        } else {
          byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength);
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
        return -1 !== this.indexOf(val, byteOffset, encoding);
      };
      Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (length) {
          length = Number(length);
          length > remaining && (length = remaining);
        } else length = remaining;
        var strLen = string.length;
        if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
        length > strLen / 2 && (length = strLen / 2);
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(2 * i, 2), 16);
          if (isNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function latin1Write(buf, string, offset, length) {
        return asciiWrite(buf, string, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer.prototype.write = function write(string, offset, length, encoding) {
        if (void 0 === offset) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (void 0 === length && "string" === typeof offset) {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else {
          if (!isFinite(offset)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          offset |= 0;
          if (isFinite(length)) {
            length |= 0;
            void 0 === encoding && (encoding = "utf8");
          } else {
            encoding = length;
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        (void 0 === length || length > remaining) && (length = remaining);
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        encoding || (encoding = "utf8");
        var loweredCase = false;
        for (;;) switch (encoding) {
         case "hex":
          return hexWrite(this, string, offset, length);

         case "utf8":
         case "utf-8":
          return utf8Write(this, string, offset, length);

         case "ascii":
          return asciiWrite(this, string, offset, length);

         case "latin1":
         case "binary":
          return latin1Write(this, string, offset, length);

         case "base64":
          return base64Write(this, string, offset, length);

         case "ucs2":
         case "ucs-2":
         case "utf16le":
         case "utf-16le":
          return ucs2Write(this, string, offset, length);

         default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
        }
      };
      Buffer.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        return 0 === start && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
             case 1:
              firstByte < 128 && (codePoint = firstByte);
              break;

             case 2:
              secondByte = buf[i + 1];
              if (128 === (192 & secondByte)) {
                tempCodePoint = (31 & firstByte) << 6 | 63 & secondByte;
                tempCodePoint > 127 && (codePoint = tempCodePoint);
              }
              break;

             case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte)) {
                tempCodePoint = (15 & firstByte) << 12 | (63 & secondByte) << 6 | 63 & thirdByte;
                tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint);
              }
              break;

             case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if (128 === (192 & secondByte) && 128 === (192 & thirdByte) && 128 === (192 & fourthByte)) {
                tempCodePoint = (15 & firstByte) << 18 | (63 & secondByte) << 12 | (63 & thirdByte) << 6 | 63 & fourthByte;
                tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint);
              }
            }
          }
          if (null === codePoint) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | 1023 & codePoint;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
        var res = "";
        var i = 0;
        while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(127 & buf[i]);
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        (!start || start < 0) && (start = 0);
        (!end || end < 0 || end > len) && (end = len);
        var out = "";
        for (var i = start; i < end; ++i) out += toHex(buf[i]);
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length; i += 2) res += String.fromCharCode(bytes[i] + 256 * bytes[i + 1]);
        return res;
      }
      Buffer.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = void 0 === end ? len : ~~end;
        if (start < 0) {
          start += len;
          start < 0 && (start = 0);
        } else start > len && (start = len);
        if (end < 0) {
          end += len;
          end < 0 && (end = 0);
        } else end > len && (end = len);
        end < start && (end = start);
        var newBuf;
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) newBuf[i] = this[i + start];
        }
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        return val;
      };
      Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset + --byteLength];
        var mul = 1;
        while (byteLength > 0 && (mul *= 256)) val += this[offset + --byteLength] * mul;
        return val;
      };
      Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
      };
      Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength && (mul *= 256)) val += this[offset + i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
        offset |= 0;
        byteLength |= 0;
        noAssert || checkOffset(offset, byteLength, this.length);
        var i = byteLength;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
        mul *= 128;
        val >= mul && (val -= Math.pow(2, 8 * byteLength));
        return val;
      };
      Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
        noAssert || checkOffset(offset, 1, this.length);
        if (!(128 & this[offset])) return this[offset];
        return -1 * (255 - this[offset] + 1);
      };
      Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        noAssert || checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return 32768 & val ? 4294901760 | val : val;
      };
      Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        noAssert || checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        noAssert || checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        byteLength |= 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength) - 1;
          checkInt(this, value, offset, byteLength, maxBytes, 0);
        }
        var i = byteLength - 1;
        var mul = 1;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
        return offset + byteLength;
      };
      Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 255, 0);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        this[offset] = 255 & value;
        return offset + 1;
      };
      function objectWriteUInt16(buf, value, offset, littleEndian) {
        value < 0 && (value = 65535 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
      Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      function objectWriteUInt32(buf, value, offset, littleEndian) {
        value < 0 && (value = 4294967295 + value + 1);
        for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
      Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = 255 & value;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = 255 & value;
        while (++i < byteLength && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i - 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
        value = +value;
        offset |= 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength - 1);
          checkInt(this, value, offset, byteLength, limit - 1, -limit);
        }
        var i = byteLength - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = 255 & value;
        while (--i >= 0 && (mul *= 256)) {
          value < 0 && 0 === sub && 0 !== this[offset + i + 1] && (sub = 1);
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength;
      };
      Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 1, 127, -128);
        Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value));
        value < 0 && (value = 255 + value + 1);
        this[offset] = 255 & value;
        return offset + 1;
      };
      Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
        } else objectWriteUInt16(this, value, offset, true);
        return offset + 2;
      };
      Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = 255 & value;
        } else objectWriteUInt16(this, value, offset, false);
        return offset + 2;
      };
      Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = 255 & value;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else objectWriteUInt32(this, value, offset, true);
        return offset + 4;
      };
      Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset |= 0;
        noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648);
        value < 0 && (value = 4294967295 + value + 1);
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = 255 & value;
        } else objectWriteUInt32(this, value, offset, false);
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38);
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        noAssert || checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308);
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.copy = function copy(target, targetStart, start, end) {
        start || (start = 0);
        end || 0 === end || (end = this.length);
        targetStart >= target.length && (targetStart = target.length);
        targetStart || (targetStart = 0);
        end > 0 && end < start && (end = start);
        if (end === start) return 0;
        if (0 === target.length || 0 === this.length) return 0;
        if (targetStart < 0) throw new RangeError("targetStart out of bounds");
        if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        end > this.length && (end = this.length);
        target.length - targetStart < end - start && (end = target.length - targetStart + start);
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) for (i = len - 1; i >= 0; --i) target[i + targetStart] = this[i + start]; else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) for (i = 0; i < len; ++i) target[i + targetStart] = this[i + start]; else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        return len;
      };
      Buffer.prototype.fill = function fill(val, start, end, encoding) {
        if ("string" === typeof val) {
          if ("string" === typeof start) {
            encoding = start;
            start = 0;
            end = this.length;
          } else if ("string" === typeof end) {
            encoding = end;
            end = this.length;
          }
          if (1 === val.length) {
            var code = val.charCodeAt(0);
            code < 256 && (val = code);
          }
          if (void 0 !== encoding && "string" !== typeof encoding) throw new TypeError("encoding must be a string");
          if ("string" === typeof encoding && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        } else "number" === typeof val && (val &= 255);
        if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
        if (end <= start) return this;
        start >>>= 0;
        end = void 0 === end ? this.length : end >>> 0;
        val || (val = 0);
        var i;
        if ("number" === typeof val) for (i = start; i < end; ++i) this[i] = val; else {
          var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = stringtrim(str).replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) str += "=";
        return str;
      }
      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, "");
      }
      function toHex(n) {
        if (n < 16) return "0" + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              if (i + 1 === length) {
                (units -= 3) > -1 && bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              (units -= 3) > -1 && bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = 65536 + (leadSurrogate - 55296 << 10 | codePoint - 56320);
          } else leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 6 | 192, 63 & codePoint | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          } else {
            if (!(codePoint < 1114112)) throw new Error("Invalid code point");
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, 63 & codePoint | 128);
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) byteArray.push(255 & str.charCodeAt(i));
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isnan(val) {
        return val !== val;
      }
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    "base64-js": 1,
    ieee754: 4,
    isarray: 3
  } ],
  3: [ function(require, module, exports) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return "[object Array]" == toString.call(arr);
    };
  }, {} ],
  4: [ function(require, module, exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (;nBits > 0; e = 256 * e + buffer[offset + i], i += d, nBits -= 8) ;
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (;nBits > 0; m = 256 * m + buffer[offset + i], i += d, nBits -= 8) ;
      if (0 === e) e = 1 - eBias; else {
        if (e === eMax) return m ? NaN : Infinity * (s ? -1 : 1);
        m += Math.pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = 8 * nBytes - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || Infinity === value) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e += eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (;mLen >= 8; buffer[offset + i] = 255 & m, i += d, m /= 256, mLen -= 8) ;
      e = e << mLen | m;
      eLen += mLen;
      for (;eLen > 0; buffer[offset + i] = 255 & e, i += d, e /= 256, eLen -= 8) ;
      buffer[offset + i - d] |= 128 * s;
    };
  }, {} ],
  LoadUpdateGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6b19y7HMRAHoYEkJT8R5rN", "LoadUpdateGame");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        loadBar: cc.ProgressBar,
        precent: cc.Label,
        process_type: 0,
        rate: 0,
        _update_flag: false,
        source_leng: 0,
        _storagePath: "",
        manifestUrl: cc.RawAsset,
        callback: null
      },
      init: function init(callback) {
        this.callback = callback;
      },
      onLoad: function onLoad() {
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            cc.rectContainsPoint(rect, local) ? cc.log("ok touch in the region......") : cc.log("touch remove from parent");
          }
        }, this.node);
        this.updateInterval = .2;
        this.source_leng = 109;
        this.load_res();
        this.schedule(this.load_update, .5);
      },
      load_update: function load_update() {
        var self = this;
        this.loadBar.progress = this.rate / this.source_leng * 100;
        cc.log("this.rate:" + this.rate);
        if (this.rate >= this.source_leng) {
          this.precent.string = "加载完成......";
          this.unschedule(this.load_update);
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
            -1 != login_type ? this.init_update() : util.show_net_error("当前网络不可用，请检查自己的网络状态", function() {
              self.init_update();
            });
          } else this.init_update();
        }
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        if (true == this._update_flag) {
          false == this._update_flag;
          this.node.active = false;
          this.callback();
        }
      },
      load_res: function load_res() {
        var self = this;
        cc.loader.loadResDir("", cc.SpriteFrame, function(err, assets) {
          for (var i = 0; i < assets.length; i++) {
            g_assets[assets[i].name] = assets[i];
            self.rate = self.rate + 1;
            self.precent.string = "加载文件中......";
            cc.log("load res :" + assets[i].name);
          }
        });
        cc.loader.loadResDir("prefab", function(err, assets) {
          for (var i = 0; i < assets.length; i++) {
            g_assets[assets[i].name] = assets[i];
            self.rate = self.rate + 1;
            self.precent.string = "加载文件中......";
            cc.log("load res :" + assets[i].name);
          }
        });
      },
      init_update: function init_update() {
        try {
          if (!cc.sys.isNative) {
            this._update_flag = true;
            return;
          }
          this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
          cc.log("Storage path for remote asset : " + this._storagePath);
          this.versionCompareHandle = function(versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
            g_version = versionA;
            var vA = versionA.split(".");
            var vB = versionB.split(".");
            for (var i = 0; i < vA.length; ++i) {
              var a = parseInt(vA[i]);
              var b = parseInt(vB[i] || 0);
              if (a === b) continue;
              return a - b;
            }
            return vB.length > vA.length ? -1 : 0;
          };
          cc.log("Local manifest URL : " + this.manifestUrl);
          this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
          cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS || this._am.retain();
          this._am.setVerifyCallback(function(path, asset) {
            var compressed = asset.compressed;
            var expectedMD5 = asset.md5;
            var relativePath = asset.path;
            var size = asset.size;
            if (compressed) {
              cc.log("Verification passed : " + relativePath);
              return true;
            }
            cc.log("Verification passed : " + relativePath + " (" + expectedMD5 + ")");
            return true;
          });
          if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
            cc.log("Max concurrent tasks count have been limited to 2");
          }
          this.checkUpdate();
        } catch (err) {
          this._update_flag = true;
          cc.log("ERROR:" + err.message);
        }
      },
      checkCb: function checkCb(event) {
        try {
          cc.log("Code: " + event.getEventCode());
          switch (event.getEventCode()) {
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
          0 == this.process_type ? this._update_flag = true : this.hotUpdate();
        } catch (err) {
          this._update_flag = true;
          cc.log("ERROR:" + err.message);
        }
      },
      checkUpdate: function checkUpdate() {
        try {
          this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl);
          if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            this.precent.string = "加载配置文件失败 ...";
            this._update_flag = true;
            return;
          }
          this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
          cc.eventManager.addListener(this._checkListener, 1);
          this._am.checkUpdate();
        } catch (err) {
          this._update_flag = true;
          cc.log("ERROR:" + err.message);
        }
      },
      hotUpdate: function hotUpdate() {
        if (this._am) {
          this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
          cc.eventManager.addListener(this._updateListener, 1);
          this._am.getState() === jsb.AssetsManager.State.UNINITED && this._am.loadLocalManifest(this.manifestUrl);
          this._failCount = 0;
          this._am.update();
        }
      },
      updateCb: function updateCb(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.precent.string = "跳过更新......";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          this.loadBar.progress = event.getPercent();
          var msg = event.getMessage();
          if (msg) {
            this.precent.string = "更新文件中.....";
            cc.log(event.getPercent() / 100 + "% : " + msg);
          }
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.precent.string = "跳过更新......";
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          this.precent.string = "跟新完成......";
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          this.precent.string = "跳过更新......";
          failed = true;
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          this.precent.string = "跳过更新......";
          cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
          failed = true;
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          cc.log(event.getMessage());
          failed = true;
        }
        if (failed) {
          cc.eventManager.removeListener(this._updateListener);
          this._update_flag = true;
        }
        if (needRestart) {
          this.precent.string = "准备重新启动......";
          cc.eventManager.removeListener(this._updateListener);
          this._updateListener = null;
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          console.log(JSON.stringify(newPaths));
          Array.prototype.unshift(searchPaths, newPaths);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          cc.audioEngine.stopAll();
          cc.game.restart();
        }
      },
      onDestroy: function onDestroy() {
        if (this._updateListener) {
          cc.eventManager.removeListener(this._updateListener);
          this._updateListener = null;
        }
        this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS && this._am.release();
      }
    });
    cc._RF.pop();
  }, {} ],
  Login: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a0a37wcANEsZIkorqukZR4", "Login");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        version_label: cc.Node,
        login_flag: false,
        button_login: cc.Node,
        load_update: cc.Node,
        callback: null
      },
      wxLogin: function wxLogin() {
        cc.log("wxLogin");
        this.button_login.getComponent("cc.Button").interactable = false;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
          jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxLogin", "()V");
          this.login_flag = true;
        } else if (cc.sys.os == cc.sys.OS_IOS) {
          jsb.reflection.callStaticMethod("NativeOcClass", "iOSLoginWithWX");
          this.login_flag = true;
        } else this.onLogin();
      },
      update: function update() {
        this.version_label.getComponent("cc.Label").string = g_version;
        if (true == g_login_auto) {
          this.wxLogin();
          g_login_auto = false;
        }
        if (true == this.login_flag) {
          this.login_flag = false;
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            var app_id = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppId", "()Ljava/lang/String;");
            var app_secret = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getAppSecret", "()Ljava/lang/String;");
            var wx_code = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getWXCode", "()Ljava/lang/String;");
            if (null != wx_code && "null" != wx_code) {
              Storage.setData("app_id", app_id);
              Storage.setData("app_secret", app_secret);
              this.callback = this.get_access_token;
              util.get("https://api.weixin.qq.com/sns/oauth2/access_token", "appid=" + app_id + "&secret=" + app_secret + "&code=" + wx_code + "&grant_type=authorization_code", this);
            } else this.login_flag = true;
          } else if (cc.sys.os == cc.sys.OS_IOS) {
            var app_id = jsb.reflection.callStaticMethod("NativeOcClass", "getAppId");
            var app_secret = jsb.reflection.callStaticMethod("NativeOcClass", "getAppSecret");
            var wx_code = jsb.reflection.callStaticMethod("NativeOcClass", "getWXCode");
            if (null != wx_code && "null" != wx_code) {
              Storage.setData("app_id", app_id);
              Storage.setData("app_secret", app_secret);
              this.callback = this.get_access_token;
              util.get("https://api.weixin.qq.com/sns/oauth2/access_token", "appid=" + app_id + "&secret=" + app_secret + "&code=" + wx_code + "&grant_type=authorization_code", this);
            } else this.login_flag = true;
          }
        }
      },
      get_access_token: function get_access_token(data) {
        cc.log("get_access_token:" + data);
        if (null != data.access_token && null != data.openid) {
          Storage.setData("access_token", data.access_token);
          Storage.setData("openid", data.openid);
          Storage.setData("unionid", data.unionid);
          Storage.setData("refresh_token", data.refresh_token);
          this.callback = this.get_wxuser_info;
          util.get("https://api.weixin.qq.com/sns/userinfo", "access_token=" + data.access_token + "&openid=" + data.openid, this);
        } else this.error_code(data);
      },
      get_wxuser_info: function get_wxuser_info(data) {
        cc.log("get_wxuser_info:" + JSON.stringify(data));
        if (null != data.openid) {
          g_user["nickname"] = data.nickname;
          g_user["fangka"] = 0;
          g_user["gender"] = data.sex;
          g_user["player_id"] = data.unionid;
          g_user["headimgurl"] = data.headimgurl;
          this.onLogin();
        } else this.error_code(data);
      },
      onLoad: function onLoad() {
        var self = this;
        this.xieyi_select = true;
        g_current_scene = SCENE_TAG.LOAD;
        cc.log("onLoad" + this.login_flag);
        this.version_label.getComponent("cc.Label").string = g_version;
        self.node.on("pressed", self.switchRadio, self);
        var load_update_com = this.load_update.getComponent("LoadUpdateGame");
        load_update_com.init(function() {
          self.onInitLogin();
        });
      },
      onInitLogin: function onInitLogin() {
        this.button_login.getComponent("cc.Button").interactable = false;
        if (cc.sys.os == cc.sys.OS_WINDOWS) this.button_login.getComponent("cc.Button").interactable = true; else if (cc.sys.isNative) {
          this.login_flag = false;
          var refresh_token = Storage.getData("refresh_token");
          var app_id = Storage.getData("app_id");
          if (null == refresh_token) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
              var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I");
              1 == login_type && this.wxLogin();
            } else if (cc.sys.os == cc.sys.OS_IOS) {
              var login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType");
              1 == login_type && this.wxLogin();
            }
            this.button_login.getComponent("cc.Button").interactable = true;
            return false;
          }
          this.callback = this.get_access_token;
          util.get("https://api.weixin.qq.com/sns/oauth2/refresh_token", "appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token, this);
        }
      },
      onLogin: function onLogin() {
        var self = this;
        cc.log("go into on login......" + JSON.stringify(g_user));
        Servers.getLogin(g_user["player_id"], g_user["nickname"], g_user["gender"], g_user["headimgurl"], function(data) {
          console.log("get login info succ:" + JSON.stringify(data));
          if (200 != data.code) return;
          var token = data.token;
          Servers.getEntry(token, function(data) {
            200 == data.code && self.saveUserInfo(data.player);
          });
        });
      },
      saveUserInfo: function saveUserInfo(data) {
        for (var key in data) g_user[key] = data[key];
        g_is_login = true;
        if (null != g_next_scene) onGameEnterRoom(g_next_data["room_num"], g_next_data["rid"]); else {
          var login_type = 0;
          if (cc.sys.os == cc.sys.OS_ANDROID) {
            login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getLoginType", "()I");
            if (1 == login_type) {
              var room_num = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRoomNum", "()Ljava/lang/String;");
              var scene = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getScene", "()Ljava/lang/String;");
              var rid = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getRid", "()Ljava/lang/String;");
              onGameEnterRoom(room_num, rid);
            } else cc.director.loadScene("MainScene");
          } else if (cc.sys.os == cc.sys.OS_IOS) {
            login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getLoginType");
            if (1 == login_type) {
              var room_num = jsb.reflection.callStaticMethod("NativeOcClass", "getRoomNum");
              var scene = jsb.reflection.callStaticMethod("NativeOcClass", "getScene");
              var rid = jsb.reflection.callStaticMethod("NativeOcClass", "getRid");
              onGameEnterRoom(room_num, rid);
            } else cc.director.loadScene("MainScene");
          } else cc.director.loadScene("MainScene");
        }
      },
      error_code: function error_code(data) {
        var size = cc.director.getVisibleSize();
        40029 == data.errcode ? util.show_error_info(this, size, "无效的code请重新登录") : 40030 == data.errcode ? util.show_error_info(this, size, "无效的refresh_token请重新登录") : 40003 == data.errcode && util.show_error_info(this, size, "无效的openid请重新登录");
      },
      switchRadio: function switchRadio(event) {
        var item = event.target.getComponent("one_choice");
        if (true == this.xieyi_select) {
          item.lifeUp();
          this.xieyi_select = false;
        } else {
          item.pitchOn();
          this.xieyi_select = true;
        }
      },
      pop_user_xieyi: function pop_user_xieyi() {
        var size = cc.director.getVisibleSize();
        this.pop_xieyi = cc.instantiate(g_assets["PopXieyiScene"]);
        var x = size.width / 2;
        var y = size.height / 2;
        this.node.addChild(this.pop_xieyi);
        this.pop_xieyi.setPosition(this.node.convertToNodeSpaceAR(cc.p(x, y)));
      }
    });
    cc._RF.pop();
  }, {} ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "052bdBloNxA8ZVUfzQaV8be", "MainScene");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("on load main scene.....");
        g_current_scene = SCENE_TAG.MAIN;
        var size = cc.director.getWinSize();
        if (false == g_gonggao_tag) {
          this.gongao_scene = cc.instantiate(g_assets["GonggaoScene"]);
          this.node.addChild(this.gongao_scene);
          this.gongao_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
          g_gonggao_tag = true;
        }
        g_root_node = cc.director.getScene().getChildByName("RootNode");
        var self = this;
        if (cc.sys.os == cc.sys.OS_ANDROID) jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "setLoadStatus", "(I)V", 1); else if (cc.sys.os == cc.sys.OS_IOS) {
          this.exit_node.active = false;
          jsb.reflection.callStaticMethod("NativeOcClass", "setLoadStatus:", 1);
        }
        g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
        if (null == g_music_key || g_music_key == BOOL.YES) {
          cc.audioEngine.stopAll();
          this.current = cc.audioEngine.play(this.audio, true, 1);
        }
        this.username_label.string = g_user.nick_name;
        this.fangka_label.string = g_user.fangka_num;
        1 == g_user.gender && (this.sex_sprite.spriteFrame = g_assets["gender1"]);
        null != g_user.headimgurl && g_user.headimgurl.length > 0 ? cc.loader.load({
          url: g_user.headimgurl,
          type: "png"
        }, function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          g_assets["headimg"] = frame;
          self.touxiang_sprite.spriteFrame = frame;
        }) : g_assets["headimg"] = self.touxiang_sprite.spriteFrame;
      },
      update: function update() {
        this.fangka_label.string = g_user.fangka_num;
      },
      buy_fangka_scene: function buy_fangka_scene() {
        var size = cc.director.getWinSize();
        this.pop_buyfangka = cc.instantiate(g_assets["PopBuyFangKaScene"]);
        this.node.addChild(this.pop_buyfangka);
        this.pop_buyfangka.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
      },
      popCreatScene: function popCreatScene() {
        var size = cc.director.getWinSize();
        this.pop_creat_scene = cc.instantiate(g_assets["PopCreatRoomScene"]);
        this.node.addChild(this.pop_creat_scene);
        this.pop_creat_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
      },
      popEnterScene: function popEnterScene() {
        var size = cc.director.getWinSize();
        this.pop_enter_scene = cc.instantiate(g_assets["PopEnterRoomScene"]);
        this.node.addChild(this.pop_enter_scene);
        this.pop_enter_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
      },
      popGonghuiScene: function popGonghuiScene() {
        cc.director.loadScene("GongHuiScene");
      },
      popMyGameScene: function popMyGameScene() {
        cc.director.loadScene("MyGameInfoScene");
      },
      popHelpScene: function popHelpScene() {
        var size = cc.director.getWinSize();
        this.pop_help_scene = cc.instantiate(g_assets["PopHelpScene"]);
        this.node.addChild(this.pop_help_scene);
        this.pop_help_scene.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
      },
      exit: function exit() {
        cc.sys.os == cc.sys.OS_ANDROID ? cc.director.end() : cc.sys.os == cc.sys.OS_IOS;
      },
      onDestroy: function onDestroy() {
        cc.audioEngine.stop(this.current);
      }
    });
    cc._RF.pop();
  }, {} ],
  PopXieyi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "976f4cEfWhBmbJz7b5iEPEu", "PopXieyi");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        content: cc.Node
      },
      onClose: function onClose() {
        this.node.active = false;
        this.node.destroy();
      },
      onLoad: function onLoad() {
        for (var i = 1; i < 21; i++) {
          var node = new cc.Node();
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = g_assets["xieyi_text_" + i];
          this.content.addChild(node);
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  add_chip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c0fa5ATHo9G0KE9WhBUPxdm", "add_chip");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        silder_num1: 0,
        silder_num2: 0,
        callback: null,
        pthis: null,
        total: 0
      },
      onLoad: function onLoad() {
        cc.log("start go into pop add chip js");
      },
      init_callback: function init_callback(pthis, total, callback) {
        this.pthis = pthis;
        this.callback = callback;
        this.total = total;
      },
      silder1_callback: function silder1_callback(slider, customEventData) {
        this.silder_num1 = Math.floor(slider.progress * (this.total - this.silder_num2));
        cc.log("silder1:" + this.silder_num1);
        this.callback(this.pthis, 1, this.silder_num1);
      },
      silder2_callback: function silder2_callback(slider, customEventData) {
        this.silder_num2 = Math.floor(slider.progress * (this.total - this.silder_num1));
        cc.log("silder1:" + this.silder_num2);
        this.callback(this.pthis, 2, this.silder_num2);
      }
    });
    cc._RF.pop();
  }, {} ],
  bipai_choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd767pT3yVM6IqdabBmQWEl", "bipai_choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        index: 0,
        type: 0
      },
      onLoad: function onLoad() {
        cc.log("go into bipai choice");
        var self = this;
        this.node.on("touchstart", function(event) {
          self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, self);
      },
      start: function start() {
        var ringSmallAction = cc.scaleTo(.5, .5, .5);
        var ringBigAction = cc.scaleTo(.5, 2, 2);
        var ringSeqAction = cc.sequence(ringSmallAction, ringBigAction);
        var ringRepeatAction = cc.repeatForever(ringSeqAction);
        this.node.runAction(ringRepeatAction);
        cc.log("baipai choice index:", this.node.getSiblingIndex());
      },
      init: function init(index, type) {
        this.index = index;
        this.type = type;
      }
    });
    cc._RF.pop();
  }, {} ],
  bomb_action: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "341e6ixhkdIH41d1uXrCVPC", "bomb_action");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        anim: null,
        animStatus: null,
        audio: null,
        audioStatus: null
      },
      onLoad: function onLoad() {},
      play: function play(actin_name) {
        this.anim = this.node.getComponent(cc.Animation);
        this.animStatus = this.anim.play(actin_name);
        this.animStatus.wrapMode = cc.WrapMode.Normal;
        this.animStatus.wrapMode = cc.WrapMode.Loop;
        this.animStatus.repeatCount = 1;
        g_sound_key = cc.sys.localStorage.getItem(SOUND_KEY);
        this.audio = this.node.getComponent(cc.AudioSource);
        if (null != this.audio && g_sound_key == BOOL.YES) {
          this.audio.loop = false;
          this.audioStatus = this.audio.play();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  buy_fangka: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f17ad/xS8pCFYLrpj3LLpjZ", "buy_fangka");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        game_sprite: cc.Node,
        weixin_label: cc.Node,
        copy_button: cc.Node
      },
      onLoad: function onLoad() {
        cc.log("on load store buy");
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, this.game_sprite);
      },
      copy_callback: function copy_callback() {
        var string = this.weixin_label.getComponent("cc.Label").string;
        cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "copy", "(Ljava/lang/String;)V", string) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeOcClass", "copy:", string);
      }
    });
    cc._RF.pop();
  }, {} ],
  buy_order: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39be2Fk/RNJPLECkzhYEeD3", "buy_order");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("on load store buy");
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, this.node);
      },
      init: function init(data) {
        this.fangka_num = data["fangka_num"];
        this.danjia = data["danjia"];
        this.zongjia = data["zongjia"];
        this.order_id = data["order_id"];
        this.num_label.string = data["fangka_num"] + "张";
        this.danjia_label.string = data["danjia"] + "元";
        this.zongjia_label.string = data["zongjia"] + "元";
        this.orderid_label.string = data["order_id"];
      },
      button_cb: function button_cb() {
        var self = this;
        Servers.storeProcess("payOrder", {
          order_id: order_id
        }, function(data) {
          if (200 == data.code) {
            self.node.active = false;
            self.node.destroy();
            g_user["fangka_num"] = data["fangka_num"];
            cc.director.loadScene("MainScene");
          }
        });
      },
      close_scene: function close_scene() {
        this.node.active = false;
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  count_timer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "537707dxNpO1q1HV1x0DYFo", "count_timer");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("load counter time progress", this.sumTime);
        this.sumTime = 3;
        this.progress_bar_top.progress = 0;
        this.progress_bar_boom.progress = 0;
        this.top_precent = 0;
        this.boom_precent = 0;
        cc.log(this.progress_bar_top.progress, this.progress_bar_boom.progress);
      },
      start_timer: function start_timer() {
        cc.log("start timer .......", this.sumTime);
        cc.log("start timer .......", this.progress_bar_top.progress, this.progress_bar_boom.progress);
        this.progress_bar_top.progress = 0;
        this.progress_bar_boom.progress = 0;
        this.top_precent = 0;
        this.boom_precent = 0;
        this.schedule(this.progress_bar, .1);
      },
      progress_bar: function progress_bar() {
        cc.log("top_precent:" + this.top_precent + " boom_precent" + this.boom_precent);
        cc.log("top:" + this.progress_bar_top.progress + " boom:" + this.progress_bar_boom.progress);
        if (this.progress_bar_boom.progress <= 1) {
          this.boom_precent = this.boom_precent + .2;
          this.progress_bar_boom.progress = this.boom_precent / this.sumTime;
          return;
        }
        if (this.progress_bar_top.progress <= 1) {
          this.top_precent = this.top_precent + .2;
          this.progress_bar_top.progress = this.top_precent / this.sumTime;
          return;
        }
        this.unschedule(this.progress_bar);
      },
      stop_timer: function stop_timer() {
        this.unschedule(this.progress_bar);
        this.progress_bar_top.progress = 0;
        this.progress_bar_boom.progress = 0;
        this.top_precent = 0;
        this.boom_precent = 0;
      }
    });
    cc._RF.pop();
  }, {} ],
  created_room_scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "12a53iwsR5K9Y7u9TAUdP//", "created_room_scene");
    "use strict";
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
      onLoad: function onLoad() {
        this.pomelo_removeListener();
        cc.log("created_room_scene", "start gointo created room scene......");
        g_current_scene = SCENE_TAG.WAITROOM;
        this.node.on("pressed", this.switchRadio, this);
        this.wait_flag = true;
        this.player_num = g_room_data["real_num"];
        this.fangka_label.string = g_user["fangka_num"];
        this.init_data();
        this.init_room_pos();
        var now_time = Date.now();
        var cost_time = parseInt((now_time - g_room_data["creat_time"]) / 1e3);
        this.left_time = 60 * parseInt(g_room_data["wait_time"]) - cost_time;
        this.pomelo_on();
        cc.log("created_room_scene", "this.choice_sprite:" + this.choice_sprite.length);
        this.schedule(this.wait_time_cb, 1);
      },
      init_data: function init_data() {
        this.room_num_node.getComponent("cc.Label").string = g_room_data["room_num"];
        this.fangzhu_node.getComponent("cc.Label").string = g_room_data["fangzhu_name"];
        1 == g_room_data["max_type"] ? this.max_pai_node.getComponent("cc.Label").string = "鬼大" : 2 == g_room_data["max_type"] ? this.max_pai_node.getComponent("cc.Label").string = "玄大" : 3 == g_room_data["max_type"] && (this.max_pai_node.getComponent("cc.Label").string = "皇上大");
        this.renshu_node.getComponent("cc.Label").string = g_room_data["player_num"] + "人";
        this.wait_time_node.getComponent("cc.Label").string = g_room_data["wait_time"] + "分钟";
        if (1 == g_room_data["fangka_type"]) {
          this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费1张";
          this.wanjia_fangka_node.getComponent("cc.Label").string = "消费1张";
        } else if (2 == g_room_data["fangka_type"]) {
          this.fangzhu_fangka_node.getComponent("cc.Label").string = "消费" + g_room_data["fangka_num"] + "张";
          this.wanjia_fangka_node.getComponent("cc.Label").string = "消费0张";
        }
        g_room_data["fangzhu_id"] != g_user["id"] && (this.start_button.getComponent("cc.Button").interactable = false);
      },
      init_room_pos: function init_room_pos() {
        var _this = this;
        var self = this;
        var _loop = function _loop(i) {
          item = _this.choice_sprite[i].getComponent("player_select");
          location = g_room_data["location" + (i + 1)];
          if (null != location && "null" != location) {
            player_id = location.split("*")[0];
            Servers.userInfoProcess("get_player", {
              player_id: player_id
            }, function(data) {
              200 == data.code && (null != data.msg.head_img_url && data.msg.head_img_url.length > 0 ? cc.loader.load({
                url: data.msg.head_img_url,
                type: "png"
              }, function(err, texture) {
                var frame = new cc.SpriteFrame(texture);
                self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = frame;
              }) : self.choice_sprite[i].getComponent("cc.Sprite").spriteFrame = g_assets["headimg"]);
            });
            item.set_flag(true);
          }
          g_room_data["player_num"] <= g_room_data["real_num"] && item.set_flag(true);
        };
        for (var i = 0; i < this.choice_sprite.length; i++) {
          var item;
          var location;
          var player_id;
          _loop(i);
        }
      },
      share_button_cb: function share_button_cb() {
        cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "WxShare", "(Ljava/lang/String;Ljava/lang/String;I)V", g_room_data["room_num"], g_room_data["fangzhu_name"], g_room_data["rid"]) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod("NativeOcClass", "WxShare:masterName:roomId:", g_room_data["room_num"], g_room_data["fangzhu_name"], g_room_data["rid"]);
      },
      pomelo_on: function pomelo_on() {
        pomelo.on("onStartGame", this.onStartGame_function.bind(this));
        pomelo.on("onEnterRoom", this.onEnterRoom_function.bind(this));
        pomelo.on("onDelayWaitTime", this.onDelayWaitTime_function.bind(this));
        pomelo.on("onDissolveRoom", this.onDissolveRoom_function.bind(this));
        pomelo.on("onLeaveRoom", this.onLeaveRoom_function.bind(this));
      },
      onEnterRoom_function: function onEnterRoom_function(data) {
        var self = this;
        cc.log("pomelo on onEnterRoom_function:" + data.location + " is ready" + this.choice_sprite.length);
        var enter_location = data.location;
        this.enter_player = data.player;
        this.enter_item = this.choice_sprite[enter_location - 1];
        var item_com = this.enter_item.getComponent("player_select");
        item_com.set_data(this.enter_player);
        item_com.set_flag(true);
        null != this.enter_player.head_img_url && this.enter_player.head_img_url.length > 0 ? cc.loader.load({
          url: this.enter_player.head_img_url,
          type: "png"
        }, function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          self.enter_item.getComponent("cc.Sprite").spriteFrame = frame;
        }) : self.enter_item.getComponent("cc.Sprite").spriteFrame = g_assets["headimg"];
        self.player_num = self.player_num + 1;
        if (self.enter_player.id == g_user["id"]) {
          g_user["fangka_num"] = self.enter_player.fangka_num;
          for (var i = 0; i < self.choice_sprite.length; i++) {
            var item = self.choice_sprite[i].getComponent("player_select");
            item.set_flag(true);
          }
        }
        if (self.player_num >= g_room_data["player_num"]) {
          for (var _i = 0; _i < self.choice_sprite.length; _i++) {
            var item = self.choice_sprite[_i].getComponent("player_select");
            item.set_flag(true);
          }
          self.enter_player.id == g_user["id"] ? util.show_error_info(null, null, "房间人员已经到齐，请点击开始游戏，进入游戏！") : util.show_error_info(null, null, "房间人员已经到齐，请等待房主开始游戏，进入游戏！");
        }
      },
      onDelayWaitTime_function: function onDelayWaitTime_function(data) {
        cc.log("pomelo on onDelayWaitTime_function:" + JSON.stringify(data) + " is ready");
        var wait_time = data.wait_time;
        if (g_room_data["fangzhu_id"] == g_user["id"]) {
          g_room_data["wait_time"] = wait_time;
          var now_time = Date.now();
          var cost_time = parseInt((now_time - g_room_data["creat_time"]) / 1e3);
          this.left_time = 60 * parseInt(g_room_data["wait_time"]) - cost_time;
        } else this.left_time = 120;
        this.wait_flag = true;
      },
      onDissolveRoom_function: function onDissolveRoom_function(data) {
        this.pomelo_removeListener();
        util.show_error_info(null, null, "房主已经解散了该房间,所有玩家退出房间！");
        g_room_data = null;
        cc.director.loadScene("MainScene");
      },
      onLeaveRoom_function: function onLeaveRoom_function(data) {
        var location = data.location;
        var room_info = data.data;
        var player_id = data.player_id;
        if (-1 != location) {
          var item = this.choice_sprite[location - 1];
          var item_com = item.getComponent("player_select");
          this.player_num = this.player_num - 1;
          item.set_data(null);
          item.set_flag(false);
          item.getComponent("cc.Sprite").spriteFrame = g_assets["wait_" + location];
        }
      },
      onStartGame_function: function onStartGame_function(data) {
        cc.log("pomelo on onStartGame_function:" + JSON.stringify(data));
        var self = this;
        var players = data.players;
        g_players_data.splice(0, g_players_data.length);
        for (var i = 0; i < players.length; i++) null != players[i] && "null" != players[i] && g_players_data.push(players[i]);
        var param = {
          rid: g_room_data["rid"]
        };
        pomelo.request(util.getRoomInfoRoute(), param, function(data) {
          cc.log(JSON.stringify(data));
          if (200 == data.code) {
            for (var key in data.msg) g_room_data[key] = data.msg[key];
            self.pomelo_removeListener();
            cc.director.loadScene("PJRoomScene");
          } else util.show_error_info(null, null, data.msg);
        });
      },
      game_back: function game_back() {
        var self = this;
        util.show_isok_info(function(flag) {
          true == flag && (g_room_data["fangzhu_id"] == g_user["id"] ? self.goout_game() : self.leave_room());
        }, "你确定要解散房间吗？如果已经消费房卡，则消费的房卡不会退回，请稍安勿躁！");
      },
      wait_time_cb: function wait_time_cb() {
        this.fangka_label.string = g_user["fangka_num"];
        var self = this;
        this.wait_flag = false;
        if (true == this.wait_flag) {
          this.left_time > 0 && (this.left_time = this.left_time - 1);
          this.left_time_node.getComponent("cc.Label").string = this.left_time;
          if (this.left_time <= 0) {
            this.wait_flag = false;
            g_room_data["fangzhu_id"] == g_user["id"] && (this.player_num >= 2 ? util.show_isok_info(function(flag) {
              false == flag ? self.start_game() : self.delay_wait_time();
            }, "是否进行延迟等待，点击确定延迟等待，点击取消则进入游戏。") : util.show_isok_info(function(flag) {
              false == flag ? self.goout_game() : self.delay_wait_time();
            }, "是否进行延迟等待，点击确定延迟等待，点击取消则退出游戏。"));
          }
        }
      },
      start_game: function start_game() {
        this.start_button.getComponent("cc.Button").interactable = false;
        if (this.player_num >= 2) {
          var param = {
            rid: g_room_data["rid"],
            player_id: g_room_data["fangzhu_id"]
          };
          pomelo.request(util.getStartGameRoute(), param, function(data) {
            cc.log(JSON.stringify(data));
          });
        } else {
          this.start_button.getComponent("cc.Button").interactable = true;
          util.show_error_info(null, null, "人员不够，无法开始游戏，请等待玩家加入！");
        }
      },
      goout_game: function goout_game() {
        this.pomelo_removeListener();
        var param = {
          rid: g_room_data["rid"],
          player_id: g_user["id"]
        };
        pomelo.request(util.getDissolveRoomRoute(), param, function(data) {
          cc.log(JSON.stringify(data));
          cc.director.loadScene("MainScene");
        });
      },
      leave_room: function leave_room() {
        this.pomelo_removeListener();
        for (var i = 0; i < this.choice_sprite.length; i++) {
          var item = this.choice_sprite[i].getComponent("player_select");
          var player = item.get_data();
          if (null != player && player.id == g_user["id"]) {
            var param = {
              rid: g_room_data["rid"],
              player_id: g_user["id"],
              location: i + 1
            };
            pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
              cc.log(JSON.stringify(data));
              cc.director.loadScene("MainScene");
            });
            return true;
          }
        }
        var param = {
          rid: g_room_data["rid"],
          player_id: g_user["id"],
          location: null
        };
        pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
          cc.log(JSON.stringify(data));
          cc.director.loadScene("MainScene");
        });
      },
      delay_wait_time: function delay_wait_time() {
        var self = this;
        var param = {
          rid: g_room_data["rid"],
          player_id: g_user["id"]
        };
        pomelo.request(util.getDelayWaitTimeRoute(), param, function(data) {
          cc.log(JSON.stringify(data));
        });
      },
      switchRadio: function switchRadio(event) {
        var index = event.target.getComponent("player_select").index;
        var type = event.target.getComponent("player_select").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        for (var i = 0; i < this.choice_sprite.length; i++) {
          var item = this.choice_sprite[i].getComponent("player_select");
          if (item.index == index) {
            var flag = item.get_flag();
            if (false == flag) {
              item.set_flag(true);
              var param = {
                rid: g_room_data["rid"],
                location: index,
                player_id: g_user["id"]
              };
              pomelo.request(util.getEnterRoute(), param, function(data) {
                if (200 == data.code) g_user["fangka_num"] = data.fangka_num; else {
                  item.set_flag(false);
                  util.show_error_info(null, null, data.msg);
                }
                cc.log(JSON.stringify(data));
              });
            }
            break;
          }
        }
      },
      pomelo_removeListener: function pomelo_removeListener() {
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
  emitter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ded2p7ha9L/pDpK5QJ45i4", "emitter");
    "use strict";
    module.exports = Emitter;
    window.EventEmitter = Emitter;
    function Emitter(obj) {
      if (obj) return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      var self = this;
      this._callbacks = this._callbacks || {};
      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks[event];
      if (!callbacks) return this;
      if (1 == arguments.length) {
        delete this._callbacks[event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1), callbacks = this._callbacks[event];
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
    cc._RF.pop();
  }, {} ],
  game_history_item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3cbe7dh6gdGX5E7NGrBV+cm", "game_history_item");
    "use strict";
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
      init: function init(id, data, pthis) {
        this.itemID = id;
        this.pthis = pthis;
        this.order_id.getComponent("cc.Label").string = data["room_num"];
        this.fangka_num.getComponent("cc.Label").string = data["use_fangka"];
        this.renshu.getComponent("cc.Label").string = data["renshu"];
        var date_str = util.dateftt(data["creat_time"], "yyyy-MM-dd h:m:s");
        this.creat_time.getComponent("cc.Label").string = date_str;
        this.game_status.getComponent("cc.Label").string = data["game_status"];
      }
    });
    cc._RF.pop();
  }, {} ],
  game_player_item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ac50C0VvpHK7fELCHsSS37", "game_player_item");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        player_name: cc.Label,
        start_gold: cc.Label,
        end_gold: cc.Label,
        diff_gold: cc.Label
      },
      onLoad: function onLoad() {},
      set_player_info: function set_player_info(infos) {
        cc.log(JSON.stringify(infos));
        this.player_name.string = infos[0];
        this.start_gold.string = infos[1];
        this.end_gold.string = infos[2];
        this.diff_gold.string = infos[3];
      }
    });
    cc._RF.pop();
  }, {} ],
  gonghui_empty: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ea469YRrlMLrt7TpzXgRoJ", "gonghui_empty");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tip_label: cc.Label,
        no_g: "您还没有公会信息，只有加入公会才可以购买房卡。",
        has_g: "您已经拥有公会或者加入了其他公会，无法再进行公会申请",
        join_g: "您已经拥有公会或者加入了其他公会，无法再申请加入公会",
        adding_g: "申请正在审核中，工作人员会在3-5个工作日与您取得联系，并确认信息。\n有任何疑问请拨打电话 0317-5071648"
      },
      set_text: function set_text(tid) {
        "no_g" == tid ? this.tip_label.string = this.no_g : "has_g" == tid && (this.tip_label.string = this.has_g);
        "join_g" == tid && (this.tip_label.string = this.join_g);
        "adding_g" == tid && (this.tip_label.string = this.adding_g);
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  gonghui_jiaru: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e79e3e5OpRNSpXIJYH3ePHJ", "gonghui_jiaru");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        gonghui_id: cc.Node,
        pthis: null,
        gid: null
      },
      init: function init(pthis) {
        this.pthis = pthis;
      },
      onChangeEdit: function onChangeEdit() {
        this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
      },
      onEndEdit: function onEndEdit() {
        this.gid = this.gonghui_id.getComponent("cc.EditBox").string;
      },
      jiaru_cb: function jiaru_cb() {
        var self = this;
        var size = cc.director.getWinSize();
        (null == this.gid || this.gid.length < 4) && util.show_error_info(self.pthis, size, "输入正确的公会ID");
        var param = {
          player_id: g_user["id"],
          gonghui_id: this.gid
        };
        Servers.gonghuiProcess("join_gonghui", param, function(data) {
          if (200 == data.code) {
            self.node.active = false;
            g_user["gonghui_id"] = data.msg["gonghui_id"];
            self.pthis.my_gonghui_button_cb();
          } else util.show_error_info(self.pthis, size, "没有找到对应的公会信息");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  gonghui_shenqing: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a4fd0yAOhNNZDwB7jenFL3", "gonghui_shenqing");
    "use strict";
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
      init: function init(pthis) {
        this.pthis = pthis;
      },
      onChangePhone: function onChangePhone() {
        this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
      },
      onEndPhone: function onEndPhone() {
        this.phone_num = this.phone_node.getComponent("cc.EditBox").string;
      },
      onChangeName: function onChangeName() {
        this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
      },
      onEndName: function onEndName() {
        this.gonghui_name = this.gonghui_name_node.getComponent("cc.EditBox").string;
      },
      shenqing_cb: function shenqing_cb() {
        var self = this;
        var size = cc.director.getWinSize();
        if (null == this.phone_num || null == this.gonghui_name) {
          util.show_error_info(self.pthis, size, "请完善信息在次提交");
          return;
        }
        var param = {
          player_id: g_user["id"],
          player_name: g_user["nickname"],
          gonghui_name: this.gonghui_name,
          telphone: this.phone_num,
          level: this.level
        };
        Servers.gonghuiProcess("shenqing", param, function(data) {
          if (200 == data.code) {
            self.node.active = false;
            self.pthis.add_gonghui_button_cb();
          } else util.show_error_info(self.pthis, size, data.msg);
        });
      },
      onLoad: function onLoad() {
        var self = this;
        self.node.on("pressed", self.switchRadio, self);
        this.default_tip = this.tip_node.getComponent("cc.Label").string;
      },
      switchRadio: function switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
        var type = event.target.getComponent("one_choice").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        for (var i = 0; i < this.choice_radios.length; i++) {
          var item = this.choice_radios[i].getComponent("one_choice");
          if (item.type == type) {
            this.level = index;
            item.index == index ? item.pitchOn() : item.lifeUp();
          }
        }
        cc.log("select level" + this.level);
      }
    });
    cc._RF.pop();
  }, {} ],
  gonghui_yuan: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9cednJaSNGhLQ/2xZErFNa", "gonghui_yuan");
    "use strict";
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
        pthis: null,
        data: null
      },
      init: function init(data, pthis) {
        this.pthis = pthis;
        this.data = data;
        if (null != this.data) {
          this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
          this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
          this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
          this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
          this.renshu.getComponent("cc.Label").string = this.data["renshu"];
          this.danjia.getComponent("cc.Label").string = this.data["danjia"];
          this.xuanyan.getComponent("cc.Label").string = this.data["gonggao"];
        }
      },
      tuichu_cb: function tuichu_cb() {}
    });
    cc._RF.pop();
  }, {} ],
  gonghui_zhang: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f49ebS2PZCv5to8L7PECVA", "gonghui_zhang");
    "use strict";
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
      init: function init(data, pthis) {
        this.pthis = pthis;
        this.data = data;
        if (null != this.data) {
          this.gonghui_id.getComponent("cc.Label").string = this.data["gonghui_id"];
          this.gonghui_name.getComponent("cc.Label").string = this.data["gonghui_name"];
          this.fangka_num.getComponent("cc.Label").string = this.data["fangka_num"];
          this.renshu.getComponent("cc.Label").string = this.data["renshu"];
          this.danjia.getComponent("cc.EditBox").string = this.data["danjia"];
          this.xuanyan.getComponent("cc.EditBox").string = this.data["xuanyan"];
          this.gonghui_zhang.getComponent("cc.Label").string = this.data["player_name"];
          this.xuka_status = this.data["xuka_status"];
          this.xuanyan_str = this.data["xuanyan"];
          this.danjia_str = this.data["danjia"];
        }
      },
      onChangeDanjia: function onChangeDanjia() {
        this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
      },
      onEndDanjia: function onEndDanjia() {
        this.danjia_str = this.danjia.getComponent("cc.EditBox").string;
      },
      onChangeXuanyan: function onChangeXuanyan() {
        this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
      },
      onEndXuanyan: function onEndXuanyan() {
        this.xuanyan_str = this.xuanyan.getComponent("cc.EditBox").string;
      },
      onXuka: function onXuka() {
        var size = cc.director.getWinSize();
        var self = this;
        var param = {
          gonghui_id: this.data["id"],
          player_id: g_user["id"],
          player_name: g_user["nickname"],
          telphone: this.data["telphone"]
        };
        Servers.gonghuiProcess("xuka", param, function(data) {
          200 == data.code ? util.show_error_info(self.parent, size, "申请续卡已经提交，等待工作人员确认信息。") : util.show_error_info(self.parent, size, data.msg);
        });
      },
      onTijiao: function onTijiao() {
        var self = this;
        var param = {
          id: this.data["id"],
          danjia: this.danjia_str,
          xuanyan: this.xuanyan_str
        };
        Servers.gonghuiProcess("update_gonghui", param, function(data) {
          200 == data.code ? util.show_error_info(null, null, "公会信息更新完成") : util.show_error_info(null, null, data.msg);
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  gonghui: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b6a5PGzY5FZI+EpPeBqv51", "gonghui");
    "use strict";
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
      unable_one_button: function unable_one_button(tag) {
        this.my_gonghui_button.getComponent("cc.Button").interactable = true;
        this.add_gonghui_button.getComponent("cc.Button").interactable = true;
        this.join_gonghui_button.getComponent("cc.Button").interactable = true;
        "gonghui" == tag ? this.my_gonghui_button.getComponent("cc.Button").interactable = false : "add_gonghui" == tag ? this.add_gonghui_button.getComponent("cc.Button").interactable = false : "join_gonghui" == tag && (this.join_gonghui_button.getComponent("cc.Button").interactable = false);
      },
      my_gonghui_button_cb: function my_gonghui_button_cb() {
        cc.log("my_gonghui_button_cb" + JSON.stringify(g_user));
        var self = this;
        self.unable_one_button("gonghui");
        if (null == g_user["gonghui_id"]) {
          var empty_node_com = self.empty_node.getComponent("gonghui_empty");
          empty_node_com.set_text("no_g");
          self.show_one_node("empty");
        } else Servers.gonghuiProcess("getGonghuiGongHuiId", {
          gonghui_id: g_user.gonghui_id
        }, function(data) {
          if (200 == data.code && null != data.msg) {
            var gonghui_data = data.msg;
            if (gonghui_data["player_id"] != g_user["id"]) {
              var my_gonghui_com = self.my_gonghui_node.getComponent("gonghui_yuan");
              my_gonghui_com.init(gonghui_data, self);
              self.show_one_node("gonghui");
            } else {
              var my_gonghui_com = self.my_gonghui_zhang_node.getComponent("gonghui_zhang");
              my_gonghui_com.init(gonghui_data, self);
              self.show_one_node("gonghui_zhang");
            }
          } else {
            var empty_node_com = self.empty_node.getComponent("gonghui_empty");
            empty_node_com.set_text("no_g");
            self.show_one_node("empty");
          }
        });
      },
      add_gonghui_button_cb: function add_gonghui_button_cb() {
        cc.log("add_gonghui_button_cb");
        var self = this;
        this.unable_one_button("add_gonghui");
        if (null != g_user["gonghui_id"]) {
          var empty_node_com = this.empty_node.getComponent("gonghui_empty");
          empty_node_com.set_text("has_g");
          this.show_one_node("empty");
        } else Servers.gonghuiProcess("getGonghuiAns", {
          player_id: g_user["id"]
        }, function(data) {
          if (200 == data.code) {
            var gonghui_ans = data.msg;
            if (0 == gonghui_ans.status) {
              var empty_node_com = self.empty_node.getComponent("gonghui_empty");
              empty_node_com.set_text("adding_g");
              self.show_one_node("empty");
            }
          } else {
            var add_gonghui_com = self.add_gonghui_node.getComponent("gonghui_shenqing");
            add_gonghui_com.init(self);
            self.show_one_node("add_gonghui");
          }
        });
      },
      join_gonghui_button_cb: function join_gonghui_button_cb() {
        cc.log("join_gonghui_button_cb");
        this.unable_one_button("join_gonghui");
        var self = this;
        if (null != g_user["gonghui_id"]) {
          var empty_node_com = this.empty_node.getComponent("gonghui_empty");
          empty_node_com.set_text("join_g");
          this.show_one_node("empty");
        } else Servers.gonghuiProcess("getGonghuiAns", {
          player_id: g_user["id"]
        }, function(data) {
          if (200 == data.code) {
            var gonghui_ans = data.msg;
            if (0 == gonghui_ans.status) {
              var empty_node_com = self.empty_node.getComponent("gonghui_empty");
              empty_node_com.set_text("adding_g");
              self.show_one_node("empty");
            }
          } else {
            var join_gonghui_com = self.join_gonghui_node.getComponent("gonghui_jiaru");
            join_gonghui_com.init(self);
            self.show_one_node("join_gonghui");
          }
        });
      },
      onLoad: function onLoad() {
        var self = this;
        g_current_scene = SCENE_TAG.GONGHUI;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, self.game_sprite);
        Servers.gonghuiProcess("getGonghuiPlayerId", {
          player_id: g_user["id"]
        }, function(data) {
          200 == data.code && null != data.msg && (g_user["gonghui_id"] = data.msg["gonghui_id"]);
          self.my_gonghui_button_cb();
        });
      },
      close_scene: function close_scene() {
        this.node.active = false;
        this.node.destroy();
        cc.director.loadScene("MainScene");
      },
      show_one_node: function show_one_node(tag) {
        this.my_gonghui_node.active = false;
        this.my_gonghui_zhang_node.active = false;
        this.add_gonghui_node.active = false;
        this.join_gonghui_node.active = false;
        this.empty_node.active = false;
        "empty" == tag ? this.empty_node.active = true : "gonghui" == tag ? this.my_gonghui_node.active = true : "gonghui_zhang" == tag ? this.my_gonghui_zhang_node.active = true : "add_gonghui" == tag ? this.add_gonghui_node.active = true : "join_gonghui" == tag && (this.join_gonghui_node.active = true);
      }
    });
    cc._RF.pop();
  }, {} ],
  msage_scroll: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b13ed8BnidJ64JY/eb8+mGs", "msage_scroll");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scroll_label: cc.Label,
        scroll_parent: cc.Node
      },
      onLoad: function onLoad() {},
      set_string: function set_string(string) {
        this.scroll_label.node.active = false;
        this.scroll_label.node.stopAllActions();
        this.scroll_label.string = string;
        this.scroll_label.node.x = this.scroll_parent.getContentSize().width / 2 + this.scroll_parent.getPositionX() + this.scroll_label.node.getContentSize().width;
        this.start_scroll();
      },
      start_scroll: function start_scroll() {
        this.scroll_label.node.active = true;
        var self = this;
        this.scroll_label.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.001, 0, 0), cc.callFunc(function() {
          var cnode = self.scroll_label.node;
          cnode.x = cnode.x - 2.5;
          var left_x = self.scroll_parent.getContentSize().width / 2 + cnode.getContentSize().width;
          cnode.x <= -left_x + self.scroll_parent.x && cnode.stopAllActions();
        }.bind(this)))));
      }
    });
    cc._RF.pop();
  }, {} ],
  my_game_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ba26ePwh/RNWIeA859ndTMc", "my_game_info");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        game_sprite: cc.Node,
        zhanji_node: cc.Node,
        zhanji_button: cc.Node,
        record_button: cc.Node,
        record_node: cc.Node
      },
      onLoad: function onLoad() {
        var self = this;
        g_current_scene = SCENE_TAG.GAMEINFO;
        Servers.userInfoProcess("get_player", {
          player_id: g_user["id"]
        }, function(data) {
          if (200 == data.code) {
            for (var key in data.msg) g_user[key] = data.msg[key];
            self.zhanji_button_cb();
          }
        });
      },
      zhanji_button_cb: function zhanji_button_cb() {
        this.zhanji_button.getComponent("cc.Button").interactable = false;
        this.record_button.getComponent("cc.Button").interactable = true;
        var zhanji_node_com = this.zhanji_node.getComponent("my_game_zhanji");
        zhanji_node_com.init_zhanji_info(g_user, this);
        this.zhanji_node.active = true;
        var record_node_com = this.record_node.getComponent("my_game_record");
        record_node_com.clear_scroll_data();
        this.record_node.active = false;
        cc.log("zhanji_button_cb");
      },
      record_button_cb: function record_button_cb() {
        this.record_button.getComponent("cc.Button").interactable = false;
        this.zhanji_button.getComponent("cc.Button").interactable = true;
        var record_node_com = this.record_node.getComponent("my_game_record");
        record_node_com.init_record_info(g_user, this);
        this.record_node.active = true;
        var zhanji_node_com = this.zhanji_node.getComponent("my_game_zhanji");
        zhanji_node_com.clear_scroll_data();
        this.zhanji_node.active = false;
        cc.log("record_button_cb");
      },
      close_scene: function close_scene() {
        this.node.active = false;
        this.node.destroy();
        cc.director.loadScene("MainScene");
      }
    });
    cc._RF.pop();
  }, {} ],
  my_game_record: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be293aRiopAYoyqdhktCN8Y", "my_game_record");
    "use strict";
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
        pthis: null
      },
      onLoad: function onLoad() {},
      initialize: function initialize() {
        this.content = this.scrollView.content;
        this.items = [];
        this.updateTimer = 0;
        this.updateInterval = .2;
        this.itemHeight = 40;
        this.lastContentPosY = 0;
        this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
        this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
        for (var i = 0; i < this.spawnCount; ++i) {
          if (this.data_list.length <= i) break;
          var item = cc.instantiate(g_assets["record_item_layout"]);
          this.content.addChild(item);
          item.setPosition(0, -item.height * (.5 + i) - this.spacing * (i + 1));
          item.getComponent("record_item").init(i, this.data_list[i], this.pthis);
          this.items.push(item);
        }
      },
      getPositionInView: function getPositionInView(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        if (null == this.items || this.items.length <= 0) return;
        this.updateTimer = 0;
        var items = this.items;
        var isDown = this.scrollView.content.y < this.lastContentPosY;
        var offset = (this.itemHeight + this.spacing) * items.length;
        var newY = 0;
        for (var i = 0; i < items.length; ++i) {
          var viewPos = this.getPositionInView(items[i]);
          if (isDown) {
            newY = items[i].y + offset;
            if (viewPos.y < -this.bufferZone && newY < 0) {
              items[i].setPositionY(newY);
              var item = items[i].getComponent("record_item");
              var itemId = item.itemID - items.length;
              item.init(itemId, this.data_list[itemId], this.pthis);
              cc.log("prev id:" + itemId);
            }
          } else {
            newY = items[i].y - offset;
            if (viewPos.y > this.bufferZone && newY > -this.content.height) {
              items[i].setPositionY(newY);
              var _item = items[i].getComponent("record_item");
              var _itemId = _item.itemID + items.length;
              _item.init(_itemId, this.data_list[_itemId], this.pthis);
              cc.log("next id:" + _itemId);
            }
          }
        }
        this.lastContentPosY = this.scrollView.content.y;
      },
      init_record_info: function init_record_info(data, pthis) {
        var self = this;
        this.pthis = pthis;
        this.all_num_node.getComponent("cc.Label").string = data["fangka_history"];
        this.use_num_node.getComponent("cc.Label").string = parseInt(data["fangka_history"]) - parseInt(data["fangka_num"]);
        this.left_num_node.getComponent("cc.Label").string = data["fangka_num"];
        this.invalid_num_node.getComponent("cc.Label").string = data["invalid_fangka"];
        var param = {
          player_id: data["id"],
          index: 0,
          length: this.totalCount
        };
        Servers.gameInfoProcess("getBuyFangkaList", param, function(data) {
          self.data_list = data.msg;
          self.totalCount = self.data_list.length;
          self.data_list.length > 0 && self.initialize();
        });
      },
      clear_scroll_data: function clear_scroll_data() {
        if (null == this.items) return;
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.removeFromParent();
          item.destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  my_game_zhanji: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7cde2/xQdAYqLHczjMuqhh", "my_game_zhanji");
    "use strict";
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
        pthis: null
      },
      onLoad: function onLoad() {},
      initialize: function initialize() {
        this.content = this.scrollView.content;
        this.items = [];
        this.updateTimer = 0;
        this.updateInterval = .2;
        this.itemHeight = 40;
        this.lastContentPosY = 0;
        this.bufferZone = this.spawnCount * (this.itemHeight + this.spacing) / 2;
        this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing;
        for (var i = 0; i < this.spawnCount; ++i) {
          if (this.data_list.length <= i) break;
          var item = cc.instantiate(g_assets["game_history_item_layout"]);
          this.content.addChild(item);
          item.setPosition(0, -item.height * (.5 + i) - this.spacing * (i + 1));
          item.getComponent("game_history_item").init(i, this.data_list[i], this.pthis);
          this.items.push(item);
        }
      },
      getPositionInView: function getPositionInView(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        if (null == this.items || this.items.length <= 0) return;
        this.updateTimer = 0;
        var items = this.items;
        var isDown = this.scrollView.content.y < this.lastContentPosY;
        var offset = (this.itemHeight + this.spacing) * items.length;
        var newY = 0;
        for (var i = 0; i < items.length; ++i) {
          var viewPos = this.getPositionInView(items[i]);
          if (isDown) {
            newY = items[i].y + offset;
            if (viewPos.y < -this.bufferZone && newY < 0) {
              items[i].setPositionY(newY);
              var item = items[i].getComponent("game_history_item");
              var itemId = item.itemID - items.length;
              item.init(itemId, this.data_list[itemId], this.pthis);
              cc.log("prev id:" + itemId);
            }
          } else {
            newY = items[i].y - offset;
            if (viewPos.y > this.bufferZone && newY > -this.content.height) {
              items[i].setPositionY(newY);
              var _item = items[i].getComponent("game_history_item");
              var _itemId = _item.itemID + items.length;
              _item.init(_itemId, this.data_list[_itemId], this.pthis);
              cc.log("next id:" + _itemId);
            }
          }
        }
        this.lastContentPosY = this.scrollView.content.y;
      },
      init_zhanji_info: function init_zhanji_info(data, pthis) {
        var self = this;
        this.pthis = pthis;
        this.jushu_node.getComponent("cc.Label").string = data["round_num"];
        this.fenshu_node.getComponent("cc.Label").string = data["all_score"];
        this.win_node.getComponent("cc.Label").string = data["win_num"];
        this.lose_node.getComponent("cc.Label").string = data["lose_num"];
        this.equal_node.getComponent("cc.Label").string = parseInt(data["round_num"]) - parseInt(data["win_num"]) - parseInt(data["lose_num"]);
        var param = {
          player_id: data["id"],
          index: 0,
          length: this.totalCount
        };
        Servers.gameInfoProcess("getGameHistoryList", param, function(data) {
          cc.log(data);
          if (200 == data.code) {
            self.data_list = data.msg;
            self.totalCount = self.data_list.length;
            self.data_list.length > 0 && self.initialize();
          }
        });
      },
      clear_scroll_data: function clear_scroll_data() {
        if (null == this.items) return;
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.removeFromParent();
          item.destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  one_choice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d1a018PC3BH/bIuqlMswyHX", "one_choice");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        index: 0,
        type: 0
      },
      onLoad: function onLoad() {
        var self = this;
        this.node.on("touchstart", function(event) {
          self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, this);
      },
      init: function init(index, type) {
        this.index = index;
        this.type = type;
      },
      pitchOn: function pitchOn() {
        this.node.getChildByName("choiced").active = true;
        this.node.getChildByName("choice").active = false;
      },
      lifeUp: function lifeUp() {
        this.node.getChildByName("choice").active = true;
        this.node.getChildByName("choiced").active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  payJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2fd20Nw61NOvpGkpRg4KuHC", "payJS");
    "use strict";
    var payJS = payJS || {};
    payJS.javascriptMethod = function(param) {
      cc.log(param);
      cc.log("------------------------------------------");
      pomelo.request("payInfo.payInfoHandler.payMsg", {
        param: param
      }, function(data) {
        console.log(data.msg);
      });
    };
    cc._RF.pop();
  }, {} ],
  pj_card: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd952ewm1JBR7Ig9KAPYmyx", "pj_card");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        sprite: cc.Node,
        sprite_back: cc.Sprite,
        touch_tag: false,
        num: 0,
        id: 0,
        suit: 0,
        rank: 0
      },
      initCardSprite: function initCardSprite(rank) {
        this.num = rank;
        this.suit = g_paixing[rank][1];
        this.rank = g_paixing[rank][0];
        this.sprite.getComponent("cc.Sprite").spriteFrame = g_assets[rank.toString()];
        this.sprite.runAction(cc.hide());
      },
      onLoad: function onLoad() {
        cc.log("zjh_card  onload......");
      },
      installTouch: function installTouch() {
        this.node.on("touchstart", this.touch_call, this);
      },
      uninstallTouch: function uninstallTouch() {
        this.node.off("touchstart", this.touch_call, this);
      },
      touch_call: function touch_call(event) {
        this.menuCallbackButton();
        this.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
      },
      menuCallbackButton: function menuCallbackButton() {
        console.log("start move the card......");
        if (false == this.touch_tag) {
          var x = this.node.getPositionX();
          var y = this.node.getPositionY() + 10;
          console.log("start move the card up......x:" + x + " y:" + y);
          var acToUp = cc.moveTo(.1, cc.p(x, y));
          console.log("start move the card up......");
          this.node.runAction(acToUp);
          this.touch_tag = true;
        } else {
          var x = this.node.getPositionX();
          var y = this.node.getPositionY() - 10;
          var acToDown = cc.moveTo(.1, cc.p(x, y));
          console.log("start move the card down......x:" + x + " y:" + y);
          this.node.runAction(acToDown);
          this.touch_tag = false;
        }
        return this.touch_tag;
      }
    });
    cc._RF.pop();
  }, {} ],
  pj_create_game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35ba8zJX5JMmadNUurTYkMw", "pj_create_game");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("start go into create game js");
        var self = this;
        self.model = 1;
        self.max_type = 1;
        self.fangka = 1;
        self.node.on("pressed", self.switchRadio, self);
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, this.node);
      },
      switchRadio: function switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
        var type = event.target.getComponent("one_choice").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        for (var i = 0; i < this.choice_radios.length; i++) {
          var item = this.choice_radios[i].getComponent("one_choice");
          if (item.type == type) {
            0 == type ? this.renshu = index : 1 == type ? this.max_type = index : 2 == type ? this.wait_time = index : 3 == type && (this.fangka = index);
            item.index == index ? item.pitchOn() : item.lifeUp();
          }
        }
        cc.log("select renshu" + this.renshu + " fangka:" + this.fangka + " zuida:" + this.max_type + " wait_time:" + this.wait_time);
      },
      create_game: function create_game() {
        this.button_node.getComponent("cc.Button").interactable = false;
        var param = {
          renshu: this.renshu,
          room_type: this.game_type,
          player_id: g_user.id,
          wait_time: this.wait_time,
          max_type: this.max_type,
          fangka_type: this.fangka
        };
        room_create(param, this);
      },
      close_scene: function close_scene() {
        this.node.active = false;
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  pj_game_room: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e92dbCeczRCzYDDV7UOGw50", "pj_game_room");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("go into pj game room scene onload");
        g_current_scene = SCENE_TAG.ROOM;
        this.pomelo_removeListener();
        this.sumBet = g_room_data["zhuang_score"];
        this.count = g_room_data["round"];
        this.qieguo = g_room_data["qieguo"];
        this.roomNum = g_room_data["room_num"];
        this.roomState = g_room_data["is_gaming"];
        this.master_name = g_room_data["fangzhu_name"];
        this.startDealCardPosition = g_room_data["first_fapai"];
        this.zhuang_serverPosition = g_room_data["zhuang_location"];
        this.cur_turn = g_room_data["cur_turn"];
        this.myselfCards = new Array();
        this.left_cards = new Array();
        this.betPhotoArray = new Array();
        this.suiji_qiangzhuang.active = false;
        this.init_head_info();
        this.initButtonEnableAfterComeInRoom();
        this.initPlayersAndPlayer_noPower();
        2 == this.roomState && this.init_game_status();
        this.schedule(this.showRoomMessageUpdate, 1 / 60, cc.REPEAT_FOREVER, 0);
        this.node.on("pressed", this.switchRadio, this);
      },
      start: function start() {
        cc.log("go into pj game room scene start");
        g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
        if (null == g_music_key || g_music_key == BOOL.YES) {
          cc.audioEngine.stopAll();
          this.current = cc.audioEngine.play(this.audio, true, 1);
        }
        this.pomelo_on();
        this.init_count_timer();
      },
      init_head_info: function init_head_info() {
        var size = cc.director.getWinSize();
        var lmaster = this.master_label.getComponent(cc.Label);
        lmaster.string = this.master_name;
        var lroom_num = this.room_num_label.getComponent(cc.Label);
        lroom_num.string = this.roomNum;
        var lzongzhu = this.zhuang_label.getComponent(cc.Label);
        lzongzhu.string = this.sumBet;
        var lhuihe = this.huihe_label.getComponent(cc.Label);
        lhuihe.string = this.count;
      },
      initButtonEnableAfterComeInRoom: function initButtonEnableAfterComeInRoom() {
        this.get_one_button("ready", true);
        this.qieguo_button.active = false;
        this.buqie_button.active = false;
      },
      init_game_status: function init_game_status() {
        var player_com = null;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            cc.log("init_game_status: location:" + player_com.position_server + " is_power:" + player_com.is_power);
            break;
          }
        }
        if (player_com.is_power >= 1) for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var t_player_com = player.getComponent("tdk_player");
          cc.log("setSpriteStatus: location:" + t_player_com.position_server + " is_power:" + t_player_com.is_power);
          t_player_com.is_power >= 1 && t_player_com.setSpriteStatus("yizhunbei");
        }
        if (player_com.is_power >= 2) {
          this.getzhuang_callback();
          for (var i = 0; i < g_players.length; i++) {
            var player = g_players[i];
            var t_player_com = player.getComponent("tdk_player");
            cc.log("getzhuang_callback: location:" + t_player_com.position_server + " is_power:" + t_player_com.is_power);
            if (t_player_com.is_power >= 3) {
              var pos_server = t_player_com.position_server;
              var score_str = g_room_data["score_" + pos_server];
              if (null != score_str && "null" != score_str) {
                var chips = JSON.parse(score_str);
                t_player_com.set_chips(1, parseInt(chips[0]));
                t_player_com.set_chips(2, parseInt(chips[1]));
              }
            }
          }
        }
        player_com.is_power >= 4 && this.repairFapai_function();
        player_com.is_power >= 5 && this.repairPeipai_function();
        player_com.is_power >= 6 && this.repairOpenpai_function();
        player_com.is_power >= 7 && this.repairQieguo_function();
      },
      initPlayersAndPlayer_noPower: function initPlayersAndPlayer_noPower() {
        cc.log("initPlayersAndPlayer_noPower" + JSON.stringify(g_players_data));
        g_players.splice(0, g_players.length);
        for (var i = 0; i < g_players_data.length; i++) if (g_players_data[i].id == g_user["id"]) {
          g_myselfPlayerPos = g_players_data[i].location;
          break;
        }
        var position = new Array();
        for (var i = 0; i < g_players_data.length; i++) {
          var idx = -1;
          var player_stc = g_players_data[i];
          if (player_stc.location == g_myselfPlayerPos) idx = 0; else if (player_stc.location > g_myselfPlayerPos) var idx = player_stc.location - g_myselfPlayerPos; else if (player_stc.location < g_myselfPlayerPos) var idx = this.players.length - g_myselfPlayerPos + player_stc.location;
          idx >= 0 && (position[idx] = player_stc);
        }
        var left_local = 1;
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          var player_stc = position[i];
          if (null == player_stc) {
            left_local = (left_local + 1) % 4;
            0 == left_local && (left_local = 4);
            player_com.player_position = i + 1;
            player_com.position_server = left_local;
            player.active = false;
            continue;
          }
          left_local = player_stc.location;
          player_stc["is_power"] = g_room_data["is_game_" + player_stc.location];
          this.zhuang_serverPosition == player_stc.location ? player_stc["my_gold"] = g_room_data["zhuang_score"] : player_stc["my_gold"] = g_room_data["left_score_" + player_stc.location];
          player_com.init(player_stc);
          player_com.player_position = i + 1;
          cc.log("set player_com: player_position:" + player_com.player_position + " position_server:" + player_com.position_server);
          cc.log("player_com: is_power:" + player_com.is_power);
          g_players.push(player);
          player.active = true;
        }
      },
      init_count_timer: function init_count_timer() {
        cc.log("g_players:" + g_players.length);
        for (var i = 0; i < g_players.length; i++) {
          var player_com = g_players[i].getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            player_com.start_timer();
            break;
          }
        }
      },
      get_one_button: function get_one_button(status) {
        var flag = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.button_layout.active = true;
        this.zhunbei_button.active = false;
        this.qiangzhang_button.active = false;
        this.peipai_button.active = false;
        this.kaipai_button.active = false;
        this.queding_button.active = false;
        this.xiazhu_button.active = false;
        var my_button = this.zhunbei_button;
        "ready" == status ? my_button = this.zhunbei_button : "qiang" == status ? my_button = this.qiangzhang_button : "peipai" == status ? my_button = this.peipai_button : "kaipai" == status ? my_button = this.kaipai_button : "queding" == status ? my_button = this.queding_button : "xiazhu" == status && (my_button = this.xiazhu_button);
        my_button.active = true;
        my_button.getComponent(cc.Button).interactable = flag;
      },
      callback_zhunbei: function callback_zhunbei() {
        this.zhunbei_button.active = false;
        pomelo.request(util.getGameRoute(), {
          process: "ready",
          location: g_myselfPlayerPos
        }, function(data) {
          cc.log(data.msg);
        });
      },
      callback_xiazhu: function callback_xiazhu() {
        this.xiazhu_button.getComponent(cc.Button).interactable = false;
        this.chip_layout = cc.instantiate(g_assets["pop_add_chip"]);
        var chip_layout_com = this.chip_layout.getComponent("add_chip");
        chip_layout_com.init_callback(this, this.sumBet, this.silder_callback);
        this.node.addChild(this.chip_layout);
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            var x = 0;
            var y = this.button_layout.getPositionY() + this.button_layout.getContentSize().height / 2 + 10 + this.chip_layout.getContentSize().height / 2;
            this.chip_layout.setPosition(cc.p(x, y));
            break;
          }
        }
        this.get_one_button("queding", false);
      },
      callback_queding: function callback_queding() {
        this.chip_layout.active = false;
        this.chip_layout.destroy();
        this.queding_button.active = false;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            var chip1 = player_com.my_chip1;
            var chip2 = player_com.my_chip2;
            pomelo.request(util.getGameRoute(), {
              process: "xiazhu",
              chips: [ chip1, chip2 ],
              location: g_myselfPlayerPos
            }, function(data) {
              cc.log(data.msg);
            });
            break;
          }
        }
      },
      callback_peipai: function callback_peipai() {
        this.peipai_button.active = false;
        var size = cc.director.getVisibleSize();
        var playerPosition = -1;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            playerPosition = i;
            break;
          }
        }
        var player = g_players[playerPosition];
        var player_com = player.getComponent("tdk_player");
        var selectCards = player_com.selected_cards;
        if (2 != selectCards.length) {
          util.show_error_info(this, size, "只能选择两张牌");
          this.peipai_button.active = true;
          return;
        }
        this.peipai_button.active = false;
        for (var i = 0; i < 4; i++) {
          var card_com = player_com.my_cards[i].getComponent("pj_card");
          card_com.uninstallTouch();
        }
        var mark = [];
        var select = [];
        for (var i = 0; i < selectCards.length; i++) {
          var card_com = selectCards[i].getComponent("pj_card");
          mark.push(card_com.num);
          select.push(card_com.id);
        }
        pomelo.request(util.getGameRoute(), {
          process: "peipai",
          peipai: mark,
          select: select,
          location: g_myselfPlayerPos
        }, function(data) {
          console.log(data.msg);
        });
      },
      callback_kaipai: function callback_kaipai() {
        this.kaipai_button.active = false;
        pomelo.request(util.getGameRoute(), {
          process: "open",
          location: g_myselfPlayerPos
        }, function(data) {
          cc.log(data.msg);
        });
      },
      callback_qieguo: function callback_qieguo() {
        this.qieguo_button.active = false;
        this.buqie_button.active = false;
        pomelo.request(util.getGameRoute(), {
          process: "qieguo",
          location: g_myselfPlayerPos,
          flag: true
        }, function(data) {
          cc.log(data.msg);
        });
      },
      callback_buqie: function callback_buqie() {
        this.qieguo_button.active = false;
        this.buqie_button.active = false;
        pomelo.request(util.getGameRoute(), {
          process: "qieguo",
          location: g_myselfPlayerPos,
          flag: false
        }, function(data) {
          cc.log(data.msg);
        });
      },
      callback_setting: function callback_setting() {
        var self = this;
        var size = cc.director.getVisibleSize();
        var pop_setting = cc.instantiate(g_assets["pop_setting_scene"]);
        var pop_setting_com = pop_setting.getComponent("pop_set_scene");
        pop_setting_com.set_callback(function(index) {
          if (0 == index) if (g_music_key == BOOL.NO && null != self.current) {
            cc.audioEngine.stop(self.current);
            self.current = null;
          } else null == self.current && (self.current = cc.audioEngine.play(self.audio, true, 1));
        });
        var x = size.width / 2;
        var y = size.height / 2;
        this.node.addChild(pop_setting);
        pop_setting.setPosition(this.node.convertToNodeSpaceAR(cc.p(x, y)));
      },
      callback_gameback: function callback_gameback() {
        var self = this;
        pomelo.request(util.getGameRoute(), {
          process: "quitRoom"
        }, function(data) {
          console.log("-----quit------" + JSON.stringify(data));
          self.onExit();
          cc.director.loadScene("MainScene");
        });
      },
      callback_uinfo: function callback_uinfo(event, id) {
        var player = this.players[id];
        var player_com = player.getComponent("tdk_player");
        pomelo.request(util.getGameRoute(), {
          process: "get_user_info",
          send_from: g_myselfPlayerPos,
          location: player_com.position_server
        }, function(data) {
          console.log("-----quit------" + JSON.stringify(data));
        });
      },
      showRoomMessageUpdate: function showRoomMessageUpdate() {
        this.zhuang_label.string = this.sumBet;
        this.huihe_label.string = this.count;
      },
      repairFapai_function: function repairFapai_function() {
        this.myselfCards.splice(0, this.myselfCards.length);
        this.myselfCards.push(JSON.parse(g_room_data["pai1"]));
        this.myselfCards.push(JSON.parse(g_room_data["pai2"]));
        this.myselfCards.push(JSON.parse(g_room_data["pai3"]));
        this.myselfCards.push(JSON.parse(g_room_data["pai4"]));
        if (1 == this.cur_turn) {
          for (var i = 1; i < 33; i++) {
            var flag = false;
            for (var j = 0; j < this.myselfCards.length; j++) {
              var item = this.myselfCards[j];
              for (var m = 0; m < item.length; m++) i == item[m] && (flag = true);
            }
            if (false == flag) {
              var card = cc.instantiate(g_assets["pj_card"]);
              var card_com = card.getComponent("pj_card");
              card_com.initCardSprite(i);
              card_com.sprite.runAction(cc.show());
              card_com.sprite_back.node.runAction(cc.hide());
              this.left_card_layout.addChild(card);
              this.left_cards.push(card);
            }
          }
          2 == this.cur_turn;
        }
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          var card_type = this.myselfCards[player_com.position_server - 1];
          cc.log("actionFaPai card_type:" + JSON.stringify(card_type) + " position_server:" + player_com.position_server);
          for (var j = 0; j < 4; j++) {
            var card = player_com.addPlayerCard();
            var card_com = card.getComponent("pj_card");
            var position = this.calc_player_card_position(player, j);
            if (player_com.position_server == g_myselfPlayerPos) {
              card_com.installTouch();
              player_com.set_card_sprite(j, card_type[j]);
              card_com.sprite_back.node.runAction(cc.hide());
              card_com.sprite.runAction(cc.show());
            }
            card.setPosition(position);
          }
        }
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          var unselect_cards = new Array();
          var select_cards = new Array();
          if (player_com.is_power >= 5 && player_com.position_server != g_myselfPlayerPos) {
            for (var j = 0; j < 4; j++) {
              var card = player_com.my_cards[j];
              j < 2 ? select_cards.push(card) : unselect_cards.push(card);
            }
            this.set_cards_w(player, select_cards);
            this.set_cards_h(player, unselect_cards);
          }
        }
        this.get_one_button("peipai", true);
      },
      repairPeipai_function: function repairPeipai_function() {
        var flag = true;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          var unselect_cards = new Array();
          var select_cards = new Array();
          if (player_com.is_power >= 5 && player_com.position_server == g_myselfPlayerPos) {
            for (var j = 0; j < 4; j++) {
              var card = player_com.my_cards[j];
              j < 2 ? select_cards.push(card) : unselect_cards.push(card);
            }
            this.set_cards_w(player, select_cards);
            this.set_cards_h(player, unselect_cards);
          }
        }
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          cc.log("repairPeipai_function : is_power:" + player_com.is_power);
          if (player_com.is_power >= 5) continue;
          flag = false;
        }
        cc.log("repairPeipai_function:" + this.zhuang_serverPosition + " " + g_myselfPlayerPos + " " + flag);
        this.zhuang_serverPosition == g_myselfPlayerPos && true == flag && this.get_one_button("kaipai", true);
        this.peipai_button.active = false;
        this.peipai_button.getComponent("cc.Button").interactable = false;
      },
      repairOpenpai_function: function repairOpenpai_function() {
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          var card_type = this.myselfCards[player_com.position_server - 1];
          for (var j = 0; j < 4; j++) {
            player_com.set_card_sprite(j, card_type[j]);
            var card = player_com.my_cards[j];
            var card_com = card.getComponent("pj_card");
            card_com.sprite_back.node.runAction(cc.hide());
            card_com.sprite.runAction(cc.show());
          }
        }
        var scores = [ g_room_data["left_score_1"], g_room_data["left_score_2"], g_room_data["left_score_3"], g_room_data["left_score_4"] ];
        this.qieguo = g_room_data["qieguo"];
        this.sumBet = this.sumBet + scores[this.zhuang_serverPosition - 1];
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          player_com.resetMoneyLabel(player_com.my_gold + scores[player_com.position_server - 1]);
          if (player_com.position_server != this.zhuang_serverPosition) if (scores[player_com.position_server - 1] > 0) {
            player_com.setGameStatus("winner");
            this.actionWinnerGetBet(this.zhuang_serverPosition, player_com.position_server, true);
          } else if (scores[player_com.position_server - 1] < 0) {
            player_com.setGameStatus("loser");
            this.actionWinnerGetBet(player_com.position_server, this.zhuang_serverPosition, true);
          } else {
            player_com.setGameStatus("equal");
            this.actionWinnerGetBet(0, 0, false);
          }
        }
      },
      repairQieguo_function: function repairQieguo_function() {
        this.repairOpenpai_function();
        var scores = [ g_room_data["left_score_1"], g_room_data["left_score_2"], g_room_data["left_score_3"], g_room_data["left_score_4"] ];
        var is_qie = false;
        1 == g_room_data["qieguo_flag"] && (is_qie = true);
        this.onQieguo_function({
          scores: scores,
          flag: is_qie
        });
      },
      pomelo_on: function pomelo_on() {
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
      onReady_function: function onReady_function(data) {
        cc.log("pomelo on Ready:" + data.location + " is ready");
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == data.location) {
            player_com.setSpriteStatus("yizhunbei");
            player_com.stop_timer();
            break;
          }
        }
      },
      onGetZhuang_function: function onGetZhuang_function(data) {
        cc.log("pomelo onGetzhuang_function:" + JSON.stringify(data));
        var size = cc.director.getWinSize();
        var num1 = data.nums[0];
        var num2 = data.nums[1];
        this.zhuang_serverPosition = data.zhuang_local;
        this.suiji_qiangzhuang.active = true;
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == this.zhuang_serverPosition) {
            var yao_shaizi = cc.instantiate(g_assets["yaoshaizi"]);
            var yao_shaizi_com = yao_shaizi.getComponent("shai_zhong_active");
            yao_shaizi_com.init_start(null, num1, num2, player.getPosition());
            this.node.addChild(yao_shaizi);
            yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 4 * 1.8)));
            var call_back_function = cc.callFunc(this.getzhuang_callback, this);
            this.node.runAction(cc.sequence(cc.delayTime(3), call_back_function));
            break;
          }
        }
      },
      onXiazhu_function: function onXiazhu_function(data) {
        cc.log("onXiazhu_function:" + JSON.stringify(data));
        var location = data.location;
        var chips = data.chips;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == data.location) {
            player_com.set_chips(1, chips[0]);
            player_com.set_chips(2, chips[1]);
            break;
          }
        }
      },
      onFapai_function: function onFapai_function(data) {
        cc.log("onFapai" + JSON.stringify(data));
        var size = cc.director.getWinSize();
        this.cur_turn = data["cur_turn"];
        if (0 == this.cur_turn) {
          for (var i = 0; i < this.left_cards.length; i++) {
            var card = this.left_cards[i];
            card.removeFromParent();
          }
          this.left_cards.splice(0, this.left_cards.length);
        }
        this.startDealCardPosition = data["location"];
        for (var i = 0; i < this.betPhotoArray.length; i++) this.betPhotoArray[i].removeFromParent();
        this.betPhotoArray.splice(0, this.betPhotoArray.length);
        for (var i = 0; i < this.players.length; i++) {
          var player_com = this.players[i].getComponent("tdk_player");
          player_com.remove_cards();
          player_com.remove_select_cards();
        }
        this.sumBet = data["all_chip"];
        for (var i = 0; i < g_players.length; i++) {
          var player_com = g_players[i].getComponent("tdk_player");
          player_com.hide_game_sprite();
        }
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == this.startDealCardPosition) {
            var shaizi_1 = data["nums"][0];
            var shaizi_2 = data["nums"][1];
            var yao_shaizi = cc.instantiate(g_assets["yaoshaizi"]);
            var yao_shaizi_com = yao_shaizi.getComponent("shai_zhong_active");
            yao_shaizi_com.init_start(null, shaizi_1, shaizi_2, player.getPosition());
            this.node.addChild(yao_shaizi);
            yao_shaizi.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 4 * 1.8)));
            break;
          }
        }
      },
      onShoupai_function: function onShoupai_function(data) {
        cc.log("onShoupai:" + JSON.stringify(data));
        this.myselfCards.splice(0, this.myselfCards.length);
        this.count = data["round"];
        var cardType = data["paixing"];
        for (var i = 0; i < cardType.length; i++) this.myselfCards.push(cardType[i]);
        cc.log("myselfCards:" + JSON.stringify(this.myselfCards));
        this.myselfCardsReach = true;
        var fapai_order = new Array();
        var fapai_l = this.startDealCardPosition;
        for (var i = 0; i < 4; i++) {
          var idx = fapai_l % 4;
          0 == idx && (idx = 4);
          fapai_order.push(idx);
          fapai_l += 1;
        }
        cc.log("fapai_order:" + JSON.stringify(fapai_order));
        this.actionFaPai(this, fapai_order);
      },
      onPeiPai_function: function onPeiPai_function(data) {
        cc.log("onPeipai_function:" + JSON.stringify(data));
        var player_position = data.location;
        var card_select_ids = data.select;
        var head_flag = data.flag;
        for (var m = 0; m < g_players.length; m++) {
          var player = g_players[m];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == player_position) {
            var all_cards = player_com.my_cards;
            var unselect_cards = new Array();
            var select_cards = new Array();
            for (var j = 0; j < all_cards.length; j++) {
              var flag = false;
              var card_item = all_cards[j];
              var card_item_com = card_item.getComponent("pj_card");
              cc.log("card_item_com id:" + card_item_com.id + " selected_cards:" + player_com.selected_cards.length);
              for (var i = 0; i < card_select_ids.length; i++) if (card_item_com.id == card_select_ids[i]) {
                flag = true;
                break;
              }
              false == flag ? unselect_cards.push(card_item) : select_cards.push(card_item);
            }
            if (true == head_flag) {
              for (var i = 0; i < select_cards.length; i++) {
                var card = select_cards[i];
                var card_com = card.getComponent("pj_card");
                card_com.id = i;
              }
              for (var i = 0; i < unselect_cards.length; i++) {
                var card = unselect_cards[i];
                var card_com = card.getComponent("pj_card");
                card_com.id = i + 2;
              }
              this.set_cards_w(player, select_cards);
              this.set_cards_h(player, unselect_cards);
            } else {
              for (var i = 0; i < select_cards.length; i++) {
                var card = select_cards[i];
                var card_com = card.getComponent("pj_card");
                card_com.id = i + 2;
              }
              for (var i = 0; i < unselect_cards.length; i++) {
                var card = unselect_cards[i];
                var card_com = card.getComponent("pj_card");
                card_com.id = i;
              }
              this.set_cards_w(player, unselect_cards);
              this.set_cards_h(player, select_cards);
            }
            break;
          }
        }
      },
      onPeiPaiFinish_function: function onPeiPaiFinish_function(data) {
        g_myselfPlayerPos == this.zhuang_serverPosition && this.get_one_button("kaipai", true);
      },
      onEnd_function: function onEnd_function(data) {
        cc.log("onEnd:" + JSON.stringify(data));
        var scores = data["scores"];
        this.qieguo = data["isqie"];
        this.sumBet = this.sumBet + scores[this.zhuang_serverPosition - 1];
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          player_com.resetMoneyLabel(player_com.my_gold + scores[player_com.position_server - 1]);
          if (player_com.position_server != this.zhuang_serverPosition) if (scores[player_com.position_server - 1] > 0) {
            player_com.setGameStatus("winner");
            this.actionWinnerGetBet(this.zhuang_serverPosition, player_com.position_server, true);
          } else if (scores[player_com.position_server - 1] < 0) {
            player_com.setGameStatus("loser");
            this.actionWinnerGetBet(player_com.position_server, this.zhuang_serverPosition, true);
          } else {
            player_com.setGameStatus("equal");
            this.actionWinnerGetBet(0, 0, false);
          }
        }
      },
      onQieguo_function: function onQieguo_function(data) {
        cc.log("onQieguo_function:" + JSON.stringify(data));
        var size = cc.director.getVisibleSize();
        var flag = data.flag;
        if (false == flag) {
          if (g_myselfPlayerPos != this.zhuang_serverPosition) {
            for (var i = 0; i < this.players.length; i++) {
              var player = this.players[i];
              var player_com = player.getComponent("tdk_player");
              if (player_com.position_server == g_myselfPlayerPos) {
                player_com.set_chips(1, 0);
                player_com.set_chips(2, 0);
              }
            }
            this.get_one_button("xiazhu", true);
          }
        } else {
          var scores = data.scores;
          var results = new Array();
          for (var i = 0; i < g_players_data.length; i++) {
            var player_item = g_players_data[i];
            if (null != player_item && "null" != player_item) {
              var item = new Array();
              item.push(player_item.nick_name);
              item.push(player_item.head_img_url);
              player_item.location == this.zhuang_serverPosition ? item.push(100) : item.push(0);
              item.push(scores[player_item.location - 1]);
              if (player_item.location == g_myselfPlayerPos) {
                var param = {
                  player_id: g_user["id"],
                  renshu: g_room_data["real_num"],
                  game_status: item[3] - item[2],
                  status: item[3] - item[2],
                  creat_time: g_room_data["creat_time"],
                  room_num: g_room_data["room_num"],
                  use_fangka: 1
                };
                2 == g_room_data["fangka_type"] && (g_myselfPlayerPos == this.zhuang_serverPosition ? param["use_fangka"] = g_room_data["fangka_num"] : param["use_fangka"] = 0);
                Servers.gameInfoProcess("update_game", param, function(res) {});
              }
              results.push(item);
            }
          }
          var self = this;
          var x = size.width / 2;
          var y = size.height / 2;
          var pop_game_finish = cc.instantiate(g_assets["pop_game_finish"]);
          var pop_game_finish_com = pop_game_finish.getComponent("pop_game_finish");
          this.node.addChild(pop_game_finish);
          pop_game_finish_com.init_info(results, function() {
            self.onExit();
          });
          pop_game_finish.setPosition(this.node.convertToNodeSpaceAR(cc.p(x, y)));
        }
      },
      onOpen_function: function onOpen_function(data) {
        cc.log("onOpen_function:" + JSON.stringify(data));
        var paixing = data.all_pai;
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          var cardString = paixing[player_com.position_server - 1];
          if (player_com.position_server != g_myselfPlayerPos) for (var m = 0; m < 4; m++) {
            var card = player_com.my_cards[m].getComponent("pj_card");
            card.initCardSprite(cardString[card.id]);
            var backCardSeq = cc.sequence(cc.delayTime(.45), cc.hide());
            var backCamera = cc.rotateBy(.45, 0, -90);
            var backSpawn = cc.spawn(backCardSeq, backCamera);
            var frontSeq = cc.sequence(cc.delayTime(.45), cc.show());
            var frontCamera = cc.rotateBy(.6, 0, -360);
            var frontSpawn = cc.spawn(frontSeq, frontCamera);
            card.sprite_back.node.runAction(backSpawn);
            card.sprite.runAction(frontSpawn);
          }
        }
      },
      onUserBroadcast_function: function onUserBroadcast_function(data) {
        console.log("onUserBroadcast:" + JSON.stringify(data));
        var msage_scroll_com = this.msage_scroll.getComponent("msage_scroll");
        msage_scroll_com.set_string(data);
      },
      onGetUinfo_function: function onGetUinfo_function(data) {
        console.log("onGetUinfo_function:" + JSON.stringify(data));
        var size = cc.director.getWinSize();
        if (data["send_from"] == g_myselfPlayerPos) {
          this.uinfo = cc.instantiate(g_assets["pop_game_user"]);
          var uinfo_com = this.uinfo.getComponent("pop_game_user_info");
          uinfo_com.init_info(data, this.actionSendGift);
          this.node.addChild(this.uinfo);
          this.uinfo.setPosition(this.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
        }
      },
      onSendGift_function: function onSendGift_function(data) {
        cc.log("actionSendGift", type, send_from, send_to);
        var s_player = null;
        var e_player = null;
        var type = data["type"];
        var send_from = data["send_from"];
        var send_to = data["send_to"];
        if (send_from == send_to) return false;
        for (var i = 0; i < g_players.length; i++) {
          var player_com = g_players[i].getComponent("tdk_player");
          player_com.position_server == send_from && (s_player = g_players[i]);
          player_com.position_server == send_to && (e_player = g_players[i]);
        }
        var active = null;
        var active_name = null;
        if (1 == type) {
          active = cc.instantiate(g_assets["shoe_active"]);
          active_name = "shoe_active";
        } else if (2 == type) {
          active = cc.instantiate(g_assets["egg_active"]);
          active_name = "egg_active";
        } else if (3 == type) {
          active = cc.instantiate(g_assets["bomb_active"]);
          active_name = "bomb_active";
        } else if (4 == type) {
          active = cc.instantiate(g_assets["kiss_active"]);
          active_name = "kiss_active";
        } else if (5 == type) {
          active = cc.instantiate(g_assets["flower_active"]);
          active_name = "flower_active";
        } else if (6 == type) {
          active = cc.instantiate(g_assets["cheers_active"]);
          active_name = "cheers_active";
        }
        this.node.addChild(active);
        active.setPosition(s_player.getPosition());
        var move = cc.moveTo(.5, e_player.getPosition());
        var rotation = cc.rotateBy(.5, 360);
        var spawn = cc.spawn(move, rotation);
        var self = this;
        var sendAction = cc.callFunc(function() {
          var active_com = active.getComponent("bomb_action");
          active_com.play(active_name);
        });
        active.runAction(cc.sequence(spawn, sendAction));
      },
      actionSendGift: function actionSendGift(type, send_from, send_to) {
        pomelo.request(util.getGameRoute(), {
          process: "send_gift",
          send_from: send_from,
          send_to: send_to,
          type: type
        }, function(data) {
          console.log("-----quit------" + JSON.stringify(data));
        });
      },
      actionFaPai: function actionFaPai(pthis, fapai_order) {
        cc.log("actionFaPai:" + JSON.stringify(fapai_order));
        var size = cc.director.getVisibleSize();
        var local = fapai_order.shift();
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          var card_type = this.myselfCards[local - 1];
          cc.log("actionFaPai card_type:" + JSON.stringify(card_type) + " position_server:" + player_com.position_server + " local:" + local);
          if (player_com.position_server == local) {
            for (var j = 0; j < 4; j++) {
              var card = player_com.addPlayerCard();
              var card_com = card.getComponent("pj_card");
              if (player_com.position_server == g_myselfPlayerPos) {
                card_com.installTouch();
                player_com.set_card_sprite(j, card_type[j]);
              }
              var position = this.calc_player_card_position(player, j);
              card.setPosition(position);
            }
            break;
          }
        }
        if (0 == fapai_order.length) {
          var finish_callback = cc.callFunc(this.fapai_finish, this);
          this.node.runAction(cc.sequence(cc.delayTime(1), finish_callback));
          return;
        }
        var callFunc = cc.callFunc(this.actionFaPai, this, fapai_order);
        this.node.runAction(cc.sequence(cc.delayTime(.45), callFunc));
      },
      fapai_finish: function fapai_finish() {
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            for (var j = 0; j < 4; j++) {
              var backCardSeq = cc.sequence(cc.delayTime(.45), cc.hide());
              var backCamera = cc.rotateBy(.45, 0, -90);
              var backSpawn = cc.spawn(backCardSeq, backCamera);
              var frontSeq = cc.sequence(cc.delayTime(.45), cc.show());
              var frontCamera = cc.rotateBy(.6, 0, -360);
              var frontSpawn = cc.spawn(frontSeq, frontCamera);
              var card = player_com.my_cards[j].getComponent("pj_card");
              card.sprite_back.node.runAction(backSpawn);
              card.sprite.runAction(frontSpawn);
            }
            break;
          }
        }
        this.get_one_button("peipai", true);
      },
      switchRadio: function switchRadio(event) {
        var card_com = event.target.getComponent("pj_card");
        var suit = event.target.getComponent("pj_card").suit;
        var rank = event.target.getComponent("pj_card").rank;
        cc.log("switchRadio : suit:" + suit + " rank:" + rank);
        var player_com = null;
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) break;
        }
        if (null == player_com) return false;
        if (true == card_com.touch_tag) player_com.selected_cards.push(event.target); else for (var i = 0; i < player_com.selected_cards.length; i++) {
          var card_t = player_com.selected_cards[i];
          if (card_t == event.target) {
            player_com.selected_cards.splice(i, 1);
            break;
          }
        }
      },
      calc_player_chip_position: function calc_player_chip_position(player) {
        var player_com = player.getComponent("tdk_player");
        var x = 0;
        var y = 0;
        if (1 == player_com.player_position) {
          x = player.getPositionX() + player_com.mobile_sprite.node.getContentSize().width / 2 + player_com.chips_label.getContentSize().width / 2 + 10;
          y = player.getPositionY();
        } else if (2 == player_com.player_position) {
          x = player.getPositionX();
          y = player.getPositionY() + player_com.mobile_sprite.node.height / 2 + player_com.chips_label.getContentSize().height / 2 + 10;
        } else if (3 == player_com.player_position) {
          x = player.getPositionX() + player_com.mobile_sprite.node.getContentSize().width / 2 + player_com.chips_label.getContentSize().width / 2 + 10;
          y = player.getPositionY();
        } else if (4 == player_com.player_position) {
          x = player.getPositionX();
          y = player.getPositionY() + player_com.mobile_sprite.node.height / 2 + player_com.chips_label.getContentSize().height / 2 + 10;
        }
        cc.log("calc x:" + x + " y:" + y);
        return cc.p(x, y);
      },
      calc_player_card_position: function calc_player_card_position(player, m) {
        var player_com = player.getComponent("tdk_player");
        var x = 0;
        var y = 0;
        var extend = 0;
        player_com.position_server == this.zhuang_serverPosition && (extend = 2 == player_com.player_position || 4 == player_com.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
        if (1 == player_com.player_position || 3 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 80 + extend + (this.pai_back_sprite.node.getContentSize().width + 2) * m;
          y = player_com.chips_label.getPositionY();
        } else if (2 == player_com.player_position || 4 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * m;
          y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
        }
        cc.log("calc player_com:" + player_com.player_position + "x:" + x + " y:" + y);
        return cc.p(x, y);
      },
      calc_hpeipai_position: function calc_hpeipai_position(player, m) {
        var player_com = player.getComponent("tdk_player");
        var x = 0;
        var y = 0;
        var extend = 0;
        player_com.position_server == this.zhuang_serverPosition && (extend = 2 == player_com.player_position || 4 == player_com.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
        if (1 == player_com.player_position || 3 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 2 + 80 + extend + (this.pai_back_sprite.node.getContentSize().width + 2) * m;
          y = player_com.chips_label.getPositionY();
        } else if (2 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * (m + 2);
          y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
        } else if (4 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + (this.pai_back_sprite.node.getContentSize().width + 2) * m;
          y = player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend;
        }
        cc.log("calc player_com:" + player_com.player_position + "x:" + x + " y:" + y);
        return cc.p(x, y);
      },
      calc_wpeipai_position: function calc_wpeipai_position(player, m) {
        var player_com = player.getComponent("tdk_player");
        var x = 0;
        var y = 0;
        var extend = 0;
        player_com.position_server == this.zhuang_serverPosition && (extend = 2 == player_com.player_position || 4 == player_com.player_position ? -this.pai_back_sprite.node.getContentSize().width / 2 : -this.pai_back_sprite.node.getContentSize().width);
        if (1 == player_com.player_position || 3 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + 80 + extend + (this.pai_back_sprite.node.getContentSize().width + 2) + this.pai_back_sprite.node.getContentSize().height / 2 + 2;
          y = 0 == m ? player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : player_com.chips_label.getPositionY() - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
        } else if (4 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width + this.pai_back_sprite.node.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().height / 2 + 2 + (this.pai_back_sprite.node.getContentSize().width + 2);
          y = 0 == m ? player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
        } else if (2 == player_com.player_position) {
          x = player_com.chips_label.getPositionX() - player_com.chips_label.getContentSize().width / 2 + this.pai_back_sprite.node.getContentSize().width / 4 + this.pai_back_sprite.node.getContentSize().height / 2 + 2;
          y = 0 == m ? player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend + this.pai_back_sprite.node.getContentSize().width / 2 + 2 : player_com.chips_label.getPositionY() + this.pai_back_sprite.node.getContentSize().width / 2 + extend - this.pai_back_sprite.node.getContentSize().width / 2 - 2;
        }
        cc.log("calc x:" + x + " y:" + y);
        return cc.p(x, y);
      },
      actionWinnerGetBet: function actionWinnerGetBet(location_from, location_end, flag) {
        if (true == flag) {
          var player_from = null;
          var player_end = null;
          for (var i = 0; i < g_players.length; i++) {
            var player = g_players[i];
            var player_com = player.getComponent("tdk_player");
            player_com.position_server == location_from ? player_from = player : player_com.position_server == location_end && (player_end = player);
          }
          var chip = cc.instantiate(g_assets["chip"]);
          this.node.addChild(chip);
          this.betPhotoArray.push(chip);
          chip.setPosition(player_from.getPosition());
          var moveBet = cc.moveTo(.5, player_end.getPosition());
          chip.runAction(cc.sequence(moveBet, cc.hide()));
        }
        var callback = cc.callFunc(this.ready_next_turn, this);
        this.node.runAction(cc.sequence(cc.delayTime(1), callback));
      },
      ready_next_turn: function ready_next_turn() {
        if (0 == this.cur_turn) for (var i = 0; i < this.myselfCards.length; i++) {
          var item = this.myselfCards[i];
          for (var j = 0; j < item.length; j++) {
            var card = cc.instantiate(g_assets["pj_card"]);
            var card_com = card.getComponent("pj_card");
            card_com.initCardSprite(item[j]);
            card_com.sprite.runAction(cc.show());
            card_com.sprite_back.node.runAction(cc.hide());
            this.left_card_layout.addChild(card);
            this.left_cards.push(card);
          }
        }
        for (var i = 0; i < this.players.length; i++) {
          var player_com = this.players[i].getComponent("tdk_player");
          player_com.remove_cards();
          player_com.remove_select_cards();
        }
        if (g_myselfPlayerPos == this.zhuang_serverPosition) if (1 == this.qieguo) {
          this.qieguo_button.active = true;
          this.buqie_button.active = true;
          this.qieguo_button.getComponent("cc.Button").interactable = true;
          this.buqie_button.getComponent("cc.Button").interactable = true;
        } else if (2 == this.qieguo) {
          this.qieguo_button.active = true;
          this.buqie_button.active = true;
          this.qieguo_button.getComponent("cc.Button").interactable = true;
          this.buqie_button.getComponent("cc.Button").interactable = false;
        }
        if (g_myselfPlayerPos != this.zhuang_serverPosition && 0 == this.qieguo) {
          for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var player_com = player.getComponent("tdk_player");
            if (player_com.position_server == g_myselfPlayerPos) {
              player_com.set_chips(1, 0);
              player_com.set_chips(2, 0);
            }
          }
          this.get_one_button("xiazhu", true);
        }
      },
      set_cards_w: function set_cards_w(player, cards) {
        cc.log("set_cards_w:" + cards.length);
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var pos = this.calc_wpeipai_position(player, i);
          var acMoveTo = cc.moveTo(.45, pos);
          var acrotateBy = cc.rotateBy(.45, 90, 90);
          var action_spawn = cc.spawn(acMoveTo, acrotateBy);
          card.runAction(action_spawn);
        }
      },
      set_cards_h: function set_cards_h(player, cards) {
        cc.log("set_cards_h:" + cards.length);
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var pos = this.calc_hpeipai_position(player, i);
          var acMoveTo = cc.moveTo(.45, pos);
          card.runAction(acMoveTo);
        }
      },
      getzhuang_callback: function getzhuang_callback() {
        cc.log("getzhuang_callback");
        this.suiji_qiangzhuang.active = false;
        var mens = [ "zhuang", "chumen", "tianmen", "momen" ];
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == this.zhuang_serverPosition) {
            player_com.setSpriteStatus(mens[0]);
            player_com.resetMoneyLabel(this.sumBet);
            player_com.install_chip_label(true);
            var pos = this.calc_player_chip_position(player);
            player_com.chips_label.setPosition(pos);
          } else {
            var men_idx = 0;
            cc.log("position_server:" + player_com.position_server + " zhuang_serverPosition:" + this.zhuang_serverPosition);
            player_com.position_server > this.zhuang_serverPosition ? men_idx = player_com.position_server - this.zhuang_serverPosition : player_com.position_server < this.zhuang_serverPosition && (men_idx = player_com.position_server - this.zhuang_serverPosition + 4);
            player_com.setSpriteStatus(mens[men_idx]);
            player_com.install_chip_label(false);
            var pos = this.calc_player_chip_position(player);
            player_com.chips_label.setPosition(pos);
          }
        }
        if (g_myselfPlayerPos != this.zhuang_serverPosition) {
          for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            var player_com = player.getComponent("tdk_player");
            if (player_com.position_server == g_myselfPlayerPos) {
              player_com.set_chips(1, 0);
              player_com.set_chips(2, 0);
            }
          }
          this.get_one_button("xiazhu", true);
        } else {
          this.zhunbei_button.getComponent(cc.Button).interactable = false;
          this.zhunbei_button.active = false;
        }
      },
      silder_callback: function silder_callback(pthis, idx, silder_progress) {
        cc.log("pj_game_scene silder1:" + silder_progress);
        for (var i = 0; i < g_players.length; i++) {
          var player = g_players[i];
          var player_com = player.getComponent("tdk_player");
          if (player_com.position_server == g_myselfPlayerPos) {
            player_com.set_chips(idx, silder_progress);
            break;
          }
        }
        pthis.get_one_button("queding", true);
      },
      pomelo_removeListener: function pomelo_removeListener() {
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
      onExit: function onExit() {
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
  player_select: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6cd10KaJURMSYNzEA/Ev8Cf", "player_select");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        index: 0,
        type: 0,
        data: null,
        flag: false
      },
      onLoad: function onLoad() {
        var self = this;
        this.node.on("touchstart", function(event) {
          self.node.dispatchEvent(new cc.Event.EventCustom("pressed", true));
        }, this);
      },
      init: function init(index, type) {
        this.index = index;
        this.type = type;
      },
      set_data: function set_data(data) {
        this.data = data;
      },
      get_data: function get_data() {
        return this.data;
      },
      set_flag: function set_flag(flag) {
        this.flag = flag;
      },
      get_flag: function get_flag() {
        return this.flag;
      }
    });
    cc._RF.pop();
  }, {} ],
  "pomelo-client": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f46b8iXN9NIP6/33SIBNQ7O", "pomelo-client");
    "use strict";
    (function() {
      var JS_WS_CLIENT_TYPE = "js-websocket";
      var JS_WS_CLIENT_VERSION = "0.0.1";
      var Protocol = require("protocol");
      var Package = Protocol.Package;
      var Message = Protocol.Message;
      var EventEmitter = window.EventEmitter;
      "undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
      var RES_OK = 200;
      var RES_FAIL = 500;
      var RES_OLD_CLIENT = 501;
      "function" !== typeof Object.create && (Object.create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
      });
      var root = window;
      var pomelo = Object.create(EventEmitter.prototype);
      root.pomelo = pomelo;
      var socket = null;
      var reqId = 0;
      var callbacks = {};
      var handlers = {};
      var routeMap = {};
      var heartbeatInterval = 0;
      var heartbeatTimeout = 0;
      var nextHeartbeatTimeout = 0;
      var gapThreshold = 100;
      var heartbeatId = null;
      var heartbeatTimeoutId = null;
      var handshakeCallback = null;
      var decode = null;
      var encode = null;
      var useCrypto;
      var handshakeBuffer = {
        sys: {
          type: JS_WS_CLIENT_TYPE,
          version: JS_WS_CLIENT_VERSION
        },
        user: {}
      };
      var initCallback = null;
      pomelo.init = function(params, cb) {
        initCallback = cb;
        var host = params.host;
        var port = params.port;
        var url = "ws://" + host;
        port && (url += ":" + port);
        console.log("pomelo init:" + url);
        handshakeBuffer.user = params.user;
        handshakeCallback = params.handshakeCallback;
        initWebSocket(url, cb);
      };
      var initWebSocket = function initWebSocket(url, cb) {
        var onopen = function onopen(event) {
          var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(handshakeBuffer)));
          send(obj);
        };
        var onmessage = function onmessage(event) {
          console.log("pomelo onmessage........");
          processPackage(Package.decode(event.data), cb);
          heartbeatTimeout && (nextHeartbeatTimeout = Date.now() + heartbeatTimeout);
        };
        var onerror = function onerror(event) {
          pomelo.emit("io-error", event);
          console.log("socket error: ", event);
        };
        var onclose = function onclose(event) {
          pomelo.emit("close", event);
          pomelo.emit("disconnect", event);
          console.log("socket close: ", event);
        };
        socket = new WebSocket(url);
        socket.binaryType = "arraybuffer";
        socket.onopen = onopen;
        socket.onmessage = onmessage;
        socket.onerror = onerror;
        socket.onclose = onclose;
        console.log("pomelo init finish");
      };
      pomelo.disconnect = function() {
        if (socket) {
          socket.disconnect && socket.disconnect();
          socket.close && socket.close();
          console.log("disconnect");
          socket = null;
        }
        if (heartbeatId) {
          clearTimeout(heartbeatId);
          heartbeatId = null;
        }
        if (heartbeatTimeoutId) {
          clearTimeout(heartbeatTimeoutId);
          heartbeatTimeoutId = null;
        }
      };
      pomelo.request = function(route, msg, cb) {
        if (2 === arguments.length && "function" === typeof msg) {
          cb = msg;
          msg = {};
        } else msg = msg || {};
        route = route || msg.route;
        if (!route) return;
        reqId++;
        sendMessage(reqId, route, msg);
        callbacks[reqId] = cb;
        routeMap[reqId] = route;
      };
      pomelo.notify = function(route, msg) {
        msg = msg || {};
        sendMessage(0, route, msg);
      };
      var sendMessage = function sendMessage(reqId, route, msg) {
        var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
        var protos = !pomelo.data.protos ? {} : pomelo.data.protos.client;
        msg = protos[route] ? protobuf.encode(route, msg) : Protocol.strencode(JSON.stringify(msg));
        var compressRoute = 0;
        if (pomelo.dict && pomelo.dict[route]) {
          route = pomelo.dict[route];
          compressRoute = 1;
        }
        msg = Message.encode(reqId, type, compressRoute, route, msg);
        var packet = Package.encode(Package.TYPE_DATA, msg);
        send(packet);
      };
      var send = function send(packet) {
        socket.send(packet.buffer);
      };
      var handler = {};
      var heartbeat = function heartbeat(data) {
        if (!heartbeatInterval) return;
        var obj = Package.encode(Package.TYPE_HEARTBEAT);
        if (heartbeatTimeoutId) {
          clearTimeout(heartbeatTimeoutId);
          heartbeatTimeoutId = null;
        }
        if (heartbeatId) return;
        heartbeatId = setTimeout(function() {
          heartbeatId = null;
          send(obj);
          nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
          heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, heartbeatTimeout);
        }, heartbeatInterval);
      };
      var heartbeatTimeoutCb = function heartbeatTimeoutCb() {
        var gap = nextHeartbeatTimeout - Date.now();
        if (gap > gapThreshold) heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, gap); else {
          cc.error("server heartbeat timeout");
          pomelo.emit("heartbeat timeout");
          pomelo.disconnect();
        }
      };
      var handshake = function handshake(data) {
        data = JSON.parse(Protocol.strdecode(data));
        if (data.code === RES_OLD_CLIENT) {
          pomelo.emit("error", "client version not fullfill");
          return;
        }
        if (data.code !== RES_OK) {
          pomelo.emit("error", "handshake fail");
          return;
        }
        handshakeInit(data);
        var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
        send(obj);
        if (initCallback) {
          initCallback(socket);
          initCallback = null;
        }
      };
      var onData = function onData(data) {
        var msg = Message.decode(data);
        if (msg.id > 0) {
          msg.route = routeMap[msg.id];
          delete routeMap[msg.id];
          if (!msg.route) return;
        }
        msg.body = deCompose(msg);
        processMessage(pomelo, msg);
      };
      var onKick = function onKick(data) {
        data = JSON.parse(Protocol.strdecode(data));
        pomelo.emit("onKick", data);
      };
      handlers[Package.TYPE_HANDSHAKE] = handshake;
      handlers[Package.TYPE_HEARTBEAT] = heartbeat;
      handlers[Package.TYPE_DATA] = onData;
      handlers[Package.TYPE_KICK] = onKick;
      var processPackage = function processPackage(msgs) {
        if (Array.isArray(msgs)) for (var i = 0; i < msgs.length; i++) {
          var msg = msgs[i];
          handlers[msg.type](msg.body);
        } else handlers[msgs.type](msgs.body);
      };
      var processMessage = function processMessage(pomelo, msg) {
        msg.id || pomelo.emit(msg.route, msg.body);
        var cb = callbacks[msg.id];
        delete callbacks[msg.id];
        if ("function" !== typeof cb) return;
        cb(msg.body);
        return;
      };
      var processMessageBatch = function processMessageBatch(pomelo, msgs) {
        for (var i = 0, l = msgs.length; i < l; i++) processMessage(pomelo, msgs[i]);
      };
      var deCompose = function deCompose(msg) {
        var protos = !pomelo.data.protos ? {} : pomelo.data.protos.server;
        var abbrs = pomelo.data.abbrs;
        var route = msg.route;
        if (msg.compressRoute) {
          if (!abbrs[route]) return {};
          route = msg.route = abbrs[route];
        }
        return protos[route] ? protobuf.decode(route, msg.body) : JSON.parse(Protocol.strdecode(msg.body));
      };
      var handshakeInit = function handshakeInit(data) {
        if (data.sys && data.sys.heartbeat) {
          heartbeatInterval = 1e3 * data.sys.heartbeat;
          heartbeatTimeout = 2 * heartbeatInterval;
        } else {
          heartbeatInterval = 0;
          heartbeatTimeout = 0;
        }
        initData(data);
        "function" === typeof handshakeCallback && handshakeCallback(data.user);
      };
      var initData = function initData(data) {
        if (!data || !data.sys) return;
        pomelo.data = pomelo.data || {};
        var dict = data.sys.dict;
        var protos = data.sys.protos;
        if (dict) {
          pomelo.data.dict = dict;
          pomelo.data.abbrs = {};
          for (var route in dict) pomelo.data.abbrs[dict[route]] = route;
        }
        if (protos) {
          pomelo.data.protos = {
            server: protos.server || {},
            client: protos.client || {}
          };
          !protobuf || protobuf.init({
            encoderProtos: protos.client,
            decoderProtos: protos.server
          });
        }
      };
      module.exports = pomelo;
    })();
    cc._RF.pop();
  }, {
    protocol: "protocol"
  } ],
  pop_enter_game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b971by1BnxEaJGLtRZN/ATB", "pop_enter_game");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("start go into create game js");
        var self = this;
        self.room_num = new Array();
        self.node.on("pressed", self.switchRadio, self);
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, this.node);
      },
      switchRadio: function switchRadio(event) {
        var index = event.target.getComponent("one_choice").index;
        var type = event.target.getComponent("one_choice").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        if (2 == type) {
          if (1 == index) {
            if (this.myindex >= 0) {
              this.shuru_kuangs[this.myindex].getChildByName("num_label").active = false;
              this.room_num.splice(this.myindex, 1);
              this.myindex = this.myindex - 1;
            }
          } else if (2 == index) {
            for (var i = 0; i < this.shuru_kuangs.length; i++) this.shuru_kuangs[i].getChildByName("num_label").active = false;
            this.room_num.splice(0, this.room_num.length);
            this.myindex = -1;
          }
        } else if (1 == type) if (this.myindex < 5) {
          this.myindex = this.myindex + 1;
          var label = this.shuru_kuangs[this.myindex].getChildByName("num_label");
          var label_com = label.getComponent(cc.Label);
          label_com.string = index;
          label.active = true;
          this.room_num.push(index);
          5 == this.myindex && this.enter_game();
        } else this.enter_game();
        cc.log("room_num:" + JSON.stringify(this.room_num));
      },
      enter_game: function enter_game() {
        this.myindex = -1;
        var roomNum = this.room_num.join("");
        for (var i = 0; i < this.shuru_kuangs.length; i++) this.shuru_kuangs[i].getChildByName("num_label").active = false;
        this.room_num.splice(0, this.room_num.length);
        var param = {
          player_id: g_user.id,
          room_num: roomNum,
          rid: null
        };
        enter_wait_room(param, this);
      },
      close_scene: function close_scene() {
        this.node.active = false;
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_game_action: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dfb59ONzBZFg59ZmmgPe0+v", "pop_game_action");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        is_start: false,
        shoe_active: cc.Node,
        egg_active: cc.Node,
        bomb_active: cc.Node,
        kiss_active: cc.Node,
        flower_active: cc.Node,
        cheers_active: cc.Node,
        show_type: 0,
        is_finish: false,
        anim: null,
        animStatus: null,
        audio: null,
        audioStatus: null
      },
      onLoad: function onLoad() {
        cc.log("load gift active class");
        this.shoe_active.active = false;
        this.egg_active.active = false;
        this.bomb_active.active = false;
        this.kiss_active.active = false;
        this.flower_active.active = false;
        this.cheers_active.active = false;
        this.show_egg();
      },
      onFinished: function onFinished() {
        cc.log("shoe active finish", this.isValid);
        1 == this.show_type ? this.shoe_active.active = false : 2 == this.show_type ? this.egg_active.active = false : 3 == this.show_type ? this.bomb_active.active = false : 4 == this.show_type ? this.kiss_active.active = false : 5 == this.show_type ? this.flower_active.active = false : 6 == this.show_type && (this.cheers_active.active = false);
        this.is_finish = true;
        this.is_start = false;
        this.node.parent = null;
        this.node.destroy();
      },
      show_shoe: function show_shoe() {
        this.shoe_active.active = true;
        var action = this.shoe_active.getComponent("bomb_action");
        action.play("shoe_active");
      },
      show_egg: function show_egg() {
        this.egg_active.active = true;
        var action = this.egg_active.getComponent("bomb_action");
        action.play("egg_active");
      },
      show_bomb: function show_bomb() {
        this.bomb_active.active = true;
        var action = this.bomb_active.getComponent("bomb_action");
        action.play("bomb_active");
      },
      show_kiss: function show_kiss() {
        this.show_type = 4;
        this.kiss_active.active = true;
        this.anim = this.kiss_active.getComponent(cc.Animation);
        this.anim.on("finished", this.onFinished, this);
        this.animStatus = this.anim.play("kiss_active");
        this.is_start = true;
        this.animStatus.wrapMode = cc.WrapMode.Normal;
        this.animStatus.wrapMode = cc.WrapMode.Loop;
        this.animStatus.repeatCount = 1;
      },
      show_flower: function show_flower() {
        this.show_type = 5;
        this.flower_active.active = true;
        this.anim = this.flower_active.getComponent(cc.Animation);
        this.anim.on("finished", this.onFinished, this);
        this.animStatus = this.anim.play("flower_active");
        this.is_start = true;
        this.animStatus.wrapMode = cc.WrapMode.Normal;
        this.animStatus.wrapMode = cc.WrapMode.Loop;
        this.animStatus.repeatCount = 1;
      },
      show_cheers: function show_cheers() {
        this.show_type = 6;
        this.cheers_active.active = true;
        this.anim = this.cheers_active.getComponent(cc.Animation);
        this.anim.on("finished", this.onFinished, this);
        this.animStatus = this.anim.play("cheers_active");
        this.is_start = true;
        this.animStatus.wrapMode = cc.WrapMode.Normal;
        this.animStatus.wrapMode = cc.WrapMode.Loop;
        this.animStatus.repeatCount = 1;
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_game_finish: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "916d1/c0zhKrLwMP79sEhb1", "pop_game_finish");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        game_sprite: cc.Node,
        items: {
          type: cc.Node,
          default: []
        }
      },
      onLoad: function onLoad() {
        cc.log("start go into pop game finish js");
        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.active = false;
        }
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, this.node);
      },
      init_info: function init_info(players, cb) {
        this.cb = cb;
        cc.log("pop game finish:" + JSON.stringify(players));
        for (var i = 0; i < players.length; i++) {
          var player = players[i];
          var item = this.items[i];
          this.set_item_info(item, player);
          item.active = true;
        }
      },
      set_item_info: function set_item_info(item, player_com) {
        var user_layout = item.getChildByName("user_layout");
        var user_sprite = user_layout.getChildByName("user_sprite").getComponent("cc.Sprite");
        var user_label = user_layout.getChildByName("user_label").getComponent("cc.Label");
        var slabel = item.getChildByName("slabel").getComponent("cc.Label");
        var elabel = item.getChildByName("elabel").getComponent("cc.Label");
        var dlabel = item.getChildByName("dlabel").getComponent("cc.Label");
        user_label.string = player_com[0];
        null != player_com[1] && cc.loader.load({
          url: player_com[1],
          type: "png"
        }, function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          user_sprite.spriteFrame = frame;
        });
        slabel.string = player_com[2];
        elabel.string = player_com[3];
        dlabel.string = player_com[3] - player_com[2];
      },
      callback_tuichu: function callback_tuichu() {
        var self = this;
        var param = {
          rid: g_room_data["rid"],
          player_id: g_user["id"],
          location: null
        };
        pomelo.request(util.getLeaveRoomRoute(), param, function(data) {
          cc.log(JSON.stringify(data));
          self.node.active = false;
          self.cb();
          cc.director.loadScene("MainScene");
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_game_user_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28973LNYvZCvo0j8HuItTFl", "pop_game_user_info");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("start go into pop game player js");
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, self.bg_sprite);
      },
      init_info: function init_info(data, call_back) {
        var self = this;
        this.vnickname_lable.string = data["player"].nick_name;
        this.vfangka_label.string = data["player"].fangka_num;
        1 == data["player"].gender ? this.vsex_label.string = "男" : this.vsex_label.string = "女";
        null != data["player"].head_img_url && cc.loader.load({
          url: data["player"].head_img_url,
          type: "png"
        }, function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          self.touxiang.spriteFrame = frame;
        });
        this.node.active = true;
        this.call_back = call_back;
        this.location = data["location"];
        this.send_from = data["send_from"];
      },
      hide: function hide() {
        this.node.active = false;
      },
      button_call: function button_call(event, type) {
        cc.log("button call", type);
        this.node.active = false;
        this.node.destroy();
        this.call_back(type, this.send_from, this.location);
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_game_user: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "77e12SZ3t9C0LJP2smCdIy0", "pop_game_user");
    "use strict";
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
      onLoad: function onLoad() {
        cc.log("start go into pop game player js");
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, self.bg_sprite);
      },
      init_info: function init_info(data, call_back) {
        this.vnickname_lable.string = data["player"].nickName;
        this.vacount_label.string = "1234567890";
        this.vlevel_label.string = "0";
        this.vfangka_label.string = data["player"].fangka;
        this.vuid_label.string = "12345566";
        1 == data["player"].gender ? this.vsex_label.string = "男" : this.vsex_label.string = "女";
        this.vvip_label.string = data["player"].vip;
        this.vdiamon_label.string = data["player"].diamond;
        this.vsign_label.string = data["player"].signature;
        this.node.active = true;
        this.call_back = call_back;
        this.location = data["location"];
        this.send_from = data["send_from"];
      },
      hide: function hide() {
        this.node.active = false;
      },
      button_call: function button_call(event, type) {
        cc.log("button call", type);
        this.node.active = false;
        this.node.destroy();
        this.call_back(this.node.parent, type, this.send_from, this.location);
      },
      test_t: function test_t() {
        this.vnickname_lable.string = "11111111";
        this.vacount_label.string = "1234567890";
        this.vlevel_label.string = "0";
        this.vfangka_label.string = "1111111";
        this.vuid_label.string = "12345566";
        this.vsex_label.string = "男";
        this.vvip_label.string = 1;
        this.vdiamon_label.string = 1;
        this.vsign_label.string = "111111111";
        this.node.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_gonggao: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e9demksA9MWL7ZV6r+mgaO", "pop_gonggao");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bg_sprite: cc.Node,
        time_node: cc.Label,
        content_node: cc.Node,
        left_time: 4
      },
      onLoad: function onLoad() {
        cc.log("start go into pop game gonggao js");
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, self.bg_sprite);
        this.time_node.string = "(" + this.left_time + "s)";
        this.schedule(this.hidde_time, 1);
        Servers.gongGaoProcess("get_gonggao", {
          type: 1
        }, function(data) {
          cc.log(JSON.stringify(data));
          if (200 == data.code) {
            var rich_text = self.content_node.getComponent(cc.RichText);
            rich_text.string = data.msg;
          }
        });
      },
      hidde_time: function hidde_time() {
        this.left_time = this.left_time - 1;
        this.time_node.string = "(" + this.left_time + "s)";
        if (this.left_time <= 0) {
          this.unschedule(this.hidde_time);
          this.node.active = false;
          this.node.destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_help: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b897R+UB9EupC/kAj6bv1+", "pop_help");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onClose: function onClose() {
        this.node.active = false;
        this.node.destroy();
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  pop_net_error: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "503299Pdn1D/rd8w3uXSpw3", "pop_net_error");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        message: cc.Label,
        error_sprite: cc.Sprite,
        cb: null
      },
      onLoad: function onLoad() {
        this.updateTimer = 0;
        this.updateInterval = .2;
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            cc.rectContainsPoint(rect, local) ? cc.log("ok touch in the region......") : cc.log("touch remove from parent");
          }
        }, this.error_sprite);
      },
      show_error_info: function show_error_info(message, cb) {
        this.message.string = message;
        this.cb = cb;
      },
      update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
          var login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I");
          if (-1 != login_type) {
            this.cb();
            this.node.active = false;
            this.node.destroy();
          }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
          var login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType");
          if (-1 != login_type) {
            this.cb();
            this.node.active = false;
            this.node.destroy();
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  pop_set_scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd66dahiX9BG5Wye2ZRSv9U", "pop_set_scene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        choice_sprite: {
          type: cc.Sprite,
          default: []
        },
        callback: null
      },
      onLoad: function onLoad() {
        cc.log("start go into create game js");
        var self = this;
        this.init_back_info();
        self.node.on("pressed", self.switchRadio, self);
        var bg_sprite = self.node.getChildByName("bg_sprite");
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpaceAR(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, bg_sprite);
      },
      init_back_info: function init_back_info() {
        g_music_key = cc.sys.localStorage.getItem(MUSIC_KEY);
        g_sound_key = cc.sys.localStorage.getItem(SOUND_KEY);
        g_chat_key = cc.sys.localStorage.getItem(CHAT_KEY);
        var values = [ g_music_key, g_sound_key, g_chat_key, 0 ];
        for (var i = 0; i < this.choice_sprite.length; i++) {
          var sprite = this.choice_sprite[i];
          values[i] == BOOL.NO ? sprite.spriteFrame = g_assets["set_close"] : sprite.spriteFrame = g_assets["set_open"];
        }
      },
      set_callback: function set_callback(callback) {
        this.callback = callback;
      },
      buttonCloseCallback: function buttonCloseCallback() {
        console.log("running buttonCloseCallback:function()");
        this.node.active = false;
        this.destroy();
      },
      buttonMusicSettingCallback: function buttonMusicSettingCallback() {
        var sprite = this.choice_sprite[0];
        if (g_music_key == BOOL.NO) {
          g_music_key = BOOL.YES;
          cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.YES);
          sprite.spriteFrame = g_assets["set_open"];
        } else {
          g_music_key = BOOL.NO;
          cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.NO);
          sprite.spriteFrame = g_assets["set_close"];
        }
      },
      buttonSoundSettingCallback: function buttonSoundSettingCallback() {
        var sprite = this.choice_sprite[1];
        if (g_sound_key == BOOL.NO) {
          g_sound_key = BOOL.YES;
          cc.sys.localStorage.setItem(SOUND_KEY, BOOL.YES);
          sprite.spriteFrame = g_assets["set_open"];
        } else {
          g_sound_key = BOOL.NO;
          cc.sys.localStorage.setItem(SOUND_KEY, BOOL.NO);
          sprite.spriteFrame = g_assets["set_close"];
        }
      },
      buttonChatSettingCallback: function buttonChatSettingCallback() {
        var sprite = this.choice_sprite[2];
        if (g_chat_key == BOOL.NO) {
          g_chat_key = BOOL.YES;
          cc.sys.localStorage.setItem(CHAT_KEY, BOOL.YES);
          sprite.spriteFrame = g_assets["set_open"];
        } else {
          g_chat_key = BOOL.NO;
          cc.sys.localStorage.setItem(CHAT_KEY, BOOL.NO);
          sprite.spriteFrame = g_assets["set_close"];
        }
      },
      buttonShockSettingCallback: function buttonShockSettingCallback() {},
      switchRadio: function switchRadio(event) {
        event.stopPropagation();
        var index = event.target.getComponent("one_choice").index;
        var type = event.target.getComponent("one_choice").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        0 == index ? this.buttonMusicSettingCallback() : 1 == index ? this.buttonSoundSettingCallback() : 2 == index ? this.buttonChatSettingCallback() : 3 == index && this.buttonShockSettingCallback();
        this.callback(index);
      }
    });
    cc._RF.pop();
  }, {} ],
  prop_error_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "71d84sx7uBPEYQV97jT63Ze", "prop_error_info");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        message: cc.Label,
        error_sprite: cc.Sprite
      },
      onLoad: function onLoad() {
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, this.error_sprite);
      },
      show_error_info: function show_error_info(message) {
        this.message.string = message;
        this.node.runAction(cc.fadeOut(3));
      }
    });
    cc._RF.pop();
  }, {} ],
  prop_isok_info: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08bd6H2aJ9NN4tpZX08yodu", "prop_isok_info");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        message: cc.Label,
        callback: null,
        flag: false
      },
      onLoad: function onLoad() {
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {}
        }, this.node);
      },
      show_error_info: function show_error_info(message) {
        this.message.string = message;
        var call_back_function = cc.callFunc(this.button_no, this);
        this.node.runAction(cc.sequence(cc.fadeOut(20), call_back_function));
      },
      init: function init(cb) {
        this.callback = cb;
      },
      button_ok: function button_ok() {
        this.flag = true;
        this.callback(this.flag);
        this.node.destroy();
      },
      button_no: function button_no() {
        this.flag = false;
        this.callback(this.flag);
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  protobuf: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27d1cdsWbJCp6+gJ11UoKmu", "protobuf");
    "use strict";
    (function(exports, global) {
      var Protobuf = exports;
      Protobuf.init = function(opts) {
        Protobuf.encoder.init(opts.encoderProtos);
        Protobuf.decoder.init(opts.decoderProtos);
      };
      Protobuf.encode = function(key, msg) {
        return Protobuf.encoder.encode(key, msg);
      };
      Protobuf.decode = function(key, msg) {
        return Protobuf.decoder.decode(key, msg);
      };
      module.exports = Protobuf;
      "undefined" != typeof window && (window.protobuf = Protobuf);
    })("undefined" == typeof window ? module.exports : {}, void 0);
    (function(exports, global) {
      var constants = exports.constants = {};
      constants.TYPES = {
        uInt32: 0,
        sInt32: 0,
        int32: 0,
        double: 1,
        string: 2,
        message: 2,
        float: 5
      };
    })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
    (function(exports, global) {
      var Util = exports.util = {};
      Util.isSimpleType = function(type) {
        return "uInt32" === type || "sInt32" === type || "int32" === type || "uInt64" === type || "sInt64" === type || "float" === type || "double" === type;
      };
    })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
    (function(exports, global) {
      var Codec = exports.codec = {};
      var buffer = new ArrayBuffer(8);
      var float32Array = new Float32Array(buffer);
      var float64Array = new Float64Array(buffer);
      var uInt8Array = new Uint8Array(buffer);
      Codec.encodeUInt32 = function(n) {
        var n = parseInt(n);
        if (isNaN(n) || n < 0) return null;
        var result = [];
        do {
          var tmp = n % 128;
          var next = Math.floor(n / 128);
          0 !== next && (tmp += 128);
          result.push(tmp);
          n = next;
        } while (0 !== n);
        return result;
      };
      Codec.encodeSInt32 = function(n) {
        var n = parseInt(n);
        if (isNaN(n)) return null;
        n = n < 0 ? 2 * Math.abs(n) - 1 : 2 * n;
        return Codec.encodeUInt32(n);
      };
      Codec.decodeUInt32 = function(bytes) {
        var n = 0;
        for (var i = 0; i < bytes.length; i++) {
          var m = parseInt(bytes[i]);
          n += (127 & m) * Math.pow(2, 7 * i);
          if (m < 128) return n;
        }
        return n;
      };
      Codec.decodeSInt32 = function(bytes) {
        var n = this.decodeUInt32(bytes);
        var flag = n % 2 === 1 ? -1 : 1;
        n = (n % 2 + n) / 2 * flag;
        return n;
      };
      Codec.encodeFloat = function(float) {
        float32Array[0] = float;
        return uInt8Array;
      };
      Codec.decodeFloat = function(bytes, offset) {
        if (!bytes || bytes.length < offset + 4) return null;
        for (var i = 0; i < 4; i++) uInt8Array[i] = bytes[offset + i];
        return float32Array[0];
      };
      Codec.encodeDouble = function(double) {
        float64Array[0] = double;
        return uInt8Array.subarray(0, 8);
      };
      Codec.decodeDouble = function(bytes, offset) {
        if (!bytes || bytes.length < 8 + offset) return null;
        for (var i = 0; i < 8; i++) uInt8Array[i] = bytes[offset + i];
        return float64Array[0];
      };
      Codec.encodeStr = function(bytes, offset, str) {
        for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          var codes = encode2UTF8(code);
          for (var j = 0; j < codes.length; j++) {
            bytes[offset] = codes[j];
            offset++;
          }
        }
        return offset;
      };
      Codec.decodeStr = function(bytes, offset, length) {
        var array = [];
        var end = offset + length;
        while (offset < end) {
          var code = 0;
          if (bytes[offset] < 128) {
            code = bytes[offset];
            offset += 1;
          } else if (bytes[offset] < 224) {
            code = ((63 & bytes[offset]) << 6) + (63 & bytes[offset + 1]);
            offset += 2;
          } else {
            code = ((15 & bytes[offset]) << 12) + ((63 & bytes[offset + 1]) << 6) + (63 & bytes[offset + 2]);
            offset += 3;
          }
          array.push(code);
        }
        var str = "";
        for (var i = 0; i < array.length; ) {
          str += String.fromCharCode.apply(null, array.slice(i, i + 1e4));
          i += 1e4;
        }
        return str;
      };
      Codec.byteLength = function(str) {
        if ("string" !== typeof str) return -1;
        var length = 0;
        for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          length += codeLength(code);
        }
        return length;
      };
      function encode2UTF8(charCode) {
        return charCode <= 127 ? [ charCode ] : charCode <= 2047 ? [ 192 | charCode >> 6, 128 | 63 & charCode ] : [ 224 | charCode >> 12, 128 | (4032 & charCode) >> 6, 128 | 63 & charCode ];
      }
      function codeLength(code) {
        return code <= 127 ? 1 : code <= 2047 ? 2 : 3;
      }
    })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
    (function(exports, global) {
      var protobuf = exports;
      var MsgEncoder = exports.encoder = {};
      var codec = protobuf.codec;
      var constant = protobuf.constants;
      var util = protobuf.util;
      MsgEncoder.init = function(protos) {
        this.protos = protos || {};
      };
      MsgEncoder.encode = function(route, msg) {
        var protos = this.protos[route];
        if (!checkMsg(msg, protos)) return null;
        var length = codec.byteLength(JSON.stringify(msg));
        var buffer = new ArrayBuffer(length);
        var uInt8Array = new Uint8Array(buffer);
        var offset = 0;
        if (!!protos) {
          offset = encodeMsg(uInt8Array, offset, protos, msg);
          if (offset > 0) return uInt8Array.subarray(0, offset);
        }
        return null;
      };
      function checkMsg(msg, protos) {
        if (!protos) return false;
        for (var name in protos) {
          var proto = protos[name];
          switch (proto.option) {
           case "required":
            if ("undefined" === typeof msg[name]) return false;

           case "optional":
            "undefined" !== typeof msg[name] && (!protos.__messages[proto.type] || checkMsg(msg[name], protos.__messages[proto.type]));
            break;

           case "repeated":
            if (!!msg[name] && !!protos.__messages[proto.type]) for (var i = 0; i < msg[name].length; i++) if (!checkMsg(msg[name][i], protos.__messages[proto.type])) return false;
          }
        }
        return true;
      }
      function encodeMsg(buffer, offset, protos, msg) {
        for (var name in msg) if (!!protos[name]) {
          var proto = protos[name];
          switch (proto.option) {
           case "required":
           case "optional":
            offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
            offset = encodeProp(msg[name], proto.type, offset, buffer, protos);
            break;

           case "repeated":
            msg[name].length > 0 && (offset = encodeArray(msg[name], proto, offset, buffer, protos));
          }
        }
        return offset;
      }
      function encodeProp(value, type, offset, buffer, protos) {
        switch (type) {
         case "uInt32":
          offset = writeBytes(buffer, offset, codec.encodeUInt32(value));
          break;

         case "int32":
         case "sInt32":
          offset = writeBytes(buffer, offset, codec.encodeSInt32(value));
          break;

         case "float":
          writeBytes(buffer, offset, codec.encodeFloat(value));
          offset += 4;
          break;

         case "double":
          writeBytes(buffer, offset, codec.encodeDouble(value));
          offset += 8;
          break;

         case "string":
          var length = codec.byteLength(value);
          offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
          codec.encodeStr(buffer, offset, value);
          offset += length;
          break;

         default:
          if (!!protos.__messages[type]) {
            var tmpBuffer = new ArrayBuffer(codec.byteLength(JSON.stringify(value)));
            var length = 0;
            length = encodeMsg(tmpBuffer, length, protos.__messages[type], value);
            offset = writeBytes(buffer, offset, codec.encodeUInt32(length));
            for (var i = 0; i < length; i++) {
              buffer[offset] = tmpBuffer[i];
              offset++;
            }
          }
        }
        return offset;
      }
      function encodeArray(array, proto, offset, buffer, protos) {
        var i = 0;
        if (util.isSimpleType(proto.type)) {
          offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
          offset = writeBytes(buffer, offset, codec.encodeUInt32(array.length));
          for (i = 0; i < array.length; i++) offset = encodeProp(array[i], proto.type, offset, buffer);
        } else for (i = 0; i < array.length; i++) {
          offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
          offset = encodeProp(array[i], proto.type, offset, buffer, protos);
        }
        return offset;
      }
      function writeBytes(buffer, offset, bytes) {
        for (var i = 0; i < bytes.length; i++, offset++) buffer[offset] = bytes[i];
        return offset;
      }
      function encodeTag(type, tag) {
        var value = constant.TYPES[type] || 2;
        return codec.encodeUInt32(tag << 3 | value);
      }
    })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
    (function(exports, global) {
      var protobuf = exports;
      var MsgDecoder = exports.decoder = {};
      var codec = protobuf.codec;
      var util = protobuf.util;
      var buffer;
      var offset = 0;
      MsgDecoder.init = function(protos) {
        this.protos = protos || {};
      };
      MsgDecoder.setProtos = function(protos) {
        !protos || (this.protos = protos);
      };
      MsgDecoder.decode = function(route, buf) {
        var protos = this.protos[route];
        buffer = buf;
        offset = 0;
        if (!!protos) return decodeMsg({}, protos, buffer.length);
        return null;
      };
      function decodeMsg(msg, protos, length) {
        while (offset < length) {
          var head = getHead();
          var type = head.type;
          var tag = head.tag;
          var name = protos.__tags[tag];
          switch (protos[name].option) {
           case "optional":
           case "required":
            msg[name] = decodeProp(protos[name].type, protos);
            break;

           case "repeated":
            msg[name] || (msg[name] = []);
            decodeArray(msg[name], protos[name].type, protos);
          }
        }
        return msg;
      }
      function isFinish(msg, protos) {
        return !protos.__tags[peekHead().tag];
      }
      function getHead() {
        var tag = codec.decodeUInt32(getBytes());
        return {
          type: 7 & tag,
          tag: tag >> 3
        };
      }
      function peekHead() {
        var tag = codec.decodeUInt32(peekBytes());
        return {
          type: 7 & tag,
          tag: tag >> 3
        };
      }
      function decodeProp(type, protos) {
        switch (type) {
         case "uInt32":
          return codec.decodeUInt32(getBytes());

         case "int32":
         case "sInt32":
          return codec.decodeSInt32(getBytes());

         case "float":
          var float = codec.decodeFloat(buffer, offset);
          offset += 4;
          return float;

         case "double":
          var double = codec.decodeDouble(buffer, offset);
          offset += 8;
          return double;

         case "string":
          var length = codec.decodeUInt32(getBytes());
          var str = codec.decodeStr(buffer, offset, length);
          offset += length;
          return str;

         default:
          if (!!protos && !!protos.__messages[type]) {
            var length = codec.decodeUInt32(getBytes());
            var msg = {};
            decodeMsg(msg, protos.__messages[type], offset + length);
            return msg;
          }
        }
      }
      function decodeArray(array, type, protos) {
        if (util.isSimpleType(type)) {
          var length = codec.decodeUInt32(getBytes());
          for (var i = 0; i < length; i++) array.push(decodeProp(type));
        } else array.push(decodeProp(type, protos));
      }
      function getBytes(flag) {
        var bytes = [];
        var pos = offset;
        flag = flag || false;
        var b;
        do {
          b = buffer[pos];
          bytes.push(b);
          pos++;
        } while (b >= 128);
        flag || (offset = pos);
        return bytes;
      }
      function peekBytes() {
        return getBytes(true);
      }
    })("undefined" !== typeof protobuf ? protobuf : module.exports, void 0);
    cc._RF.pop();
  }, {} ],
  protocol: [ function(require, module, exports) {
    (function(Buffer) {
      "use strict";
      cc._RF.push(module, "33a92JJsX1FX7opbirwgfli", "protocol");
      "use strict";
      (function(exports, ByteArray, global) {
        var Protocol = exports;
        var PKG_HEAD_BYTES = 4;
        var MSG_FLAG_BYTES = 1;
        var MSG_ROUTE_CODE_BYTES = 2;
        var MSG_ID_MAX_BYTES = 5;
        var MSG_ROUTE_LEN_BYTES = 1;
        var MSG_ROUTE_CODE_MAX = 65535;
        var MSG_COMPRESS_ROUTE_MASK = 1;
        var MSG_TYPE_MASK = 7;
        var Package = Protocol.Package = {};
        var Message = Protocol.Message = {};
        Package.TYPE_HANDSHAKE = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT = 3;
        Package.TYPE_DATA = 4;
        Package.TYPE_KICK = 5;
        Message.TYPE_REQUEST = 0;
        Message.TYPE_NOTIFY = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH = 3;
        Protocol.strencode = function(str) {
          var byteArray = new ByteArray(3 * str.length);
          var offset = 0;
          for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            codes = charCode <= 127 ? [ charCode ] : charCode <= 2047 ? [ 192 | charCode >> 6, 128 | 63 & charCode ] : [ 224 | charCode >> 12, 128 | (4032 & charCode) >> 6, 128 | 63 & charCode ];
            for (var j = 0; j < codes.length; j++) {
              byteArray[offset] = codes[j];
              ++offset;
            }
          }
          var _buffer = new ByteArray(offset);
          copyArray(_buffer, 0, byteArray, 0, offset);
          return _buffer;
        };
        Protocol.strdecode = function(buffer) {
          var bytes = new ByteArray(buffer);
          var array = [];
          var offset = 0;
          var charCode = 0;
          var end = bytes.length;
          while (offset < end) {
            if (bytes[offset] < 128) {
              charCode = bytes[offset];
              offset += 1;
            } else if (bytes[offset] < 224) {
              charCode = ((63 & bytes[offset]) << 6) + (63 & bytes[offset + 1]);
              offset += 2;
            } else {
              charCode = ((15 & bytes[offset]) << 12) + ((63 & bytes[offset + 1]) << 6) + (63 & bytes[offset + 2]);
              offset += 3;
            }
            array.push(charCode);
          }
          return String.fromCharCode.apply(null, array);
        };
        Package.encode = function(type, body) {
          var length = body ? body.length : 0;
          var buffer = new ByteArray(PKG_HEAD_BYTES + length);
          var index = 0;
          buffer[index++] = 255 & type;
          buffer[index++] = length >> 16 & 255;
          buffer[index++] = length >> 8 & 255;
          buffer[index++] = 255 & length;
          body && copyArray(buffer, index, body, 0, length);
          return buffer;
        };
        Package.decode = function(buffer) {
          var offset = 0;
          var bytes = new ByteArray(buffer);
          var length = 0;
          var rs = [];
          while (offset < bytes.length) {
            var type = bytes[offset++];
            length = (bytes[offset++] << 16 | bytes[offset++] << 8 | bytes[offset++]) >>> 0;
            var body = length ? new ByteArray(length) : null;
            copyArray(body, 0, bytes, offset, length);
            offset += length;
            rs.push({
              type: type,
              body: body
            });
          }
          return 1 === rs.length ? rs[0] : rs;
        };
        Message.encode = function(id, type, compressRoute, route, msg) {
          var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
          var msgLen = MSG_FLAG_BYTES + idBytes;
          if (msgHasRoute(type)) if (compressRoute) {
            if ("number" !== typeof route) throw new Error("error flag for number route!");
            msgLen += MSG_ROUTE_CODE_BYTES;
          } else {
            msgLen += MSG_ROUTE_LEN_BYTES;
            if (route) {
              route = Protocol.strencode(route);
              if (route.length > 255) throw new Error("route maxlength is overflow");
              msgLen += route.length;
            }
          }
          msg && (msgLen += msg.length);
          var buffer = new ByteArray(msgLen);
          var offset = 0;
          offset = encodeMsgFlag(type, compressRoute, buffer, offset);
          msgHasId(type) && (offset = encodeMsgId(id, buffer, offset));
          msgHasRoute(type) && (offset = encodeMsgRoute(compressRoute, route, buffer, offset));
          msg && (offset = encodeMsgBody(msg, buffer, offset));
          return buffer;
        };
        Message.decode = function(buffer) {
          var bytes = new ByteArray(buffer);
          var bytesLen = bytes.length || bytes.byteLength;
          var offset = 0;
          var id = 0;
          var route = null;
          var flag = bytes[offset++];
          var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
          var type = flag >> 1 & MSG_TYPE_MASK;
          if (msgHasId(type)) {
            var m = parseInt(bytes[offset]);
            var i = 0;
            do {
              var m = parseInt(bytes[offset]);
              id += (127 & m) * Math.pow(2, 7 * i);
              offset++;
              i++;
            } while (m >= 128);
          }
          if (msgHasRoute(type)) if (compressRoute) route = bytes[offset++] << 8 | bytes[offset++]; else {
            var routeLen = bytes[offset++];
            if (routeLen) {
              route = new ByteArray(routeLen);
              copyArray(route, 0, bytes, offset, routeLen);
              route = Protocol.strdecode(route);
            } else route = "";
            offset += routeLen;
          }
          var bodyLen = bytesLen - offset;
          var body = new ByteArray(bodyLen);
          copyArray(body, 0, bytes, offset, bodyLen);
          return {
            id: id,
            type: type,
            compressRoute: compressRoute,
            route: route,
            body: body
          };
        };
        var copyArray = function copyArray(dest, doffset, src, soffset, length) {
          if ("function" === typeof src.copy) src.copy(dest, doffset, soffset, soffset + length); else for (var index = 0; index < length; index++) dest[doffset++] = src[soffset++];
        };
        var msgHasId = function msgHasId(type) {
          return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
        };
        var msgHasRoute = function msgHasRoute(type) {
          return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY || type === Message.TYPE_PUSH;
        };
        var caculateMsgIdBytes = function caculateMsgIdBytes(id) {
          var len = 0;
          do {
            len += 1;
            id >>= 7;
          } while (id > 0);
          return len;
        };
        var encodeMsgFlag = function encodeMsgFlag(type, compressRoute, buffer, offset) {
          if (type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY && type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) throw new Error("unkonw message type: " + type);
          buffer[offset] = type << 1 | (compressRoute ? 1 : 0);
          return offset + MSG_FLAG_BYTES;
        };
        var encodeMsgId = function encodeMsgId(id, buffer, offset) {
          do {
            var tmp = id % 128;
            var next = Math.floor(id / 128);
            0 !== next && (tmp += 128);
            buffer[offset++] = tmp;
            id = next;
          } while (0 !== id);
          return offset;
        };
        var encodeMsgRoute = function encodeMsgRoute(compressRoute, route, buffer, offset) {
          if (compressRoute) {
            if (route > MSG_ROUTE_CODE_MAX) throw new Error("route number is overflow");
            buffer[offset++] = route >> 8 & 255;
            buffer[offset++] = 255 & route;
          } else if (route) {
            buffer[offset++] = 255 & route.length;
            copyArray(buffer, offset, route, 0, route.length);
            offset += route.length;
          } else buffer[offset++] = 0;
          return offset;
        };
        var encodeMsgBody = function encodeMsgBody(msg, buffer, offset) {
          copyArray(buffer, offset, msg, 0, msg.length);
          return offset + msg.length;
        };
        module.exports = Protocol;
        "undefined" != typeof window && (window.Protocol = Protocol);
      })("undefined" == typeof window ? module.exports : {}, "undefined" == typeof window ? Buffer : Uint8Array, void 0);
      cc._RF.pop();
    }).call(this, require("buffer").Buffer);
  }, {
    buffer: 2
  } ],
  record_item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46030o+yUtK/ZBAGK5EYmIY", "record_item");
    "use strict";
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
      init: function init(id, data, pthis) {
        this.itemID = id;
        this.pthis = pthis;
        this.data = data;
        this.order_id.getComponent("cc.Label").string = data["order_id"];
        this.fangka_num.getComponent("cc.Label").string = data["fangka_num"];
        this.money.getComponent("cc.Label").string = data["zongjia"];
        this.creat_time.getComponent("cc.Label").string = data["creat_time"];
        if (1 == data["status"]) {
          this.sbutton.getComponent("cc.Button").interactable = false;
          this.sbutton.getChildByName("label").getComponent("cc.Label").string = "完成";
        }
        if (0 == data["status"]) {
          this.sbutton.getComponent("cc.Button").interactable = true;
          this.sbutton.getChildByName("label").getComponent("cc.Label").string = "去完成";
        }
      },
      button_callback: function button_callback() {
        this.pthis.node.active = false;
        this.pthis.node.destroy();
        var pop_order = cc.instantiate(g_assets["PopBuyOrderScene"]);
        var pop_order_com = pop_order.getComponent("buy_order");
        pop_order_com.init(this.data);
        pthis.parent.node.addChild(pop_order);
        pop_order.setPosition(pthis.parent.node.convertToNodeSpaceAR(cc.p(size.width / 2, size.height / 2)));
      }
    });
    cc._RF.pop();
  }, {} ],
  root_node: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9fcd7Jev9JMiqFmrBsVBLAf", "root_node");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        data: null
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        pomelo.on("disconnect", function() {
          console.log("掉线了");
          var login_type = -1;
          cc.sys.os == cc.sys.OS_ANDROID ? login_type = jsb.reflection.callStaticMethod("org.cocos2dx.javascript.AppActivity", "getNetType", "()I") : cc.sys.os == cc.sys.OS_IOS && (login_type = jsb.reflection.callStaticMethod("NativeOcClass", "getNetType"));
          console.log("掉线了" + login_type);
          -1 != login_type && Servers.getLogin(g_user["player_id"], g_user["nickname"], g_user["gender"], g_user["headimgurl"], function(data) {
            console.log("get login info succ:" + JSON.stringify(data));
            if (200 != data.code) {
              util.show_error_info(null, null, data.msg);
              return;
            }
            var token = data.token;
            Servers.getEntry(token, function(data) {
              200 != data.code && util.show_error_info(null, null, data.msg);
            });
          });
        });
        pomelo.on("heartbeat timeout", function() {
          console.log("心跳超时");
        });
      },
      setdata: function setdata(json) {
        this.data = json;
      },
      getdata: function getdata() {
        return this.data;
      }
    });
    cc._RF.pop();
  }, {} ],
  select_compare: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1efdlK4kpDhaXtMJGLPm0j", "select_compare");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        my_selects: {
          type: cc.Node,
          default: []
        },
        callback: null
      },
      onLoad: function onLoad() {
        cc.log("start go into select comparejs");
        var self = this;
        self.node.on("pressed", self.switchRadio, self);
        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: function onTouchBegan(touch, event) {
            return true;
          },
          onTouchMoved: function onTouchMoved(touch, event) {},
          onTouchEnded: function onTouchEnded(touch, event) {
            var target = event.getCurrentTarget();
            var local = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, local)) cc.log("ok touch in the region......"); else {
              cc.log("touch remove from parent");
              self.node.active = false;
            }
          }
        }, self.node);
      },
      set_which_select: function set_which_select(which) {
        cc.log(JSON.stringify(which));
        for (var i = 0; i < which.length; i++) {
          var idx = which[i] - 1;
          this.my_selects[idx].active = true;
        }
      },
      set_callback: function set_callback(callback) {
        this.callback = callback;
      },
      switchRadio: function switchRadio(event) {
        var index = event.target.getComponent("bipai_choice").index;
        var type = event.target.getComponent("bipai_choice").type;
        cc.log("switchRadio : index:" + index + " type:" + type);
        this.callback(index);
        this.node.destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  shai_zhong_active: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58e85sjqZxHDJ0WY84Xehq9", "shai_zhong_active");
    "use strict";
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
      onLoad: function onLoad() {},
      init_start: function init_start(callback, num1, num2, position) {
        cc.log("load 筛盅 active class");
        this.callback = callback;
        this.sz_num_1 = num1;
        this.sz_num_2 = num2;
        this.position = position;
        this.shaizi_layout.active = false;
        this.anim = this.shai_zhong.getComponent(cc.Animation);
        this.anim.on("finished", this.onFinished, this);
        this.animStatus = this.anim.play("shai_zhong_active");
        this.animStatus.wrapMode = cc.WrapMode.Normal;
        this.animStatus.wrapMode = cc.WrapMode.Loop;
        this.animStatus.repeatCount = 3;
      },
      onFinished: function onFinished() {
        var self = this;
        cc.log("shoe active finish", this.isValid);
        self.shaizi_layout.active = true;
        self.shaizi_1.spriteFrame = g_assets["shaizi_" + self.sz_num_1];
        self.shaizi_2.spriteFrame = g_assets["shaizi_" + self.sz_num_2];
        self.shai_zhong.runAction(cc.sequence(cc.fadeOut(1), cc.callFunc(function() {
          var moveAc = cc.moveTo(.5, self.position);
          self.shaizi_layout.runAction(cc.sequence(moveAc, cc.fadeOut(2), cc.callFunc(function() {
            null != self.callback && self.callback();
            self.node.removeFromParent();
            self.node.destroy();
          })));
        })));
      }
    });
    cc._RF.pop();
  }, {} ],
  tdk_player_item: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa71a6xydlEjbhSZYFLngmV", "tdk_player_item");
    "use strict";
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
      onLoad: function onLoad() {},
      set_card_info: function set_card_info(idx, suit, rank) {
        cc.log("tdk player item:", idx, suit, rank);
        var card = this.cards[idx];
        var card_sprite = card.getComponent(cc.Sprite);
        card_sprite.spriteFrame = g_assets["tdk_" + suit];
        var card_label = card.getChildByName("card_label").getComponent(cc.Label);
        card_label.string = g_Puke[rank];
      }
    });
    cc._RF.pop();
  }, {} ],
  tdk_player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "028ffRybvBD86qaxXFtjPlE", "tdk_player");
    "use strict";
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
      init: function init(params) {
        cc.log("tdk_player init: " + JSON.stringify(params));
        var self = this;
        this.id = params.id;
        this.position_server = params.location;
        this.is_power = params.is_power;
        this.nick_name = params.nick_name;
        this.my_gold = params.my_gold;
        this.nick_name_label.getComponent(cc.Label).string = this.nick_name;
        this.gold_label.getComponent(cc.Label).string = this.my_gold;
        null != params.head_img_url && params.head_img_url.length > 0 ? cc.loader.load({
          url: params.head_img_url,
          type: "png"
        }, function(err, texture) {
          var frame = new cc.SpriteFrame(texture);
          self.head_sprite.spriteFrame = frame;
        }) : self.head_sprite.spriteFrame = g_assets["headimg"];
        1 == this.is_power && this.setSpriteStatus("yizhunbei");
      },
      start_timer: function start_timer() {
        var count_timer = this.counter_timer.getComponent("count_timer");
        count_timer.start_timer();
      },
      stop_timer: function stop_timer() {
        var count_timer = this.counter_timer.getComponent("count_timer");
        count_timer.stop_timer();
      },
      setSpriteStatus: function setSpriteStatus(status) {
        console.log("zjh_player setSpriteStatus:" + status);
        this.status_sprite.spriteFrame = g_assets[status];
        this.status_sprite.node.active = true;
      },
      setGameStatus: function setGameStatus(status) {
        console.log("zjh_player setSpriteStatus:" + status);
        this.game_sprite.spriteFrame = g_assets[status];
        this.game_sprite.node.active = true;
      },
      install_chip_label: function install_chip_label(flag) {
        cc.log("install_chip_label");
        if (true == flag) {
          cc.log("install chips_label zhuang");
          this.chips_label = cc.instantiate(g_assets["chip_bg_zhuang"]);
        } else if (1 == this.player_position) {
          cc.log("install chips_label 1");
          this.chips_label = cc.instantiate(g_assets["chip_bg_1"]);
        } else if (2 == this.player_position) {
          cc.log("install chips_label 2");
          this.chips_label = cc.instantiate(g_assets["chip_bg_2"]);
        } else if (3 == this.player_position) {
          cc.log("install chips_label 3");
          this.chips_label = cc.instantiate(g_assets["chip_bg_3"]);
        } else if (4 == this.player_position) {
          cc.log("install chips_label 4");
          this.chips_label = cc.instantiate(g_assets["chip_bg_4"]);
        }
        this.node.parent.addChild(this.chips_label);
        if (false == flag) {
          var label_1 = this.chips_label.getChildByName("chip_up");
          label_1.getComponent(cc.Label).string = 0;
          var label_2 = this.chips_label.getChildByName("chip_down");
          label_2.getComponent(cc.Label).string = 0;
        }
      },
      set_chips: function set_chips(idx, chip) {
        cc.log("set_chips idx:" + idx + " chip:" + chip);
        if (1 == idx) {
          var label_1 = this.chips_label.getChildByName("chip_up");
          label_1.getComponent(cc.Label).string = chip;
          this.my_chip1 = chip;
        } else if (2 == idx) {
          var label_2 = this.chips_label.getChildByName("chip_down");
          label_2.getComponent(cc.Label).string = chip;
          this.my_chip2 = chip;
        }
      },
      remove_select_cards: function remove_select_cards() {
        for (var i = 0; i < this.selected_cards.length; i++) {
          var selectCard = this.selected_cards[i];
          for (var j = 0; j < this.my_cards.length; j++) if (selectCard == this.my_cards[j]) {
            this.my_cards.splice(j, 1);
            break;
          }
        }
        this.selected_cards.splice(0, this.selected_cards.length);
      },
      resetSelectCard: function resetSelectCard() {
        for (var i = 0; i < this.selected_cards.length; i++) {
          var card_t = this.selected_cards[i];
          var card_com = card_t.getComponent("zhq_card");
          card_com.menuCallbackButton();
        }
        this.selected_cards.splice(0, this.selected_cards.length);
      },
      addPlayerCard: function addPlayerCard() {
        var card = cc.instantiate(g_assets["pj_card"]);
        var card_com = card.getComponent("pj_card");
        card_com.id = this.my_cards.length;
        this.node.parent.addChild(card);
        this.my_cards.push(card);
        return card;
      },
      set_card_sprite: function set_card_sprite(idx, rank) {
        cc.log("set_card_sprite: idx" + idx + " rank:" + rank);
        var card = this.my_cards[idx].getComponent("pj_card");
        card.initCardSprite(rank);
      },
      remove_cards: function remove_cards() {
        for (var i = 0; i < this.my_cards.length; i++) {
          var card = this.my_cards[i];
          card.destroy();
        }
        this.my_cards.splice(0, this.my_cards.length);
      },
      hide_status_sprite: function hide_status_sprite() {
        this.status_sprite.node.active = false;
      },
      hide_game_sprite: function hide_game_sprite() {
        this.game_sprite.node.active = false;
      },
      resetMoneyLabel: function resetMoneyLabel(money) {
        this.my_gold = money;
        this.gold_label.string = money;
      }
    });
    cc._RF.pop();
  }, {} ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17b36kiCZ5IJZX6Uq0Yxa9F", "test");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  threedes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab00fX5W+5NP7hxzlBM9JEn", "threedes");
    "use strict";
    function des(key, message, encrypt, mode, iv, padding) {
      var spfunction1 = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756);
      var spfunction2 = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344);
      var spfunction3 = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584);
      var spfunction4 = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928);
      var spfunction5 = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080);
      var spfunction6 = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312);
      var spfunction7 = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154);
      var spfunction8 = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696);
      var keys = des_createKeys(key);
      var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
      var cbcleft, cbcleft2, cbcright, cbcright2;
      var endloop, loopinc;
      var len = message.length;
      var chunk = 0;
      var iterations = 32 == keys.length ? 3 : 9;
      looping = 3 == iterations ? encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2) : encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
      if (2 == padding) message += "        "; else if (1 == padding) {
        temp = 8 - len % 8;
        message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);
        8 == temp && (len += 8);
      } else padding || (message += "\0\0\0\0\0\0\0\0");
      result = "";
      tempresult = "";
      if (1 == mode) {
        cbcleft = iv.charCodeAt(m++) << 24 | iv.charCodeAt(m++) << 16 | iv.charCodeAt(m++) << 8 | iv.charCodeAt(m++);
        cbcright = iv.charCodeAt(m++) << 24 | iv.charCodeAt(m++) << 16 | iv.charCodeAt(m++) << 8 | iv.charCodeAt(m++);
        m = 0;
      }
      while (m < len) {
        left = message.charCodeAt(m++) << 24 | message.charCodeAt(m++) << 16 | message.charCodeAt(m++) << 8 | message.charCodeAt(m++);
        right = message.charCodeAt(m++) << 24 | message.charCodeAt(m++) << 16 | message.charCodeAt(m++) << 8 | message.charCodeAt(m++);
        if (1 == mode) if (encrypt) {
          left ^= cbcleft;
          right ^= cbcright;
        } else {
          cbcleft2 = cbcleft;
          cbcright2 = cbcright;
          cbcleft = left;
          cbcright = right;
        }
        temp = 252645135 & (left >>> 4 ^ right);
        right ^= temp;
        left ^= temp << 4;
        temp = 65535 & (left >>> 16 ^ right);
        right ^= temp;
        left ^= temp << 16;
        temp = 858993459 & (right >>> 2 ^ left);
        left ^= temp;
        right ^= temp << 2;
        temp = 16711935 & (right >>> 8 ^ left);
        left ^= temp;
        right ^= temp << 8;
        temp = 1431655765 & (left >>> 1 ^ right);
        right ^= temp;
        left ^= temp << 1;
        left = left << 1 | left >>> 31;
        right = right << 1 | right >>> 31;
        for (j = 0; j < iterations; j += 3) {
          endloop = looping[j + 1];
          loopinc = looping[j + 2];
          for (i = looping[j]; i != endloop; i += loopinc) {
            right1 = right ^ keys[i];
            right2 = (right >>> 4 | right << 28) ^ keys[i + 1];
            temp = left;
            left = right;
            right = temp ^ (spfunction2[right1 >>> 24 & 63] | spfunction4[right1 >>> 16 & 63] | spfunction6[right1 >>> 8 & 63] | spfunction8[63 & right1] | spfunction1[right2 >>> 24 & 63] | spfunction3[right2 >>> 16 & 63] | spfunction5[right2 >>> 8 & 63] | spfunction7[63 & right2]);
          }
          temp = left;
          left = right;
          right = temp;
        }
        left = left >>> 1 | left << 31;
        right = right >>> 1 | right << 31;
        temp = 1431655765 & (left >>> 1 ^ right);
        right ^= temp;
        left ^= temp << 1;
        temp = 16711935 & (right >>> 8 ^ left);
        left ^= temp;
        right ^= temp << 8;
        temp = 858993459 & (right >>> 2 ^ left);
        left ^= temp;
        right ^= temp << 2;
        temp = 65535 & (left >>> 16 ^ right);
        right ^= temp;
        left ^= temp << 16;
        temp = 252645135 & (left >>> 4 ^ right);
        right ^= temp;
        left ^= temp << 4;
        if (1 == mode) if (encrypt) {
          cbcleft = left;
          cbcright = right;
        } else {
          left ^= cbcleft2;
          right ^= cbcright2;
        }
        tempresult += String.fromCharCode(left >>> 24, left >>> 16 & 255, left >>> 8 & 255, 255 & left, right >>> 24, right >>> 16 & 255, right >>> 8 & 255, 255 & right);
        chunk += 8;
        if (512 == chunk) {
          result += tempresult;
          tempresult = "";
          chunk = 0;
        }
      }
      result += tempresult;
      result = result.replace(/\0*$/g, "");
      return result;
    }
    function des_createKeys(key) {
      pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964);
      pc2bytes1 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697);
      pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272);
      pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144);
      pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256);
      pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488);
      pc2bytes6 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746);
      pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568);
      pc2bytes8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578);
      pc2bytes9 = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488);
      pc2bytes10 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800);
      pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744);
      pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128);
      pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
      var iterations = key.length > 8 ? 3 : 1;
      var keys = new Array(32 * iterations);
      var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
      var lefttemp, righttemp, m = 0, n = 0, temp;
      for (var j = 0; j < iterations; j++) {
        left = key.charCodeAt(m++) << 24 | key.charCodeAt(m++) << 16 | key.charCodeAt(m++) << 8 | key.charCodeAt(m++);
        right = key.charCodeAt(m++) << 24 | key.charCodeAt(m++) << 16 | key.charCodeAt(m++) << 8 | key.charCodeAt(m++);
        temp = 252645135 & (left >>> 4 ^ right);
        right ^= temp;
        left ^= temp << 4;
        temp = 65535 & (right >>> -16 ^ left);
        left ^= temp;
        right ^= temp << -16;
        temp = 858993459 & (left >>> 2 ^ right);
        right ^= temp;
        left ^= temp << 2;
        temp = 65535 & (right >>> -16 ^ left);
        left ^= temp;
        right ^= temp << -16;
        temp = 1431655765 & (left >>> 1 ^ right);
        right ^= temp;
        left ^= temp << 1;
        temp = 16711935 & (right >>> 8 ^ left);
        left ^= temp;
        right ^= temp << 8;
        temp = 1431655765 & (left >>> 1 ^ right);
        right ^= temp;
        left ^= temp << 1;
        temp = left << 8 | right >>> 20 & 240;
        left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240;
        right = temp;
        for (i = 0; i < shifts.length; i++) {
          if (shifts[i]) {
            left = left << 2 | left >>> 26;
            right = right << 2 | right >>> 26;
          } else {
            left = left << 1 | left >>> 27;
            right = right << 1 | right >>> 27;
          }
          left &= -15;
          right &= -15;
          lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15];
          righttemp = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15];
          temp = 65535 & (righttemp >>> 16 ^ lefttemp);
          keys[n++] = lefttemp ^ temp;
          keys[n++] = righttemp ^ temp << 16;
        }
      }
      return keys;
    }
    function pad(key) {
      for (var i = key.length; i < 24; i++) key += "0";
      return key;
    }
    function genkey(key) {
      return {
        key: pad(key.slice(0, 48)),
        vector: key.slice(48, 64)
      };
    }
    function chars_from_hex(inputstr) {
      var outputstr = "";
      inputstr = inputstr.replace(/^(0x)?/g, "");
      inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, "");
      inputstr = inputstr.split("");
      for (var i = 0; i < inputstr.length; i += 2) outputstr += String.fromCharCode(parseInt(inputstr[i] + "" + inputstr[i + 1], 16));
      return outputstr;
    }
    function hex_from_chars(inputstr) {
      var delimiter = "";
      var outputstr = "";
      var hex = "0123456789abcdef";
      hex = hex.split("");
      var i, n;
      var inputarr = inputstr.split("");
      for (var i = 0; i < inputarr.length; i++) {
        i > 0 && (outputstr += delimiter);
        !delimiter && i % 32 == 0 && i > 0 && (outputstr += "\n");
        n = inputstr.charCodeAt(i);
        outputstr += hex[n >> 4 & 15] + hex[15 & n];
      }
      return outputstr;
    }
    function encrypt_string(key, input) {
      key = chars_from_hex(genkey(key).key);
      var output = des(key, input, 1, 0, 0, genkey(key).vector);
      return hex_from_chars(output);
    }
    function decrypt_string(key, input) {
      key = chars_from_hex(genkey(key).key);
      input = chars_from_hex(input);
      return des(key, input, 0, 0, 0, genkey(key).vector);
    }
    cc._RF.pop();
  }, {} ],
  zjh_compare: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3583bFm+c5C86nHjWxeFmm6", "zjh_compare");
    "use strict";
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
        is_finish: false,
        is_start: false,
        anim: null,
        animStatus: null,
        duration: 0
      },
      onLoad: function onLoad() {
        cc.log("load dianji class");
        this.is_finish = false;
        this.anim = this.bg_sprite.getComponent(cc.Animation);
        this.anim.on("finished", this.onFinished, this);
      },
      init_info: function init_info(left_name, right_name) {
        this.left_name_label.string = left_name;
        this.right_name_label.string = right_name;
      },
      bipai_start: function bipai_start(time) {
        var self = this;
        self.is_finish = false;
        setTimeout(function() {
          self.animStatus = self.anim.play("dianshan");
          self.is_start = true;
          self.animStatus.wrapMode = cc.WrapMode.Normal;
          self.animStatus.wrapMode = cc.WrapMode.Loop;
          self.animStatus.repeatCount = 3;
        }, 1e3 * time);
      },
      onFinished: function onFinished() {
        cc.log("zjh compare finish", this.isValid);
        this.is_finish = true;
        this.is_start = false;
        this.node.parent = null;
        this.node.destroy();
      },
      get_cur_time: function get_cur_time() {
        return true == this.is_start ? this.animStatus.time / this.animStatus.speed * 3 : this.animStatus.duration / this.animStatus.speed * 3;
      },
      get_card_position: function get_card_position(card) {
        var cur_node = card;
        "cc.Sprite" == cur_node.__cid__ && (cur_node = cur_node.node);
        var position = cc.p(cur_node.getPosition());
        while (null != cur_node.parent) {
          "cc.Sprite" == cur_node.__cid__ && (cur_node = cur_node.node);
          if (cur_node == this.node) break;
          var cur_parent = cur_node.parent;
          var cur_parent_pos = cur_parent.getPosition();
          position.x = cur_parent_pos.x + position.x;
          position.y = cur_parent_pos.y + position.y;
          cur_node = cur_parent;
        }
        return position;
      },
      test: function test() {
        this.bipai_start(1.5);
        var self = this;
        setTimeout(function() {
          cc.log(self.animStatus.duration, self.animStatus.time, self.animStatus.speed);
        }, 2e3);
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "LoadUpdateGame", "MainScene", "bomb_action", "bipai_choice", "one_choice", "player_select", "test", "pj_card", "add_chip", "pop_game_user", "pop_gonggao", "pop_help", "pop_net_error", "prop_error_info", "prop_isok_info", "root_node", "shai_zhong_active", "game_player_item", "pop_game_finish", "select_compare", "tdk_player_item", "zjh_compare", "count_timer", "pj_game_room", "created_room_scene", "pj_create_game", "pop_enter_game", "Login", "PopXieyi", "msage_scroll", "tdk_player", "pop_set_scene", "buy_fangka", "buy_order", "game_history_item", "gonghui", "gonghui_empty", "gonghui_jiaru", "gonghui_shenqing", "gonghui_yuan", "gonghui_zhang", "my_game_info", "my_game_record", "my_game_zhanji", "record_item", "pop_game_action", "pop_game_user_info", "Consts", "payJS", "threedes", "emitter", "pomelo-client", "protobuf", "protocol" ]);
//# sourceMappingURL=project.dev.js.map