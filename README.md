# Generative Adversaties

Basic browser-based dungeon crawler card battler game (images produced by a Generational Adversarial Network)

## Project Description

Crypt of the Generative Adversaties is a turn-based card battler dungeon crawler, inspired by *Dream Quest* and *Slay the Spire*.

_Delve into the hauted crypt. Battle increasingly stronger enemies, and build a deck full of potent cards and devistating combinations. Will you uncover the shocking secret hidden at the bottom of the crypt, or will you fall to the terrifying creatures that protect it?_

## Technologies Used

Javascript, CSS, HTML, DALL-E image generator, ChatGPT (quick and dirty dialog)

## Getting Started

Go to: https://fritzhuie.github.io/card-battler

Click "New Game"

## Gameplay
- Players start with a deck of cards, a health pool, and three power crystals.
- Each round, an emeny is presented, and the player battles the enemy to the death.
- Each turn, players draw cards, and the player may play any of the available cards in their hand.
- Each turn, the enemy will signal a damage value, or protection value.
- At the end of the turn, the enemy will either attack the player for the signaled value, or add armor worth the armor amount.
- Cards either do damage, or protect the player with armor.
- Damage applies to armor first, then to health.
- If the enemy's health reaches 0, the player immediately progresses to the next round.
- If the player's health reaches 0, the player loses immediately.


## Next Steps

- Add a final boss 
- Balance gameplay

   | Level           | 1    | ... |  6  | ... |  Final Boss  |
   | :-------------- | :--: | :-: | :-: | :-: | :----------: |
   | Win Rate        | 99%  | ... | ~50% | ... | 10%          |

- Add 15-20 randomized enemies, add thematic action sequences
     - Damage
     - Armor
     - Bleed (debuff)
     - Enrage (buff)
     - Hide (buff)

- Add cards with the following mechanics:
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

- Add 8-bit background music
  
- Sound effects for player actions that correspond to different card types
   - Physical attacks
   - Magic attacks
   
- Sound effects for boss intros and attacks
