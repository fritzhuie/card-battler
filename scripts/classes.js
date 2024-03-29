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

    #startingMana = null
    #mana = null

    #deck = []
    #hand = []
    #discardPile = []
    #cardChoices = []


    get gameState ()    { return this.#gameState }
    get startingMana () { return this.#startingMana }
    get mana ()         { return this.#mana }
    get currentLevel () { return this.#currentLevel }
    get turn ()         { return this.#turn }
    get deck ()         { return this.#deck }
    get hand ()         { return this.#hand }
    get discardPile ()  { return this.#discardPile }
    get enemy ()        { return this.#enemy }
    get hero ()         { return this.#hero }
    get cardChoices ()  { return this.#cardChoices }

    constructor() {

        this.#enemies = [
            new EnemyGoblin,
            new EnemyWizard,
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
            this.#startingMana = 3
            this.#mana = this.#startingMana
        } else if (choice === 'wizard') {
            this.#hero = new Wizard()
            this.#startingMana = 3
            this.#mana = this.#startingMana
        } else if (choice === 'barbarian') {
            this.#hero = new Barbarian()
            this.#startingMana = 3
            this.#mana = this.#startingMana
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

        const enemyAction = this.#enemy.performNextAction()
        console.log(enemyAction.effects)
        for(let effect of enemyAction.effects ) {
            console.log(effect)
            if (effect.name === 'damage') {
                if (this.#enemy.hasStatusEffect('empower')) {
                    this.#hero.takeDamage(effect.value) * 2
                } else {
                    this.#hero.takeDamage(effect.value)
                }
                
            }
        }

        this.#hero.processEndOfTurnStatusEffects()
        this.#enemy.processEndOfTurnStatusEffects()
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

        const card = Card.called(this.#hand[index])

        if (card.cost > this.#mana) { 
            console.error(`Not enough mana: + '${this.#hand[index]}'`);
            return
        }

        this.#mana = this.#mana - card.cost

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
                    if (this.#hero.hasStatusEffect('empower')) {
                        this.#enemy.takeDamage(effect.value * 2)
                    }
                    this.#enemy.takeDamage(effect.value)
                    console.log(`${effect.name} dealt ${effect.value} damage to ${this.#enemy.name}`)
                    break;
                case 'armor':
                    this.#hero.gainArmor(effect.value)
                    break;
                case 'enfeable':
                case 'stun':
                case 'bleed':
                case 'burn':
                case 'chill':
                    this.#enemy.gainStatusEffect(effect.name, effect.value)
                    break;
                case 'mana':
                    this.#mana = Math.max(this.mana + effect.value, this.#startingMana)
                    break;
                case 'bleed-damage':
                    const damage = 0
                    damage = this.#enemy.statusEffects["bleed"] ? this.#enemy.statusEffects["bleed"].value * effect.value : 0
                    this.#enemy.takeDamage(damage)
                    break;
                case 'empower':
                    this.#hero.gainStatusEffect(effect.name, effect.value)
                    break;
                case 'armor-damage':
                    this.#enemy.takeDamage(this.#hero.armor * effect.value)
                    break;
                case 'mana-damage':
                    this.#enemy.takeDamage(this.#hero.mana * effect.value)
                    break;
                case 'draw':
                    for (let i=0; i<effect.value;i++){
                        this.#drawCard()
                    }
                    break;
                case 'heal':
                    this.#hero.gainHealth(effect.value)
                    break;
                default:
                    console.log(`ERROR: Effect type '${effect.name}' not recognized.`);
            }
        });

        performEffect(name)
    }

    #beginPreBattle() {
        this.#gameState = GAME_STATE.PRE_BATTLE
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
        this.#mana = this.#startingMana
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
        if (this.#gameState !== GAME_STATE.CARD_SELECT) { return }

        let shuffled = null
        if (this.#hero.architype === 'warrior') {
            shuffled = Card.warriorCards.slice();
        } else if (this.#hero.architype === 'wizard') {
            shuffled = Card.wizardCards.slice();
        } else if (this.#hero.architype === 'barbarian') {
            shuffled = Card.barbarianCards.slice();
        } else {
            console.log("CARD CHOICES NOT FOUND")
            return
        }
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    
        this.#cardChoices = shuffled.slice(0, 3);
    }
    
    #addCardToDeck(name) { }
    #addCardToHand(name) { }
}

class Hero {

    #architype = null
    #maxHealth = null
    #health = null
    #armor = 0
    #statusEffects = []
    #startingDeck = []

    get architype() { return this.#architype }
    get startingDeck() { return this.#startingDeck }
    get maxHealth() { return this.#maxHealth }
    get health() { return this.#health }
    get armor() { return this.#armor }
    get statusEffects() { return [...this.#statusEffects] }

    constructor(architype, maxHealth, startingDeck) {
        this.#maxHealth = maxHealth
        this.#health = maxHealth
        this.#startingDeck = startingDeck
        this.#architype = architype
    }

    gainArmor(value) {
        this.#armor+=value
    }

    gainHealth(value) {
        console.log(`health: ${this.#health}`)
        console.log(`gain ${value} health???`)
        this.#health += value
        if(this.#health > this.#maxHealth) { this.#health = this.#maxHealth }
        console.log(`health: ${this.#health}`)
    }

    hasStatusEffect(name) {
        for (let effect of this.statusEffects) {
            console.log("Found effect:", effect.value);
            if (effect.name === name ) { return effect.value }
        }
        return 0
    }

    takeDamage(value) {
        this.#health -= value
    }

    gainStatusEffect(name, value) {
        if (this.hasStatusEffect(name)) {
            this.#statusEffects[name].value += value
        }
        this.#statusEffects.push(new Effect(name, value))
    }

    processEndOfTurnStatusEffects() {
        // *should* be the same as enemy version? (stretch goal)
    }

    processStartOfTurnStatusEffects() {

        // decrement all status effects, remove the expired ones

        for (let i = this.statusEffects.length - 1; i >= 0; i--) {
            if (this.statusEffects[i].value <= 1) {
                this.statusEffects.splice(i, 1);
            } else {
                this.statusEffects[i].value--;
            }
        }
    }
}

class Warrior extends Hero {
    constructor(){

        const warriorStartingDeck = ["strike", "strike", "strike", "strike", "strike", "armor", "armor"]
        super('warrior', 100, warriorStartingDeck)
        this.name = "Ser Kavin"
    }
}

class Wizard extends Hero {
    constructor(){
        const wizardStartingDeck = ["fireblast", "fireblast", "fireblast", "fireblast", "manashield", "manashield"]
        super('wizard', 100, wizardStartingDeck)
        this.name = "Merlin"
    }
}

class Barbarian extends Hero {
    constructor(){
        const barbarianStartingDeck = ["cleave", "cleave", "cleave", "cleave", "cleave", "flourish", "flourish"]
        super('barbarian', 100, barbarianStartingDeck)
        this.name = "Aiyaruk"
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

    gainStatusEffect(name, value) {
        if (this.hasStatusEffect(name)) {
            for(let effect of this.statusEffects) {
                if(effect.name === name) {
                    effect.value += value
                    return
                }
            }
        }else {
            this.statusEffects.push(new Effect(name, value))
        }
    }

    nextAction() {
        return this.actions[this.actionIndex]
    }

    performNextAction() {

        let action = this.actions[this.actionIndex]
        this.actionIndex = this.actionIndex >= this.actions.length - 1 ? 0 : this.actionIndex + 1

        return action
    }

    hasStatusEffect(name) {
        for (let effect of this.statusEffects) {
            console.log("Found effect:", effect.value);
            if (effect.name === name ) { return effect.value }
        }
        return 0
    }

    processEndOfTurnStatusEffects() {

        // Effects that process at end of turn: 'bleed', 'burn'

        for (let effect of this.statusEffects) {
            if (effect.name === 'bleed' ) {
                this.health-=effect.value
            } else if (effect.name === 'burn' ) {
                this.health-=effect.value
            }
        }
    }

    processStartOfTurnStatusEffects() {

        // decrement all status effects, remove the expired ones

        for (let i = this.statusEffects.length - 1; i >= 0; i--) {
            if (this.statusEffects[i].value <= 1) {
                this.statusEffects.splice(i, 1);
            } else {
                this.statusEffects[i].value--;
            }
        }
    }
}

class EnemyGoblin extends Enemy {
    constructor() {
        super();
        this.name = 'Stinky Goblin'
        this.description = 'Stinky Goblin.'
        this.portrait = 'goblin'
        this.maxHealth = 25
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Boar Charge','rams you with its tusks!', new Effect('damage', 5)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 6)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 7)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 8))
        ]
    }
}

class EnemyShaman extends Enemy {
    constructor() {
        super();
        this.name = 'Orthic Shaman'
        this.description = '100% organic boar skull!'
        this.portrait = 'axe-shaman'
        this.maxHealth = 25
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Boar Charge','rams you with its tusks!', new Effect('damage', 6)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 7)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 8)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 9))
        ]
    }
}

class EnemyWizard extends Enemy {
    constructor() {
        super();
        this.name = 'Necrotic Wizard'
        this.description = 'wizard'
        this.portrait = 'old-wizard'
        this.maxHealth = 25
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Boar Charge','rams you with its tusks!', new Effect('damage', 6), new Effect('burn', 3)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 7), new Effect('chill', 3)),
            new EnemyAction('Axe Swing', 'swings its putrid axe!', new Effect('damage', 8), new Effect('enfeable', 3)),
        ]
    }
}

class EnemyBladeRevenant extends Enemy {
    constructor() {
        super();
        this.name = 'Blade Revenant'
        this.description = "Hint: He's gonna hit you with the sword."
        this.portrait = 'male-undead'
        this.maxHealth = 25
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Slash', 'begins winding up',                   new Effect('damage', 0)),
            new EnemyAction('Slash', 'swings its greatsword in a wide arc', new Effect('damage', 15)),
            new EnemyAction('Slash', 'swings its greatsword in a wide arc', new Effect('damage', 15)),
            new EnemyAction('Slash', 'swings its greatsword in a wide arc', new Effect('damage', 15))
        ]
    }
}

class EnemyMecharaptor extends Enemy {
    constructor() {
        super();
        this.name = 'Mecha Raptor'
        this.description = 'They Didn’t Stop To Think If They Should'
        this.portrait = 'mecharaptor'
        this.maxHealth = 200
        this.health = this.maxHealth
        this.armor = 0
        this.actions = [
            new EnemyAction('Swipe', 'jumps and swipes with its claws', new Effect('damage', 10)),
            new EnemyAction('Pounce', 'leaps at you, attacking with fang and claw', new Effect('damage', 11)),
            new EnemyAction('Screech', 'lets out a deafening screech', new Effect('damage', 12))
        ]
    }
}

class EnemyAction {
    constructor(name, description, ...effects) {
        this.name = name
        this.description = description
        this.effects = effects
    }
}

class Effect {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Card {
    constructor(name, architype, baseCost, ...effects) {
        this.name = name;
        this.architype = architype;
        this.cost = baseCost;
        this.effects = effects;
    }

    static called(name) {
        return Card.cards[name]
        //  Card.called('strike');
    }
}

Card.image = {
    'strike': '🗡️',
    'armor': '🛡️',
    'fireblast': '🔥',
    'manashield': '✨',
    'cleave': '🗡️',
    'flourish': '⽍',
    'hamstring': '🔪',
    'hiltpummel':'🗡️',
    'raiseshield':'🛡️',
    'shieldslam':'💥',
    'battlestance':'🕺',
    'disenguinate':'🩸',
    'eyegouge':'✌️',
    'kick':'🦶',
    'howl':'💬',
    'batheinblood':'🍴',
    'magicmissile':'🪄',
    'icebolt':'❄️',
    'polymorph':'🐑',
    'arcaneblast':'❈',
    'pyroblast':'💥',
    'channel':'⚡️',
    'drinkblood': "🧛‍♀️"
}

Card.description = {
    'strike': 'Deals 5 Damage',
    'armor': 'Gain 5 armor',
    'fireblast': 'Deal 5 Damage & burn the enemy.',
    'manashield': 'Gain 5 armor, draw a card',
    'cleave': 'Deal damage, cause bleed',
    'flourish': 'Deal X damage, heal for X',
    'hamstring': 'Weaken your opponent',
    'hiltpummel':'Stun your opponent',
    'raiseshield':'Gain 12 armor',
    'shieldslam':'Deal damage equal to your armor',
    'battlestance':'Empower yourself until next turn',
    'disenguinate':`Deal damage equal to 'bleed'`,
    'eyegouge':'Poke your enemy in both eyes, stunning them',
    'kick':'Deal damage, draw a card',
    'drinkblood':'Drink your enemies blood to gain health',
    'magicmissile':'Deal damage equal to your mana x 3',
    'icebolt':'Deal 5 damage and chill your enemy',
    'polymorph':'Turn your opponent into a harmless sheep',
    'arcaneblast':'Deal 16 damage',
    'pyroblast':'Deal 12 damage, apply 5 burn',
    'channel':'Refill your mana'
}

Card.cards = {
    /* Starting cards */
    'strike':       new Card('Strike', 'warrior', 1, new Effect('damage', 5)),
    'armor':        new Card('Armor Up', 'warrior', 1, new Effect('armor', 5)),
    'fireblast':    new Card('Fire Blast', 'wizard', 1, new Effect('damage', 5), new Effect('burn', 5)),
    'manashield':   new Card('Mana Shield', 'wizard', 1, new Effect('armor', 5), new Effect('draw', 1)),
    'cleave':       new Card('Cleave', 'barbarian', 1, new Effect('damage', 5), new Effect('bleed', 3)),
    'flourish':     new Card('Flourish', 'barbarian', 1, new Effect('damage', 3), new Effect('heal', 3)),

    /* Shared cards */

    /* Warrior cards */
    'hamstring':    new Card('Hamstring', 'warrior', 0, new Effect('damage', 3), new Effect('enfeable', 2)),
    'hiltpummel':   new Card('Hilt Pummel', 'warrior', 1, new Effect('damage', 3), new Effect('stun', 1)),
    'raiseshield':  new Card('Raise Shield', 'warrior', 2, new Effect('armor', 12)),
    'shieldslam':   new Card('Shield Slam', 'warrior', 1, new Effect('armor-damage', 1)),
    'battlestance': new Card('Battlestance', 'warrior', 0, new Effect('empower', 1)),

    /* Barbarian cards */
    'eyegouge':     new Card('Eye poke', 'barbarian', 1, new Effect('stun', 1)),
    'kick':         new Card('Kick', 'barbarian', 1, new Effect('damage', 3), new Effect('draw', 1)),
    'disenguinate': new Card('Disenguinate', 'barbarian', 1, new Effect('damage', 10)),
    'drinkblood':   new Card('Drink Blood', 'barbarian', 1, new Effect('heal', 1)),

    /* Wizard cards */
    'magicmissile': new Card('Magic Missile', 'wizard', 0, new Effect('mana-damage', 3)),
    'icebolt':      new Card('Icebolt', 'wizard', 1, new Effect('damage', 6), new Effect('chill', 1)),
    'polymorph':    new Card('Polymorph', 'wizard', 1, new Effect('stun', 1)),
    'arcaneblast':  new Card('Arcaneblast', 'wizard', 2, new Effect('damage', 16)),
    'pyroblast':    new Card('Pyroblast', 'wizard', 2, new Effect('damage', 12), new Effect('burn', 5)),
    'channel':      new Card('Channel', 'wizard', 1, new Effect('mana', 3)),
}

Card.warriorCards = ['hamstring', 'hiltpummel', 'raiseshield', 'shieldslam', 'battlestance']
Card.wizardCards = ['magicmissile', 'icebolt', 'polymorph', 'arcaneblast', 'pyroblast', 'channel']
Card.barbarianCards = ['disenguinate', 'eyegouge', 'kick', 'drinkblood']