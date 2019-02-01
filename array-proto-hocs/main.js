//задача1
function compareArrays(arr1,arr2) {
    if(arr1.length === arr2.length) {
        // arr1.forEach(item,i,arr1 => {
        //     console.log( i + ": " + item + " (массив:" + arr1 + ")" );
        //     // if(arr1[index] !== arr2[index]) return false;            
        // });
        arr1.forEach((item,i,arr1) => {
            // console.log(item);
            // console.log(arr1[i] !== arr2[i]);
            if(arr1[i] !== arr2[i]) return false;
            return true;
        });
        
    }
    //return false;
}

console.log(compareArrays([1,2,4,5],[1,2,4,5]));