
import EventEmitter from "eventemitter3";
import { Clock } from "./mechanics/Clock";

export class Engine extends EventEmitter {
    clock: Clock
    constructor() {
        super();
        this.clock = new Clock(this, {phasesPerEpisode: 4, startingEpisode: 1});
    }

}