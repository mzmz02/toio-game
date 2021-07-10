"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var noble_mac_1 = __importDefault(require("noble-mac"));
var cube_1 = require("@toio/cube");
var Scanner = (function () {
    function Scanner(timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = Scanner.DEFAULT_TIMEOUT_MS; }
        this.timeoutMs = Scanner.DEFAULT_TIMEOUT_MS;
        this.eventEmitter = new events_1.EventEmitter();
        this.timeoutTimer = null;
        this.timeoutMs = timeoutMs;
    }
    Scanner.prototype.start = function () {
        var _this = this;
        noble_mac_1.default.on('stateChange', this.onStateChange.bind(this));
        noble_mac_1.default.on('discover', this.onDiscover.bind(this));
        var promises = [new Promise(this.executor.bind(this))];
        if (this.timeoutMs > 0) {
            promises.push(this.createTimeoutPromise(this.timeoutMs));
        }
        this.eventEmitter.emit('start');
        return Promise.race(promises).then(function (value) {
            _this.stop();
            var listValue = Array.isArray(value) ? value : [value];
            listValue.forEach(function (coreCube) { return _this.eventEmitter.emit('discover', coreCube); });
            return value;
        }, function (reason) {
            _this.stop();
            return Promise.reject(reason);
        });
    };
    Scanner.prototype.stop = function () {
        if (this.timeoutTimer !== null) {
            clearTimeout(this.timeoutTimer);
        }
        noble_mac_1.default.stopScanning();
        noble_mac_1.default.removeListener('stateChange', this.onStateChange);
        noble_mac_1.default.removeListener('discover', this.onDiscover);
        this.eventEmitter.emit('stop');
    };
    Scanner.prototype.on = function (event, listener) {
        this.eventEmitter.on(event, listener);
        return this;
    };
    Scanner.prototype.off = function (event, listener) {
        this.eventEmitter.removeListener(event, listener);
        return this;
    };
    Scanner.prototype.onStateChange = function (state) {
        if (state === 'poweredOn') {
            noble_mac_1.default.startScanning([cube_1.Cube.TOIO_SERVICE_ID]);
        }
        else {
            noble_mac_1.default.stopScanning();
        }
    };
    Scanner.prototype.createTimeoutPromise = function (timeoutMs) {
        var _this = this;
        return new Promise(function (_resolve, reject) {
            _this.timeoutTimer = setTimeout(reject, timeoutMs);
        });
    };
    Scanner.DEFAULT_TIMEOUT_MS = 0;
    return Scanner;
}());
exports.Scanner = Scanner;
//# sourceMappingURL=scanner.js.map