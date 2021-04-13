import { Alliance } from "../structures/Alliance";
import { Player } from "../structures/Player";
import { Tribe } from "../structures/Tribe";


export class AllianceList extends Array<Alliance> {
    tribe: Tribe
    constructor(tribe: Tribe) {
        super();
        this.tribe = tribe;
    }

    add(founder: Player, members: Player[]) : Alliance {
        const alliance = new Alliance(founder, members, this.tribe);
        this.push(alliance);
        return alliance;
    }

    with(player: Player) : Alliance[] {
        return this.filter(a => a.members.has(player.name));
    }

    without(player: Player) : Alliance[] {
        return this.filter(a => a.members.has(player.name));
    }

    sortByPower() : Alliance[] {
        return this.slice().sort((a, b) => a.power() - b.power());
    }

}