
//类型注解 
//如果不传入参数或参数类型与注解类型不符会报错 即使报错代码还是会被编译 但是ts 会警告你代码可能不会按照预期执行
function typeAnnotation(name: string) {
    return `${name}如果不传入参数或参数类型与注解类型不符会报错 即使报错代码还是会被编译 但是ts 会警告你代码可能不会按照预期执行`;
}

//接口
//在ts中，只要两个类型内部的结构兼容那么这两个类型就是兼容的。这就保证了我们在实现接口的时候只要保证包含了接口要求的结构就可以，而不必明确的使用implements语句
interface Person {
    userName:string;
    age:number;
}
function interfaceFun(person:Person){
    return `${person.userName}今年${person.age}岁`
}

//类 类和接口可以一起工作
class Student{
    info:string;
    constructor(public userName:string,public sex:string,public age:number){
        this.info=`${userName}${sex}${age}`
    }
}
interface Person {
    userName:string;
    age:number;
}

const user=new Student("大明","男",12);
console.log(user)
function info(person:Person){
    return `${person.userName}今年${person.age}岁`
}

export default function(){
    // 布尔值
    let isDone:boolean=true;
    // 数字
    let decLiteral:number=0;
    // 字符串
    let name:string="小明";
    // 数组 有两种方式定义数组
    let arr:number[]=[1,2,3,4]
    let arr2:Array<string>=['1','2']
    let arr3:any[]=[1,2,3,"4"]
    // 元组
    let arrFixed:[string,number]=['we',3];
    // 枚举类型
    enum Color {red,green,blue}
    const colorName:string=Color[1]
    // 空值
    function alertName(): void {
        console.log("返回空值的函数")
    }
    let dede:void=null;//没什么意义
    alertName()
    //null和undefined 是所有类型的子类型 可以赋值给其他按类型 而 void 不可以
    let u:undefined=undefined;
    let n:null=null;
    let num:number=undefined;
    //任意值类型 允许赋值为任意类型
    let any:any="sdsds"
    any=1;
    //Object 类型标识费元是类型 也就是除 number，boolean，string，symbol，undefined，null以外的类型 它允许被赋予任意值，但是却不能调用任意方法
    let obj:Object=3;
    //Never 类型表示拿些永远不存在的类型（总是抛出异常，或根本就不会有返回值的函数表达式的类型），never类型是任何类型的子类型，也可以赋值给任意类型，然而任何类型
    //都不可一给never 赋值 包括any
    function err(msg:string):never{
        throw new Error(msg)
    }
    function run (){
        return err("never 类型")
    }
    
    function loop():never{
        while(true){
          
        }
    }
    //类型断言 通常这种情况发生在你清楚的知道一个实体具有比他现有类型更确切的类型，类型断言有两种形式 jsx 中只支持as语法
    //尖括号语法
    let someVal:any="你好啊明天";
    let strLen:number=(<string>someVal).length;
    // as 语法
    let someVal2:any="你好啊后天";
    let strLen2:number=(someVal as string).length;

    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    } 

    console.log(Direction[1])
    console.log(obj)
    console.log(typeAnnotation("类型注解"))
    console.log(interfaceFun({userName:"小明",age:10}))
    console.log(info(user))
}