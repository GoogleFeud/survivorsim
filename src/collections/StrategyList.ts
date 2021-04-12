import { BaseStrategy } from "../things/Strategy";


export class StrategyList extends Array<typeof BaseStrategy> {
    constructor() {
        super();
    }

    add(obj: typeof BaseStrategy) : typeof BaseStrategy {
        this.push(obj);
        return obj;
    }

    addMany(...objs: typeof BaseStrategy[]) : void {
        this.push(...objs);
    }

}