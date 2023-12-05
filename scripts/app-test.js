const html = {
    "heroMaxHp": document.getElementById('hero-max-hp'),
    "heroHp": document.getElementById('hero-hp'),
    "heroArmor": document.getElementById('hero-armor'),
    "heroMana": document.getElementById('hero-mana'),
    "cardContainer": document.getElementById('card-container'),
    "cards": document.querySelectorAll('.card'),
    "cardChoiceContainer": document.getElementById('card-selection'),
    "cardChoices": document.querySelectorAll('.card-choice'),
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
    "playArea": document.getElementById('play-area'),
    "gameContainer": document.getElementById('game-container'),
    "beginBattle": document.getElementById('begin-battle'),
    "heroStatusEffects": document.getElementById("hero-status-effects"),
    "enemyStatusEffect": document.getElementById("enemy-status-effects")
}


html.chooseWarrior.addEventListener('click', function() { chooseHero('warrior') })
html.chooseWizard.addEventListener('click', function() { chooseHero('wizard') })
html.chooseBarbarian.addEventListener('click', function() { chooseHero('barbarian') })
html.endTurn.addEventListener('click', function() { endTurn() })
html.beginBattle.addEventListener('click', function() { beginBattle() })

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

function beginBattle() {
    game.beginBattle()
    render()
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
    // console.log(game.hero);
    // console.log("enemy: " + JSON.stringify(game.enemy, null, 2));
    // console.log("deck: " + game.deck)
    // console.log("hand: " + game.hand)
    console.log(game.hero ? JSON.stringify(game.hero.statusEffects) : "no hero found")
    console.log(game.enemy ? JSON.stringify(game.enemy.statusEffects) : "no hero found")

    html.heroMaxHp.innerText = game.hero ? game.hero.maxHealth : "-"
    html.heroHp.innerText =  game.hero ? game.hero.health : "-"
    html.heroArmor.innerText = game.hero ? game.hero.armor : "-"
    html.heroMana.innerText = game.hero ? `${game.mana} / ${game.startingMana}` : "-"

    html.enemyName.innerText = game.enemy.name ? game.enemy.name : "-"
    html.enemyMaxHp.innerText = game.enemy.maxHealth ? game.enemy.maxHealth : "-"
    html.enemyHp.innerText = game.enemy.health ? game.enemy.health : "-"
    html.enemyArmor.innerText = game.enemy.armor ? game.enemy.armor : "0"
    html.enemyAttack.innerText = game.enemy.nextAttack ? game.enemy.nextAttack : "-"

    html.heroStatusEffects = game.hero ? game.hero.statusEffects : "-"
    html.enemyStatusEffects = game.enemy ? game.enemy.statusEffects : "-"

    html.discardPile.innerText = game.discardPile.join()
    html.deckPile.innerText = game.deck.join()

    let hideUnusedUIElements = false
    if (hideUnusedUIElements) {
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
    }
    

    for (let [index, card] of html.cards.entries()) {
        card.style.display = "none";
        if (game.hand[index]) {
            card.style.display = "block";
            card.textContent = game.hand[index];
        }
    }

    for (let [index, card] of html.cardChoices.entries()) {
        card.style.display = "none";
        if (game.cardChoices[index]) {
            card.style.display = "block";
            card.textContent = game.cardChoices[index];
        }
    }
}

render()