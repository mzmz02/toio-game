"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
var events_1 = require("events");
/**
 * @hidden
 */
var ConfigurationCharacteristic = /** @class */ (function () {
    function ConfigurationCharacteristic(characteristic) {
        this.eventEmitter = new events_1.EventEmitter();
        this.characteristic = characteristic;
        if (this.characteristic.properties.includes('notify')) {
            this.characteristic.on('data', this.onData.bind(this));
        }
    }
    ConfigurationCharacteristic.prototype.init = function (bleProtocolVersion) {
        this.bleProtocolVersion = bleProtocolVersion;
    };
    ConfigurationCharacteristic.prototype.getBLEProtocolVersion = function () {
        var _this = this;
        if (this.bleProtocolVersion !== undefined) {
            return Promise.resolve(this.bleProtocolVersion);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.characteristic.subscribe(function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        _this.characteristic.write(Buffer.from([0x01, 0x00]), false);
                        _this.eventEmitter.once('configuration:ble-protocol-version', function (version) {
                            _this.characteristic.unsubscribe();
                            _this.bleProtocolVersion = version;
                            resolve(version);
                        });
                    }
                });
            });
        }
    };
    ConfigurationCharacteristic.prototype.setCollisionThreshold = function (threshold) {
        this.characteristic.write(Buffer.from([0x06, 0x00, threshold]), false);
    };
    ConfigurationCharacteristic.prototype.data2result = function (data) {
        var type = data.readUInt8(0);
        if (type === 0x81) {
            var version = data.toString('utf-8', 2, 7);
            this.eventEmitter.emit('configuration:ble-protocol-version', version);
            return;
        }
    };
    ConfigurationCharacteristic.prototype.onData = function (data) {
        this.data2result(data);
    };
    ConfigurationCharacteristic.UUID = '10b201ff5b3b45719508cf3efcd7bbae';
    return ConfigurationCharacteristic;
}());
exports.ConfigurationCharacteristic = ConfigurationCharacteristic;
