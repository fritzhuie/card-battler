const GAME_STATE = {
    HERO_SELECT: 'hero',
    PRE_BATTLE: 'prebattle',
    BATTLE: 'battle',
    CARD_SELECT: 'select',
    WIN: 'win',
    LOSE: 'lose',
};

class CardGame {

    #hero = null
    #enemy = null
    #enemies = null
    #gameState = GAME_STATE.HERO_SELECT
    #currentLevel = 0
    #turn = 0

    #deck = []
    #hand = []
    #discardPile = []
    #cardChoices = []

    #actions = []

    get gameState ()    { return this.#gameState }
    get currentLevel () { return this.#currentLevel }
    get turn ()         { return this.#turn }
    get deck ()         { return this.#deck }
    get hand ()         { return this.#hand }
    get discardPile ()  { return this.#discardPile }
    get enemy ()        { return this.#enemy }
    get hero ()         { return this.#hero }
    get cardChoices ()  { return this.#cardChoices }
    get actions ()      { return this.#actions }

    constructor() {

        this.#enemies = [
            new EnemyShaman, 
            new EnemyBladeRevenant, 
            new EnemyMecharaptor
        ]

        this.#enemy = this.#enemies[0]
    }

    chooseHero( choice ) {
        if (this.#gameState != GAME_STATE.HERO_SELECT || this.#hero) { return }

        if ( choice === 'warrior') {
            this.#hero = new Warrior()
        } else if (choice === 'wizard') {
            this.#hero = new Wizard()
        } else if (choice === 'barbarian') {
            this.#hero = new Barbarian()
        } else {
            console.log("Invalid hero selection")
        }

        this.#gameState = GAME_STATE.PRE_BATTLE

        this.#deck = this.hero.startingDeck
        console.log("DECK AT START: " + this.#deck)
    }

    beginBattle() {
        if (this.#gameState != GAME_STATE.PRE_BATTLE) { return }

        this.#gameState = GAME_STATE.BATTLE
        this.#beginNewTurn()
    }

    endTurn () {
        if (this.#gameState != GAME_STATE.BATTLE) { return }

        this.#performEnemyAction()
        this.#checkForDeaths()
        this.#discardHand()
        // handle buffs and defuffs
        this.#beginNewTurn()
    }

    selectNewCard(index) {
        if (this.#gameState != GAME_STATE.CARD_SELECT) { return }
        this.#deck.push(this.#cardChoices[index])
        this.#cardChoices = []
        this.#gameState = GAME_STATE.BATTLE
        this.#beginPreBattle()
    }

    playCard(index) {
        if (this.#gameState != GAME_STATE.BATTLE) { return }

        if (!this.#hand || !this.#hand[index]) {
            console.error(`Invalid card - index: + '${index}'`);
            return;
        }
        

        let cardName = this.#hand[index]
        if (cardName in Card.cards) {
            this.#playCard(cardName);
        }

        this.#discard(index)
        this.#checkForDeaths()
    }

    #playCard(name) {

        let card = Card.called(name)
        card.effects.forEach(effect => {
            console.log(`Processing Effect: '${effect.name}' with value '${effect.value}'`)
            switch (effect.name) {
                case 'damage':
                    this.#enemy.takeDamage(effect.value)
                    console.log(`${effect.name} dealt ${effect.value} damage to ${this.#enemy.name}`)
                    break;
                case 'armor':
                    this.#hero.gainArmor(effect.value)
                    break;
                case 'slam':
                    this.#enemy.takeDamage(this.#hero.armor * effect.value)
                    break;
                case 'mana-damage':
                    this.#enemy.takeDamage(this.#hero.mana * effect.value)
                    break;
                case 'bleed':
                    this.#enemies.gainEffect(effect.name, effect.value)
                    break;
                case 'draw':
                    this.#drawCard()
                    break;
                case 'heal':
                    this.#hero.health = Math.max(this.#hero.maxHealth, this.#hero.health + effect.value)
                    break;
                default:
                    console.log(`Effect type '${effect.name}' not recognized.`);
            }
        });
    }

    #beginPreBattle() {
        this.#gameState = GAME_STATE.PRE_BATTLE
    }

    #performEnemyAction() { 
        let action = this.#enemy.currentAction()

        console.log(`Processing enemy action: '${JSON.stringify(action)}'`)

        this.#enemy.actionIndex = this.#enemy.actionIndex >= this.#enemy.actionIndex.length ? 0 : this.#enemy.actionIndex + 1
    }

    #dealHand () {
        while (this.#hand.length < 5 && (this.#discardPile.length > 0 || this.#deck.length > 0)) {
            this.#drawCard();
        }
    }

    #drawCard() {
        if (this.#deck.length === 0) { this.#recycleDiscard() }
        this.#hand.push(this.#deck.pop())
    }

    #discard(index) {
        this.#discardPile.push(game.#hand.splice(index, 1)[0])
    }

    #discardHand() {
        this.#discardPile = this.#discardPile.concat(this.#hand);
        console.log(this.#discardPile)
        this.#hand = []
    }

    #recycleDiscard() {
        this.#deck = this.#deck.concat(this.#discardPile);
        this.#discardPile = []
        this.#deck = this.#deck.sort(() => Math.random() - 0.5);
    }

    #beginNewTurn() {
        this.#dealHand()
        // handle buffs and debuffs
    }

    #checkForDeaths() {
        if (this.#hero.health <= 0) {
            this.#gameState = GAME_STATE.LOSE
        }

        if (this.#enemy.health <= 0) {
            this.#enemies.shift()
            this.#enemy = this.#enemies[0]

            this.#discardHand()
            this.#recycleDiscard()

            this.#gameState = GAME_STATE.CARD_SELECT
            this.#offerNewCards()
        }
    }

    #offerNewCards() {
        this.#cardChoices = ["strike", "strike", "armor"]
    }
    
    #addCardToDeck(name) { }
    #addCardToHand(name) { }
}

class Hero {

    #architype = null
    #maxHealth = 0
    #health = 0
    #armor = 0
    #statusEffects = []
    #startingDeck = []
    #maxMana = 0
    #mana = 0

    get maxMana() { return this.#maxMana }
    get mana() { return this.#mana }
    get startingDeck() { return this.#startingDeck }
    get maxHealth() { return this.#maxHealth }
    get health() { return this.#health }
    get armor() { return this.#armor }
    get statusEffects() { return [...this.#statusEffects] }

    constructor(maxMana, maxHealth, startingDeck) {
        this.#maxMana = maxMana
        this.#maxHealth = maxHealth
        this.#startingDeck = startingDeck
    }

    gainArmor(value) {
        this.#armor+=value
    }

    takeDamage(value) {
        this.#health -= value
    }
}

class Warrior extends Hero {
    constructor(){
        const warriorStartingDeck = ["strike", "strike", "strike", "strike", "strike", "armor", "armor"]
        super(3, 100, warriorStartingDeck)
    }
}

class Wizard extends Hero {
    constructor(){
        const wizardStartingDeck = ["fireblast", "fireblast", "fireblast", "fireblast", "magicmissile", "magicmissile", "manashield"]
        super(3, 100, wizardStartingDeck)
    }
}

class Barbarian extends Hero {

    #rage = 0
    get rage() { return this.#rage }

    constructor(){
        const barbarianStartingDeck = ["cleave", "cleave", "cleave", "cleave", "cleave", "flourish", "flourish"]
        super(0, 100, barbarianStartingDeck)
    }
}

class Enemy {

    name = null
    description = null
    maxHealth = null
    health = null
    armor = null
    portrait = null
    statusEffects = []
    actions = []
    actionIndex = 0

    takeDamage (value) {
        this.health-=value;
    }

    gainArmor (value) {
        this.armor+=value;
    }

    gainStatusEffects(name, value) {
        statusEffects.push(new Effect(name, value))
    }

    currentAction() {
        return this.actions[this.actionIndex]
    }

    processStatusEffects(name, value) {
        // go through status effects
    }
}

class EnemyAction {
    constructor(name, description, effects) {
        this.name = name
        this.description = description
        this.effects = effects
    }
}

class EnemyShaman extends Enemy {
    constructor() {
        super();
        this.name = 'Orthic Shaman'
        this.description = '100% organic boar skull!'
        this.portrait = 'img/axe-shaman.png'
        this.maxHealth = 10
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Boar Charge','rams you with its tusks!', {'damage': 6}),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', {'damage': 16})
        ]
    }
}

class EnemyBladeRevenant extends Enemy {
    constructor() {
        super();
        this.name = 'Blade Revenant'
        this.description = "Hint: She's gonna hit you with the sword"
        this.portrait = 'img/female-undead.png'
        this.maxHealth = 10
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Slash', 'swings its greatsword in a wide arc', {'damage': 13})
        ]
    }
}

class EnemyMecharaptor extends Enemy {
    constructor() {
        super();
        this.name = 'Mecha Raptor'
        this.description = 'They Didn’t Stop To Think If They Should'
        this.portrait = 'img/mecharaptor.png'
        this.maxHealth = 10
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Swipe', 'jumps and swipes with its claws', {'damage': 10}),
            new EnemyAction('Pounce', 'leaps at you, attacking with fang and claw', {'damage': 11}),
            new EnemyAction('Screech', 'lets out a deafening screech', {'damage': 12})
        ]
    }
}

class Effect {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Card {
    constructor(cardName, baseCost, ...effects) {
        this.cardName = cardName;
        this.cost = baseCost;
        this.effects = effects;
    }

    static called(name) {
        return Card.cards[name]
        // Example: let strike = Card.called('strike');
    }
}

Card.cards = {
    'strike': new Card('strike', 1, new Effect('damage', 5)),
    'armor': new Card('armor', 1, new Effect('armor', 5)),
    'shieldslam': new Card('shieldslam', 1, new Effect('slam', 1)),
    'fireblast': new Card('fireblast', 1, new Effect('damage', 6)),
    'magicmissile': new Card('magicmissile', 0, new Effect('mana-damage', 3)),
    'manashield': new Card('manashield', 2, new Effect('armor', 9), new Effect('draw', 1)),
    'cleave': new Card('cleave', -1, new Effect('damage', 5), new Effect('bleed', 3)),
    'flourish': new Card('flourish', 3, new Effect('damage', 9), new Effect('heal', 5))
}