class CardGameEngine {
    
    // Public API ------------------
    
    startNewGame() {
        
    }

    playCard(handPosition) {
        return true
    }

    endTurn () {

    }

    selectNewCard(card) {

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

    #deck = []
    #hand = []
    #discardPile = []
    #currentEnemy = {}


}

class Enemy {
    constructor(name) {
        this.name = name
        this.description = ''
        this.maxHealth = 0
        this.health = 0
        this.actions = {}
        this.portrait = ''
    }
}

class Action {
    constructor(name, description, damage) {
        this.name = name
        this.description = description
        this.damage = damage
    }
}

let enemyShaman = new Enemy ('Orthic Shaman')
enemyShaman.description = 'Before you stands a ghoul shrouded in boar bones and wet sinew, wielding a gore-encrusted axe...'
enemyShaman.portrait = 'img/axe-shaman.png'
enemyShaman.maxHealth = 37
enemyShaman.health = 37
enemyShaman.actions = [
    new Action('Boar Charge','Orthic Shaman rams you with its tusks!', 6),
    new Action('Axe Swing', 'Orthic Shaman swings its putrid axe!', 8)
]

let enemyUndeadFemale = new Enemy ('Blade Revenant')
enemyUndeadFemale.description = 'Undead thing with a sword'
enemyUndeadFemale.portrait = 'img/female-undead.png'
enemyUndeadFemale.maxHealth = 48
enemyUndeadFemale.health = 48
enemyUndeadFemale.actions = [
    new Action('Slash', 'The wight swings its greatsword in a wide arc', 9)
]

