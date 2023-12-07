
let game = new CardGame()


// HTML elements --------------------------------------------------------------------------------

const html = {
    gameContainer: document.querySelector('.game-container'), // Contains whole game

// Selecting elements by ID
    transitionLayer: document.getElementById('transition-layer'),
    
// Hero values
    heroName: document.getElementById('hero-name'),
    heroHealth: document.getElementById('hero-health'),
    heroStatusEffects: document.getElementById('hero-status-effects'),
    heroPortrait: document.querySelector('.hero-portrait-container'),

// Enemy Values
    enemyName: document.getElementById('enemy-name'),
    enemyHealth: document.getElementById('enemy-health'),
    enemyStatusEffects: document.getElementById('enemy-status-effects'),
    enemyPortrait: document.querySelector('.background-overlay'),
    enemyActionContainer: document.querySelector('.enemy-action-container'),

// cards
    cards: document.querySelectorAll('.card'),
    hand: document.querySelectorAll('.card-in-hand'),
    cardPreview: document.getElementById('card-preview'),
    discardPileContainer: document.querySelector('.discard-pile-container'),
    deckPileContainer: document.querySelector('.deck-pile-container'),

// Selecting buttons
    endTurnButton: document.querySelector('.end-turn'),

// Scenes
    battleContainer: document.querySelector('.battle-container'),

    titleMenu: document.getElementById('title-menu'),
    newGameButton: document.getElementById('new-game-button'),

    heroSelectMenu: document.getElementById('hero-select-menu'),
    warriorButton: document.getElementById('warrior-select-button'),
    wizardButton: document.getElementById('wizard-select-button'),
    barbarianButton: document.getElementById('barbarian-select-button'),

    preBattleMenu: document.getElementById('dialog-menu'),
    preBattleText: document.getElementById('dialog-text'),
    preBattleMenuButton: document.getElementById('dialog-button'),

    cardSelectMenu: document.getElementById('card-select-menu'),
    cardChoices: document.querySelectorAll('.card-choice'),

}

// event listeners ----------------------------------------------------------------------------------------

html.newGameButton.addEventListener('click', function() { beginNewGame() })
html.warriorButton.addEventListener('click', function() { chooseHero('warrior') })
html.wizardButton.addEventListener('click', function() { chooseHero('wizard') })
html.barbarianButton.addEventListener('click', function() { chooseHero('barbarian') })
html.preBattleMenuButton.addEventListener('click', function() { beginBattle() })
html.endTurnButton.addEventListener('click', function() { endTurn() })

html.cards.forEach((card, index) => {
    card.addEventListener('click', () => playCard(index));
});

html.cardChoices.forEach((card, index) => {
    card.addEventListener('click', () => selectNewCard(index));
});

document.addEventListener('DOMContentLoaded', function() { 
    html.cards = document.querySelectorAll('.card')

    function createCardHTML() {
        return `
            <div class='title'>Title</h1>
            <p class='description'>Description</p>
        `;
    }

    html.cards.forEach((card, index) => {
        card.innerHTML = createCardHTML();
    });

    render() 
})

// gameplay buttons ----------------------------------------------------------------------------------------

function beginNewGame() {
    game = new CardGame()
    titleMenu = false
    render()
}

function chooseHero(choice) {
    game.chooseHero(choice)
    render()
}

function beginBattle() {
    game.beginBattle()
    render()
}

function playCard(index) {
    game.playCard(index)
    render()
}

function selectNewCard(index) {
    game.selectNewCard(index)
    render()
}

function endTurn() {
    game.endTurn()
    game.beginBattle()
    render()
}

// Menu navigation ----------------------------------------------------------------------------------------

function show(element) {
    if (element === html.battleContainer){
        element.style.display = "grid"
    } else {
        element.style.display = "block"
    }
}

function hide(...elements) {
    console.log(elements)
    for (let element of elements) {
        element.style.display = "none"
    }
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

// Render ------------------------------------------------------------------------------------------

let titleMenu = true;
function render () {
    if (titleMenu) {
        hide(html.battleContainer, html.preBattleMenu, html.heroSelectMenu, html.cardSelectMenu)
        show(html.titleMenu)
    } else if (game.gameState === GAME_STATE.HERO_SELECT) {
        console.log("HERO SELECT")
        hide(html.battleContainer, html.preBattleMenu, html.titleMenu, html.cardSelectMenu)
        show(html.heroSelectMenu)
    } else if (game.gameState === GAME_STATE.PRE_BATTLE) {
        console.log("PREBATTLE")
        hide(html.battleContainer, html.heroSelectMenu, html.titleMenu, html.cardSelectMenu)
        show(html.preBattleMenu)
    } else if (game.gameState === GAME_STATE.BATTLE) {
        console.log("BATTLE")
        hide(html.preBattleMenu, html.heroSelectMenu, html.titleMenu, html.cardSelectMenu)
        show(html.battleContainer)
    } else if (game.gameState === GAME_STATE.CARD_SELECT) {
        console.log("CARD SELECT")
        hide(html.preBattleMenu, html.heroSelectMenu, html.titleMenu, html.battleContainer)
        show(html.cardSelectMenu)
    } else if (game.gameState === GAME_STATE.LOSE) {
        console.log("LOSE")

    } else if (game.gameState === GAME_STATE.WIN) {
        console.log("WIN")
    }

    if (game.cardChoices.length > 0) {
        game.cardChoices.forEach((card, index) => {
            renderCard(card, game.cardChoices[index])
        })
    }

    console.log("hand: " + game.hand)
    for (let [index, element] of html.hand.entries()) {
        if(game.hand[index]) {
            //style the card
            element.style.opacity = 1.0
        } else {
            element.style.opacity = 0.0
        }
    }
}

function renderCard(cardElement, cardName) {
    if (!cardName) { console.error("invalid card name") }
    cardElement.innerHTML = `<h1>${cardName}</h1>`
}
