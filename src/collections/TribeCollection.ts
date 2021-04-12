import { Engine } from "../Engine";
import { Tribe, TribeDetails } from "../structures/Tribe";
import { Collection } from "../utils/Collection";

export class TribeCollection extends Collection<Tribe> {
    engine: Engine
    constructor(engine: Engine) {
        super();
        this.engine = engine;
    }

    add(details: TribeDetails) : Tribe {
        const tribe = new Tribe(this.engine, details);
        this.set(tribe.name, tribe);
        return tribe;
    }

    addMany(...details: TribeDetails[]) : void {
        for (const detail of details) this.set(detail.name, new Tribe(this.engine, detail));
    }

}