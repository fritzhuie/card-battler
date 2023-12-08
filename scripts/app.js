
let game = new CardGame()


// HTML elements --------------------------------------------------------------------------------------------

const html = {
// Root container
    gameContainer: document.querySelector('.game-container'),
    transitionLayer: document.getElementById('transition-layer'),
    
// Hero values
    heroName: document.getElementById('hero-name'),
    heroHealth: document.getElementById('hero-health'),
    heroHealthSlider: document.getElementById('hero-health-slider'),

    heroBleedStatus: document.getElementById('hero-bleed-status'),
    heroStunStatus: document.getElementById('hero-stun-status'),
    heroEmpowerStatus: document.getElementById('hero-empower-status'),
    heroEnfeableStatus: document.getElementById('hero-enfeable-status'),
    heroBurnStatus: document.getElementById('hero-burn-status'),
    heroChillStatus: document.getElementById('hero-chill-status'),

// Enemy Values
    enemyName: document.getElementById('enemy-name'),
    enemyHealth: document.getElementById('enemy-health'),
    enemyHealthSlider: document.getElementById('enemy-health-slider'),
    enemyPortrait: document.querySelector('.background-overlay'),
    enemyAction: document.querySelector('.enemy-action'),
    enemyActionIcon: document.querySelector('.enemy-action-icon'),

    enemyBleedStatus: document.getElementById('enemy-bleed-status'),
    enemyStunStatus: document.getElementById('enemy-stun-status'),
    enemyEmpowerStatus: document.getElementById('enemy-empower-status'),
    enemyEnfeableStatus: document.getElementById('enemy-enfeable-status'),
    enemyBurnStatus: document.getElementById('enemy-burn-status'),
    enemyChillStatus: document.getElementById('enemy-chill-status'),

// Cards
    cards: document.querySelectorAll('.card'),
    hand: document.querySelectorAll('.card-in-hand'),
    discardPileContainer: document.querySelector('.discard-count'),
    deckPileContainer: document.querySelector('.deck-count'),

// Gamestate Scene containers
    battleContainer: document.querySelector('.battle-container'),
        endTurnButton: document.querySelector('.end-turn'),

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

html.hand.forEach((card, index) => {
    card.addEventListener('click', () => playCard(index));
});

html.cardChoices.forEach((card, index) => {
    card.addEventListener('click', () => selectNewCard(index));
});

document.addEventListener('DOMContentLoaded', function() { 
    html.cards = document.querySelectorAll('.card')

    html.cards.forEach((card, index) => {
        card.innerHTML = createCardHTML();
    });

    render() 
})

window.addEventListener('load', () => {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        const computedWidth = gameContainer.offsetWidth;
        gameContainer.style.width = `${computedWidth}px`;
    }
});

function createCardHTML(title, emoji, description) {
    return `
        <div class='title'>${title}</h1>
        <div class='card-image'>${emoji}</div>
        <p class='description'>${description}</p>
    `;
}

// gameplay buttons ----------------------------------------------------------------------------------------

function beginNewGame() {
    game = new CardGame()
    titleMenu = false
    render()
}

function chooseHero(choice) {
    game.chooseHero(choice)
    game.beginBattle()
    render()
}

function beginBattle() {
    game.beginBattle()
    render()
    triggerPixelTransition(30, 21)
}

function playCard(index) {
    game.playCard(index)
    render()
}

function selectNewCard(index) {
    game.selectNewCard(index)
    game.beginBattle()
    render()
}

function endTurn() {
    game.endTurn()
    game.beginBattle()
    render()
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
            div.style.zIndex = 1000;
            html.transitionLayer.appendChild(div);
            setTimeout(() => {
                div.parentElement.removeChild(div);
            }, 50*(i+j));
        }
    }
}

// Effects callback function ------------------------------------------------------------------------------

function performEffect(effect) {
    if (effect === "damage") {
        console.log("PERFORM DAMAGE EFFECT")
    } else {
        console.log("NOT DAMAGE EFFECT")
    }
}

// Menu navigation ----------------------------------------------------------------------------------------

function show(element) {
    if (element === html.battleContainer){
        element.style.display = "grid"
    } else {
        element.style.display = "block"
    }
    element.style.opacity = 1.0;
}

