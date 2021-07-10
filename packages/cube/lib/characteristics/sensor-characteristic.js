"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
var sensor_spec_1 = require("./specs/sensor-spec");
/**
 * @hidden
 */
var SensorCharacteristic = /** @class */ (function () {
    function SensorCharacteristic(characteristic, eventEmitter) {
        this.spec = new sensor_spec_1.SensorSpec();
        this.prevStatus = {};
        this.characteristic = characteristic;
        if (this.characteristic.properties.includes('notify')) {
            this.characteristic.on('data', this.onData.bind(this));
            this.characteristic.subscribe();
        }
        this.eventEmitter = eventEmitter;
    }
    SensorCharacteristic.prototype.getSlopeStatus = function () {
        return this.read().then(function (parsedData) {
            return { isSloped: parsedData.data.isSloped };
        });
    };
    SensorCharacteristic.prototype.getCollisionStatus = function () {
        return this.read().then(function (parsedData) {
            return { isCollisionDetected: parsedData.data.isCollisionDetected };
        });
    };
    SensorCharacteristic.prototype.getDoubleTapStatus = function () {
        return this.read().then(function (parsedData) {
            return { isDoubleTapped: parsedData.data.isDoubleTapped };
        });
    };
    SensorCharacteristic.prototype.getOrientation = function () {
        return this.read().then(function (parsedData) {
            return { orientation: parsedData.data.orientation };
        });
    };
    SensorCharacteristic.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.characteristic.read(function (error, data) {
                if (error) {
                    reject(error);
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
    SensorCharacteristic.prototype.onData = function (data) {
        try {
            var parsedData = this.spec.parse(data);
            if (this.prevStatus.isSloped !== parsedData.data.isSloped) {
                this.eventEmitter.emit('sensor:slope', { isSloped: parsedData.data.isSloped });
            }
            if (parsedData.data.isCollisionDetected) {
                this.eventEmitter.emit('sensor:collision', { isCollisionDetected: parsedData.data.isCollisionDetected });
            }
            if (parsedData.data.isDoubleTapped) {
                this.eventEmitter.emit('sensor:double-tap');
            }
            if (this.prevStatus.orientation !== parsedData.data.orientation) {
                this.eventEmitter.emit('sensor:orientation', { orientation: parsedData.data.orientation });
            }
            this.prevStatus = parsedData.data;
        }
        catch (e) {
            return;
        }
    };
    SensorCharacteristic.UUID = '10b201065b3b45719508cf3efcd7bbae';
    return SensorCharacteristic;
}());
exports.SensorCharacteristic = SensorCharacteristic;
