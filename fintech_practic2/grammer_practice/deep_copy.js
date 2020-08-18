let  x = {
    a:1,
    b:2
}
let x_copy = x
x_copy.a = 3

console.log(x.a)//deep copy는 포인터 형식이라 원본애 까지 영향을 미침 

let x_shallow  = {...x}
x_shallow.a = 8

console.log(x.a)//shallow copy는 원본에 영향을 미치지 않음 

let  x = {
    a:1,
    b:{
        c:3,
        d:{
            name:1
        }
    }
}//이럴때는 for문을 돌려서 object를 복사해줘야 함
//lodash라는 라이브러러가 있음

