
import { Engine } from "../Engine";
import {Event, EVENT_VARIANTS} from "../things/Event";

export class EventPool {
    private arr: Event[]
    engine: Engine
    private weightSum: number
    private _cachedPool?: Event[]
    constructor(engine: Engine) {
        this.engine = engine;
        this._cachedPool = [];
        this.arr = [];
        this.weightSum = 0;
    }

    add(event: Event) : Event {
        this.arr.push(event);
        if (event.amount) event._amount = event.amount;
        this.weightSum += event.weight;
        return event;
    }

    addMany(...events: Event[]) : void {
        for (const event of events) this.add(event);
    }

    activePool() : Event[] {
        if (!this._cachedPool) this._cachedPool = this.arr.filter((el) => el._amount === undefined || el._amount > 0);
        return this._cachedPool;
    }

    randomExec(amount = 1, variant?: EVENT_VARIANTS|EVENT_VARIANTS[]) : void {
        const pool = variant !== undefined ? this.arr.filter((el) => (el._amount === undefined || el._amount > 0) && el.variants.has(variant)):this.activePool();
        while (amount) {
            const target = this.engine.rng.seed() * this.weightSum;
            let total = 0;
            for (const el of pool) {
                if (el._amount === 0) continue;
                total += el.weight;
                if (total >= target) {
                    el.fn(this.engine);
                    amount--;
                    if (el._amount && --el._amount === 0) {
                        this.weightSum -= el.weight;
                        delete this._cachedPool;
                    }
                    break;
                };
            }
        }
    }

    reset() : void {
        for (const event of this.arr) {
            if (event.amount) event._amount = event.amount;
        }
        delete this._cachedPool;
    }

} 