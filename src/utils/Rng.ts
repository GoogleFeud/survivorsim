
import {alea} from "seedrandom";

export interface Weighted {
    weight: number
}

export default class RNG {
    seed: ReturnType<typeof alea>
    constructor(seed?: string) {
        this.seed = alea(seed);
    }

    btw(min: number, max: number) : number
    btw(min: number, max: number, amount = 1) : number|number[] {
        if (amount === 1) return Math.floor(this.seed() * (max - min) + min);
        return Array.from({length: Math.max(amount, 1)}, () => Math.floor(this.seed() * (max - min) + min));
    }

    bool() : boolean {
        return Math.round(this.seed()) > 0.5;
    }

    arr<T>(array: T[], amount = 1) : T|T[] {
        if (amount === 1) return array[Math.floor(this.seed() * array.length)];
        return Array.from({length: Math.max(amount, 1)}, () => array[Math.floor(this.seed() * array.length)]);
    }

    arrUnique<T>(array: T[], amount = 1, filter?: (val: T, index: number) => boolean) : T|T[] {
        if (amount === 1) return array[Math.floor(this.seed() * array.length)];
        const clone = filter ? array.filter(filter):array.slice();
        return Array.from({length: Math.max(amount, 1)}, () => clone.splice(Math.floor(this.seed() * array.length), 1)[0]);
    }

    arrWeighted<T extends Weighted>(array: T[], amount = 1) : Array<T|undefined> {
        const weightSum = array.reduce((acc, val) => acc + val.weight, 0);
        return Array.from({length: Math.max(amount, 1)}, () => {
            const target = Math.floor(this.seed() * weightSum);
            let total = 0;
            for (const el of array) {
                total += el.weight;
                if (total >= target) return el;
            }
        });
    }

    arrWeightedUnique<T extends Weighted>(array: T[], amount = 1, filter?: (val: T, index: number) => boolean) :Array<T|undefined> {
        const clone = filter ? array.filter(filter):array.slice();
        return Array.from({length: Math.max(amount, 1)}, () => {
            const weightSum = clone.reduce((acc, val) => acc + val.weight, 0);
            const target = Math.floor(this.seed() * weightSum);
            const arrayLength = array.length;
            let total = 0;
            for (let i=0; i < arrayLength; i++) {
                const el = clone[i];
                total += el.weight;
                if (total >= target) {
                    clone.splice(i, 1);
                    return el;
                }
            }
        });
    } 

}