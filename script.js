
// Contants --------------------------------------------------------------------

const heroPortrait = document.getElementById("hero-portrait");
const playerClassName = document.getElementById("class-label");
const playerHealthLabel = document.getElementById("player-health");
const playerArmorLabel = document.getElementById("player-armor");
const playerManaLabel = document.getElementById("player-mana");
const drawPileLabel = document.getElementById("draw-pile");
const discardPileLabel = document.getElementById("discard-pile");

const enemyHealthLabel = document.getElementById("enemy-health");
const enemyArmorLabel = document.getElementById("enemy-armor");
const enemyAttackLabel = document.getElementById("enemy-attack");

const dialogText = document.getElementById("dialog-text");

const enemyIntroDialog = document.getElementById("enemy-intro-dialog");
const enemyIntroPortrait = document.getElementById("enemy-intro-portrait");

const strikeCard = {      name:"Strike",      type:"damage",  value:5,  cost:1 }
const bigStrikeCard = {   name:"Strike",      type:"damage",  value:8,  cost:1 }
const armorCard = {       name:"Armor",       type:"armor",   value:5,  cost:1 }
const bigArmorCard = {    name:"Big Armor",   type:"armor",   value:12, cost:2 }
const fireballCard = {    name:"Fireball",    type:"damage",  value:7,  cost:1 }
const manaCard = {        name:"Replenish",   type:"mana",    value:3,  cost:1 }

const enemyMaddie = {     name: "Maddie the Baddie", health: 29, attackDamage: 7 }

// Variables --------------------------------------------------------------------

let deck = [];
let discard = [];
let currentEnemy = enemyMaddie;
let handSize = 0;
let playerHealth = 100;
let playerArmor = 0;
let playerMana = 3;
let enemyHealth = 100;

// Functions --------------------------------------------------------------------

function showMainMenu() {
    showElement('title-menu');
    hideElement('dialog-menu');
    hideElement('battle-screen');
    hideElement('hero-select-menu');
    hideHeroSidebar()

    //reset everything here
}

function showElement(id) {
    document.getElementById(id).style.display = "block";
}

function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

function setDialog(text) {
    dialogText.innerText = text;
}

function showHeroSelect() {
    hideElement('title-menu');
    showElement('hero-select-menu');
}


function showHeroSidebar() {
    heroPortrait.style.opacity = 1;
    playerClassName.style.opacity = 1;
    playerHealthLabel.style.opacity = 1;
    playerArmorLabel.style.opacity = 1;
    playerManaLabel.style.opacity = 1;
}

function hideHeroSidebar() {
    heroPortrait.style.opacity = 0;
    playerClassName.style.opacity = 0;
    playerHealthLabel.style.opacity = 0;
    playerArmorLabel.style.opacity = 0;
    playerManaLabel.style.opacity = 0;
}


function showDialogMenu() {
    showElement('dialog-menu');
    hideElement('hero-select-menu');
    hideElement('battle-screen');
    showHeroSidebar();
    enemyIntroDialog.innerText = "Before you stands a shaman armored in boar bones and wet sinew, wielding a gore-encrusted axe..."
}

function showEnemyIntro() {
    showElement('enemy-intro-menu');
    hideElement('dialog-menu');
}

function startBattle() {
    hideElement('enemy-intro-menu');
    showElement('battle-screen');
}

function selectHero(type) {
if(type === 'warrior') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/hero.png';
    playerClassName.innerText = "Warrior";
    setDialog("The armored warrior lifted his massive shield and set out to destroy the great evil that has infested the realm. An army of undead now stand between the knight and glory...")
} else if(type === 'wizard') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/hero-wizard.png';
    playerClassName.innerText = "Wizard";
    setDialog("The wizard emerged from his secluded tower, ready to vanquish the slavering undead hordes. The necromancers had stolen knowledge from his tower, and would soon feel his arcane wrath...")
} else if(type === 'barbarian') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/barbarian.png';
    playerClassName.innerText = "Barbarian";
    setDialog("The barbarian lifted her ancient sword, and set out to crush her enemies. She smiled, knowing that soon, she would see the undead driven before her, and hear the lamentations of their evil makers...")
}
    console.log('Player selected' + type)
    showDialogMenu();
    showHeroSidebar();
}

function cardWithName(name) {
    switch (name) {
        case "attack":
            return strikeCard;
            break;
        case "armor":
            return armorCard;
            break;
        case "bigArmor":
            return bigArmorCard;
            break;
        default:
          console.log("ERROR: INVALID CARD")
          break;
    }
}

function handleCardClick(cardElement, card) {
    console.log(card + " played!")
    discard.push(card)
    cardElement.remove();
    //check if card can be played
    //move card from hand to discard pile
    //do card thing
    //check that enemy health > 0 (if so, end battle)
}

function drawCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card;
    cardElement.style.backgroundImage = "url('img/strike-card.png')";
    cardElement.style.backgroundSize = "100%";
    cardElement.addEventListener('click', function() {
        handleCardClick(cardElement, card);
    });
    const playerHand = document.getElementById('player-hand');
    playerHand.appendChild(cardElement);
    handSize++;
}

function dealCards (count) {
    while (handSize < 5) {
        if (deck.length === 0) {
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
    console.log("win");
    
}

function gameOver() {
    console.log("lose");
}

function newGame () {
    mainMenu.hidden = true;
    battleMenu.hidden = false;
    deck = ["strike", "strike", "strike", "strike", "strike", "armor", "armor", "big_armor"];
    newBattle();
}

function newBattle() {
    currentEnemy = enemyMaddie;
    playerHealth = 100;
    playerArmor = 0;
    enemyAttack = 0;
    enemyHealth = currentEnemy.health;
    deck = deck.sort(() => Math.random() - 0.5);
    beginNextTurn();
}

function beginNextTurn () {
    if (playerHealth <= 0) {
        gameOver();
    }
    enemyAttack = currentEnemy.attackDamage;
    playerMana = 3;
    dealCards(5);
    console.log(handSize);
    console.log("playerHealth: " + playerHealth);
    console.log("playerArmor: " + playerArmor);
    console.log("enemyAttack: " + enemyAttack);
    console.log("enemyHealth: " + enemyHealth);
    console.log("playerMana: " + playerMana);
    console.log("currentEnemy: " + currentEnemy.name);
    console.log("Deck: " + deck);
}

// Entry Point --------------------------------------------------------------------

showMainMenu();

