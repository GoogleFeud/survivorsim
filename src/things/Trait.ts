import { Weighted } from "../utils/Rng";

/**
 * A trait is a thing every player can have. 
 * Traits in players are the same as in traits in humans - "funny", "relatable", "bossy" are all personality traits a player could have.
 * "pretty", "ugly", "masochist", "gay", "racist", "homophobic" are also possible traits a player could have.
 * 
 * Traits influence the player's choices - for example, if they get invited to join an alliance, all traits are going to get called- if the traits pass, 
 * the player's strategy is going to get called to determine. A trait may also call the player's startegy to determine if it should pass.
 * 
 * Programically, traits are functions which add hooks to the player. Traits can also have a "weight" property to determine how often they can spawn in game.
 * 
 * The difference between a Strategy and a Trait:
 * - The player can have only one strategy, but many traits
 * - Strategies are meant to decide the next thing the player does
 * - Traits are meant to be responses to events on a smaller scale
 */


export interface Trait extends Weighted {
    name: string,
    id: string,
    (): void
}
