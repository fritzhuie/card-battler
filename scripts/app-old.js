let engine = new CardGame();
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
let enemyIntroDescription = document.getElementById("enemy-intro-description");
let enemyIntroPortrait = document.getElementById("enemy-intro-portrait");
let enemyportrait = document.getElementById("enemy-portrait");
let transitionLayer = document.getElementById("transition-layer");

let currentLevel = 1;
let deck = [];
let discard = [];
let handSize = 0;
let currentEnemy = null;
let playerHealth = 100;
let playerArmor = 0;
let playerMana = 3;
let enemyHealth = 99;
let enemyArmor = 0;
let enemyAttackIndex = 0;
let nextEnemyAction = {
    name: "...",
    description: "...",
    damage: 0
}

// constants ----------------------------------------------------------------------

const strikeCard = {      name:"Strike",      type:"damage",  value:5 , portrait: "url(../img/strike-card.png)"};
const bigStrikeCard = {   name:"Strike",      type:"damage",  value:8 , portrait: "url(../img/big-strike-card.png)"};
const armorCard = {       name:"Armor",       type:"armor",   value:5 , portrait: "url(../img/armor-card.png)"};
const bigArmorCard = {    name:"Big Armor",   type:"armor",   value:12, portrait: "url(../img/big-armor-card.png)"};
const fireballCard = {    name:"Fireball",    type:"damage",  value:7 , portrait: "url(../img/fireball-card.png)"};
const manaCard = {        name:"Replenish",   type:"mana",    value:3 , portrait: "url(../img/replenish-card.png)"};

    // const enemyRaptor = { name: "Mecharaptor", health: 48, actions: [5,5,7,7] }
    // const enemyWizard = { name: "Fallen Wizard", health: 29, actions: [0,12,0,12] }

// Functions --------------------------------------------------------------------

function init () {
    currentLevel = 1;
    deck = [];
    discard = [];
    handSize = 0;
    currentEnemy = null;
    playerHealth = 100;
    playerArmor = 0;
    playerMana = 3;
    enemyHealth = 99;
    enemyArmor = 0;
    enemyAttackIndex = 0;
    nextEnemyAction = {
        name: "...",
        description: "...",
        damage: 0
    }
}

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

function setEnemyDialog(text) {
    document.getElementById("enemy-intro-dialog").innerText = text;
}

function showHeroSelect() {
    hideElement('title-menu');
    showElement('hero-select-menu');
    triggerPixelTransition(20, 20, 1)
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

    let remainingEnemies = ["shaman", "undead", 'raptor'];
    remainingEnemies = remainingEnemies.sort(() => Math.random() - 0.5); //randomize
    const currentEnemyName = remainingEnemies.pop();
    if ( currentEnemyName === 'shaman' ) {
        currentEnemy = new EnemyShaman()
    } else if (currentEnemyName === 'undead'){
        currentEnemy = new EnemyBladeRevenant()
    } else if (currentEnemyName === 'raptor') {
        currentEnemy = new EnemyMecharaptor()
    }

    console.log('Current enemy -> ' + currentEnemy)
    setEnemyDialog( currentEnemy.description );

    console.log(currentEnemy);

    enemyHealth = currentEnemy.maxHealth;
    enemyArmor = 0;
    nextEnemyAction.damage = 0;
    nextEnemyAction.description = '';


    document.getElementById('enemy-name').innerText = currentEnemy.name;
    enemyHealthLabel.innerText = 'Health: ' + currentEnemy.health + ' / ' + currentEnemy.maxHealth;
    enemyArmorLabel.innerText = 'Armor: ' + enemyArmor;
    enemyAttackLabel.innerText = currentEnemy.name + ' growls menacingly...';
    enemyIntroDescription.innerText = currentEnemy.name;
    enemyIntroPortrait.src = currentEnemy.portrait;
    enemyportrait.src = currentEnemy.portrait;
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
    playerArmor = 0;
    deck = ["strike", "strike", "strike", "strike", "strike", "armor", "strike", "strike"];
    deck = deck.sort(() => Math.random() - 0.5);
    beginNextTurn();
    triggerFadeTransition();
}

function triggerFadeTransition() {
    transitionLayer.classList.add("transition-layer");

    setTimeout(() => {
        transitionLayer.classList.remove("transition-layer");
    }, 1000);
}

function triggerPixelTransition(wide, high) {
    for (i = 0; i < wide; i++) {
        for (j = 0; j < high; j++) {
            const width = window.innerWidth / wide;
            const height = window.innerHeight / high;
            const div = document.createElement('div');

            div.style.position = 'absolute';
            div.style.width = width + 'px';
            div.style.height = height + 'px';
            div.style.left = (i * width) + 'px';
            div.style.top = (j * height) + 'px';
            div.style.backgroundColor = 'black';
            transitionLayer.appendChild(div);
            setTimeout(() => {
                div.parentElement.removeChild(div);
            }, 50*(i+j));
        }
    }
}

