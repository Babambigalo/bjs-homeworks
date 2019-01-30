'use strict'
//задача1
class StudentLog {
    
    constructor(fullName){
        this.fullName = fullName;
        this.subjects = {};
    }
    

    getName() {
        return this.fullName;
    }

    addGrade(grade,subject) {
        if(typeof Number(grade) === 'number' && Number(grade)<6 && Number(grade) > 0) {
                            
            if(this.subjects[subject] !== undefined) {
                this.subjects[subject].push(grade);
            }else {
                this.subjects[subject] = [grade];
            }
        }else {
            console.log(`Вы пытались поставить оценку "${grade}" по предмету "${subject}" . Допустимый предел: 0-5`);
        }
    } 

    getAverageBySubject(subject) {
        let gradeSum = 0;
        let average = 0;
        if (this.subjects[subject] !== undefined) {
            for(let i = 0; i<this.subjects[subject].length;i++) {
                gradeSum += this.subjects[subject][i];
            }
            average = gradeSum/this.subjects[subject].length;
        }
        console.log(average);        
    }

    showSubjects() {
        return this.subjects;
    }
    
    getTotalAverage() {
        if (this.subjects !== {}) {
            let totalGrade = 0;
            let totalLengthOfGrade = 0;
            let totalAverage = 0;
            for(let subject in this.subjects) {
                totalLengthOfGrade+=this.subjects[subject].length;
                for(let i=0;i<this.subjects[subject].length;i++){
                    totalGrade+=this.subjects[subject][i];
                }
            }
            totalAverage = totalGrade/totalLengthOfGrade;
            return totalAverage;

        }else {
            return 0;
        }
    }

    getGradesBySubject(subject) {
        if(this.subjects[subject] !== undefined) {
            return this.subjects[subject];
        }else {
            return [];
        }
    }

    getGrades(){
        return this.subjects;
    }


}

const log = new StudentLog('Jamal Buatang');
(log.getName());
(log.addGrade(2,'algebra'));
(log.addGrade(4,'algebra'));
(log.addGrade(5,'geometry'));
(log.addGrade(4,'geometry'));
(log.addGrade(3,'pool'));
console.log(log.getGrades());

//задача2
class Weapon {
    constructor(name,attack,durability,range){
        this.name = name;
        this.attack = attack;
        this.durability = durability;
        this.range = range;
    }

    takeDamage(damage){
        this.durability -= damage;
        if(this.durability < 0) this.durability = 0;       
    }

    getDamage(){
        let thirtyPercent = 0.3;
        if(this.durability >= this.initDurability * thirtyPercent){
            return this.attack;

        }else if((this.durability < this.initDurability * thirtyPercent) && this.durability >=0){
            return this.attack/2;

        }else {
            return 0;
        }        
    }

    isBroken(){
        if(this.durability === 0) return true;
    }
}

class Arm extends Weapon {
    constructor(){
        super('Рука',1,Infinity,1);
        this.initDurability = Infinity;
    }
}

class Bow extends Weapon{
    constructor(){
        super('Лук',10,200,3);
        this.initDurability = 200;
    }    
}

class Sword extends Weapon {
    constructor(){
        super('Меч',25,500,1);
        this.initDurability = 500;
    }
}

class Knife extends Weapon {
    constructor() {
        super('Нож',5,300,1);
        this.initDurability = 300;
    }
}

class Staff extends Weapon{
    constructor(){
        super('Посох',8,300,2);
        this.initDurability = 300;
    }
}

class LongBow extends Bow {
    constructor() {
        super('Длинный лук',15,200,4);
    }
}

class Axe extends Sword {
    constructor() {
        super('Секира',27,800,1);
        this.initDurability = 800;
    }
}

class StormStuff extends Staff {
    constructor() {
        super('Посох Бури',10,300,3);
    }
}

class Player {
    constructor(name,position){
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm;
        this.name = name;
        this.position = position;
    }

    getLuck(){
        let randomNumber = Math.round(Math.random() * 100);
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance){
        let damage = 0;
        if (distance<=this.weapon.range && distance !==0) {
            damage = (this.attack + this.weapon.getDamage())*this.getLuck() / distance;
        }
        return damage;
    }

    takeDamage(damage) {
        this.life -= damage;
        if(this.life >= 0) {
            return this.life;
        }else{
            return 0;
        }
    }

    isDead() {
        if (this.life === 0) {
            return true;
        }else {
            return false;
        }
    }

    moveLeft(distance) {
        if(this.speed >= distance){
            this.position -=distance;
        }else {
            this.position -=this.speed;
        }        
    }

