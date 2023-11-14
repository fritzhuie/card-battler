var strikeCard = {
    name:"Strike",
    type:"damage",
    value:5,
    cost:1
}
var armorCard = {
    name:"Protec",
    type:"armor",
    value:5,
    cost:1
}
var bigArmorCard = {
    name:"BigProtec",
    type:"armor",
    value:12,
    cost:2
}

var enemy = {
    name: "Maddie the Baddie",
    health: 23
}

var deck = [];
var hand = [];
var discard = [];

var playerHealth = 100;
var playerMana = 3;
var playerArmor = 0;

var enemyHealth = 25;
var enemyAttack = "";

function start () {
    deck.append(strikeCard);
    deck.append(strikeCard);
    deck.append(strikeCard);
    deck.append(strikeCard);
    deck.append(strikeCard);
    deck.append(armorCard);
    deck.append(armorCard);
    deck.append(bigArmorCard);
    deck.shuffle();
}

function newBattle() {
    //choose enemy
    //reset armor, mana, enemy health values
    //shuffle deck
    //start new turn
}

function dealCard () {
    if (deck.length === 0) {
        recycleDiscard()
    }
    hand.append(deck.pop());
}

function recycleDiscard() {
    while (discard.length > 0) {
        deck.append(discard(pop));
    }
}

function nextTurn () {
    
    hand.append(deck.pop());
    hand.append(deck.pop());
    hand.append(deck.pop());
    hand.append(deck.pop());
    // enemy deals damage
    //check that player health > 0
}

function playCard(card) {
    //check if card can be played
    //move card from hand to discard
    //do card thing
    //check that enemy health > 0
}

