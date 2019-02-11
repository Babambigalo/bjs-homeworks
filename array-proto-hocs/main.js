'use strict'
//задача1
function compareArrays(arr1,arr2) {
    let isEqual = true;
    arr1.forEach(function(value,index,array) {
    if(value !== arr2[index] || array.length !== arr2.length) isEqual = false;
    });
    return isEqual;

}
//задача2
function memoize(fn,limit) {
    let results = [];
    return function() {
        let args = Array.from(arguments);
        let findInMemory = results.find((value,index,array) => compareArrays(array[index].args,args));
        if(findInMemory === undefined) {
            results.push({
                args: args,
                result: fn(...arguments)
            });
        }else {
            return findInMemory.result;
        }
        if(results.length > limit) results.shift();
        return fn(...arguments);
    }
}

const sum = (a, b) => a + b;
const mSum = memoize(sum, 2); 

console.log(mSum( 3, 4 ));
console.log(mSum( 5, 4 ));
console.log(mSum( 6, 4 ));
console.log(mSum( 7, 4 ));
