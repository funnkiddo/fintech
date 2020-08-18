// for (var i in 'string'){ console.log(i);}
// for (var i of 'string'){ console.log(i);}
// let array = [3,5,7];
// array.foo = 'bar';
// for (let j in array ){ console.log(j);}
// for (let j of array ){ console.log(j);}

for (const [idx, val] of Iterable.entries()){
    console.log(idx,val);
}