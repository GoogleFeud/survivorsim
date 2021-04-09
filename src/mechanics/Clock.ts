import EventEmitter from "eventemitter3";

/**
 * The survivorsim Clock represents the survivor cycle - not in days, but in **episodes**.
 * Every episode has an amount of phases, where a different thing happens. 
 * 
 * For example:
 * Episode 1:
 *  - Phase 1: First Impressions
 *  - Phase 2: First Look at camp
 *  - Phase 3: Immunity Challenge
 *  - Phase 4: Tribal Council
 * 
 * Episode 2:
 *  - Phase 1: Look at camp for each tribe (spawn random events)
 *  - Phase 2: Reward challenge (for lore only)
 *  - Phase 3: Immunity Challenge (decide which tribe(s) go to tribal council - here you can extend the phases)
 *  - Phase 4: Tribal Countil #1
 *  - Phase 5?: Tribal Council #2
 * 
 * You can attach events for every phase and episode:
 * ```
 * engine.clock.schedule(2, 3, () => {  // Schedule a function to execute on episode 2, phase 3
 *   engine.clock.phaseCount = 7; // Set the current episode's phases to 7. Phase count resets at the start of each episode.
 * });
 * ```
 */

export interface ClockSettings {
    phasesPerEpisode: number,
    startingEpisode?: number
}

export class Clock {
    emitter: EventEmitter
    episode: number
    phase: number
    phaseCount: number
    private originalPhaseCount: number
    private scheduledFunctions: Record<number, Record<number, Function[]>>
    private startingEpisode: number
    constructor(emitter: EventEmitter, settings: ClockSettings) {
        this.emitter = emitter;
        this.episode = this.startingEpisode = settings.startingEpisode ?? 0;
        this.phase = 0;
        this.phaseCount = settings.phasesPerEpisode;
        this.originalPhaseCount = settings.phasesPerEpisode;
        this.scheduledFunctions = {};
    }

    progress() : void {
        if (this.episode === this.startingEpisode && this.phase === 0) this.emitter.emit("episode", this.episode);
        if (this.phase === this.phaseCount) {
            this.call(this.episode, this.phase);
            this.phaseCount = this.originalPhaseCount;
            this.emitter.emit("episode", ++this.episode);
            this.phase = 0;
        } else {
            this.call(this.episode, ++this.phase);
            this.emitter.emit("phase", this.phase);
        }
    }

    speedTo(episode: number, phase = 0, phaseCounts: Record<number, number> = {}) : void {
        if (episode <= this.episode || phase > this.phaseCount || phase < 0) return;
        while (!(this.episode === episode && this.phase === phase)) {
            this.phaseCount = phaseCounts[this.episode] ?? this.phaseCount;
            this.progress();
        }
    }

    schedule(episode: number, phase: number, fn: Function) : Function {
        if (!this.scheduledFunctions[episode]) this.scheduledFunctions[episode] = {[phase]: [fn]};
        else if (!this.scheduledFunctions[episode][phase]) this.scheduledFunctions[episode][phase] = [fn];
        else this.scheduledFunctions[episode][phase].push(fn);
        return fn;
    }

    defer(episode: number, phase: number, fn: Function) : void {
        if (!this.scheduledFunctions[episode]) return;
        const arr = this.scheduledFunctions[episode][phase];
        if (!arr) return;
        arr.splice(arr.indexOf(fn), 1);
    }

    call(episode: number, phase: number) : void {
        if (!this.scheduledFunctions[episode]) return;
        const arr = this.scheduledFunctions[episode][phase];
        if (!arr) return;
        for (const fn of arr) fn(this);
        delete this.scheduledFunctions[episode][phase];
    }

}