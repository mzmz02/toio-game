"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
var battery_spec_1 = require("./specs/battery-spec");
/**
 * @hidden
 */
var BatteryCharacteristic = /** @class */ (function () {
    function BatteryCharacteristic(characteristic, eventEmitter) {
        this.spec = new battery_spec_1.BatterySpec();
        this.characteristic = characteristic;
        if (this.characteristic.properties.includes('notify')) {
            this.characteristic.on('data', this.onData.bind(this));
            this.characteristic.subscribe();
        }
        this.eventEmitter = eventEmitter;
    }
    BatteryCharacteristic.prototype.getBatteryStatus = function () {
        return this.read().then(function (data) {
            return data.data;
        });
    };
    BatteryCharacteristic.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.characteristic.read(function (error, data) {
                if (error) {
                    reject(error);
                    return;
                }
                if (!data) {
                    reject('cannot read any data from characteristic');
                    return;
                }
                try {
                    var parsedData = _this.spec.parse(data);
                    resolve(parsedData);
                    return;
                }
                catch (e) {
                    reject(e);
                    return;
                }
            });
        });
    };
    BatteryCharacteristic.prototype.onData = function (data) {
        try {
            var parsedData = this.spec.parse(data);
            this.eventEmitter.emit('battery:battery', parsedData.data);
        }
        catch (e) {
            return;
        }
    };
    BatteryCharacteristic.UUID = '10b201085b3b45719508cf3efcd7bbae';
    return BatteryCharacteristic;
}());
exports.BatteryCharacteristic = BatteryCharacteristic;
