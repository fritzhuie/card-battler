
// Contants --------------------------------------------------------------------

const heroPortrait = document.getElementById("hero-portrait");
const playerClassName = document.getElementById("class-label");
const playerHealthLabel = document.getElementById("player-health");
const playerArmorLabel = document.getElementById("player-armor");
const playerManaLabel = document.getElementById("player-mana");

const enemyHealthLabel = document.getElementById("enemy-health");
const enemyArmorLabel = document.getElementById("enemy-armor");
const enemyAttackLabel = document.getElementById("enemy-attack");

const strikeCard = {      name:"Strike",      type:"damage",  value:5,  cost:1 }
const bigStrikeCard = {   name:"Strike",      type:"damage",  value:8,  cost:1 }
const armorCard = {       name:"Armor",       type:"armor",   value:5,  cost:1 }
const bigArmorCard = {    name:"Big Armor",   type:"armor",   value:12, cost:2 }
const fireballCard = {    name:"Fireball",    type:"damage",  value:7,  cost:1 }
const manaCard = {        name:"Replenish",   type:"mana",    value:3,  cost:1 }

const enemyMaddie = {     name: "Maddie the Baddie", health: 29, attackDamage: 7 }

// Variables --------------------------------------------------------------------

var deck = [];
var discard = [];
var currentEnemy = enemyMaddie;
var handSize = 0;
var playerHealth = 100;
var playerArmor = 0;
var playerMana = 3;
var enemyHealth = 100;

// Functions --------------------------------------------------------------------

function showMainMenu() {
    showElement('title-menu');
    hideElement('dialog-menu');
    hideElement('battle-screen');
    hideElement('hero-select-menu');
    hideHeroSidebar()

    //reset everything
}

function showElement(id) {
    document.getElementById(id).style.display = "block";
}

function hideElement(id) {
    document.getElementById(id).style.display = "none";
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
}

function startBattle() {
    hideElement('dialog-menu');
    showElement('battle-screen');
}

function selectHero(type) {
if(type === 'warrior') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/hero.png';
    playerClassName.innerText = "Warrior"
} else if(type === 'wizard') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/hero-wizard.png';
    playerClassName.innerText = "Wizard"
} else if(type === 'barbarian') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/barbarian.png';
    playerClassName.innerText = "Barbarian"
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

