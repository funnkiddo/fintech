var fs = require("fs");

console.log("first func");
var data = "none";
fs.readFile("./example/test.txt","utf-8",function(err, result){
    if(err){
        console.log(err);
        throw err;
    }else{
        data = result;
        console.log(data);
    }
});
console.log("third func");