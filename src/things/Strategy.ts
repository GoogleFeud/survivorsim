import { Player } from "../structures/Player";

/**
 * The player strategy decides the big moves - betrayals, voting, advantage usage, alliance forming.
 * Every player can have one strategy.
 * 
 * Strategies are similar to traits - they also listen for player hooks, but each strategy has it's own context,
 * so it can store information for future use.
 */

export class BaseStrategy {
    static weight: number
    static id: string 
    player: Player
    constructor(player: Player) {
        this.player = player;
    }
}