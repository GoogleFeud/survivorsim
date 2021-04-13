import { AllianceList } from "../collections/AllianceList";
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
    alliances: AllianceList
    constructor(engine: Engine, data: TribeDetails) {
        this.engine = engine;
        this.name = data.name;
        this.color = data.color;
        this.alliances = new AllianceList(this);
    }

    countMembers() : number {
        return this.engine.players.count(p => p.tribe === this && !p.eliminated);
    }

    members() : Array<Player> {
        return this.engine.players.filterArray(p => p.tribe === this && !p.eliminated);
    }

    eliminated() : Array<Player> {
        return this.engine.players.filterArray(p => p.tribe === this && p.eliminated);
    }

}