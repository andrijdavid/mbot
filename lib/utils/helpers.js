class Helpers {

    static trim(str) {
        return str.trim();
    }

    static random(min, max) {
        let rand = Math.random();
        return rand * max - rand * min + min;
    }

    static isArray(obj) {
        return Array.isArray(obj);
    }

    static isEmpty(obj) {
        return Helpers.empty(obj);
    }

    static isNotEmpty(obj) {
        return !Helpers.isEmpty(obj);
    }

    static stringify(t) {
        Object.prototype.toJSON = function () {
            let t, e = {};
            for (t in this)this.hasOwnProperty(t) && (e[t] = "function" == typeof this[t] ? this[t].toString() : this[t]);
            return e
        }, Array.prototype.toJSON = function () {
            let t, e = [];
            for (t = 0; t < this.length; t++)e.push("function" == typeof this[t] ? this[t].toString() : this[t]);
            return e
        };
        let e = null;
        return "object" == typeof t && (e = JSON.stringify(t)), "function" == typeof t && (e = ""), "string" == typeof t && (e = t), delete Object.prototype.toJSON, delete Array.prototype.toJSON, e
    }

    static isCallable(t) {
        if ("function" == typeof t)return !0;
        if ("object" == typeof t) {
            let e = !0;
            return t.forEach(function (t) {
                e = "function" == typeof t ? e && !0 : e && !1
            }), e
        }
        return !1
    }

    static isNumber(t) {
        return !isNaN(t)
    }

    static empty(t) {
        return "" == t || void 0 === t || null === t || "" === t || null == t || 0 === Object.getOwnPropertyNames(t).length
    }

    static toRoman(t) {
        if (t = parseInt(t, 10), t > 0 && 6e3 > t) {
            let e, r, n, s = ["", "M", "MM", "MMM", "MMMM", "MMMMM"], o = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], a = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], i = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], u = function (e) {
                return e = (t - t % e) / e
            };
            return e = u(1e3), t %= 1e3, r = u(100), t %= 100, n = u(10), s[e] + o[r] + a[n] + i[t % 10]
        }
        throw new Error("Numbers from 1 to 5999 only please")
    }


    static doNothing(t, e) {
        return !Helpers.empty(t) && isNumber(t) && parseInt(t) > 0 ? void setTimeout(Helpers.doNothing(0, e), parseInt(t)) : Helpers.isCallable(e) ? e() : "done"
    }

    static notEmptyAndCallable(t) {
        return !Helpers.empty(t) && Helpers.isCallable(t)
    }

    static when(t) {
        if (!Helpers.notEmptyAndCallable(t))return !1;
        let e = new Promise(function (e, r) {
            e(t())
        }, function (t) {
        });
        return e
    }

    static emptyOrDefault(t, e) {
        return Helpers.empty(t) ? e : t
    }
}
module.exports = Helpers;