import { Characteristic } from 'noble-mac';
import { MoveToTarget, MoveToOptions } from './specs/motor-spec';
export declare class MotorCharacteristic {
    static readonly UUID = "10b201025b3b45719508cf3efcd7bbae";
    private readonly characteristic;
    private readonly spec;
    private readonly eventEmitter;
    private bleProtocolVersion?;
    private timer;
    private pendingResolve;
    constructor(characteristic: Characteristic);
    init(bleProtocolVersion: string): void;
    move(left: number, right: number, durationMs: number): Promise<void> | void;
    moveTo(targets: MoveToTarget[], options: MoveToOptions): Promise<void>;
    stop(): void;
    private onData;
}
