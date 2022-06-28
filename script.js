//? ─── PACKAGES ───────────────────────────────────────────────────────────────────
    
const inquirer = require('inquirer');

const figchalk = require('figchalk');

const prompt = require('prompt-sync')({sigint:false});

const chalk = require('chalk');

//* ─── CLASSES ────────────────────────────────────────────────────────────────────
    
class Pokemon {
    constructor(name, health, stamina, title) {
        this.name = name
        this.health = health
        this.stamina = stamina
        this.title = title
        this.skills = [];
    }
    
    learnAttackSkill(attack) {
        for(let i of attack) {
            this.skills.push(i)
        }
    }
}

class AttackSkill {
    constructor(name, power, cost) {
        this.name = name
        this.power = power
        this.cost = cost
    }
}

//! ─── ATTACK VARIABLES ───────────────────────────────────────────────────────────
    
let itaGesture = new AttackSkill("Italian Hand Gesture", 50, 50);
let itsame = new AttackSkill("It's a me", 30, 10)
let socCon = new AttackSkill("Social Construct", 80, 20)
let recover = new AttackSkill("Recover", 0, 0)

let cclight = new AttackSkill('Coca Cola Lightbeam', 50, 20)
let chattack = new AttackSkill('Chicken Attack', 25, 10)
let hedge = new AttackSkill('Hedghog Throw', 100, 50)
let cczero = new AttackSkill('Coca Cola ZeroGravity', 35, 15)

let doingThomas = new AttackSkill('Pulling a Thomas', 0, 0)
let overFishing = new AttackSkill('Over Fishing', 50, 25)
let explodingLaptop = new AttackSkill('Exploding DCI Laptop', 100, 50)

let mshrooms = new AttackSkill('Magic Mushroom Throw', 75,25)
let armyChild = new AttackSkill('Army of Children', 50, 30)
let msgBelt = new AttackSkill('Massage Belt', 25, 10)

let gallonHoney = new AttackSkill('Gallon of Honey', 35, 10)
let malakas = new AttackSkill('μαλάκας', 60, 15)
let ternary = new AttackSkill('Ternary Operator', 40, 20)

let turnInvis = new AttackSkill('Turn Invisible', 50, 25)
let yada = new AttackSkill('やだ', 60, 25)
let rgbSupremacy = new AttackSkill('RGB Supremacy', 80, 30)

let banana = new AttackSkill('Banana Throw', 50, 25)
let fishrodhit = new AttackSkill('Fishrod Hit', 60, 30)
let searchEngine = new AttackSkill('Google Search Engine', 40, 20)

let leaveEarly = new AttackSkill('Leaving Early', 60, 30)
let report = new AttackSkill('Report', 30, 10)
let slack = new AttackSkill('Slack Administrative Rights', 80, 50)

//? ─── CHARACTER VARIABLES ────────────────────────────────────────────────────────
 
let orazio = new Pokemon('Orazio', 150, 100, 'Sage of Sicilia')
orazio.learnAttackSkill([itaGesture, itsame, socCon, recover])

let sofia = new Pokemon('Sofia', 150, 150, 'Finder of Animals')
sofia.learnAttackSkill([cclight, chattack, cczero, hedge])

let thomas = new Pokemon('Thomas', 100, 200, 'Scourge of the Ostsee')
thomas.learnAttackSkill([doingThomas, overFishing, explodingLaptop, recover])

let neetu = new Pokemon('Neetu', 125, 175, 'YoTube Employee')
neetu.learnAttackSkill([mshrooms, armyChild, msgBelt, recover])

let dimosthenis = new Pokemon('Dimosthenis', 250, 100, 'Wizard of the Carousel')
dimosthenis.learnAttackSkill([gallonHoney, malakas, ternary, recover])

let dani = new Pokemon('Dani', 150, 150, 'The Invisible')
dani.learnAttackSkill([turnInvis, yada, rgbSupremacy , recover])

let dilshod = new Pokemon('Dilshod', 300, 50, 'Gatekeeper of the first Module')
dilshod.learnAttackSkill([banana, fishrodhit, searchEngine, recover])

