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
var ButtonSpec = /** @class */ (function () {
    function ButtonSpec() {
    }
    ButtonSpec.prototype.parse = function (buffer) {
        if (buffer.byteLength < 2) {
            throw new Error('parse error');
        }
        var id = buffer.readUInt8(0);
        if (id !== 1) {
            throw new Error('parse error');
        }
        var pressed = buffer.readUInt8(1) !== 0;
        return {
            buffer: buffer,
            data: {
                id: id,
                pressed: pressed
            },
            dataType: 'button:press'
        };
    };
    return ButtonSpec;
}());
exports.ButtonSpec = ButtonSpec;
