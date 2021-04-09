
/**
 * The HookCollector is very similar to the EventEmitter, except it has a few notable differences which the survivorsim engine utilizes:
 * 
 * - The "on" function now returns the functions we give it - makes it easier to remove hooks
 * - The "emit" function now returns the return values of all the hooks
 * - Each hook needs to call a "next" function which calls the next hook in the array. This way further checking can be cancelled by any hook call. 
 */

export class HookCollector {
    private readonly events: Record<string, Function[]>
    constructor() {
        this.events = {};
    }

    on(event: string, fn: Function) : Function {
        return (this.events[event] === undefined ? (this.events[event] = [fn]) : this.events[event].push(fn) as 1) && fn;
    }

    emit<T = unknown>(event: string, ...args: Array<unknown>) : undefined|T|T[] {
        const all = this.events[event];
        if (!all || !all.length) return;
        const allLen = all.length;
        if (allLen === 1) return all[0](...args, () => {});
        let i = 0;
        const res: Array<T> = new Array(allLen);
        const next = () => {
            if (i === allLen) return;
            res[i] = all[i++](...args, next);
        }
        next();
        return res;
    }

    remove(event: string, fn: Function) : void {
        const events = this.events[event];
        if (!events) return;
        events.splice(events.indexOf(fn), 1);
    }

}