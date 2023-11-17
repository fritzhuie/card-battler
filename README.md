# Dungeon Battler
Basic browser-based dungeon crawler card battler game

## TODO:
- Implement onChange="function()" to gameplay variables
- Add monster randomizer
   - Add round reset logic
   - Add unique class cards
- implement armor interaction
- implement enemy damage system
- add game over screen

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

## Game Loop

- Player starts a New Game
   
1. Player plays any number of cards
2. Player clicks "finish turn" (Enemy action resolves)
3. Repeat until either enemy or player dies
4. New round (repeat)
5. After defeating the last enemy, player wins

## Requirements

### Front end (HTML/CSS)

- New game Screen
   - Welcome / Game over / Victory message
   - New game button

- Gameplay screen
   - Enemy portrait, health, action
   - Player hand, health, power crystal count
   - Finish turn button
   - Recent action description scroll

### Gameplay logic (JavaScript)

- List of enemies (with attributes and actions)
- List of cards (with attributes and actions)
- Card engine (that decides what happens when player plays a card)
- Gameplay state (health pools, crystals, gameover check)
