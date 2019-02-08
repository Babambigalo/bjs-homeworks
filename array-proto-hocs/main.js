
'use strict'
//задача1
function compareArrays(arr1,arr2) {
    if(arr1.length === arr2.length ) {
        for(let i=0;i<arr1.length;i++) {
            if(arr1[i] !== arr2[i]){
                return false;
            }
        }
        return true;
    }
    return false;    
}

//задача2
function memoize(fn,limit) {
    let results = [];
    return function(a,b) {
        for(let i=0;i<results.length;i++) {
            if(compareArrays(results[i].args,[a,b]) === true) {
                return results[i].result;        
            }
        }
        results.push({
            args: [a,b],
            result: fn(a,b)
        });

        if(results.length > limit) results.shift(0);

        return fn(a,b);
    }
}

const sum = (a, b) => a + b;

const mSum = memoize(sum, 2); 

console.log(mSum( 3, 4 ));
console.log(mSum( 3, 4 ));
