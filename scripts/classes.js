class CardGame {

    #hero = null
    #enemy = null
    #enemies = null
    #gameState = null
    #currentLevel = 0
    #turn = 0
    #enemySelectionIndex = 0
    #enemyAttackIndex = 0

    #deck = []
    #hand = []
    #discardPile = []
    #cardOptions = []

    get gameState ()    { return this.#gameState }
    get currentLevel () { return this.#currentLevel }
    get turn ()         { return this.#turn }
    get deck ()         { return this.#deck }
    get hand ()         { return this.#hand }
    get discardPile ()  { return this.#discardPile }
    get enemy ()        { return this.#enemy }
    get hero ()         { return this.#hero }
    get cardOptions ()  { return this.#cardOptions }

    constructor() {
        this.enemies = [
            new EnemyShaman, 
            new EnemyBladeRevenant, 
            new EnemyMecharaptor
        ]

        this.#enemy = this.enemies[this.#enemySelectionIndex]
    }

    playerDidChooseHero( choice ) {
        const choices = ['warrior', 'wizard', 'barbarian']
        if ( !this.#hero  && choices.indexOf(choice) >= 0 ) {
            this.#hero = new Hero(choice)
        } else {
            console.log("Invalid hero selection")
        }

        this.#deck = this.hero.startingDeck
        this.#dealHand()
    }

    
    playerDidPlayCard(position) {
        if (!hand || !hand[position] || !hand[position].effects) {
            console.error('Invalid card or card effects. position:' + position);
            return;
        }

        let card = Card.called(hand[position])

        card.effects.forEach(effect => {
            // console.log(`Processing Effect: ${effect.name} with value ${effect.value}`)
            switch (effect.name) {
                case 'damage':
                    this.#enemy.dealDamage(effect.value)
                    break;
                case 'armor':
                    this.#hero.gainArmor(effect.value)
                    break;
                default:
                    console.log(`Effect type ${effect.name} not recognized.`);
            }
        });
    }

    playerDidEndTurn () {
        // deal enemy damage
        // discard hand
    }

    playerDidSelectNewCard(name) {
        // player has chosen a card with 'name'
        // if card is valid, this.#deck.push(name)
        // cardChoices = []
        // set state to 
    }

    #dealHand () {
        while (this.#hand.length < 5) {
            if (this.#deck.length === 0) {
                this.#recycleDiscard()
            }
            this.#drawCard(this.#deck.pop());
        }
    }

    #drawCard(cardName) {
        
        if (this.#deck.length === 0) {
            this.#recycleDiscard()
        }

        this.#hand.push(this.#deck.pop())
    }

    #recycleDiscard() {
        while (this.#discardPile.length > 0) {
            this.#deck.push(this.#discardPile.pop());
        }
        this.#deck = this.#deck.sort(() => Math.random() - 0.5);
    }

    #beginNewTurn() {
        //draw cards
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

    init () {
        this.player = null
        this.turn = 0
        this.deck = []
        this.hand = []
        this.discardPile = []
        this.enemy = {}
        this.remainingEnemies = []
        this.currentLevel = 1
        this.enemy = null;
        this.enemyAttackIndex = 0;
    }
}

class Hero {

    #architype = null
    #maxHealth = 0
    #health = 0
    #armor = 0
    #debuffs = []
    #buffs = []
    #mana = 0
    #startingDeck = ["strike", "strike", "strike", "strike", "strike", "strike", "armor", "armor"]
    #starting_mana = 0

    get startingDeck() { return this.#startingDeck }
    get mana() { return this.#mana }
    get architype() { return this.#architype }
    get maxHealth() { return this.#maxHealth }
    get health() { return this.#health }
    get armor() { return this.#armor }
    get debuffs() { return [...this.#debuffs] }
    get buffs() { return [...this.#buffs] }

    constructor(architype) {
        this.#architype = architype;
        this.#initializeWithName(architype);
    }

    #initializeWithName(architype) {

        if (architype === 'warrior') {
            this.#health = 100
            this.#armor = 50
        }else if (architype === 'wizard') {
            this.#health = 80
            this.#armor = 0
            this.#mana = 3
        } else if (architype === 'barbarian' ) {
            this.#health = 100
            this.#armor = 0
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
    nextAttack = null

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
        this.description = '100% organic boar skull!'
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
        // Example:
        // let strike = Card.called('strike');
    }
}

Card.cards = {
    'strike': new Card('strike', 0, new Effect('damage', 6)),
    'armor': new Card('armor', 0, new Effect('armor', 6)),
    'shieldslam': new Card('shieldslam', 0, new Effect('slam', 1)),
    'magicmissile': new Card('magicmissile', 1, new Effect('damage', 6)),
    'manashield': new Card('manashield', 2, new Effect('armor', 9), new Effect('draw', 1)),
    'cleave': new Card('cleave', -1, new Effect('damage', 6), new Effect('bleed', 3)),
    'flourish': new Card('flourish', 3, new Effect('damage', 9), new Effect('heal', 5))
}

const GAME_STATE = {
    MAIN_MENU: 'main_menu',
    HERO_SELECT: 'hero_menu',
    HERO_INTRO: 'hero_intro',
    ENEMY_INTRO: 'enemy_intro',
    BATTLE: 'battle',
    REWARD: 'reward',
    WIN: 'win',
    LOSE: 'lose',
    CREDITS: 'credits'
};