
function delay(ms){
return new Promise((resolve,reject) => {
console.log("hello")
setTimeout(resolve,ms)
    });
}
delay(3000).then(()=> {
    console.log("world")
});
