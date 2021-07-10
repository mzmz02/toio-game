"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cube_1 = require("@toio/cube");
var scanner_1 = require("./scanner");
var NearestScanner = (function (_super) {
    __extends(NearestScanner, _super);
    function NearestScanner(scanWindowMs, timeoutMs) {
        if (scanWindowMs === void 0) { scanWindowMs = NearestScanner.SCAN_WINDOW_MS; }
        if (timeoutMs === void 0) { timeoutMs = scanner_1.Scanner.DEFAULT_TIMEOUT_MS; }
        var _this = _super.call(this, timeoutMs) || this;
        _this.scanWindowMs = NearestScanner.SCAN_WINDOW_MS;
        _this.nearestPeripheral = null;
        _this.scanningIntervalTimer = null;
        _this.scanWindowMs = scanWindowMs;
        return _this;
    }
    NearestScanner.prototype.stop = function () {
        _super.prototype.stop.call(this);
        if (this.scanningIntervalTimer !== null) {
            clearInterval(this.scanningIntervalTimer);
        }
    };
    NearestScanner.prototype.onDiscover = function (peripheral) {
        if (this.nearestPeripheral === null || peripheral.rssi > this.nearestPeripheral.rssi) {
            this.nearestPeripheral = peripheral;
        }
    };
    NearestScanner.prototype.executor = function (resolve) {
        var _this = this;
        this.scanningIntervalTimer = setInterval(function () {
            if (_this.nearestPeripheral === null) {
                return;
            }
            resolve(new cube_1.Cube(_this.nearestPeripheral));
        }, this.scanWindowMs);
    };
    NearestScanner.SCAN_WINDOW_MS = 1000;
    return NearestScanner;
}(scanner_1.Scanner));
exports.NearestScanner = NearestScanner;
//# sourceMappingURL=nearest-scanner.js.map