/// <reference types="node" />
export interface DataType {
    buffer: Uint8Array;
    data: {
        isSloped: boolean;
        isCollisionDetected: boolean;
        isDoubleTapped: boolean;
        orientation: number;
    };
    dataType: 'sensor:detection';
}
export declare class SensorSpec {
    parse(buffer: Buffer): DataType;
}
