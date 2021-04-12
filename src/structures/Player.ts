import { MemoryList } from "../collections/MemoryList";
import { RelationshipCollection } from "../collections/RelationshipCollection";
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

export class Player {
    engine: Engine
    name: string
    middleName: string
    age: number
    job?: string
    traits: Set<string> // Trait ID
    strategy: BaseStrategy
    mood: number
    memories: MemoryList
    hooks: HookCollector
    eliminated: boolean
    relationships: RelationshipCollection
    tribe?: Tribe
    constructor(engine: Engine, details: PlayerDetails) {
        this.engine = engine;
        this.name = details.name;
        this.middleName = details.middleName;
        this.age = details.age ?? engine.rng.btw(19, 54);
        this.job = details.job;
        this.tribe = details.tribe;
        this.eliminated = false;
        this.hooks = new HookCollector();
        this.traits = new Set();
        this.relationships = new RelationshipCollection();
        this.mood = 0;
        this.memories = new MemoryList(this);
        for (const trait of details.traits) {
            trait.hook(this);
            this.traits.add(trait.id);
        }
        this.strategy = details.strategy ? new details.strategy(this): new (engine.rng.arrWeighted(engine.strategies)[0] as typeof BaseStrategy)(this);
    }

    get fullName() : string {
        return `${this.name} ${this.middleName}`;
    }

}