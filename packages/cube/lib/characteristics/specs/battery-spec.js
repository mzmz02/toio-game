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
var BatterySpec = /** @class */ (function () {
    function BatterySpec() {
    }
    BatterySpec.prototype.parse = function (buffer) {
        if (buffer.byteLength < 1) {
            throw new Error('parse error');
        }
        var level = buffer.readUInt8(0);
        return {
            buffer: buffer,
            data: {
                level: level
            },
            dataType: 'battery:battery'
        };
    };
    return BatterySpec;
}());
exports.BatterySpec = BatterySpec;
