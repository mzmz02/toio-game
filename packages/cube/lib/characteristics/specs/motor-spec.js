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
var clamp_1 = require("../../util/clamp");
var tag_1 = require("../../util/tag");
/**
 * @hidden
 */
var MotorSpec = /** @class */ (function () {
    function MotorSpec(tag) {
        if (tag === void 0) { tag = tag_1.createTagHandler(); }
        this.tag = tag;
    }
    MotorSpec.prototype.parse = function (buffer) {
        if (buffer.byteLength !== 3) {
            throw new Error('parse error');
        }
        var type = buffer.readUInt8(0);
        switch (type) {
            case 0x83:
            case 0x84:
                return {
                    buffer: buffer,
                    data: {
                        operationId: buffer.readUInt8(1),
                        reason: buffer.readUInt8(2)
                    }
                };
        }
        throw new Error('parse error');
    };
    MotorSpec.prototype.move = function (left, right, durationMs) {
        if (durationMs === void 0) { durationMs = 0; }
        var lSign = left > 0 ? 1 : -1;
        var rSign = right > 0 ? 1 : -1;
        var lDirection = left > 0 ? 1 : 2;
        var rDirection = right > 0 ? 1 : 2;
        var lPower = Math.min(Math.abs(left), MotorSpec.MAX_SPEED);
        var rPower = Math.min(Math.abs(right), MotorSpec.MAX_SPEED);
        var duration = clamp_1.clamp(durationMs / 10, 0, 255);
        return {
            buffer: Buffer.from([2, 1, lDirection, lPower, 2, rDirection, rPower, duration]),
            data: {
                left: lSign * lPower,
                right: rSign * rPower,
                durationMs: duration * 10
            }
        };
    };
    MotorSpec.prototype.moveTo = function (targets, options) {
        var _a, _b, _c, _d;
        var operationId = this.tag.next();
        var numTargets = Math.min(targets.length, MotorSpec.NUMBER_OF_TARGETS_PER_OPERATION);
        var buffer = Buffer.alloc(8 + 6 * numTargets);
        buffer.writeUInt8(4, 0); // control type
        buffer.writeUInt8(operationId, 1);
        buffer.writeUInt8(options.timeout, 2);
        buffer.writeUInt8(options.moveType, 3);
        buffer.writeUInt8(options.maxSpeed, 4);
        buffer.writeUInt8(options.speedType, 5);
        buffer.writeUInt8(0, 6); // reserved
        buffer.writeUInt8(options.overwrite ? 0 : 1, 7); // reserved
        for (var i = 0; i < numTargets; i++) {
            var target = targets[i];
            // When coordinates are not defined, they are not changed.
            var x = (_a = target.x, (_a !== null && _a !== void 0 ? _a : 0xffff));
            var y = (_b = target.y, (_b !== null && _b !== void 0 ? _b : 0xffff));
            // When angle is not defined, rotateType should be 0x05 or 0x06.
            var angle = clamp_1.clamp((_c = target.angle, (_c !== null && _c !== void 0 ? _c : 0)), 0, 0x1fff);
            var rotateType = (_d = target.rotateType, (_d !== null && _d !== void 0 ? _d : 0x00));
            if (target.angle === undefined && target.rotateType !== 0x06) {
                rotateType = 0x05;
            }
            buffer.writeUInt16LE(x, 8 + 6 * i);
            buffer.writeUInt16LE(y, 10 + 6 * i);
            buffer.writeUInt16LE((rotateType << 13) | angle, 12 + 6 * i);
        }
        return {
            buffer: Buffer.from(buffer),
            data: {
                targets: targets.slice(0, numTargets),
                options: __assign(__assign({}, options), { operationId: operationId })
            }
        };
    };
    MotorSpec.MAX_SPEED = 115;
    MotorSpec.NUMBER_OF_TARGETS_PER_OPERATION = 29; // should be in [0, 29]
    return MotorSpec;
}());
exports.MotorSpec = MotorSpec;
