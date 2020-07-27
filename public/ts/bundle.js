(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

Object.defineProperty(exports, "__esModule", { value: true });
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
function default_1() {
    var myObj = { size: 10, label: "Size 10 Object" };
    printLabel(myObj);
}
exports.default = default_1;

},{}],2:[function(require,module,exports){

Object.defineProperty(exports, "__esModule", { value: true });
var typeScript_1 = require("./typeScript");
var interface_1 = require("./interface");
typeScript_1.default();
interface_1.default();
//filterData(data)

},{"./interface":1,"./typeScript":3}],3:[function(require,module,exports){
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
//类型注解 
//如果不传入参数或参数类型与注解类型不符会报错 即使报错代码还是会被编译 但是ts 会警告你代码可能不会按照预期执行
function typeAnnotation(name) {
    return name + "\u5982\u679C\u4E0D\u4F20\u5165\u53C2\u6570\u6216\u53C2\u6570\u7C7B\u578B\u4E0E\u6CE8\u89E3\u7C7B\u578B\u4E0D\u7B26\u4F1A\u62A5\u9519 \u5373\u4F7F\u62A5\u9519\u4EE3\u7801\u8FD8\u662F\u4F1A\u88AB\u7F16\u8BD1 \u4F46\u662Fts \u4F1A\u8B66\u544A\u4F60\u4EE3\u7801\u53EF\u80FD\u4E0D\u4F1A\u6309\u7167\u9884\u671F\u6267\u884C";
}
function interfaceFun(person) {
    return person.userName + "\u4ECA\u5E74" + person.age + "\u5C81";
}
//类 类和接口可以一起工作

var Student = function Student(userName, sex, age) {
    _classCallCheck(this, Student);

    this.userName = userName;
    this.sex = sex;
    this.age = age;
    this.info = "" + userName + sex + age;
};

var user = new Student("大明", "男", 12);
console.log(user);
function info(person) {
    return person.userName + "\u4ECA\u5E74" + person.age + "\u5C81";
}
function default_1() {
    // 布尔值
    var isDone = true;
    // 数字
    var decLiteral = 0;
    // 字符串
    var name = "小明";
    // 数组 有两种方式定义数组
    var arr = [1, 2, 3, 4];
    var arr2 = ['1', '2'];
    var arr3 = [1, 2, 3, "4"];
    // 元组
    var arrFixed = ['we', 3];
    // 枚举类型
    var Color = void 0;
    (function (Color) {
        Color[Color["red"] = 0] = "red";
        Color[Color["green"] = 1] = "green";
        Color[Color["blue"] = 2] = "blue";
    })(Color || (Color = {}));
    var colorName = Color[1];
    // 空值
    function alertName() {
        console.log("返回空值的函数");
    }
    var dede = null; //没什么意义
    alertName();
    //null和undefined 是所有类型的子类型 可以赋值给其他按类型 而 void 不可以
    var u = undefined;
    var n = null;
    var num = undefined;
    //任意值类型 允许赋值为任意类型
    var any = "sdsds";
    any = 1;
    //Object 类型标识费元是类型 也就是除 number，boolean，string，symbol，undefined，null以外的类型 它允许被赋予任意值，但是却不能调用任意方法
    var obj = 3;
    //Never 类型表示拿些永远不存在的类型（总是抛出异常，或根本就不会有返回值的函数表达式的类型），never类型是任何类型的子类型，也可以赋值给任意类型，然而任何类型
    //都不可一给never 赋值 包括any
    function err(msg) {
        throw new Error(msg);
    }
    function run() {
        return err("never 类型");
    }
    function loop() {
        while (true) {}
    }
    //类型断言 通常这种情况发生在你清楚的知道一个实体具有比他现有类型更确切的类型，类型断言有两种形式 jsx 中只支持as语法
    //尖括号语法
    var someVal = "你好啊明天";
    var strLen = someVal.length;
    // as 语法
    var someVal2 = "你好啊后天";
    var strLen2 = someVal.length;
    var Direction = void 0;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    console.log(Direction[1]);
    console.log(obj);
    console.log(typeAnnotation("类型注解"));
    console.log(interfaceFun({ userName: "小明", age: 10 }));
    console.log(info(user));
}
exports.default = default_1;

},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
