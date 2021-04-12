import { Trait } from "../things/Trait";


export class TraitList extends Array<Trait> {
    constructor() {
        super();
    }

    add(obj: Trait) : Trait {
        this.push(obj);
        return obj;
    }

    addMany(...objs: Trait[]) : void {
        this.push(...objs);
    }
}