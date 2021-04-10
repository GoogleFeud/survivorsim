
import EventEmitter from "eventemitter3";
import { PlayerCollection } from "./collections/PlayerCollection";
import { Clock } from "./mechanics/Clock";
import RNG from "./utils/Rng";

export class Engine extends EventEmitter {
    rng: RNG
    players: PlayerCollection
    clock: Clock
    constructor() {
        super();
        this.rng = new RNG();
        this.clock = new Clock({phasesPerEpisode: 4, startingEpisode: 1});
        this.players = new PlayerCollection(this);
    }

}