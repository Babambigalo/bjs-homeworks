'use strict'
//задача1
function getSolutions(a,b,c) {
    let object = {};
    let D = Math.pow(b,2) - (4 * a *c );
    object.D = D;
    if(D < 0) {
        return object;
    }else if (D === 0) {
        let x1 = -b / (2 * a);
        object.roots = x1;
        return object;
    }else {
        let x1 = ((-b + Math.sqrt(D))/(2*a));
        let x2 = ((-b - Math.sqrt(D))/(2*a));
        object.roots = [x1,x2];
        return object;
    }
}

function showSolutionsMessage(a,b,c) {
    let result = getSolutions(a,b,c);
    console.log('Вычисляем корни квадратного уравнения ' + a + 'x^2' + '+' + b + 'x' + '+' + c);
    console.log('Значение дискриминанта: ' + result.D);
    if (result.D === 0){
        console.log('Уравнение имеет один корень X1 = ' + result.roots);
    }else if(result.D > 0){
        console.log('Уравнение имеет два корня X1 = ' + result.roots[0] + ',' + 'X2 = ' + result.roots[1]);
    }else{
        console.log('Уравнение не имеет вещественных корней');
    }

}

showSolutionsMessage(1,2,3);
showSolutionsMessage(7,20,-3);
showSolutionsMessage(2,4,2);

//задача2
function getPersonData(secretData) {
    let name0 = 'Родриго';
    let name1 = 'Эмилио';
    let object = {};
    (secretData.aaa === 0) ? object.firstName = name0 : object.firstName = name1; 
    (secretData.bbb === 0) ? object.lastName = name0 : object.lastName = name1;
    return object;
}

//задача3 
function getAverageScore(data) {
    let object = {};
    let classScores = 0;
    let sumScores = 0;
    let numberScores = 0;
    for(let key in data){
        numberScores += data[key].length;
        for(let i=0;i<data[key].length;i++){
            //console.log(data[key][i]);
            sumScores += data[key][i];
            classScores += data[key][i];
        }
        object[key] = classScores / data[key].length;
        classScores = 0;
    }
    object.average = sumScores/numberScores;
    return object;
        
}