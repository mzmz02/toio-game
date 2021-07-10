"use strict";
/**
 * Copyright (c) 2019-present, Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
exports.__esModule = true;
/**
 * @hidden
 */
var SensorSpec = /** @class */ (function () {
    function SensorSpec() {
    }
    SensorSpec.prototype.parse = function (buffer) {
        if (buffer.byteLength < 3) {
            throw new Error('parse error');
        }
        var type = buffer.readUInt8(0);
        if (type !== 1) {
            throw new Error('parse error');
        }
        var isSloped = buffer.readUInt8(1) === 0;
        var isCollisionDetected = buffer.readUInt8(2) === 1;
        var isDoubleTapped = buffer.readUInt8(3) === 1;
        var orientation = buffer.readUInt8(4);
        return {
            buffer: buffer,
            data: {
                isSloped: isSloped,
                isCollisionDetected: isCollisionDetected,
                isDoubleTapped: isDoubleTapped,
                orientation: orientation
            },
            dataType: 'sensor:detection'
        };
    };
    return SensorSpec;
}());
exports.SensorSpec = SensorSpec;
