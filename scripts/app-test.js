const html = {
    "heroMaxHp": document.getElementById('hero-max-hp'),
    "heroHp": document.getElementById('hero-hp'),
    "heroArmor": document.getElementById('hero-armor'),
    "cardContainer": document.getElementById('card-container'),
    "actionDescription": document.getElementById('action-description'),
    "cards": document.querySelectorAll('.card'), // Selects all card elements
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

let game = new CardGame()

function chooseHero(choice) {
    game.playerDidChooseHero(choice)
    render()
    
}

function render () {
    console.log("hero: " + game.hero)
    console.log("enemy: " + game.enemy)
    console.log("deck: " + game.deck)
    console.log("hand: " + game.hand)
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

    let itr = 0;
    for(let card of html.cards) {
        card.style.display = "none";
        if (game.hand[itr] && typeof game.hand[itr].name === typeof string) {
            card.style.display = "block";
            card.innerText = game.hand[itr].name
        }
    }
}