"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
var light_spec_1 = require("./specs/light-spec");
/**
 * @hidden
 */
var LightCharacteristic = /** @class */ (function () {
    function LightCharacteristic(characteristic) {
        this.spec = new light_spec_1.LightSpec();
        this.timer = null;
        this.pendingResolve = null;
        this.characteristic = characteristic;
    }
    LightCharacteristic.prototype.turnOnLight = function (operation) {
        var _this = this;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.pendingResolve) {
            this.pendingResolve();
            this.pendingResolve = null;
        }
        var data = this.spec.turnOnLight(operation);
        this.characteristic.write(Buffer.from(data.buffer), false);
        if (data.data.durationMs > 0) {
            return new Promise(function (resolve) {
                _this.pendingResolve = resolve;
                _this.timer = setTimeout(function () {
                    if (_this.pendingResolve) {
                        _this.pendingResolve();
                        _this.pendingResolve = null;
                    }
                }, data.data.durationMs);
            });
        }
    };
    LightCharacteristic.prototype.turnOnLightWithScenario = function (operations, repeatCount) {
        var _this = this;
        if (repeatCount === void 0) { repeatCount = 0; }
        if (!operations || operations.length === 0) {
            return Promise.reject('invalid argument: empty operation');
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.pendingResolve) {
            this.pendingResolve();
            this.pendingResolve = null;
        }
        var data = this.spec.turnOnLightWithScenario(operations, repeatCount);
        this.characteristic.write(Buffer.from(data.buffer), false);
        if (data.data.totalDurationMs > 0) {
            return new Promise(function (resolve) {
                _this.pendingResolve = resolve;
                _this.timer = setTimeout(function () {
                    if (_this.pendingResolve) {
                        _this.pendingResolve();
                        _this.pendingResolve = null;
                    }
                }, data.data.totalDurationMs);
            });
        }
    };
    LightCharacteristic.prototype.turnOffLight = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.pendingResolve) {
            this.pendingResolve();
            this.pendingResolve = null;
        }
        var data = this.spec.turnOffLight();
        this.characteristic.write(Buffer.from(data.buffer), false);
    };
    LightCharacteristic.UUID = '10b201035b3b45719508cf3efcd7bbae';
    return LightCharacteristic;
}());
exports.LightCharacteristic = LightCharacteristic;
