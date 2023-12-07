
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
    preBattleMenuButton: document.getElementById('dialog-button')
}

// event listeners ----------------------------------------------------------------------------------------

html.newGameButton.addEventListener('click', function() { beginNewGame() })
html.warriorButton.addEventListener('click', function() { chooseHero('warrior') })
html.wizardButton.addEventListener('click', function() { chooseHero('wizard') })
html.barbarianButton.addEventListener('click', function() { chooseHero('barbarian') })
html.preBattleMenuButton.addEventListener('click', function() { beginBattle() })
html.endTurnButton.addEventListener('click', function() { endTurn() })

document.addEventListener('DOMContentLoaded', function() { render() })

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

function endTurn() {
    game.endTurn()
    game.beginBattle()
    render()
}

// Menu navigation ----------------------------------------------------------------------------------------

function show(element) {
    element.style.opacity = 1.0;
}

function hide(...elements) {
    console.log(elements)
    for (let element of elements) {
        element.style.opacity = 0;
    }
}

// Render ------------------------------------------------------------------------------------------

let titleMenu = true;
function render () {
    if (titleMenu) {
        hide(html.battleContainer, html.preBattleMenu, html.heroSelectMenu)
        show(html.titleMenu)
    } else if (game.gameState === GAME_STATE.HERO_SELECT) {
        console.log("HERO SELECT")
        hide(html.battleContainer, html.preBattleMenu, html.titleMenu)
        show(html.heroSelectMenu)
    } else if (game.gameState === GAME_STATE.PRE_BATTLE) {
        console.log("PREBATTLE")
        hide(html.battleContainer, html.heroSelectMenu, html.titleMenu)
        show(html.preBattleMenu)
    } else if (game.gameState === GAME_STATE.BATTLE) {
        hide(html.preBattleMenu, html.heroSelectMenu, html.titleMenu)
        show(html.battleContainer)
    } else if (game.gameState === GAME_STATE.LOSE) {

    } else if (game.gameState === GAME_STATE.WIN) {

    }
}
