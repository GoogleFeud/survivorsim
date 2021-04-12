
/**
 * The HookCollector is very similar to the EventEmitter, except it has a few notable differences which the survivorsim engine utilizes:
 * 
 * - The "on" function now returns the functions we give it - makes it easier to remove hooks
 * - The "emit" function now returns the return values of all the hooks
 * - If the hook decides that the hooks after it shouldn't be called, it can call a method to prevent them from getting executed
 * 
 * Example:
 * 
 * hooks.on("some-event", (param1: number, param2: number, preventNext: () => void, previousResponses: Array<number>) => {
 *   return param1 + param2;
 * });
 * 
 * hooks.on("some-event", (param1: number, param2: number, preventNext: () => void, previousResponses: Array<number>) => {
 *   return param1 - param2;
 * });
 * 
 * hooks.emit("some-event", 1, 5); // [6]
 *
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
        if (allLen === 1) return all[0](...args, () => {}, []);
        const res: Array<T> = [];
        let shouldBreak = false;
        for (let i=0; !shouldBreak && i < allLen; i++) res.push(all[i](...args, () => shouldBreak = true, res));
        return res;
    }

    remove(event: string, fn: Function) : void {
        const events = this.events[event];
        if (!events) return;
        events.splice(events.indexOf(fn), 1);
    }

}