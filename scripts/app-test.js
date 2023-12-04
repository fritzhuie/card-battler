const html = {
    "heroMaxHp": document.getElementById('hero-max-hp'),
    "heroHp": document.getElementById('hero-hp'),
    "heroArmor": document.getElementById('hero-armor'),
    "cardContainer": document.getElementById('card-container'),
    "cards": document.querySelectorAll('.card'),
    "actionDescription": document.getElementById('action-description'),
    "discardPile": document.getElementById('discard-pile'),
    "deckPile": document.getElementById('deck-pile'),
    "endTurn": document.getElementById('end-turn'),
    "enemyName": document.getElementById('enemy-name'),
    "enemyMaxHp": document.getElementById('enemy-max-hp'),
    "enemyArmor": document.getElementById('enemy-armor'),
    "enemyHp": document.getElementById('enemy-hp'),
    "enemyAttack": document.getElementById('enemy-attack'),
    "chooseWarrior": document.getElementById('choose-warrior'),
    "chooseWizard": document.getElementById('choose-wizard'),
    "chooseBarbarian": document.getElementById('choose-barbarian'),
    "cardChoiceContainer": document.getElementById('card-selection'),
    "cardChoices": document.querySelectorAll('.card-choice'),
    "playArea": document.getElementById('play-area'),
    "gameContainer": document.getElementById('game-container')
}


html.chooseWarrior.addEventListener('click', function() { chooseHero('warrior') })
html.chooseWizard.addEventListener('click', function() { chooseHero('wizard') })
html.chooseBarbarian.addEventListener('click', function() { chooseHero('barbarian') })
html.endTurn.addEventListener('click', function() { endTurn() })

let game = new CardGame()

for (let [index, card] of html.cards.entries()) {
    card.addEventListener('click', () => { 
        game.playCard(index)
        render();
    })
}

for (let [index, card] of html.cardChoices.entries()) {
    card.addEventListener('click', () => { 
        game.selectNewCard(index)
        render();
    })
}

function endTurn() {
    game.endTurn()
    render()
}

function chooseHero(choice) {
    game.chooseHero(choice)
    render()
}

function render () {
    // console.log("hero: " + game.hero)
    // console.log("enemy: " + game.enemy)
    // console.log("deck: " + game.deck)
    // console.log("hand: " + game.hand)
    html.heroMaxHp.innerText = game.hero ? game.hero.maxHealth : "?"
    html.heroHp.innerText =  game.hero ? game.hero.health : "?"
    html.heroArmor.innerText = game.hero ? game.hero.armor : "?"

    html.enemyName.innerText = game.enemy.name = game.enemy.name ? game.enemy.name : "?"
    html.enemyMaxHp.innerText = game.enemy.maxHealth = game.enemy.maxHealth ? game.enemy.maxHealth : "?"
    html.enemyHp.innerText = game.enemy.health = game.enemy.health ? game.enemy.health : "?"
    html.enemyArmor.innerText = game.enemy.armor = game.enemy.armor ? game.enemy.armor : "?"
    html.enemyAttack.innerText = game.enemy.nextAttack = game.enemy.nextAttack ? game.enemy.nextAttack : "?"

    html.discardPile.innerText = game.discardPile.join()
    html.deckPile.innerText = game.deck.join()

    if (game.gameState === GAME_STATE.HERO_SELECT) {
        html.chooseBarbarian.style.display =  "block"
        html.chooseWarrior.style.display = "block"
        html.chooseWizard.style.display = "block"
        html.gameContainer.style.display = "none"
    } else {
        html.chooseBarbarian.style.display =  "none"
        html.chooseWarrior.style.display = "none"
        html.chooseWizard.style.display = "none"
        html.gameContainer.style.display = "block"
    }

    if (game.gameState === GAME_STATE.BATTLE ) {
        html.playArea.style.display = "block"
    } else {
        html.playArea.style.display = "none"
    }

    if (game.gameState === GAME_STATE.CARD_SELECT) {
        html.cardChoiceContainer.style.display = "block"
    } else {
        html.cardChoiceContainer.style.display = "none"
    }
    

    for (let [index, card] of html.cards.entries()) {
        card.style.display = "none";
        if (game.hand[index]) {
            card.style.display = "block";
            card.textContent = game.hand[index];
        }
    }
}

render()