    moveRight(distance) {
        if(this.speed >= distance){
            this.position +=distance;
        }else {
            this.position +=this.speed;
        }
        
    }

    move(distance) {
        (distance < 0) ? this.moveLeft(distance) : this.moveRight(distance);
    }

    isAttackBlocked() {
        if(this.getLuck() > (100 - this.luck)/100) {
            return true;
        }else {
            return false;
        }
    }

    dodged() {
        if(this.getLuck() > (100-this.agility - this.speed * 3)/100){
            return true;
        }else {
            return false;
        }
    }

    takeAttack(damage) {
        if(this.isAttackBlocked()) this.weapon.takeDamage(damage);
        if(!this.dodged()) this.life -= damage; 
    }

    checkWeapon() {
        if(this.weapon.name !== 'Нож' && this.weapon.name !== 'Рука' && this.weapon.isBroken()) this.weapon = new Knife;
        if (this.weapon.name === 'Нож' && this.weapon.isBroken()) this.weapon = new Arm;
    }

    tryAttack(enemy) {
        let distance = Math.max(this.position,enemy.position) - Math.min(this.position,enemy.position);
        if (this.weapon.range >= distance ) {
            this.weapon.takeDamage(10*this.getLuck());
            enemy.takeAttack(this.getDamage(distance));
            if(this.position === enemy.position){
                enemy.moveLeft(distance); 
                enemy.takeAttack(this.getDamage(distance)*2);
            } 
        }
    }

    chooseEnemy(players) {
        let enemy = '';
        if(players[0].name !== this.name){
            enemy = players[0];            
        } else {
            enemy = players[1];           
        }
        for(let i=0;i<players.length;i++) {
            if(players[i].life < enemy.life && players[i].name !== this.name) {
                enemy = players[i];
            }
        }
    }

    moveToEnemy(enemy) {
        let distance = Math.max(this.position,enemy.position) - Math.min(this.position,enemy.position);
        if(this.position > enemy.position) this.moveLeft(distance);
        if(this.position < enemy.position) this.moveRight(distance);
 
    }

    turn(players) {
        let enemy = this.chooseEnemy(players);
        this.moveToEnemy(enemy);
        this.tryAttack(enemy);        
    }

    play(players) {
        for(let i=0;i<players.length;i++){
            players[i].turn()
        }
    }

    
}

class Warrior extends Player {
    constructor(name,position){
        super(name,position);
        this.life = 120;
        this.speed = 2;
        this.attack = 10;
        this.description = 'Воин';
        this.weapon = new Sword;
        this.initLife = 120;
    }

    takeDamage(damage) {
        if(this.life < (this.initLife / 2) && this.getLuck() > 0.8) {
            console.log(this.magic > 0);
            (this.magic > 0) ? this.magic -=damage : this.life -= damage;
        }else {
            this.life -= damage;
        }
    }
}

class Archer extends Player {
    constructor(name,position) {
        super(name,position);
        this.life = 80;
        this.magic = 35;
        this.attack = 5;
        this.agility = 10;
        this.description = 'Лучник';
        this.weapon = new Bow;    
    }

    getDamage(distance) {
        let damage = (this.attack + this.weapon.getDamage())*getLuck()*distance/this.weapon.range;
        return damage;
    }
}

class Mage extends Player {
    constructor(name,position) {
        super(name,position);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff;
        this.initMagic = 100;
    }

    takeDamage(damage) {
        if(this.magic > this.initMagic / 2) {
            this.life = Math.round(this.life - (damage/1.5));
            this.magic -= 12;
        }else {
            this.life -=damage;
        }
        if(this.life <= 0) this.life = 0;
    }
} 

class Dwarf extends Warrior {
    constructor(name,position) {
        super(name,position);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe;
        this.quantityHitsOfEnemy = 0;
    }

    takeDamage(damage) {
        if(this.quantityHitsOfEnemy % 6 === 0 && this.getLuck() > 0.5) this.life -= damage/2;                             
    }


}

class Crossbowman extends Archer {
    constructor(name,position) {
        super(name,position);
        this.life = 85;
        this.attack = 8;
        this.agility = 20;
        this.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow;
    }
}

class Demiurge extends Mage {
    constructor(name,position) {
        super(name,position);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStuff;
    }

    getDamage() {
        let damage = getDamage();
        if(this.magic > 0 && this.getLuck() > 0.6)  {            
            damage = this.getDamage()*1.5;
        }
        return damage;
    }
}


let player1 = new Warrior('Васька',0);
let player2 = new Warrior('Петька',1);

player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);

player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);
player1.tryAttack(player2);
console.log(player2.life,player2.magic);



