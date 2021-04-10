import { Player } from "../structures/Player";
import { Memory } from "../things/Memory";


export class MemoryCollection extends Array<Memory> {
    player: Player
    constructor(player: Player) {
        super();
        this.player = player;
    }

    add(memory: Memory) : void {
        this.push(memory);
        if (memory.moodBoost) this.player.mood += memory.moodBoost;
        if (memory.expiresIn) {
            const clock = this.player.engine.clock;
            if (!memory.expiresIn.episodes) memory.expiresIn.episodes = clock.episode;
            memory._fn = clock.schedule(memory.expiresIn.episodes, memory.expiresIn.phases, (index?: number) => {
                this.splice(index ?? this.indexOf(memory), 1);
                if (memory.moodBoost) this.player.mood -= memory.moodBoost;
            });
        }
    }

    removeAll(memoryId: string) : void {
        let i = this.length;
        while (i--) {
            const memory = this[i];
            if (memory.id === memoryId) {
                if (memory.expiresIn) {
                    memory._fn!(i);
                    this.player.engine.clock.defer(memory.expiresIn.episodes as number, memory.expiresIn.phases, memory.fn as Function);
                }
                else {
                    this.splice(i, 1);
                    if (memory.moodBoost) this.player.mood = memory.moodBoost;
                }
            }
        }
    }

}