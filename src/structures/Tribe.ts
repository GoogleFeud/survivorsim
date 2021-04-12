import { Engine } from "../Engine";
import { Player } from "./Player";

export interface TribeDetails {
    name: string,
    color?: string
}

export class Tribe {
    engine: Engine
    name: string
    color?: string
    constructor(engine: Engine, data: TribeDetails) {
        this.engine = engine;
        this.name = data.name;
        this.color = data.color;
    }

    members() : Array<Player> {
        return this.engine.players.filterArray(p => p.tribe === this && !p.eliminated);
    }

    eliminated() : Array<Player> {
        return this.engine.players.filterArray(p => p.tribe === this && p.eliminated);
    }

}