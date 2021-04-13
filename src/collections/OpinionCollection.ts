import { Player } from "../structures/Player";


export class OpinionCollection {
    private _: Record<string, number>
    player: Player
    constructor(player: Player) {
        this._ = {};
        this.player = player;
    }

    get(player: string) : number {
        return this._[player] ?? 0;
    }

    inc(player: string, amount = 1) : number {
        const other = this.player.engine.players.get(player);
        if (!other) return 0;
        const val = player in this._ ? this._[player] += amount : this._[player] = amount;
        this.player.emit("opinionChange", other, val);
        this.player.emit("changedOpinionOf", this.player, val);
        return val;
    }

    dec(player: string, amount = 1) : number {
        const other = this.player.engine.players.get(player);
        if (!other) return 0;
        const val = player in this._ ? this._[player] -= amount : this._[player] = -amount;
        this.player.emit("opinionChange", val);
        this.player.emit("changedOpinionOf", this.player, val);
        return val;
    }

    clear() : void {
        this._ = {};
    }

} 