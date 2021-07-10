import { Characteristic } from 'noble-mac';
export declare class ConfigurationCharacteristic {
    static readonly UUID = "10b201ff5b3b45719508cf3efcd7bbae";
    private readonly characteristic;
    private readonly eventEmitter;
    private bleProtocolVersion?;
    constructor(characteristic: Characteristic);
    init(bleProtocolVersion: string): void;
    getBLEProtocolVersion(): Promise<string>;
    setCollisionThreshold(threshold: number): void;
    private data2result;
    private onData;
}
