
// Constants --------------------------------------------------------------------

const heroPortrait = document.getElementById("hero-portrait");
const playerClassName = document.getElementById("class-label");
const playerHealthLabel = document.getElementById("player-health");
const playerArmorLabel = document.getElementById("player-armor");
const playerManaLabel = document.getElementById("player-mana");

const drawPileLabel = document.getElementById("draw-pile");
const drawPileImage = document.getElementById("draw-pile-image");

const enemyHealthLabel = document.getElementById("enemy-health");
const enemyArmorLabel = document.getElementById("enemy-armor");
const enemyAttackLabel = document.getElementById("enemy-attack");

const enemyIntroDialog = document.getElementById("enemy-intro-dialog");
const enemyIntroPortrait = document.getElementById("enemy-intro-portrait");

const enemyShaman = { 
    name: "Orthic Shaman", 
    health: 29, 
    actions: { "The shaman jabs at you with its tusks!": 4 },
    description: "Before you stands a ghoul shrouded in boar bones and wet sinew, wielding a gore-encrusted axe..."
}

const enemyUndead = { name: "Necrotic Barbarian", health: 31, actions: 7 }
const enemyRaptor = { name: "Mecharaptor", health: 48, actions: [5,5,7,7] }
const enemyWizard = { name: "Fallen Wizard", health: 29, actions: [0,12,0,12] }

// Variables --------------------------------------------------------------------

let deck = [];
let discard = [];
let handSize = 0;
let currentEnemy = enemyShaman;
let playerHealth = 100;
let playerArmor = 0;
let playerMana = 3;
let enemyHealth = 100;
let enemyArmor = 0;

// Functions --------------------------------------------------------------------

function showMainMenu() {
    showElement('title-menu');
    hideElement('dialog-menu');
    hideElement('battle-screen');
    hideElement('hero-select-menu');
    hideHeroSidebar();

    //reset everything here
}

function showElement(id) {
    document.getElementById(id).style.display = "block";
}

function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

function setDialog(text) {
    document.getElementById("dialog-text").innerText = text;
}

function showHeroSelect() {
    hideElement('title-menu');
    showElement('hero-select-menu');
}

function hideHeroSidebar() {
    heroPortrait.style.opacity = 0;
    playerClassName.style.opacity = 0;
    playerHealthLabel.style.opacity = 0;
    playerArmorLabel.style.opacity = 0;
    playerManaLabel.style.opacity = 0;
    drawPileLabel.style.opacity = 0;
    drawPileImage.style.opacity = 0;
    document.getElementById("hero-sidebar").style.display = "none";
}

function showHeroSidebar() {
    heroPortrait.style.opacity = 1;
    playerClassName.style.opacity = 1;
    playerHealthLabel.style.opacity = 1;
    playerArmorLabel.style.opacity = 1;
    playerManaLabel.style.opacity = 1;
    drawPileLabel.style.opacity = 1;
    drawPileImage.style.opacity = 1;
    document.getElementById("hero-sidebar").style.display = "flex";
}


function showDialogMenu() {
    showElement('dialog-menu');
    hideElement('hero-select-menu');
    hideElement('battle-screen');
    showHeroSidebar();
    enemyIntroDialog.innerText = "no dialog loaded"
}

function showEnemyIntro() {
    showElement('enemy-intro-menu');
    hideElement('dialog-menu');
}

function startBattle() {
    hideElement('enemy-intro-menu');
    showElement('battle-screen');
    newBattle();
}

function selectHero(type) {
if(type === 'warrior') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/warrior-portrait.png';
    document.getElementById('dialog-button').innerText = "FOR THE KING!";
    playerClassName.innerText = "Warrior";
    setDialog("Tasked with ending undead activity within the kingdom, the smell of putrid air fills the warrior's helmet as he enters the crypts...")
} else if(type === 'wizard') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/wizard-portrait.png';
    document.getElementById('dialog-button').innerText = "THEY WILL PAY!";
    playerClassName.innerText = "Wizard";
    setDialog("The wizard emerges from his secluded tower, ready to vanquish the slavering undead hordes at his doorstep. The necromancers have stolen forbidden knowledge from his tower, and it must be returned...")
} else if(type === 'barbarian') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/barbarian-portrait.png';
    document.getElementById('dialog-button').innerText = "RAMPAGE!";
    playerClassName.innerText = "Barbarian";
    setDialog("The barbarian lifted her ancient sword, and smiled. She will crush her enemies, see them driven before her, and hear the lamentations of the cultists...")
}
    console.log('Player selected' + type)
    showDialogMenu();
    showHeroSidebar();
}

