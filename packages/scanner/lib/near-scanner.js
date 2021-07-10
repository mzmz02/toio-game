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
var NearScanner = (function (_super) {
    __extends(NearScanner, _super);
    function NearScanner(numberOfCoreCubes, timeoutMs) {
        if (numberOfCoreCubes === void 0) { numberOfCoreCubes = 1; }
        if (timeoutMs === void 0) { timeoutMs = scanner_1.Scanner.DEFAULT_TIMEOUT_MS; }
        var _this = _super.call(this, timeoutMs) || this;
        _this.peripherals = [];
        _this.numberOfCoreCubes = 1;
        _this.scanningIntervalTimer = null;
        _this.numberOfCoreCubes = numberOfCoreCubes;
        return _this;
    }
    NearScanner.prototype.stop = function () {
        _super.prototype.stop.call(this);
        if (this.scanningIntervalTimer !== null) {
            clearInterval(this.scanningIntervalTimer);
        }
    };
    NearScanner.prototype.onDiscover = function (peripheral) {
        this.peripherals.push(peripheral);
    };
    NearScanner.prototype.executor = function (resolve) {
        var _this = this;
        this.scanningIntervalTimer = setInterval(function () {
            if (_this.peripherals.length < _this.numberOfCoreCubes) {
                return;
            }
            resolve(_this.peripherals
                .sort(function (lhs, rhs) { return rhs.rssi - lhs.rssi; })
                .slice(0, _this.numberOfCoreCubes)
                .map(function (peripheral) {
                return new cube_1.Cube(peripheral);
            }));
        }, NearScanner.SCAN_WINDOW_MS);
    };
    NearScanner.SCAN_WINDOW_MS = 1000;
    return NearScanner;
}(scanner_1.Scanner));
exports.NearScanner = NearScanner;
//# sourceMappingURL=near-scanner.js.map