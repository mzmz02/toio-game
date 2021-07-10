/// <reference types="node" />
import { EventEmitter } from 'events';
import { Characteristic } from 'noble-mac';
export interface Event {
    'sensor:slope': (data: {
        isSloped: boolean;
    }) => void;
    'sensor:collision': (data: {
        isCollisionDetected: boolean;
    }) => void;
    'sensor:double-tap': () => void;
    'sensor:orientation': (data: {
        orientation: number;
    }) => void;
}
export declare class SensorCharacteristic {
    static readonly UUID = "10b201065b3b45719508cf3efcd7bbae";
    private readonly characteristic;
    private readonly eventEmitter;
    private readonly spec;
    private prevStatus;
    constructor(characteristic: Characteristic, eventEmitter: EventEmitter);
    getSlopeStatus(): Promise<{
        isSloped: boolean;
    }>;
    getCollisionStatus(): Promise<{
        isCollisionDetected: boolean;
    }>;
    getDoubleTapStatus(): Promise<{
        isDoubleTapped: boolean;
    }>;
    getOrientation(): Promise<{
        orientation: number;
    }>;
    private read;
    private onData;
}
