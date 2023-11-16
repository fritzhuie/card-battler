

var playerHealth = document.getElementById("player-health");
var playerArmor = document.getElementById("player-armor");
var playerMana = document.getElementById("player-mana");
var enemyHealth = document.getElementById("enemy-health");
var enemyArmor = document.getElementById("enemy-armor");
var enemyAttack = document.getElementById("enemy-attack");

function showMainMenu() {
    showElement('title-menu');
    hideElement('hero-sidebar');
    hideElement('dialog-menu');
    hideElement('battle-screen');
    hideElement('hero-select-menu');

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
    showElement('hero-sidebar');
}

function hideHeroSidebar() {
    hideElement('hero-sidebar');
}

function showDialogMenu() {
    showElement('dialog-menu');
    hideElement('hero-select-menu');
    hideElement('battle-screen');
}

function startBattle() {
    hideElement('dialog-menu');
    showElement('battle-screen');
}

showElement('title-menu');

function selectHero(type) {
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

var strikeCard = {
    name:"Strike",
    type:"damage",
    value:5,
    cost:1,
    id: 0
}
var armorCard = {
    name:"Protec",
    type:"armor",
    value:5
}
var bigArmorCard = {
    name:"BigProtec",
    type:"armor",
    value:12,
    cost:2
}

var enemyMaddie = {
    name: "Maddie the Baddie",
    health: 29,
    attackDamage: 7
}

var deck = [];
const discard = [];
var handSize = 0;

var playerHealth = 100;
var playerMana = 3;
var playerArmor = 0;

var currentEnemy = enemyMaddie;
var enemyHealth = 0;
var enemyAttack = 0;

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
    playerHealth = playerHealth - enemyAttack;
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

