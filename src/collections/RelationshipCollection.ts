

export class RelationshipCollection {
    private _: Record<string, number>
    constructor() {
        this._ = {};
    }

    get(player: string) : number {
        return this._[player] ?? 0;
    }

    inc(player: string, amount = 1) : number {
        return player in this._ ? this._[player] += amount : this._[player] = amount;
    }

    dec(player: string, amount = 1) : number {
        return player in this._ ? this._[player] -= amount : this._[player] = -amount;
    }

    clear() : void {
        this._ = {};
    }

} 