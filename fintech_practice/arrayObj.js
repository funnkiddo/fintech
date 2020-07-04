var car = {
    name: "sonata",
    ph: "500ph",
    start: function () {
    console.log("engine is starting");
    },
    stop: function () {
    console.log("engine is stoped");
    },
};
var car2 = {
    name: "bmw",
    ph: "500ph",
    start: function () {
    console.log("engine is starting");
    },
    stop: function () {
    console.log("engine is stoped");
    },
};
var car3 = {
    name: "fiat",
    ph: "500ph",
    start: function () {
    console.log("engine is starting");
    },
    stop: function () {
    console.log("engine is stoped");
    },
};
var cars = [car, car2, car3];

//console.log(cars[2]);
//console.log(cars[0].stop());
//work 자동차 배열을 확인한 뒤 bmw라는 자동차가 있으면 hello 출력

function findCar(carname){
    for (i = 0; i < cars.length; i++) {	
        // console.log(cars[i]);
        if (cars[i].name == carname){
            console.log("find");
        }
    }
}
findCar("bmw");