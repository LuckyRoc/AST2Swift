
// 生成Swift的Model文件
var generateCode = function (jsonString, className) {
    var k = "";

    // 首字母大写
    var toUpperVar = function (a) {
        return a.replace(/\b[a-z]/g, function (a) {
            return a.toUpperCase()
        })
    };

    // 小写
    var toLowerVar = function (a) {
        return a.replace(/\b[a-z]/g, function (a) {
            return a.toLowerCase()
        })
    };

    // 判断是否有嵌套的Model
    var q = function (a) {
        // 判断是否是一个数组
        return a instanceof Object ? a.constructor.prototype.hasOwnProperty("push") : !1
    };

    var r = function (a) {
        // 判断是否是一个数组
        return a instanceof Object ? !a.constructor.prototype.hasOwnProperty("push") : !1
    };

    // 生成 class
    var getClass = function (a, d) {
        // return "class " + a + ": NSObject {\n" + d + "}"
        let required = "\n    required init() {}"
        return "class " + a + ": HandyJSON {\n" + d + required + "\n}"
    };

    // 生成变量
    var getVar = function (a, d) {
        return "    var " + d + ": " + a + "\n"
    };

    // swift  解析 json
    var generateSwift = function (a, d) {
        var c = "";
        if (q(a)) {
            if (a.length > 0) {
                for (var e = a[0], f = a.length - 1; 0 <= f; f--) {
                    var b = a[f];
                    q(b) ? b.length > e.length && (e = b) :
                        r(b) && Object.keys(b).length > Object.keys(e).length && (e = b)
                }
                c += generateSwift(e, d)
            }
        } else if (r(a)) for (e in a) {
            b = a[e];
            var h = toUpperVar(e);
            f = toLowerVar(e);
            if (q(b)) {
                var g;
                // 获取第一个
                0 < b.length && (g = b[0]);

                if ("string" === typeof g) {
                    c += getVar("[String]!", f);
                } else {
                    if ("number" === typeof g) {
                        // 判断浮点数
                        if (0 <= b.toString().indexOf(".")) {
                            c += getVar("[Float]!", f);
                        } else {
                            c += getVar("[Int]!", f);
                        }
                    } else if ("boolean" === typeof g) {
                        c += getVar("[Bool]", f)
                    } else if ("object" === typeof g) {
                        h += "Item";
                        c += getVar("[" + h + "]!", f);
                        b = generateSwift(b, e);
                        if (0 < k.length) {
                            k += "\r\n\r\n" + getClass(h, b)
                        } else {
                            k = getClass(h, b)
                        }
                    }
                }
            } else {
                if (r(b)) {
                    b = generateSwift(b, e)
                    c += getVar(h, f)
                    k = 0 < k.length ? k + "\r\n\r\n" + getClass(h, b) : getClass(h, b)
                } else {
                    if ("string" === typeof b) {
                        c += getVar("String = ''", f)
                    } else if ("number" === typeof b) {
                        // 判断浮点数
                        if (0 <= b.toString().indexOf(".")) {
                            c += getVar("Float = 0.0", f)
                        } else {
                            c += getVar("Int = 0", f)
                        }
                    } else if ("boolean" === typeof b) {
                        c += getVar("Bool = false", f)
                    }
                }
            }
        } else alert("key = " + d); return c
    };

    var swiftFunc = function (a, d) {
        k = ""
        0 == d.length && (d = "DefaultModelName");
        var c = generateSwift(a, d);
        k = 0 < k.length ? k + "\r\n\r\n" + getClass(d, c) : getClass(d, c);
        return k
    };

    return {
        swiftModel: function () {
            var d = eval("(" + jsonString + ")");
            return swiftFunc(d, toUpperVar(className))
        }
    }

};

exports.generateCode = generateCode;