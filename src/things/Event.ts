import { Engine } from "../Engine";
import { Bitfield } from "../utils/Bitfield";
import { Weighted } from "../utils/Rng";


export const enum EVENT_VARIANTS {
    ALLIANCE = 1 << 0,
    LORE = 1 << 1,
    OPINION = 1 << 2,
    TWIST = 1 << 3
}

export interface Event extends Weighted {
    id: string,
    name: string,
    variants: Bitfield,
    amount?: number,
    _amount?: number,
    fn: (engine: Engine) => void
}