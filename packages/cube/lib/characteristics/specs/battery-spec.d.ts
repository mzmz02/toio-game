/// <reference types="node" />
export interface DataType {
    buffer: Uint8Array;
    data: {
        level: number;
    };
    dataType: 'battery:battery';
}
export declare class BatterySpec {
    parse(buffer: Buffer): DataType;
}
