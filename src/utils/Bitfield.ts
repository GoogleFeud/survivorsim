

export class Bitfield {
    bits: number
    constructor(bits: number|number[]) {
        if (bits instanceof Array) this.bits = bits.reduce((acc, i) => acc | i, 0);
        else this.bits = bits;
    }

    has(bit: number|number[]) : boolean {
        if (bit instanceof Array) return bit.every(p => this.has(p));
        return (this.bits & bit) === bit; 
    }

    add(...bits: number[]) : void {
        let total = 0;
        for (const bit of bits) {
            total |= bit;
        }
        this.bits |= total;
    } 

    remove(...bits: number[]) : void {
        let total = 0;
        for (const bit of bits) {
            total |= bit;
        }
        this.bits &= ~total;
    } 

    static add(...bits: number[])  : number {
        return bits.reduce((acc, bit) => acc | bit, 0);
    }

}