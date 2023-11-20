// Variables --------------------------------------------------------------------

let heroPortrait = document.getElementById("hero-portrait");
let playerClassName = document.getElementById("class-label");
let playerHealthLabel = document.getElementById("player-health");
let playerArmorLabel = document.getElementById("player-armor");
let playerManaLabel = document.getElementById("player-mana");
let drawPileLabel = document.getElementById("draw-pile");
let drawPileImage = document.getElementById("draw-pile-image");
let enemyHealthLabel = document.getElementById("enemy-health");
let enemyArmorLabel = document.getElementById("enemy-armor");
let enemyAttackLabel = document.getElementById("enemy-attack");
let enemyIntroPortrait = document.getElementById("enemy-intro-portrait");

let deck = [];
let discard = [];
let handSize = 0;
let currentEnemy = null;
let playerHealth = 100;
let playerArmor = 0;
let playerMana = 3;
let enemyHealth = 100;
let enemyArmor = 0;

// Classes ----------------------------------------------------------------------

class Enemy {
    constructor(name, description, health, actions, portraitUrl) {
        this.name = name;
        this.description = description;
        this.health = health;
        this.actions = actions;
        this.portraitUrl = portraitUrl;
    }

    performAttack(description, damage) {
        playerHealth = playerHealth - damage;
        playerHealthLabel = playerHealth;
        console.log(description);
    }

    die() {
        console.log(`${this.name} has been defeated.`);
    }
}

const strikeCard = {      name:"Strike",      type:"damage",  value:5 , portrait: "url(img/strike-card.png)"};
const bigStrikeCard = {   name:"Strike",      type:"damage",  value:8 , portrait: "url(img/big-strike-card.png)"};
const armorCard = {       name:"Armor",       type:"armor",   value:5 , portrait: "url(img/armor-card.png)"};
const bigArmorCard = {    name:"Big Armor",   type:"armor",   value:12, portrait: "url(img/big-armor-card.png)"};
const fireballCard = {    name:"Fireball",    type:"damage",  value:7 , portrait: "url(img/fireball-card.png)"};
const manaCard = {        name:"Replenish",   type:"mana",    value:3 , portrait: "url(img/replenish-card.png)"};

let enemyShaman = new Enemy (
    "Orthic Shaman",
    "Before you stands a ghoul shrouded in boar bones and wet sinew, wielding a gore-encrusted axe...",
    29,
    [   { description: "Orthic Shaman jabs at you with its tusks", damage: 4},
        { description: "Orthic Shaman swings its putrid axe", damage: 7}
    ],
    "url(img/axe-shaman.png)"
    );

let enemyUndead = new Enemy (
    "Necrotic Barbarian",
    "Undead with sword",
    31,
    [["The wight swings its greatsword in a wide arch", 7]],
    "url(img/female-undead.png)"
)

    // const enemyRaptor = { name: "Mecharaptor", health: 48, actions: [5,5,7,7] }
    // const enemyWizard = { name: "Fallen Wizard", health: 29, actions: [0,12,0,12] }

// Functions --------------------------------------------------------------------

function showMainMenu() {
    showElement('title-menu');
    hideElement('dialog-menu');
    hideElement('battle-screen');
    hideElement('hero-select-menu');
    hideHeroSidebar();
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

function inititalizeRandomEnemy () {

    let remainingEnemies = [enemyShaman, enemyUndead];
    remainingEnemies = remainingEnemies.sort(() => Math.random() - 0.5); //randomize
    currentEnemy = remainingEnemies.pop();

    setDialog( currentEnemy.description );

    console.log(currentEnemy);

    enemyHealthLabel = currentEnemy.health;
    enemyArmorLabel = currentEnemy.armor;
    enemyAttackLabel = currentEnemy.name + " growls menacingly...";
    enemyAttack = 0;
    enemyIntroPortrait = currentEnemy.portraitUrl;
}

function showDialogMenu() {
    showElement('dialog-menu');
    hideElement('hero-select-menu');
    hideElement('battle-screen');
    showHeroSidebar();
}

function showEnemyIntro() {
    inititalizeRandomEnemy();
    showElement('enemy-intro-menu');
    hideElement('dialog-menu');
}

function startBattle() {
    hideElement('enemy-intro-menu');
    showElement('battle-screen');
    
    playerHealth = 100;
    playerArmor = 0;
    deck = ["strike", "strike", "strike", "strike", "strike", "armor", "armor"];
    deck = deck.sort(() => Math.random() - 0.5);
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
    if (currentEnemy.health <= 0 ) {
        win();
    }
}

function gainArmor(value) {
    playerArmor+=value;
}

function gainMana(value) {
    playerMana = 3;
}

function cardWithName(name) {

    console.log("cardWithName:" + name);

    if (name === "strike") { return strikeCard; }
    if (name === "armor") { return armorCard; }
    if (name === "strike") { return strikeCard; }
    if (name === "strike") { return strikeCard; }
    if (name === "strike") { return strikeCard; }

}

function drawCard(cardName) {

    console.log("Card drawn -> " + cardName);

    const card = cardWithName(cardName);

    const cardElement = document.createElement('div');
    cardElement.style.backgroundImage = card.portrait;
    cardElement.style.backgroundSize = "contain";
    cardElement.style.fontSize = 0;
    cardElement.innerText = cardName;
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
    console.log("Playing card: " + card);
    cardElement.remove();

    if (card.type === "damage") {
        console.log("attack with :" + cardName);
        hurtEnemy(card.value);
    } else if (card.type === "armor") {
        gainArmor(card.value)
    } else if (card.type === "mana" ) {
        gainMana(card.value);
    }

    if (enemyHealth <= 0 ) {
        win();
    }

    handSize = handSize - 1;
    discard.push(cardName);

}

function dealCards (count) {
    console.log("deal cards | Deck: " + deck.length + " Discard: " + discard.length + " Hand: " + handSize);
    while (handSize < 5) {
        if (deck.length === 0) {
            recycleDiscard()
        }
        drawCard(deck.pop());
    }
}

function recycleDiscard() {
    while (discard.length > 0) {
        deck.push(discard.pop());
    }
    deck = deck.sort(() => Math.random() - 0.5);
}

function win() {
    dialogText.innerText == "One evil has been defeated. But many more enemies await...";
    document.getElementById('dialog-button').innerText = "Continue";
    playerArmor = 0;
    showDialogMenu();
}

function gameOver() {
    console.log("lose");
}

function beginNextTurn () {

    console.log(currentEnemy.nextAction);

    if ( currentEnemy && currentEnemy.nextAction && currentEnemy.nextAction.description ) {
        currentEnemy.performAttack(currentEnemy.nextAction.description, currentEnemy.nextAction.damage);
    }

    if (playerHealth <= 0) {
        gameOver();
        return;
    }

    currentEnemy.nextAction = currentEnemy.actions.sort(() => Math.random() - 0.5);
    enemyAttack = currentEnemy.nextAction.damage;
    enemyAttackLabel = currentEnemy.nextAction.damage;
    playerMana = 3;

    dealCards(5);
}

// Entry Point --------------------------------------------------------------------

showMainMenu();

