class Person{
    constructor(name){
        this.name=name;
    }
    sayName(){
        console.log(this.name)
    }
}
let p=new Person("张三")
p.sayName();