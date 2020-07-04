var car = {
    name: "sonata",
    ph: "500ph",
    start: function() {
        console.log("engine is starting");
    },//이름이 없는 익명함수 
    stop: function(){
        console.log("engine is stopped");
    },
};
var car2 = {
    name: "genesis",
    ph: "600ph",
    start: function() {
        console.log("engine is starting");
    },//이름이 없는 익명함수 
    stop: function(){
        console.log("engine is stopped");
    },
};
var car3 = {
    name: "auodi",
    ph: "700ph",
    start: function() {
        console.log("engine is starting");
    },//이름이 없는 익명함수 
    stop: function(){
        console.log("engine is stopped");
    },
};



console.log(car,car2,car3);
car.start(); //함수의 내용을 확인하는 방법
console.log(car.ph);