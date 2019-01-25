function initCheckBirthday() {
    const birthday = document.getElementById('birthday').value;

    const result = checkBirthday(birthday) ? "Да" : "Нет";

    document.getElementById('disclaimer').innerHTML = result;   
}

function checkBirthday(birthday) {
    // код для задачи №1 писать здесь
    let now = new Date();
    const convertBirthday = birthday.split(".");
    const userBirthday = new Date(convertBirthday[2] + '-' + convertBirthday[1] + '-' + convertBirthday[0]);
    let quantityLeapYears = 0;

    for(let i = userBirthday.getFullYear();i<=now.getFullYear();i++) {
        if (((i % 4 === 0) && (i % 100 !== 0)) || (i % 400 === 0)) quantityLeapYears++;
    }

    const convertNow = now.getTime();
    const converUserBirthday = userBirthday.getTime();
    const diff = convertNow - converUserBirthday;
    let age = Math.floor(diff/(1000*3600*24*(365+quantityLeapYears)));    

    (age >= 18) ? age = true : age = false;   

    return age;


}

function initPrintAnimalSound() {
    const animal = {
        sound: 'grrrr',
    };
    const result = getAnimalSound(animal);

    document.getElementById('sound').innerHTML = result;   
}

function getAnimalSound(animal) {
    // код для задачи №2 писать здесь
    if (animal === undefined) {
        return null;
    }else {
        animal.prototype = animal;
        const sound = animal.sound;
        return sound;
    } 
    

}

function initCalculateStatement() {
    for (let idx = 0; idx < 3; idx++) {
        const marks = document.getElementById('learner-' + idx).value.split(',');

        const average = getAverageMark(marks);

        document.getElementById('learner-' + idx + '-average').innerHTML = average;
    }
}

function getAverageMark(marks) {
    // код для задачи №3 писать здесь
    let average = 0;
    for(let i=0;i<marks.length;i++) {
        average+=parseInt(marks[i]);        
    }
    console.log(average);
    average = average/marks.length;
    let roundAverage = Math.round(average);
    return roundAverage;
    
}