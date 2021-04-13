import { Collection } from "../utils/Collection";
import { Player } from "./Player";
import { Tribe } from "./Tribe";


export class Alliance {
    name?: string
    tribe: Tribe
    founder: Player
    members: Collection<Player>
    private _withoutFounder: Array<Player>
    constructor(founder: Player, members: Player[], tribe: Tribe) {
        this.founder = founder;
        this.members = new Collection(members.map(p => [p.name, p]));
        this.members.set(founder.name, founder);
        this._withoutFounder = members;
        this.tribe = tribe;
    }

    withoutFounder() : Array<Player> {
        return this._withoutFounder;
    }

    /**
     * The alliance strength gets calculated by adding each member's opinions of each other.
     * "Alliance Strength" means how much the people in the alliance trust each other.
     */
    strength() : number {
        let strength = 0;
        for (const [, member] of this.members) {
            for (const [, otherMember] of this.members) {
                if (member === otherMember) continue;
                strength += otherMember.opinions.get(member.name);
            }
        }
        return strength;
    }

    /**
     * What a specific member in the alliance thinks of the alliance. 
     */
    strengthPoV(member: Player) : number {
        if (!this.members.has(member.name)) return 0;
        let strength = 0;
        for (const [, otherMember] of this.members) {
            if (member === otherMember) continue;
            strength += otherMember.opinions.get(member.name);
        }
        const memberAlliances = member.alliances();
        if (memberAlliances.length === 1) return strength + 3;
        const thisAllianceStrength = this.strength();
        for (const otherAlliances of member.alliances()) {
            if (otherAlliances === this) continue;
            if (otherAlliances.strength() > thisAllianceStrength) strength -= 2;
        }
        return strength;
    }

    /** The power of this alliance in the tribe */
    power() : number {
        const strength = this.strength();
        let strengthRank = 0;
        for (const alliance of this.tribe.alliances) {
            if (alliance.strength() > strength) strengthRank++;
        }
        const allPlayersSize = this.tribe.countMembers();
        const majority = allPlayersSize % 2 === 0 ? (allPlayersSize / 2) + 1:Math.ceil(allPlayersSize / 2);
        if (this.members.size >= majority) return strengthRank + 3;
        if (this.members.size >= majority / 2 && this.members.size < majority) return strengthRank + 1;
        return strengthRank;
    }


}