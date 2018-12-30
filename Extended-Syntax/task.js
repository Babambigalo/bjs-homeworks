'use strict';

function calculateQuadraticEquation(){
    let a = +window.a.value;
    let b = +window.b.value;
    let c = +window.c.value;
    let result = getResult(a,b,c);
    window.equation.textContent = `${a}*x^2 + (${b})*x + (${c}) = 0`;
    let span = window.result;
    span.textContent = "х = "+result;
}

function getResult(a,b,c){

    let discriminant = Math.pow(b,2) -(4 * a * c);

    if(discriminant > 0) {
        let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let x = [x1,x2];
        return x;    
    }else if(discriminant === 0) {
        let x = -b / (2 * a);
        return x;        
    }else {
        return 'Корней нет!';
    }
}

function calculateDrinkTask(){
    let name = window.personName.value;
    let dateOfBirthday = new Date(window.dateOfBirthday.value);
    let drink = askDrink(name, dateOfBirthday);
    window.drink.textContent = drink;
}

function askDrink(name,dateOfBirthday){
    let result = `Сожалею, ${name}, но я не могу вам продать алкоголь. Зато могу предложить вам замечательный клюквенный компот!`
    console.log(dateOfBirthday.getFullYear()>=18);
    if(2019 - dateOfBirthday.getFullYear()>=18){
        result = `Не желаете ли олд-фэшн, ${name}?`;
        console.log(result);
        return result;
    }else {
        console.log(result);
        return result;

    }           
}

function calculateAverageRating(){
    let marks = window.marks.value.split(" ").map(Number);
    let averageMark = getAverageMark(marks);
    window.averageMark.textContent = averageMark;
}

function getAverageMark(marks){
    let averageMark = 0;
    let sumMarks = 0;
    if(marks.length > 5) {
        console.log(`Введено ${marks.length} оценок!`);
        for(let i=0;i<5;i++){
            sumMarks = sumMarks + marks[i];
        }

        averageMark = sumMarks / 5;
    }else {
        for(let i=0;i<marks.length;i++) {
            sumMarks = sumMarks + marks[i];
            console.log(sumMarks);
        }

        averageMark = sumMarks / 5;    }
    return averageMark;
}