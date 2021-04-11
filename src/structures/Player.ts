import { MemoryCollection } from "../collections/MemoryCollection";
import { Engine } from "../Engine";
import { HookCollector } from "../mechanics/HookCollector";
import { Trait } from "../things/Trait";

export interface PlayerDetails {
    name: string,
    middleName: string,
    age?: number,
    job?: string,
    traits: Array<Trait>
}

export class Player {
    engine: Engine
    name: string
    middleName: string
    age: number
    job?: string
    traits: Set<string> // Trait ID
    mood: number
    memories: MemoryCollection
    hooks: HookCollector
    constructor(engine: Engine, details: PlayerDetails) {
        this.engine = engine;
        this.name = details.name;
        this.middleName = details.middleName;
        this.age = details.age ?? engine.rng.btw(19, 54);
        this.job = details.job;
        this.hooks = new HookCollector();
        this.traits = new Set();
        for (const trait of details.traits) {
            trait.fn(this);
            this.traits.add(trait.id);
        }
        this.mood = 0;
        this.memories = new MemoryCollection(this);
    }

    get fullName() : string {
        return `${this.name} ${this.middleName}`;
    }

}