function hide(...elements) {
    console.log(elements)
    for (let element of elements) {
        element.style.display = "none"
        element.style.opacity = 0.0
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

let titleMenu = true

function render () {
    if (titleMenu) {
    // TITLE MENU ----------------------------------------------------------------------

        hide(html.battleContainer, html.preBattleMenu, html.heroSelectMenu, html.cardSelectMenu)
        show(html.titleMenu)
    } else if (game.gameState === GAME_STATE.HERO_SELECT) {
    // HERO SELECT MENU ----------------------------------------------------------------

        console.log("HERO SELECT")
        hide(html.battleContainer, html.preBattleMenu, html.titleMenu, html.cardSelectMenu)
        show(html.heroSelectMenu)
    } else if (game.gameState === GAME_STATE.PRE_BATTLE) {
    // PRE BATTLE MENU -----------------------------------------------------------------
        console.log("PREBATTLE")
        hide(html.battleContainer, html.heroSelectMenu, html.titleMenu, html.cardSelectMenu)
        show(html.preBattleMenu)

    } else if (game.gameState === GAME_STATE.BATTLE || game.gameState === GAME_STATE.CARD_SELECT) {
    // BATTLE MENU ---------------------------------------------------------------------

        console.log("BATTLE")
        hide(html.preBattleMenu, html.heroSelectMenu, html.titleMenu)
        show(html.battleContainer)

        for (let [index, element] of html.hand.entries()) {
            game.hand[index]
            if(game.hand[index]) {
                element.style.display = "block"
                element.innerHTML = createCardHTML(
                    Card.called(game.hand[index]).name, 
                    Card.image[game.hand[index]], 
                    Card.description[game.hand[index]] )
            } else {
                element.style.display = "none"
            }
        }

        html.enemyName.textContent = game.enemy.name
        html.enemyAction.textContent =  `⚔️ ${game.enemy.nextAction().effects[0].value}`
        html.enemyHealth.textContent = `${game.enemy.health} / ${game.enemy.maxHealth}`
        html.enemyPortrait.style.backgroundImage = `url(${game.enemy.portrait})`
        html.enemyHealthSlider.style.width = `${100 * game.enemy.health / game.enemy.maxHealth}%`

        html.enemyBleedStatus.style.display = game.enemy.hasStatusEffect('bleed') ? "block" : "none"
        html.enemyStunStatus.style.display = game.enemy.hasStatusEffect('stun') ? "block" : "none"
        html.enemyEmpowerStatus.style.display = game.enemy.hasStatusEffect('empower') ? "block" : "none"
        html.enemyEnfeableStatus.style.display = game.enemy.hasStatusEffect('enfeable') ? "block" : "none"
        html.enemyBurnStatus.style.display = game.enemy.hasStatusEffect('burn') ? "block" : "none"
        html.enemyChillStatus.style.display = game.enemy.hasStatusEffect('chill') ? "block" : "none"

        html.heroName.textContent = game.hero.name
        html.heroHealth.textContent = `${game.hero.health} / ${game.hero.maxHealth}`
        html.heroHealthSlider.style.width = `${100 * game.hero.health / game.hero.maxHealth}%`

        html.heroBleedStatus.style.display = game.hero.hasStatusEffect('bleed') ? "block" : "none"
        html.heroStunStatus.style.display = game.hero.hasStatusEffect('stun') ? "block" : "none"
        html.heroEmpowerStatus.style.display = game.hero.hasStatusEffect('empower') ? "block" : "none"
        html.heroEnfeableStatus.style.display = game.hero.hasStatusEffect('enfeable') ? "block" : "none"
        html.heroBurnStatus.style.display = game.hero.hasStatusEffect('burn') ? "block" : "none"
        html.heroChillStatus.style.display = game.hero.hasStatusEffect('chill') ? "block" : "none"

        html.discardPileContainer.textContent = game.discardPile.length
        html.deckPileContainer.textContent = game.deck.length

        if (game.gameState === GAME_STATE.CARD_SELECT) {
            html.cardSelectMenu.style.display = "block"

            for (let [index, element] of html.cardChoices.entries()) {
                element.innerHTML = createCardHTML(
                    game.cardChoices[index], 
                    Card.image[game.cardChoices[index]], 
                    Card.description[game.cardChoices[index]] )
            }
        }

    } else if (game.gameState === GAME_STATE.LOSE) {
    // CARD SELECT MENU MENU ---------------------------------------------------------------------

        console.log("LOSE")
    } else if (game.gameState === GAME_STATE.WIN) {
    // CARD SELECT MENU MENU ---------------------------------------------------------------------

        console.log("WIN")
    }
}
