import { MemoryList } from "../collections/MemoryList";
import { OpinionCollection } from "../collections/OpinionCollection";
import { Engine } from "../Engine";
import { HookCollector } from "../mechanics/HookCollector";
import { BaseStrategy } from "../things/Strategy";
import { Trait } from "../things/Trait";
import { Tribe } from "./Tribe";

export interface PlayerDetails {
    name: string,
    middleName: string,
    age?: number,
    job?: string,
    tribe?: Tribe
    traits: Array<Trait>,
    strategy?: typeof BaseStrategy
}

export class Player extends HookCollector {
    engine: Engine
    name: string
    middleName: string
    age: number
    job?: string
    traits: Set<string> // Trait ID
    strategy: BaseStrategy
    private _mood: number
    memories: MemoryList
    eliminated: boolean
    opinions: OpinionCollection
    tribe?: Tribe
    constructor(engine: Engine, details: PlayerDetails) {
        super();
        this.engine = engine;
        this.name = details.name;
        this.middleName = details.middleName;
        this.age = details.age ?? engine.rng.btw(19, 54);
        this.job = details.job;
        this.tribe = details.tribe;
        this.eliminated = false;
        this.traits = new Set();
        this.opinions = new OpinionCollection(this);
        this._mood = 0;
        this.memories = new MemoryList(this);
        for (const trait of details.traits) {
            trait.hook(this);
            this.traits.add(trait.id);
        }
        this.strategy = details.strategy ? new details.strategy(this): new (engine.rng.arrWeighted(engine.strategies)[0] as typeof BaseStrategy)(this);
    }

    get mood() : number {
        return this._mood;
    }

    set mood(val: number) {
        this.emit("moodChange", this.mood, val);
        this._mood = val;
    }

    get fullName() : string {
        return `${this.name} ${this.middleName}`;
    }

}