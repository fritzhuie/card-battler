class CardGame {

    #gameState
    #currentLevel
    #turn = 0

    #deck = []
    #hand = []
    #discard = []

    #player = null
    #currentEnemy = null

    #remainingEnemies = null
    #enemyAttackIndex = 0

    constructor() {
        
    }
    // Public API ------------------

    playCard(cardElement) {
        return true
    }

    endTurn () {
        
    }

    selectNewCard(cardElement) {

    }

    #performEffect(...effects) { 
        //private
    }

    #cardExists(name) {
        return true
    }

    #addCardToDeck(name) {
        // if card is valid, add to deck
    }

    #addCardToHand(name) {
        
    }

    get gameState () {
        return this.#gameState
    }

    get currentLevel () {
        return this.#currentLevel
    }

    get turn () {
        return this.#turn
    }

    get deck () {
        return this.#deck
    }

    get hand () {
        return this.#hand
    }

    get discardPile () {
        return this.#discard
    }

    get currentEnemy () {
        return this.#currentEnemy
    }

    get player () {
        return this.#player
    }

    init () {
        this.player = null
        this.turn = 0
        this.deck = []
        this.hand = []
        this.discardPile = []
        this.currentEnemy = {}
        this.remainingEnemies = []
        this.currentLevel = 1
        this.currentEnemy = null;
        this.enemyAttackIndex = 0;
    }
}

class Hero {

    #architype;
    #health = 0;
    #armor = 0;
    #debuffs = [];
    #buffs = [];
    #mana = 0;
    #starting_mana = 0

    get mana() { return this.#mana }
    get architype() { return this.#architype }
    get health() { return this.#health }
    get armor() { return this.#armor }
    get debuffs() { return [...this.#debuffs] }
    get buffs() { return [...this.#buffs] }

    constructor(architype) {
        this.#architype = architype;
        this.#initializeWithName(architype);
    }

    #initializeWithName(architype) {

        console.log(`Initializing hero: ${this.#architype}`);

        if (architype === 'warrior') {
            this.health = 100
            this.armor = 50
        }else if (architype === 'wizard') {
            this.#health = 80
            this.armor = 0
            this.#mana = 3
        } else if (architype === 'barbarian' ) {
            this.#health = 100
            this.armor = 0
        } else {
            console.log('HERO TYPE NOT RECOGNIZED')
        }
    }
}

class Enemy {

    name = null
    description = null
    maxHealth = null
    health = null
    actions = []
    buffs = []
    debuffs = []
    portrait = null

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



class EnemyShaman extends Enemy {
    constructor() {
        super();
        this.name = 'Orthic Shaman'
        this.description = 'His helmet is 100% organic boar skull'
        this.portrait = 'img/axe-shaman.png'
        this.maxHealth = 99
        this.health = 99
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
        this.maxHealth = 87
        this.health = 87
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
        this.maxHealth = 69
        this.health = 69
        this.actions = [
            new EnemyAction('Swipe', 'jumps and swipes with its claws', {'damage': 10}),
            new EnemyAction('Pounce', 'leaps at you, attacking with fang and claw', {'damage': 11}),
            new EnemyAction('Screech', 'lets out a deafening screech', {'damage': 12})
        ]
    }
}

class Effect {
    constructor(type, value) {
        this.type = type;
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
        if(name === 'strike') { return STRIKE_CARD }
        if(name === 'armor') { return ARMOR_CARD }
        if(name === 'shieldslam') { return SHIELD_SLAM }
        if(name === 'magicmissile') { return MAGIC_MISSILE_CARD }
        if(name === 'manashield') { return MANA_SHIELD_CARD }
        if(name === 'cleave') { return CLEAVE_CARD }
        if(name === 'flourish') { return FLOURISH_CARD }
    }
}

const STRIKE_CARD = new Card('strike', 0, new Effect('damage', 6));
const ARMOR_CARD = new Card('armor', 0, new Effect('armor', 6));
const SHIELD_SLAM = new Card('shieldslam', 0, new Effect('slam', 1));
const MAGIC_MISSILE_CARD = new Card('magicmissile', 1, new Effect('damage', 6));
const MANA_SHIELD_CARD = new Card('manashield', 2, new Effect('armor', 9), new Effect('draw', 1));
const CLEAVE_CARD = new Card('cleave', -1, new Effect('damage', 6), new Effect('bleed', 3));
const FLOURISH_CARD = new Card('flourish', 3, new Effect('damage', 9), new Effect('heal', 5));

const GameState = {
    MENU: 'menu',
    BATTLE: 'battle',
    REWARD: 'reward',
    WIN: 'win',
    LOSE: 'lose'
};