'use strict'
function setDailyRhythm(wakeUpTime,bedTime) {
    const formatTime = t => t < 10 ? '0' + t : t;
    const goodMorning = () => alert('Доброе утро');
    const wakeUp = setAlarm(wakeUpTime,goodMorning);
    const goodNight = () => alert('Доброй ночи');
    const bed = setAlarm(bedTime,goodNight);
    let time;
    const wakeUpInterval = setInterval(()=>{
        time = String(new Date().getHours()) + ':' + String(formatTime(new Date().getMinutes()));
        console.log(time,wakeUpTime);
        wakeUp(time);
        if(wakeUpTime === time) clearInterval(wakeUpInterval);
    },1000);
    
    const bedInterval = setInterval(() =>{
        time = String(new Date().getHours()) + ':' + String(formatTime(new Date().getMinutes()));
        console.log(time,bedTime);
        bed(time);
        if(bedTime === time) clearInterval(bedInterval);
    },1000);
}

function setAlarm(time,callback) {
    return function(nowTime){
        if (time === nowTime) callback();
    }
}

console.log(setDailyRhythm('13:37','13:38'));