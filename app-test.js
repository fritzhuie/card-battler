// Hero Sidebar Elements
const heroMaxHp = document.getElementById('hero-max-hp');
const heroHp = document.getElementById('hero-hp');
const heroArmor = document.getElementById('hero-armor');

// Play Area Elements
const cardContainer = document.getElementById('card-container');
const actionDescription = document.getElementById('action-description');
const cards = document.querySelectorAll('.card'); // Selects all card elements

// Enemy Section Elements
const enemyName = document.getElementById('enemy-name');
const enemyMaxHp = document.getElementById('enemy-max-hp');
const enemyArmor = document.getElementById('enemy-armor');
const enemyHp = document.getElementById('enemy-hp');
const enemyAttack = document.getElementById('enemy-attack');

let game = {};

init() {
    game = new CardGame();

}

render () {

}