let daniela = new Pokemon('Daniela', 200, 100, 'Ambassador of the DCI Council')
daniela.learnAttackSkill([leaveEarly, report, slack, recover])

//* ─── OTHER VARIABLES ────────────────────────────────────────────────────────────

let characterArray = [sofia, orazio, thomas, neetu, dimosthenis, dani, dilshod, daniela]
let enemyChar 
let playerChar 

//! ─── FUNCTIONS ────────────────────────────────────────────────────────────────── 

//* Stamina Function for player Character
function staminaRegain() {
    playerChar['stamina'] += 25
}

//! Stamina Function for enemy Character
function enemyStaminaRegain() {
    enemyChar['stamina'] += 25
}

//* Status Display for player Character
function self() {
    console.log(chalk.bold("YOU \n") + chalk.grey(playerChar['name'] + ", " + playerChar['title'] + " \n") + chalk.bold("[HEALTH]  ") + chalk.green.bold(playerChar['health']) + chalk.bold("\n[STAMINA] ") + chalk.yellow.bold(playerChar['stamina']) + "\n");
}

//! Status Display for enemy Character
function enemy() {
    console.log(chalk.bold('ENEMY'));
    console.log(chalk.grey(enemyChar['name'] + ", " + enemyChar['title']));
    console.log(chalk.bold("[HEALTH]  ") + chalk.green.bold(enemyChar['health']));
    console.log(chalk.bold("[STAMINA] ") + chalk.yellow.bold(enemyChar['stamina']) + "\n \n \n");
}

//* Let's player choose attack of chosen Character
async function playerAttack() {
    const battleMenu = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'Choose your Attack: \n',
        choices: [
            `${playerChar.skills[0]['name']}`,
            `${playerChar.skills[1]['name']}`,
            `${playerChar.skills[2]['name']}`,
            `${playerChar.skills[3]['name']}`
        ]
    })

    switch (battleMenu.choice) {
        case `${playerChar.skills[0]['name']}`:
            playerAttackUse(0)
            break;
            
        case `${playerChar.skills[1]['name']}`:
            playerAttackUse(1)
            break;
            
        case `${playerChar.skills[2]['name']}`:
            playerAttackUse(2)
            break;   
            
        case `${playerChar.skills[3]['name']}`:
            playerAttackUse(3)
            break;     
    }
}

//* Attack Damage/Cost Calculation
function playerAttackUse(index) {
    if (playerChar.skills[index]['name'] !== "Recover") {

        if (playerChar['stamina'] >= playerChar.skills[index]['cost']) {
            playerChar['stamina'] = playerChar['stamina'] - playerChar.skills[index]['cost'];
            console.log("\n" + playerChar['name'] + " uses " + playerChar.skills[index]['name']);
            let proceed = prompt('▼')
            enemyChar['health'] = enemyChar['health'] - playerChar.skills[index]['power']

        } else {

            console.log("Not enough stamina for this attack");
            let proceed = prompt('▼')

        }

    } else {
        console.log('You regain stamina!');
        let proceed = prompt('▼')
        staminaRegain()
    }
}

//! Enemy Attack Index Randomizer
function enemyAttack() {
    let enemyChoice = Math.floor(Math.random() * enemyChar['skills'].length)

    switch (enemyChoice) {
        case 0:
            enemyAttackUse(0)
            break;
            
        case 1:
            enemyAttackUse(1)
            break;

        case 2:
            enemyAttackUse(2)
            break;    
        
        case 3:
            enemyAttackUse(3)
            break;

    }
}

