
import EventEmitter from "eventemitter3";
import { PlayerCollection } from "./collections/PlayerCollection";
import { Clock } from "./mechanics/Clock";
import {TribeCollection } from "./collections/TribeCollection";
import RNG from "./utils/Rng";
import { TraitList } from "./collections/TraitList";
import { StrategyList } from "./collections/StrategyList";
import { EventPool } from "./collections/EventPool";

export class Engine extends EventEmitter {
    rng: RNG
    players: PlayerCollection
    tribes: TribeCollection
    traits: TraitList
    strategies: StrategyList
    events: EventPool
    clock: Clock
    constructor() {
        super();
        this.rng = new RNG();
        this.clock = new Clock({phasesPerEpisode: 4, startingEpisode: 1});
        this.players = new PlayerCollection(this);
        this.tribes = new TribeCollection(this);
        this.traits = new TraitList();
        this.strategies = new StrategyList();
        this.events = new EventPool(this);
    }


}