//문제는 기능이 복잡해지고 내용이 많아지면 callback kill이 발생할 수 있음
//유지보수가 어려움
function aFunc(callback){ //callback이라는 메소드를 전달
    setTimeout(function(){
        console.log("a");
        callback(); //변수로 전달된 callback을 실행
    }, 1700);
}
function bFunc(callback){
    setTimeout(function(){
        console.log("b");
        callback();
    }, 1000);
}
function cFunc(callback){
    setTimeout(function(){
        console.log("c");
        callback();
    }, 500);
}
// aFunc();
// bFunc();
// cFunc();
aFunc(function(){
    bFunc(function(){
        cFunc(function() {});// promise, async, await
    })
});
