import { Engine } from "../Engine";
import { Player, PlayerDetails } from "../structures/Player";


export class PlayerCollection extends Map<string, Player> {
    engine: Engine
    constructor(engine: Engine) {
        super();
        this.engine = engine;
    }

    add(details: PlayerDetails) : Player {
        const player = new Player(this.engine, details);
        this.set(player.name, player);
        return player;
    }

}