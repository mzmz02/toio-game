/// <reference types="node" />
import { StandardId } from './standard-id';
export declare type DataType = {
    buffer: Uint8Array;
    data: PositionIdInfo;
    dataType: 'id:position-id';
} | {
    buffer: Uint8Array;
    data: StandardIdInfo;
    dataType: 'id:standard-id';
} | {
    buffer: Uint8Array;
    dataType: 'id:position-id-missed';
} | {
    buffer: Uint8Array;
    dataType: 'id:standard-id-missed';
};
export interface PositionIdInfo {
    x: number;
    y: number;
    angle: number;
    sensorX: number;
    sensorY: number;
}
export interface StandardIdInfo {
    standardId: StandardId;
    angle: number;
}
export declare class IdSpec {
    parse(buffer: Buffer): DataType;
}