function highlightHero(type) {
    if(type === 'warrior') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/warrior.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "cover";
    } else if(type === 'wizard') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/wizard.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "cover";
    } else if(type === 'barbarian') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/barbarian.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "cover";
    }
}

function unhighlightHero() {
    document.getElementById("hero-select-menu").style.backgroundImage = "url('img/selection-bg.png')";
    document.getElementById("hero-select-menu").style.backgroundSize = "cover";
}

function hurtEnemy(value) {
    enemyHealth-=value;
    enemyHealthLabel = enemyHealth;
}

function gainArmor(value) {
    playerArmor+=value;
}

function gainMana(value) {
    playerMana = 3;
}

function cardWithName(name) {

    const strikeCard = {      name:"Strike",      type:"damage",  value:5 }
    const bigStrikeCard = {   name:"Strike",      type:"damage",  value:8 }
    const armorCard = {       name:"Armor",       type:"armor",   value:5 }
    const bigArmorCard = {    name:"Big Armor",   type:"armor",   value:12}
    const fireballCard = {    name:"Fireball",    type:"damage",  value:7 }
    const manaCard = {        name:"Replenish",   type:"mana",    value:3 }

    const cardImage = {
        "strike":"strike-card.png",
        "bigStrike":"big-strike-card.png",
        "armor":"armor-card.png",
        "bigArmor":"big-armor-card.png",
        "fireball":"fireball-card.png",
        "replenish":"replenish-card.png"
    }

    switch (name) {
        case "attack":
            return strikeCard;
            break;
        case "armor":
            return armorCard;
            break;
        default:
          console.log("ERROR: INVALID CARD")
          break;
    }
}

function drawCard(card) {

    console.log("Card drawn -> " + card);

    const cardElement = document.createElement('div');
    cardElement.style.backgroundImage = 'url(img/strike-card.png';
    cardElement.style.backgroundSize = "contain";
    cardElement.style.fontSize = 0;
    cardElement.innerText = card;
    cardElement.classList.add('card');

    const playerHand = document.getElementById('player-hand');
    playerHand.appendChild(cardElement);
    cardElement.addEventListener('click', function() {
        handleCardClick(cardElement);
    });

    handSize++;
}

function handleCardClick(cardElement) {
    const cardName = cardElement.innerText;
    const card = cardWithName(cardName);
    cardElement.remove();

    console.log(cardName);
    console.log(card);

    if (card.type === "damage") {
        hurtEnemyFor(card.value);
    } else if (card.type === "armor") {
        gainArmor(card.value)
    } else if (card.type === "mana" ) {
        gainMana(card.value);
    }

    if (enemyHealth <= 0 ) {
        win();
    }

    discard.push(cardName);

}

function dealCards (count) {
    while (handSize < 5) {
        if (deck.count === 0) {
            recycleDiscard()
        }

        drawCard(deck.pop());
    }
}

function recycleDiscard() {
    while (discard.length > 0) {
        deck.push(discard(pop));
    }
    deck = deck.sort(() => Math.random() - 0.5);
}

function win() {
    dialogText.innerText == "One evil has been defeated. But many more enemies await...";
    playerArmor = 0;
    playerMana = 3;
    // TODO: queue up random monster, reset monster hp
    showDialogMenu();
}

function gameOver() {
    console.log("lose");
}

function newBattle() {
    // currentEnemy = enemyMaddie;
    playerHealth = 100;
    playerArmor = 0;
    enemyAttack = 0;
    // enemyHealth = currentEnemy.health;
    deck = ["strike", "strike", "strike", "strike", "strike", "armor", "armor"];
    deck = deck.sort(() => Math.random() - 0.5);
}

function beginNextTurn () {
    if (playerHealth <= 0) {
        gameOver();
    }
    enemyAttack = currentEnemy.attackDamage;
    playerMana = 3;
    dealCards(5);
}

// Entry Point --------------------------------------------------------------------

showMainMenu();