function selectHero(type) {
if(type === 'warrior') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/warrior-portrait.png';
    document.getElementById('dialog-button').innerText = "That's wack!";
    playerClassName.innerText = "Warrior";
    setDialog("A gnarly AI is spawning monsters from the crypts! It's up to me to battle them!")
} else if(type === 'wizard') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/wizard-portrait.png';
    document.getElementById('dialog-button').innerText = "Gōkakyū no Jutsu!";
    playerClassName.innerText = "Wizard";
    setDialog("The wizard is an old dude, but he shoots fire and stuff!")
} else if(type === 'barbarian') {
    const img = document.getElementById('hero-portrait');
    img.src = 'img/barbarian-portrait.png';
    document.getElementById('dialog-button').innerText = "AAUuaaAAGH!";
    playerClassName.innerText = "Barbarian";
    setDialog("She will crush her enemies, see them driven before her, and hear their lamentations and stuff,")
}
    console.log('Player selected' + type)
    showDialogMenu();
    showHeroSidebar();
}

function highlightHero(type) {
    if(type === 'warrior') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/warrior.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "fill";
    } else if(type === 'wizard') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/wizard.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "cover";
    } else if(type === 'barbarian') {
        document.getElementById("hero-select-menu").style.backgroundImage = "url('img/barbarian.png')";
        document.getElementById("hero-select-menu").style.backgroundSize = "cover";
    }
}

function unhighlightHero() {
    // document.getElementById("hero-select-menu").style.backgroundImage = "url('img/selection-bg.png')";
    // document.getElementById("hero-select-menu").style.backgroundSize = "cover";
}

function hurtEnemy(value) {
    currentEnemy.health = currentEnemy.health - value;
    enemyHealthLabel.innerText = "Health: " + currentEnemy.health + " / " + currentEnemy.maxHealth;
    if (currentEnemy.health <= 0 ) {
        console.log("you win!")
        win();
    }
    redFlashAnimation(enemyportrait);
    redTextFlashAnimation(enemyHealthLabel);
}

function hurtPlayer(value) {
    for(i=value;i>0;i--) {
        if (playerArmor > 0) {
            playerArmor--;
        } else {
            playerHealth--;
        }
    }
    if (playerHealth <= 0) {
        gameOver();
    }
    playerArmorLabel.innerText = "Armor: " + playerArmor;
    playerHealthLabel.innerText = "🫀: " + playerHealth + " / 100";
    redTextFlashAnimation(playerHealthLabel);
    redBorderFlashAnimation(heroPortrait);
}

function gainArmor(value) {
    playerArmor+=value;
    playerArmorLabel.innerText = "Armor: " + playerArmor;
    blueBorderFlashAnimation(heroPortrait);
    blueTextFlashAnimation(playerArmorLabel);
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
    cardElement.addEventListener('click', function(event) {
        console.log(event);
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
        console.log("attack for " + card.value);
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



function win() {
    setDialog("One evil has been defeated. But many more enemies await...");
    document.getElementById('dialog-button').innerText = "Continue";
    currentLevel++;
    showDialogMenu();
}

function gameOver() {
    console.log("lose");
    setDialog("Your hero has fallen, try again?")
    showDialogMenu();
}

function redFlashAnimation(element) {
    element.classList.add('img-flash');

    setTimeout(() => {
        element.classList.remove('img-flash');
    }, 500); 
}

function redTextFlashAnimation(element) {
    if (playerHealth < 20) {
        element.style.color = "darkred"
    } else {
        element.classList.add('text-flash');

    setTimeout(() => {
        element.classList.remove('text-flash');
    }, 500);
    }
}

function redBorderFlashAnimation(element) {
    element.classList.add('border-flash');

    setTimeout(() => {
        element.classList.remove('border-flash');
    }, 2000);
}

function blueTextFlashAnimation(element) {
    element.classList.add('text-flash-blue');

    setTimeout(() => {
        element.classList.remove('text-flash-blue');
    }, 2000);
}

function blueBorderFlashAnimation(element) {
    element.classList.add('border-flash-blue');

    setTimeout(() => {
        element.classList.remove('border-flash-blue');
    }, 2000);
}

function beginNextTurn () {

    console.log("previous turn's action" + nextEnemyAction);

    if (nextEnemyAction.effects && nextEnemyAction.effects.damage > 0) {
        hurtPlayer(nextEnemyAction.effects.damage);
    }

    if (playerHealth <= 0) {
        gameOver();
        return;
    }

    enemyAttackIndex = enemyAttackIndex > currentEnemy.actions.length - 1 ? 0 : enemyAttackIndex;
    console.log(currentEnemy.actions[enemyAttackIndex])
    nextEnemyAction = currentEnemy.actions[enemyAttackIndex];
    console.log( "index: " + enemyAttackIndex + " | attacking for: " + nextEnemyAction.effects.damage);
    enemyAttackIndex++;

    enemyAttackLabel.innerText = "Attacking for " + nextEnemyAction.effects.damage + ' damage.'
    
    playerMana = 3;

    dealCards(5);
}

function makeTitleWavy(){
    
    let wavyText = document.getElementById("wavy-title");
    
    wavyText.innerHTML = wavyText.innerText.split("").map(letter => {
        return `<span>` + letter + `</span>`;
    })
    .join("");

    Array.from(wavyText.children).forEach((span, index) => {
    setTimeout(() => {
        span.classList.add("wavy");
    }, index * 50);
    });

    document.getElementById("wavy-title").addEventListener('click', function(event) {
        if (event.target.style.color === "red") {
            event.target.style.color = "green"
        } else if (event.target.style.color === "green"){
            event.target.style.color = "blue"
        } else {
            event.target.style.color = "red"
        }
    })
    
}

// Entry Point --------------------------------------------------------------------

showMainMenu();
makeTitleWavy();