import { Engine } from "../Engine";
import { Player, PlayerDetails } from "../structures/Player";
import { Collection } from "../utils/Collection";

export class PlayerCollection extends Collection<Player> {
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