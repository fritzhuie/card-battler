const html = {
    "heroMaxHp": document.getElementById('hero-max-hp'),
    "heroHp": document.getElementById('hero-hp'),
    "heroArmor": document.getElementById('hero-armor'),
    "cardContainer": document.getElementById('card-container'),
    "actionDescription": document.getElementById('action-description'),
    "cards": document.querySelectorAll('.card'), // Selects all card elements
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
    "chooseBarbarian": document.getElementById('choose-barbarian')
}


html.chooseWarrior.addEventListener('click', function() { chooseHero('warrior') })
html.chooseWizard.addEventListener('click', function() { chooseHero('wizard') })
html.chooseBarbarian.addEventListener('click', function() { chooseHero('barbarian') })
html.endTurn.addEventListener('click', function() { endTurn() })

for (let [index, card] of html.cards.entries()) {
    card.addEventListener('click', () => { 
        game.playCard(index)
        render();
     })
}

let game = new CardGame()

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
    html.heroMaxHp.innerText = game.hero.maxHealth
    html.heroHp.innerText =  game.hero.health
    html.heroArmor.innerText = game.hero.armor

    html.enemyName.innerText = game.enemy.name
    html.enemyMaxHp.innerText = game.enemy.maxHealth
    html.enemyHp.innerText = game.enemy.health
    html.enemyArmor.innerText = game.enemy.armor
    html.enemyAttack.innerText = game.enemy.nextAttack

    html.chooseBarbarian.style.display = game.hero ? "none" : "block"
    html.chooseWarrior.style.display = game.hero ? "none" : "block"
    html.chooseWizard.style.display = game.hero ? "none" : "block"

    html.discardPile.innerText = game.discardPile.join()
    html.deckPile.innerText = game.deck.join()

    for (let [index, card] of html.cards.entries()) {
        card.style.display = "none";
        if (game.hand[index]) {
            card.style.display = "block";
            card.textContent = game.hand[index];
        }
    }
}