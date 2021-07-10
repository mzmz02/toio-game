"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var events_1 = require("events");
var semver_1 = require("semver");
var motor_spec_1 = require("./specs/motor-spec");
/**
 * @hidden
 */
var MotorCharacteristic = /** @class */ (function () {
    function MotorCharacteristic(characteristic) {
        this.spec = new motor_spec_1.MotorSpec();
        this.eventEmitter = new events_1.EventEmitter();
        this.timer = null;
        this.pendingResolve = null;
        this.characteristic = characteristic;
        if (this.characteristic.properties.includes('notify')) {
            this.characteristic.on('data', this.onData.bind(this));
            this.characteristic.subscribe();
        }
    }
    MotorCharacteristic.prototype.init = function (bleProtocolVersion) {
        this.bleProtocolVersion = bleProtocolVersion;
    };
    MotorCharacteristic.prototype.move = function (left, right, durationMs) {
        var _this = this;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.pendingResolve) {
            this.pendingResolve();
            this.pendingResolve = null;
        }
        var data = this.spec.move(left, right, durationMs);
        this.characteristic.write(Buffer.from(data.buffer), true);
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
    MotorCharacteristic.prototype.moveTo = function (targets, options) {
        var _this = this;
        if (this.bleProtocolVersion !== undefined && semver_1["default"].lt(this.bleProtocolVersion, '2.1.0')) {
            return Promise.resolve();
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        if (this.pendingResolve) {
            this.pendingResolve();
            this.pendingResolve = null;
        }
        // create pending promise for given targets and options
        var createPendingPromise = function (targets, options) { return function () {
            return new Promise(function (resolve, reject) {
                var data = _this.spec.moveTo(targets, options);
                var handleResponse = function (operationId, reason) {
                    if (operationId === data.data.options.operationId) {
                        _this.eventEmitter.removeListener('motor:response', handleResponse);
                        if (reason === 0 || reason === 5) {
                            resolve();
                        }
                        else {
                            reject(reason);
                        }
                    }
                };
                _this.characteristic.write(Buffer.from(data.buffer), true);
                _this.eventEmitter.on('motor:response', handleResponse);
            });
        }; };
        var promises = targets.reduce(function (acc, _target, index) {
            if (index % motor_spec_1.MotorSpec.NUMBER_OF_TARGETS_PER_OPERATION === 0) {
                var which = (index / motor_spec_1.MotorSpec.NUMBER_OF_TARGETS_PER_OPERATION) % 2;
                // Except for the first one, operation should not overwrite
                acc[which] = acc[which].then(createPendingPromise(targets.slice(index, index + motor_spec_1.MotorSpec.NUMBER_OF_TARGETS_PER_OPERATION), index === 0
                    ? options
                    : __assign(__assign({}, options), { overwrite: false })));
            }
            return acc;
        }, [Promise.resolve(), Promise.resolve()]);
        return new Promise(function (resolve, reject) {
            Promise.all(promises)
                .then(function () {
                resolve();
            })["catch"](reject);
        });
    };
    MotorCharacteristic.prototype.stop = function () {
        this.move(0, 0, 0);
    };
    MotorCharacteristic.prototype.onData = function (data) {
        try {
            var ret = this.spec.parse(data);
            this.eventEmitter.emit('motor:response', ret.data.operationId, ret.data.reason);
        }
        catch (e) {
            return;
        }
    };
    MotorCharacteristic.UUID = '10b201025b3b45719508cf3efcd7bbae';
    return MotorCharacteristic;
}());
exports.MotorCharacteristic = MotorCharacteristic;