//! Enemy Attack Damage/Cost Calculation
function enemyAttackUse(index) {
    if (enemyChar.skills[index]['name'] !== "Recover") {
        if (enemyChar['stamina'] >= enemyChar.skills[index]['cost']) {

            enemyChar['stamina'] = enemyChar['stamina'] - enemyChar.skills[index]['cost'];
            console.log("\n" + enemyChar['name'] + " uses " + enemyChar.skills[index]['name']);
            let proceed = prompt('▼')
            playerChar['health'] = playerChar['health'] - enemyChar.skills[index]['power']
        } else {
            console.log(enemyChar['name'] + "has not enough stamina for" + chalk.bold(enemyChar.skills[index]['name']));
            let proceed = prompt('▼')
        }

    } else {
        console.log('Enemy regains stamina!');
        let proceed = prompt('▼')
        enemyStaminaRegain()
    }
}

//? Character Selection Inquirer Function that let's player select a character from characterArray
async function charSelect() {

    const charSelectChoice = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'SELECT YOUR CHARACTER:',
        choices: [
            `${characterArray[0]['name']}, ${characterArray[0]['title']}`,
            `${characterArray[1]['name']}, ${characterArray[1]['title']}`,
            `${characterArray[2]['name']}, ${characterArray[2]['title']}`,
            `${characterArray[3]['name']}, ${characterArray[3]['title']}`,
            `${characterArray[4]['name']}, ${characterArray[4]['title']}`,
            `${characterArray[5]['name']}, ${characterArray[5]['title']}`,
            `${characterArray[6]['name']}, ${characterArray[6]['title']}`,
            `${characterArray[7]['name']}, ${characterArray[7]['title']}`
        ]})

    switch(charSelectChoice.choice) {

        case `${characterArray[0]['name']}, ${characterArray[0]['title']}`:
            playerChar = characterArray[0]
            break;

        case `${characterArray[1]['name']}, ${characterArray[1]['title']}`:
            playerChar = characterArray[1]
            break;

        case `${characterArray[2]['name']}, ${characterArray[2]['title']}`:
            playerChar = characterArray[2]
            break;

        case `${characterArray[3]['name']}, ${characterArray[3]['title']}`:
            playerChar = characterArray[3]
            break;

        case `${characterArray[4]['name']}, ${characterArray[4]['title']}`:
            playerChar = characterArray[4]
            break;

        case `${characterArray[5]['name']}, ${characterArray[5]['title']}`:
            playerChar = characterArray[5]
            break;  

        case `${characterArray[6]['name']}, ${characterArray[6]['title']}`:
            playerChar = characterArray[6]
            break;  

        case `${characterArray[7]['name']}, ${characterArray[7]['title']}`:
            playerChar = characterArray[7]
            break;  
    }
}

//? Randomizes enemy character out of the characters left in the characterArray after player picks a character
function enemyCharSelect() {
    let enemyCharacterArray = characterArray.filter(x=>x !== playerChar)
    let enemyCharacterIndex = Math.floor(Math.random() * enemyCharacterArray.length)
    enemyChar = enemyCharacterArray[enemyCharacterIndex]
}

//! ─── MAIN GAME FUNCTION ─────────────────────────────────────────────────────────
    
async function mainGame() {
    console.clear()
    console.log(figchalk.mix("DCImon", "blue"));

    const mainGameChoice = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'MAIN MENU',
        choices: [
            'START GAME',
            'EXIT GAME',
        ]})

    switch (mainGameChoice.choice) {
        case 'START GAME':

            console.clear()
            await charSelect()
            
            enemyCharSelect()

            do {   //! MAIN LOOP

            console.clear()
            enemy()
            self()

            await playerAttack()

            if (enemyChar['health'] > 0) {
            enemyAttack()
            }

            } while (enemyChar['health'] > 0 && playerChar['health'] > 0)

            if (enemyChar['health'] <= 0) {     //! ENEMY HEALTH HITS ZERO OR LESS AND YOU WIN 
                console.clear()
                enemy()
                self()
                console.log(figchalk.mix("You Win!", "green", "Graffiti",));
            } else {        //! YOUR HEALTH HITS ZERO OR LESS AND YOU LOSE
                console.clear()
                enemy()
                self()
                console.log(figchalk.mix("You Lose!", "red", "Ghost"));
            }
            break;

        case 'EXIT GAME':
            break;
    }
}

mainGame();