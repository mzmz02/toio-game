/// <reference types="node" />
export interface MotorResponse {
    buffer: Buffer;
    data: {
        operationId: number;
        reason: number;
    };
}
export interface MoveType {
    buffer: Uint8Array;
    data: {
        left: number;
        right: number;
        durationMs: number;
    };
}
export interface MoveToTarget {
    x?: number;
    y?: number;
    angle?: number;
    rotateType?: number;
}
export interface MoveToOptions {
    moveType: number;
    maxSpeed: number;
    speedType: number;
    timeout: number;
    overwrite: boolean;
}
export interface MoveToType {
    buffer: Uint8Array;
    data: {
        targets: MoveToTarget[];
        options: MoveToOptions & {
            operationId: number;
        };
    };
}
export declare class MotorSpec {
    private tag;
    constructor(tag?: {
        current: () => number;
        next: () => number;
    });
    static MAX_SPEED: number;
    static NUMBER_OF_TARGETS_PER_OPERATION: number;
    parse(buffer: Buffer): MotorResponse;
    move(left: number, right: number, durationMs?: number): MoveType;
    moveTo(targets: MoveToTarget[], options: MoveToOptions): MoveToType;
}
