# Dungeon Battler
Basic browser-based dungeon crawler card battler game

## Gameplay
- Players start with a deck of cards, and a health pool, and three power crystals.
- Each round, an emeny is presented, and the player battles the enemy to the death.
- Each turn, players draw cards, and the player may play any of the available cards in their hand.
- Each turn, the enemy will signal a damage value, or protection value.
- At the end of the turn, the enemy will either attack the player for the signaled value, or add armor worth the armor amount.
- Cards either do damage, or protect the player with armor.
- Damage applies to armor first, then to health.
- If the enemy's health reaches 0, the player immediately progresses to the next round.
- If the player's health reaches 0, the player loses immediately.

## Game States

```mermaid
---
title: Menu Navigation
---

graph TD;
   Title-menu --> Choose-hero;
   Choose-hero --> Hero-intro;
   Hero-intro --> Next-enemy-intro;
   Next-enemy-intro --> Battle;
   Battle --> Player-wins;
   Battle --> Player-loses;
   Player-wins --> Post-fight-dialog;
   Post-fight-dialog --> Next-enemy-intro;
   Player-loses --> Player-death-dialog;
   Player-death-dialog --> Title-menu;
```

```mermaid
---
title: Battle loop
---
graph TD;
   New-turn-draw-cards --> Player-plays-card;
   Player-plays-card --> Perform-card-effect; 
   Perform-card-effect --> Player-plays-card;
   Perform-card-effect --> Enemy-is-dead;
   Enemy-is-dead --> Player-wins;
   Perform-card-effect --> Enemy-not-dead;
   Enemy-not-dead --> End-turn;
   End-turn --> Enemy-performs-action;
   Enemy-performs-action --> Player-is-dead;
   Enemy-performs-action --> Player-not-dead;
   Player-is-dead --> Player-loses;
   Player-not-dead --> New-turn-draw-cards;
```

## Pseudo-code for Battles
```js

newBattle() {
   initBattle()
   newTurn()
}

initBattle() {
   buildPlayerDeck()
   loadEnemy()
}

newTurn() {
   discardHand()
   refreshManaPool()
   dealCards()
}

playCard(card) {
   performCardEffect(card)
   isEnemyDead() ? playerWins()
}

endTurn() {
   performEnemyAction(action)
   isPlayerDead() ? playerLoses()
}

performCardEffect(card) {
   card('damage') ? hurtEnemy(card.effect.value)
   card('armor') ? gainArmor(card.effect.value)
}

```


## MVP goals

* As a player, I should to be able to start a game, play cards, end my turn in a loop until my character dies, or the enemy dies.

* As a player, I should see a win state when all enemies have been defeated, and a lose state when the player's health reaches 0 

* As a player, I should be able to see at least 10 random enemy types and at least 3 unique cards per class (9 total), utilizing the following mechanics:
     - Damage
     - Armor
     - Draw card
     - Bleed (debuff)
     - Disable

* As a player, I should be able to add a new card to my deck after defeating an enemy, creating a more powerful deck as more enemies are defeated
* As a player, I should experience coherant dialog

#### Stretch Goals

* Full game with *at least* one end-game boss
  
* Balanced gameplay, new players should have a ~10% chance of winning, experienced players should have a higher chance:

   | Level           | 1    | ... |  6  | ... |  Final Boss  |
   | :-------------- | :--: | :-: | :-: | :-: | :----------: |
   | Win Rate        | 99%  | ... | ~50% | ... | 10%          |

* 15-20 randomized enemies, with a variety of thematic abilities

* A variery of cards/abilities with the following mechanics
   - Direct effects
        - Damage
        - Draw
        - Restore HP
        - Restore mana   
   - Buffs
        - Armor
        - Thorns
        - Strength (+damage dealt)
        - Agility (Critical hit chance)
        - Resiliance (Decrease damage taken)   
   - Debuffs
        - Enfeable (increase damage **taken**)
        - Weaken (decrease damage **dealt**)
        - Bleed (damage per turn)
        - Stun (skip turn)

* 8-bit background music
  
* Sound effects for player actions that correspond to different card types
   - Physical attacks
   - Magic attacks
 
## Wire Frames

*Battle scene*
![wireframe](https://github.com/fritzhuie/card-battler/assets/1472318/b6bb4c6f-e3cd-4374-8a92-b4840d14b87c)
   - Defensive cards
   
* Sound effects for boss intros and attacks
