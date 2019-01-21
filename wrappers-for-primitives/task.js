"use strict"
function calculateMortgage() {
    let percent = window.percent.value;
    let contribution = window.contribution.value;
    let amount = window.amount.value;
    let date = window.date.value;
    console.log(date);

    let result = calculateTotalMortgage(percent, contribution, amount, date);
    let span = window.mortageResult;
    span.textContent = result;
}

function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function calculateTotalMortgage(percent, contribution, amount, date) {
    let formatPercent = Number(percent/100);
    console.log("formatPercent = " + formatPercent);
    let formatContribution = Number(contribution);
    console.log("formatContrib = " + formatContribution);
    let formatAmount = Number(amount);        
    console.log("formatAmount = " + formatAmount);

    if (typeof formatPercent !== "number") return `Параметр percent содержит неправильное значение ${percent}`; 
    if (typeof formatContribution !== "number") return `Параметр contribution содержит неправильное значение ${contribution}`; 
    if (typeof formatAmount !== "number") return `Параметр amount содержит неправильное значение ${amount}`; 
    if (typeof date !== "string") return `Параметр date содержит неправильное значение ${date}`; 

    let formatDate = new Date(date);
    let currentDate = new Date();
    let diffMonth = monthDiff(currentDate,formatDate);
    if (formatDate.getDate()>=currentDate.getDate()) diffMonth+=1;
    console.log("diffMonth = " + diffMonth);

    let returnToBank = amount - contribution;
    console.log("returnToBank = "+ returnToBank);
    let payOfMonth = returnToBank*(formatPercent + formatPercent/((Math.pow((1+formatPercent),diffMonth))-1));
    console.log("payOfMonth = " + payOfMonth);
    let totalAmount = diffMonth * payOfMonth; 
    console.log("totalAmount = " + totalAmount);

    return totalAmount;
}



function sayHello() {
    let name = window.personName.value;
    let greeting = getGreeting(name);
    let span = window.helloResult;
    span.textContent = greeting;
}

function getGreeting(name) {    
    let unknown = "Аноним";
    if (!!name === false || name[0] === " ")  name = unknown ;
    let greeting = "Привет, мир! Меня зовут " + name;   
    return greeting;
}