class CardGame {
    
    // Public API ------------------
    
    startNewGame() {

    }

    playCard(cardElement) {
        return true
    }

    endTurn () {
        
    }

    selectNewCard(cardElement) {

    }

    get turn () {
        return this.#turn
    }

    get deck () {
        return this.#deck.slice()
    }

    get hand () {
        return this.#hand.slice()
    }

    get discardPile () {
        return this.#discardPile.slice()
    }

    get currentEnemy () {
        return this.#currentEnemy
    }

    // Private -------------------------------

    #turn = 0
    #deck = []
    #hand = []
    #discardPile = []
    #currentEnemy = {}


}

class Hero {
    constructor() {
        this.health = 100
        this.armor = 0
        this.class = ""
        this.debuffs = []
        this.buffs = []
    }

    takeDamage (value) {

    }

    gainArmor (value) {

    }

    gainEffect(name, value) {

    }

}

class Enemy {
    constructor(name) {
        this.name = name
        this.description = ''
        this.maxHealth = 0
        this.health = 0
        this.actions = []
        this.buffs = []
        this.debuffs = []
        this.portrait = ''
    }

    takeDamage (value) {

    }

    gainArmor (value) {

    }

    gainEffect(name, value) {
        
    }
}

class EnemyAction {
    constructor(name, description, effects) {
        this.name = name
        this.description = description
        this.effects = effects
    }
}

let enemyShaman = new Enemy ('Orthic Shaman')
enemyShaman.description = 'Before you stands a ghoul shrouded in boar bones and wet sinew, wielding a gore-encrusted axe...'
enemyShaman.portrait = 'img/axe-shaman.png'
enemyShaman.maxHealth = 37
enemyShaman.health = 37
enemyShaman.actions = [
    new EnemyAction('Boar Charge','Orthic Shaman rams you with its tusks!', {'damage': 6}),
    new EnemyAction('Axe Swing', 'Orthic Shaman swings its putrid axe!', {'damage': 8})
]

let enemyUndeadFemale = new Enemy ('Blade Revenant')
enemyUndeadFemale.description = "Hint: She's gonna hit you with the sword"
enemyUndeadFemale.portrait = 'img/female-undead.png'
enemyUndeadFemale.maxHealth = 48
enemyUndeadFemale.health = 48
enemyUndeadFemale.actions = [
    new EnemyAction('Slash', 'The wight swings its greatsword in a wide arc', {'damage': 13})
]

class Card {
    constructor(cardName) {
       this.cardName = cardName
       this.effects = []
    }
}
