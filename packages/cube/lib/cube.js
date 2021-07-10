"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var events_1 = require("events");
var characteristics_1 = require("./characteristics");
function missingCharacteristicRejection() {
    return Promise.reject('cannot discover the characteristic');
}
var Cube = /** @class */ (function () {
    /**
     * Create a new cube instance
     *
     * @param peripheral - a noble's peripheral object
     */
    function Cube(peripheral) {
        this.eventEmitter = new events_1.EventEmitter();
        this.motorCharacteristic = null;
        this.lightCharacteristic = null;
        this.soundCharacteristic = null;
        this.sensorCharacteristic = null;
        this.buttonCharacteristic = null;
        this.batteryCharacteristic = null;
        this.configurationCharacteristic = null;
        this.peripheral = peripheral;
    }
    Object.defineProperty(Cube.prototype, "id", {
        /**
         * id of cube as a BLE Peripheral
         */
        get: function () {
            return this.peripheral.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cube.prototype, "address", {
        /**
         * address of cube as a BLE Peripheral
         */
        get: function () {
            return this.peripheral.address;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Connect to the cube
     *
     * @returns Promise object
     */
    Cube.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.peripheral.connect(function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                _this.peripheral.discoverAllServicesAndCharacteristics(function (error2, _service, characteristics) { return __awaiter(_this, void 0, void 0, function () {
                    var bleProtocolVersion;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error2) {
                                    reject(error2);
                                    return [2 /*return*/];
                                }
                                if (characteristics) {
                                    this.setCharacteristics(characteristics);
                                }
                                return [4 /*yield*/, this.getBLEProtocolVersion()];
                            case 1:
                                bleProtocolVersion = _a.sent();
                                this.initCharacteristics(bleProtocolVersion);
                                resolve(this);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
    };
    Cube.prototype.disconnect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.peripheral.disconnect(function () {
                resolve();
            });
        });
    };
    Cube.prototype.on = function (event, listener) {
        var typedEmitter = this.eventEmitter;
        typedEmitter.on(event, listener);
        return this;
    };
    Cube.prototype.off = function (event, listener) {
        var typedEmitter = this.eventEmitter;
        typedEmitter.removeListener(event, listener);
        return this;
    };
    //
    // ID Detection
    //
    //
    // Motor Control
    //
    /**
     * Move cube
     *
     * @param left - [-100, 100] speed of left motor
     * @param right - [-100, 100] speed of right motor
     * @param duration - [0, 2550] duration in millisecond. 0 means endless.
     * @returns Promise object
     */
    Cube.prototype.move = function (left, right, duration) {
        if (duration === void 0) { duration = 0; }
        return this.motorCharacteristic !== null
            ? this.motorCharacteristic.move(left, right, duration)
            : missingCharacteristicRejection();
    };
    /**
     * Move cube to the specific coordinate and angle
     *
     * @param targets - list of target
     * @param options - option argument
     * @returns Promise object
     */
    Cube.prototype.moveTo = function (targets, options) {
        if (options === void 0) { options = { moveType: 0, maxSpeed: 115, speedType: 0, timeout: 0, overwrite: true }; }
        return this.motorCharacteristic !== null
            ? this.motorCharacteristic.moveTo(targets, options)
            : missingCharacteristicRejection();
    };
    /**
     * Stop cube movement
     */
    Cube.prototype.stop = function () {
        if (this.motorCharacteristic !== null) {
            this.motorCharacteristic.stop();
        }
    };
    //
    // LED
    //
    /**
     * Turn on a light
     *
     * @param operation - LED information (duration and color)
     * @returns Promise object
     */
    Cube.prototype.turnOnLight = function (operation) {
        return this.lightCharacteristic !== null
            ? this.lightCharacteristic.turnOnLight(operation)
            : missingCharacteristicRejection();
    };
    /**
     * Turn on a light
     *
     * @param operations - list of LED information (duration and color)
     * @param repeatCount - the number of repeat, 0 means eternal loop.
     * @returns Promise object
     */
    Cube.prototype.turnOnLightWithScenario = function (operations, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        return this.lightCharacteristic !== null
            ? this.lightCharacteristic.turnOnLightWithScenario(operations, repeatCount)
            : missingCharacteristicRejection();
    };
    /**
     * Turn off a light
     */
    Cube.prototype.turnOffLight = function () {
        if (this.lightCharacteristic !== null) {
            this.lightCharacteristic.turnOffLight();
        }
    };
    //
    // Sound
    //
    /**
     * Play preset sound
     *
     * @param soundId - [0, 10] id of preset sound
     */
    Cube.prototype.playPresetSound = function (soundId) {
        if (this.soundCharacteristic !== null) {
            this.soundCharacteristic.playPresetSound(soundId);
        }
    };
    /**
     * Play sound
     *
     * @param operations - list of buzzer information (duration and note name)
     * @param repeatCount - the number of repeat, 0 means eternal loop.
     * @returns Promise object
     */
    Cube.prototype.playSound = function (operations, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        return this.soundCharacteristic !== null
            ? this.soundCharacteristic.playSound(operations, repeatCount)
            : missingCharacteristicRejection();
    };
    /**
     * Stop sound
     */
    Cube.prototype.stopSound = function () {
        if (this.soundCharacteristic !== null) {
            this.soundCharacteristic.stopSound();
        }
    };
    //
    // Sensor
    //
    /**
     * Get slope status
     *
     * @returns Promise object
     */
    Cube.prototype.getSlopeStatus = function () {
        return this.sensorCharacteristic !== null
            ? this.sensorCharacteristic.getSlopeStatus()
            : missingCharacteristicRejection();
    };
    /**
     * Get collision status
     *
     * @returns Promise object
     */
    Cube.prototype.getCollisionStatus = function () {
        return this.sensorCharacteristic !== null
            ? this.sensorCharacteristic.getCollisionStatus()
            : missingCharacteristicRejection();
    };
    Cube.prototype.getDoubleTapStatus = function () {
        return this.sensorCharacteristic !== null
            ? this.sensorCharacteristic.getDoubleTapStatus()
            : missingCharacteristicRejection();
    };
    Cube.prototype.getOrientation = function () {
        return this.sensorCharacteristic !== null
            ? this.sensorCharacteristic.getOrientation()
            : missingCharacteristicRejection();
    };
    //
    // Button
    //
    /**
     * Read button status
     *
     * @returns Promise object
     */
    Cube.prototype.getButtonStatus = function () {
        return this.buttonCharacteristic !== null
            ? this.buttonCharacteristic.getButtonStatus()
            : missingCharacteristicRejection();
    };
    //
    // Battery
    //
    /**
     * Get battery status
     *
     * @returns Promise object
     */
    Cube.prototype.getBatteryStatus = function () {
        return this.batteryCharacteristic !== null
            ? this.batteryCharacteristic.getBatteryStatus()
            : missingCharacteristicRejection();
    };
    //
    // Configuration
    //
    Cube.prototype.getBLEProtocolVersion = function () {
        return this.configurationCharacteristic !== null
            ? this.configurationCharacteristic.getBLEProtocolVersion()
            : missingCharacteristicRejection();
    };
    Cube.prototype.setCollisionThreshold = function (threshold) {
        if (this.configurationCharacteristic !== null) {
            this.configurationCharacteristic.setCollisionThreshold(threshold);
        }
    };
    Cube.prototype.setCharacteristics = function (characteristics) {
        var _this = this;
        characteristics.forEach(function (characteristic) {
            switch (characteristic.uuid) {
                case characteristics_1.IdCharacteristic.UUID:
                    new characteristics_1.IdCharacteristic(characteristic, _this.eventEmitter);
                    break;
                case characteristics_1.MotorCharacteristic.UUID:
                    _this.motorCharacteristic = new characteristics_1.MotorCharacteristic(characteristic);
                    break;
                case characteristics_1.LightCharacteristic.UUID:
                    _this.lightCharacteristic = new characteristics_1.LightCharacteristic(characteristic);
                    break;
                case characteristics_1.SoundCharacteristic.UUID:
                    _this.soundCharacteristic = new characteristics_1.SoundCharacteristic(characteristic);
                    break;
                case characteristics_1.SensorCharacteristic.UUID:
                    _this.sensorCharacteristic = new characteristics_1.SensorCharacteristic(characteristic, _this.eventEmitter);
                    break;
                case characteristics_1.ButtonCharacteristic.UUID:
                    _this.buttonCharacteristic = new characteristics_1.ButtonCharacteristic(characteristic, _this.eventEmitter);
                    break;
                case characteristics_1.BatteryCharacteristic.UUID:
                    _this.batteryCharacteristic = new characteristics_1.BatteryCharacteristic(characteristic, _this.eventEmitter);
                    break;
                case characteristics_1.ConfigurationCharacteristic.UUID:
                    _this.configurationCharacteristic = new characteristics_1.ConfigurationCharacteristic(characteristic);
                    break;
                default:
                // TODO: log
            }
        });
    };
    Cube.prototype.initCharacteristics = function (bleProtocolVersion) {
        if (this.motorCharacteristic !== null) {
            this.motorCharacteristic.init(bleProtocolVersion);
        }
        if (this.configurationCharacteristic !== null) {
            this.configurationCharacteristic.init(bleProtocolVersion);
        }
    };
    /**
     * UUID of cube BLE service
     */
    Cube.TOIO_SERVICE_ID = '10b201005b3b45719508cf3efcd7bbae';
    return Cube;
}());
exports.Cube = Cube;
