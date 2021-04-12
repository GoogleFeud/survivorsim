
/**
 * Represents one memory of a player. A memory is stored on the player and represents something that 
 * happened, that can influence the choices that the player makes.
 * 
 * A memory can expire or it can stay on the player forever. A memory can aslo have a mood boost.
 */

export interface Memory {
    [key: string]: unknown,
    name: string,
    moodBoost?: number,
    description?: string,
    expiresIn?: {episodes?: number, phases: number},
    _fn?: Function
}