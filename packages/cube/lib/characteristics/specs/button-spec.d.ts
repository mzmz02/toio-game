/// <reference types="node" />
export interface DataType {
    buffer: Uint8Array;
    data: {
        id: number;
        pressed: boolean;
    };
    dataType: 'button:press';
}
export declare class ButtonSpec {
    parse(buffer: Buffer): DataType;
}
